import { Query } from 'utils/Query';

export const lessonQuery = (userId: string) =>
  new Query([
    {
      $lookup: {
        from: 'watchlists',
        let: {
          lesson_id: '$_id',
        },
        as: 'watch',
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$owner', userId],
                  },
                  {
                    $eq: ['$lesson_id', '$$lesson_id'],
                  },
                ],
              },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        watch: {
          $arrayElemAt: ['$watch', 0],
        },
      },
    },
    {
      $addFields: {
        completed: {
          $cond: {
            if: {
              $eq: ['$watch.progress', 1],
            },
            then: true,
            else: false,
          },
        },
        progress: {
          $cond: {
            if: '$watch',
            then: '$watch.progress',
            else: 0,
          },
        },
      },
    },
  ]);
