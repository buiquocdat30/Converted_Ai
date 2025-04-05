const express = require("express");
const dotenv =require ("dotenv")
const cookieParser =require("cookie-parser")
const cors =require("cors")

const { VertexAI } = require("@google-cloud/aiplatform");
dotenv.config(); // Load biến môi trường từ .env

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())

const PROJECT_ID = "gen-lang-client-0684510407"; // Thay thế bằng ID dự án của bạn
const LOCATION = "us-central1"; // Thay thế bằng vị trí của bạn (ví dụ: 'us-central1')
const MODEL_ID = "gemini-1.5-pro"; // Chọn mô hình Gemini của bạn

// Khởi tạo Vertex AI
// const vertex_ai = new VertexAI({ project: PROJECT_ID, location: LOCATION });

// app.post("/translate", async (req, res) => {
//   const { text, targetLanguage } = req.body;

//   try {
//     const model = vertex_ai.preview.getGenerativeModel({
//       model: MODEL_ID,
//     });

//     const result = await model.generateContent({
//       contents: [{ parts: [{ text: text }] }],
//       generation_config: {
//         temperature: 0.8,
//         topK: 1,
//         topP: 1,
//         maxOutputTokens: 2048,
//       },
//     });

//     const response = await result.response;
//     const translatedText = response.candidates[0].content.parts[0].text;

//     res.json({ translatedText });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Lỗi dịch thuật");
//   }
// });


app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
