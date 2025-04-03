import React from "react";
import "./GuideStep.css";

const GuideSteps = () => {
  return (
    <section className="guide-container">
      <h2 className="guide-title">📖 Hướng Dẫn Sử Dụng</h2>
      
      {/* Bước 1 */}
      <div className="guide-step">
        <h3 className="guide-step-title">📝 Bước 1: Đọc hướng dẫn</h3>
        <p>Hãy đọc kỹ hướng dẫn trước khi bắt đầu sử dụng công cụ.</p>
        <p className="guide-link">📺 Xem video hướng dẫn</p>
      </div>

      {/* Bước 2 */}
      <div className="guide-step">
        <h3 className="guide-step-title">📂 Bước 2: Nhập File</h3>
        <p>Hệ thống hỗ trợ các định dạng:</p>
        <ul className="list-formats">
          <li>📜 TXT (Văn bản thuần)</li>
          <li>📖 EPUB (Sách điện tử)</li>
          <li>🌍 Lấy trực tiếp từ metruyenchu</li>
        </ul>
      </div>

      {/* Bước 3 */}
      <div className="guide-step">
        <h3 className="guide-step-title">⚙️ Bước 3: Cài đặt AI</h3>
        <p>Tùy chỉnh các thông số để phù hợp với nhu cầu:</p>
        <ul className="list-formats">
          <li>🤖 Chọn Model AI</li>
          <li>🔑 Nhập API Key (mã khóa AI)</li>
          <li>📝 Chọn kiểu dịch/chỉnh sửa</li>
        </ul>
      </div>
      {/* Bước 4 */}
      <div className="guide-step">
        <h3 className="guide-step-title">📤 Bước 4: Xuất File</h3>
        <p>Bắt đầu dịch và tải file dưới định dạng:</p>
        <ul className="list-formats">
          <li>📥 EPUB (Sách điện tử)</li>
          <li>📥 TXT (Văn bản thuần)</li>
        </ul>
      </div>
    </section>
  );
};

export default GuideSteps;
