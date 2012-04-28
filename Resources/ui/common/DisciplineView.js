//Master View Component Constructor
var data = require('data/data');
function DisciplineView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	//some dummy data for our table view
    var tableData = [];
    Object.keys(data.disciplines).sort().forEach(function(item) {
        var row = Ti.UI.createTableViewRow({
            hasChild: true
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
    });

	var table = Ti.UI.createTableView({
	    minRowHeight: 44,
		data:tableData
	});
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
	    Ti.API.debug('disciplineView Click');
		self.fireEvent('itemSelected', {
			name:e.row.label.text
		});
	});
	
	return self;
};

module.exports = DisciplineView;