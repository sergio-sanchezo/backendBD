import jwt from "jsonwebtoken";

export const generarJWT = (user: any) => {
  return new Promise((resolve, reject) => {
    const payload = { ...user };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED as string,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};
