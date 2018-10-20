// const PubSub = require('../helpers/pub_sub.js');
const LaunchView = function(){
}

LaunchView.prototype.createLaunchDetail = function(launch){
  const launchDetail = document.createElement('div');
  launchDetail.classList.add('launch-detail');

  const name = document.createElement('h2');
  name.textContent = launch.mission_name;
  launchDetail.appendChild(name)

  const description = document.createElement('p');
  description.textContent = launch.details;
  launchDetail.appendChild(description);

  const detailsList = document.createElement('ul');
  const flightNumber = this.createDetailListItem('Flight Number', launch.flight_number);
  detailsList.appendChild(flightNumber);

  launchDetail.appendChild(detailsList);
  return launchDetail;
};

LaunchView.prototype.createDetailListItem = function(label, property){
  const element = document.createElement('li');
  element.textContent = `${label}: ${property}`;
  return element;
}

module.exports = LaunchView;
