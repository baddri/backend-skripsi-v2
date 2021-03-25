import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Checkout, CheckoutDocument } from './checkout.schema';

@Injectable()
export class PaymentService {
  private logger = new Logger(PaymentService.name);

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Checkout.name) private ChackoutModel: Model<CheckoutDocument>,
  ) {}
}
