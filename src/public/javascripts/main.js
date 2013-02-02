$(document).ready(function() {
  doResize();
  $('#chat').html(templates.loremIpsum({}));
});
$(window).resize(doResize);
function doResize() {
  $('#chat').css('width', ($(window).width() - 240) + 'px');
  $('#chat').css('height', ($(window).height() - 150) + 'px');
  $('#chat').scrollTop($('#chat').height());
}
