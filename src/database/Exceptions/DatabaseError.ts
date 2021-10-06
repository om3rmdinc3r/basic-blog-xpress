import BaseError from "./BaseError";

export default class DatabaseError extends BaseError {
  constructor(message: string) {
    super(message, "Database Error", 500, "Database Operation Failed");
  }
}
