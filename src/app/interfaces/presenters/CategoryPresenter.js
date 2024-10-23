export class CategoryPresenter {
  static present(category) {
    return {
      id: category.id,
      name: category.name,
      homeworks: category.homeworks.map((homework) => ({
        id: homework.id,
        title: homework.title,
        description: homework.description,
        startDate: homework.startDate,
        endDate: homework.endDate,
      })),
    };
  }

  static presentMany(categories) {
    return categories.map(CategoryPresenter.present);
  }
}
