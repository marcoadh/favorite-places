(function () {
  this.App || (this.App = {})

  App.Stimulus.register("panel", class extends Stimulus.Controller {
    static targets = ["map"]

    connect() {
      App.panel = this
      this.initMap()
      this.load()
      this.getLocation()
      this.initUserTrackingCron()
    }

    disconnect() {
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

      const customIcon = new L.DivIcon({
        className: "",
        html: `<img alt="" src="${this.element.getAttribute("data-marker-location-icon-url")}" />`
      })

      const latlngs = [this.userLastLocation.lat, this.userLastLocation.lng]
      this.layerMarkerLastPosition ||= L.marker(latlngs, { icon: customIcon }).addTo(this.map)
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
  })

}).call(this);
