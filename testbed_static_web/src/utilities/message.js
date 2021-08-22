const styleToCss = require('style-object-to-css-string');

const genMessage = (text, primaryColor, secondColor) => {
  const styleObject = {
    display: 'inline-block',
    padding: '10px 20px',
    color: `${primaryColor}`,
    backgroundColor: `${secondColor}`,
    border: `1px solid ${primaryColor}`,
    borderRadius: '8px',
    boxShadow: `0px 5px 0px ${primaryColor}, inset 0px 1px 0px white, inset 0px -1px 0px white, inset 1px 0px 0px white, inset -1px 0px 0px white, 0px 5px 5px gray`,
  };

  const style = styleToCss(styleObject);

  return `<div style="${style}">${text}</div>`;
};

const genInfoMessage = (text) => {
  return genMessage(text, '#00cc00', '#ccffcc');
};

const genErrorMessage = (text) => {
  return genMessage(text, '#cc3300', '#ffb399');
};

module.exports = {
  genInfoMessage,
  genErrorMessage,
};
