import QuizEntityStore from "../common/stores/quizEntityStore";
import { Room, RoomFormValues } from "../models/Room";

export default class RoomStore extends QuizEntityStore<
  Room,
  RoomFormValues
> {
  constructor() {
    super("Rooms");
  }
}