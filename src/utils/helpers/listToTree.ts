export type TreeList<T extends object= object> = TreeItem<T>[];

export function listToTree<T extends object= object>(
  data: TreeList<T>,
  options?: Partial<{
    id: keyof T;
    parentId: keyof T;
    children: string;
    withLevel: boolean;
  }>,
): TreeList<T> {
  const ID_KEY = (options?.id || 'id') as keyof T;
  const PARENT_ID_KEY = (options?.parentId || 'parentId') as keyof T;
  const CHILDREN_KEY = options?.children || 'children';

  const childrenListMap = {} as Record<string, TreeItem<T>[] | null>;
  const nodeIds = {} as Record<string, TreeItem<T> | null>;
  const tree: TreeList<T> = [];

  for (const d of data) {
    const parentId = d[PARENT_ID_KEY];
    if (childrenListMap[parentId as string] == null)
      childrenListMap[parentId as string] = [];

    nodeIds[d[ID_KEY] as string] = d;
    childrenListMap[parentId]?.push(d);
  }

  for (const d of data) {
    const parentId = d[PARENT_ID_KEY];
    if (nodeIds[parentId as string] == null)
      tree.push(d);
  }

  for (const t of tree)
    adaptToChildrenList(t);

  function adaptToChildrenList(item: T) {
    if (childrenListMap[item[ID_KEY] as string]) {
      const key = CHILDREN_KEY as keyof T;
      item[key] = childrenListMap[item[ID_KEY] as string] as T[keyof T];
    }
    if (item[CHILDREN_KEY as keyof T]) {
      for (const c of item[CHILDREN_KEY as keyof T] as any)
        adaptToChildrenList(c);
    }
  }
  return options?.withLevel ? setTreeLevel(tree) : tree;
}

export function setTreeLevel<T extends object= object>(tree: TreeList<T>, level = 0) {
  const result: TreeList<T> = [];
  tree.forEach((e) => {
    result.push({
      ...e,
      level,
      children: e.children ? setTreeLevel(e.children, level + 1) : undefined,
    });
  });
  return result;
}
