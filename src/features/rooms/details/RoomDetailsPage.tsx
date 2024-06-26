import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserCard from "./UserCard";
import BallotIcon from "@mui/icons-material/Ballot";
import { observer } from "mobx-react-lite";
import Modal from "../../common/UI/Modal";
import EditRoomForm from "../forms/EditRoomForm";
import LogoutIcon from "@mui/icons-material/Logout";

function RoomDetailsPage() {
  const { roomStore, quizSocketStore, userStore } = useStore();
  const { roomId } = useParams<{ roomId: string }>();
  const navigator = useNavigate();

  useEffect(() => {
    if (roomId) {
      roomStore.get(roomId, true).then(() => {
        if (
          roomStore.selectedItem?.isStarted &&
          roomStore.selectedItem?.currentQuiz &&
          roomStore.selectedItem?.currentQuiz.answers
        ) {
          navigator(`/rm/${roomId}/play`);
        }
        const roomCode = roomStore.selectedItem?.code;
        if (roomCode) {
          quizSocketStore.createHubConnection(roomCode);
        }
      });
    }
  }, [roomId, roomStore, quizSocketStore, navigator]);

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
          >{`CODE: ${roomStore.selectedItem?.code}`}</Typography>
          <Typography variant="h4">{`Người tổ chức: GV. ${
            roomStore.selectedItem?.owner?.lastName || ""
          } ${roomStore.selectedItem?.owner?.firstName || ""}`}</Typography>
          <Typography variant="h4">{`Bộ đề: ${roomStore.selectedItem?.quizCollection?.name}`}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {userStore.user?.id === roomStore.selectedItem?.owner?.id && (
            <Modal
              startIcon={<EditIcon />}
              buttonText="CHỈNH SỬA"
              title="CHỈNH SỬA PHÒNG"
              subtitle="Hãy chọn 1 bộ đề thi khác:"
              component={(handleClose) => (
                <EditRoomForm
                  room={roomStore.selectedItem}
                  handleClose={handleClose}
                />
              )}
            />
          )}
          {roomStore.selectedItem && !roomStore.selectedItem.isStarted &&
            roomStore.selectedItem.records.length > 0 && (
              <Button
                variant="contained"
                startIcon={<BallotIcon />}
                component={Link}
                color="info"
                to={`/rm/${roomId}/result`}
                sx={{ mt: 1 }}
              >
                XEM KẾT QUẢ
              </Button>
            )}
          {userStore.user?.id === roomStore.selectedItem?.owner?.id && (
            <Button
              variant="contained"
              color="success"
              startIcon={<PlayCircleFilledIcon />}
              component={Link}
              to={`/rm/${roomId}/play`}
              sx={{ mt: 1 }}
              onClick={() => {
                if (roomStore.selectedItem)
                  roomStore.start(roomStore.selectedItem.id);
              }}
            >
              BẮT ĐẦU
            </Button>
          )}
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            component={Link}
            to={`/rooms`}
            sx={{ mt: 1 }}
            onClick={() => {
              quizSocketStore.leaveRoom();
            }}
          >
            RỜI PHÒNG
          </Button>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Grid container spacing={2}>
          {roomStore.selectedItem?.users &&
            roomStore.selectedItem?.users.map((user) => (
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
