/**
 * Optimized vite configuration for production
 * Add this to vite.config.js to enable these optimizations in production
 */

export const optimizationConfig = {
  build: {
    // Better chunk splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-core': [
            'react',
            'react-dom',
            'react-router-dom'
          ],
          'vendor-animation': [
            'framer-motion'
          ],
          'vendor-ui': [
            'swiper',
            'react-icons'
          ],
          'vendor-utils': [
            'axios',
            'clsx',
            'tailwind-merge'
          ]
        }
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify JS and CSS
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      }
    },
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'swiper',
      'clsx',
      'tailwind-merge'
    ]
  }
};
