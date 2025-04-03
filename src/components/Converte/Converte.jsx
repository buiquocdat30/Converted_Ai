import React, { useState } from "react";
import { Button, Slider, TextField, LinearProgress } from "@mui/material";
import { ExpandLess } from "@mui/icons-material";
import "./Converte.css";

const Convert = () => {
  const [progress, setProgress] = useState(100);
  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(1);

  const primaryColor = "rgb(104, 146, 119)"; // Màu chủ đạo

  return (
    <div className="convert-container">
      <h1 className="convert-title">Bắt Đầu</h1>

      {/* Thu Gọn/ Mở Rộng */}
      {/* <div className="expand-section">
        <h2 className="expand-title">Thu Gọn/ Mở Rộng</h2>
        <Button className="expand-btn">
          <ExpandLess />
        </Button>
      </div> */}

      {/* Tiến độ */}
      <div className="progress-section">
        <div className="progress-text">Tiến độ: {progress}%</div>
        <LinearProgress
          variant="determinate"
          value={progress}
          className="progress-bar"
          sx={{
            backgroundColor: "#ddd",
            "& .MuiLinearProgress-bar": { backgroundColor: primaryColor },
          }}
        />
      </div>

      {/* Chọn Chương */}
      <div className="chapter-selection">
        <div className="chapter-box">
          <TextField
            label="Chương Bắt Đầu"
            type="number"
            value={startChapter}
            onChange={(e) => setStartChapter(e.target.value)}
            className="chapter-input"
            variant="outlined"
          />
          <Slider
            value={startChapter}
            onChange={(e, newValue) => setStartChapter(newValue)}
            min={1}
            max={100}
            className="chapter-slider"
            sx={{ color: primaryColor }}
          />
        </div>

        <div className="chapter-box">
          <TextField
            label="Chương Kết Thúc"
            type="number"
            value={endChapter}
            onChange={(e) => setEndChapter(e.target.value)}
            className="chapter-input"
            variant="outlined"
          />
          <Slider
            value={endChapter}
            onChange={(e, newValue) => setEndChapter(newValue)}
            min={1}
            max={100}
            className="chapter-slider"
            sx={{ color: primaryColor }}
          />
        </div>
      </div>

      {/* Các nút thao tác */}
      <div className="button-group">
        <Button variant="outlined" className="custom-button">
          Dịch Tiếp
        </Button>
        <Button variant="outlined" className="custom-button">
          Dịch Lại
        </Button>
      </div>

      <div className="button-group">
        <Button variant="contained" style={{ backgroundColor: primaryColor }} className="custom-button">
          Tiến Trình
        </Button>
        <Button variant="contained" style={{ backgroundColor: primaryColor }} className="custom-button">
          Dừng
        </Button>
      </div>

      <div className="button-group">
        <Button variant="contained" style={{ backgroundColor: primaryColor }} className="custom-button">
          Xuất EPUB
        </Button>
        <Button variant="contained" style={{ backgroundColor: primaryColor }} className="custom-button">
          Xuất Text
        </Button>
      </div>

      {/* Thông tin chương */}
      <div className="chapter-info">
        <div className="text-sm">Chương</div>
        <div className="text-xl">{startChapter}</div>
      </div>

      <div className="text-sm text-gray-500 chapter-text">
        C1 - Truyện: Không tên-1743580459618
      </div>
    </div>
  );
};

export default Convert;
