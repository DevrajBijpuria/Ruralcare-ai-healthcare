import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Bright color palette
				medteal: {
					light: '#0EA5E9', // Bright blue
					DEFAULT: '#0891B2', // Ocean blue 
					dark: '#0E7490', // Deep blue
				},
				medgold: {
					light: '#F97316', // Bright orange
					DEFAULT: '#EA580C', // Deep orange
					dark: '#C2410C', // Dark orange
				},
				medred: {
					light: '#D946EF', // Bright magenta
					DEFAULT: '#C026D3', // Deep magenta
					dark: '#A21CAF', // Dark magenta
				},
				medblue: {
					light: '#8B5CF6', // Bright purple
					DEFAULT: '#7C3AED', // Deep purple
					dark: '#6D28D9', // Dark purple
				},
				medcream: {
					light: '#FFFFFF', // White
					DEFAULT: '#F5F5F5', // Off-white
					dark: '#EBEBFA', // Light lavender
				},
			},
			// ... keep existing code (borderRadius, keyframes, animations, fontFamily)
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
