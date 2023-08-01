export function convertToUnitAmount(decimalAmount: number, currency: string): number {
    if ( decimalAmount <= 0) {
        throw new Error('Le montant décimal doit être un nombre positif.');
    }

    if (!Number.isInteger(decimalAmount * 100)) {
        throw new Error('Le montant décimal doit avoir exactement deux décimales.');
    }

    const currencyDecimalDigits: { [key: string]: number } = {
        'eur': 2, // Euro (centimes)
        'usd': 2, // Dollar américain (cents)
        // Ajoutez d'autres devises ici si nécessaire
    };

    const decimalDigits = currencyDecimalDigits[currency.toLowerCase()];

    if (decimalDigits === undefined) {
        throw new Error(`La devise "${currency}" n'est pas prise en charge.`);
    }

    return decimalAmount * Math.pow(10, decimalDigits);
}