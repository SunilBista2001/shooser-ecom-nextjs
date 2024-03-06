"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import Product, { IProductDocument } from "./models/product.model";
import { connectToMongoDB } from "./lib/db";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const logoutOaction = async () => {
  await signOut();
};

export const loginAction = async () => {
  await signIn();
};

export const addProductAction = async (product: any, image: string) => {
  try {
    const session = await auth();
    if (!session) return;

    await connectToMongoDB();

    const imgResponse = await cloudinary.uploader.upload(image);

    const newProduct = await Product.create({
      ...product,
      coverImg: imgResponse?.secure_url,
    } as IProductDocument);

    await newProduct.save();

    return Response.json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
  }
};
