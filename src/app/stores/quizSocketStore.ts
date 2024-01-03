import { DefaultEventsMap } from "./../../../node_modules/@socket.io/component-emitter/index.d";
import { makeAutoObservable } from "mobx";
import { Socket, io } from "socket.io-client";
import { store } from "./store";
import { User } from "../models/User";
import { Quiz } from "../models/Quiz";
import { Record } from "../models/Record";
import { router } from "../router/Routes";
import { toast } from "react-toastify";

export default class QuizSocketStore {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
  roomCode: string | null = null;
  doNeedReload: boolean = true
  constructor() {
    makeAutoObservable(this);
  }
  setDoNeedReload(value: boolean) {
    this.doNeedReload = value
  }

  createHubConnection = (roomCode: string): void => {
    this.roomCode = roomCode;
    const hubsUrl = process.env.REACT_APP_HUTECH_QUIZ_HUBS;
    const token = store.commonStore.token;
    this.socket = io(
      `${hubsUrl}quizzes?access_token=${token}&roomCode=${roomCode}`,
      {
        autoConnect: true,
      }
    );

    this.socket.on("load_user", async (user: User) => {
    });

    this.socket.on("loaded_quizzes", (quizzes: Quiz[]) => {
    });
    this.socket.on("joined_room", async (user: User) => {
      if (this.doNeedReload)
        await store.roomStore.getByCode(roomCode, true)
      toast.warn(`Người dùng ${user.lastName} ${user.firstName} tham gia` );
    });
    this.socket.on("started_room", async (user: User) => {
      if (this.doNeedReload) {
        await store.roomStore.getByCode(roomCode, true)
        if (store.roomStore.selectedItem?.currentQuiz) {
          router.navigate(`/rm/${store.roomStore.selectedItem.id}/play`)
        }
      }
    });

    this.socket.on("left_room", async (user: User) => {
      if (this.doNeedReload) {
        await store.roomStore.getByCode(roomCode, true)
      }
    });

    this.socket.on("answered_quiz", async (record: Record) => {
      console.log(record)
    })

    this.setDoNeedReload(true)
  };

  stopHubConnection = () : void => {
    this.socket?.disconnect()
}

  leaveRoom() {
    this.socket?.emit("leave_room", { roomCode: this.roomCode });
  }

  answerQuiz(quizId: string, answerId: string) {
    this.socket?.emit("answer_quiz", { quizId, answerId });
  }
}
