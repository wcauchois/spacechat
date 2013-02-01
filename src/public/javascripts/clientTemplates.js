var clientTemplates = {};
$(document).ready(function() {
  $('script[type="application/mustache"]').each(function(_, script) {
    var $script = $(script);
    var name = $script.attr('id').match(/(.*)Template/)[1],
        body = $script.text();
    templates[name] = function(options) {
      return $.mustache(body, options);
    };
  });
});
