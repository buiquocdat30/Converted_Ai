import React, { useState } from 'react';
import { Tab, Tabs, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import './ChooseAI.css';

const ChooseAI = () => {
  const [activeProvider, setActiveProvider] = useState('google');
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');
  const [apiKey, setApiKey] = useState('');

  // Tạo CustomButton như yêu cầu
  const CustomButton = styled('button')({
    backgroundColor: 'rgb(104, 219, 155)',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgb(84, 180, 120)',
    },
  });

  // Dữ liệu nhà cung cấp
  const providers = [
    {
      id: 'google',
      name: 'Google (Miễn phí)',
      description: 'Google cung cấp dịch vụ AI miễn phí, cho phép người dùng trải nghiệm dễ dàng. Để bắt đầu, bạn chỉ cần lấy API key (mã khóa) miễn phí từ Google nhé!',
      models: [
        { id: 'gemini-1.5-flash-8b', name: 'Gemini 1.5 Flash-8B', limit: 'Giới hạn miễn phí: 15 lần/phút, 1500 lần một ngày.' },
        { id: 'gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash-Lite', limit: 'Giới hạn miễn phí: 30 lần/phút, 1500 lần một ngày.' },
        { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', limit: 'Giới hạn miễn phí: 15 lần/phút, 1500 lần một ngày.' },
        { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', limit: 'Giới hạn miễn phí: 15 lần/phút, 1500 lần một ngày.' },
        { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro Experimental 03-25', limit: 'Giới hạn miễn phí: 5 lần/phút, 25 lần một ngày.' },
      ]
    },
    {
      id: 'openrouter-free',
      name: 'OpenRouter (Miễn phí)',
      description: 'OpenRouter là dịch vụ giúp bạn truy cập AI từ nhiều nhà cung cấp như GPT, DeepSeek, Qwen... Bạn có thể tự tạo API key trên trang chủ OpenRouter bằng cách đăng nhập bằng Google. OpenRouter cho phép dùng 200 yêu cầu mỗi ngày nhé.',
      models: [
        { id: 'deepseek-v3', name: 'DeepSeek: DeepSeek V3 0324 (free)', limit: 'Chưa có thông tin tính toán nhé' },
        { id: 'deepseek-r1', name: 'DeepSeek: R1 (free)', limit: 'Chưa có thông tin tính toán nhé' },
        { id: 'deepseek-r1-32b', name: 'DeepSeek: R1 Distil Qwen 32B (free)', limit: 'Chưa có thông tin tính toán nhé' },
        { id: 'deepseek-r1-14b', name: 'DeepSeek: R1 Distil Qwen 14B (free)', limit: 'Chưa có thông tin tính toán nhé' },
      ]
    },
    {
      id: 'openrouter-paid',
      name: 'OpenRouter (Có phí)',
      description: 'OpenRouter là dịch vụ giúp bạn truy cập AI từ nhiều nhà cung cấp như GPT, DeepSeek, Qwen... Bạn có thể tự mua API key trên trang chủ OpenRouter bằng cách đăng nhập bằng Google và thanh toán bằng thẻ tín dụng. Nếu mọi người ngại thanh toán quốc tế, Admin có thể hỗ trợ mua giúp (phí 20k nhé), mình chỉ mua lại của OpenRouter chứ không cung cấp dịch vụ AI. Bạn hoàn toàn có thể tự mua và thêm API key vào hệ thống. OpenRouter tính phí kiểu credits, nghĩa là bạn mua từng gói 5 USD, dùng hết thì nạp tiếp nhé. Dưới đây là mức giá ước tính cho 1 triệu chữ, chỉ mang tính tham khảo và có thể không chính xác.',
      models: [
        { id: 'gemini-1.5-flash-8b-paid', name: 'Gemini 1.5 Flash-8B', limit: 'Giới hạn: 4000 lần/phút. Giá khoảng: 7,188 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'gemini-1.5-flash-paid', name: 'Gemini 1.5 Flash', limit: 'Giới hạn: 2000 lần/phút. Giá khoảng: 14,377 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'gemini-2.0-flash-lite-paid', name: 'Gemini 2.0 Flash-Lite', limit: 'Giới hạn: 4000 lần/phút. Giá khoảng: 14,377 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'gemini-2.0-flash-paid', name: 'Gemini 2.0 Flash', limit: 'Giới hạn: 2000 lần/phút. Giá khoảng: 19,177 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'gemini-1.5-pro-paid', name: 'Gemini 1.5 Pro', limit: 'Giới hạn: 1000 lần/phút. Giá khoảng: 239,624 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'openai-o3-mini', name: 'OpenAI o3 Mini', limit: 'Giá khoảng: 140,631 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'openai-gpt-4o-mini', name: 'OpenAI GPT-4o Mini', limit: 'Giá khoảng: 19,167 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'openai-chatgpt-4o', name: 'OpenAI ChatGPT-4o', limit: 'Giá khoảng: 87,495 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'deepseek-v3-paid', name: 'DeepSeek V3', limit: 'Giá khoảng: 33,283 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'deepseek-r1-paid', name: 'DeepSeek R1', limit: 'Giá khoảng: 62,295 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'qwen-32b', name: 'Qwen QwQ 32B', limit: 'Giá khoảng: 5,745 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'qwen-32b-instruct', name: 'Qwen2.5 32B Instruct', limit: 'Giá khoảng: 18,587 VND / 1 triệu từ (ước lượng, có thể có sai số).' },
        { id: 'grok-2', name: 'Grok 2 1212', limit: 'Giá: 460,000 VND / 1 triệu từ.' },
      ]
    }
  ];

  const currentProvider = providers.find(p => p.id === activeProvider) || providers[0];

  const handleProviderChange = (event) => {
    setActiveProvider(event.target.value);
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
        <Box sx={{ margin: '15px' }}>
          <FormControl fullWidth>
            <InputLabel id="provider-select-label">Chọn Nhà Cung Cấp</InputLabel>
            <Select
              labelId="provider-select-label"
              id="provider-select"
              value={activeProvider}
              label="Chọn Nhà Cung Cấp"
              onChange={handleProviderChange}
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ddd',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#68db9b',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#68db9b',
                }
              }}
            >
              {providers.map((provider) => (
                <MenuItem key={provider.id} value={provider.id}>{provider.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <p className="provider-description">{currentProvider.description}</p>
        <a href="#" className="more-info-link">Thông tin chi tiết</a>

        <div className="model-selection">
          <h4>Chọn Mô Hình AI</h4>
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
          <CustomButton className="admin-help-button">Nhờ Admin Hỗ Trợ</CustomButton>
          <CustomButton className="get-free-key-button">Tự Lấy Key Miễn Phí</CustomButton>
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