var btn = false;
function clickButton() {
  if (btn == true) {
    btn = false;
  }
  else if (btn == false) {
    btn = true;
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
      if (btn==false) {
      if (e.detail == "dragging") {
        this.dist = this.el.object3D.position
          .clone()
          .sub(this.el.sceneEl.camera.el.object3D.position)
          .length();
      }}
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
      else {
        if (e.touches && e.touches[0]) {
         
          console.log("prova di ruota")
          this.x_cord = e.touches[0].clientX;
          this.y_cord = e.touches[0].clientY;
        } else if (e.originalEvent && e.originalEvent.changedTouches[0]) {
        
          console.log("prova di ruota")
          this.x_cord = e.originalEvent.changedTouches[0].clientX;
          this.y_cord = e.originalEvent.changedTouches[0].clientY;
        } else if (e.clientX && e.clientY) {
         
          console.log("prova di ruota")
          this.x_cord = e.clientX;
          this.y_cord = e.clientY;
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
            // if ((Math.abs(this.x_cord1)>Math.abs(x1)&&Math.abs(this.x_cord2)>Math.abs(x2)&&Math.abs(this.y_cord1)>Math.abs(y1)&&Math.abs(this.y_cord2)>Math.abs(y2))) {
            //   this.range += 1;
            // }
            if (dist1 > dist2) {
              this.range -= 3;

            }
            if (dist1 < dist2) {
              this.range += 3;
            }
            // if (Math.abs(this.x_cord1)>Math.abs(x1)&&Math.abs(this.x_cord2)>Math.abs(x2)&&Math.abs(this.y_cord1)>Math.abs(y1)&&Math.abs(this.y_cord2)>Math.abs(y2)) 
            //           {
            //               console.log("dentro l'operazione di zoom in")
            //            this.range += 1;
            //         }
            //          if (Math.abs(this.x_cord1)<Math.abs(x1)&&Math.abs(this.x_cord2)<Math.abs(x2)&&Math.abs(this.y_cord1)<Math.abs(y1)&&Math.abs(this.y_cord2)<Math.abs(y2)) 
            //          {
            //              console.log("dentro l'operazione di zoom out")
            //              this.range -= 0.1;
            //          }
            this.x_cord1 = x1;
            this.y_cord1 = y1;
            this.x_cord2 = x2;
            this.y_cord2 = y2;
          }
          // if(Math.abs(temp_x2)+Math.abs(temp_y2)<Math.abs(temp_x1)+Math.abs(temp_y1))
        }
        else {
          var x = 0;
          var y = 0;
          if (e.touches && e.touches[0]) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
          } else if (e.originalEvent && e.originalEvent.changedTouches[0]) {
            x = e.originalEvent.changedTouches[0].clientX;
            y = e.originalEvent.changedTouches[0].clientY;
          } else if (e.clientX && e.clientY) {
            x = e.clientX;
            y = e.clientY;
          }
          var temp_x = x - this.x_cord;
          var temp_y = y - this.y_cord;
          if (Math.abs(temp_y)<Math.abs(temp_x)) {
            this.el.object3D.rotateY(temp_x * this.data.speed / 500);
          }
          this.x_cord = x;
          this.y_cord = y;
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
  }
});