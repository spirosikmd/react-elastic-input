import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import pkg from './package.json';

const path = 'dist/react-elastic-input';
const name = 'ElasticInput';
const globals = {
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  react: 'React',
};
const external = Object.keys(globals);
const babelOptions = () => {
  return {
    babelrc: false,
    presets: [['env', { modules: false }], 'react'],
    plugins: ['transform-class-properties', 'transform-object-rest-spread'],
    exclude: 'node_modules/**',
  };
};

const umdBundle = ({ shouldMinify } = { shouldMinify: false }) => {
  return {
    input: 'src/ElasticInput.js',
    output: {
      name,
      file: `${path}.umd.${shouldMinify ? 'min' : ''}js`,
      format: 'umd',
      globals,
    },
    external,
    plugins: [babel(babelOptions()), resolve(), commonjs()].concat(
      shouldMinify ? [uglify({}, minify)] : []
    ),
  };
};

export default [
  umdBundle(),
  umdBundle({ shouldMinify: true }),
  {
    input: 'src/ElasticInput.js',
    external,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [babel(babelOptions())],
  },
];
