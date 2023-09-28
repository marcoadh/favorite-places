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

    initGeomanControls(e, geozoneExists = null) {
      // this.currentGeozone = geozoneExists || this.getCurrentGeozone(e)

      // if (!geozoneExists) {
      //   // Esta logica se ejecuta cuando se inicia el formulario
      //   App.tracking.showTrackingModulesCheckboxes()
      //   this.initColorPicker()
      //   this.disabledGeomanIgnore(this.currentGeozone)
      //   this.connectGeozoneEvents(this.currentGeozone)
      // }

      // App.tracking.map.pm.removeControls()

      // App.tracking.map.pm.addControls({
      //   position: "topright",
      //   drawCircle: this.isCircleShape(this.currentGeozone),
      //   drawMarker: false,
      //   drawCircleMarker: false,
      //   drawPolyline: this.isRouteShape(this.currentGeozone),
      //   drawPolygon: this.isPolygonShape(this.currentGeozone),
      //   drawRectangle: false,
      //   drawText: false,
      //   dragMode: true,
      //   cutPolygon: false,
      //   rotateMode: false
      // })
    }

    cancelPoiForm() {

    }
  })

}).call(this);
