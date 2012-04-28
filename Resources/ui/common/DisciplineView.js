//Discipline View Component Constructor
var data = require('data/data'),
        tableUtil = require('ui/common/TableView');

function DisciplineView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var table = Ti.UI.createTableView({
	    minRowHeight: 44,
	    footerView: Ti.UI.createView({height: 0}), 
		data:[]
	});
    tableUtil.addSearch(table);
	self.add(table);
	
	self.paint = function(discipline) {
        //Avoid flash of old content
        table.setData([]);

        var tableData = [];
        Object.keys(data.disciplines[discipline]).sort().forEach(function(item) {
            var row = Ti.UI.createTableViewRow({
                hasChild: true,
                discipline: discipline,
                __searchindex: item
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
        table.setData(tableData);
	};
	
	//add behavior
	table.addEventListener('click', function(e) {

	    Ti.API.debug('disciplineView Click');
		self.fireEvent('itemSelected', {
		    discipline: e.rowData.discipline,
			name:e.row.label.text
		});
	});
	
	return self;
};

module.exports = DisciplineView;