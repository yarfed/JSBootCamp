/**
 * Created by User on 20.04.2016.
 */
export class Group {
    id:number;
    name:string;
    parentId:number;
    type:string;

    constructor(parentId) {
        this.id = null;
        this.parentId = parentId;
        this.type = 'group'
    }
}