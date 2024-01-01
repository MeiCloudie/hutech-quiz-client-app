import { action, makeObservable, runInAction } from "mobx";
import quizAgent from "../../api/quizAgent"
import { QuizBaseUserResource } from "../../api/quizBaseResource";
import Entity, { EntityFormValues } from "../models/Entity";
import QuizEntityStore from "./quizEntityStore";
import { PaginationParams } from "../models/paginationPrams";

export default class QuizUserRelatedStore<
  TEntity extends Entity,
  TEntityFormValues extends EntityFormValues
> extends QuizEntityStore<TEntity, TEntityFormValues> {
  userResource: QuizBaseUserResource<TEntity>;

  constructor(entityType: string) {
    super(entityType);

    this.userResource = quizAgent.createUserResource<TEntity>(entityType);

    makeObservable(this, {
      loadUserRelatedItems: action,
    });
  }

  loadUserRelatedItems = async (
    params?: PaginationParams
  ): Promise<TEntity[]> => {
    try {
      this.setListLoading(true);
      const list = await this.userResource.listByUser(params);
      runInAction(() => {
        this.setItems(list);
      })
      return list;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    } finally {
      runInAction(() => {
        this.setListLoading(false);
      })
    }
  };
}