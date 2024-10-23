import { HomeworkService } from "../../services/HomeworkService";
import { HomeworkPresenter } from "@/app/interfaces/presenters/HomeworkPresenter";

export class FetchHomeworksUseCase {
  static async execute() {
    try {
      const data = await HomeworkService.fetchAll();
      return HomeworkPresenter.presentMany(data);
    } catch (error) {
      console.error("Error in FetchHomeworksUseCase:", error);
      throw error;
    }
  }
}
