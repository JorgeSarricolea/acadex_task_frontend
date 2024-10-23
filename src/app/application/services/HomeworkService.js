import endpoints from "@/app/infrastructure/config/configAPI";

export class HomeworkService {
  static async fetchAll() {
    const response = await fetch(endpoints.getAllHomeworks);
    if (!response.ok) {
      throw new Error("Error fetching tasks");
    }
    const data = await response.json();
    return data;
  }

  static async fetchById(homeworkId) {
    const response = await fetch(endpoints.getHomeworkById(homeworkId));
    if (!response.ok) {
      throw new Error(`Error fetching task with ID: ${homeworkId}`);
    }
    const data = await response.json();
    return data;
  }

  static async updateTask(taskId, updatedData) {
    const response = await fetch(endpoints.updateHomework(taskId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("Error updating task");
    }
    return response.json();
  }

  static async deleteTask(taskId) {
    const response = await fetch(endpoints.deleteHomework(taskId), {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting task with ID: ${taskId}`);
    }

    try {
      return await response.json();
    } catch (err) {
      return null;
    }
  }

  static async createTask(newTaskData) {
    const response = await fetch(endpoints.createHomework, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTaskData),
    });
    if (!response.ok) {
      throw new Error("Error creating task");
    }
    return response.json();
  }
}
