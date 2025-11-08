import { defineConfig } from 'vite';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: mode !== 'production',
    minify: 'esbuild',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'projects/residential': resolve(__dirname, 'projects/residential.html'),
        'projects/commercial': resolve(__dirname, 'projects/commercial.html'),
        'projects/tourism': resolve(__dirname, 'projects/tourism.html'),
        'projects/urban': resolve(__dirname, 'projects/urban.html'),
        'projects/vivienda': resolve(__dirname, 'projects/vivienda.html'),
        'projects/hospitalario': resolve(__dirname, 'projects/hospitalario.html'),
        'projects/maharishi-vastu': resolve(__dirname, 'projects/maharishi-vastu.html'),
        'brand/importadora': resolve(__dirname, 'brand/importadora.html'),
        'brand/square': resolve(__dirname, 'brand/square.html'),
        'brand/capital': resolve(__dirname, 'brand/capital.html'),
        'brand/foundation': resolve(__dirname, 'brand/foundation.html'),
        'brand/novaterra': resolve(__dirname, 'brand/novaterra.html'),
        'brand/consultants': resolve(__dirname, 'brand/consultants.html')
      },
      output: {
        manualChunks: {
          // Vendor chunks removed (AOS and Swiper not used)
          // Component chunks
          'components-core': [
            './js/components/navbar.js',
            './js/components/hero.js',
            './js/components/footer.js'
          ],
          'components-content': [
            './js/components/about.js',
            './js/components/projects.js',
            './js/components/team.js'
          ],
          'components-interactive': [
            './js/components/brand.js',
            './js/components/contact.js',
            './js/components/services.js'
          ],
          utils: [
            './js/utils/analytics.js',
            './js/utils/performance.js',
            './js/utils/scroll-animations.js'
          ]
        },
        chunkFileNames: chunkInfo => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop().replace('.js', '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: assetInfo => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `img/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      }
    }
  },
  server: {
    port: 3001,
    open: true,
    cors: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3001
    }
  },
  preview: {
    port: 4173,
    open: true
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        // eslint-disable-next-line global-require
        require('autoprefixer'),
        // eslint-disable-next-line global-require
        require('cssnano')({
          preset: 'default'
        })
      ]
    }
  },
  optimizeDeps: {
    exclude: ['@rollup/plugin-visualizer']
  },
  plugins: [
    mode === 'analyze' &&
      visualizer({
        filename: 'dist/bundle-analysis.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      })
  ].filter(Boolean)
}));
