import { auth } from "@/lib/auth";
import { connectToMongoDB } from "@/lib/db";
import Cart from "@/models/cart.model";
import Product from "@/models/product.model";

export const DELETE = async (
  request: Request,
  context: { params: { id: string } }
): Promise<Response> => {
  await connectToMongoDB();
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const owner = session.user._id!;
    const productId = context.params.id;

    const product = await Product.findOne({ _id: productId });
    const cart = await Cart.findOne({ owner });

    if (!cart) {
      return new Response("Cart not found", { status: 404 });
    }

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.name === product?.name
    );

    if (productIndex === -1) {
      return new Response("Product not found in the cart", { status: 404 });
    }

    cart.products.splice(productIndex, 1);

    cart.bill = cart.products.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);

    await cart.save();

    return new Response("Product deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error in deleting product from cart:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
