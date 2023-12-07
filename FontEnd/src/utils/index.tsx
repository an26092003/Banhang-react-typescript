export const formatCurrency = (price: number) => {
    const parts = price.toString().split('.');
    let formattedPrice = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (parts.length > 1) {
        const decimalPart = parts[1].slice(0, 2); // Lấy hai chữ số phần thập phân
        formattedPrice += `.${decimalPart}`;
    } else {
        formattedPrice += '';
    }

    return `${formattedPrice}₫`;
}
