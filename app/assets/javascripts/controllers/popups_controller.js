(function () {
  this.App || (this.App = {})

  App.Stimulus.register("popups", class extends Stimulus.Controller {
    static targets = ["panelPopup"]

    connect() {
      App.popups = this

      this.$panelPopup = $(this.panelPopupTarget)
    }

    disconnect() {
      App.popups = null
    }

    showModule(e) {
      this.$btnSelected = $(e.currentTarget)
      const $btnCurrent = $(`${this.$btnSelected.data("closestTarget")} .btn.btn-primary`)

      // App[this.$btnSelected.data("controller-target")].load()

      $btnCurrent.removeClass("btn-primary").addClass("btn-secondary")
      this.$btnSelected.removeClass("btn-secondary").addClass("btn-primary")
      this.$panelPopup.addClass("show")
    }

    hidePanelOptions(e) {
      e.currentTarget.classList.add("d-none")
    }

    showPanelOptions(e) {
      let idHTML = e.currentTarget.getAttribute("data-link-target")
      $(idHTML).removeClass("d-none")
    }

    closePopup(e) {
      this.$panelPopup.removeClass("show")
      this.$btnSelected.removeClass("btn-primary").addClass("btn-secondary")
    }

    loadingPopupMain(e) {
      this.$panelPopup.html(Helper.getLoadingHTML())
    }

    showContentPopupMain(e) {
      const [data, status, xhr] = e.detail
      this.$panelPopup.html(xhr.response)
    }
  })

}).call(this);
