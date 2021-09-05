const { buttonList } = require('./button');
const { systemCRONJobText } = require('./message');

const systemWCH = (title, wchList) => {
  const textList = [];
  const hrefList = [];
  const primaryColorList = [];
  const secondColorList = [];
  const disableList = [];

  wchList.forEach((wch) => {
    const emoji = wch.disable ? '&#128076;' : '&#127538;';

    textList.push(`${emoji} ( ${wch.toolId}, ${wch.chamberId}`);
    hrefList.push('#');
    primaryColorList.push(wch.disable ? 'rgb(179, 179, 179)' : 'rgb(45, 91, 185)');
    secondColorList.push(wch.disable ? 'rgb(230, 230, 230)' : 'rgb(194, 209, 240)');
    disableList.push(wch.disable);
  });

  return systemCRONJobText(
    `${title}<br /><br />${buttonList(textList, hrefList, primaryColorList, secondColorList, disableList)}`
  );
};

module.exports = {
  systemWCH,
};
