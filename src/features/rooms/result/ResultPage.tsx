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
      <Typography variant="h1" fontWeight={"bold"}>
        BẢNG KẾT QUẢ
      </Typography>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="result-table">
            <TableHead>
              <TableRow>
                <TableCell>Họ tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Số câu đúng</TableCell>
                <TableCell align="right">Số câu sai</TableCell>
                <TableCell align="right">Tổng điểm</TableCell>
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
                  <TableCell align="right">{row.email}</TableCell>
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
