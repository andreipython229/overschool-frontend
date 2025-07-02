module.exports = {
  quietDeps: true,
  silenceDeprecations: ['mixed-decls'],
  style: 'compressed',
  loadPaths: ['src/scss'],
  outputStyle: 'expanded',
  sourceMap: process.env.NODE_ENV === 'development',
  sourceMapContents: true,
  sourceMapEmbed: true,
  sourceMapRoot: 'src',
  includePaths: ['src/scss'],
  precision: 6,
  indentType: 'space',
  indentWidth: 2,
  linefeed: 'lf',
  charset: false,
  noCache: false,
  logger: {
    warn: function() {},
    debug: function() {}
  },
  functions: {
    'warn($message)': function(message) {
      return null;
    }
  }
}; 