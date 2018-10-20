const Launches = require('./models/launches.js');
const YearFormView = require('./views/year_form.js')
const LaunchListView = require('./views/launch_list_view.js')

document.addEventListener('DOMContentLoaded', ()=> {

  const selectElement = document.querySelector('select#year-dropdown')
  const yearFormView = new YearFormView(selectElement);
  yearFormView.bindEvents();

  const listContainer = document.querySelector('#launch-list');
  const launchListView = new LaunchListView(listContainer);
  launchListView.bindEvents();

  const launches = new Launches;
  launches.bindEvents();
  launches.getData();
})
