/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */ /*https://jsfiddle.net/xpvt214o/78118/*/
$(document).ready(function() {

  var handle = function(el) {
    var $el = $(el);
    $el
      .addClass("selected")
      .siblings()
      .removeClass("selected");

    $("#nav_indicator")
      .css("left", $el.position().left + "px")
      .css("width", $el.width() + "px")
      .css("padding-left", $el.css("padding-left"))
      .css("padding-right", $el.css("padding-right"));
  };

  // Click handler
  $("ul#nav > li").on("click", function(event) {
    handle(this);
  });

  // Initialize nav indicator position
  handle($("ul#nav > li.selected"));

});


