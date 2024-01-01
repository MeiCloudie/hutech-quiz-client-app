import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"

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
        subheader={`Giảng viên: ${props.room.owner?.lastName} ${props.room.owner?.firstName}`}
      />
      <Link to={`/rm/${props.room.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="194"
          image={"banner-hutech-quiz.png"}
          alt="banner-room"
        />
        <CardContent></CardContent>
      </Link>
      <Divider />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          endIcon={<ArrowCircleRightIcon />}
          component={Link}
          to={`/rm/${props.room.id}`}
          fullWidth
        >
          VÀO PHÒNG
        </Button>
      </CardActions>
    </Card>
  )
}

export default RoomCard
