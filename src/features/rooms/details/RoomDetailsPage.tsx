import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import { Room } from "../../../app/models/Room"
import { useStore } from "../../../app/stores/store"
import { Link, useParams } from "react-router-dom"
import UserCard from "./UserCard"
import BallotIcon from "@mui/icons-material/Ballot"

function RoomDetailsPage() {
  const { roomStore } = useStore()
  const [room, setRoom] = useState<Room>(new Room())
  const { roomId } = useParams<{ roomId: string }>()

  useEffect(() => {
    if (roomId) {
      roomStore.get(roomId).then(() => {
        setRoom(roomStore.selectedItem ?? new Room())
      })
    }
  }, [roomId, roomStore])

  if (roomStore.isDetailsLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    )

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h4">{`CODE: ${room.code}`}</Typography>
          <Typography variant="h4">{`Người tổ chức: GV. ${room.owner?.lastName} ${room.owner?.firstName}`}</Typography>
          <Typography variant="h4">{`Bộ đề: ${room.quizCollection?.name}`}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button variant="contained" startIcon={<EditIcon />}>
            CHỈNH SỬA
          </Button>
          {room.isStarted ? (
            <Button
              variant="contained"
              color="success"
              startIcon={<BallotIcon />}
              component={Link}
              to={`rm/${roomId}/result`}
            >
              XEM KẾT QUẢ
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              startIcon={<PlayCircleFilledIcon />}
              component={Link}
              to={`rm/${roomId}/play`}
            >
              BẮT ĐẦU
            </Button>
          )}
        </Box>
      </Box>
      <Divider />
      <Box>
        <Grid container spacing={2}>
          {room.users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default RoomDetailsPage
