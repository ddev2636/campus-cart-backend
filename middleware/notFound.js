const notFoundMiddleware = (req, res) => {
  res.send("Route can not be found");
};

export default notFoundMiddleware;
