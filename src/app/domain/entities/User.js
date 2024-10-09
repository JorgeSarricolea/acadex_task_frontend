export class User {
  constructor({ id, firstName, lastName, email, token }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName || ""; // Optional
    this.email = email;
    this.token = token;
  }
}
