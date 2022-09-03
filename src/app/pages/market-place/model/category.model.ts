import { Deserializable } from './deserializable.model';

export class Category implements Deserializable {
    id: number;
    name: string;
    image: string;
    type: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}