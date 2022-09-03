import { Deserializable } from './deserializable.model';

export class Banner implements Deserializable {
    id: number;
    name: string;
    image: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}