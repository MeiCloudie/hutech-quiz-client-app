import React from "react"
import RoomList from "./RoomList"
import { Box } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import SearchIcon from "@mui/icons-material/Search"
import Modal from "../../common/UI/Modal"
import SearchRoomForm from "../forms/SearchRoomForm"
import CreateRoomForm from "../forms/CreateRoomForm"

const RoomPage = () => {
  return (
    <React.Fragment>
      <Box sx={{ my: 1, display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ mr: 1 }}>
          <Modal
            startIcon={<AddCircleIcon />}
            buttonText="TẠO PHÒNG"
            title="TẠO PHÒNG"
            subtitle="Chọn 1 bộ đề thi để tạo phòng!"
            component={(handleClose) => (
              <CreateRoomForm handleClose={handleClose} />
              // <RoomForm handleClose={handleClose} />

            )}
          />
        </Box>

        <Box sx={{ mr: 0.5 }}>
          <Modal
            startIcon={<SearchIcon />}
            buttonText="TÌM PHÒNG"
            title="TÌM PHÒNG"
            subtitle="Nhập CODE phòng thi tại đây!"
            component={(handleClose) => (
              <SearchRoomForm handleClose={handleClose} />
            )}
          />
        </Box>
      </Box>
      <RoomList />
    </React.Fragment>
  )
}

export default RoomPage
