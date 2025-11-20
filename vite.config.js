import { defineConfig } from 'vite';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // MOBILE-FIRST OPTIMIZATION: No sourcemaps in production for smaller bundle
    sourcemap: false,
    // Use esbuild for fastest minification
    minify: 'esbuild',
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    // Target modern browsers for smaller bundle
    target: 'esnext',
    // Reduce chunk size warning for mobile optimization
    chunkSizeWarningLimit: 500,
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
        manualChunks(id) {
          // MOBILE-FIRST: Optimize chunks for minimal initial load
          // Core critical components (loaded immediately)
          if (id.includes('navbar.js') || id.includes('hero.js')) {
            return 'core-critical';
          }

          // Utils that are needed early
          if (id.includes('utils/i18n.js') || id.includes('utils/lazy-loader.js')) {
            return 'utils-critical';
          }

          // Footer (loaded early but not critical)
          if (id.includes('footer.js')) {
            return 'core-footer';
          }

          // Content components (lazy loaded on scroll)
          if (
            id.includes('components/about.js') ||
            id.includes('components/projects.js') ||
            id.includes('components/team.js')
          ) {
            return 'content-lazy';
          }

          // Interactive components (lazy loaded on interaction)
          if (id.includes('components/brand.js') || id.includes('components/contact.js')) {
            return 'interactive-lazy';
          }

          // Utils (lazy loaded)
          if (
            id.includes('utils/analytics.js') ||
            id.includes('utils/performance.js') ||
            id.includes('utils/scroll-animations.js')
          ) {
            return 'utils-lazy';
          }

          // Service worker and mobile optimizers (lazy)
          if (
            id.includes('utils/service-worker.js') ||
            id.includes('utils/mobile-image-optimizer.js')
          ) {
            return 'utils-mobile';
          }

          // Node modules (vendor chunk)
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          // Default: let Vite handle other chunks
          return undefined;
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
    watch: {
      // Ignore certain files to reduce unnecessary reloads
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/*.log', '**/.DS_Store'],
      // Reduce polling interval for better performance
      usePolling: false
    },
    // Reduce HMR sensitivity
    hmr: {
      overlay: true
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
        /* eslint-disable global-require */
        require('autoprefixer'),
        // cssnano solo en producción, no en desarrollo
        mode === 'production' &&
          require('cssnano')({
            preset: 'default'
          })
        /* eslint-enable global-require */
      ].filter(Boolean)
    }
  },
  // MOBILE-FIRST: Remove unused dependencies (AOS, Swiper not used in code)
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
