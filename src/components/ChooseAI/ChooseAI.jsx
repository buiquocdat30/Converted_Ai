import React from 'react';
import styles from './ChooseAI.css'
import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';


const ChooseAI = () => {
  return (
    <Box className={styles.container}>
      {/* Phần 1: Tiêu đề */}
      <Typography variant="h5" className={styles.title}>
        Cài đặt AI
      </Typography>
      <Typography variant="h6" className={styles.subtitle}>
        Tiền Miếu cơ bản
      </Typography>

      {/* Phần 2: Chọn nhà cung cấp */}
      <Box className={styles.section}>
        <Typography variant="subtitle1" className={styles.sectionTitle}>
          Chọn khối chọn tốp
        </Typography>
        <FormControl fullWidth className={styles.select}>
          <InputLabel>Nhà cung cấp</InputLabel>
          <Select value="google">
            <MenuItem value="google">Google (Mẫm phí)</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2" className={styles.note}>
          Dương cung sống dào ra AI mắt, ghi, cho phép người được giải nghiệm...
        </Typography>
      </Box>

      <Divider className={styles.divider} />

      {/* Phần 3: Bảng so sánh AI */}
      <Typography variant="h6" className={styles.sectionTitle}>
        Chọn Môi trình AI
      </Typography>
      <TableContainer component={Paper} className={styles.table}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Quanti 1.5 Flash-Git</TableCell>
              <TableCell>Quanti 2.5 Flash-Lite</TableCell>
              <TableCell>Quanti 1.5 Flash</TableCell>
              <TableCell>Quanti 2.5 Flash</TableCell>
              <TableCell>Quanti 2.5 Pro Experienced SD-25</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Giới hạn: 15 fb./phút, 1500 fb./ngày</TableCell>
              <TableCell colSpan={2}>Giới hạn: 30 fb./phút, 1500 fb./ngày</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phần 4: Nhập API Key */}
      <Typography variant="h6" className={styles.sectionTitle}>
        Nhập Key API
      </Typography>
      <TextField
        fullWidth
        placeholder="Nhập API key của bạn"
        className={styles.input}
      />

      <Divider className={styles.divider} />

      {/* Phần 5: Lấy Key miễn phí */}
      <Button variant="contained" className={styles.button}>
        Tự lấy Key Miễn Phí
      </Button>

      <Divider className={styles.divider} />

      {/* Phần 6: Yêu cầu */}
      <Box className={styles.section}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Chọn Yêu Cầu
        </Typography>
        <Typography variant="body2" className={styles.requirement}>
          Sắp xếp vị trí các tài sản, gửi nguyên các đại từ nhân xung...
        </Typography>
      </Box>
    </Box>
  );
};

export default ChooseAI;