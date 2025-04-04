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
import { FileContext } from "../Contexts/FileContext";
import { useAI } from "../Contexts/AiContext";
import "./Converte.css";

const Convert = () => {
  const [progress, setProgress] = useState(0);
  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(1);
  const [translatedContent, setTranslatedContent] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
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

  const handleTranslate = async () => {
    if (!selectedFile) {
      alert("Vui lòng chọn file trước khi dịch");
      return;
    }

    if (!aiConfig.apiKey) {
      alert("Vui lòng nhập API Key trong phần cài đặt AI");
      return;
    }

    setIsTranslating(true);
    setProgress(0);

    try {
      let content = await readFileContent(selectedFile);
      const translatedText = await translateContent(content);
      setTranslatedContent(translatedText);
    } catch (error) {
      console.error("Lỗi khi dịch:", error);
      alert("Có lỗi xảy ra khi dịch: " + error.message);
    } finally {
      setIsTranslating(false);
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
      alert("Vui lòng nhập API Key trong phần cài đặt AI");
      return "";
    }

    setIsTranslating(true);
    setProgress(0);

    try {
      // 1. Tải động thư viện (giảm dung lượng build)
      const { GoogleGenerativeAI } = await import("@google/generative-ai");

      // 2. Khởi tạo client
      const genAI = new GoogleGenerativeAI(aiConfig.apiKey);
      const model = genAI.getGenerativeModel({
        model:
          aiConfig.model === "gemini-1.5-flash"
            ? "gemini-1.5-flash-latest"
            : "gemini-pro",
      });

      // 3. Tạo prompt thông minh
      const styleMap = {
        literary:
          "Hãy dịch sang tiếng Việt với phong cách văn học, trau chuốt, giữ nguyên vẻ đẹp ngôn từ.",
        natural:
          "Dịch tự nhiên như người Việt nói hàng ngày, có thể linh hoạt thay đổi câu từ cho phù hợp.",
        formal:
          "Dịch chính xác, giữ nguyên thuật ngữ, phù hợp văn bản học thuật.",
      };

      const prompt = `
      [YÊU CẦU]
      ${styleMap[aiConfig.translationStyle]}
      ${
        aiConfig.preserveFormatting
          ? "→ GIỮ NGUYÊN định dạng (in đậm, in nghiêng, gạch chân)"
          : ""
      }
      ${
        aiConfig.translateNames
          ? "→ DỊCH tên riêng sang tiếng Việt"
          : "→ GIỮ NGUYÊN tên riêng"
      }
  
      [VĂN BẢN GỐC]
      ${content}
      `;

      // 4. Chia nhỏ văn bản để tránh giới hạn token
      const chunks = splitTextIntoChunks(prompt, 15000); // Mỗi chunk ~15k ký tự
      let fullTranslation = "";

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        // 5. Gọi API Gemini
        const result = await model.generateContent({
          contents: [{ parts: [{ text: chunk }] }],
        });

        const response = await result.response;
        const translatedText = response.text();

        fullTranslation += translatedText + "\n\n";
        setProgress(Math.floor(((i + 1) / chunks.length) * 100));
      }

      return fullTranslation;
    } catch (error) {
      console.error("Lỗi dịch:", error);
      alert(`Lỗi: ${error.message || "Kiểm tra lại API Key"}`);
      return "";
    } finally {
      setIsTranslating(false);
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

  const handleExport = (type) => {
    alert(`Đã xuất file ${type} thành công!`);
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
            Thu Gọn/ Mở Rộng <strong>{selectedFile.name}</strong>
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
