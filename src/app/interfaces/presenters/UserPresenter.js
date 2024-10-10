import { User } from "@/app/domain/entities/User.js";

export class UserPresenter {
  static toUser(responseData) {
    return new User({
      id: responseData.id,
      firstName: responseData.firstName,
      lastName: responseData.lastName,
      email: responseData.email,
      token: responseData.token || undefined,
    });
  }

  static toError(errorData) {
    return new Error(errorData.error || "An unexpected error occurred");
  }
}
