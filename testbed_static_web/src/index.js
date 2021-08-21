const express = require('express');

const { genTable } = require('./utilities/table');

const color0 = '#92b2ed';
const color1 = '#d3e0f8';
const color2 = '#888888';
const color3 = '#eeeeee';
const padding = '5px 0';
const shadow = '3px 3px 6px silver';
const radius = '5px';

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
    boxShadow: `${shadow}`,
    borderRadius: `${radius}`,
  },
  thead: {
    th: {
      padding: `${padding}`,
      color: `${color1}`,
      backgroundColor: `${color0}`,
    },
    thTopLeft: {
      padding: `${padding}`,
      color: `${color1}`,
      backgroundColor: `${color0}`,
      borderTopLeftRadius: `${radius}`,
    },
    thTopRight: {
      padding: `${padding}`,
      color: `${color1}`,
      backgroundColor: `${color0}`,
      borderTopRightRadius: `${radius}`,
    },
  },
  tbody: {
    tdOdd: {
      textAlign: 'center',
      padding: `${padding}`,
      color: `${color0}`,
      backgroundColor: `${color1}`,
    },
    tdOddBottomLeft: {
      textAlign: 'center',
      padding: `${padding}`,
      color: `${color0}`,
      backgroundColor: `${color1}`,
      borderBottomLeftRadius: `${radius}`,
    },
    tdOddBottomRight: {
      textAlign: 'center',
      padding: `${padding}`,
      color: `${color0}`,
      backgroundColor: `${color1}`,
      borderBottomRightRadius: `${radius}`,
    },
    tdEven: {
      textAlign: 'center',
      padding: `${padding}`,
      color: `${color2}`,
      backgroundColor: `${color3}`,
    },
    tdEvenBottomLeft: {
      textAlign: 'center',
      padding: `${padding}`,
      color: `${color2}`,
      backgroundColor: `${color3}`,
      borderBottomLeftRadius: `${radius}`,
    },
    tdEvenBottomRight: {
      textAlign: 'center',
      padding: `${padding}`,
      color: `${color2}`,
      backgroundColor: `${color3}`,
      borderBottomRightRadius: `${radius}`,
    },
  },
};

console.log(genTable(headers, bodies, styleObject));

const app = express();

app.use(express.static('public'));

app.listen(3030, () => {
  console.log('express lives on 3030');
});
