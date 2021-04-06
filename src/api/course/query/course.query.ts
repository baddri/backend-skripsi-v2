import { instructorQuery } from 'api/user/query/instructor.query';
import { Query } from 'utils/Query';

export const courseQuery = new Query([
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
    $addFields: {
      owner: {
        $arrayElemAt: ['$owner', 0],
      },
    },
  },
]);
