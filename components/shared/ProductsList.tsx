import ProductCard from "@/components/shared/cards/ProductCard";
import { IProductDocument } from "@/models/product.model";

const ProductsList = ({
  products,
}: {
  products: IProductDocument[] | undefined;
}) => {
  return (
    <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name!}
          id={product._id}
          description={product.description!}
          price={product.price!}
        />
      ))}
    </div>
  );
};

export default ProductsList;
