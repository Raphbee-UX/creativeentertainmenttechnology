import { describe, expect, it } from "vitest";
import { displayedPrice, plans } from "@/lib/pricing";

describe("CET plan pricing", () => {
  it("shows the specified monthly prices", () => {
    expect(plans.map((plan) => displayedPrice(plan.monthly, false))).toEqual([9, 29, 79]);
  });

  it("applies the 20% yearly discount to all tiers", () => {
    expect(plans.map((plan) => displayedPrice(plan.monthly, true))).toEqual([7, 23, 63]);
  });
});