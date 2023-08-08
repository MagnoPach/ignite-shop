import { Item } from "./cart-reducer";

export enum ActionTypes {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  TOGGLE_CART = "TOGGLE_CART",
}

export function addItemAction(item: Item) {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: item,
  };
}

export function removeItemAction(key: number) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: { key },
  };
}

export function toggleCartAction() {
  return {
    type: ActionTypes.TOGGLE_CART,
  };
}
