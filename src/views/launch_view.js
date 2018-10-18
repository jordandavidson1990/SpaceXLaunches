const PubSub = require('../helpers/pub_sub.js');

const LaunchView = function(container){
  this.container = container;
}

LaunchView.prototype.bindEvents = function(){
  PubSub.subscribe('Launches:selected-launch-ready', (evt)=>{
    const launch = evt.detail;
    this.render(launch)
  });
}

LaunchView.prototype.render = function(launch){
  const infoHeading = document.createElement('h2');
  infoHeading.textContent = launch.mission_name;
  this.container.innerHTML = '';
  this.container.appendChild(infoHeading);

  const infoDescribtion = document.createElement('p');
  console.log(launch);
  infoDescribtion.textContent = launch.details;
  this.container.appendChild(infoDescribtion)
}

module.exports = LaunchView;
