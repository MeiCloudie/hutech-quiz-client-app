import { createContext, useContext } from "react"
import CommonStore from "./commonStore"
import UserStore from "./userStore"

interface Store {
  commonStore: CommonStore
  userStore: UserStore
  //TODO: Thêm các store tại đây!
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  //TODO: Gọi ở đây nữa!
}

export const StoreContext = createContext(store)

export function useStore(): Store {
  return useContext(StoreContext)
}
