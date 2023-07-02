/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx,svelte}"],
	theme: {
		fontFamily: {
			sans: ["Apercu Pro", "Helvetica Neue", "Helvetica", "Tahoma", "Geneva", "Arial", "sans-serif"],
		},
		extend: {
			colors: {
				mpPurple: "#4f44e0",
				mpOrange: "#DF7800",
				mpRed: "#E34F2F",
				mpGreen: "#219464",
				mpWhite: "rgb(233, 233, 233)"
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				woot: {
					primary: "#a991f7",
					secondary: "#f6d860",
					accent: "#37cdbe",
					neutral: "#3d4451",
					"base-100": "#ffffff",
				},
			},
			"dark",
			"cupcake",
		],
	},
};
