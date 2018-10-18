const Launches = require('./models/launches.js');
const ListView = require('./views/list_view.js')

document.addEventListener('DOMContentLoaded', ()=> {
  // console.log('helloWorld');

  const launchesElement = document.querySelector('select#launch-dropdown')
  const launchDropdown = new ListView(launchesElement)
  launchDropdown.getData();
  // console.log('launchesElement:', launchesElement);

  const launches = new Launches();
  launches.getData();

})
