module.exports = jest.fn().mockImplementation((x, y) => {
  console.log('manual mock multiply');

  return x * y;
});
