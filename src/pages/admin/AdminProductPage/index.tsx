/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  Tag,
  Select,
  Upload,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { UploadFile } from "antd/es/upload/interface";
import { ProductWithVariantsSchema, type ProductWithVariants } from "../../../types/product";
import ProductVariantEditor from "../../../components/ProductVariantEditor";

const { TextArea } = Input;

const initData: ProductWithVariants[] = [
  {
    id: 1,
    name: "Áo thun",
    category: "Quần áo",
    price: 199000,
    oldPrice: 250000,
    description: "Áo thun cotton 100%",
    image: "https://via.placeholder.com/100",
    inStock: true,
    rating: 4,
    tags: ["hot", "new"],
    variants: [
      {
        color: "Đỏ",
        sizes: [
          { size: "S", quantity: 10 },
          { size: "M", quantity: 5 },
        ],
      },
    ],
  },
];

const AdminProductPage: React.FC = () => {
  const [products, setProducts] = useState<ProductWithVariants[]>(initData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithVariants | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  // Table columns
  const columns: ColumnsType<ProductWithVariants> = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Danh mục", dataIndex: "category", key: "category" },
    { title: "Giá", dataIndex: "price", key: "price", render: (v) => `${v.toLocaleString()} đ` },
    { title: "Tồn kho", dataIndex: "inStock", key: "inStock", render: (v) => v ? "✔" : "✖" },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => tags.map((tag) => <Tag key={tag}>{tag}</Tag>),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  // Lưu sản phẩm
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      // Validate bằng Zod
      ProductWithVariantsSchema.parse(values);

      if (editingProduct) {
        // Update
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...values, id: p.id } : p))
        );
        message.success("Cập nhật sản phẩm thành công");
      } else {
        // Create
        const newProduct: ProductWithVariants = { ...values, id: Date.now() };
        setProducts((prev) => [...prev, newProduct]);
        message.success("Thêm sản phẩm thành công");
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingProduct(null);
      setFileList([]);
    } catch (err: any) {
      message.error(err.errors?.[0]?.message || "Lỗi dữ liệu!");
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xóa sản phẩm?",
      onOk: () => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        message.success("Xóa thành công");
      },
    });
  };

  const handleEdit = (product: ProductWithVariants) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    form.setFieldsValue(product);
    setFileList(
      product.image
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: product.image,
            },
          ]
        : []
    );
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsModalOpen(true);
            setFileList([]);
          }}
        >
          Thêm sản phẩm
        </Button>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
          form.resetFields();
          setFileList([]);
        }}
        onOk={handleSave}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="oldPrice" label="Giá cũ">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <TextArea rows={3} />
          </Form.Item>

          {/* Upload ảnh */}
          <Form.Item name="image" label="Hình ảnh" rules={[{ required: true }]}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList: newFileList }) => {
                setFileList(newFileList);
                if (newFileList.length > 0) {
                  const file = newFileList[0];
                  const url =
                    file.url ||
                    (file.originFileObj ? URL.createObjectURL(file.originFileObj) : "");
                  form.setFieldValue("image", url);
                } else {
                  form.setFieldValue("image", "");
                }
              }}
              beforeUpload={() => false}
              onPreview={(file) => {
                const src =
                  file.url || (file.originFileObj ? URL.createObjectURL(file.originFileObj) : "");
                const img = new Image();
                img.src = src;
                const w = window.open(src);
                w?.document.write(img.outerHTML);
              }}
            >
              {fileList.length >= 1 ? null : "+ Upload"}
            </Upload>
          </Form.Item>

          <Form.Item name="inStock" label="Còn hàng" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select mode="tags" placeholder="Nhập tags" />
          </Form.Item>

          {/* Variants */}
          <ProductVariantEditor />
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProductPage;
