import ProductCard from "@/components/shared/cards/ProductCard";
import { getProducts } from "@/data";
import { auth } from "@/lib/auth";

const PopularProducts = async () => {
  const session = await auth();
  const products = session?.user ? await getProducts() : [];

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Simulate loading
  await sleep(3000);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          price={product.price!}
          name={product.name!}
          description={product.description!}
        />
      ))}
    </div>
  );
};

export default PopularProducts;
