var data = require('data/data').disciplines;

//Build the player outside function so it executes on load,
//this triggers error early, so no delay when we go to play.
var player = Ti.Media.createSound({url:"/sounds/sheep.wav", volume: 1.0});
function playSound() {
    player.play();
}

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
                defaultImage: 'images/clear.png',
                image: result.url,
                width:Ti.Platform.displayCaps.platformWidth,
                height: result.height / ratio,
                borderWidth: 1
            });
            row.add(itemImage);
            
            itemImage.addEventListener('click', playSound);
            
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

function placeCollectedRow (item) {
    var row = Ti.UI.createTableViewRow({
            layout: 'vertical'
        }),
        lat = item.lat || false,
        lng = item.lng || false,
        map = false,
        placeName = item.place.replace('(place collected)', ''),
        imgUrl,
        mapParam;
        
    var googleStaticMapUrl = require('ui/common/Map').googleStaticMapUrl,
        googleMapUrl = require('ui/common/Map').googleMapUrl;

    if('unverified' != placeName) {
        mapParam = {named: placeName};
    }
    else {
        mapParam = {lat: lat, lng: lng};
    }

    imgUrl = googleStaticMapUrl(mapParam);    
    Ti.API.debug(imgUrl);
    
    map = Ti.UI.createImageView({
        image: imgUrl,
        defaultImage: 'images/placeholdermap.png',
        height: 100,
        width:Ti.Platform.displayCaps.platformWidth
    });
    
    map.addEventListener('click', function() {
        //Prefer placeName - lon/lat aint great
        Ti.Platform.openURL(googleMapUrl(mapParam));
    });

    row.add(map);
    
    var label = Ti.UI.createLabel({
        text:placeName,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font:{fontSize:11},
        color:'#444',
        top:10,
        bottom: 10,
        left: 10,
        right: 10,
        height:Ti.UI.SIZE
    });
    
    row.add(label);
    
    return row;

}

function wikipediaRow (text) {
    var label = Ti.UI.createLabel({
        text:'Learn more on Wikipedia...',
        font:{fontSize:14},
        color:'#0080FF',
        left:10,
        right: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height:44,
        touchEnabled: false
    });

    var row = Ti.UI.createTableViewRow({
        search: text,
        selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.GRAY
    });
    
    row.add(label);
    
    row.addEventListener('click', function(e) {
        Ti.Platform.openURL('http://en.wikipedia.org/wiki/Special:Search?search='+e.rowData.search+'&go=Go');
    });
    
    return row;
}

function DetailView() {
	var self = Ti.UI.createView();

    var table = Ti.UI.createTableView({
	    footerView: Ti.UI.createView({height: 0}), 
	    selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		data:[]
	});
	self.add(table);
	
	self.addEventListener('itemSelected', function(e) {
	    Ti.API.debug('detailView itemSelected');

        //Clear out table...
        table.setData([]);

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
        tableData.push(wikipediaRow(title));
        table.setData(tableData);
	};
	
	return self;
};

module.exports = DetailView;
