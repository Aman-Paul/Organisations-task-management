const { AnonmyousError } = require("../errors");

const validator = (schema, property) => {
  return (req, res, next) => {
    console.log(typeof req[property].questionAndAnswers);
    console.log(req.property);
    const { error } = schema.validate({...req[property]});
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      throw new AnonmyousError(message, 422);
    }
  };
};

module.exports = validator; 