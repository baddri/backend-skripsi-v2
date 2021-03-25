import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { Notification, NotificationDocument } from './notification.schema';

@Injectable()
export class NotificationService {
  private logger = new Logger(NotificationService.name);

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Notification.name)
    private NotificationModel: Model<NotificationDocument>,
  ) {}
}
