import { auth } from "@/lib/auth";
import { connectToMongoDB } from "@/lib/db";
import Product from "@/models/product.model";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  try {
    await connectToMongoDB();
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const product = await Product.findById(id);
    if (!product) {
      return new Response("Not Found", { status: 404 });
    }

    return Response.json(product);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
