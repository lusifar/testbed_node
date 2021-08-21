const express = require('express');

const { genTable } = require('./utilities/table');

const color0 = '#92b2ed';
const color1 = '#d3e0f8';
const color2 = '#888888';
const color3 = '#eeeeee';

const headers = ['Tool', 'Chamber', 'URL'];
const bodies = [
  ['AMEAE4', '#6', 'https://google.com.tw'],
  ['AMEAE6', '#1', 'http://yahoo.com'],
  ['AMEAE8', '#4', 'https://gamer.com'],
];
const styleObject = {
  table: {
    border: `1px solid ${color0}`,
    backgroundColor: `${color0}`,
  },
  thead: {
    th: {
      padding: '10px 0px',
      color: `${color1}`,
      backgroundColor: `${color0}`,
    },
  },
  tbody: {
    tdOdd: {
      textAlign: 'center',
      padding: '10px 0px',
      color: `${color0}`,
      backgroundColor: `${color1}`,
    },
    tdEven: {
      textAlign: 'center',
      padding: '10px 0px',
      color: `${color2}`,
      backgroundColor: `${color3}`,
    },
  },
};

console.log(genTable(headers, bodies, styleObject));

const app = express();

app.use(express.static('public'));

app.listen(3030, () => {
  console.log('express lives on 3030');
});
