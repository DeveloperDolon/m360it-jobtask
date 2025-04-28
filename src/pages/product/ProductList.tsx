
import ProductTable from "./ProductTable";

const ProductList = () => {
  return (
    <div>
      <h1 className="md:text-3xl sm:text-2xl text-xl font-semibold text-center pb-5">
        Product List
      </h1>
      <ProductTable />
    </div>
  );
};

export default ProductList;
