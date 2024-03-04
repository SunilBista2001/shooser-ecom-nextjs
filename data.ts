import { auth } from "./lib/auth";
import Cart, { ICartDocument } from "./models/cart.model";
import Product, { IProductDocument } from "./models/product.model";

export const getProducts = async () => {
  try {
    const products: IProductDocument[] = await Product.find();
    return products;
  } catch (error) {
    console.log("error");
  }
};

export const getCart = async () => {
  try {
    const session = await auth();
    const owner = session?.user._id!;
    const cart: ICartDocument | null = await Cart.findOne({ owner });

    if (!cart) {
      return new Response("Cart not found", { status: 404 });
    }

    return cart;
  } catch (error) {
    console.log(error, "error in getting cart");
  }
};
