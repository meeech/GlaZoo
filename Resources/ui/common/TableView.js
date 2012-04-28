function addSearch(table) {

    table.hideSearchOnSelection = true;
    table.filterCaseInsensitive = true;
    table.filterAttribute = '__searchindex';
    table.searchHidden = true;
    table.search = Titanium.UI.createSearchBar();
    return table;

}
exports.addSearch = addSearch;
