import { HomeworkService } from "../../services/HomeworkService";
import { HomeworkPresenter } from "@/app/interfaces/presenters/HomeworkPresenter";

export class UpdateHomeworkUseCase {
  static async execute(taskId, updatedData) {
    try {
      const updatedTask = await HomeworkService.updateTask(taskId, updatedData);
      return HomeworkPresenter.present(updatedTask);
    } catch (error) {
      console.error(`Error updating task with ID: ${taskId}`, error);
      throw error;
    }
  }
}
