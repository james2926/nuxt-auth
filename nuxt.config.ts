// nuxt.config.ts
export default defineNuxtConfig({
  css: ['bootstrap/dist/css/bootstrap.min.css'],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_URL
    }
  },

  plugins: [
    '@/plugin/axios',
  ],

  router: {
    middleware: ['auth'],
  },

  modules: [
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
  ],

  auth: {
    baseURL: 'https://api.wbc24.pl/',
    provider: {
      type: 'local',
      endpoints :{
        signIn: { path: 'public/users/login', method: 'post' },
      },
      token: {
        signInResponseTokenPointer: '/access_token',
        type: 'Bearer',
        cookieName: 'auth.access_token',
        headerName: 'Authorization',
        maxAgeInSeconds: 1800,
        sameSiteAttribute: 'lax',
        cookieDomain: '',
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false,
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: 'public/users/refresh', method: 'post' },
        refreshOnlyToken: true,
        token: {
          signInResponseRefreshTokenPointer: '/refresh-token',
          refreshRequestTokenPointer: '/refresh-token',
          cookieName: 'auth.token',
          maxAgeInSeconds: 1800,
          sameSiteAttribute: 'lax',
          secureCookieAttribute: false,
          cookieDomain: '',
          httpOnlyCookieAttribute: false,
        }
      },
      pages: {
        login: '/login'
      }
    },
  },

  compatibilityDate: '2024-11-10',
});