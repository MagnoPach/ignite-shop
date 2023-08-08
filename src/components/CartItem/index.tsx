import {
  CartItemContainer,
  CartItemDescriptionContainer,
  CartItemImageContainer,
} from "../../styles/components/cart";
import Image from "next/image";
import exImg from "../../assets/1.png";
import { priceFormat } from "../../lib/utils";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Item } from "@/src/reducers/cart-reducer";

interface CartItemProps {
  item: Item;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem } = useContext(CartContext);

  function handleRemoveClick() {
    removeItem(item.key!);
  }

  return (
    <CartItemContainer>
      <CartItemImageContainer>
        <Image src={item.imageUrl} width="102" height="92" alt="" />
      </CartItemImageContainer>

      <CartItemDescriptionContainer>
        <header>{item.name}</header>
        <p>{priceFormat(Number(item.price))}</p>
        <footer>
          <span onClick={handleRemoveClick}>Remover</span>
        </footer>
      </CartItemDescriptionContainer>
    </CartItemContainer>
  );
}
