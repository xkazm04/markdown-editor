module.exports = {
  theme: {
    extend: {
      colors: {
        green: {
          50: '#E8FCF5',
          100: '#D8FEF1',
          200: '#ADDECE',
          300: '#76D7B8',
          400: '#2CCD9A',
          500: '#24A87E',
          600: '#176D52',
        },
        note: {
          100: '#E4F8FE',
          200: '#3FC9F3',
          300: '#005E7A',
        },
        warning: {
          100: '#FDEEED',
          200: '#E1BD33',
          300: '#E02D1B',
        },
        caution: {
          100: '#FEF8DC',
          200: '#E7BD1A',
          300: '#867018',
        },
        primary_grey: '#ffffff08',
        sections_border: '#4b505f',
      },
    },
  },
  plugins: [require('daisyui')],
};
