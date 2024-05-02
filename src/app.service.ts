import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/dev-config/dev-config.service';

@Injectable()
export class AppService {
  constructor(
    private readonly devConfigService: DevConfigService,
    @Inject('CONFIG') private readonly config
  ) {}

  getHello(): string {
    return `Hello World!\n
    DBHOST: ${this.devConfigService.getDBHOST()}
    CONFIG: ${this.config.PORT}
    `;
  }
}
