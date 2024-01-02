import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useStore } from "../stores/store"
import { observer } from "mobx-react-lite"

function RequireAuth() {
  const {
    userStore: { isLoggedIn },
  } = useStore()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default observer(RequireAuth)