/*************************************************************************
  dw_tooltip.js   requires: dw_event.js and dw_viewport.js
  version date: May 21, 2005 moved init call to body onload
  (March 14, 2005: minor changes in position algorithm and timer mechanism)
  
  This code is from Dynamic Web Coding at dyn-web.com
  Copyright 2003-5 by Sharon Paine 
  See Terms of Use at www.dyn-web.com/bus/terms.html
  regarding conditions under which you may use this code.
  This notice must be retained in the code as is!
*************************************************************************/

var Tooltip = {
    followMouse: true,
    offX: 8,
    offY: 12,
    tipID: "tipDiv",
    showDelay: 100,
    hideDelay: 200,
    
    ready:false, timer:null, tip:null, 
  
    init: function() {  
        if ( document.createElement && document.body && typeof document.body.appendChild != "undefined" ) {
            if ( !document.getElementById(this.tipID) ) {
                var el = document.createElement("DIV");
                el.id = this.tipID; document.body.appendChild(el);
            }
            this.ready = true;
        }
    },
    
    show: function(e, msg) {
        if (this.timer) { clearTimeout(this.timer);	this.timer = 0; }
        this.tip = document.getElementById( this.tipID );
        if (this.followMouse) // set up mousemove 
            dw_event.add( document, "mousemove", this.trackMouse, true );
        this.writeTip("");  // for mac ie
        this.writeTip(msg);
        viewport.getAll();
        this.positionTip(e);
        this.timer = setTimeout("Tooltip.toggleVis('" + this.tipID + "', 'visible')", this.showDelay);
    },
    
    writeTip: function(msg) {
        if ( this.tip && typeof this.tip.innerHTML != "undefined" ) this.tip.innerHTML = msg;
    },
    
    positionTip: function(e) {
        if ( this.tip && this.tip.style ) {
            // put e.pageX/Y first! (for Safari)
            var x = e.pageX? e.pageX: e.clientX + viewport.scrollX;
            var y = e.pageY? e.pageY: e.clientY + viewport.scrollY;
    
            if ( x + this.tip.offsetWidth + this.offX > viewport.width + viewport.scrollX ) {
                x = x - this.tip.offsetWidth - this.offX;
                if ( x < 0 ) x = 0;
            } else x = x + this.offX;
        
            if ( y + this.tip.offsetHeight + this.offY > viewport.height + viewport.scrollY ) {
                y = y - this.tip.offsetHeight - this.offY;
                if ( y < viewport.scrollY ) y = viewport.height + viewport.scrollY - this.tip.offsetHeight;
            } else y = y + this.offY;
            
            this.tip.style.left = x + "px"; this.tip.style.top = y + "px";
        }
    },
    
    hide: function() {
        if (this.timer) { clearTimeout(this.timer);	this.timer = 0; }
        this.timer = setTimeout("Tooltip.toggleVis('" + this.tipID + "', 'hidden')", this.hideDelay);
        if (this.followMouse) // release mousemove
            dw_event.remove( document, "mousemove", this.trackMouse, true );
        this.tip = null; 
    },

    toggleVis: function(id, vis) { // to check for el, prevent (rare) errors
        var el = document.getElementById(id);
        if (el) el.style.visibility = vis;
    },
    
    trackMouse: function(e) {
    	e = dw_event.DOMit(e);
     	Tooltip.positionTip(e);
    }
    
}
