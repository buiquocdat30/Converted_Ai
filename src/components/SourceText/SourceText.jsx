import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { Search, CloudUpload } from "@mui/icons-material";
import styles from "./SourceText.css";
import { styled } from "@mui/material/styles";

const SourceText = () => {
  const [value, setValue] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const CustomButton = styled(Button)({
    backgroundColor: "rgb(104, 146, 119)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgb(84, 126, 99)",
    },
    "&.Mui-disabled": {
      backgroundColor: "#f0f0f0",
      color: "#999",
      border: "1px solid #ddd",
    },
  });

  return (
    <Box className={styles.container}>
      <div className={styles.tabsTitleContainer}>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          variant="fullWidth"
          classes={{
            root: styles.tabsRoot,
            indicator: styles.tabsIndicator,
          }}
        >
          <Tab
            label="TXT"
            classes={{ root: styles.tabRoot, selected: styles.tabSelected }}
          />
          <Tab
            label="EPUB"
            classes={{ root: styles.tabRoot, selected: styles.tabSelected }}
          />
          <Tab
            label="Online"
            classes={{ root: styles.tabRoot, selected: styles.tabSelected }}
          />
        </Tabs>
      </div>

      <Box className={styles.tabContent}>
        {/* Tab TXT */}
        {value === 0 && (
          <div className={styles.txtContent}>
            <div className={styles.tabContentBody}>
              <div className={styles.sectionTitle}>
                Tải lên TXT
              </div>

              <CustomButton
                variant="contained"
                component="label"
                startIcon={<CloudUpload />}
                className={styles.uploadButton}
              >
                Chọn file TXT
                <input
                  type="file"
                  hidden
                  accept=".txt"
                  onChange={handleFileChange}
                />
              </CustomButton>

              {selectedFile && (
                <div className={styles.fileName}>
                  Đã chọn: {selectedFile.name}
                </div>
              )}
            </div>

            <div className={styles.tabContentBody}>
              <h3 className={styles.sectionTitle}>
                📌 Các định dạng chương được hỗ trợ:
              </h3>
              <ul className={styles.formatList}>
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
        {value === 1 && (
          <div className={styles.epubContent}>
            <div className={styles.tabContentBody}>
              <h3 className={styles.sectionTitle}>
                Tải lên EPUB
              </h3>

              <CustomButton
                variant="contained"
                component="label"
                startIcon={<CloudUpload />}
                className={styles.uploadButton}
              >
                Chọn file EPUB
                <input
                  type="file"
                  hidden
                  accept=".epub"
                  onChange={handleFileChange}
                />
              </CustomButton>

              {selectedFile && (
                <Typography className={styles.fileName}>
                  Đã chọn: {selectedFile.name}
                </Typography>
              )}
            </div>

            <div className={styles.tabContentBody}>
              <ul className={styles.formatList}>
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
        {value === 2 && (
          <div className={styles.onlineContent}>
            <div className={styles.tabContentBody}>
              <Typography variant="h6" className={styles.sectionTitle}>
                Nhập Tên Truyện Cần Tìm
              </Typography>

              <TextField
                fullWidth
                variant="outlined"
                placeholder="Nhập tên truyện..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={styles.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <CustomButton
                variant="contained"
                className={styles.searchButton}
                disabled={!searchText}
              >
                Tìm kiếm
              </CustomButton>
            </div>
          </div>
        )}
      </Box>

      <div className={styles.tabsInfo}>
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
    </Box>
  );
};

export default SourceText;