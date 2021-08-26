const styleToCss = require('style-object-to-css-string');

const genButton = (primaryColor, secondColor, text, href) => {
  const styleObject = {
    display: 'inline-block',
    padding: '5px 10px',
    color: `${primaryColor}`,
    backgroundColor: `${secondColor}`,
    border: `1px solid ${primaryColor}`,
    borderRadius: '8px',
    boxShadow: `0px 5px 0px ${primaryColor}, inset 0px 1px 0px white, inset 0px -1px 0px white, inset 1px 0px 0px white, inset -1px 0px 0px white, 0px 5px 5px gray`,
  };

  const style = styleToCss(styleObject);

  return `<a style="${style}" href="${href}">${text}</a>`;
};

const genButtonList = (primaryColor, secondColor, textList, hrefList) => {
  let context = '';

  textList.forEach((text, index) => {
    const href = hrefList[index];
    const button = genButton(primaryColor, secondColor, text, href);

    context = context + `<td style="border: 0px solid white;">${button}</td>`;
  });

  return `<table style="border: 0px solid white; border-collapse: collapse;"><tr>${context}</tr></table>`;
};

module.exports = {
  genButton,
  genButtonList,
};
