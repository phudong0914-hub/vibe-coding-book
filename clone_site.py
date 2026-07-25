import os
import re
import sys
import urllib.request
import urllib.parse
import urllib.error
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

# Target domain and settings
BASE_URL = "https://learningai.vn"
SITEMAP_URL = "https://learningai.vn/sitemap.xml"
OUTPUT_DIR = r"C:\Users\admin\.gemini\antigravity-ide\scratch\learningai-clone"

# Dictionaries/sets to keep track of state
downloaded_assets = {} # abs_url -> local_relative_path
crawled_pages = set() # set of page URLs crawled

class LinkLocator(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = [] # list of (tag, attr, val)
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        # Search in tags that carry links or assets
        if tag in ('link', 'a', 'script', 'img', 'source', 'iframe'):
            for attr in ('href', 'src', 'poster'):
                if attr in attrs_dict:
                    self.links.append((tag, attr, attrs_dict[attr]))
        if tag == 'meta':
            # Check for social media cards
            prop = attrs_dict.get('property') or attrs_dict.get('name')
            if prop in ('og:image', 'twitter:image', 'og:image:secure_url'):
                if 'content' in attrs_dict:
                    self.links.append((tag, 'content', attrs_dict['content']))

def get_local_path_and_url(url, current_page_url):
    """
    Given a URL (which can be absolute, relative, or protocol-relative),
    returns a tuple (local_relative_path, absolute_url).
    If the URL is external or not http/https, returns (None, original_url).
    """
    # Quick filter for non-http schemes
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme and parsed.scheme not in ('http', 'https'):
        return None, url
        
    # Resolve relative URL to absolute URL
    abs_url = urllib.parse.urljoin(current_page_url, url)
    parsed = urllib.parse.urlparse(abs_url)
    
    # Filter external domains
    if parsed.netloc and parsed.netloc != 'learningai.vn':
        return None, abs_url
        
    # Clean the path
    path = urllib.parse.unquote(parsed.path)
    if not path or path == '/':
        return 'index.html', abs_url
        
    if path.startswith('/'):
        path = path[1:]
        
    # Determine the local file path
    _, ext = os.path.splitext(path)
    if not ext:
        # Route path -> make it /index.html
        if path.endswith('/'):
            path = path + 'index.html'
        else:
            path = path + '/index.html'
            
    return path, abs_url

def download_file(url, local_path):
    """
    Downloads file from URL and saves it to local_path (relative to OUTPUT_DIR).
    Returns the binary content if successful, None otherwise.
    """
    full_local_path = os.path.join(OUTPUT_DIR, local_path)
    os.makedirs(os.path.dirname(full_local_path), exist_ok=True)
    
    print(f"Downloading {url} -> {local_path}...", end="")
    sys.stdout.flush()
    
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, timeout=20) as response:
            data = response.read()
            with open(full_local_path, 'wb') as f:
                f.write(data)
        print(" SUCCESS")
        return data
    except Exception as e:
        print(f" FAILED ({e})")
        return None

def process_css(css_content, css_abs_url, css_local_path):
    """
    Parses CSS file content for url(...) references, downloads the referenced assets,
    rewrites references to be relative to the CSS file location, and returns the modified content.
    """
    css_text = css_content.decode('utf-8', errors='ignore')
    pattern = re.compile(r'url\((["\']?)([^)]*?)\1\)')
    
    def repl(match):
        quote = match.group(1)
        url_val = match.group(2).strip()
        
        # Ignore data-URIs or absolute external links
        if url_val.startswith('data:') or url_val.startswith('http://') or url_val.startswith('https://') and 'learningai.vn' not in url_val:
            return match.group(0)
            
        # Get absolute URL
        asset_abs_url = urllib.parse.urljoin(css_abs_url, url_val)
        asset_local_path, _ = get_local_path_and_url(asset_abs_url, css_abs_url)
        
        if not asset_local_path:
            return match.group(0)
            
        # Download if not already downloaded
        if asset_abs_url not in downloaded_assets:
            download_file(asset_abs_url, asset_local_path)
            downloaded_assets[asset_abs_url] = asset_local_path
            
        # Compute relative path from CSS directory to asset location
        css_dir = os.path.dirname(css_local_path)
        rel_path = os.path.relpath(asset_local_path, css_dir).replace('\\', '/')
        
        return f"url({quote}{rel_path}{quote})"
        
    updated_css = pattern.sub(repl, css_text)
    return updated_css.encode('utf-8')

def replace_attr(html_content, tag, attr, old_val, new_val):
    """
    Safely replaces an attribute value in HTML.
    Matches: attr="old_val" or attr='old_val'
    """
    pattern = r'(' + re.escape(attr) + r')\s*=\s*([\'"]?)' + re.escape(old_val) + r'\2'
    def repl(match):
        quote = match.group(2)
        return f'{attr}={quote}{new_val}{quote}'
    return re.sub(pattern, repl, html_content)

