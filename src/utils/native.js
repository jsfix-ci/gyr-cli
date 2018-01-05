var native = {
  ready (app) {
    // alert(window.plus)
    // alert(navigator.userAgent)
    if (window.plus) {
      // plus.navigator.setStatusBarBackground('#000000')
      app && app(window.plus, 1)
    } else {
      document.addEventListener('plusready', function () {
        app && app(window.plus, 0)
      })
    }
    // other && other()
  }
}
export default native
