import { db } from "../db.config";

export const productController = {
  getAllProducts: async () => {
    const result = await db.manyOrNone(
      "SELECT * FROM public.products ORDER BY id DESC"
    );
    return result;
  },
    getProductById: async (id,name) => {
        const result = await db.oneOrNone(
        "SELECT * FROM public.products WHERE id = $1",
        [id]
        );
        return result;
    },
    createProduct: async (body) =>{
      const {name,description,price,stock,} = body;
      const isExist = await db.manyOrNone(`
        SELECT * FROM public.products WHERE name = $1`,[name]);
        if(isExist.length > 0){
          throw new Error("สินค้านี้มีอยู่แล้ว");
        }

      const result = await db.one(`
        INSERT INTO public.products (name,discription,price,stock_quantity)
        VALUES ($1,$2,$3,$4) RETURNING *`,[
          name,
          description,
          price,
          stock
        ])
        return result;
    }
};
