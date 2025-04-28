import { useParams } from "react-router";

const ProductUpdate = () => {
  const { id } = useParams();

  return (
    <div className="">
      <h1 className="md:text-3xl sm:text-2xl text-xl font-semibold text-center">
        Update Product
      </h1>
      <EditProductForm productId={parseInt(id as string)} />
    </div>
  );
};


export default ProductUpdate;
