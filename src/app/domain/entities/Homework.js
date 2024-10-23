export class Homework {
  constructor({
    id,
    userId,
    categoryId,
    title,
    description,
    startDate,
    endDate,
    status,
  }) {
    this.id = id;
    this.userId = userId;
    this.categoryId = categoryId;
    this.title = title;
    this.description = description;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.status = status;
  }

  // Method to update the status of the homework
  updateStatus(newStatus) {
    this.status = newStatus;
  }

  // Method to extend the end date of the homework
  extendEndDate(newEndDate) {
    this.endDate = new Date(newEndDate);
  }
}
