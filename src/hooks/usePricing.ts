import { StorageTier } from "@/context/StorageContext";

export const PRICING_TIERS = {
    small: {
        name: 'Small',
        price: 199,
        description: 'Small — per box plan',
        delivery: 'Free',
        prime: '30 min',
        split: '—',
        features: ['Free delivery', 'Prime: 30 min'],
    },
    medium: {
        name: 'Medium',
        price: 499,
        description: 'Medium — per box plan',
        delivery: '30/70 ; user/client',
        prime: '2 hour notice',
        split: '30/70 ; user/client',
        features: ['Delivery split 30/70 (user/client)', '2 hour notice'],
    },
    large: {
        name: 'Large',
        price: 999,
        description: 'Large — per box plan',
        delivery: '60/40 : user/client',
        prime: '2 hour notice',
        split: '60/40 : user/client',
        features: ['Delivery split 60/40 (user/client)', '2 hour notice'],
    },
    xl: {
        name: 'XL/Custom',
        price: 'Custom',
        description: 'XL / Custom sizing and pricing',
        delivery: 'Custom costing',
        prime: 'Custom notice',
        split: 'Custom',
        features: ['Custom costing', 'Custom notice'],
    },
};

export function usePricing() {
    const calculateTotal = (tier: StorageTier, extraItems: number = 0) => {
        const basePrice = PRICING_TIERS[tier]?.price;
        // Simple logic: ₹100 per extra item
        const extraCost = extraItems * 100;
        if (typeof basePrice !== 'number') return null;
        return basePrice + extraCost;
    };

    return {
        tiers: PRICING_TIERS,
        calculateTotal,
    };
}
