export type RestockType = 'Manual' | 'Auto';

export type RestockStatusType = 'processing' | 'shipped' | 'completed';

/**
 * Information of a restock.
 */
export type RestockInfo = {
  id: string;
  status: RestockStatusType;
  purchaseDate: string;
  totalPrice: number;
  type: RestockType;
}

/**
 * Info of a purchased item during a restock.
 *
 * This will be directly returned from the backend.
 */
export type PurchaseItemInfo = {
  description: string;
  unitPrice: number;
  quantity: number;
}

/**
 * Info of a purchased item during a restock **with calculated fields**.
 *
 * The fields in this type should be calculated at the frontend,
 * **not the backend**.
 */
export type PurchaseItemInfoCalculated = PurchaseItemInfo & {
  price: number;
}

/**
 * Data entry of a restock.
 */
export type RestockDataEntry = RestockInfo & {
  purchasedItems: Array<PurchaseItemInfo>
};

export type RestockData = Array<RestockDataEntry>;
