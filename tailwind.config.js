module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
	// purge: ["./src/**/*.{js,ts,jsx,tsx, vue}"],
	darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
			transitionProperty: {
				width: 'width',
			},
			colors: {
				rb: {
					'dark': '#212529',
					'light': '#F8F9FA',
				},
				'navy-blue': {
					'50': '#f2f3f9',
					'100': '#e6e6f3',
					'200': '#c0c1e1',
					'300': '#9a9ccf',
					'400': '#4e52ab',
					'500': '#020887',
					'600': '#02077a',
					'700': '#020665',
					'800': '#010551',
					'900': '#010442',
				},
				black: {
					100: '#cdd0d6',
					200: '#9ba2ae',
					300: '#687385',
					400: '#36455d',
					500: '#041634',
					600: '#03122a',
					700: '#020d1f',
					800: '#020915',
					900: '#01040a',
				},
			},
			screens: {
				xs: '320px',
				xm: '576px',
				sm: '640px',
				md: '768px',
				slg: '978px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1440px',
        '3xl': '1600px',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
			},
		},
  },
  plugins: [
		// require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
	],
}
