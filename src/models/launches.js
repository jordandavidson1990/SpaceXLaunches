const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Launches = function(){
  this.launches = [];
};

Launches.prototype.getData = function(){
  const url = 'https://api.spacexdata.com/v3/launches';
  const request = new Request(url);
  request.get().then(data => {
    // console.log(data);
    this.launches = data
    PubSub.publish('Launches:launches-loaded', data);
    console.log('data:', data);
  })
  PubSub.subscribe('SelectView:change', (evt) =>{
    const selectedIndex = evt.detail;
    // console.log('evt detail:', evt.detail);
    this.publishDataDetail(selectedIndex);
  })
}

Launches.prototype.publishDataDetail = function(selectedIndex){
  const selectedLaunch = this.launches[selectedIndex];
  PubSub.publish('Launches:selected-launch-ready', selectedLaunch)
};



module.exports = Launches;
