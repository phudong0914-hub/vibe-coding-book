# Quy Tắc Phát Triển và Vibe Coding Cho AI Agent

Tài liệu này định nghĩa bộ quy tắc bắt buộc cho bất kỳ AI Coding Agent nào (Claude Code, Cursor, Gemini Antigravity,...) khi làm việc trên dự án này nhằm đảm bảo tính ổn định, sạch sẽ của mã nguồn và không làm hỏng giao diện.

## 1. Trước khi sửa đổi mã nguồn (Before Edit)
- **Tạo Product Spec/Kế hoạch nhỏ:** Agent phải lập một kế hoạch ngắn mô tả các file sẽ sửa đổi, lý do thay đổi và giải pháp cấu trúc dự kiến. Không được tự ý sửa đổi bừa bãi khi chưa định hình cấu trúc.

## 2. Trong khi làm việc (During Development)
- **Giữ mã nguồn sạch (Keep it DRY):** 
  - Hạn chế tối đa việc sử dụng styles inline trực tiếp vào các thẻ HTML cho các thành phần giao diện phức tạp.
  - Phải tái sử dụng các class có sẵn trong [vibe-playbook.css](file:///sach/so-tay-vibe/vibe-playbook.css) hoặc định nghĩa thêm class mới vào file stylesheet dùng chung.
- **Tính toàn vẹn của thẻ HTML:**
  - Bảo đảm khớp cặp 100% của các thẻ block chính (`div`, `article`, `aside`, `main`, `nav`, `ul`, `details`, etc.). 

## 3. Trước khi bàn giao công việc (Before Completing Turn)
- **Kiểm định cú pháp tự động bắt buộc:** Agent **bắt buộc** phải chạy kịch bản kiểm định:
  ```bash
  node scripts/validate_html.js
  ```
  - Nếu kết quả trả về báo lỗi cú pháp lệch thẻ hoặc file liên kết asset bị thiếu, Agent phải tìm ra và vá lỗi lập tức trước khi kết thúc turn làm việc.
  - Dự án chỉ được coi là hoàn thành và sẵn sàng deploy khi lệnh `node scripts/validate_html.js` chạy thành công và báo **Passed 100%**.
