import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <ProductList
        data={sampleData.products}
        title="Featured Products"
        limit={4}
      />
    </div>
  );
};

export default Homepage;
