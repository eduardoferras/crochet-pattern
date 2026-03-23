import { fileURLToPath, URL } from 'node:url'

export default defineNuxtConfig({
	app: {
		head: {
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' }]
		}
	},
	compatibilityDate: '2025-05-15',
	nitro: {
		preset: process.env.NITRO_PRESET
	},
	runtimeConfig: {
		public: {
			apiUrl: process.env.API_URL,
			whatsAppSales: '',
			gtm: {
				id: process.env.NUXT_PUBLIC_GTM_ID as string,
				enabled: process.env.NODE_ENV === 'production',
				loadScript: true,
				enableRouterSync: true,
				defer: true,
				debug: process.env.NODE_ENV !== 'production'
			}
		}
	},
	devtools: { enabled: true },
	modules: [
		'@nuxt/image',
		'@nuxt/icon',
		'@nuxt/eslint',
		'@nuxt/test-utils/module',
		'@nuxtjs/fontaine',
		'@nuxtjs/google-fonts',
		'@zadigetvoltaire/nuxt-gtm',
		'@pinia/nuxt',
		'@vee-validate/nuxt',
		'vue-sonner/nuxt'
	],
	googleFonts: {
		families: {
			Roboto: [100, 200, 300, 400, 500, 600, 700, 800, 900]
		},
		display: 'swap'
	},
	fontMetrics: {
		fonts: ['Roboto']
	},
	eslint: {
		config: {
			autoInit: false
		}
	},
	srcDir: 'src/',
	css: ['@/styles/main.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
            @use "@/styles/abstracts/index" as *;
          `
				}
			}
		}
	},
	icon: {
		customCollections: [
			{
				prefix: 'local',
				dir: 'src/assets/icons',
				recursive: true
			}
		]
	},
	alias: {
		'@components': fileURLToPath(new URL('./src/components', import.meta.url)),
		'@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
		'@constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
		'@validations': fileURLToPath(new URL('./src/validations', import.meta.url)),
		'@interfaces': fileURLToPath(new URL('./src/interfaces', import.meta.url)),
		'@services': fileURLToPath(new URL('./src/services', import.meta.url)),
		'@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
	}
})
