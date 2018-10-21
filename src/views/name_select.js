const PubSub = require('../helpers/pub_sub.js');

const NameSelect = function(selectName){
  this.selectName = selectName;
};

NameSelect.prototype.bindEvents = function(){
  PubSub.subscribe('Launches:names-ready', (evt) =>{
    this.populateSelect(evt.detail)
  })

  this.selectName.addEventListener('change', (evt) =>{
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  })
}

NameSelect.prototype.populateSelect = function(names){
  names.forEach((name, index) =>{
    const option =
    this.createNameOption(name, index);
    this.selectName.appendChild(option);
  })
};

NameSelect.prototype.createNameOption = function(name, index){
  const option = document.createElement('option');
  option.textContent = name;
  option.value = index;
  return option;
};

module.exports = NameSelect;
