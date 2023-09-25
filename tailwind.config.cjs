/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}',
		// Keep existing values and append the following:
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts,astro}')
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		// Keep any existing plugins present and append the following:
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
	],
}
