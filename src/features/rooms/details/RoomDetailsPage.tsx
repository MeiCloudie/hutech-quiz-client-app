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
import { useParams } from "react-router-dom"
import UserCard from "./UserCard"

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
          <Typography variant="body1">{`CODE: ${room.code}`}</Typography>
          <Typography variant="body1">{`Người tổ chức: GV. ${room.owner?.lastName} ${room.owner?.firstName}`}</Typography>
          <Typography variant="body1">{`Bộ đề: ${room.quizCollection?.name}`}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button variant="contained" startIcon={<EditIcon />}>
            CHỈNH SỬA
          </Button>
          {/* TODO: isStarted */}
          <Button
            variant="contained"
            color="success"
            startIcon={<PlayCircleFilledIcon />}
          >
            BẮT ĐẦU
          </Button>
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
