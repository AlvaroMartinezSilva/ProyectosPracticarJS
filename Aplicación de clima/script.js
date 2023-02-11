
function obtenerUbicacion() {
    return new Promise(function(resolve, reject) {
      if (navigator.geolocation) {
        var ubicacion = [];
        navigator.geolocation.getCurrentPosition(function(position) {
          ubicacion[0] = position.coords.latitude;
          ubicacion[1] = position.coords.longitude;
          obtenerPais(ubicacion[0], ubicacion[1])
            .then(function(pais) {
              resolve(pais);
            })
            .catch(function(error) {
              reject(error);
            });
        });
      } else {
        reject("Tu navegador no soporta la Geolocalización");
      }
    });
  }
  
  function obtenerPais(latitud, longitud) {
    var url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitud + "&lon=" + longitud;
    
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return data.address.country;
      })
      .catch(function(error) {
        console.error(error);
      });
  }