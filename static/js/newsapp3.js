var RetrieveNews = function (){
  var mydate = function (date){
          var date = new Date(date);
          year = date.getFullYear();
          mm = date.getMonth()+1;
          dd = date.getDate();
          if(dd<10){
              dd='0'+dd
          }
          if(mm<10){
              mm='0'+mm
          }
          result = dd+'/'+mm+'/'+year;
          return result;
  };

  var self = this;
  self.displayOtherNews = ko.observable(false);

  var productModel = function(item) {
    self.data = {};
    self.data.title = ko.observable(item.title);
    self.data.date = ko.observable(item.date);
    self.data.link = ko.observable(item.link);
    self.data.enclosure = ko.observable(item.enclosure);
    //this.displayMode = ko.observable(itemMode);
  };

  var products = ko.observableArray();

  $.ajax({
    url: 'http://localhost:8081/static/news.json',
    dataType: 'json',

    success: function(data) {
      $(data).find("item").each(function () { // or "item" or whatever suits your feed
              var el = $(this);
              item = {
                "title": el.find("title").text(),
                "date": el.find("pubDate").text(),
                "link": el.find("link").text(),
                "enclosure": el.find("enclosure").attr('url')};
              products.push(new productModel(item));
              });
        },
    error: function(){
            alert("Abbiamo riscontrato un problema nell\'aggiornamento delle notizie. Riprovate fra qualche minuto.");
        }
    });

  self.formattedDate = ko.pureComputed(function(){
            return mydate(self.data.date());
    }, self);




// var yqlError = function(){
//   alert("Abbiamo riscontrato un problema nell\'aggiornamento delle notizie. Riprovate fra qualche minuto.");
// };


 var init = function(){
      ko.applyBindings(RetrieveNews, document.getElementById("notizie"));
  };

  $(init);

  return {
    products: products,
    formattedDate: formattedDate,
    displayOtherNews: displayOtherNews
  };

}();