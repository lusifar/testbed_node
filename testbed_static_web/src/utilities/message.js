const styleToCss = require('style-object-to-css-string');

const genMessage = (text, primaryColor, secondColor) => {
  const styleObject = {
    display: 'inline-block',
    padding: '10px 10px',
    color: `${primaryColor}`,
    backgroundColor: `${secondColor}`,
    borderRadius: '8px',
  };

  const style = styleToCss(styleObject);

  return `<div style="${style}">${text}</div>`;
};

const genInfoMessage = (text) => {
  return genMessage(`&#128276; ${text}`, '#00cc00', '#ccffcc');
};

const genErrorMessage = (text) => {
  return genMessage(`&#9940; ${text}`, '#cc3300', '#ffb399');
};

const systemCRONJobText = (text) => {
  return genMessage(`&#128338; ${text}`, 'rgb(115, 115, 115)', 'rgb(242, 242, 242)');
};

module.exports = {
  genInfoMessage,
  genErrorMessage,
  systemCRONJobText,
};
