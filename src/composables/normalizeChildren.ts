export interface NormalizedChildRef {
  id: string;
  basePath?: string;
}

export function normalizeChildren(children: unknown): NormalizedChildRef[] {
  if (!Array.isArray(children)) {
    return [];
  }

  return children
    .map((child) => {
      if (typeof child === 'string') {
        return { id: child };
      }

      if (
        child &&
        typeof child === 'object' &&
        'id' in child &&
        typeof (child as { id?: unknown }).id === 'string'
      ) {
        const objectChild = child as { id: string; basePath?: unknown; path?: unknown };
        return {
          id: objectChild.id,
          basePath:
            typeof objectChild.basePath === 'string'
              ? objectChild.basePath
              : typeof objectChild.path === 'string'
                ? objectChild.path
                : undefined,
        };
      }

      return undefined;
    })
    .filter((child): child is NormalizedChildRef => !!child);
}
