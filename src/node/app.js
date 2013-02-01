var express = require('express'),
    mustache = require('./mustache.js'),
    mongo = require('mongodb'),
    path = require('path'),
    fs = require('fs'),
    util = require('util');

var app = express();

app.set('views', path.join(__dirname, '../mustache'));
app.use(express.static(path.join(__dirname, '../public')));

function mergeDictionaries(x, y) {
  var result = {};
  for (var attr in x) result[attr] = x[attr];
  for (var attr in y) result[attr] = y[attr];
  return result;
}

var defaultMustacheOptions = {
  clientTemplate: function() {
    return function(name) {
      var templatePath = path.join(app.get('views'), name + '.mustache');
      return '<script type="application/mustache" id="' + name + 'Template">\n' +
        fs.readFileSync(templatePath, 'utf8') +
        '\n</script>';
    };
  },
  baseJavascripts: function() {
    return ['/javascripts/jquery.min.js',
            '/javascripts/jquery.timeago.js',
            '/javascripts/jquery.mustache.js',
            '/javascripts/socket.io.min.js',
            '/javascripts/clientTemplates.js'].map(function(scriptPath) {
              return '<script type="text/javascript" src="' +
                scriptPath + '"></script>\n'; }).join('');
  }
};

app.engine('mustache', function(path, extraOptions, callback) {
  var options = mergeDictionaries(defaultMustacheOptions, extraOptions);
  fs.readFile(path, 'utf8', function(err, template) {
    if (err)
      callback(err);
    else callback(null, mustache.render(template, options));
  });
});

app.get('/', function(req, res) {
  res.render('index.mustache');
});

app.get('/templates.js', function(req, res) {
  fs.readdir(app.get('views'), function(err, files) {
    if (err)
      res.send(500);
    else {
      var mustacheFiles =
        files.filter(function(file) { return path.extname(file) == '.mustache'; });
      res.type('js');
      res.send('var templates = {' +
        mustacheFiles.map(function(file) {
          var addQuotes = function(s) { return "'" + s + "'"; };
          var basename = path.basename(file, '.mustache');
          var contents = fs.readFileSync(path.join(app.get('views'), file), 'utf8');
          var body =
            'var lines = [' + contents.split('\n').map(addQuotes).join(',') + '];\n' +
            "return $.mustache(lines.join('\\n'), params);";
          return basename + ': function(params) {\n' + body + '\n}\n';
        }).join(',') +
      '};');
    }
  });
});

app.listen(3000);
console.log('Listening on port 3000');
