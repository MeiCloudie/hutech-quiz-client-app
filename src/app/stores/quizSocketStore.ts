import { DefaultEventsMap } from "./../../../node_modules/@socket.io/component-emitter/index.d";
import { makeAutoObservable } from "mobx";
import { Socket, io } from "socket.io-client";
import { store } from "./store";
import { User } from "../models/User";
import { Quiz } from "../models/Quiz";

export default class QuizSocketStore {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
  roomCode: string | null = null;
  constructor() {
    makeAutoObservable(this);
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
      await store.roomStore.getByCode(roomCode, true)
    });

    this.socket.on("left_room", async (user: User) => {
      await store.roomStore.getByCode(roomCode, true)
    });
  };

  leaveRoom() {
    this.socket?.emit("leave_room", { roomCode: this.roomCode });
  }
}
