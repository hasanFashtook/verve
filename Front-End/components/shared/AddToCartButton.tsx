'use client'
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/types';
import { useCartStore } from '@/providers/cart-store-provider';
import { useSession } from 'next-auth/react';
import { instanceAxios } from '@/utils/instanceAxios';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
  productDetails: Product
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productDetails
}) => {
  const { data: session } = useSession();
  const { push } = useRouter()

  const { addProductToCart } = useCartStore(
    (state) => state,
  )

  async function handleAddToCart() {


    if (!session) {
      push('/login')
    }
    const payLoad = {
      data: {
        username: session?.credenialUser.username,
        email: session?.credenialUser.email,
        products: [productDetails.id]
      }
    }
    console.log(payLoad)

    try {
      const res = await instanceAxios.post(`/carts?populate[products][populate]=panner`, payLoad, {
        headers: {
          Authorization: 'Bearer ' + session?.jwt as string
        }
      });
      const data = res.data;
      console.log(data.data)
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
