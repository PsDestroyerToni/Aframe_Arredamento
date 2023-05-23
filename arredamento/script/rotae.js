var btn = false;
function clickButton() {
  if (btn == true) {
    btn = false;
    document.getElementById("btn_switch").style.backgroundImage = "url(../image/move.png)";
  }
  else if (btn == false) {
    btn = true;

    document.getElementById("btn_switch").style.backgroundImage = "url(../image/flip.png)";
  }
}

if (window.AFRAME == null) {
  console.error("aframe not found, please import it before this component.")
}

AFRAME.registerSystem("track-cursor", {
  init: function () {
    this.el.setAttribute("cursor", { rayOrigin: "mouse" });
  }
});

AFRAME.registerComponent("track-cursor", {
  init: function () {
    this.el.addEventListener("mousedown", e => {
      if (this.el.is("cursor-hovered")) {
        this.el.sceneEl.camera.el.setAttribute("look-controls", {
          enabled: false
        });
        this.el.addState("dragging");
      }
    })
    // this.el.addEventListener("click", e => {
    //   if (this.el.is("dragging")) {
    //     this.el.sceneEl.camera.el.setAttribute("look-controls", {
    //       enabled: true
    //     });
    //     this.el.removeState("dragging");
    //   }
    // })
  },
});

AFRAME.registerComponent("dragndrop", {
  dependencies: ["track-cursor"],
  init: function () {
    this.range = 0;
    this.dist = this.el.object3D.position;
    this.ifMouseDown = false;
    this.x_cord1 = 0;
    this.y_cord1 = 0;
    this.x_cord = 0;
    this.y_cord = 0;
    this.x_cord2 = 0;
    this.y_cord2 = 0;
    // if (e.touches[0] && e.touches[1]) {
    //   this.el.removeState("dragging");
    // }
    // else {
    //   this.el.addState("dragging");
    // }
    this.el.addEventListener("stateadded", e => {
      if (btn == false) {
        if (e.detail == "dragging") {
          this.dist = this.el.object3D.position
            .clone()
            .sub(this.el.sceneEl.camera.el.object3D.position)
            .length();
        }
      }
    })

    this.direction = new AFRAME.THREE.Vector3();
    this.target = new AFRAME.THREE.Vector3();
    document.addEventListener("wheel", e => {
      if (e.deltaY < 0) {
        this.range += 2;
      } else {
        this.range -= 2;
      }
    });
    document.addEventListener("touchstart", e => {
      if (btn == false) {

        if (e.touches && e.touches[0] && e.touches[1]) {
          this.ifMouseDown = true;
          this.x_cord1 = e.touches[0].clientX;
          this.y_cord1 = e.touches[0].clientY;
          this.x_cord2 = e.touches[1].clientX;
          this.y_cord2 = e.touches[1].clientY;
        } else if (e.originalEvent && e.originalEvent.changedTouches[0] && e.originalEvent.changedTouches[1]) {

          this.ifMouseDown = true;
          this.x_cord1 = e.originalEvent.changedTouches[0].clientX;
          this.y_cord1 = e.originalEvent.changedTouches[0].clientY;
          this.x_cord2 = e.originalEvent.changedTouches[1].clientX;
          this.y_cord2 = e.originalEvent.changedTouches[1].clientY;
        } else if (e.clientX && e.clientY) {

          this.ifMouseDown = true;
          this.x_cord1 = e.clientX;
          this.y_cord1 = e.clientY;
          this.x_cord2 = e.clientX;
          this.y_cord2 = e.clientY;
        }
      }

    })
    document.addEventListener("touchend", e => {
      this.ifMouseDown = false;
      // this.el.sceneEl.camera.el.setAttribute("look-controls", {
      //   enabled: true
      // });
    })
    document.addEventListener("touchcancel", e => {
      this.ifMouseDown = false;
    })
    document.addEventListener("touchmove", e => {
      if (this.ifMouseDown) {
        if (btn == false) {
          var x1 = 0;
          var y1 = 0;
          var x2 = 0;
          var y2 = 0;
          if (e.touches && e.touches[0] && e.touches[1]) {
            x1 = e.touches[0].clientX;
            y1 = e.touches[0].clientY;
            x2 = e.touches[1].clientX;
            y2 = e.touches[1].clientY;
            console.log("primo if")
          } else if (e.originalEvent && e.originalEvent.changedTouches[0] && e.originalEvent.changedTouches[1]) {
            x1 = e.originalEvent.changedTouches[0].clientX;
            y1 = e.originalEvent.changedTouches[0].clientY;
            x2 = e.originalEvent.changedTouches[1].clientX;
            y2 = e.originalEvent.changedTouches[1].clientY;
            console.log("secondo if")
          } else if (e.clientX && e.clientY) {
            x1 = e.clientX;
            y1 = e.clientY;
            x2 = e.clientX;
            y2 = e.clientY;
            console.log("terzo if")
          }
          var temp_x1 = x1 - this.x_cord1;
          var temp_y1 = y1 - this.y_cord1;
          var temp_x2 = x2 - this.x_cord2;
          var temp_y2 = y2 - this.y_cord2;
          var dist1 = Math.hypot(
            x1 - x2,
            y1 - y2);
          var dist2 = Math.hypot(
            this.x_cord1 - this.x_cord2,
            this.y_cord1 - this.y_cord2);
          if (Math.abs(temp_x1) > 0 && Math.abs(temp_y1) > 0 && Math.abs(temp_x2) > 0 && Math.abs(temp_y2) > 0) {
            if (dist1 > dist2) {
              this.range *= 0.9;

            }
            if (dist1 < dist2) {
              this.range *= 1.1;
            }
            this.x_cord1 = x1;
            this.y_cord1 = y1;
            this.x_cord2 = x2;
            this.y_cord2 = y2;
          }
        }
      }
    })
  },
  updateDirection: function () {
    if (btn == false) {
      this.direction.copy(this.el.sceneEl.getAttribute("raycaster").direction);
    }
  },
  updateTarget: function () {
    if (btn == false) {
      let camera = this.el.sceneEl.camera.el
      this.target.copy(
        camera.object3D.position
          .clone()
          .add(this.direction.clone().multiplyScalar(this.dist + this.range))
      );
    }
  },
  tick: function () {
    if (btn == false) {

      if (this.el.is("dragging")) {
        this.updateDirection();
        this.updateTarget();
        this.el.object3D.position.copy(this.target);
      }
    }
    else {
      this.el.removeState("dragging");
    }
  }
});
AFRAME.registerComponent('rotate-component', {
  schema: { speed: { default: 8 } },
  init: function () {
    this.ifMouseDown = false;
    this.x_cord = 0;
    this.y_cord = 0;

    document.addEventListener('touchstart', this.OnDocumentMouseDown.bind(this));
    document.addEventListener('touchend', this.OnDocumentMouseUp.bind(this));
    document.addEventListener('touchmove', this.OnDocumentMouseMove.bind(this));
  },
  OnDocumentMouseDown: function (event) {
    if (btn == true) {
      this.ifMouseDown = true;
      if (event.touches && event.touches[0]) {
        this.x_cord = event.touches[0].clientX;
        this.y_cord = event.touches[0].clientY;
      } else if (event.originalEvent && event.originalEvent.changedTouches[0]) {
        this.x_cord = event.originalEvent.changedTouches[0].clientX;
        this.y_cord = event.originalEvent.changedTouches[0].clientY;
      } else if (event.clientX && event.clientY) {
        this.x_cord = event.clientX;
        this.y_cord = event.clientY;
      }
      // this.x_cord = event.pageX;
      // this.y_cord = event.pageY;
    }
  },
  OnDocumentMouseUp: function () {
    this.ifMouseDown = false;
  },
  OnDocumentMouseMove: function (event) {
    if (btn == true) {
      if (this.ifMouseDown) {
        var x = 0;
        var y = 0;
        if (event.touches && event.touches[0]) {
          x = event.touches[0].clientX;
          y = event.touches[0].clientY;
        } else if (event.originalEvent && event.originalEvent.changedTouches[0]) {
          x = event.originalEvent.changedTouches[0].clientX;
          y = event.originalEvent.changedTouches[0].clientY;
        } else if (event.clientX && event.clientY) {
          x = event.clientX;
          y = event.clientY;
        }
        var temp_x = x - this.x_cord;
        var temp_y = y - this.y_cord;
        if (Math.abs(temp_y) < Math.abs(temp_x)) {
          this.el.object3D.rotateY(temp_x * this.data.speed / 500);
        }
        this.x_cord = x;
        this.y_cord = y;
      }
    }
  }
});