import { Box, Button, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { Quiz } from "../../../app/models/Quiz";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

function PlayQuizPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { roomStore } = useStore();

  useEffect(() => {
    if (roomId) roomStore.get(roomId, true).then(() => {
      console.log(roomStore.selectedItem);
    });
  }, []);

  if (roomStore.isDetailsLoading || !roomStore.selectedItem?.currentQuiz?.answers)
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
      <Box>
        <Typography variant="h1" color={"error"} gutterBottom>
          00:30
        </Typography>
      </Box>

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
