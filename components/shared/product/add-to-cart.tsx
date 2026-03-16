"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { CartItem, Cart } from "@/types";

import { toast } from "sonner";

import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message, {
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
      actionButtonStyle: {
        background: "black",
        color: "white",
      },
    });
  };

  const handleRemoveItemFromCart = async () => {
    const res = await removeItemFromCart(item.productId);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
  };

  //   check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button
        type="button"
        variant="outline"
        onClick={handleRemoveItemFromCart}
      >
        <Minus className="w-4 h4" />
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        <Plus className="w-4 h4" />
      </Button>
    </div>
  ) : (
    <Button type="button" className="w-full" onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  );
};

export default AddToCart;
