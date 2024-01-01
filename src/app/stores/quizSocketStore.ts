import { DefaultEventsMap } from './../../../node_modules/@socket.io/component-emitter/index.d';
import { makeAutoObservable } from 'mobx';
import { Socket, io } from 'socket.io-client';
import { store } from "./store";

export default class QuizSocketStore {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null
  constructor() {
    makeAutoObservable(this)
  }

  createHubConnection = (roomCode: string) : void => {
    const hubsUrl = process.env.REACT_APP_HUTECH_QUIZ_HUBS; 
    const token = store.commonStore.token;
    this.socket = io(`${hubsUrl}quizzes?access_token=${token}&roomCode=${roomCode}`, {
      autoConnect: true
    })
  }
}