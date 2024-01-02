import {
  Box,
  LinearProgress,
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
import { Record } from "../../../app/models/Record"
import { useEffect, useState } from "react"
import { Room } from "../../../app/models/Room"
import { useParams } from "react-router-dom"

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
  const { roomStore, quizSocketStore } = useStore()
  const [room, setRoom] = useState<Room>(new Room())
  const { roomId } = useParams<{ roomId: string }>()

  useEffect(() => {
    if (roomId) {
      roomStore.get(roomId, true).then(() => {
        setRoom(roomStore.selectedItem ?? new Room())
        console.log(roomStore.selectedItem)
        const roomCode = roomStore.selectedItem?.code
        if (roomCode) quizSocketStore.createHubConnection(roomCode)
      })
    }
  }, [roomId, roomStore])

  if (roomStore.isDetailsLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    )

  const getRows = (records: Record[] | undefined) => {
    if (!records) return []

    return records.map((r, index) =>
      createData(
        `${r.user?.lastName} ${r.user?.firstName}`,
        r.user?.email || "",
        10,
        5,
        80
      )
    )
  }

  return (
    <Box>
      <Typography variant="h2" fontWeight={"bold"} gutterBottom>
        BẢNG KẾT QUẢ
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="h6">Phòng thi: {room.code || ""}</Typography>
        <Typography variant="h6">
          Bộ đề: {room.quizCollection?.name || ""}
        </Typography>
        <Typography variant="h6">
          Người tổ chức: GV. {room.owner?.lastName || ""}{" "}
          {room.owner?.firstName || ""}
        </Typography>
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
              {roomStore.selectedItem &&
                getRows(roomStore.selectedItem.records).map((row) => (
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
