import { useParams } from "react-router";
import { useProductDetailsQuery } from "../../store/api/product.api";

const ProductUpdate = () => {
  const { id } = useParams();
  const { data } = useProductDetailsQuery(parseInt(id as string));
  console.log(data);
  return (
    <div>
      <h1 className="md:text-3xl sm:text-2xl text-xl font-semibold text-center">
        Update Product
      </h1>


    </div>
  );
};

export default ProductUpdate;

