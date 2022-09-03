import { Deserializable } from './deserializable.model';
import { Product } from './product.model';

export class Cart  {
    
    id: number = Math.random();
    items: Product[] = [];
    shipping: number = 0;
    subtotal: number = 0;
    total: number = 0;
    

}