import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/global.js',
    output: {
        file: 'build/dateutils-latest.js',
        format: 'umd',
        name: 'window',
        extend: true
    },
    external: [],
    plugins: [
      nodeResolve({ jsnext: true }),
        babel({
            exclude: 'node_modules/**'
        })
    ]
};
