import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Favorite, FavoriteSchema } from './schemas/favorite.schema';
import { History, HistorySchema } from './schemas/history.schema';
import { Wishlist, WishlistSchema } from './schemas/wishlist.schema';
import { CollectionService } from './collection.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
      { name: History.name, schema: HistorySchema },
      { name: Wishlist.name, schema: WishlistSchema },
    ]),
  ],
  exports: [CollectionService],
  providers: [CollectionService],
})
export class CollectionModule {}
