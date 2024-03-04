export function UserSearchFilter(search: string, keyPrefix?: string): any[] {
  const searchWords: string[] = search.split(' ');

  const firstNameKey: string = `${keyPrefix ? `${keyPrefix}.` : ''}firstName`;
  const lastNameKey: string = `${keyPrefix ? `${keyPrefix}.` : ''}lastName`;

  if (searchWords.length > 1) {
    return [
      {
        $and: [
          {
            [firstNameKey]: { $contL: searchWords.length > 1 ? searchWords[0] : search },
          },
          {
            [lastNameKey]: {
              $contL: searchWords.length > 1 && searchWords[searchWords.length - 1] ? searchWords[searchWords.length - 1] : search,
            },
          },
        ],
      },
    ];
  }

  return [
    {
      [firstNameKey]: { $contL: search },
    },
    {
      [lastNameKey]: {
        $contL: search,
      },
    },
  ];
}
