import { Query } from 'utils/Query';

export const userQuery = new Query([
  {
    $lookup: {
      from: 'collections',
      as: 'owned_courses',
      let: {
        owner_id: '$_id',
      },
      pipeline: [
        {
          $match: {
            $and: [{ _id: '$$owner_id' }, { purchase_complete: true }],
          },
        },
      ],
    },
  },
  {
    $lookup: {
      from: 'courses',
      as: 'courses',
      let: {
        owner_id: '$_id',
      },
      pipeline: [
        {
          $match: {
            _id: '$$owner_id',
          },
        },
      ],
    },
  },
  {
    $addFields: {
      owned_course_count: {
        $size: '$owned_courses',
      },
      course_count: {
        $size: '$courses',
      },
    },
  },
]);
