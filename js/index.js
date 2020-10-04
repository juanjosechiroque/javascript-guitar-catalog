'use strict';

(function () {
  
  var config = {
    sort: null,
    culture: {
      currency: "USD",
      code: "en-US",      
      exchangeRate: 1
    }
  };
  
  var catalog = new GuitarCatalog({
    url: "catalog.json",
    el: "#catalog",
    config
  });
  
  catalog.render();
  
  
  document.querySelector("#filter").addEventListener("change", filterEvent);
  
  document.querySelector("#exchangeRate").addEventListener("change", exchangeRateEvent);
  
  function filterEvent() {
    
    let value = this.value;
    
    switch (value) {
      case "price-asc":
        config.sort = (a,b) => a.price - b.price;
        break;
      case "price-desc":
        config.sort = (a,b) => b.price - a.price;
        break;
    }
    
    catalog.render();
    
  }
  
  function exchangeRateEvent() {
    
    let value = this.value;
    
    switch (value) {
      case "en-US":
        config.culture.code = value;
        config.culture.currency = "USD",
        config.culture.exchangeRate = 1;
        break;
      case "es-PE":
        config.culture.code = value;
        config.culture.currency = "PEN",
        config.culture.exchangeRate = 3.5;
        break;
    }
    
    catalog.render();
  }
 
})();