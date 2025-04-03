import { Elysia, t } from "elysia";
import { ordersController } from "../controllers/orders.controller";

export const ordersRoute = new Elysia({ prefix: "/orders" })

  .post("/create", async ({body,set}) => {
    try {
      const order = await ordersController.CreateOrderAndQrcode(body);
      return order
    } catch (error) {
      set.status = 400;
      return {
        success : false,
        message : error.message,
      }
    }
  })
  