def crawl_page(page_url):
    """
    Crawls a single page: fetches HTML, parses assets and links,
    downloads assets, rewrites links to relative, and saves page HTML.
    """
    page_local_path, page_abs_url = get_local_path_and_url(page_url, BASE_URL)
    if not page_local_path:
        return
        
    if page_abs_url in crawled_pages:
        return
        
    crawled_pages.add(page_abs_url)
    print(f"\nProcessing Page: {page_abs_url} -> {page_local_path}")
    
    # Download raw HTML
    html_data = download_file(page_abs_url, page_local_path)
    if not html_data:
        return
        
    html_text = html_data.decode('utf-8', errors='ignore')
    
    # Parse page to find links and assets
    parser = LinkLocator()
    try:
        parser.feed(html_text)
    except Exception as e:
        print(f"Error parsing HTML for {page_abs_url}: {e}")
        return
        
    # We will modify html_text as we resolve references
    modified_html = html_text
    
    # Process all discovered links/assets
    for tag, attr, val in parser.links:
        # Determine local path and absolute URL of link target
        target_local_path, target_abs_url = get_local_path_and_url(val, page_abs_url)
        
        if not target_local_path:
            # External or unhandled link, leave it as is
            continue
            
        # Is it an asset or a page link?
        _, ext = os.path.splitext(target_local_path)
        is_asset = bool(ext and ext.lower() not in ('.html', '.php'))
        
        if is_asset:
            # Download asset if not yet downloaded
            if target_abs_url not in downloaded_assets:
                asset_data = download_file(target_abs_url, target_local_path)
                downloaded_assets[target_abs_url] = target_local_path
                
                # Special processing for CSS files to download nested fonts/images
                if ext.lower() == '.css' and asset_data:
                    processed_css = process_css(asset_data, target_abs_url, target_local_path)
                    full_asset_path = os.path.join(OUTPUT_DIR, target_local_path)
                    with open(full_asset_path, 'wb') as f:
                        f.write(processed_css)
            else:
                target_local_path = downloaded_assets[target_abs_url]
        
        # Calculate relative path from this page's directory to target local path
        page_dir = os.path.dirname(page_local_path)
        rel_path = os.path.relpath(target_local_path, page_dir).replace('\\', '/')
        
        # Rewrite the attribute value in the HTML
        modified_html = replace_attr(modified_html, tag, attr, val, rel_path)
        
    # Write modified HTML back to disk
    full_page_path = os.path.join(OUTPUT_DIR, page_local_path)
    with open(full_page_path, 'w', encoding='utf-8') as f:
        f.write(modified_html)

def fetch_sitemap_urls():
    """
    Downloads and parses sitemap.xml to extract page URLs.
    Falls back to hardcoded list if it fails.
    """
    print(f"Fetching sitemap from {SITEMAP_URL}...")
    try:
        req = urllib.request.Request(
            SITEMAP_URL, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            sitemap_data = response.read()
            
        root = ET.fromstring(sitemap_data)
        # Handle namespaces
        namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
        urls = []
        for url_node in root.findall(f"{namespace}url"):
            loc_node = url_node.find(f"{namespace}loc")
            if loc_node is not None and loc_node.text:
                urls.append(loc_node.text.strip())
        print(f"Found {len(urls)} URLs in sitemap.")
        return urls
    except Exception as e:
        print(f"Error fetching sitemap: {e}. Falling back to hardcoded list.")
        # Hardcoded fallback list matching sitemap
        fallback = [
            "https://learningai.vn/",
            "https://learningai.vn/sach",
            "https://learningai.vn/blog",
            "https://learningai.vn/sach/loi-mo-dau",
            "https://learningai.vn/sach/nguon-doc-them",
            "https://learningai.vn/sach/tai-lieu-tham-khao",
            "https://learningai.vn/sach/thuat-ngu"
        ]
        for i in range(1, 20):
            fallback.append(f"https://learningai.vn/sach/chuong-{i}")
        return fallback

def main():
    print("=== STARTING CLONER ===")
    print(f"Target: {BASE_URL}")
    print(f"Output Directory: {OUTPUT_DIR}\n")
    
    # 1. Get all sitemap URLs
    pages_to_crawl = fetch_sitemap_urls()
    
    # 2. Add extra assets to download directly
    # Like favicon, site icons, and global next assets
    extra_assets = [
        "/favicon.ico",
        "/icon.svg?775d97adc4c3f6d7",
        "/apple-icon.png?e27a984a0f3876be",
        "/robots.txt",
        "/sitemap.xml",
        "/og-v2.png"
    ]
    for asset in extra_assets:
        asset_local_path, asset_abs_url = get_local_path_and_url(asset, BASE_URL)
        if asset_local_path and asset_abs_url not in downloaded_assets:
            download_file(asset_abs_url, asset_local_path)
            downloaded_assets[asset_abs_url] = asset_local_path

    # 3. Crawl pages
    for page_url in pages_to_crawl:
        crawl_page(page_url)
        
    print("\n=== CLONING COMPLETED ===")
    print(f"Total crawled pages: {len(crawled_pages)}")
    print(f"Total downloaded assets: {len(downloaded_assets)}")

if __name__ == "__main__":
    main()
