import { registerEnumType } from '@nestjs/graphql';

export enum LessonType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
}

registerEnumType(LessonType, {
  name: 'LessonType',
});
