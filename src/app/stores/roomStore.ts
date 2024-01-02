import { action, makeObservable, runInAction } from "mobx";
import quizAgent from "../api/quizAgent";
import QuizEntityStore from "../common/stores/quizEntityStore";
import { Room, RoomFormValues } from "../models/Room";

export default class RoomStore extends QuizEntityStore<
  Room,
  RoomFormValues
> {
  constructor() {
    super("Rooms");
    makeObservable(this, {
      getByCode: action,
      start: action,
      stop: action
    })
  }

  getByCode = async (
    code: string,
    shouldRefresh: boolean = false
  ): Promise<Room | undefined> => {
    try {
      this.setDetailsLoading(true)
      const cachedItem = this.items.find((x) => x.code === code)
      if (!shouldRefresh && cachedItem) {
        this.setSelectedItem(cachedItem)
        return cachedItem
      }

      const item = await quizAgent.Rooms.getByCode(code)
      runInAction(() => {
        this.setSelectedItem(item)
        if (shouldRefresh && cachedItem) this.updateEntityItem(code, item)
      })

      return item
    } catch (error) {
      console.error("Request error:", error)
    } finally {
      runInAction(() => {
        this.setDetailsLoading(false)
      })
    }
  }

  start = async (id: string): Promise<void> => {
    try {
      this.setUpdateLoading(true)
      await quizAgent.Rooms.start(id);
    } catch (error) {
      console.error("Request error:", error)
    } finally {
        this.setUpdateLoading(false)
    }
  }
  stop = async (id: string): Promise<void> => {
    try {
      this.setUpdateLoading(true)
      await quizAgent.Rooms.stop(id);
    } catch (error) {
      console.error("Request error:", error)
    } finally {
        this.setUpdateLoading(false)
    }
  }
}