(function () {
  this.ColorPicker || (this.ColorPicker = {})

  ColorPicker.swatches = [
    ["#556ee6", "#34c38f", "#50a5f1", "#f1b44c"],
    ["#f46a6a", "#343a40", "#74788d", "#08d0c4"],
    ["#3388ff"]
  ]

  ColorPicker.defaultOptions = {
    locale: "es",
    palette: ColorPicker.swatches
  }

  ColorPicker.init = function(target, options) {
    let settings = Object.assign({}, ColorPicker.defaultOptions, options)
    $(target).spectrum(settings)
  }

}).call(this);
