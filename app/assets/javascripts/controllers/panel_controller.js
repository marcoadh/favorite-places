(function() {
  this.App || (this.App = {})

  App.Stimulus.register("panel", class extends Stimulus.Controller {
    static targets = ["map"]

    connect() {
      App.panel = this
      this.initMap()
    }

    disconnect() {
      App.panel = null
    }

    initMap() {
      Object.assign(this, Helper.initMap(this.mapTarget))
    }

    destroyMap() {
      if (this.map) {
        this.map.off()
        this.map.remove()
        this.map = null
        App.panel.map = null
      }
    }
  })

}).call(this);
