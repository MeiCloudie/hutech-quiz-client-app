import { createContext, useContext } from "react"
import CommonStore from "./commonStore"
import UserStore from "./userStore"
import RoomStore from "./roomStore"
import QuizSocketStore from "./quizSocketStore"

interface Store {
  commonStore: CommonStore
  userStore: UserStore
  roomStore: RoomStore
  quizSocketStore: QuizSocketStore
  //TODO: Thêm các store tại đây!
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  roomStore: new RoomStore(),
  quizSocketStore: new QuizSocketStore()
  //TODO: Gọi ở đây nữa!
}

export const StoreContext = createContext(store)

export function useStore(): Store {
  return useContext(StoreContext)
}
