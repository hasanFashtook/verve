'use client'
;
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCartStore } from '@/providers/cart-store-provider';
import { instanceAxios } from '@/utils/instanceAxios';
import { useUser } from '@clerk/nextjs';
import { UserResource } from '@clerk/types';

interface AddToCartButtonProps {
  productDetails: Product
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productDetails
}) => {

  const activeUser  = useUser().user;

  const { addProductToCart } = useCartStore(
    (state) => state,
  )

  async function handleAddToCart() {

    const payLoad = {
      data: {
        username: activeUser?.fullName,
        email: activeUser?.primaryEmailAddress?.emailAddress,
        products: [productDetails.id]
      }
    }

    try {
      const res = await instanceAxios.post(`carts?populate[products][populate]=panner`, payLoad);
      const data = res.data;
      addProductToCart(data.data);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Button className="flex gap-1 w-fit mt-4" onClick={handleAddToCart}>
      <ShoppingCart />
      <span>Add To Cart</span>
    </Button>
  );
};

export default AddToCartButton;
