export const reduceTotal = (carts: any[]) => {
    return carts.reduce((sum: number, item: any) => {
        return sum + item.price * item.quantity;
    }, 0);
};

