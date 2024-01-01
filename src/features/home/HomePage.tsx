import { Box } from "@mui/material"
import IntroContent from "./IntroContent"
import NotificationContent from "./NotificationContent"
import { useStore } from "../../app/stores/store"
import LoginPage from "../users/LoginPage"
import { useEffect } from "react"

const HomePage = () => {
  const { userStore, roomStore } = useStore()
  useEffect(() => {
    roomStore.load().then(() => {
      console.log(roomStore.items);
    })
  }, [])
  return (
    <Box sx={{ textAlign: "left" }}>
      {userStore.isLoggedIn ? (
        <>
          <IntroContent />
          <NotificationContent />
        </>
      ) : (
        <LoginPage />
      )}
    </Box>
  )
}

export default HomePage
