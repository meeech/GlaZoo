//Master View Component Constructor
var data = require('data/data'),
    tableUtil = require('ui/common/TableView'),
    Theme = require('ui/common/Theme');
function MasterView() {
    //create object instance, parasitic subclass of Observable
    var self = Ti.UI.createView({
        backgroundColor:'transparent'
    });
    
    var tableData = [];
        // tableIndex = [],
        // lastIndexed = false;

    Object.keys(data.disciplines).sort().forEach(function(item, index) {
        var row = Ti.UI.createTableViewRow({
            selectedBackgroundColor: Theme.barColor,
            backgroundImage: Theme.tableRowBg,
            leftImage: 'images/icon_'+ item.toLowerCase() +'.png',
            hasChild: true,
            __searchindex: item //custom attrib to use with table search
        });

        row.label = Ti.UI.createLabel({
            text:item,
            font:{fontSize:23, fontFamily: 'Georgia'},
            color:'#333',
            shadowColor:"#fff",
            shadowOffset:{x:0,y:1},
            height:Ti.UI.SIZE,
            left: 70,
            right: 10
        });

        row.add(row.label);
        tableData.push(row);
        
        // var toIndex = item[0].toUpperCase();
        // if(toIndex !== lastIndexed) {
        //     tableIndex.push({title: toIndex, index: index});
        //     lastIndexed = toIndex;
        // }
    });
    
    var table = Ti.UI.createTableView({
        backgroundColor:'transparent',
        rowHeight: 77,
        footerView: Ti.UI.createView({height: 0}), 
        // index: tableIndex,
        data:tableData
    });
    // tableUtil.addSearch(table);
    self.add(table);
    
    //add behavior
    table.addEventListener('click', function(e) {
        Ti.API.debug('masterView Table Click');
        self.fireEvent('itemSelected', {
            name:e.row.label.text
        });
    });
    
    return self;
};

module.exports = MasterView;