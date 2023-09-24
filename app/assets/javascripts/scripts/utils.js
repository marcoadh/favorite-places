(function () {
  this.Utils || (this.Utils = {})

  Utils = {
    isUserLocationEnabled: function () {
      return localStorage.getItem("user-location-enabled") === "true"
    },

    getUserLocationEnabled: function () {
      return localStorage.getItem(`user-location-enabled`)
    },

    setUserLocationEnabled: function (value) {
      localStorage.setItem(`user-location-enabled`, value)
    },

    getLocation: function (success) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, (error) => {
          Utils.setUserLocationEnabled(false)
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log('El usuario denegó la solicitud de geolocalización.')
              break
            case error.POSITION_UNAVAILABLE:
              console.log('La información sobre la ubicación no está disponible.')
              break
            case error.TIMEOUT:
              console.log('La solicitud para obtener la ubicación del usuario ha caducado.')
              break
            default:
              console.log('Se ha producido un error desconocido.')
              break
          }
        })
      } else {
        Utils.setUserLocationEnabled(false)
        console.log('La geolocalización no es compatible con este navegador.')
      }
    },

    validGeolocationPermissions: async function () {
      if (!navigator.permissions) return false

      return await navigator.permissions.query({ name: 'geolocation' }).then(function (PermissionStatus) {
        (PermissionStatus.state === 'granted')
          ? Utils.setUserLocationEnabled(true)
          : Utils.setUserLocationEnabled(false)

        return PermissionStatus.state
      })
    }
  }
}).call(this)