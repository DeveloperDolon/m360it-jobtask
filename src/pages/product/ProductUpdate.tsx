import { useParams } from "react-router";
import { useProductDetailsQuery } from "../../store/api/product.api";
import { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  InputNumber, 
  Button, 
  Select, 
  Space, 
  Divider, 
  Card,
  Upload,
  message 
} from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Product } from "../../types";
import { useCategoryListQuery } from "../../store/api/category.api";

const { TextArea } = Input;
const { Option } = Select;

const ProductUpdate = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1 className="md:text-3xl sm:text-2xl text-xl font-semibold text-center">
        Update Product
      </h1>
        <EditProductForm productId={parseInt(id as string)} />
    </div>
  );
};

const EditProductForm = ({ productId }: { productId: number }) => {
    const [form] = Form.useForm<Product>();
  const [loading, setLoading] = useState(false);

  // RTK Query hooks
  const { data: product, isLoading: isProductLoading } = useProductDetailsQuery(productId);
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategoryListQuery(1);
  const [updateProduct] = useUpdateProductMutation();

  // Set form values when product data is loaded
  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  // Handle image upload (mock implementation)
  const uploadProps: UploadProps = {
    name: 'image',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleSubmit = async (values: Product) => {
    try {
      setLoading(true);
      console.log('Submitting:', values);
      
      // Prepare the payload for PATCH request
      const payload = {
        ...values,
        id: productId
      };

      // Use RTK Query mutation to update product
      await updateProduct(payload).unwrap();
      
      message.success('Product updated successfully');
    } catch (error) {
      console.error('Update failed:', error);
      message.error('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (isProductLoading) return <div>Loading product...</div>;

  return (
    <Card title="Edit Product" loading={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={product}
      >
        {/* Basic Information */}
        <Divider orientation="left">Basic Information</Divider>
        <Form.Item
          name="title"
          label="Product Title"
          rules={[{ required: true, message: 'Please enter product title' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select category' }]}
        >
          <Select placeholder="Select category">
            {categories.map(category => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: 'Please enter brand' }]}
        >
          <Input />
        </Form.Item>

        {/* Pricing & Stock */}
        <Divider orientation="left">Pricing & Stock</Divider>
        <Space size="large">
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber min={0} precision={2} />
          </Form.Item>

          <Form.Item
            name="discountPercentage"
            label="Discount (%)"
          >
            <InputNumber min={0} max={100} precision={2} />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Space>

        {/* Images */}
        <Divider orientation="left">Images</Divider>
        <Form.Item name="thumbnail" label="Thumbnail URL">
          <Input />
        </Form.Item>

        <Form.Item name="images" label="Additional Images">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload Images</Button>
          </Upload>
        </Form.Item>

        {/* Dimensions */}
        <Divider orientation="left">Dimensions</Divider>
        <Space size="large">
          <Form.Item name={['dimensions', 'width']} label="Width (cm)">
            <InputNumber min={0} precision={2} />
          </Form.Item>

          <Form.Item name={['dimensions', 'height']} label="Height (cm)">
            <InputNumber min={0} precision={2} />
          </Form.Item>

          <Form.Item name={['dimensions', 'depth']} label="Depth (cm)">
            <InputNumber min={0} precision={2} />
          </Form.Item>
        </Space>

        {/* Reviews */}
        <Divider orientation="left">Reviews</Divider>
        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'rating']}
                    label="Rating"
                    rules={[{ required: true, message: 'Missing rating' }]}
                  >
                    <InputNumber min={1} max={5} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'comment']}
                    label="Comment"
                    rules={[{ required: true, message: 'Missing comment' }]}
                  >
                    <Input placeholder="Comment" />
                  </Form.Item>

                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Review
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Other Information */}
        <Divider orientation="left">Other Information</Divider>
        <Form.Item name="tags" label="Tags">
          <Select mode="tags" placeholder="Add tags" />
        </Form.Item>

        <Form.Item name="sku" label="SKU">
          <Input />
        </Form.Item>

        <Form.Item name="weight" label="Weight (kg)">
          <InputNumber min={0} precision={2} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductUpdate;

