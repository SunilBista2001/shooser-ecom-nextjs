import { auth } from "@/lib/auth";
import { connectToMongoDB } from "@/lib/db";
import User from "@/models/user.model";

export const GET = async () => {
  const session = await auth();
  await connectToMongoDB();
  const owner = session?.user._id!;
  try {
    const user = await User.findOne({ _id: owner });

    return Response.json(user);
  } catch (error) {
    console.log(error, "error in getting cart");
  }
};
