(function () {
  if (window.__ltmInitialized) return;
  window.__ltmInitialized = true;

  // Syllabus Data
  const modulesData = [
    {
      id: "part-0",
      tag: "Khai cuộc",
      title: "Lời mở đầu",
      lessons: [
        { title: "Lời mở đầu: Hành trình làm chủ AI", url: "sach/loi-mo-dau/index.html", path: "sach/loi-mo-dau", time: "5 phút", level: "Cơ bản" }
      ]
    },
    {
      id: "part-1",
      tag: "Phần 1",
      title: "Bên trong AI thật ra diễn ra điều gì",
      lessons: [
        { num: 1, title: "AI đọc từng mảnh, không đọc nguyên từ", url: "sach/chuong-1/index.html", path: "sach/chuong-1", time: "8 phút", level: "Cơ bản" },
        { num: 2, title: "AI tạo câu trả lời bằng cách đoán mảnh tiếp theo", url: "sach/chuong-2/index.html", path: "sach/chuong-2", time: "10 phút", level: "Cơ bản" },
        { num: 3, title: "Vì sao AI biết trả lời như một trợ lý", url: "sach/chuong-3/index.html", path: "sach/chuong-3", time: "9 phút", level: "Cơ bản" },
        { num: 4, title: "Vì sao hỏi cùng một câu vẫn có thể nhận câu trả lời khác", url: "sach/chuong-4/index.html", path: "sach/chuong-4", time: "11 phút", level: "Cơ bản" }
      ]
    },
    {
      id: "part-2",
      tag: "Phần 2",
      title: "Chủ động giao việc cho AI (Prompt Engineering)",
      lessons: [
        { num: 5, title: "Đừng chỉ mô tả, hãy cho AI xem ví dụ", url: "sach/chuong-5/index.html", path: "sach/chuong-5", time: "12 phút", level: "Thực hành" },
        { num: 6, title: "Biến một lời giải tốt thành công thức dùng lại", url: "sach/chuong-6/index.html", path: "sach/chuong-6", time: "14 phút", level: "Thực hành" },
        { num: 7, title: "Để AI hỏi lại và lập kế hoạch trước khi làm", url: "sach/chuong-7/index.html", path: "sach/chuong-7", time: "13 phút", level: "Thực hành" }
      ]
    },
    {
      id: "part-3",
      tag: "Phần 3",
      title: "Ngữ cảnh: AI chỉ biết những gì đang nằm trước mặt",
      lessons: [
        { num: 8, title: "AI \"nhớ\" bằng cửa sổ ngữ cảnh", url: "sach/chuong-8/index.html", path: "sach/chuong-8", time: "10 phút", level: "Nâng cao" },
        { num: 9, title: "Prompt quá dài làm AI dễ bỏ sót phần quan trọng", url: "sach/chuong-9/index.html", path: "sach/chuong-9", time: "12 phút", level: "Nâng cao" },
        { num: 10, title: "Khi đoạn chat rối: tóm tắt, làm lại, rồi cải thiện từng vòng", url: "sach/chuong-10/index.html", path: "sach/chuong-10", time: "15 phút", level: "Nâng cao" }
      ]
    },
    {
      id: "part-4",
      tag: "Phần 4",
      title: "Khi AI biết dùng công cụ và biết chia việc (AI Agents)",
      lessons: [
        { num: 11, title: "Khi chatbot biết dùng công cụ", url: "sach/chuong-11/index.html", path: "sach/chuong-11", time: "14 phút", level: "Chuyên sâu" },
        { num: 12, title: "Chia việc lớn thành nhiều việc nhỏ cho AI", url: "sach/chuong-12/index.html", path: "sach/chuong-12", time: "11 phút", level: "Chuyên sâu" },
        { num: 13, title: "Chọn công cụ đúng cho việc đang làm", url: "sach/chuong-13/index.html", path: "sach/chuong-13", time: "13 phút", level: "Chuyên sâu" }
      ]
    },
    {
      id: "part-5",
      tag: "Phần 5",
      title: "Khi AI trả lời sai mà vẫn nghe rất thuyết phục",
      lessons: [
        { num: 14, title: "Vì sao AI có thể nói sai rất tự tin", url: "sach/chuong-14/index.html", path: "sach/chuong-14", time: "13 phút", level: "Kiểm chứng" },
        { num: 15, title: "Khi AI quá dễ đồng ý với bạn", url: "sach/chuong-15/index.html", path: "sach/chuong-15", time: "10 phút", level: "Kiểm chứng" },
        { num: 16, title: "Bạn càng hiểu biết, AI càng hữu ích", url: "sach/chuong-16/index.html", path: "sach/chuong-16", time: "12 phút", level: "Kiểm chứng" }
      ]
    },
    {
      id: "part-6",
      tag: "Phần 6",
      title: "Cách đánh giá AI và những gì AI đang định hình",
      lessons: [
        { num: 17, title: "Muốn biết AI có hợp với bạn, hãy tự kiểm tra", url: "sach/chuong-17/index.html", path: "sach/chuong-17", time: "14 phút", level: "Tổng kết" },
        { num: 18, title: "AI không hoàn toàn trung lập", url: "sach/chuong-18/index.html", path: "sach/chuong-18", time: "11 phút", level: "Tổng kết" },
        { num: 19, title: "Dòng tin đang thu hẹp góc nhìn của bạn như thế nào", url: "sach/chuong-19/index.html", path: "sach/chuong-19", time: "15 phút", level: "Tổng kết" }
      ]
    },
    {
      id: "part-7",
      tag: "Phụ lục",
      title: "Tài nguyên & Tra cứu nâng cao",
      lessons: [
        { title: "Thuật ngữ cần biết", url: "sach/thuat-ngu/index.html", path: "sach/thuat-ngu", time: "7 phút", level: "Tra cứu" },
        { title: "Nguồn đọc thêm", url: "sach/nguon-doc-them/index.html", path: "sach/nguon-doc-them", time: "5 phút", level: "Tra cứu" },
        { title: "Tài liệu tham khảo", url: "sach/tai-lieu-tham-khao/index.html", path: "sach/tai-lieu-tham-khao", time: "5 phút", level: "Tra cứu" }
      ]
    }
  ];

  // Helper to adjust relative URLs depending on current page depth
  function getRelativeUrl(targetUrl) {
    const loc = window.location.pathname;
    if (loc.includes('/sach/chuong-') || loc.includes('/sach/loi-mo-dau') || loc.includes('/sach/thuat-ngu') || loc.includes('/sach/nguon-doc-them') || loc.includes('/sach/tai-lieu-tham-khao')) {
      return '../' + targetUrl.replace('sach/', '');
    } else if (loc.includes('/sach/')) {
      return targetUrl.replace('sach/', '');
    } else if (loc.includes('/blog/')) {
      return '../' + targetUrl;
    }
    return targetUrl;
  }

  // Detect current active lesson
  function isCurrentLesson(path) {
    const cur = window.location.pathname;
    return cur.includes(path);
  }

  // Create Modal HTML Structure
  function buildModalDOM() {
    const overlay = document.createElement('div');
    overlay.className = 'ltm-overlay';
    overlay.id = 'ltmOverlay';

    overlay.innerHTML = `
      <div class="ltm-container">
        <div class="ltm-header">
          <div class="ltm-title-row">
            <div class="ltm-title-wrap">
              <div class="ltm-icon-badge">🎓</div>
              <div>
                <h3 class="ltm-title">Lộ Trình Bài Học & Cây Chủ Đề AI</h3>
                <div class="ltm-subtitle">Chương trình đào tạo tư duy & kỹ năng làm việc cùng AI bài bản</div>
              </div>
            </div>
            <button class="ltm-close-btn" id="ltmCloseBtn" title="Đóng (Esc)">✕</button>
          </div>
          <div class="ltm-toolbar">
            <div class="ltm-search-box">
              <span class="ltm-search-icon">🔍</span>
              <input type="text" id="ltmSearchInput" class="ltm-search-input" placeholder="Tìm bài học, chủ đề, thuật ngữ..." />
            </div>
          </div>
        </div>
        
        <div class="ltm-tabs-bar">
          <button class="ltm-tab-btn ltm-tab-active" data-tab="tree">📌 Cây bài học (Syllabus)</button>
          <button class="ltm-tab-btn" data-tab="roadmap">🚀 Lộ trình 6 giai đoạn</button>
          <button class="ltm-tab-btn" data-tab="resources">📚 Tài nguyên & Phụ lục</button>
        </div>
        
        <div class="ltm-body">
          <!-- Tab 1: Lesson Tree -->
          <div class="ltm-tab-content ltm-content-active" id="ltmTabTree">
            <div id="ltmModulesList"></div>
          </div>
          
          <!-- Tab 2: Visual 6-Step Roadmap -->
          <div class="ltm-tab-content" id="ltmTabRoadmap">
            <div class="ltm-roadmap-grid">
              <div class="ltm-roadmap-card">
                <span class="ltm-roadmap-step">GIAI ĐOẠN 1</span>
                <div class="ltm-roadmap-h">Hiểu cơ chế vận hành AI</div>
                <div class="ltm-roadmap-desc">Khám phá cách AI đọc token, dự đoán từ tiếp theo và nguyên lý hình thành câu trả lời của mô hình ngôn ngữ lớn.</div>
              </div>
              <div class="ltm-roadmap-card">
                <span class="ltm-roadmap-step">GIAI ĐOẠN 2</span>
                <div class="ltm-roadmap-h">Chủ động Prompt Engineering</div>
                <div class="ltm-roadmap-desc">Kỹ thuật đưa ví dụ (few-shot), tạo quy trình lặp lại và yêu cầu AI lập kế hoạch trước khi thực thi.</div>
              </div>
              <div class="ltm-roadmap-card">
                <span class="ltm-roadmap-step">GIAI ĐOẠN 3</span>
                <div class="ltm-roadmap-h">Quản lý Cửa sổ Ngữ cảnh</div>
                <div class="ltm-roadmap-desc">Tối ưu hóa bộ nhớ ngắn hạn của AI, xử lý khi hội thoại bị rối và cách cô đọng thông tin quan trọng.</div>
              </div>
              <div class="ltm-roadmap-card">
                <span class="ltm-roadmap-step">GIAI ĐOẠN 4</span>
                <div class="ltm-roadmap-h">Công cụ & Hệ thống AI Agent</div>
                <div class="ltm-roadmap-desc">Cách chia việc lớn thành nhiều việc nhỏ, tích hợp công cụ (Tools) và điều phối đa trợ thủ AI hiệu quả.</div>
              </div>
              <div class="ltm-roadmap-card">
                <span class="ltm-roadmap-step">GIAI ĐOẠN 5</span>
                <div class="ltm-roadmap-h">Kiểm chứng & Phòng ảo giác</div>
                <div class="ltm-roadmap-desc">Nhận biết ảo giác (hallucination), kiểm tra trích dẫn, mã ISBN, số liệu và tránh bẫy đồng ý ngọt ngào của AI.</div>
              </div>
              <div class="ltm-roadmap-card">
                <span class="ltm-roadmap-step">GIAI ĐOẠN 6</span>
                <div class="ltm-roadmap-h">Tư duy & Đánh giá AI</div>
                <div class="ltm-roadmap-desc">Thiết lập tiêu chí đánh giá mô hình phù hợp với công việc và nhận diện định hình dòng tin thế giới số.</div>
              </div>
            </div>
          </div>
          
          <!-- Tab 3: Resources -->
          <div class="ltm-tab-content" id="ltmTabResources">
            <div id="ltmResourcesList"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    renderModulesList();
    bindEvents();
  }

  // Render Lesson Tree Modules
  function renderModulesList(searchTerm = '') {
    const container = document.getElementById('ltmModulesList');
    if (!container) return;
    container.innerHTML = '';

    const term = searchTerm.toLowerCase().trim();

    modulesData.forEach((mod, idx) => {
      // Filter lessons matching search
      const matchedLessons = mod.lessons.filter(l => l.title.toLowerCase().includes(term) || mod.title.toLowerCase().includes(term));

      if (term && matchedLessons.length === 0) return;

      const card = document.createElement('div');
      card.className = 'ltm-module-card' + (idx === 0 || term || hasCurrentLesson(mod) ? ' ltm-expanded' : '');
      
      let lessonsHTML = matchedLessons.map(l => {
        const isCurrent = isCurrentLesson(l.path);
        const relUrl = getRelativeUrl(l.url);
        return `
          <a href="${relUrl}" class="ltm-lesson-item ${isCurrent ? 'ltm-lesson-current' : ''}">
            <div class="ltm-lesson-left">
              <div class="ltm-lesson-num">${l.num || '★'}</div>
              <div class="ltm-lesson-title">${l.title}</div>
            </div>
            <div class="ltm-lesson-meta">
              ${isCurrent ? '<span class="ltm-badge-now">Đang đọc</span>' : ''}
              <span class="ltm-time-tag">⏱ ${l.time}</span>
            </div>
          </a>
        `;
      }).join('');

      card.innerHTML = `
        <div class="ltm-module-header">
          <div class="ltm-module-title-wrap">
            <span class="ltm-module-tag">${mod.tag}</span>
            <span class="ltm-module-title">${mod.title}</span>
          </div>
          <span class="ltm-module-chevron">▼</span>
        </div>
        <div class="ltm-module-body">
          ${lessonsHTML}
        </div>
      `;

      // Accordion click
      card.querySelector('.ltm-module-header').addEventListener('click', () => {
        card.classList.toggle('ltm-expanded');
      });

      container.appendChild(card);
    });

    // Also populate tab 3 resources
    const resContainer = document.getElementById('ltmResourcesList');
    if (resContainer && !resContainer.children.length) {
      const resMod = modulesData.find(m => m.id === 'part-7');
      if (resMod) {
        resContainer.innerHTML = resMod.lessons.map(l => `
          <a href="${getRelativeUrl(l.url)}" class="ltm-lesson-item">
            <div class="ltm-lesson-left">
              <div class="ltm-lesson-num">📌</div>
              <div class="ltm-lesson-title">${l.title}</div>
            </div>
            <div class="ltm-lesson-meta">
              <span class="ltm-time-tag">⏱ ${l.time}</span>
            </div>
          </a>
        `).join('');
      }
    }
  }

  function hasCurrentLesson(mod) {
    return mod.lessons.some(l => isCurrentLesson(l.path));
  }

  // Bind Open/Close and Interactivity
  function bindEvents() {
    const overlay = document.getElementById('ltmOverlay');
    const closeBtn = document.getElementById('ltmCloseBtn');
    const searchInput = document.getElementById('ltmSearchInput');

    function openModal() {
      overlay.classList.add('ltm-active');
      document.body.style.overflow = 'hidden';
      if (searchInput) searchInput.focus();
    }

    function closeModal() {
      overlay.classList.remove('ltm-active');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('ltm-active')) {
        closeModal();
      }
    });

    // Tab switching
    const tabBtns = overlay.querySelectorAll('.ltm-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('ltm-tab-active'));
        btn.classList.add('ltm-tab-active');

        const tab = btn.dataset.tab;
        document.getElementById('ltmTabTree').classList.toggle('ltm-content-active', tab === 'tree');
        document.getElementById('ltmTabRoadmap').classList.toggle('ltm-content-active', tab === 'roadmap');
        document.getElementById('ltmTabResources').classList.toggle('ltm-content-active', tab === 'resources');
      });
    });

    // Live Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderModulesList(e.target.value);
      });
    }

    // Attach click listener to ALL TOC trigger buttons across the page!
    document.querySelectorAll('.reader_tocTrigger__kx6Zs, [href="#muc-luc"], .BookHeader_secondaryCta__JGv1_').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    // Expose global open function
    window.openLessonTreeModal = openModal;
  }

  // Fix layout collapsed sidebar
  function fixReaderLayout() {
    const grid = document.querySelector('.reader_grid__jzzrU');
    const sidebar = document.querySelector('.reader_sidebar__2G6R_');
    if (grid && sidebar) {
      const isSidebarHidden = window.getComputedStyle(sidebar).display === 'none';
      if (isSidebarHidden) {
        grid.classList.add('reader_gridCollapsed__4Vxmv');
      } else {
        grid.classList.remove('reader_gridCollapsed__4Vxmv');
      }
    }
  }

  // Video Integration Manager (NotebookLM Podcast Playlist)
  const YOUTUBE_VIDEOS = {
    "loi-mo-dau": "JsTENEECoOw",
    "chuong-1": "SrdJrxH6NcI",
    "chuong-2": "V_-ak3Av4qY",
    "chuong-3": "JsjRORcMKAI",
    "chuong-4": "5MnrHJto2UI",
    "chuong-5": "bLRUoXe7_UU",
    "chuong-6": "cGRn4-qrPgQ",
    "chuong-7": "SlA5OY05UMo",
    "chuong-8": "yz7S4thWK9I",
    "chuong-9": "8dct_ifwPII",
    "chuong-10": "",
    "chuong-11": "",
    "chuong-12": "",
    "chuong-13": "",
    "chuong-14": "",
    "chuong-15": "",
    "chuong-16": "",
    "chuong-17": "",
    "chuong-18": "",
    "chuong-19": ""
  };

  function getVideosJsonUrl() {
    const loc = window.location.pathname;
    if (loc.includes('/sach/chuong-') || loc.includes('/sach/loi-mo-dau') || loc.includes('/sach/thuat-ngu') || loc.includes('/sach/nguon-doc-them') || loc.includes('/sach/tai-lieu-tham-khao')) {
      return '../videos.json';
    } else if (loc.includes('/sach/')) {
      return 'videos.json';
    }
    return 'sach/videos.json';
  }

  function initVideoFeatures() {
    // Try to load videos.json for easy future updates by the user
    fetch(getVideosJsonUrl())
      .then(res => res.json())
      .then(data => {
        Object.assign(YOUTUBE_VIDEOS, data);
        runVideoIntegration();
      })
      .catch(err => {
        console.log("Using offline video configuration fallback:", err);
        runVideoIntegration();
      });
  }

  function runVideoIntegration() {
    const loc = window.location.pathname;
    
    // 1. Chapter Page Video Injection
    let chapterKey = null;
    if (loc.includes('/loi-mo-dau')) {
      chapterKey = 'loi-mo-dau';
    } else {
      const match = loc.match(/\/chuong-(\d+)/);
      if (match) chapterKey = 'chuong-' + match[1];
    }

    if (chapterKey && YOUTUBE_VIDEOS[chapterKey]) {
      const youtubeId = YOUTUBE_VIDEOS[chapterKey];
      const insertAnchor = document.querySelector('.readerBody_readingTime__KY4Lh') || document.querySelector('.readerBody_title__IEeSs');
      if (insertAnchor && !document.querySelector('.vibe-video-player-container')) {
        const playerContainer = document.createElement('div');
        playerContainer.className = 'vibe-video-player-container';
        playerContainer.id = 'vibeChapterVideoPlayer';
        playerContainer.innerHTML = `
          <div class="vibe-video-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #ff6200;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Video tóm tắt chương (NotebookLM AI Podcast):</span>
          </div>
          <div class="vibe-video-ratio-wrapper">
            <iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        `;
        insertAnchor.parentNode.insertBefore(playerContainer, insertAnchor.nextSibling);

        // Auto-scroll and highlight if user came from the index video gallery (?play=1)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('play') === '1') {
          setTimeout(() => {
            playerContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            playerContainer.classList.add('vibe-video-highlight');
            const iframe = playerContainer.querySelector('iframe');
            if (iframe) iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
          }, 600);
        }
      }
    }

    // 2. Index Page Video Gallery Grid/Slider Injection
    const tocHeading = document.getElementById('toc-title') || document.querySelector('.TocSection_heading__7f6YX');
    if (tocHeading && !document.querySelector('.vibe-video-gallery')) {
      const activeChapters = [];
      modulesData.forEach(mod => {
        mod.lessons.forEach(les => {
          let cKey = null;
          if (les.url.includes('/loi-mo-dau')) {
            cKey = 'loi-mo-dau';
          } else {
            const m = les.url.match(/\/chuong-(\d+)/);
            if (m) cKey = 'chuong-' + m[1];
          }
          if (cKey && YOUTUBE_VIDEOS[cKey]) {
            activeChapters.push({
              key: cKey,
              title: les.title,
              url: les.url,
              part: mod.tag,
              youtubeId: YOUTUBE_VIDEOS[cKey]
            });
          }
        });
      });

      if (activeChapters.length > 0) {
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'vibe-video-gallery';
        
        let cardsHtml = '';
        activeChapters.forEach(chap => {
          let targetUrl = chap.url;
          if (loc.includes('/sach/')) {
            targetUrl = targetUrl.replace('sach/', '');
          }
          targetUrl += '?play=1';

          cardsHtml += `
            <a href="${targetUrl}" class="vibe-video-gallery-card">
              <div>
                <div class="vibe-video-card-tag">${chap.part}</div>
                <h4 class="vibe-video-card-title">${chap.title}</h4>
              </div>
              <div class="vibe-video-card-footer">
                <span>Xem tóm tắt AI &rarr;</span>
                <div class="vibe-video-play-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
              </div>
            </a>
          `;
        });

        galleryContainer.innerHTML = `
          <h3 class="vibe-video-gallery-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffc800" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
            <span>Thư Viện Video Bài Giảng NotebookLM</span>
          </h3>
          <div class="vibe-video-gallery-scroll">
            ${cardsHtml}
          </div>
        `;
        tocHeading.parentNode.insertBefore(galleryContainer, tocHeading);
      }
    }
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      buildModalDOM();
      fixReaderLayout();
      initVideoFeatures();
    });
  } else {
    buildModalDOM();
    fixReaderLayout();
    initVideoFeatures();
  }

  window.addEventListener('resize', fixReaderLayout);
  // Also run a small timeout to make sure everything is rendered and styled
  setTimeout(fixReaderLayout, 100);
  setTimeout(fixReaderLayout, 500);
})();
