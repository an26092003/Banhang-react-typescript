export const formartVND = (price: number) => {
    const vnd = price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

    return vnd
}