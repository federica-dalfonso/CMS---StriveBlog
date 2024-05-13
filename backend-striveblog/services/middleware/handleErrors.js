export const badRequestHandler = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send({
            success: false,
            message: err.message, 
            errorList: err.errorList,
        })
    } else {
        next(err);
    }
};

export const notFoundHandler = (err, req, res, next) => { 
    if (err.status === 404) {
        res.status(404).send({
            success: false,
            message: err.message,
            errorList: err.errorList,
        })
    } else {
        next(err);
    }
};

export const notAuthorizedError = (err, req, res, next) => {
    if (err.status === 401) {
        res.status(401).send({ 
            success: false,
            message: err.message,
            errorList: err.errorList,
        })
      } else {
        next(err)
      }
}

export const invalidFIleError = (err, req, res, next) => {
    if (err.code === "INVALID_FILE_TYPE") {
        res.status(400).send({
            success: false,
            message: err.message,
            errorList: err.errorList,
        });
    } else {
        next(err);
    }
};

export const genericError = (err, req, res, next) => {
    console.log("ERROR:", err)
  res.status(500)
    .send({
        success: false,
        message: "Something get wrong. We are working on!",
    })
}