import { Avatar, Card, CardHeader } from "@mui/material"
import { purple } from "@mui/material/colors"
import { User } from "../../../app/models/User"

interface UserCardProps {
  user: User
}

function UserCard(props: UserCardProps) {
  return (
    <Card
      sx={{
        // maxWidth: 420,
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
          <Avatar
            alt="User Image"
            sx={{ bgcolor: purple[400] }}
            src={props.user?.avatarUrl}
          />
        }
        title={`${props.user.lastName} ${props.user.firstName}`}
        subheader={props.user.email}
      />
    </Card>
  )
}

export default UserCard
