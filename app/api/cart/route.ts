import { auth } from "@/lib/auth";
import { connectToMongoDB } from "@/lib/db";
import Cart from "@/models/cart.model";
import Product from "@/models/product.model";
import { error } from "console";

export const POST = async (request: Request | null) => {
  try {
    const session = await auth();
    await connectToMongoDB();
    if (!session) return;

    const owner = session.user._id!;

    const { productId, quantity } = await request?.json();

    const cart = await Cart.findOne({ owner }).populate("products");
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    const price = product.price as number;
    const name = product.name as string;

    // If cart exists, update the cart
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.name === product.name
      );

      // If product exists in the cart, update the quantity
      if (productIndex !== -1) {
        // cart.products[productIndex].quantity += quantity;
        // cart.bill = cart.products.reduce((acc, curr) => {
        //   // @ts-ignore
        //   return acc + curr.quantity * curr.price;
        // }, 0);
        // await cart.save();
        // return Response.json(cart);

        throw new Error("Product already exists in the cart");
      } else {
        cart.products.push({ productId: productId, quantity, price, name });
        cart.bill = cart.products.reduce((acc, curr) => {
          // @ts-ignore
          return acc + curr.quantity * curr.price;
        }, 0);

        await cart.save();
        return Response.json(cart);
      }
    } else {
      // If cart does not exist, create a new cart
      const newCart = await Cart.create({
        owner,
        products: [{ productId, quantity, price, name }],
        bill: quantity * price,
      });

      return Response.json(newCart);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in adding product to cart");
  }
};

export const GET = async () => {
  const session = await auth();
  await connectToMongoDB();
  const owner = session?.user._id!;
  try {
    const cart = await Cart.findOne({ owner });

    if (!cart) {
      return new Response("Cart not found", { status: 404 });
    }

    return Response.json(cart);
  } catch (error) {
    console.log(error, "error in getting cart");
  }
};

export const DELETE = async () => {
  await connectToMongoDB();
  const session = await auth();
  const owner = session?.user._id!;

  if (!session) return;

  try {
    let cart = await Cart.findOneAndDelete({ owner });

    if (!cart) {
      return new Response("Cart not found", { status: 404 });
    }

    cart = await cart.save();

    return Response.json(cart);
  } catch (error) {
    return Response.json("Error in deleting cart");
  }
};
