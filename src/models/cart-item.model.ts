import { Product } from './product.model';

export interface CartItem extends Product {
  quantity: number;
  color: string;
  size: string;
  cartItemId: string;
  customText?: string; // Vlastný text od zákazníka
}
