export type RestockItemInfo = {
    id: string;
    status: string;
    purchaseDate: string;
    totalPrice: number;
}

export type ItemDataInfo = {
    description: string;
    unitPrice: number;
    quantity: number;
}

export type Items = {
    itemsData: Array<ItemDataInfo>
}

export type RestockDataInfo = RestockItemInfo & Items;

export type RestockData = Array<RestockDataInfo>;
