import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Slider,
  TextField,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  CircularProgress,
} from "@mui/material";
import Epub  from "epub-gen";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FileContext } from "../Contexts/FileContext";
import { useAI } from "../Contexts/AiContext";
import "./Converte.css";

const Convert = () => {
  const [progress, setProgress] = useState(0);
  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(1);
  const [translatedContent, setTranslatedContent] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);
  const { selectedFile } = useContext(FileContext);
  const { aiConfig } = useAI();

  const primaryColor = "rgb(104, 146, 119)";

  // Thêm state cho EPUB metadata
  const [bookMetadata, setBookMetadata] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    if (selectedFile && selectedFile.name.endsWith(".epub")) {
      loadEPUBMetadata(selectedFile);
    } else {
      setBookMetadata(null);
      setCoverImage(null);
    }
  }, [selectedFile]);

  const loadEPUBMetadata = async (file) => {
    try {
      const { default: EpubJS } = await import("epubjs");
      const book = EpubJS(URL.createObjectURL(file));

      const metadata = await book.loaded.metadata;
      setBookMetadata({
        title: metadata.title,
        creator: metadata.creator,
        publisher: metadata.publisher,
      });

      const cover = await book.coverUrl();
      if (cover) setCoverImage(cover);
    } catch (error) {
      console.error("Error loading EPUB:", error);
    }
  };
  // Thêm hàm phân tích chương (đặt trước handleTranslate)
  const parseChapters = (content) => {
    const chapterRegex =
      /(Chương|Chapter|chương|chapter)\s*(\d+)(.*?)(?=\n\s*(Chương|Chapter|chương|chapter)\s*\d+|$)/gis;
    const chapters = [];
    let match;

    while ((match = chapterRegex.exec(content)) !== null) {
      chapters.push({
        number: parseInt(match[2]),
        title: match[3].trim(),
        content: match[0].trim(),
      });
    }
    return chapters.length > 0 ? chapters : [{ number: 1, title: "", content }];
  };

  //nhập
  const handleTranslate = async () => {
    setError(null);
    try {
      if (!selectedFile) {
        alert("Vui lòng chọn file trước khi dịch");
        return;
      }

      if (!aiConfig.apiKey) {
        alert("Vui lòng nhập API Key trong phần cài đặt AI");
        return;
      }

      const content = await readFileContent(selectedFile);
      const chapters = parseChapters(content);
      const filteredChapters = chapters.filter(
        (chap) => chap.number >= startChapter && chap.number <= endChapter
      );

      let fullTranslation = "";
      for (const chapter of filteredChapters) {
        const translatedText = await translateContent(chapter.content);
        fullTranslation += `Chương ${chapter.number}${
          chapter.title ? ": " + chapter.title : ""
        }\n\n${translatedText}\n\n`;
        setProgress(
          Math.floor(
            ((filteredChapters.indexOf(chapter) + 1) /
              filteredChapters.length) *
              100
          )
        );
      }

      setTranslatedContent(fullTranslation);
    } catch (err) {
      setError(err.message);
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const translateContent = async (content) => {
    if (!aiConfig.apiKey) {
      throw new Error("API Key không hợp lệ");
    }

    try {
      
      const genAI = new GoogleGenerativeAI(aiConfig.apiKey);

      // Kiểm tra kết nối API
      try {
        await genAI
          .getGenerativeModel({ model: "gemini-pro" })
          .generateContent("test");
      } catch (apiError) {
        throw new Error(
          `API Key lỗi: ${
            apiError.message.includes("API_KEY")
              ? "Key không hợp lệ hoặc hết hạn"
              : apiError.message
          }`
        );
      }
    } catch (error) {
      console.error("Lỗi dịch:", error);
      throw new Error(`Dịch thất bại: ${error.message}`);
    }
  };

  // Hàm chia văn bản thành các đoạn nhỏ
  const splitTextIntoChunks = (text, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.substring(i, i + chunkSize));
    }
    return chunks;
  };

  const handleRetranslate = () => {
    setTranslatedContent("");
    handleTranslate();
  };

  const handleExport = async (type) => {
    if (!translatedContent) return;

    if (type === "Text") {
      const blob = new Blob([translatedContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `translated_${
        selectedFile?.name?.replace(/\.[^/.]+$/, "") || "output"
      }.txt`;
      a.click();
    } else if (type === "EPUB") {
      try {
        const options = {
          title: bookMetadata?.title || "Translated Book",
          author: bookMetadata?.creator || "Unknown",
          content: [{ title: "Nội dung", data: translatedContent }],
        };
        await new Epub(options).promise;
        alert("Xuất EPUB thành công!");
      } catch (error) {
        alert(`Lỗi xuất EPUB: ${error.message}`);
      }
    }
  };
  return (
    <div className="convert-container">
      <h1 className="convert-title">Bắt Đầu</h1>

      {/* Hiển thị EPUB metadata nếu có */}
      {bookMetadata && (
        <div className="epub-metadata">
          {coverImage && (
            <img src={coverImage} alt="Book cover" className="cover-image" />
          )}
          <div className="metadata-info">
            <h3>{bookMetadata.title || "Không có tiêu đề"}</h3>
            <p>Tác giả: {bookMetadata.creator || "Không rõ"}</p>
            {bookMetadata.publisher && (
              <p>Nhà xuất bản: {bookMetadata.publisher}</p>
            )}
          </div>
        </div>
      )}

      <div className="expand-section">
        {selectedFile ? (
          <h2 className="expand-title">
            <strong>{selectedFile.name}</strong>
          </h2>
        ) : (
          <p>Chưa có file nào được chọn từ component SourceText</p>
        )}
      </div>

      {/* Tùy chọn dịch thuật */}
      <Box sx={{ mb: 3, p: 2, border: "1px solid #eee", borderRadius: 1 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Phong cách dịch</InputLabel>
          <Select
            value={aiConfig.translationStyle || "natural"}
            label="Phong cách dịch"
            onChange={(e) => {}}
          >
            <MenuItem value="natural">Tự nhiên</MenuItem>
            <MenuItem value="literary">Văn học</MenuItem>
            <MenuItem value="formal">Trang trọng</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Checkbox checked={aiConfig.preserveFormatting || false} />}
          label="Giữ nguyên định dạng"
          sx={{ mr: 2 }}
        />
        <FormControlLabel
          control={<Checkbox checked={aiConfig.translateNames || false} />}
          label="Dịch tên riêng"
        />
      </Box>

      {/* Tiến độ */}
      <div className="progress-section">
        <div className="progress-text">
          Tiến độ: {progress}%
          {isTranslating && (
            <span className="loading-indicator">
              <CircularProgress
                size={16}
                thickness={5}
                sx={{
                  color: primaryColor,
                  marginLeft: "8px",
                  verticalAlign: "middle",
                }}
              />
              <span style={{ marginLeft: "4px" }}>Đang xử lý...</span>
            </span>
          )}
        </div>
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
            disabled={isTranslating}
          />
          <Slider
            value={startChapter}
            onChange={(e, newValue) => setStartChapter(newValue)}
            min={1}
            max={100}
            className="chapter-slider"
            sx={{ color: primaryColor }}
            disabled={isTranslating}
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
            disabled={isTranslating}
          />
          <Slider
            value={endChapter}
            onChange={(e, newValue) => setEndChapter(newValue)}
            min={1}
            max={100}
            className="chapter-slider"
            sx={{ color: primaryColor }}
            disabled={isTranslating}
          />
        </div>
      </div>
      {/**Bắt lỗi */}
      {error && (
        <div
          className="error-message"
          style={{ color: "red", margin: "10px 0" }}
        >
          ⚠️ {error}
        </div>
      )}
      {/* Các nút thao tác */}
      <div className="button-group">
        <Button
          variant="outlined"
          className="custom-button"
          onClick={handleTranslate}
          disabled={isTranslating || !selectedFile}
        >
          Dịch Tiếp
        </Button>
        <Button
          variant="outlined"
          className="custom-button"
          onClick={handleRetranslate}
          disabled={isTranslating || !translatedContent}
        >
          Dịch Lại
        </Button>
      </div>

      <div className="button-group">
        <Button
          variant="contained"
          style={{ backgroundColor: primaryColor }}
          className="custom-button"
          onClick={() => setProgress((prev) => Math.min(prev + 10, 100))}
          disabled={isTranslating || progress >= 100}
        >
          Tiến Trình
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: primaryColor }}
          className="custom-button"
          onClick={() => setIsTranslating(false)}
          disabled={!isTranslating}
        >
          Dừng
        </Button>
      </div>

      <div className="button-group">
        <Button
          variant="contained"
          style={{ backgroundColor: primaryColor }}
          className="custom-button"
          onClick={() => handleExport("EPUB")}
          disabled={!translatedContent}
        >
          Xuất EPUB
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: primaryColor }}
          className="custom-button"
          onClick={() => handleExport("Text")}
          disabled={!translatedContent}
        >
          Xuất Text
        </Button>
      </div>

      {/* Thông tin chương */}
      <div className="chapter-info">
        <div className="text-sm">Chương</div>
        <div className="text-xl">{startChapter}</div>
        <div className="chapter-content">
          <textarea
            value={translatedContent}
            onChange={(e) => setTranslatedContent(e.target.value)}
            placeholder={
              isTranslating ? "Đang dịch..." : "Nội dung dịch sẽ hiển thị ở đây"
            }
            readOnly={isTranslating}
          />
        </div>
      </div>

      <div className="text-sm text-gray-500 chapter-text">
        {selectedFile
          ? `Chương ${startChapter} - ${selectedFile.name}`
          : "Chưa có file nào được chọn"}
      </div>
    </div>
  );
};

export default Convert;
