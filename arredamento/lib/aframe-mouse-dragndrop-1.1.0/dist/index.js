parcelRequire = function (e, r, t, n) { var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && require; function f(t, n) { if (!r[t]) { if (!e[t]) { var i = "function" == typeof parcelRequire && parcelRequire; if (!n && i) return i(t, !0); if (o) return o(t, !0); if (u && "string" == typeof t) return u(t); var c = new Error("Cannot find module '" + t + "'"); throw c.code = "MODULE_NOT_FOUND", c } p.resolve = function (r) { return e[t][1][r] || r }, p.cache = {}; var l = r[t] = new f.Module(t); e[t][0].call(l.exports, p, l, l.exports, this) } return r[t].exports; function p(e) { return f(p.resolve(e)) } } f.isParcelRequire = !0, f.Module = function (e) { this.id = e, this.bundle = f, this.exports = {} }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) { e[r] = [function (e, r) { r.exports = t }, {}] }; for (var c = 0; c < t.length; c++)try { f(t[c]) } catch (e) { i || (i = e) } if (t.length) { var l = f(t[t.length - 1]); "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () { return l }) : n && (this[n] = l) } if (parcelRequire = f, i) throw i; return f }({
    "Focm": [function (require, module, exports) {
        null == window.AFRAME && console.error("aframe not found, please import it before this component."),
            AFRAME.registerSystem("track-cursor", {
                init:
                    function () {
                        this.el.setAttribute("cursor", { rayOrigin: "mouse" })
                    }
            }),
            AFRAME.registerComponent("track-cursor", {
                init:
                    function () {
                        var e = this; this.el.addEventListener("mousedown",
                            function (t) {
                                e.el.is("cursor-hovered") && (e.el.sceneEl.camera.el.setAttribute("look-controls", { enabled: !1 }),
                                    e.el.addState("dragging"))
                            }), this.el.addEventListener("click",
                                function (t) {
                                    e.el.is("dragging") && (e.el.sceneEl.camera.el.setAttribute("look-controls", { enabled: !0 }),
                                        e.el.removeState("dragging"))
                                })
                    }
            }), AFRAME.registerComponent("dragndrop", {
                dependencies: ["track-cursor"], init:
                    function () {
                        var e = this;
                        this.range = 0,
                            this.dist = 0,
                            this.el.addEventListener("stateadded",
                                function (t) {
                                    "dragging" == t.detail && (
                                        e.range = 0,
                                        e.dist = e.el.object3D.position.clone().sub(e.el.sceneEl.camera.el.object3D.position).length())
                                }),
                            this.direction = new AFRAME.THREE.Vector3,
                            this.target = new AFRAME.THREE.Vector3, document.addEventListener("wheel",
                                function (t) { t.deltaY < 0 ? e.range += .1 : e.range -= .1 })
                    },
                updateDirection: function () {
                    this.direction.copy(this.el.sceneEl.getAttribute("raycaster").direction)
                },
                updateTarget: function () {
                    var e = this.el.sceneEl.camera.el;
                    this.target.copy(e.object3D.position.clone().add(this.direction.clone().multiplyScalar(this.dist + this.range)))
                },
                tick: function () {
                    this.el.is("dragging") && (this.updateDirection(), this.updateTarget(),
                        this.el.object3D.position.copy(this.target))
                }
            });
    }, {}]
}, {}, ["Focm"], null)