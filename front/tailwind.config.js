/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts,css}"],
	theme: {
		extend: {
			colors: {
				primary: "hsla(248, 55%, 59%, 1)",
				"inline-red": "hsla(0, 83%, 35%, 1)",
			},
		},
	},
	plugins: [],
};
