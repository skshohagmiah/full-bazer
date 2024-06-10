"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, Color, Size, CouponCode, Image, ProductVariant } from "@prisma/client";

interface CartItem {
  product: (Product & {images:Image[], variants: (ProductVariant & { color: Color | null; size: Size | null })[]}); // Store the complete product object
  quantity: number;
  size?: Size | null; // Optional size object
  color?: Color | null; // Optional color object
  price: number;
}

interface ShippingAddress {
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?:string;
}

// Interface for your BillingAddress model
interface BillingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  postalCode: string;
}

interface CartState {
  items: CartItem[];
  shippingAddress: ShippingAddress | null;
  billingAddress: BillingAddress | null;
  selectedPaymentMethod: string | null;
  appliedCoupon: CouponCode | null;
  isLoading: boolean;
  // Add Actions
  addItem: (item: CartItem) => void;
  removeItem: (
    product: Product,
    size?: Size | null,
    color?: Color | null
  ) => void; // Remove by product, size, and color
  updateItemQuantity: (
    productId: string,
    size: Size | null,
    color: Color | null,
    quantity: number
  ) => void; // Update by product, size, and color
  setShippingAddress: (address: ShippingAddress) => void;
  setBillingAddress: (address: BillingAddress) => void;
  setSelectedPaymentMethod: (method: string) => void;
  setAppliedCoupon: (coupon: CouponCode | null) => void;
  setIsLoading: (loading: boolean) => void;
  clearCart: () => void;
  // Add Computed Properties
  calculateSubTotal: () => number;
  calculateTotal: () => number; // Calculate the cart total amount
  calculateDiscount: () => number; // Calculate discount amount
  calculateShipping: () => number; // Calculate shipping fee
  calculateTax: () => number; // Calculate tax amount
}

const useShoppingCart = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      shippingAddress: null,
      billingAddress: null,
      selectedPaymentMethod: null,
      appliedCoupon: null,
      isLoading: false,

      // Actions
      addItem: (newItem: CartItem) =>
        set((state) => {
          // Check if the item with the same product, size, and color already exists
          const existingItem = state.items.find(
            (item) =>
              item.product.id === newItem.product.id &&
              item.size?.id === newItem.size?.id && // Compare size objects
              item.color?.id === newItem.color?.id // Compare color objects
          );

          if (existingItem) {
            // If it exists, update the quantity
            return {
              items: state.items.map((item) =>
                item === existingItem // Directly compare objects
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            };
          } else {
            // If it doesn't exist, add it as a new item
            return {
              items: [...state.items, newItem],
            };
          }
        }),
      removeItem: (product: Product, size?: Size | null, color?: Color | null) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              item.product.id !== product.id ||
              item.size?.id !== size?.id ||
              item.color?.id !== color?.id
          ),
        })),
      updateItemQuantity: (
        productId: string,
        size: Size | null,
        color: Color | null,
        quantity: number
      ) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.size?.id === size?.id &&
            item.color?.id === color?.id
              ? { ...item, quantity }
              : item
          ),
        })),
      setShippingAddress: (address) => set({ shippingAddress: address }),
      setBillingAddress: (address) => set({ billingAddress: address }),
      setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
      setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      clearCart: () => set({ items: [], appliedCoupon: null }),

      // Computed Properties
      calculateSubTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      calculateDiscount: () => {
        const { appliedCoupon, calculateSubTotal } = get();
        const subtotal = calculateSubTotal();
        if (appliedCoupon) {
          if (appliedCoupon.discountType === "percentage") {
            return Math.round(
              subtotal * (appliedCoupon.amount / 100)
            );
          } else {
            return appliedCoupon.amount;
          }
        } else {
          return 0;
        }
      },
      calculateTotal: () => {
        const subtotal = get().calculateSubTotal();
        const discount = get().calculateDiscount();
        const shipping = get().calculateShipping();
        const tax = get().calculateTax();
        return subtotal - discount + shipping + tax;
      },
      calculateShipping: () => {
        // Replace with your actual shipping calculation logic
        // (e.g., based on totalAmount, shippingAddress, etc.)
        return 500; // $5 shipping fee
      },

      // Calculate tax based on shipping address and tax rates
      calculateTax: () => {
        const subtotal = get().calculateSubTotal();
        // Replace with your actual tax calculation logic
        // (e.g., fetch tax rates from your database based on shippingAddress)
        return Math.round(subtotal * 0.08); // 8% tax (example)
      },
    }),
    {
      name: "cart-storage", // Unique name for localStorage
    }
  )
);

export default useShoppingCart;

