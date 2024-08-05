import jwt from "jsonwebtoken";

export const createToken = (data) => {
  let token = jwt.sign({ data: data }, "NODE_43", {
    algorithm: "HS256",
    expiresIn: "5m",
  });
  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, "NODE_43", (error) => {
    return error;
  });
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

export const middleWareToken = (req, res, next) => {
  next();
  // let { token } = req.headers;
  // let checkToken = verifyToken(token);
  // if (checkToken == null) {
  //   next();
  // } else {
  //   res.status(401).send("Authorized");
  // }
};
