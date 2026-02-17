import { StorageTier } from "@/context/StorageContext";

export const PRICING_TIERS = {
    starter: {
        name: 'Starter',
        price: 499,
        description: 'Perfect for decluttering a closet.',
        features: ['5 Items', 'Standard Delivery', 'Micro-hub Access'],
    },
    hobbyist: {
        name: 'Hobbyist',
        price: 1499,
        description: 'Great for gear and seasonal items.',
        features: ['20 Items', 'Priority Delivery', 'Mega-hub Access'],
    },
    lifestyle: {
        name: 'Lifestyle',
        price: 4999,
        description: 'Your entire extra room, on demand.',
        features: ['Unlimited Items', '10-min Flash Retrieval', 'Concierge Service'],
    },
};

export function usePricing() {
    const calculateTotal = (tier: StorageTier, extraItems: number = 0) => {
        const basePrice = PRICING_TIERS[tier].price;
        // Simple logic: ₹100 per extra item
        const extraCost = extraItems * 100;
        return basePrice + extraCost;
    };

    return {
        tiers: PRICING_TIERS,
        calculateTotal,
    };
}
