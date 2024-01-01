import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"

import { blue } from "@mui/material/colors"

import SchoolIcon from "@mui/icons-material/School"
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight"
import { Button, Divider } from "@mui/material"
import { Room } from "../../../app/models/Room"
import { Link } from "react-router-dom"

interface RoomCardProps {
  room: Room
}

const RoomCard = (props: RoomCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: 420,
        width: "100%",
        height: "100%",
        textAlign: "start",
        borderWidth: 2,
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
        position: "relative",
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[800] }} aria-label="room-icon">
            <SchoolIcon />
          </Avatar>
        }
        title={props.room.code}
      />
      <Link to={`/cr/${props.room.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="194"
          image={"banner-hutech-quiz.png"}
          alt="banner-room"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {`Giảng viên: ${props.room.owner?.lastName} ${props.room.owner?.firstName}`}
          </Typography>
        </CardContent>
      </Link>
      <Divider />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <div></div>
        <Button
          variant="contained"
          startIcon={<ArrowCircleRightIcon />}
          component={Link}
          to={`/rm/${props.room.id}`}
        >
          VÀO PHÒNG
        </Button>
      </CardActions>
    </Card>
  )
}

export default RoomCard
