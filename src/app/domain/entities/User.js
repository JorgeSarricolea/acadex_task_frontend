export class User {
  constructor({ id, firstName, lastName, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName || ""; // Optional
    this.email = email;
  }
}
