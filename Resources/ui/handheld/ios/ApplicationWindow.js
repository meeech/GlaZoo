function ApplicationWindow() {
    //declare module dependencies
    var MasterView = require('ui/common/MasterView'),
        DisciplineView = require('ui/common/DisciplineView'),
        DetailView = require('ui/common/DetailView');
        
    //create object instance
    var self = Ti.UI.createWindow({
        backgroundColor:'#ffffff'
    });
        
    //construct UI
    var masterView = new MasterView(),
        disciplineView = new DisciplineView(),
        detailView = new DetailView();
        
    //create master view container
    var masterContainerWindow = Ti.UI.createWindow({
        barColor: Theme.barColor,
        title:'Disciplines'
    });
    masterContainerWindow.add(masterView);
    
    //create detail view container
    var disciplineContainerWindow = Ti.UI.createWindow({
        barColor: Theme.barColor,
        title:'DisciplineView'
    });
    disciplineContainerWindow.add(disciplineView);

    //create detail view container
    var detailContainerWindow = Ti.UI.createWindow({
        barColor: Theme.barColor,
        title:'Product Details'
    });
    detailContainerWindow.add(detailView);
    
    //create iOS specific NavGroup UI
    var navGroup = Ti.UI.iPhone.createNavigationGroup({
        window:masterContainerWindow
    });
    self.add(navGroup);

    //add behavior for master view
    masterView.addEventListener('itemSelected', function(e) {
        Ti.API.debug('masterview itemselected');

        disciplineContainerWindow.title = e.name;
        navGroup.open(disciplineContainerWindow);
        disciplineView.paint(e.name);
    });
    
    disciplineView.addEventListener('itemSelected', function(e) {
        Ti.API.debug('disciplineView itemselected');

        detailContainerWindow.title = e.name;
        detailView.fireEvent('itemSelected', {
            discipline: e.discipline,
            key: e.name
        });
        navGroup.open(detailContainerWindow);
    });
    
    return self;
};

module.exports = ApplicationWindow;
