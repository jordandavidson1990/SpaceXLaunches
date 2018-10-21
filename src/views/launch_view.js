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

  const launchDate = this.createDetailListItem('Launch Date', launch.launch_date_local);
  detailsList.appendChild(launchDate);

  const launchSite = this.createDetailListItem('Launch Site', launch.launch_site.site_name_long);
  detailsList.appendChild(launchSite);

  const rocketType = this.createDetailListItem('Rocket Type', launch.rocket.rocket_type);
  detailsList.appendChild(rocketType);

console.log(launch.rocket.second_stage.payloads.orbit);
  // const customers = this.createDetailListItem('Customers', launch.rocket.second_stage.payloads.customers[0]);
  // detailsList.appendChild(customers);

  launchDetail.appendChild(detailsList);


// IMAGE
  const img = document.createElement('img');
  // console.log(launch.links.mission_patch);
  img.src = launch.links.mission_patch;
  img.alt = `image of ${launch.mission_name}`;
  img.id = 'patchImg';
  launchDetail.appendChild(img);

  // const video = document.createElement('video');
  // video.src = launch.links.video_links;
  // video.alt = `image of ${launch.mission_name}`;
  // video.id = 'patchVideo';
  // launchDetail.appendChild(video);


  return launchDetail;
};

LaunchView.prototype.createDetailListItem = function(label, property){
  const element = document.createElement('li');
  element.textContent = `${label}: ${property}`;
  return element;
}
LaunchView.prototype.getImage = function() {

}

// LaunchView.prototype.getImage = function(launches){
//   for launch in launches
// }

module.exports = LaunchView;
