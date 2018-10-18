const PubSub = require('../helpers/pub_sub');

const LaunchListView = function(container){
  this.container = container;
};

LaunchListView.prototype.bindEvents = function(){
  PubSub.subscribe('Launces:launches-ready', (evt) =>{
    this.clearList();
    this.renderLaunchViews(evt.detail);
  });
}

LaunchListView.prototype.clearList = function(){
  this.container.innerHTML = '';
};

LaunchListView.prototype.renderMunroDetailViews = function(launches){
  launches.forEach((launch) =>{
    const launchItem = this.createLaunchListItem(launch);
    this.container.appendChild(launchItem)
  });
};

LaunchListView.prototype.createLaunchListItem = function(launch){
  const launchDetailView = new LaunchView();
  const launchDetail = launchDetailView.createLaunchDetail(launch);
  return launchDetail;
}

module.exports = SelectView;
