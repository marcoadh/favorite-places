(function () {
  this.App || (this.App = {})

  App.Stimulus.register("pois", class extends Stimulus.Controller {
    static targets = []

    connect() {
      App.Pois = this
    }

    disconnect() {
      App.Pois = null
    }

    showPoiForm(e) {
      this.currentPoi = this.getCurrentPoi()
      if (this.currentPoi.id) {
        this.connectPoiEvents(this.currentPoi)
      } else {
        this.connectMapEvents()
      }

      this.initColorPicker()
    }

    connectPoiEvents(poi) {
      if (!poi.layer) {
        return
      }

      poi.layer.on("dragend", this.onDragEnd, this)
      poi.layer.dragging.enable()
    }

    cancelPoiForm(e) {
      if (!this.currentPoi) {
        return
      }
      
      this.disconnectMapEvents()
      this.removePoiLayer(this.currentPoi)

      this.currentPoi = null
    }

    onDragEnd(e) {
      this.updatePoiData(this.currentPoi)
      this.updatePoiFormFields(this.currentPoi)
    }

    updatePoiData(poi) {
      poi.latitude = poi.layer.getLatLng().lat
      poi.longitude = poi.layer.getLatLng().lng
    }

    updatePoiFormFields(poi) {
      $("#poi_latitude").val(poi.latitude)
      $("#poi_longitude").val(poi.longitude)
    }

    connectMapEvents() {
      App.panel.map.on("click", this.onTouch, this)
    }

    onTouch(e) {
      this.disconnectMapEvents()
      this.onMouseMove(e)
    }

    disconnectMapEvents() {
      App.panel.map.off("click", this.onTouch, this)
    }

    onMouseMove(e) {
      let latlng = e.latlng

      if (!this.currentPoi.layer) {
        this.currentPoi.layer = this.createPoiMarker(this.currentPoi, e.latlng).addTo(App.panel.map)
        this.updatePoiData(this.currentPoi)
        this.updatePoiFormFields(this.currentPoi)
        this.connectPoiEvents(this.currentPoi)
      } else {
        this.currentPoi.layer.setLatLng(latlng)
      }
    }

    createPoiMarker(poi, latlng = {}) {
      let lat = latlng.lat || poi.latitude
      let lng = latlng.lng || poi.longitude

      return L.marker([lat, lng])
    }

    createPoiIcon(poi) {
      // return L.BeautifyIcon.icon({
      //   iconShape: "marker",
      //   icon: poi.icon,
      //   textColor: "white",
      //   borderColor: poi.color,
      //   backgroundColor: poi.color
      // })
    }

    getCurrentPoi(e) {
      let poi = $("#poi-form").data("poi")

      return poi
    }

    initColorPicker() {
      ColorPicker.init(".color-picker-input", {
        showAlpha: false,
        showButtons: false,
        allowEmpty: false,
        move: (color) => {
          this.currentPoi.color = color.toHexString()
          this.updatePoiMarkerIcon(this.currentPoi)
        }
      })
    }

    updatePoiMarkerIcon(poi) {
      console.log("Se cambia");
    }

    removePoiLayer(poi) {
      if (!poi.layer) {
        return
      }

      this.disconnectPoiEvents(poi)
      App.panel.map.removeLayer(poi.layer)
      poi.layer = null
    }

    disconnectPoiEvents(poi) {
      if (!poi.layer) {
        return
      }

      poi.layer.off("dragend", this.onDragEnd, this)
      poi.layer.dragging.disable()
    }
  })

}).call(this);
