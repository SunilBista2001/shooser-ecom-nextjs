import Banner from "@/components/shared/Banner";
import Products from "@/components/shared/Products";

export default function Home() {
  return (
    <main>
      <Banner />
      <div className="max-w-7xl mx-auto">
        <Products />
      </div>
    </main>
  );
}
