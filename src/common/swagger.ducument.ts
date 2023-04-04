import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

export class SwaggerAPIDocumentation {
  private readonly app: INestApplication;
  private readonly path: string;

  constructor(app: INestApplication, path: string) {
    this.app = app;
    this.path = path;

    this.setup();
  }

  private getConfig() {
    return new DocumentBuilder()
      .setTitle("NestJs Starter")
      .setDescription("Boiler Plate of Nest.js")
      .setVersion("1.0")
      .build();
  }

  public setup() {
    const config = this.getConfig();
    const document = SwaggerModule.createDocument(this.app, config);

    SwaggerModule.setup(this.path, this.app, document);
  }
}
