"use client";

import Info from "@/components/shared/Info";
import Gallery from "@/components/shared/gallery/Gallery";
import { IProductDocument } from "@/models/product.model";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductIdPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProductDocument | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`/api/product/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        setProduct(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="p-4 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-28">
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:items-start md:gap-x-20 lg:gap-x-36">
        <Gallery img={product?.coverImg!} />
        <Info
          id={product?._id!}
          name={product?.name!}
          description={product?.description!}
          price={product?.price!}
        />
      </div>
    </div>
  );
};

export default ProductIdPage;
