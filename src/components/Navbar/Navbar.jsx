import React from "react";
import "./Navbar.css";
import { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";

const steps = ["Nhập thông tin", "Thanh toán", "Hoàn tất"];

const Navbar = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <div className="nav-wrapper">
      <div style={{ width: "50%", margin: "auto", textAlign: "center" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div style={{ marginTop: 20 }}>
          {activeStep === steps.length ? (
            <div>
              <Typography variant="h6">🎉 Hoàn tất!</Typography>
              <Button onClick={handleReset}>Bắt đầu lại</Button>
            </div>
          ) : (
            <div>
              <Typography variant="body1">
                {activeStep === 0 && "Nhập thông tin cá nhân của bạn."}
                {activeStep === 1 && "Chọn phương thức thanh toán."}
                {activeStep === 2 && "Xác nhận và hoàn tất đơn hàng."}
              </Typography>

              <div style={{ marginTop: 20 }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Quay lại
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  style={{ marginLeft: 10 }}
                >
                  {activeStep === steps.length - 1 ? "Hoàn tất" : "Tiếp tục"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
