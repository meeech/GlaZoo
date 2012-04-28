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

function googleMapUrl (data) {
    var lat = data.lat || false,
        lng = data.lng || false,
        named = data.named || false;
    
    var width = Ti.Platform.displayCaps.platformWidth - 20;
    
    var url;
    if(named) {
        url = 'http://maps.googleapis.com/maps/api/staticmap?markers='+named+'&center='+named+'&zoom=2&scale=1&size='+width+'x100&maptype=terrain&sensor=false';
    }
    else {
        url = 'http://maps.googleapis.com/maps/api/staticmap?markers='+lat+','+lng+'&center='+lat+','+lng+'&zoom=2&scale=1&size='+width+'x100&maptype=terrain&sensor=false';
    }

    return url;
}

// http://maps.googleapis.com/maps/api/staticmap?center=Africa,%20Kotelu%20Ulamo&zoom=4&size=512x512&maptype=satellite&sensor=false
function placeCollectedRow (item) {
    var row = Ti.UI.createTableViewRow(),
        lat = item.lat || false,
        lng = item.lng || false,
        map = false,
        placeName = item.place,
        imgUrl;

    if(item.lat && item.lng) {
        imgUrl = googleMapUrl({lat: lat, lng: lng});
    }
    else {
        placeName.replace('(place collected)', '');
        imgUrl = googleMapUrl({named: placeName});
    }
    
    Ti.API.debug(imgUrl);
    
    map = Ti.UI.createImageView({
        image: imgUrl,
        height: 100,
        width:Ti.Platform.displayCaps.platformWidth-20
    });
    
    row.add(map);
    
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
        
        tableData.push(placeCollectedRow(item));
        table.setData(tableData);
	};
	
	return self;
};

module.exports = DetailView;
