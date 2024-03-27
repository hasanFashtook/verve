import { UserProduct } from '@/types/types'
import { createStore } from 'zustand/vanilla'

export type CartState = {
  productsCart: UserProduct[];
}

export type CartActions = {
  asyncDataWithBackend: (productsCart: UserProduct[]) => void,
  addProductToCart: (product: UserProduct) => void;
  removeProductToCart: (id: number) => void;
}

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
  productsCart: [],
}

export const createCartStore = (
  initState: CartState = defaultInitState,
) => {
  return createStore<CartStore>()((set) => ({
    ...initState,
    asyncDataWithBackend: (productsCart: UserProduct[]) => {
      set({ productsCart: [...productsCart] })
    },
    addProductToCart: (product: UserProduct) =>
      set((state) => ({
        ...state,
        productsCart: [...state.productsCart, product]
      })),
    removeProductToCart: (id: number) => {
      set((state) => {
        const productIndex = state.productsCart.findIndex(
          (product) => product.id === id
        );

        if (productIndex !== -1) {
          return {
            ...state,
            productsCart: [
              ...state.productsCart.slice(0, productIndex),
              ...state.productsCart.slice(productIndex + 1),
            ],
          };
        } else {
          return state;
        }
      });
    },
  }))
}


// edit number or product addet to cart if it is already existing on cart
// addProductToCart: (product: Product) => set((state) => {
//   const existingProductIndex = state.productsCart.findIndex(
//     (item) => item.id === product.id
//   );

//   if (existingProductIndex !== -1) {
//     // Product already exists in the cart, update quantity
//     return {
//       ...state,
//       productsCart: state.productsCart.map((item, index) =>
//         index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
//       ),
//     };
//   } else {
//     // Product not found, add it with quantity 1
//     return {
//       ...state,
//       productsCart: [...state.productsCart, { ...product, quantity: 1 }],
//     };
//   }
// }),
