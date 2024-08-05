import { response } from "express";
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { send } from "process";
import { sendMail } from "../config/mail.js";
import { createToken } from "../config/jwt.js";

const model = initModels(sequelize);

const signUp = async (req, res) => {
  let { full_name, email, pass_word } = req.body;
  let checkEmail = await model.users.findOne({
    where: {
      email,
    },
  });
  if (checkEmail) {
    responseData("", "Email already exists", 409, res);
    return;
  }
  let newData = {
    full_name,
    email,
    avatar: "",
    pass_word: bcrypt.hashSync(pass_word, 10),
    face_app_id: "",
    role: "USER",
    refresh_token: "",
  };
  await model.users.create(newData);
  responseData("", "sign up successfully", 200, res);
};

const login = async (req, res) => {
  let { email, pass_word } = req.body;
  let checkEmail = await model.users.findOne({
    where: {
      email,
    },
  });
  if (checkEmail) {
    if (bcrypt.compareSync(pass_word, checkEmail.pass_word)) {
      let token = createToken({ userId: checkEmail.dataValues.user_id });
      responseData(token, "login successfully", 200, res);
    } else {
      responseData("", "wrong password", 403, res);
    }
  } else {
    responseData("", "wrong email", 403, res);
  }
};

const loginFacebook = async (req, res) => {
  let { id, name, email } = req.body;
  //check face_app_id
  let checkUser = await model.users.findOne({
    where: {
      face_app_id: id,
    },
  });
  if (!checkUser) {
    let newData = {
      full_name: name,
      email: email,
      avatar: "",
      pass_word: "",
      face_app_id: id,
      role: "USER",
      refresh_token: "",
    };
    await model.users.create(newData);
  }
  let token = createToken({ userId: checkUser.dataValues.user_id });
  responseData(token, "login successfully", 200, res);
};

const forgetCheckEmail = async (req, res) => {
  let { email } = req.body;

  let checkEmail = await model.users.findOne({
    where: {
      email,
    },
  });

  if (checkEmail) {
    let randomCode = crypto.randomBytes(5).toString("hex");
    let newCode = {
      code: randomCode,
      expired: new Date(new Date().getTime() + 10 * 6000),
    };
    await model.code.create(newCode);

    sendMail(
      "phieulinh341@gmail.com",
      "Mã xác thực",
      `Mã reset password của bạn là: ${randomCode}`
    );

    responseData("", "Đổi mật khẩu thành công", 200, res);
  } else {
    responseData("", "Email không đúng", 403, res);
  }
};

const forgetCheckCode = async (req, res) => {
  let { code } = req.body;

  let checkCode = await model.code.findOne({
    where: {
      code,
    },
  });

  if (checkCode) {
    await model.code.destroy({
      where: { id: checkCode.dataValues.id },
    });

    responseData("", "Thành công", 200, res);
  } else {
    responseData("", "Code không đúng", 403, res);
  }
};

export { signUp, login, loginFacebook, forgetCheckEmail, forgetCheckCode };
