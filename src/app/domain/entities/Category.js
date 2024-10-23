export class Category {
  constructor({ id, name, homeworks = [] }) {
    this.id = id;
    this.name = name;
    this.homeworks = homeworks;
  }

  addHomework(homework) {
    this.homeworks.push(homework);
  }

  getHomeworkCount() {
    return this.homeworks.length;
  }
}
