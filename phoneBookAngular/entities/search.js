/**
 * Created by User on 07.04.2016.
 */
function Search(request,parentId){
    this.id=null;
    this.request=request;
    this.name="search result for:"+request;
    this.parentId=parentId;
    this.type="search"
}