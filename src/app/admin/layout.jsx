import AppSidebar from "@/components/admin/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const adminMenu = [
  { title: "Dashboard", url: "/admin" },
  { title: "จัดการสินค้า", url: "/admin/products" },
  { title: "จัดการลูกค้า", url: "/admin/users" },
  { title: "จัดการคำสั่งซื้อ", url: "/admin/orders" },
];

const AdminLayout = ({ children }) => {
  return (
    <div className="container my-4 mx-auto flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6 rounded-lg shadow-md">
        <ul className="space-y-4">
          {adminMenu.map((menu) => (
            <li key={menu.title}>
              <a
                href={menu.url}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-md transition"
              >
                {menu.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg ml-4">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
