const Launches = require('./models/launches.js');
const ListView = require('./views/list_view.js')
const LaunchView = require('./views/launch_view')

document.addEventListener('DOMContentLoaded', ()=> {
  // console.log('helloWorld');

  const launchesElement = document.querySelector('select#launch-dropdown')
  const launchDropdown = new ListView(launchesElement)
  launchDropdown.getData();
  // console.log('launchesElement:', launchesElement);

  const launchesListContainer = document.querySelector('#launch');
  const launchView = new LaunchView(launchesListContainer)
  launchView.bindEvents();

  const launches = new Launches();
  launches.getData();

})
