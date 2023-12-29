import Entity, { EntityFormValues } from "../common/models/Entity"
import { Answer } from "./Answer"
import { QuizToQuizCollection } from "./QuizToQuizCollection"
import { Record } from "./Record"

export interface Quiz extends Entity {
  id: string
  content: string
  explaination: string
  score: number

  answers: Answer[]
  records: Record[]
  collections: QuizToQuizCollection[]
}

export class Quiz implements Quiz {
  id = ""
  content = ""
  explaination = ""
  score = -1

  answers: Answer[] = []
  records: Record[] = []
  collections: QuizToQuizCollection[] = []

  constructor(init?: QuizFormValues) {
    Object.assign(this, init)
  }
}

export class QuizFormValues implements EntityFormValues {
  id?: string = ""
  content: string = ""
  explaination: string = ""
  score: number = -1

  constructor(quiz?: Quiz) {
    if (quiz) {
      const { ...rest } = quiz
      Object.assign(this, { ...rest })
    }
  }
}
