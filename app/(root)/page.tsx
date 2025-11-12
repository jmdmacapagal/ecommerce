import ProductList from "@/components/shared/product/product-list";

import { getLatestProducts } from "@/lib/actions/product.actions";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <ProductList data={latestProducts} title="Featured Products" limit={4} />
    </div>
  );
};

export default Homepage;
