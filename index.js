const merge = require('deepmerge');
const neutrinoWeb = require('neutrino-preset-web');
const { join } = require('path');

const MODULES = join(__dirname, 'node_modules');

module.exports = (neutrino, options) => {
  neutrino.options.entry = './src/index.ts';

  neutrino.use(neutrinoWeb);
  neutrino.config.module.rules.delete('compile'); // remove babel compile

  // typescript compiler options
  const compileOptions = merge({
    sourceMap: true,
    noImplicitAny: true,
    module: 'commonjs',
    target: 'es5',
    jsx: 'react',
    types: ['webpack-env']
  }, options.compile || {});

  neutrino.config
    .resolve
      .modules
        .add(MODULES)
        .end()
      .extensions
        .prepend('.ts')
        .prepend('.tsx')
        .end()
      .end()
    .resolveLoader
      .modules
        .add(MODULES)
        .end()
      .end()
    .module
      .rule('sourcemap')
        .test(/\.js$/)
        .pre()
        .use('sourcemap')
          .loader(require.resolve('source-map-loader'))
          .end()
        .end()
      .rule('compile')
        .clear()
        .test(options.test || /\.(ts|tsx)$/)
        .when(options.include, rule => rule.include.merge(options.include))
        .when(options.exclude, rule => rule.exclude.merge(options.exclude))
        .use('typescript')
          .loader(require.resolve('awesome-typescript-loader'))
          .options(compileOptions)
          .end()
        .end()
      .end()
    .externals({
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    })
    .when(
      process.env.NODE_ENV === 'development',
      // development
      (config) => {
      const ds = config.devServer;
      const protocol = ds.get('https') ? 'https' : 'http';
      config
        .entry('index')
          .prepend(require.resolve('react-hot-loader/patch'))
          .add(`webpack-dev-server/client?${protocol}://${ds.get('host')}:${ds.get('port')}/`)
          .add('webpack/hot/dev-server');
      },
      // production
      (config) => {
        config.plugin('copy')
          .tap((args) => {
            const patt = args[0];
            const opts = args[1];
            if (!opts.ignore) { opts.ignore = []; }
            opts.ignore = opts.ignore.concat(['*.ts', '*.tsx']);
            return [patt, opts];
          });
      }
    );
};
