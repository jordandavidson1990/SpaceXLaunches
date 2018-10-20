const PubSub = require('../helpers/pub_sub');
const LaunchView = require('./launch_view')

const LaunchListView = function(container){
  this.container = container;
}

LaunchListView.prototype.bindEvents = function(){
  PubSub.subscribe('Launches:launches-ready', (evt) => {
    this.clearList();
    this.renderLaunchDetailViews(evt.detail);
  });
};

LaunchListView.prototype.clearList = function(){
  this.container.innerHTML = '';
};

LaunchListView.prototype.renderLaunchDetailViews = function(launches) {
  launches.forEach((launch) => {
    const launchItem = this.createLaunchListItem(launch);
    this.container.appendChild(launchItem);
  });
};

LaunchListView.prototype.createLaunchListItem = function(launch){
  const launchView = new LaunchView();
  const launchDetail = launchView.createLaunchDetail(launch);
  return launchDetail;
};

module.exports = LaunchListView;
