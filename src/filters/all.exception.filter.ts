import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import CustomError from "../common/custom.error";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let customError = exception;

    if (!(exception instanceof CustomError)) {
      if (process.env.NODE_ENV !== "development") {
        customError = new CustomError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          exception.name || "Oh no, this is embarrassing. We are having troubles.",
          exception.message || "No additional information",
        );
      } else {
        customError = new CustomError(HttpStatus.INTERNAL_SERVER_ERROR, "Server Error", "No Additional Information");
      }
    }

    response.status(customError.status).json({
      statusCode: customError.status,
      message: customError.message,
      additionalInfo: customError.additionalInfo,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
