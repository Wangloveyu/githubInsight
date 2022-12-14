const user = require("../models/user");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const CheckUser = asyncWrapper(async (req, res, next) => {
  const OldUser = await user.findOne({ email: req.body.email });
  console.log(req.body);
  if (!OldUser) {
    return next(createCustomError(`Email is not registered`, 404));
  } else if (OldUser.password == req.body.password) {
    return res.status(200).json({
      name: OldUser.username,
    });
  } else {
    return next(createCustomError(`Wrong password`, 404));
  }
});

const CreateUser = asyncWrapper(async (req, res, next) => {
  try {
    const user_name = await user.findOne({ username: req.body.username });
    const user_email = await user.findOne({ email: req.body.email });
    if (!user_name && !user_email) {
      const new_user = await user.create(req.body);
      res.status(201).json({
        name: new_user.username,
      });
    } else return next(createCustomError(`User already exists`, 404));
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

module.exports = {
  CheckUser,
  CreateUser,
};
