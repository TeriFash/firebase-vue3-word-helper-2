module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
	darkMode: 'class',
  theme: {
    extend: {
			colors: {
				rb: {
					'dark': '#212529',
					'light': '#F8F9FA',
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
