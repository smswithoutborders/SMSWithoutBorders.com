module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      //extending tailwind default colors with evergreen-ui color pallete
      colors: {
        primary: {
          '100': '#F7F9FD',
          '200': '#F1F7FC',
          '300': '#E9F2FA',
          '400': '#DDEBF7',
          '500': '#B7D4EF',
          '600': '#8FBCE6',
          '700': '#579AD9',
          '800': '#3D8BD4',
          '900': '#1070CA',
          '1000': '#084B8A',
          'lightest': this['100'],
          'light': this['400'],
          'base': this['900'],
          'dark': this['1000'],
        },
        red: {
          '100': '#FEF6F6',
          '400': '#FAE2E2',
          '900': '#EC4C47',
          '1000': '#BF0E08',
          'lightest': this['100'],
          'light': this['400'],
          'base': this['900'],
          'dark': this['1000'],
        },
        orange: {
          '100': '#FDF8F3',
          '400': '#FAE3CD',
          '900': '#D9822B',
          '1000': '#95591E',
          'lightest': this['100'],
          'light': this['400'],
          'base': this['900'],
          'dark': this['1000'],
        },
        yellow: {
          '100': '#FEF8E7',
          '400': '#FBE6A2',
          '900': '#F7D154',
          '1000': '#7E6514',
          'lightest': this['100'],
          'light': this['400'],
          'base': this['900'],
          'dark': this['1000'],
        },
        green: {
          '100': '#F1FAF5',
          '400': '#D4EEE2',
          '900': '#47B881',
          '1000': '#00783E',
          'lightest': this['100'],
          'light': this['400'],
          'base': this['900'],
          'dark': this['1000'],
        },
        teal: {
          '100': '#F1FBFC',
          '400': '#D2EEF3',
          '900': '#14B5D0',
          '1000': '#007489',
          'lightest': this['100'],
          'light': this['400'],
          'base': this['900'],
          'dark': this['1000'],
        },
        purple: {
          '100': '#F8F7FC',
          '400': '#EAE7F8',
          '900': '#735DD0',
          '1000': '#37248F',
          'lightest': this['100'],
          'light': this['400'],
          'base': this['900'],
          'dark': this['1000'],
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui']
      },
      rotate: {
        '-25': '-25deg',
        25: '25deg',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
