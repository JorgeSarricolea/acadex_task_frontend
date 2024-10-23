export class HomeworkPresenter {
  static present(homework) {
    return {
      id: homework.id,
      title: homework.title,
      description: homework.description,
      startDate: homework.startDate,
      endDate: homework.endDate,
      userId: homework.userId,
      categoryId: homework.categoryId,
      status: homework.status,
    };
  }

  static presentMany(homeworks) {
    return homeworks.map(HomeworkPresenter.present);
  }
}
