export function formatIndianNumber(num) {
    if (typeof num !== 'number' && typeof num !== 'string') {
        throw new Error('Input must be a number or a string representing a number.');
    }

    const [integerPart, decimalPart] = num.toString().split('.');

    const lastThreeDigits = integerPart.slice(-3);
    const rest = integerPart.slice(0, -3);

    const formattedRest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    const formattedNumber = rest.length > 0 ? `${formattedRest},${lastThreeDigits}` : lastThreeDigits;

    return decimalPart ? `${formattedNumber}.${decimalPart}` : formattedNumber;
}
