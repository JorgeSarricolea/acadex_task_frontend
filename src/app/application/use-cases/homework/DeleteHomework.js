import { HomeworkService } from "../../services/HomeworkService";

export class DeleteHomeworkUseCase {
  static async execute(taskId) {
    try {
      await HomeworkService.deleteTask(taskId);
      return true;
    } catch (error) {
      console.error(`Error deleting task with ID: ${taskId}`, error);
      throw error;
    }
  }
}
