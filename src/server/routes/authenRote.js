import { Elysia, t } from "elysia";
import { authenController } from "../controllers/authen.controller";

export const authenRoute = new Elysia({ prefix: "/authen" }).post(
  "register",
  ({ body, set }) => {
    const register = authenController.register(body);

    if (!register) {
      return {
        message: "เกิดข้อผิดพลาดในการสมัครสมาชิก",
      };
    }

    if (register.error) {
      set.status = 400;
      return {
        message: register.message,
        error: true,
      };
    }

    return register;
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      fullname: t.String(),
    }),
  }
).post("login", async ({ body,set}) => {
  const checkLogin = await authenController.login(body);
  if(checkLogin.error){
    set.status = 400;
    return {
      message: checkLogin.message,
      error: true,
    };
  }
  return checkLogin;
},{
  body: t.Object({
    email: t.String(),
    password: t.String(),
  }),
});
