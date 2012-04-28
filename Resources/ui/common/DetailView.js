var data = require('data/data').disciplines;

function imageRow(search) {
    var row = Ti.UI.createTableViewRow();

    function unavail() {
        var label = Ti.UI.createLabel({
            text:'Image Unavailable',
            font:{fontSize:14},
            color:'#aaa',
            left:10,
            right: 10,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            height:44
        });
        row.add(label);
    };
    
    var getData = Titanium.Network.createHTTPClient();

    getData.onload = function() {
        var status = this.status;
        Ti.API.debug(status);    
        if((399 < status) && (600 > status)) {        
            unavail();
        }
        else {
            var response = JSON.parse(this.responseText);
            var result = response.responseData.results[0];
            Ti.API.debug(response.responseData.results);
            if(!result) {
                unavail();
                return;
            }
            var ratio = result.width/Ti.Platform.displayCaps.platformWidth;
            var itemImage = Ti.UI.createImageView({
                defaultImage: 'images/hourglass.png',
                image: result.url,
                width:Ti.Platform.displayCaps.platformWidth,
                height: result.height / ratio,
                borderWidth: 1
            });
            row.add(itemImage);
        }
    };

    getData.open("GET","https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+search+"&as_sitesearch=commons.wikimedia.org&rsz=1&userip="+Ti.Platform.address);
    getData.send();
    
    return row;
}

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

// http://maps.googleapis.com/maps/api/staticmap?center=Africa,%20Kotelu%20Ulamo&zoom=4&size=512x512&maptype=satellite&sensor=false
function placeCollectedRow (item) {
    var row = Ti.UI.createTableViewRow({
            layout: 'vertical'
        }),
        lat = item.lat || false,
        lng = item.lng || false,
        map = false,
        placeName = item.place,
        imgUrl;
        
    var googleMapUrl = require('ui/common/Map').googleMapUrl;

    if(item.lat && item.lng) {
        imgUrl = googleMapUrl({lat: lat, lng: lng});
    }
    else {
        placeName = placeName.replace('(place collected)', '');
        imgUrl = googleMapUrl({named: placeName});
    }
    
    Ti.API.debug(imgUrl);
    
    map = Ti.UI.createImageView({
        image: imgUrl,
        height: 100,
        width:Ti.Platform.displayCaps.platformWidth-20
    });
    
    row.add(map);
    
    var label = Ti.UI.createLabel({
        text:placeName,
        font:{fontSize:11},
        color:'#444',
        top:10,
        left: 10,
        right: 10,
        height:Ti.UI.SIZE
    });
    
    row.add(label);
    
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
        
        tableData.push(imageRow(title));
        
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
