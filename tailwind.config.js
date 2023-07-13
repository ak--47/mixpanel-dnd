/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx,svelte}"],
	corePlugins: { container: false },
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
				mpWhite: "rgb(233, 233, 233)",
				mpGray: "#3d4451",
				mpPrimary: "#7856FF",
				mpLite: "#8F8F91",
				mpBlack: "#2A2A2F"
				
				
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [		
			"dark"			
		],
	},
};
