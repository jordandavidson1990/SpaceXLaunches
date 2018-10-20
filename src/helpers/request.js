const Request = function(url){
  this.url = url;
}

Request.prototype.get = function(onComplete) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', this.url);
  xhr.addEventListener('load', function(){
    if(this.status !== 200){
      return;
    }
    const data = JSON.parse(this.responseText);
    onComplete(data);
  });
  xhr.send();
};
//     return fetch(this.url)
//     .then(response => response.json())
//     .catch(err => console.log('error:', err));
// };

module.exports = Request;
