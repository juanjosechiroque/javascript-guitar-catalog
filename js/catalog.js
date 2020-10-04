class GuitarCatalog {
  constructor(obj){
    this._data = [];
    this._url = obj.url 
    this._target = document.querySelector(obj.el);
    this._config = obj.config;
  }
  render() {    
    
    var self = this;    
    
    _getDataSource().then(items => {
      
      var template = [];    
      template.push('<div class="columns is-multiline">');        
      
      items.sort(self._config.sort || ((a,b) => true))
        .forEach(item => 
            template.push(_productTemplate(item))
        );
      
      template.push('</div>');
      
      self._target.innerHTML = template.join(""); 
      
    });
    
    function _getDataSource() {
      
      self._target.innerHTML = "Cargando..."; 
      
      if(self._data.length === 0) {           
        
        return fetch(self._url)
          .then(r => {
            if(r.ok) return r.json();
            throw "Ocurrió un error: " + r.status;
          })
          .then(r => {
            self._data = r;
            return r;
          })
          .catch(err => console.log(err));    
        
      } else {        
        return new Promise((resolve) => resolve(self._data));
      }
      
    }
    
    function _productTemplate(obj){      
      return `
              <div class="column is-one-quarter">
                  <div class="card">
                      <div class="card-image">
                          <figure class="image is-4by3">
                              <img src="${obj.image}" alt="${obj.name}">
                          </figure>
                      </div>
                      <div class="card-content">
                          <p class="title is-size-6 is-uppercase">${obj.name}</p>
                          <p>${obj.description}</p>
                      </div>
                      <footer class="card-footer">
                          <a class="card-footer-item shopping-cart-add">Add</a>
                          <div class="card-footer-item">
                            ${(obj.price * self._config.culture.exchangeRate).toLocaleString(
                              self._config.culture.code, 
                              { style: "currency", currency: self._config.culture.currency }
                            )} 
                          </div>
                      </footer>
                  </div>
              </div>
             `;
    }
    
  }
  
}