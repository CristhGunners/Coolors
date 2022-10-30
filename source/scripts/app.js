$(document).on('ready', function () {
  var palette = $('section.list-palettes');
  var notify = $('.notification');

  $('#about,#closepopup').on('click', function () {
    $('#popup').toggleClass('active');
  });

  $.getJSON('./data/palette.json', function (data) {
    for (var i = 0; i < data.length; i++) {
      p = data[i];
      palette.append(
        "<div class='palette'>" +
          getColordiv(p[1]) +
          '' +
          getColordiv(p[2]) +
          '' +
          getColordiv(p[3]) +
          '' +
          getColordiv(p[4]) +
          '</div>'
      );
    }

    var clipboard = new Clipboard('.palette__color__circle');

    clipboard.on('success', function (e) {
      notify.html('Copy to clipboard ' + e.text);
      notify.addClass('active');
    });

    clipboard.on('error', function (e) {
      console.log(e);
    });

    notify.on('click', function () {
      notify.removeClass('active');
    });
  });

  var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('#top');

  //hide or show the "back to top" link
  $(window).scroll(function () {
    $(this).scrollTop() > offset
      ? $back_to_top.addClass('is-visible')
      : $back_to_top.removeClass('is-visible fade-out');
    if ($(this).scrollTop() > offset_opacity) {
      $back_to_top.addClass('fade-out');
    }
  });

  //smooth scroll to top
  $back_to_top.on('click', function (event) {
    event.preventDefault();
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      scroll_top_duration
    );
  });

  function getColordiv(code) {
    return (
      "<div class='palette__color'><div class='palette__color__circle' style='background-color:" +
      code +
      ";' data-clipboard-text='" +
      code +
      "'></div><h3 class='palette__color__code'>" +
      code +
      '</h3></div>'
    );
  }
});
