import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormAddEditProduct from "./form-add-edit-product";
import { useState } from "react";

export function FromDialogProduct({product}) {
  const [open,setOpen] = useState(false);
  const isEditing = !!product;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 hover:shadow-lg transition-all">
          เพิ่มสินค้าแบบ Dialog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
          <FormAddEditProduct product={product} closeDialog={()=>setOpen(false)}/>
      </DialogContent>
    </Dialog>
  );
}
