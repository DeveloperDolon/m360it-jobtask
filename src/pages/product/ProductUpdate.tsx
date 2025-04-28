import { useParams } from "react-router";
import EditProductForm from "./EditProductForm";
import { message } from "antd";

const ProductUpdate = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  
  return (
    <div className="">
      {contextHolder}
      <h1 className="md:text-3xl sm:text-2xl text-xl font-semibold text-center">
        Update Product
      </h1>
      <EditProductForm
        productId={parseInt(id as string)}
        messageApi={messageApi}
      />
    </div>
  );
};

export default ProductUpdate;
