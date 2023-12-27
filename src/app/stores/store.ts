import { createContext, useContext } from "react"
import CommonStore from "./commonStore"

interface Store {
  commonStore: CommonStore
  //TODO: Thêm các store tại đây!
}

export const store: Store = {
  commonStore: new CommonStore(),
  //TODO: Gọi ở đây nữa!
}

export const StoreContext = createContext(store)

export function useStore(): Store {
  return useContext(StoreContext)
}
