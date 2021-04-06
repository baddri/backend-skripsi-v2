import { instructorQuery } from 'api/user/query/instructor.query';
import { Query } from 'utils/Query';
import { sectionQuery } from './section.query';

export const courseQuery = (userId: string) =>
  new Query([
    {
      // FIXME: categories is string
      $lookup: {
        from: 'coursecategories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
    {
      $lookup: {
        from: 'users',
        let: {
          instructor_id: '$owner',
        },
        as: 'owner',
        pipeline: [
          ...[
            {
              $match: {
                $expr: {
                  $eq: [
                    '$$instructor_id',
                    {
                      $toString: '$_id',
                    },
                  ],
                },
              },
            },
          ],
          ...instructorQuery.query,
        ],
      },
    },
    {
      $lookup: {
        from: 'coursesections',
        as: 'sections',
        let: {
          course_id: '$_id',
        },
        pipeline: [
          ...[
            {
              $match: {
                $expr: {
                  $eq: [
                    '$$course_id',
                    {
                      $toObjectId: '$course_id',
                    },
                  ],
                },
              },
            },
          ],
          ...sectionQuery(userId).query,
        ],
      },
    },
    {
      $addFields: {
        owner: {
          $arrayElemAt: ['$owner', 0],
        },
      },
    },
  ]);
