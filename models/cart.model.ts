import mongoose, { Model, PopulatedDoc, Types } from "mongoose";

interface ICart {
  owner: mongoose.Schema.Types.ObjectId;

  products: [
    {
      productId: mongoose.Schema.Types.ObjectId;
      quantity: number;
      name: string;
      price: number;
    }
  ];

  bill: number;
}

export interface ICartDocument extends ICart, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        name: String,
        price: Number,
      },
    ],
    bill: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart: Model<ICartDocument> =
  mongoose.models.Cart || mongoose.model<ICartDocument>("Cart", cartSchema);

export default Cart;
