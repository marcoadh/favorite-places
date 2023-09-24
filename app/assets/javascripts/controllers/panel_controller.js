(function () {
  this.App || (this.App = {})

  App.Stimulus.register("panel", class extends Stimulus.Controller {
    static targets = ["map"]

    connect() {
      console.log("<------------- Conectado ------------->")
      App.panel = this
      this.initMap()
      this.load()
      this.getLocation()
      this.initUserTrackingCron()
    }

    disconnect() {
      console.log("<============== Desconectado ==============>");
      App.panel = null
      this.destroyData()
    }

    initMap() {
      Object.assign(this, Helper.initMap(this.mapTarget))
    }

    load() {
      if (!Utils.isUserLocationEnabled()) this.clearLastLocation()
      this.userLastLocation ||= this.getLastLocation()
      this.destroyData()
      this.renderMarkerLastPosition()
      this.setLastLocation()
    }

    destroyData() {
      this.layerMarkerLastPosition ||= null
      if (this.layerMarkerLastPosition) {
        this.map.removeLayer(this.layerMarkerLastPosition)
        delete this.layerMarkerLastPosition
      }
    }

    renderMarkerLastPosition() {
      if (!this.userLastLocation) return

      const latlngs = [this.userLastLocation.lat, this.userLastLocation.lng]
      this.layerMarkerLastPosition ||= L.marker(latlngs).addTo(this.map)
      this.layerMarkerLastPosition.setLatLng(latlngs)
    }

    getLocation() {
      Utils.getLocation((position) => {
        Utils.setUserLocationEnabled(true)

        this.userLastLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          plot_at: position.timestamp
        }

        this.load()
      })
    }

    focusLastPositionMarker() {
      if (this.layerMarkerLastPosition) {
        let coord = this.layerMarkerLastPosition.getLatLng()
        this.map.fitBounds([coord, coord])
      }
    }

    initUserTrackingCron() {
      setInterval(async () => {
        await Utils.validGeolocationPermissions()
        if (!Utils.isUserLocationEnabled()) return

        this.getLocation()
      }, 30000)
    }

    getLastLocation() {
      return JSON.parse(localStorage.getItem("last-location"))
    }

    setLastLocation() {
      if (!this.userLastLocation) return
      localStorage.setItem("last-location", JSON.stringify(this.userLastLocation))
    }

    clearLastLocation() {
      localStorage.removeItem("last-location")
    }

    get arrayPositions() {
      return [
        { lat: -12.12202, lng: -77.03284, timestamp: new Date().getTime() },
        { lat: -12.12219, lng: -77.03266, timestamp: new Date().getTime() },
        { lat: -12.12241, lng: -77.03238, timestamp: new Date().getTime() },
        { lat: -12.12262, lng: -77.03214, timestamp: new Date().getTime() },
        { lat: -12.12295, lng: -77.03194, timestamp: new Date().getTime() },
        { lat: -12.12338, lng: -77.03214, timestamp: new Date().getTime() },
        { lat: -12.12359, lng: -77.03226, timestamp: new Date().getTime() },
        { lat: -12.12425, lng: -77.03276, timestamp: new Date().getTime() },
        { lat: -12.12469, lng: -77.03281, timestamp: new Date().getTime() },
        { lat: -12.12508, lng: -77.03292, timestamp: new Date().getTime() },
        { lat: -12.12509, lng: -77.03292, timestamp: new Date().getTime() },
        { lat: -12.12509, lng: -77.03292, timestamp: new Date().getTime() },
        { lat: -12.12529, lng: -77.03303, timestamp: new Date().getTime() },
        { lat: -12.12588, lng: -77.03343, timestamp: new Date().getTime() },
        { lat: -12.12655, lng: -77.03384, timestamp: new Date().getTime() },
        { lat: -12.12721, lng: -77.03423, timestamp: new Date().getTime() },
        { lat: -12.12779, lng: -77.03452, timestamp: new Date().getTime() },
        { lat: -12.12782, lng: -77.03451, timestamp: new Date().getTime() },
      ]
    }
  })

}).call(this);
