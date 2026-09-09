import { createHash } from 'node:crypto';

export type CartSnapshotLine = {
  productId: string;
  quantity: number;
  unitPrice: number;
};

export function createCartSnapshotHash(lines: CartSnapshotLine[]) {
  const normalizedLines = [...lines]
    .sort((left, right) => left.productId.localeCompare(right.productId))
    .map((line) => ({
      productId: line.productId,
      quantity: line.quantity,
      unitPrice: line.unitPrice,
    }));

  return createHash('sha256').update(JSON.stringify(normalizedLines)).digest('hex');
}
