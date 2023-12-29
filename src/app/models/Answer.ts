import Entity, { EntityFormValues } from "../common/models/Entity"
import { Quiz } from "./Quiz"
import { Record } from "./Record"

export interface Answer extends Entity {
  id: string
  content: string
  isCorrect: boolean

  quiz?: Quiz
  records: Record[]
}

export class Answer implements Answer {
  id = ""
  content = ""
  isCorrect = false

  quiz?: Quiz = undefined
  records: Record[] = []

  constructor(init?: AnswerFormValues) {
    Object.assign(this, init)
  }
}

export class AnswerFormValues implements EntityFormValues {
  id?: string = ""
  content: string = ""
  isCorrect: boolean = false

  quizId: string = ""

  constructor(answer?: Answer) {
    if (answer) {
      const { quiz, ...rest } = answer
      Object.assign(this, { ...rest })
    }
  }
}
