"use client";

import { addProductAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { readImgAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const AddProductModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const dataUrl = await readImgAsDataURL(file);
      setSelectedFile(dataUrl);
    }
  };

  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      selectedFile && (await addProductAction(formData, selectedFile));
    } catch (error) {
      console.log("error on client side", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Product</DialogTitle>
        <DialogDescription>Add a new product to your store</DialogDescription>
      </DialogHeader>
      <form className="space-y-4" onSubmit={addProduct}>
        <Input
          placeholder="Product Name"
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, name: e.target.value }))
          }
        />
        <Input
          placeholder="Product Price"
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, price: e.target.value }))
          }
        />
        <Input
          placeholder="Product Description"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              description: e.target.value,
            }))
          }
        />

        {/* @ts-ignore */}
        <Input type="file" onClick={handleFileChange} />

        <div className="flex justify-end items-center gap-x-4">
          <Button variant={"destructive"}>Cancel</Button>
          <Button type="submit" variant={"default"}>
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Add Product</>
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default AddProductModal;
