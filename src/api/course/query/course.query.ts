import { instructorQuery } from 'api/user/query/instructor.query';
import { Query } from 'utils/Query';

export const courseQuery = new Query([
  {
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
              _id: '$$instructor_id',
            },
          },
        ],
        ...instructorQuery.query,
      ],
    },
  },
]);
