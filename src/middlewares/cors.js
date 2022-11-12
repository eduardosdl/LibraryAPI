module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Max-Age', '10');
  next();
};
