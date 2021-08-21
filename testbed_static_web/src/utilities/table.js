const styleToCss = require('style-object-to-css-string');

const genTHeader = (headers, styleObject) => {
  const thStyle = styleToCss(styleObject.th);

  let context = '';
  headers.forEach((header) => {
    context = context + `<th style="${thStyle}">${header}</th>`;
  });

  return `<thead><tr>${context}</tr></thead>`;
};

const genTBody = (bodies, styleObject) => {
  const tdOddStyle = styleToCss(styleObject.tdOdd);
  const tdEvenStyle = styleToCss(styleObject.tdEven);

  let context = '';
  bodies.forEach((items, index) => {
    context = context + `<tr>`;
    items.forEach((item) => {
      context = context + `<td style="${index % 2 == 0 ? tdEvenStyle : tdOddStyle}">${item}</td>`;
    });
    context = context + '</tr>';
  });

  return `<tbody>${context}</tbody>`;
};

const genTable = (headers, bodies, styleObject) => {
  const tableStyle = styleToCss(styleObject.table);

  return `<table width="100%" style="${tableStyle}">${genTHeader(headers, styleObject.thead)}${genTBody(
    bodies,
    styleObject.tbody
  )}</table>`;
};

module.exports = {
  genTable,
};
