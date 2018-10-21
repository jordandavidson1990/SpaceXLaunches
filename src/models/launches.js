const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Launches = function(){
  this.launchData = [];
  this.years = [];
};

Launches.prototype.bindEvents = function(){
  PubSub.subscribe('SelectView:change', (evt) =>{
    const yearIndex = evt.detail;
    this.publishLaunchesByYear(yearIndex)
  })
};

Launches.prototype.getData = function(){
  const request = new Request('https://api.spacexdata.com/v3/launches')
  request.get((data) => {
    PubSub.publish('Launches:launches-ready', data);
    this.publishYears(data);
  });
}

Launches.prototype.publishYears = function(data){
  this.launchData = data;
  this.years = this.uniqueYearList();
  PubSub.publish('Launches:years-ready', this.years);
  console.log(data);
}

Launches.prototype.yearList = function(){
  const fullList = this.launchData.map(launch => launch.launch_year);
  return fullList;
}

Launches.prototype.uniqueYearList = function(){
  return this.yearList().filter((launch, index,
     array) =>{
    return array.indexOf(launch) === index;
    console.log('launch:', launch, 'index:', index, 'array:', array);
  });
}

Launches.prototype.launchesByYear = function(yearIndex){
  const selectedYear = this.years[yearIndex];
  return this.launchData.filter((launch) => {
    return launch.launch_year === selectedYear;
  });
};

Launches.prototype.publishLaunchesByYear = function(yearIndex){
  const foundLaunches = this.launchesByYear(yearIndex);
  PubSub.publish('Launches:launches-ready', foundLaunches)
}

module.exports = Launches;
