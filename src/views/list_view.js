const PubSub = require('../helpers/pub_sub');
const Request = require('../helpers/request');

const ListView = function(container){
  this.container = container;
}

ListView.prototype.getData = function(){
  PubSub.subscribe('Launches:launches-loaded', (event) =>{
    const allLaunches = event.detail
    this.populate(allLaunches);
  });
  this.container.addEventListener('change', (evt)=>{
    const selectedIndex = evt.target.value;
    console.log((event.target.value));
    PubSub.publish('SelectView:change', selectedIndex);
  });
}

ListView.prototype.populate = function(launchesData){
  console.log('launchesData:', launchesData);
  launchesData.forEach((launches, index) =>{
    const option = document.createElement('option');
    // console.log('launches', launches);
    option.textContent = launches.mission_name;
    option.value = index;
    this.container.appendChild(option);
  })
}

ListView.prototype.bindEvents = function(){
  PubSub.subscribe('Launches:launches-data-ready', (evt) =>{
    this.launches = evt.detail;
    this.render();
    this.renderLaunch();
  });
};

ListView.prototype.render = function(){
  this.launches.forEach((launch)=>{
    const launchView = new LaunchView(this.container, launch);
    launchView.render()
  })
};

ListView.prototype.renderLaunch = function(){
  PubSub.subscribe('Launches:launch-selected', (event)=>{
    console.log('event.det:', event.detail);
    this.container.innerHTML = "";
    const launch = event.detail;

  })
}


module.exports = ListView;
