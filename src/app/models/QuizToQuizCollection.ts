import Entity, { EntityFormValues } from "../common/models/Entity"
import { Quiz } from "./Quiz"
import { QuizCollection } from "./QuizCollection"

export interface QuizToQuizCollection extends Entity {
  id: string

  quiz?: Quiz
  quizCollection?: QuizCollection
}

export class QuizToQuizCollection implements QuizToQuizCollection {
  id = ""

  quiz?: Quiz = undefined
  quizCollection?: QuizCollection = undefined

  constructor(init?: QuizToQuizCollectionFormValues) {
    Object.assign(this, init)
  }
}

export class QuizToQuizCollectionFormValues implements EntityFormValues {
  id?: string = ""

  quizId?: string = ""
  quizCollectionId?: string = ""

  constructor(quizToQuizCollection?: QuizToQuizCollection) {
    if (quizToQuizCollection) {
      const { quiz, quizCollection, ...rest } = quizToQuizCollection
      Object.assign(this, { ...rest })
    }
  }
}
