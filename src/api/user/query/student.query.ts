import { Query } from 'utils/Query';

export const studentQuery = new Query([
  {
    $project: {
      _id: 1,
      full_name: {
        $cond: {
          if: '$is_private',
          then: null,
          else: '$full_name',
        },
      },
      avatar_url: {
        $cond: {
          if: '$is_private',
          then: null,
          else: '$avatar_url',
        },
      },
      is_verified: 1,
    },
  },
]);
