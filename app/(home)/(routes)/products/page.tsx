import Heading from "@/components/shared/Heading";
import ProductsList from "@/components/shared/ProductsList";
import { getProducts } from "@/data";
import { auth } from "@/lib/auth";
import { IProductDocument } from "@/models/product.model";

const ProductPage = async () => {
  const products: IProductDocument[] | undefined = await getProducts();

  return (
    <div className="flex flex-col py-6 sm:py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-28">
      <Heading
        title={`Products (${products?.length})`}
        description="Explore all products from around the world"
      />
      <ProductsList products={products} />
    </div>
  );
};

export default ProductPage;
