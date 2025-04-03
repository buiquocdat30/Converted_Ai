import React, { useState } from "react";
import { Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Search, CloudUpload } from "@mui/icons-material";
import "./SourceText.css"; // Giả sử CSS file đã tồn tại

const SourceText = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChangeTab = (index) => {
    setActiveTab(index);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Giữ lại CustomButton từ Material UI như yêu cầu
  const CustomButton = styled('button')({
    backgroundColor: "rgb(104, 146, 119)",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    "&:hover": {
      backgroundColor: "rgb(84, 126, 99)",
    },
    "&:disabled": {
      backgroundColor: "#f0f0f0",
      color: "#999",
      border: "1px solid #ddd",
      cursor: "not-allowed"
    },
  });

  return (
    <div className="container">
      <div className="tabs-title-container">
        <div className="tabs-container">
          <Tab
            label="TXT"
            className={activeTab === 0 ? "tab selected" : "tab"}
            onClick={() => handleChangeTab(0)}
          />
          <Tab
            label="EPUB"
            className={activeTab === 1 ? "tab selected" : "tab"}
            onClick={() => handleChangeTab(1)}
          />
          <Tab
            label="Online"
            className={activeTab === 2 ? "tab selected" : "tab"}
            onClick={() => handleChangeTab(2)}
          />
        </div>
        <div className="tab-indicator" style={{ left: `${activeTab * 33.33}%` }}></div>
      </div>

      <div className="tab-content">
        {/* Tab TXT */}
        {activeTab === 0 && (
          <div className="txt-content">
            <div className="tab-content-body">
              <div className="section-title">
                Tải lên TXT
              </div>

              <label className="file-input-label">
                <CustomButton component="span">
                  <CloudUpload />
                  Chọn file TXT
                  <input
                    type="file"
                    hidden
                    accept=".txt"
                    onChange={handleFileChange}
                  />
                </CustomButton>
              </label>

              {selectedFile && (
                <div className="file-name">
                  Đã chọn: {selectedFile.name}
                </div>
              )}
            </div>

            <div className="tab-content-body">
              <h3 className="section-title">
                📌 Các định dạng chương được hỗ trợ:
              </h3>
              <ul className="format-list">
                <li>
                  <p>Chương N - Ví dụ: "Chương 1: Khối đầu"</p>
                </li>
                <li>
                  <p>
                    chương N - Ví dụ: "Chương 1: Hành trình mới"
                  </p>
                </li>
                <li>
                  <p>
                    Chapter N - Ví dụ: "Chapter 2 - The Journey"
                  </p>
                </li>
                <li>
                  <p>
                    chapter N - Ví dụ: "chapters & A New Beginning"
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab EPUB */}
        {activeTab === 1 && (
          <div className="epub-content">
            <div className="tab-content-body">
              <h3 className="section-title">
                Tải lên EPUB
              </h3>

              <label className="file-input-label">
                <CustomButton component="span">
                  <CloudUpload />
                  Chọn file EPUB
                  <input
                    type="file"
                    hidden
                    accept=".epub"
                    onChange={handleFileChange}
                  />
                </CustomButton>
              </label>

              {selectedFile && (
                <div className="file-name">
                  Đã chọn: {selectedFile.name}
                </div>
              )}
            </div>

            <div className="tab-content-body">
              <ul className="format-list">
                <li>
                  <p>
                    <strong>
                      Nếu bạn chưa có file EPUB, có thể nhờ thành viên trong
                      nhóm hỗ trợ tạo (miễn phí hoặc có phí).
                    </strong>{" "}
                    Mọi người tự thương lượng giá, mặc định khoảng{" "}
                    <strong>20k/truyện</strong>.
                  </p>
                </li>
                <li>
                  <p>
                    📖 Nguồn truyện tiếng Việt: Bạch Ngọc Sách, Truyện Full,
                    Truyện Chữ, Truyện TR, Tàng Thư Viện...
                  </p>
                </li>
                <li>
                  <p>
                    📚 Nguồn truyện tiếng Trung: zhaoshuyuan, biqubu,
                    qiushubang...
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab Online */}
        {activeTab === 2 && (
          <div className="online-content">
            <div className="tab-content-body">
              <h3 className="section-title">
                Nhập Tên Truyện Cần Tìm
              </h3>

              <div className="search-container">
                <div className="search-input-container">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Nhập tên truyện..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="search-input"
                  />
                </div>

                <CustomButton
                  disabled={!searchText}
                  onClick={() => console.log("Searching:", searchText)}
                >
                  Tìm kiếm
                </CustomButton>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="tabs-info">
        <div>
          <p>
            Truyện: <strong className="name">Không tên</strong>
          </p>
        </div>
        <div>
          <p>
            Tác giả: <strong className="author">Không biết</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SourceText;