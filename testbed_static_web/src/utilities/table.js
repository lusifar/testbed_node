const styleToCss = require('style-object-to-css-string');

const genTHeader = (headers, styleObject) => {
  const thStyle = styleToCss(styleObject.th);
  const thTopLeftStyle = styleToCss(styleObject.thTopLeft);
  const thTopRightStyle = styleToCss(styleObject.thTopRight);

  let context = '';
  headers.forEach((header, index) => {
    if (index === 0) {
      context = context + `<th style="${thTopLeftStyle}">${header}</th>`;
    } else if (index === headers.length - 1) {
      context = context + `<th style="${thTopRightStyle}">${header}</th>`;
    } else {
      context = context + `<th style="${thStyle}">${header}</th>`;
    }
  });

  return `<thead><tr>${context}</tr></thead>`;
};

const genTBody = (bodies, styleObject) => {
  const tdOddStyle = styleToCss(styleObject.tdOdd);
  const tdOddBottomLeftStyle = styleToCss(styleObject.tdOddBottomLeft);
  const tdOddBottomRightStyle = styleToCss(styleObject.tdOddBottomRight);
  const tdEvenStyle = styleToCss(styleObject.tdEven);
  const tdEvenBottomLeftStyle = styleToCss(styleObject.tdEvenBottomLeft);
  const tdEvenBottomRightStyle = styleToCss(styleObject.tdEvenBottomRight);

  let context = '';
  bodies.forEach((items, index0) => {
    context = context + `<tr>`;
    items.forEach((item, index1) => {
      if (index0 === bodies.length - 1 && index1 === 0) {
        context =
          context + `<td style="${index0 % 2 == 0 ? tdEvenBottomLeftStyle : tdOddBottomLeftStyle}">${item}</td>`;
      } else if (index0 === bodies.length - 1 && index1 === items.length - 1) {
        context =
          context + `<td style="${index0 % 2 == 0 ? tdEvenBottomRightStyle : tdOddBottomRightStyle}">${item}</td>`;
      } else {
        context = context + `<td style="${index0 % 2 == 0 ? tdEvenStyle : tdOddStyle}">${item}</td>`;
      }
    });
    context = context + '</tr>';
  });

  return `<tbody>${context}</tbody>`;
};

const genTable = (headers, bodies, styleObject) => {
  const tableStyle = styleToCss(styleObject.table);

  return `<table width="80%" style="${tableStyle}">${genTHeader(headers, styleObject.thead)}${genTBody(
    bodies,
    styleObject.tbody
  )}</table>`;
};

module.exports = {
  genTable,
};
