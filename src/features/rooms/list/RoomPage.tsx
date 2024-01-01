import React from "react"
import RoomList from "./RoomList"
import { Box, Button } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import SearchIcon from "@mui/icons-material/Search"

const RoomPage = () => {
  return (
    <React.Fragment>
      <Box sx={{ my: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ mx: 1 }}
          startIcon={<AddCircleIcon />}
        >
          TẠO PHÒNG
        </Button>
        <Button variant="contained" startIcon={<SearchIcon />}>
          TÌM PHÒNG
        </Button>
      </Box>
      <RoomList />
    </React.Fragment>
  )
}

export default RoomPage
