import quizAgent from "../api/quizAgent";
import QuizEntityStore from "../common/stores/quizEntityStore";
import { Room, RoomFormValues } from "../models/Room";

export default class RoomStore extends QuizEntityStore<
  Room,
  RoomFormValues
> {
  constructor() {
    super("Rooms");
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