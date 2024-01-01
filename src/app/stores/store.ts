import { createContext, useContext } from "react"
import CommonStore from "./commonStore"
import UserStore from "./userStore"
import RoomStore from "./roomStore"

interface Store {
  commonStore: CommonStore
  userStore: UserStore
  roomStore: RoomStore
  //TODO: Thêm các store tại đây!
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  roomStore: new RoomStore()
  //TODO: Gọi ở đây nữa!
}

export const StoreContext = createContext(store)

export function useStore(): Store {
  return useContext(StoreContext)
}
