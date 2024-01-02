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
import { useStore } from "../../../app/stores/store"
import { User } from "../../../app/models/User"

function createData(
  fullName: string,
  email: string,
  rightAnswer: number,
  wrongAnswer: number,
  totalScore: number
) {
  return { fullName, email, rightAnswer, wrongAnswer, totalScore }
}

function ResultPage() {
  const {roomStore} = useStore()

  const getRows = (users: User[]) => [
    ...users.map((u, index) => ( 
    createData(`${u.lastName} ${u.firstName}`, u.email, 10, 5, 80)
    ))
  ]

  return (
    <Box>
      <Typography variant="h2" fontWeight={"bold"} gutterBottom>
        BẢNG KẾT QUẢ
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="h6">Phòng thi: {roomStore.selectedItem?.code || ""}</Typography>
        <Typography variant="h6">Bộ đề: {roomStore.selectedItem?.quizCollection?.name || ""}</Typography>
        <Typography variant="h6">Người tổ chức: GV. {roomStore.selectedItem?.owner?.lastName || ""} {roomStore.selectedItem?.owner?.firstName || ""}</Typography>
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
              {roomStore.selectedItem && getRows(roomStore.selectedItem.users).map((row) => (
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
