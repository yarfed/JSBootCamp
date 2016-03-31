/**
 * Created by User on 29.03.2016.
 */
function SearchResult(searchRequest) {
    this.parent = null;
    this.name = "search request: " + searchRequest;
    this.request = searchRequest;
    this.items = [];
    this.type = "search";
}