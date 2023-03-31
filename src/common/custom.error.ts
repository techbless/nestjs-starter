class CustomError {
  public status;
  public message;
  public additionalInfo;

  constructor(status: number, message: string, additionalInfo: string) {
    this.status = status;
    this.message = message;
    this.additionalInfo = additionalInfo;
  }
}

export default CustomError;
