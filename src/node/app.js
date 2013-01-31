var express = require('express'),
    mustache = require('mu2'),
    mongo = require('mongodb'),
    path = require('path'),
    fs = require('fs');

var app = express();

app.set('views', path.join(__dirname, '../mustache'));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('mustache', function(path, options, callback) {
  var stream = mustache.compileAndRender(path, options)
  var buffer = '';
  stream.on('data', function(data) {
    buffer += data;
  });
  stream.on('end', function() {
    callback(null, buffer);
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
