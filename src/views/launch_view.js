const PubSub = require('../helpers/pub_sub.js');

const LaunchView = function(container){
  this.container = container;
}

LaunchView.prototype.bindEvents = function(){
  PubSub.subscribe('Launches:selected-launch-ready', (evt)=>{
    const launch = evt.detail;
    // this.render(launch)
  });

}

module.exports = LaunchView;
