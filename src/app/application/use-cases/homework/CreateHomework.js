import { HomeworkService } from "../../services/HomeworkService";
import { HomeworkPresenter } from "@/app/interfaces/presenters/HomeworkPresenter";

export class CreateHomeworkUseCase {
  static async execute(newTaskData) {
    try {
      const createdTask = await HomeworkService.createTask(newTaskData);
      return HomeworkPresenter.present(createdTask);
    } catch (error) {
      console.error("Error creating new task:", error);
      throw error;
    }
  }
}
