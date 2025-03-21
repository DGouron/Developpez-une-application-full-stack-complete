/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts,css}"],
	theme: {
		extend: {
			colors: {
				primary: "hsla(248, 55%, 59%, 1)",
				"inline-red": "hsla(0, 83%, 35%, 1)",
				disabled: "hsla(0, 0%, 58%, 1)",
				card: "hsla(0, 0%, 96%, 1)",
			},
		},
	},
	plugins: [],
};
