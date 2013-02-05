function resizer() {
  var paneHeight = $('#leftPane').height();
  $('#chat').height(paneHeight - 100);
}
$(window).resize(resizer);
$(document).ready(function() {
  resizer();
});
