var grunt = require('grunt');

exports.mince = {
  'mince': function(test) {
    test.expect(3);

    var expected = grunt.file.read('test/expected/main.js');
    var actual = grunt.file.read('tmp/main.js');
    test.equal(expected, actual, 'should mince, without src, with destDir in config');

    actual = grunt.file.read('tmp/full.js');
    test.equal(expected, actual, 'should mince, with src and dest in config');

    actual = grunt.file.read('tmp/extended.js');
    test.equal(expected, actual, 'should mince with engines params');

    test.done();
  },

  'mince manifest': function(test) {
    test.expect(5);

    var manifest = grunt.file.readJSON('tmp/manifest/manifest.json');
    test.ok(manifest.assets, 'manifest is valid');
    test.ok(manifest.files, 'manifest is valid');
    test.equal(manifest.assets['main.css'].indexOf('main-'), 0, 'generated asset name starts with original asset name');

    var expected = grunt.file.read('test/expected/main.css');
    var actual = grunt.file.read('tmp/manifest/' + manifest.assets['main.css']);
    test.equal(expected, actual, 'should mince with less compiler');

    expected = grunt.file.read('test/expected/main.css.map');
    actual = grunt.file.read('tmp/manifest/' + manifest.assets['main.css'] + '.map');
    test.equal(expected, actual, 'should generate source map');

    test.done();
  },

  'mince helpers': function(test) {
    test.expect(1);

    var expected = 'console.log("Version: 3.2.1");';
    var actual = grunt.file.read('tmp/version.js');
    test.equal(expected, actual, 'should use mince helpers in EJS');

    test.done();
  }
};
