import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { useStore } from "../../../app/stores/store"

function PlayQuizPage() {
  const theme = useTheme()
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const { roomStore } = useStore()

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
    ))
  }

  const buttonsConfig = isScreenSmall
    ? [
        {
          label: `A: ${roomStore.selectedItem?.currentQuiz?.answers[0].content}`,
          xs: 12,
        },
        {
          label: `B: ${roomStore.selectedItem?.currentQuiz?.answers[1].content}`,
          xs: 12,
        },
        {
          label: `C: ${roomStore.selectedItem?.currentQuiz?.answers[2].content}`,
          xs: 12,
        },
        {
          label: `D: ${roomStore.selectedItem?.currentQuiz?.answers[3].content}`,
          xs: 12,
        },
      ]
    : [
        {
          label: `A: ${roomStore.selectedItem?.currentQuiz?.answers[0].content}`,
          xs: 6,
        },
        {
          label: `B: ${roomStore.selectedItem?.currentQuiz?.answers[1].content}`,
          xs: 6,
        },
        {
          label: `C: ${roomStore.selectedItem?.currentQuiz?.answers[2].content}`,
          xs: 6,
        },
        {
          label: `D: ${roomStore.selectedItem?.currentQuiz?.answers[3].content}`,
          xs: 6,
        },
      ]

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
          {renderButtons(buttonsConfig)}
        </Grid>
      </Box>
    </Box>
  )
}

export default PlayQuizPage
