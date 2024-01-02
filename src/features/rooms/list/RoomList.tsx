import RoomCard from "./RoomCard"

import { Box, Grid, LinearProgress, styled } from "@mui/material"
import { useStore } from "../../../app/stores/store"
import { observer } from "mobx-react-lite"
import PlaceholderBox from "../../common/UI/PlaceholderBox"
import { Room } from "../../../app/models/Room"
import { useEffect, useState } from "react"
// import { PaginationParams } from "../../../app/common/models/paginationPrams"

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.only("xs")]: {
    "& .MuiGrid-item": {
      width: "100%",
    },
  },
  [theme.breakpoints.only("sm")]: {
    "& .MuiGrid-item": {
      width: "50%",
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiGrid-item": {
      width: "33.33%",
    },
  },
}))

const RoomList = () => {
  const {
    roomStore,
    // commonStore
  } = useStore()
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    roomStore
      .load(
      )
      .then(() => {
        console.log(roomStore.items)
        setRooms(roomStore.items)
      })
  }, [roomStore])

  if (roomStore.isListLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    )

  return (
    <ResponsiveGrid container spacing={2}>
      {roomStore.items.length === 0 ? (
        <PlaceholderBox
          title="Đây là nơi xem và quản lý danh sách phòng thi"
          subtitle="Hiện tại chưa có phòng thi nào!"
        />
      ) : (
        roomStore.items.map((r, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <RoomCard key={index} room={r} />
          </Grid>
        ))
      )}
    </ResponsiveGrid>
  )
}

export default observer(RoomList)
