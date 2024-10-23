import { HomeworkService } from "../../services/HomeworkService";
import { HomeworkPresenter } from "@/app/interfaces/presenters/HomeworkPresenter";

export class FetchHomeworkByIdUseCase {
  static async execute(taskId) {
    try {
      const data = await HomeworkService.fetchById(taskId);
      return HomeworkPresenter.present(data);
    } catch (error) {
      console.error(`Error fetching task with ID: ${taskId}`, error);
      throw error;
    }
  }
}
