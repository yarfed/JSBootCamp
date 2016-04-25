/**
 * Created by User on 21.04.2016.
 */
export class Contact {
    id:number;
    name:string;
    parentId:number;
    type:string;
    private phones;

    constructor(parentId) {
        this.parentId = parentId;
        this.type = 'contact';
        this.phones=[null];
    }
}