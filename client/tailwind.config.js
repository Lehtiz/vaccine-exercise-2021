module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      serif: 'Roboto',
    },
    extend: {},
    colors: {
      white: '#ffffff',
      black: '#000000',
      blue: {
        medium: '#1877f2',
        login: '#1775ee',
      },
      red: {
        primary: '#FF0000',
        offline: '#FF0000',
      },
      green: {
        button: '#008000',
        online: '#00FF00',
        register: '#42b72a',
      },
      gray: {
        border: '#808080',
        light: '#808080',
        bg: '#f0f2f5',
      },
      background: {
        fore: '#393B40',
        under: '#0A0C0D',
      },
      layout: '#323439',
      outline: '#27B9F2',
      focus: '#252729',
      textcolor: '#ffffff',
      bold: '#495773',
      button: '#7193D9',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
