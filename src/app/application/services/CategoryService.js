import endpoints from "@/app/infrastructure/config/configAPI";

export class CategoryService {
  static async fetchAll() {
    const response = await fetch(endpoints.getAllCategories);
    if (!response.ok) {
      throw new Error("Error fetching categories");
    }
    const data = await response.json();
    return data;
  }

  static async fetchCategoryById(categoryId) {
    const response = await fetch(endpoints.getCategoryById(categoryId));
    if (!response.ok) {
      throw new Error(`Error fetching category with ID: ${categoryId}`);
    }
    return response.json();
  }
}
