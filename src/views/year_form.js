const PubSub = require('../helpers/pub_sub');
const _ = require('lodash');

const YearFormView = function(selectElement){
  this.selectElement = selectElement;
};

YearFormView.prototype.bindEvents = function(){
  PubSub.subscribe('Launches:years-ready', (evt) =>{
    this.populateSelect(evt.detail);
    // console.log(evt.detail,'evt.detail');
  })



  this.selectElement.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    // console.log(evt.target.value);
    debugger
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

YearFormView.prototype.populateSelect = function(years){
  years.forEach((year, index) => {
    const option =
    this.createYearOption(year, index);
    this.selectElement.appendChild(option);
    // console.log('year:', year, 'years:', years);
  })
};

YearFormView.prototype.createYearOption = function(year, index){
  const option = document.createElement('option');
  option.textContent = year;
  option.value = index;
  return option;
};

module.exports = YearFormView;
