import mongoose, { Model } from "mongoose";

interface IProduct {
  name: string | null;
  price: number | null;
  description: string | null;
  category?: string | null;
  coverImg?: string;
}

export interface IProductDocument extends IProduct, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProductDocument> =
  mongoose.models.Product ||
  mongoose.model<IProductDocument>("Product", productSchema);

export default Product;
