import BookingUtility from "@/interface/BookingUtility";

/**
 * Calculate unit price from total charge and usage
 */
export const calculateUnitPrice = (totalCharge: number, usage: number): number => {
    if (usage === 0) return 0;
    return Math.round((totalCharge / usage) * 100) / 100; // Round to 2 decimal places
};

/**
 * Calculate total charge from unit price and usage
 */
export const calculateTotalCharge = (unitPrice: number, usage: number): number => {
    return Math.round(unitPrice * usage * 100) / 100; // Round to 2 decimal places
};

/**
 * Get or calculate plumbing unit price
 */
export const getPlumbingUnitPrice = (utility: BookingUtility): number => {
    if (utility.plumbingUnitPrice !== undefined) {
        return utility.plumbingUnitPrice;
    }
    return calculateUnitPrice(utility.plumbingCharge, utility.plumbingUsage);
};

/**
 * Get or calculate electricity unit price
 */
export const getElectricityUnitPrice = (utility: BookingUtility): number => {
    if (utility.electricityUnitPrice !== undefined) {
        return utility.electricityUnitPrice;
    }
    return calculateUnitPrice(utility.electricityCharge, utility.electricityUsage);
};

/**
 * Format price for display
 */
export const formatPrice = (price: number): string => {
    return price.toLocaleString('th-TH', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
};
