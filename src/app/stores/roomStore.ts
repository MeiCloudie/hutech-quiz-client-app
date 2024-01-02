import { action, computed, makeObservable, observable, runInAction } from "mobx";
import quizAgent from "../api/quizAgent";
import QuizEntityStore from "../common/stores/quizEntityStore";
import { Room, RoomFormValues } from "../models/Room";
import { User } from "../models/User";

export default class RoomStore extends QuizEntityStore<Room, RoomFormValues> {
  constructor() {
    super("Rooms");
    makeObservable(this, {
      getByCode: action,
      start: action,
      stop: action,

      _users: observable,
      users: computed,

      isUsersLoading: observable,
      setIsUsersLoading: action
    });
  }

  _users: User[] = [];
  get users() {
    return [...this._users];
  }
  set users(us: User[]) {
    this._users = [...us];
  }

  isUsersLoading: boolean = false;
  setIsUsersLoading(value: boolean) {
    this.isUsersLoading = value;
  }

  getUsers = async (
    id: string
  ): Promise<Room | undefined> => {
    try {
      this.setIsUsersLoading(true);

      const item = await this.get(id);
      runInAction(() => {
        this.users = item?.users ?? [];
      });

      return item;
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      runInAction(() => {
        this.setIsUsersLoading(false);
      });
    }
  };

  getUsersByCode = async (
    code: string,
    shouldRefresh: boolean = false
  ): Promise<Room | undefined> => {
    try {
      this.setIsUsersLoading(true);

      const item = await quizAgent.Rooms.getByCode(code);
      runInAction(() => {
        this.users = item.users;
      });

      return item;
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      runInAction(() => {
        this.setIsUsersLoading(false);
      });
    }
  };

  getByCode = async (
    code: string,
    shouldRefresh: boolean = false
  ): Promise<Room | undefined> => {
    try {
      this.setDetailsLoading(true);
      const cachedItem = this.items.find((x) => x.code === code);
      if (!shouldRefresh && cachedItem) {
        this.setSelectedItem(cachedItem);
        return cachedItem;
      }

      const item = await quizAgent.Rooms.getByCode(code);
      runInAction(() => {
        this.setSelectedItem(item);
        if (shouldRefresh && cachedItem) this.updateEntityItem(code, item);
      });

      return item;
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      runInAction(() => {
        this.setDetailsLoading(false);
      });
    }
  };

  start = async (id: string): Promise<void> => {
    try {
      this.setUpdateLoading(true);
      await quizAgent.Rooms.start(id);
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      this.setUpdateLoading(false);
    }
  };
  stop = async (id: string): Promise<void> => {
    try {
      this.setUpdateLoading(true);
      await quizAgent.Rooms.stop(id);
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      this.setUpdateLoading(false);
    }
  };
}
