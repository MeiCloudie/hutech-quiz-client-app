import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"

function createData(
  fullName: string,
  email: string,
  rightAnswer: number,
  wrongAnswer: number,
  totalScore: number
) {
  return { fullName, email, rightAnswer, wrongAnswer, totalScore }
}

const rows = [
  createData("John", "john.doe@example.com", 10, 5, 80),
  createData("Jane", "jane.doe@example.com", 15, 3, 90),
  createData("Bob", "bob.smith@example.com", 8, 7, 60),
]

function ResultPage() {
  return (
    <Box>
      <Typography variant="h2" fontWeight={"bold"} gutterBottom>
        BẢNG KẾT QUẢ
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="h6">Phòng thi: code123</Typography>
        <Typography variant="h6">Bộ đề: quizName</Typography>
        <Typography variant="h6">Người tổ chức: GV. fullname</Typography>
        <Typography variant="h6">Giờ kiểm tra: startAt</Typography>
      </Box>
      <Box>
        <TableContainer component={Paper} sx={{ backgroundColor: "#ffe7f0" }}>
          <Table sx={{ minWidth: 650 }} aria-label="result-table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>HỌ TÊN</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>EMAIL</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  SỐ CÂU ĐÚNG
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  SỐ CÂU SAI
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  TỔNG ĐIỂM
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                // ! Có thể đổi lại key
                <TableRow
                  key={row.fullName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.fullName}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell align="right">{row.rightAnswer}</TableCell>
                  <TableCell align="right">{row.wrongAnswer}</TableCell>
                  <TableCell align="right">{row.totalScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default ResultPage
