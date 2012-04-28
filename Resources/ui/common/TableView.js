var Theme = require('ui/common/Theme');
function addSearch(table) {

    table.hideSearchOnSelection = true;
    table.filterCaseInsensitive = true;
    table.filterAttribute = '__searchindex';
    table.searchHidden = true;
    table.search = Titanium.UI.createSearchBar({
        barColor: Theme.barColor,
        backgroundImage: Theme.searchBg
    });
    return table;

}
exports.addSearch = addSearch;
