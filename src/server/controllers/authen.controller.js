import { db } from "../db.config";
import bcrypt from "bcryptjs"; // ❗ แก้ไขการนำเข้า bcrypt

export const authenController = {
  register: async (body) => {
    try {
      // ✅ ดึงค่าจาก body
      const { email, password, fullname } = body;

      // ตรวจสอบว่ามีผู้ใช้ที่ลงทะเบียนด้วยอีเมลนี้หรือไม่
      const exitedUser = await db.oneOrNone(
        "SELECT id FROM public.users WHERE email = $1",
        [email]
      );

      if (exitedUser) {
        throw new Error("อีเมลนี้มีผู้ใช้งานแล้ว");
      }

      // เข้ารหัสรหัสผ่าน
      const passwordHash = bcrypt.hashSync(password, 10);

      // สร้างผู้ใช้งานใหม่
      const result = await db.one(
        "INSERT INTO public.users(email, password_hash, full_name) VALUES($1, $2, $3) RETURNING *",
        [email, passwordHash, fullname]
      );
      return result;
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  login: async (body) => {
    try {
      const { email, password } = body;

      // ค้นหาผู้ใช้งานด้วยอีเมล
      const user = await db.oneOrNone(
        "SELECT * FROM public.users WHERE email = $1",
        [email]
      );
      if (!user) {
        throw new Error("ไม่พบผู้ใช้งานนี้");
      }

      const validatePassword = bcrypt.compareSync(password, user.password_hash);
      if (!validatePassword) {
        throw new Error("รหัสผ่านไม่ถูกต้อง");
      }

        return user;

    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
};
