var data = require('data/data').disciplines;

function titleRow(text) {
    var row = Ti.UI.createTableViewRow({
        title: text
    });

    return row;
}

function subtitleRow(text) {
    var row = Ti.UI.createTableViewRow({
        title: text
    });
    
    return row;
}

function DetailView() {
	var self = Ti.UI.createView();

    var table = Ti.UI.createTableView({
	    footerView: Ti.UI.createView({height: 0}), 
		data:[]
	});
	self.add(table);
	
	self.addEventListener('itemSelected', function(e) {
	    Ti.API.debug('detailView itemSelected');

	    var item = data[e.discipline][e.key] || false;
	    if(item == false) {
	        Ti.API.error('Item not found');
	        return;
	    }
        self.paint(item);
	});
	
	self.paint = function(item) {
	    Ti.API.debug(item);
        var tableData = [];
        
        var title = item.common_name || '',
            subtitle = item.scientific_name || '';

        if(title == '') {
            title = item.scientific_name;
            subtitle = '';
        }
        
        tableData.push(titleRow(title));
        if('' != subtitle){
            tableData.push(subtitleRow(subtitle));
        }
        
        table.setData(tableData);
	};
	
	return self;
};

module.exports = DetailView;
