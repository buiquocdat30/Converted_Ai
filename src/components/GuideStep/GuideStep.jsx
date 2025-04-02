import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { PlayCircle, Folder, Tune, Key } from "@mui/icons-material";
import "./GuideStep.css";

const GuideSteps = () => {
  return (
    <div className="guide-container">
      <Typography variant="h5" className="guide-title">
        📖 Hướng Dẫn Sử Dụng
      </Typography>

      {/* Bước 1 */}
      <Card className="guide-card">
        <CardContent>
          <Typography variant="h6" className="guide-step-title">
            🟢 Bước 1: Đọc hướng dẫn
          </Typography>
          <Typography variant="body2">
            Hãy đọc kỹ hướng dẫn trước khi bắt đầu sử dụng công cụ.
          </Typography>
          <a href="#" className="guide-link">
            <PlayCircle className="guide-icon" /> Xem video hướng dẫn
          </a>
        </CardContent>
      </Card>

      {/* Bước 2 */}
      <Card className="guide-card">
        <CardContent>
          <Typography variant="h6" className="guide-step-title">
            📂 Bước 2: Nhập File
          </Typography>
          <Typography variant="body2">
            Hệ thống hỗ trợ các định dạng:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary="TXT (Văn bản thuần)" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary="EPUB (Sách điện tử)" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary="Lấy trực tiếp từ metruyenchu" />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Bước 3 */}
      <Card className="guide-card">
        <CardContent>
          <Typography variant="h6" className="guide-step-title">
            ⚙️ Bước 3: Cài đặt AI
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Tune />
              </ListItemIcon>
              <ListItemText primary="Chọn Model AI" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Key />
              </ListItemIcon>
              <ListItemText primary="Nhập API Key (mã khóa AI)" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Tune />
              </ListItemIcon>
              <ListItemText primary="Chọn kiểu dịch/chỉnh sửa" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuideSteps;
