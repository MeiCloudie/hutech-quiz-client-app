import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"

function PlayQuizPage() {
  const theme = useTheme()
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"))

  const renderButtons = (buttonsConfig: { label: string; xs: number }[]) => {
    return buttonsConfig.map((config, index) => (
      <Grid key={index} item xs={config.xs}>
        <Button variant="contained" fullWidth>
          {config.label}
        </Button>
      </Grid>
    ))
  }

  const buttonsConfig = isScreenSmall
    ? [
        { label: "A: Button 1", xs: 12 },
        { label: "B: Button 2", xs: 12 },
        { label: "C: Button 3", xs: 12 },
        { label: "D: Button 4", xs: 12 },
      ]
    : [
        { label: "A: Button 1", xs: 6 },
        { label: "B: Button 2", xs: 6 },
        { label: "C: Button 3", xs: 6 },
        { label: "D: Button 4", xs: 6 },
      ]

  return (
    <Box>
      {/* Thoi gian */}
      <Box>
        <Typography variant="h1">00:30</Typography>
      </Box>

      {/* content (explaination?) */}
      {/* score */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h2" fontWeight={"bold"}>
          Content cau hoi o day ne?
        </Typography>
        <Typography
          variant="h4"
          color={"gray"}
        >{`(Điểm: +${"score"})`}</Typography>
      </Box>

      <Divider />
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
