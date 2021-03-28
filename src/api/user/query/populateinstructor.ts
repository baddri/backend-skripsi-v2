import { Query } from 'utils/Query';

export const populateInstructor = new Query([
  {
    from: 'courses',
    as: 'courses',
    let: {
      user_id: '$_id',
    },
    pipeline: [
      {
        $match: {
          $expr: {
            $eq: ['$owner', { $toString: '$$user_id' }],
          },
        },
      },
    ],
  },
  {
    from: 'collections',
    as: 'students',
    let: {
      courses: '$courses',
    },
    pipeline: [
      {
        $match: {
          $expr: {
            $in: [
              '$_id',
              {
                $map: {
                  input: '$$courses',
                  as: 'courses',
                  in: '$$courses._id',
                },
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: '$owner',
        },
      },
    ],
  },
  {
    course_count: {
      $size: '$courses',
    },
    student_count: {
      $size: '$students',
    },
  },
  {
    full_name: 1,
    avatar_url: 1,
    information: 1,
    instructor_since: 1,
    is_verified: 1,
    course_count: 1,
    student_count: 1,
  },
]);
