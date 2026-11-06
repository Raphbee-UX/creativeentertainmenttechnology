export const plans = [
  { name: "Starter", monthly: 9, features: ["100 SMS credits", "1 social subscription", "Standard delivery", "Email support"] },
  { name: "Pro", monthly: 29, features: ["1,000 SMS credits", "5 social subscriptions", "Priority delivery", "24/7 support"] },
  { name: "Business", monthly: 79, features: ["10,000 SMS credits", "Unlimited subscriptions", "Dedicated routing", "Priority support"] },
] as const;

export function displayedPrice(monthlyPrice: number, yearly: boolean) {
  return yearly ? Math.round(monthlyPrice * 0.8) : monthlyPrice;
}