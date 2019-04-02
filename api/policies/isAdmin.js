module.exports = async function (req, res, proceed) {
  console.log(req.session.role);
  if (req.session.role=='Admin') {
    return proceed();
  }
  return res.forbidden();
};


