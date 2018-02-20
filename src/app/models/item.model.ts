import { Guid } from '../core/guid';

export class ItemModel {
    id: string;
    name: string;

    constructor() {
        this.id = Guid.newGuid();
    }
}
