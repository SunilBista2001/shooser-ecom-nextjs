import ProductCardSkeleton from "@/components/shared/skeletons/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const ProductLoading = () => {
  return (
    <div className="flex flex-col py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-10 w-52" />
        <Skeleton className="h-4 w-80" />
      </div>
      <Skeleton className="h-10 w-28 mt-8 sm:mt-10 mb-4 sm:mb-6 rounded-full" />

      <ProductCardSkeleton />
    </div>
  );
};

export default ProductLoading;
