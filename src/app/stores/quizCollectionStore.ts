import QuizEntityStore from "../common/stores/quizEntityStore";
import { QuizCollection, QuizCollectionFormValues } from "../models/QuizCollection";

export default class QuizCollectionStore extends QuizEntityStore<
  QuizCollection,
  QuizCollectionFormValues
> {
  constructor() {
    super("QuizCollections");
  }
}