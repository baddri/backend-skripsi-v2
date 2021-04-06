import { Query } from 'utils/Query';
import { lessonQuery } from './lesson.query';

export const sectionQuery = (userId: string) =>
  new Query([
    {
      $lookup: {
        from: 'courselessons',
        as: 'lessons',
        let: {
          section_id: '$_id',
        },
        pipeline: [
          ...[
            {
              $match: {
                $expr: {
                  $eq: [
                    '$course_section_id',
                    {
                      $toString: '$$section_id',
                    },
                  ],
                },
              },
            },
          ],
          ...lessonQuery(userId).query,
        ],
      },
    },
  ]);
