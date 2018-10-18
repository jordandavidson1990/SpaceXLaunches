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

module.exports = ListView;
