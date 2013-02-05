function resizer() {
  var paneHeight = $('#pane').height();
  $('#chat').height(paneHeight - 100);
}
$(window).resize(resizer);
$(document).ready(function() {
  resizer();
});
