import { Query } from 'utils/Query';

export const instructorQuery = new Query([
  {
    $match: {
      is_instructor: true,
    },
  },
  {
    $lookup: {
      from: 'courses',
      as: 'courses',
      let: {
        user_id: '$_id',
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [
                '$owner',
                {
                  $toString: '$$user_id',
                },
              ],
            },
          },
        },
      ],
    },
  },
  {
    $lookup: {
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
  },
  {
    $addFields: {
      course_count: {
        $size: '$courses',
      },
      student_count: {
        $size: '$students',
      },
    },
  },
  {
    $project: {
      full_name: 1,
      avatar_url: 1,
      information: 1,
      instructor_since: 1,
      is_verified: 1,
      course_count: 1,
      student_count: 1,
    },
  },
]);
