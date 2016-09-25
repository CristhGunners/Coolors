$(document).on("ready", function(){

  var palette = $("section.list-palettes");
  var notify = $(".notification");

  $("#about,#closepopup").on("click", function(){
    $("#popup").toggleClass("active");
  });

  $.getJSON('./data/palette.json', function(data) {
    for (var i = 0; i < data.length; i++) {
      p = data[i];
      palette.append("<div class='palette'>"+getColordiv(p[1])+""+getColordiv(p[2])+""+getColordiv(p[3])+""+getColordiv(p[4])+"</div>")
    }

    var clipboard = new Clipboard(".palette__color__circle");

    clipboard.on('success', function(e) {
      notify.html("Copy to clipboard "+e.text);
      notify.addClass("active");
    });

    clipboard.on('error', function(e) {
      console.log(e);
    });

    notify.on("click", function(){
      notify.removeClass("active");
    });
  });

  $("footer nav a.js-social-share").on("click", function(e) {
      e.preventDefault();
      windowPopup($(this).attr("href"), 500, 300);
  });

  function getColordiv(code) {
    return "<div class='palette__color'><div class='palette__color__circle' style='background-color:"+code+";' data-clipboard-text='"+code+"'></div><h3 class='palette__color__code'>"+code+"</h3></div>"
  }

  function windowPopup(url, width, height) {
      var left = (screen.width / 2) - (width / 2),
      top = (screen.height / 2) - (height / 2);

      window.open(
          url,
          "",
          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
      );
  }

});
