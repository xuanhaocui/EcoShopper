const setError = (status, message, res, next) => {
  if (status >= 500) {
    console.log(message);
  }
  if (res.locals && res.locals.error) {
    res.locals.error.status = status;
    res.locals.error.errors.push(message);
  } else {
    res.locals.error = {
      status: status,
      errors: [message],
    };
  }
  handleError(null, res, next);
};
const errorConvert = (err, req, res, next) => {
  if (err) {
    res.locals.error = err;
  }
  handleError(req, res, next);
};

const handleError = (req, res, next) => {
  if (res.locals && res.locals.error) {
    const err = res.locals.error;
    if (err.errors) {
      const err_arr = Object.values(err.errors);
      if (err_arr[0].hasOwnProperty("properties")) {
        res.status(err.status || 400).send(
          err_arr
            .map((error) => {
              return error.properties.message;
            })
            .join("\n")
        );
      } else {
        res.status(err.status || 400).send(err_arr.join("\n"));
      }
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
};

const catchWrap =
  (func, status = null, message = null) =>
  (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((error) => {
      console.log(error);
      if (message) {
        setError(status, message, res, next);
      } else {
        errorConvert(error, req, res, next);
      }
    });
  };

export default handleError;
export { handleError, setError, catchWrap, errorConvert };
