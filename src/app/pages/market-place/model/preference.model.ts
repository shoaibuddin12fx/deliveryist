import { Deserializable } from './deserializable.model';

export class Preference implements Deserializable {
    
    id: number = Math.random();
    cartCount: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}