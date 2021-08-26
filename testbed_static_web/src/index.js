const express = require('express');

// const { genTable } = require('./utilities/table');

// const color0 = '#92b2ed';
// const color1 = '#d3e0f8';
// const color2 = '#888888';
// const color3 = '#eeeeee';
// const padding = '5px 0';
// const shadow = `0px 5px 0px #92b2ed, 0px 5px 5px gray;`;
// const radius = '8px';

// const headers = ['Tool', 'Chamber', 'URL'];
// const bodies = [
//   ['AMEAE4', '#6', 'https://google.com.tw'],
//   ['AMEAE6', '#1', 'http://yahoo.com'],
//   ['AMEAE8', '#4', 'https://gamer.com'],
// ];
// const styleObject = {
//   table: {
//     borderCollapse: 'collapse',
//     backgroundColor: `${color0}`,
//     boxShadow: `${shadow}`,
//     borderRadius: `${radius}`,
//   },
//   thead: {
//     th: {
//       padding: `${padding}`,
//       color: `${color1}`,
//       backgroundColor: `${color0}`,
//     },
//     thTopLeft: {
//       padding: `${padding}`,
//       color: `${color1}`,
//       backgroundColor: `${color0}`,
//       borderTopLeftRadius: `${radius}`,
//     },
//     thTopRight: {
//       padding: `${padding}`,
//       color: `${color1}`,
//       backgroundColor: `${color0}`,
//       borderTopRightRadius: `${radius}`,
//     },
//   },
//   tbody: {
//     tdOdd: {
//       textAlign: 'center',
//       padding: `${padding}`,
//       color: `${color0}`,
//       backgroundColor: `${color1}`,
//     },
//     tdOddBottomLeft: {
//       textAlign: 'center',
//       padding: `${padding}`,
//       color: `${color0}`,
//       backgroundColor: `${color1}`,
//       borderBottomLeftRadius: `${radius}`,
//     },
//     tdOddBottomRight: {
//       textAlign: 'center',
//       padding: `${padding}`,
//       color: `${color0}`,
//       backgroundColor: `${color1}`,
//       borderBottomRightRadius: `${radius}`,
//     },
//     tdEven: {
//       textAlign: 'center',
//       padding: `${padding}`,
//       color: `${color2}`,
//       backgroundColor: `${color3}`,
//     },
//     tdEvenBottomLeft: {
//       textAlign: 'center',
//       padding: `${padding}`,
//       color: `${color2}`,
//       backgroundColor: `${color3}`,
//       borderBottomLeftRadius: `${radius}`,
//     },
//     tdEvenBottomRight: {
//       textAlign: 'center',
//       padding: `${padding}`,
//       color: `${color2}`,
//       backgroundColor: `${color3}`,
//       borderBottomRightRadius: `${radius}`,
//     },
//   },
// };

// console.log(genTable(headers, bodies, styleObject));

// const { genInfoMessage, genErrorMessage } = require('./utilities/message');

// console.log(genInfoMessage('DMON_PA(AMEAE4, #4) is on 前量'));

// console.log(genErrorMessage('PA SPC Packing is Faulted'));

const { genButtonList } = require('./utilities/button');

const textList = ['&#127538; (AMEAE4,#4)', '&#127538; (AMEAE4,#4)', '&#127538; (AMEAE4,#4)'];
const hrefList = [
  'http://localhost:3030/api/button/click?command=workflow&subcommand=dailyDefectMaintain&toolId=AMEAE4&chamberId=#4',
  'http://localhost:3030/api/button/click?command=workflow&subcommand=dailyDefectMaintain&toolId=AMEAE4&chamberId=#4',
  'http://localhost:3030/api/button/click?command=workflow&subcommand=dailyDefectMaintain&toolId=AMEAE4&chamberId=#4',
];

console.log(genButtonList('rgb(45, 91, 185)', 'rgb(194, 209, 240)', textList, hrefList));

const app = express();

app.use(express.static('public'));

app.get('/api/button/click', async (req, res) => {
  const query = req.query;
  console.log(query);
});

app.listen(3030, () => {
  console.log('express lives on 3030');
});
