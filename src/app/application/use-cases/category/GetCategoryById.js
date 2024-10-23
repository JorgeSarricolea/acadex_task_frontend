import { CategoryService } from "@/app/application/services/CategoryService";
import { CategoryPresenter } from "@/app/interfaces/presenters/CategoryPresenter";

export class FetchCategoryByIdUseCase {
  static async execute(categoryId) {
    try {
      const category = await CategoryService.fetchCategoryById(categoryId);
      return CategoryPresenter.present(category);
    } catch (error) {
      console.error(`Error fetching category with ID: ${categoryId}`, error);
      throw error;
    }
  }
}
