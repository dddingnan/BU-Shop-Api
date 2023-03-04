const userStatus = {
  true: 1,
  false: 0,
};

const productStatus = {
  opened: 1,
  closed: 0,
};

const orderStatus = {
  inProcess: 0,
  inTransit: 1,
  completed: 2,
  canceled: 3,
};

module.exports = { userStatus, productStatus, orderStatus };
