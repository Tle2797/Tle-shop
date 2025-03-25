import { Elysia, t } from "elysia";
import { productController } from "../controllers/product.controller";

export const productsRoute = new Elysia({ prefix: "/products" })

  .get("/", async () => {
    try {
      const products = await productController.getAllProducts();
      return {
        message: "success",
        products,
      };
    } catch (error) {
      return { message: error.message || "เกิดข้อผิดพลาดในการดึงข้อมูล" };
    }
  })
  .get(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      try {
        const product = await productController.getProductById(id);
        return {
          message: "success",
          product,
        };
      } catch (error) {
        return { message: error.message || "เกิดข้อผิดพลาดในการดึงข้อมูล" };
      }
    },
  )
  .get("/search", () => {})
  .post("/createProduct",async ({body,set})=>{
    console.log("🚀 ~ .post ~ body:", body)
    try {
      const create = await productController.createProduct(body);
      return {
        message:"สร้างสินค้าสำเร็จ",
        product:create
      }
    } catch (error) {
      console.log("🚀 ~ .post ~ error:", error)
      set.status=400;
      return {message:error.message || "เกิดข้อผิดพลาดในการสร้างสินค้า"}
    }

  })
  .post("/updateProduct", () => {})
  .delete("deleteProduct", () => {});
