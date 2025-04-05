import React from "react";
import "./StepperAi.css";
import GuideSteps from "../GuideStep/GuideStep";
import ChooseAI from "../ChooseAI/ChooseAI";
import SourceText from "../SourceText/SourceText";
import Converte from "../Converte/Converte";
import { useState, useContext, useEffect } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import { FileContext } from "../Contexts/FileContext";
import { useAI } from "../Contexts/AiContext";
import { styled } from "@mui/material/styles";

const steps = [
  "📖 Hướng Dẫn Sử Dụng.",
  "Chọn Nguồn Truyện Và Xử Lý",
  "Cài Đặt AI.",
  "Tiến Trình Biên Dịch.",
];

const StepperAi = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { selectedFile } = useContext(FileContext);
  const { aiConfig } = useAI();

  useEffect(() => {
    console.log("SelectedFile:", selectedFile); // Kiểm tra giá trị
  }, [selectedFile]);
  // Thêm vào phần đầu component (sau các import)
  const validateStep = (step) => {
    switch (step) {
      case 1: // Bước chọn nguồn
        return !!selectedFile; // Yêu cầu chọn file
      case 2: // Bước cài đặt AI
        return aiConfig.apiKey.trim() !== ""; // Yêu cầu nhập API Key
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (activeStep === 1 && !selectedFile) {
      alert("Vui lòng chọn file EPUB/TXT trước khi tiếp tục!");
      return;
    }
    if (activeStep === 2 && !aiConfig.apiKey) {
      alert("Vui lòng nhập API Key trước khi tiếp tục!");
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  // Custom Step Styles
  const CustomStep = styled(Step)({
    "& .MuiStepLabel-root": {
      "& .MuiStepIcon-root": {
        color: "#e0e0e0", // Màu icon khi chưa active
        "&.Mui-active": {
          color: "rgb(104, 146, 119)", // Màu icon khi active
        },
        "&.Mui-completed": {
          color: "rgb(104, 146, 119)", // Màu icon khi hoàn thành
        },
      },
      "& .MuiStepLabel-label": {
        color: "#666", // Màu text mặc định
        "&.Mui-active": {
          color: "black", // Màu text khi active
          fontWeight: "bold",
        },
        "&.Mui-completed": {
          color: "rgb(104, 146, 119)", // Màu text khi hoàn thành
        },
      },
    },
  });
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
    <div className="st-wrapper">
      <div className="st-wrapper-stepper">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <CustomStep key={index}>
              <StepLabel>{label}</StepLabel>
            </CustomStep>
          ))}
        </Stepper>

        <div style={{ marginTop: 20 }}>
          {activeStep === steps.length ? (
            <div>
              <Typography variant="h6">🎉 Hoàn tất!</Typography>
              <CustomButton onClick={handleReset}>Bắt đầu lại</CustomButton>
            </div>
          ) : (
            <div>
              <Typography variant="body1">
                {activeStep === 0 && <GuideSteps />}
                {activeStep === 1 && <SourceText />}
                {activeStep === 2 && <ChooseAI />}
                {activeStep === 3 && <Converte />}
              </Typography>

              <div className="st-list-button">
                <CustomButton disabled={activeStep === 0} onClick={handleBack}>
                  Quay lại
                </CustomButton>
                <CustomButton
                  variant="contained"
                  onClick={handleNext}
                  style={{ marginLeft: 10 }}
                >
                  {activeStep === steps.length - 1 ? "Hoàn tất" : "Tiếp tục"}
                </CustomButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperAi;
