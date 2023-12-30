import Entity, { EntityFormValues } from "../common/models/Entity"
import Profile from "../common/models/Profile"
import { Quiz } from "./Quiz"
import { QuizCollection } from "./QuizCollection"
import { Record } from "./Record"

export interface Room extends Entity {
  id: string
  code: string
  isStarted: boolean
  startedAt: Date

  owner?: Profile
  users: Profile[]
  currentQuiz?: Quiz
  quizCollection?: QuizCollection
  records: Record[]
}

export class Room implements Room {
  id = ""
  code = ""
  isStarted = false
  startedAt = new Date()

  owner?: Profile = undefined
  users: Profile[] = []
  currentQuiz?: Quiz = undefined
  quizCollection?: QuizCollection = undefined
  records: Record[] = []

  constructor(init?: RoomFormValues) {
    Object.assign(this, init)
  }
}

export class RoomFormValues implements EntityFormValues {
  id?: string = ""
  code: string = ""
  isStarted: boolean = false
  startedAt: Date = new Date()

  ownerId?: string = ""
  userIds?: string[] = []
  currentQuizId?: string = ""
  quizCollectionId?: string = ""

  constructor(room?: Room) {
    if (room) {
      const { owner, users, currentQuiz, quizCollection, ...rest } = room
      Object.assign(this, { ...rest })
    }
  }
}
