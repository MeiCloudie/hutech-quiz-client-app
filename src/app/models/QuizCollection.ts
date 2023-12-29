import Entity, { EntityFormValues } from "../common/models/Entity"
import { QuizToQuizCollection } from "./QuizToQuizCollection"
import { Room } from "./Room"

export interface QuizCollection extends Entity {
  id: string
  name: string

  quizzes: QuizToQuizCollection[]
  room: Room[]
}

export class QuizCollection implements QuizCollection {
  id = ""
  name = ""

  quizzes: QuizToQuizCollection[] = []
  room: Room[] = []

  constructor(init?: QuizCollectionFormValues) {
    Object.assign(this, init)
  }
}

export class QuizCollectionFormValues implements EntityFormValues {
  id?: string = ""
  name: string = ""

  constructor(quizCollection?: QuizCollection) {
    if (quizCollection) {
      const { ...rest } = quizCollection
      Object.assign(this, { ...rest })
    }
  }
}
