import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Checkout, CheckoutSchema } from './checkout.schema';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
    ]),
  ],
  exports: [PaymentService],
  providers: [PaymentService],
})
export class PaymentModule {}
