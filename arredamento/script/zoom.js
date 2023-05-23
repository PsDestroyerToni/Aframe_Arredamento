 AFRAME.registerComponent('zoom-in-out',{
    schema : { speed : {default:8}},
    init : function(){
        console.log("dentro il componente")
        this.range=0;
      this.ifMouseDown = false;
      this.x_cord1 = 0;
      this.y_cord1 = 0;
      this.x_cord2 = 0;
      this.y_cord2 = 0;
       document.addEventListener('touchstart',this.OnDocumentMouseDown.bind(this));
       document.addEventListener('touchend',this.OnDocumentMouseUp.bind(this));
      document.addEventListener('touchmove',this.OnDocumentMouseMove.bind(this));
    },
    OnDocumentMouseDown : function(event){
      this.ifMouseDown = true;
      if (event.touches && event.touches[0] && event.touches[1]) {
        this.x_cord1 = event.touches[0].clientX;
        this.y_cord1 = event.touches[0].clientY;
        this.x_cord2 = event.touches[1].clientX;
        this.y_cord2 = event.touches[1].clientY;
  } else if (event.originalEvent && event.originalEvent.changedTouches[0] && event.originalEvent.changedTouches[1]) {
    this.x_cord1 = event.originalEvent.changedTouches[0].clientX;
    this.y_cord1 = event.originalEvent.changedTouches[0].clientY;
    this.x_cord2 = event.originalEvent.changedTouches[1].clientX;
    this.y_cord2 = event.originalEvent.changedTouches[1].clientY;
  } else if (event.clientX && event.clientY) {
    this.x_cord1 = event.clientX;
    this.y_cord1 = event.clientY;
    this.x_cord2 = event.clientX;
    this.y_cord2 = event.clientY;
  }
      // this.x_cord = event.pageX;
      // this.y_cord = event.pageY;
    },
    OnDocumentMouseUp : function(){
      this.ifMouseDown = false;
      console.log("dentro dentro mouseUp")
    },
    OnDocumentMouseMove : function(event)
    {
        console.log("dentro dentro mouseMove")
     if(this.ifMouseDown)
      {

var x1=0;
var y1=0;
var x2=0;
var y2=0;

      if (event.touches && event.touches[0] && event.touches[1]) {
      x1 = event.touches[0].clientX;
      y1 = event.touches[0].clientY;
      x2 = event.touches[1].clientX;
      y2 = event.touches[1].clientY;
      console.log("primo if")
  } else if (event.originalEvent && event.originalEvent.changedTouches[0] && event.originalEvent.changedTouches[1]) {
    x1 = event.originalEvent.changedTouches[0].clientX;
    y1 = event.originalEvent.changedTouches[0].clientY;
    x2 = event.originalEvent.changedTouches[1].clientX;
    y2 = event.originalEvent.changedTouches[1].clientY;
    console.log("secondo if")
  } else if (event.clientX && event.clientY) {
    x1 = event.clientX;
    y1 = event.clientY;
    x2 = event.clientX;
    y2 = event.clientY;
    console.log("terzo if")
  }
         var temp_x1 = x1-this.x_cord1;
         var temp_y1 = y1-this.y_cord1;
         var temp_x2 = x2-this.x_cord2;
         var temp_y2 = y2-this.y_cord2;

        if(Math.abs(temp_x2)+Math.abs(temp_y2)<Math.abs(temp_x1)+Math.abs(temp_y1))
        {
            console.log("dentro l'operazione di zoom in")
            
          this.el.object3D.scale.set(x *1.1, y*1.1, z*1.1);
          
        }
        else
        {
            console.log("dentro l'operazione di zoom out")
            this.el.object3D.scale.set(x *0.5, y*0.5, z*0.5);
        }
        this.x_cord1 = x1;
        this.y_cord1 = y1;
        this.x_cord2 = x2;
        this.y_cord2 = y2;
        console.log(x1)
        console.log(y1)
        console.log(x2)
        console.log(y2)
    }
  }
  });
