/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './routes/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {},
    container: {
      center: true,
      padding: '1rem',
      maxWidth: {
        base: '940px',
      },
      screens: {
        base: '940px',
      },
    },
    extend: {
      height: {
        600: 'min(600px, 80vh)',
      },
      screens: {
        mobile: { max: '639px' },
        xs: { max: '460px' },
      },
      backgroundImage: {
        'sidebar-pattern': 'url(./src/assets/plane.svg)',
      },
      colors: {
        warning: 'hsl(var(--warning))',
        'warning-foreground': 'hsl(var(--warning-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        denim: 'hsl(var(--denim))',
        purple: 'hsl(var(--purple))',
        'light-blue': 'hsl(var(--light-blue))',
        'sky-blue': 'hsl(var(--sky-blue))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontSize: {
        '2xl': ['2rem', { lineHeight: '3.5rem' }],
        xl: '1.5rem',
        lg: ['1.25rem', { lineHeight: '1.625rem' }],
        md: '1.125rem',
        sm: '1rem',
        s: '0.875rem',
      },
      fontWeight: {
        regular: '400',
        semi: '500',
        bold: '700',
      },
      borderRadius: {
        full: 'var(--rounded-full)',
        lg: 'var(--rounded-lg)',
        md: 'var(--rounded-md)',
        sm: 'var(--rounded-sm)',
      },
      boxShadow: {
        base: ' 0px 25px 40px -20px rgba(0, 0, 0, 0.10)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
