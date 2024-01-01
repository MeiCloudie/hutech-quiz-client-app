import QuizEntityStore from "../common/stores/quizEntityStore";
import { Quiz, QuizFormValues } from "../models/Quiz";

export default class QuizStore extends QuizEntityStore<
  Quiz,
  QuizFormValues
> {
  constructor() {
    super("Quizzes");
  }
}