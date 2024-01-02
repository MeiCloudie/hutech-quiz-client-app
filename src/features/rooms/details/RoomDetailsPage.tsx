import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Room } from "../../../app/models/Room";
import { useStore } from "../../../app/stores/store";
import { Link, useParams } from "react-router-dom";
import UserCard from "./UserCard";
import BallotIcon from "@mui/icons-material/Ballot";
import { observer } from "mobx-react-lite";
import Modal from "../../common/UI/Modal";
import EditRoomForm from "../forms/EditRoomForm";

function RoomDetailsPage() {
  const { roomStore, quizSocketStore } = useStore();
  const [room, setRoom] = useState<Room>(new Room());
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    if (roomId) {
      roomStore.get(roomId, true).then(() => {
        setRoom(roomStore.selectedItem ?? new Room());
        console.log(roomStore.selectedItem)
        const roomCode = roomStore.selectedItem?.code;
        if (roomCode) quizSocketStore.createHubConnection(roomCode);
      });
    }
  }, [roomId, roomStore]);

  if (roomStore.isDetailsLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography
            variant="h3"
            fontWeight={"bold"}
          >{`CODE: ${room.code}`}</Typography>
          <Typography variant="h4">{`Người tổ chức: GV. ${room.owner?.lastName || ""} ${room.owner?.firstName || ""}`}</Typography>
          <Typography variant="h4">{`Bộ đề: ${room.quizCollection?.name}`}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Modal
            startIcon={<EditIcon />}
            buttonText="CHỈNH SỬA"
            title="CHỈNH SỬA PHÒNG"
            subtitle="Hãy chọn 1 bộ đề thi khác:"
            component={(handleClose) => (
              <EditRoomForm handleClose={handleClose} />
            )}
          />
          {room.isStarted ? (
            <Button
              variant="contained"
              startIcon={<BallotIcon />}
              component={Link}
              color="error"
              to={`/rm/${roomId}/result`}
              sx={{ mt: 1 }}
            >
              XEM KẾT QUẢ
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              startIcon={<PlayCircleFilledIcon />}
              component={Link}
              to={`/rm/${roomId}/play`}
              sx={{ mt: 1 }}
            >
              BẮT ĐẦU
            </Button>
          )}
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Grid container spacing={2}>
          {room.users &&
            room.users.map((user) => (
              <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
                <UserCard user={user} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default observer(RoomDetailsPage);
