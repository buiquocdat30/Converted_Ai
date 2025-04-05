import React, { useState } from "react";
import {
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useAI } from "../Contexts/AiContext";
import { styled } from "@mui/material/styles";
import "./ChooseAI.css";

const ChooseAI = () => {
  const [activeProvider, setActiveProvider] = useState("google");
  const [selectedModel, setSelectedModel] = useState("gemini-1.5-flash");
  const [apiKey, setApiKey] = useState("");

  // Tạo CustomButton như yêu cầu
  const CustomButton = styled("button")({
    backgroundColor: "rgb(104, 219, 155)",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    width: "100%",
    "&:hover": {
      backgroundColor: "rgb(84, 180, 120)",
    },
  });

  // Dữ liệu nhà cung cấp
  const providers = [
    {
      id: "google",
      name: "Google (Miễn phí)",
      description:
        "Google cung cấp dịch vụ AI miễn phí, cho phép người dùng trải nghiệm dễ dàng. Để bắt đầu, bạn chỉ cần lấy API key (mã khóa) miễn phí từ Google nhé!",
      models: [
        {
          id: "gemini-1.5-flash-8b",
          name: "Gemini 1.5 Flash-8B",
          limit: "Giới hạn miễn phí: 15 lần/phút, 1500 lần một ngày.",
        },
        {
          id: "gemini-2.0-flash-lite",
          name: "Gemini 2.0 Flash-Lite",
          limit: "Giới hạn miễn phí: 30 lần/phút, 1500 lần một ngày.",
        },
        {
          id: "gemini-1.5-flash",
          name: "Gemini 1.5 Flash",
          limit: "Giới hạn miễn phí: 15 lần/phút, 1500 lần một ngày.",
        },
        {
          id: "gemini-2.0-flash",
          name: "Gemini 2.0 Flash",
          limit: "Giới hạn miễn phí: 15 lần/phút, 1500 lần một ngày.",
        },
        {
          id: "gemini-2.5-pro",
          name: "Gemini 2.5 Pro Experimental 03-25",
          limit: "Giới hạn miễn phí: 5 lần/phút, 25 lần một ngày.",
        },
      ],
    },
    
  ];
  const { aiConfig, updateAIConfig } = useAI();

  const currentProvider =
    providers.find((p) => p.id === activeProvider) || providers[0];

  const handleProviderChange = (event) => {
    setActiveProvider(event.target.value);
  };
  const handleModelChange = (modelId) => {
    updateAIConfig({ model: modelId });
  };

  const handleApiKeyChange = (e) => {
    const key = e.target.value;
  console.log("API Key nhập vào:", key); // Thêm dòng này để debug
  updateAIConfig({ apiKey: key });
  };

  const handleStyleChange = (e) => {
    updateAIConfig({ translationStyle: e.target.value });
  };

  const handleOptionChange = (e) => {
    updateAIConfig({ [e.target.name]: e.target.checked });
  };
  return (
    <div className="choose-ai-container">
      <h2 className="main-title">Cài đặt AI.</h2>

      <div className="section">
        <div className="section-header">
          {/* <h3 className="section-title">Tính Năng Cơ Bản</h3>
          <span className="collapse-icon">▼</span> */}
        </div>

        {/* Material UI Select thay thế dropdown */}
        <Box sx={{ margin: "15px" }}>
          <FormControl fullWidth>
            <InputLabel id="provider-select-label">
              Chọn Nhà Cung Cấp
            </InputLabel>
            <Select
              labelId="provider-select-label"
              id="provider-select"
              value={activeProvider}
              label="Chọn Nhà Cung Cấp"
              onChange={handleProviderChange}
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ddd",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#68db9b",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#68db9b",
                },
              }}
            >
              {providers.map((provider) => (
                <MenuItem key={provider.id} value={provider.id}>
                  {provider.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <div className="provider-description">
          {currentProvider.description}
        </div>

        {/**Phàn chọn model AI */}
        <div className="model-selection">
          <Typography variant="h6" component="div">
            Chọn Mô Hình AI
          </Typography>
          <div className="model-grid">
            {currentProvider.models.map((model) => (
              <div className="model-option" key={model.id}>
                <label className="model-label">
                  <input
                    type="radio"
                    name="aiModel"
                    value={model.id}
                    checked={selectedModel === model.id}
                    onChange={() => setSelectedModel(model.id)}
                  />
                  <div className="model-info">
                    <div className="model-name">{model.name}</div>
                    <div className="model-limit">{model.limit}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/**Phàn chọn ngữ cảnh và phong cách dịch */}
        <div className="translation-options-section">
          <h4>Tùy chọn dịch thuật</h4>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="translation-style-label">
              Phong cách dịch
            </InputLabel>
            <Select
              labelId="translation-style-label"
              value={aiConfig.translationStyle}
              label="Phong cách dịch"
              onChange={handleStyleChange}
            >
              <MenuItem value="literary">
                Văn học (trang trọng, trau chuốt)
              </MenuItem>
              <MenuItem value="natural">
                Tự nhiên (gần gũi, đời thường)
              </MenuItem>
              <MenuItem value="formal">Hàn lâm (chính xác, học thuật)</MenuItem>
              <MenuItem value="creative">
                Sáng tạo (phóng tác, sáng tạo)
              </MenuItem>
            </Select>
          </FormControl>

          <div className="checkbox-options">
            <FormControlLabel
              control={
                <Checkbox
                  checked={aiConfig.preserveFormatting}
                  onChange={handleOptionChange}
                  name="preserveFormatting"
                />
              }
              label="Giữ nguyên định dạng (in nghiêng, in đậm)"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={aiConfig.translateNames}
                  onChange={handleOptionChange}
                  name="translateNames"
                />
              }
              label="Dịch tên nhân vật/địa danh"
            />
          </div>
        </div>

        <div className="api-key-section">
          <h4>Nhập Key API (chìa khóa dịch vụ AI)</h4>
          <input
            type="text"
            className="api-key-input"
            placeholder="Nhập API key của bạn tại đây..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <div className="button-group">
          <CustomButton className="admin-help-button">
            Nhờ Admin Hỗ Trợ
          </CustomButton>
          <CustomButton className="get-free-key-button">
            Tự Lấy Key Miễn Phí
          </CustomButton>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          {/* <h3 className="section-title">Chọn Yêu Cầu</h3>
          <span className="collapse-icon">▼</span> */}
        </div>
        {/* Nội dung section này có thể mở rộng sau */}
      </div>
    </div>
  );
};

export default ChooseAI;
