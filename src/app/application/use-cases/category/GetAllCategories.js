import { CategoryService } from "@/app/application/services/CategoryService";

export class FetchAllCategoriesUseCase {
  static async execute() {
    try {
      const categories = await CategoryService.fetchAll();
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
}
