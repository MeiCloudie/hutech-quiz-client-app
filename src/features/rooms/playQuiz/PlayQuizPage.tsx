import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useStore } from "../../../app/stores/store";
import { useEffect, useRef, useState } from "react";
import { Quiz } from "../../../app/models/Quiz";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import StartIcon from "@mui/icons-material/Start";
import { toast } from "react-toastify";

function PlayQuizPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { roomStore, quizSocketStore, userStore } = useStore();
  const intervalRef = useRef<NodeJS.Timer>();

  const [didAnswer, setDidAnswer] = useState(false);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigator = useNavigate();

  useEffect(() => {
    if (roomId)
      roomStore.get(roomId, true).then(() => {
        setDidAnswer(false);
        const currentUser = userStore.user;
        const currentQuiz = roomStore.selectedItem?.currentQuiz;
        const roomId = roomStore.selectedItem?.id;
        if (
          currentUser &&
          currentQuiz &&
          roomId &&
          roomStore.selectedItem?.records
            .filter((x) => x.user)
            .some(
              (x) =>
                x.user!.id === currentUser.id &&
                x.quiz?.id == currentQuiz.id &&
                x.room?.id == roomId
            )
        ) {
          console.log('You already answered!')
          console.log(roomStore.selectedItem.records)
          setDidAnswer(true);
        } else {
          console.log('You did not answer!')
          setDidAnswer(false);
        }
        // clearInterval(intervalRef.current);
        // const interval = setInterval(() => {
        //   const now = new Date();
        //   if (
        //     !roomStore.selectedItem?.startedAt &&
        //     !roomStore.selectedItem?.startedAt
        //   )
        //     return;
        //   console.log(new Date(roomStore.selectedItem?.startedAt));
        //   console.log(now);
        //   // ! Check
        //   if (
        //     now.getTime() -
        //       new Date(roomStore.selectedItem?.startedAt).getTime() <
        //     30000
        //   )
        //     return;
        //   const difference =
        //     300000000 -
        //     (now.getTime() -
        //       new Date(roomStore.selectedItem?.startedAt).getTime());
        //   console.log(difference);
        //   const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        //   setDays(d);

        //   const h = Math.floor(
        //     (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        //   );
        //   setHours(h);

        //   const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        //   setMinutes(m);

        //   const s = Math.floor((difference % (1000 * 60)) / 1000);
        //   setSeconds(s);

        //   if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        //     // setPartyTime(true);
        //   }
        // }, 1000);
        // intervalRef.current = interval;
      });

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  if (
    !roomStore.selectedItem?.isStarted &&
    !roomStore.selectedItem?.currentQuiz
  ) {
    navigator(`/rm/${roomId}/result`);
  }
  if (
    roomStore.isDetailsLoading ||
    !roomStore.selectedItem?.currentQuiz?.answers
  )
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  const renderButtons = (buttonsConfig: { label: string; xs: number }[]) => {
    return buttonsConfig.map((config, index) => (
      <Grid key={index} item xs={config.xs}>
        <Button
          variant="contained"
          sx={{
            py: 4,
            fontSize: 40,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
          disabled={
            didAnswer ||
            userStore.user?.id === roomStore.selectedItem?.owner?.id
          }
          onClick={() => {
            // ! Add record here
            if (
              roomStore.selectedItem?.currentQuiz &&
              roomStore.selectedItem?.currentQuiz.answers?.length > index
            ) {
              quizSocketStore.answerQuiz(
                roomStore.selectedItem?.currentQuiz?.id,
                roomStore.selectedItem?.currentQuiz?.answers[index].id
              );
              setDidAnswer(true);
            }
          }}
          fullWidth
        >
          {config.label}
        </Button>
      </Grid>
    ));
  };

  const buttonsConfig = (currentQuiz: Quiz) =>
    isScreenSmall
      ? [
          {
            label: `A: ${currentQuiz.answers[0].content}`,
            xs: 12,
          },
          {
            label: `B: ${currentQuiz.answers[1].content}`,
            xs: 12,
          },
          {
            label: `C: ${currentQuiz.answers[2].content}`,
            xs: 12,
          },
          {
            label: `D: ${currentQuiz.answers[3].content}`,
            xs: 12,
          },
        ]
      : [
          {
            label: `A: ${currentQuiz.answers[0].content}`,
            xs: 6,
          },
          {
            label: `B: ${currentQuiz.answers[1].content}`,
            xs: 6,
          },
          {
            label: `C: ${currentQuiz.answers[2].content}`,
            xs: 6,
          },
          {
            label: `D: ${currentQuiz.answers[3].content}`,
            xs: 6,
          },
        ];

  return (
    <Box>
      {/* Thoi gian */}
      {/* <Box>
        <Typography variant="h1" color={"error"} gutterBottom>
          {minutes !== 0 && `${minutes} : `} {seconds}
        </Typography>
      </Box> */}
      {userStore.user?.id === roomStore.selectedItem.owner?.id && (
        <Box sx={{ my: 4 }}>
          <Button
            variant="contained"
            color="warning"
            endIcon={<StartIcon />}
            size="large"
            sx={{ fontSize: 20 }}
            onClick={async () => {
              if (roomId) {
                await roomStore.start(roomId);
                await roomStore.get(roomId, true);
              } else {
                toast.error("Mã phòng không hợp lệ");
              }
            }}
          >
            CHUYỂN CÂU TIẾP THEO
          </Button>
        </Box>
      )}

      {/* content (explaination?) */}
      {/* score */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h2" fontWeight={"bold"} gutterBottom>
          {roomStore.selectedItem?.currentQuiz?.content}
        </Typography>
        <Typography variant="h4" color={"gray"}>{`(Điểm: +${
          roomStore.selectedItem?.currentQuiz?.score || ""
        })`}</Typography>
      </Box>

      <Divider sx={{ my: 4 }} />
      {/* answers[] */}
      <Box>
        <Grid container spacing={2}>
          {roomStore.selectedItem?.currentQuiz &&
            roomStore.selectedItem?.currentQuiz.answers &&
            renderButtons(buttonsConfig(roomStore.selectedItem?.currentQuiz))}
        </Grid>
      </Box>
    </Box>
  );
}

export default observer(PlayQuizPage);
