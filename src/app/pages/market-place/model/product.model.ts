import { Deserializable } from './deserializable.model';
import { Category } from './category.model';

export class Product implements Deserializable {
    id: string;
    name: string;
    category_id: any;
    condition_id:  any;
    vehicle_id: any;
    brand: string;
    image: string;
    extra_labels: any;
    description: string;
    price: number;
    latitude: number;
    longitude: number;
    new: boolean = false;
    photos_urls: any;
    qty: number;
    created_at: any;
    category_name: any;
    condition_name: any;
    vehicle_name: any;
    

    deserialize(input: any) {
        
        if(!input.image){
            input.image = 'assets/images/product-avatar.jpg';
        }

        Object.assign(this, input);        
        return this;
    }
}