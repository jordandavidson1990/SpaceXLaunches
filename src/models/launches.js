const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Launches = function(){
  this.launchData = [];
  this.years = [];
  this.names = []
};

Launches.prototype.bindEvents = function(){
  PubSub.subscribe('SelectView:change', (evt) =>{
    const yearIndex = evt.detail;
    this.publishLaunchesByYear(yearIndex)
  })
  PubSub.subscribe('SelectView:nameChange', (evt) => {
    const nameIndex = evt.detail
    this.publishLaunchesByName(nameIndex)
  })
};

Launches.prototype.getData = function(){
  const request = new Request('https://api.spacexdata.com/v3/launches')
  request.get((data) => {
    PubSub.publish('Launches:launches-ready', data);
    this.publishYears(data);
    this.publishName(data);
  });
}

Launches.prototype.publishName = function(data) {
  this.launchData = data;
  this.names = this.nameList();
  PubSub.publish('Launches:names-ready', this.names);
}

Launches.prototype.nameList = function() {
    const nameList = this.launchData.map(launch => launch.mission_name);
    return nameList;
};

Launches.prototype.publishYears = function(data){
  this.launchData = data;
  this.years = this.uniqueYearList();
  PubSub.publish('Launches:years-ready', this.years);
}

Launches.prototype.yearList = function(){
  const fullList = this.launchData.map(launch => launch.launch_year);
  return fullList;
}

Launches.prototype.uniqueYearList = function(){
  return this.yearList().filter((launch, index,
     array) =>{
    return array.indexOf(launch) === index;
  });
}

Launches.prototype.launchesByYear = function(yearIndex){
  const selectedYear = this.years[yearIndex];
  return this.launchData.filter((launch) => {
    return launch.launch_year === selectedYear;
  });
};

Launches.prototype.launchesByName = function(name){
  const selectedName = this.names[name];
  return this.launchData.filter((launch) => {
    return launch.mission_name == selectedName;
  })
}

Launches.prototype.publishLaunchesByYear = function(yearIndex){
  const foundLaunches = this.launchesByYear(yearIndex);
  PubSub.publish('Launches:launches-ready', foundLaunches)
}

Launches.prototype.publishLaunchesByName = function(name){
  const foundLaunches = this.launchesByName(name);
  PubSub.publish('Launches:launches-ready', foundLaunches)
}

module.exports = Launches;
