import type { item } from "@/types/itemType";

export function findIndexById(items: Array<item>, id: number) {
  return items
    .map(function (e) {
      return e.id;
    })
    .indexOf(id);
}
