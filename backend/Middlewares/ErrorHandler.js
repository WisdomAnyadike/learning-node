const ErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case 400:
      res.send({
        message: err.message,
        status: "false",
        title: "Validation Error",
      });
      break;
    case 401:
      res.send({
        message: err.message,
        status: "false",
        title: "UnAuthorised Access",
      });
      break;
    case 404:
      res.send({ message: err.message, status: "false", title: "Not Found" });
      break;
    case 500:
      res.send({
        message: err.message,
        status: "false",
        title: "server error",
      });
      break;

    default:
        console.log("no errors , working tree clean");
      break;
  }
};

module.exports = ErrorHandler
