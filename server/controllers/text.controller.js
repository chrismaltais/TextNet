exports.determineQuery = function(req, res, next) {
  var response = req.body;
  res.json(response);
};

exports.showSomething = function(req, res, next) {
  res.json({ name: "john doe" });
};
