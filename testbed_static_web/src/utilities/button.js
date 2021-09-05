const styleToCss = require('style-object-to-css-string');

const genButton = (text, href, primaryColor, secondColor, disable) => {
  const styleObject = {
    display: 'inline-block',
    padding: '5px 10px',
    color: `${primaryColor}`,
    backgroundColor: `${secondColor}`,
    border: `1px solid ${primaryColor}`,
    borderRadius: '8px',
    boxShadow: disable
      ? `inset 0px 1px 0px white, inset 0px -1px 0px white, inset 1px 0px 0px white, inset -1px 0px 0px white`
      : `0px 5px 0px ${primaryColor}, inset 0px 1px 0px white, inset 0px -1px 0px white, inset 1px 0px 0px white, inset -1px 0px 0px white, 0px 5px 5px gray`,
  };

  const style = styleToCss(styleObject);

  return `<a style="${style}" href="${href}">${text}</a>`;
};

const buttonList = (textList, hrefList, primaryColorList, secondColorList, disableList) => {
  let context = '';

  textList.forEach((text, index) => {
    const href = hrefList[index];
    const primaryColor = primaryColorList[index];
    const secondColor = secondColorList[index];
    const disable = disableList[index];
    const button = genButton(text, href, primaryColor, secondColor, disable);

    context = context + `<td style="padding: 0px 10px; border: 0px solid white;">${button}</td>`;
  });

  return `<table style="border: 0px solid white; border-collapse: collapse;"><tr>${context}</tr></table>`;
};

module.exports = {
  genButton,
  buttonList,
};
