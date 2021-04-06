export type Ingredient = {
    name: string,
    inventory: number,
    unit: string,
    price: number,
}

export type MenuItem = {
    name: string,
    description: string,
    price: number,
}

export type MenuIngredient = {
    name: string,
    measurement: string,
    amount: number,
    menuItem: string,
};

export type Measurement = {
    value: string,
    label: string,
};
