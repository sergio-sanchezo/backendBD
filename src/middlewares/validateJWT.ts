import express from "express";
import jwt from "jsonwebtoken";

export const validateJWT = (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  // x-token headers
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const payload: any = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED as string
    );
    const { iat, exp, ...payloadInfo } = payload;
    req.userInfo = payloadInfo;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
  next();
};
