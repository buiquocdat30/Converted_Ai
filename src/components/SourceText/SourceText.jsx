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

  // Tạo styled component cho button
  const CustomButton = styled(Button)({
    backgroundColor: "rgb(104, 146, 119)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgb(84, 126, 99)",
    },
    "&.Mui-disabled": {
      backgroundColor: "white",
      color: "black",
      border: "1px solid #ccc",
    },
  });
  return (
    <Box className={styles.container}>
      <div className="tabs-title-container">
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

      <div className="tabs-body-container">
        {/* Nội dung các tab */}
        <Box className={styles.tabContent}>
          {/* Tab TXT */}
          {value === 0 && (
            <div className={styles.txtContent}>
              <div className={styles.epubContent}>
                <Typography variant="h6" className={styles.sectionTitle}>
                  Tải lên TXT
                </Typography>

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
                  <Typography className={styles.fileName}>
                    Đã chọn: {selectedFile.name}
                  </Typography>
                )}
              </div>
              <div className="tabContentBody">
                <Typography variant="h6" className={styles.sectionTitle}>
                  📌Các định dạng chương được hỗ trợ:
                </Typography>
                <ul className={styles.formatList}>
                  <li>
                    <Typography>
                      Chương N - Ví dụ: "Chương 1: Khối đầu"
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      chương N - Ví dụ: "Chương 1: Hành trình mới"
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      Chapter N - Ví dụ: "Chapter 2 - The Journey"
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      chapter N - Ví dụ: "chapters & A New Beginning"
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      SIXG (Hánh lý) - Ví dụ: "ระ十里 - สถิติวาระ"
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      SINR (SG) - Ví dụ: "路の塚 - 终极灼光"
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      Số + Tiêu Gè (Hán hứ) + Trang - Ví dụ: "19 峰老 (第1页)"
                    </Typography>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab EPUB */}
          {value === 1 && (
            <div className={styles.epubContent}>
              <Typography variant="h6" className={styles.sectionTitle}>
                Tải lên EPUB
              </Typography>

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
              <div className="tabContentBody">
                <ul className={styles.formatList}>
                  <li>
                    <Typography>
                      <strong>
                        Nếu bạn chưa có file EPUB, có thể nhờ thành viên trong
                        nhóm hỗ trợ tạo (miễn phí hoặc có phí).
                      </strong>{" "}
                      Mọi người tự thương lượng giá, mặc định khoảng{" "}
                      <strong>20k/truyện</strong>. Dưới đây là một số nguồn có
                      thể tạo EPUB:
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      📖 Nguồn truyện tiếng Việt:Bạch Ngọc Sách, Truyện Full,
                      Truyện Chữ, Truyện TR, Tàng Thư Viện, Truyện YY, Wiki
                      Dịch, Wikidich App, Koanchay, SS Truyện, Truyện QQ, Truyện
                      VN, Wattpad, D Truyện, Hako Novel, Thích Đọc Truyện, Sàn
                      Truyện...
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      📚 Nguồn truyện tiếng Trung:zhaoshuyuan, biqubu,
                      qiushubang, fansg, bqxs520, KeepShu, gongzicp, mibiquge,
                      shubao45, shubl, Dizishu, Chuandaipc, ixunshu...
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      <span></span>
                      <a href=""> Tham gia nhóm chat để nhờ hoặc thuê hỗ trợ</a>
                    </Typography>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab Online */}
          {value === 2 && (
            <div className={styles.onlineContent}>
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
          )}
        </Box>
      </div>
      <div className="tabs-info">
        <div>
          <p>Truyện: <strong className="name">Không tên</strong></p>
        </div>
        <div>
          <p>Tác giả: <strong className="author"></strong>Không biết</p>
        </div>
      </div>
    </Box>
  );
};

export default SourceText;
