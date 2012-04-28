//Master View Component Constructor
var data = require('data/data'),
    tableUtil = require('ui/common/TableView');
function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
    var tableData = [];
        // tableIndex = [],
        // lastIndexed = false;

    Object.keys(data.disciplines).sort().forEach(function(item, index) {
        var row = Ti.UI.createTableViewRow({
            hasChild: true,
            __searchindex: item //custom attrib to use with table search
        });

        row.label = Ti.UI.createLabel({
            text:item,
            font:{fontSize:15},
            color:'#333',
            height:Ti.UI.SIZE,
            left: 10,
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