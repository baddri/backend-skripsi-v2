import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { Favorite, FavoriteDocument } from './schemas/favorite.schema';
import { History, HistoryDocument } from './schemas/history.schema';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';

@Injectable()
export class CollectionService {
  private logger = new Logger(CollectionService.name);

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Favorite.name) private FavoriteModel: Model<FavoriteDocument>,
    @InjectModel(History.name) private HistoryModel: Model<HistoryDocument>,
    @InjectModel(Wishlist.name) private WishlistModel: Model<WishlistDocument>,
  ) {}
}
