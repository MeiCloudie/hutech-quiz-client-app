import Entity, { EntityFormValues } from "../common/models/Entity"
import Profile from "../common/models/Profile"
import { Answer } from "./Answer"
import { Quiz } from "./Quiz"
import { Room } from "./Room"

export interface Record extends Entity {
  id: string

  user?: Profile
  room?: Room
  quiz?: Quiz
  answer?: Answer
}

export class Record implements Record {
  id = ""

  user?: Profile = undefined
  room?: Room = undefined
  quiz?: Quiz = undefined
  answer?: Answer = undefined

  constructor(init?: RecordFormValues) {
    Object.assign(this, init)
  }
}

export class RecordFormValues implements EntityFormValues {
  id?: string = ""

  userId?: string = ""
  roomId?: string = ""
  quizId?: string = ""
  answerId?: string = ""

  constructor(record?: Record) {
    if (record) {
      const { user, room, quiz, answer, ...rest } = record
      Object.assign(this, { ...rest })
    }
  }
}
