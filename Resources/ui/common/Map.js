exports.googleMapUrl = function(data) {
    var lat = data.lat || false,
        lng = data.lng || false,
        named = data.named || false;
    
    var width = Ti.Platform.displayCaps.platformWidth - 20,
        zoom = 1;
    
    var url;
    if(named) {
        url = 'http://maps.googleapis.com/maps/api/staticmap?markers='+named+'&center='+named+'&zoom='+zoom+'&scale=2&size='+width+'x100&maptype=terrain&sensor=false';
    }
    else {
        url = 'http://maps.googleapis.com/maps/api/staticmap?markers='+lat+','+lng+'&center='+lat+','+lng+'&zoom='+1+'&scale=1&size='+width+'x100&maptype=terrain&sensor=false';
    }

    return url;
};
