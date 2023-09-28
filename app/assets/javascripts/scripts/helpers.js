(function() {
  this.Helper || (this.Helper = {})

  Helper.initMap = function(element, options = {}) {
    let attribution = "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
    let gmapsr = L.tileLayer("https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga", { attribution: attribution, maxZoom: 20 })
    let gmapss = L.tileLayer("https://mt0.google.com/vt/lyrs=s,h&hl=en&x={x}&y={y}&z={z}&s=Ga", { attribution: attribution, maxZoom: 20 })
    let streemapr = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", { attribution: attribution, maxZoom: 20 })
    let map, layers, geocoder

    layers = {
      "Google Calles": gmapsr,
      "Google Satelite": gmapss,
      "OpenStreet Calles": streemapr
    }

    map = new L.Map(element, {
      zoomControl: false,
      layers: [gmapsr]
    }).setView([-12.0266383, -76.9877791], 11)

    if (options.geocoder) {
      options.geocoder = Object.assign({ show: true }, options.geocoder === true ? {} : options.geocoder)
      geocoder = Helper.setupGeocoder({ position: "topright" }).addTo(map)
      geocoder._container.classList.add(options.geocoder.show ? "d-show" : "d-none")
    }

    L.control.layers(layers).addTo(map)

    L.control.zoom({
      position: options.zoomPosition || "topright"
    }).addTo(map)

    return { map, geocoder }
  }

  Helper.randomUID = function(length = 11) {
    return Math.random().toString(36).substring(2, length + 2)
  }

  Helper.getLoadingHTML = function(element) {
    return `
      <div class="d-flex align-items-center justify-content-center pt-4">
        <h4>Esperate pe perro</h4>
      </div>
    `
  }
}).call(this);
