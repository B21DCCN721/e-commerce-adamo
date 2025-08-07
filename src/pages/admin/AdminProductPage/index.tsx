import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input, InputNumber, Switch, Tag, message, Popconfirm, Drawer, Image, Descriptions, Divider, Row, Col, Upload, type UploadProps, type GetProp, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CheckOutlined, CloseOutlined, FileExcelOutlined, LoadingOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import type { ProductWithVariants } from "../../../types/product";
import {
  getListProductWithVariants,
  deleteProduct
} from "../../../services/productService";
import { beforeUpload, getBase64 } from "../../../utils/handleUploadImg";
import exportToExcel from "../../../utils/exportToExcel";
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductWithVariants[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithVariants | null>(null);
  const [loadingImgProduct, setLoadingImgProduct] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithVariants | null>(null);
  const [form] = Form.useForm<ProductWithVariants>();

  // Fetch product list
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getListProductWithVariants();
      setProducts(data);
    } catch {
      message.error("Lỗi tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Drawer
  const handleOpenDrawer = (product: ProductWithVariants) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  // Modal
  const handleOpenModal = (product?: ProductWithVariants) => {
    if (product) {
      setEditingProduct(product);
      form.setFieldsValue(product);
    } else {
      setEditingProduct(null);
      form.resetFields();
      // Gán mặc định 1 biến thể với 1 size khi thêm mới
      form.setFieldsValue({
        variants: [
          {
            color: "",
            sizes: [
              {
                size: "M",
                quantity: 0,
              },
            ],
          },
        ],
      });
    }
    setIsModalOpen(true);
  };


  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      message.success("Xóa sản phẩm thành công");
      fetchProducts();
    } catch {
      message.error("Lỗi khi xóa sản phẩm");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        console.log('thong tin san pham admin product page', values);
        message.success("Cập nhật sản phẩm thành công");
      } else {
        console.log('thong tin san pham admin product page', values);
        message.success("Thêm sản phẩm thành công");
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnsType<ProductWithVariants> = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 350,
      render: (_, record) => (
        <p>{record.name}</p>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Danh mục", dataIndex: "category", key: "category", width: 120,
      filters: [
        { text: "Áo", value: 'Áo' },
        { text: "Quần", value: 'Quần' },
        { text: "Giày", value: 'Giày' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Giá",
      key: "price",
      width: 160,
      render: (_, record) => (
        <>
          {record.price.toLocaleString()} đ
          {record.oldPrice && (
            <span style={{ textDecoration: "line-through", color: "#999", marginLeft: 8 }}>
              {record.oldPrice.toLocaleString()} đ
            </span>
          )}
        </>
      ),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Còn hàng", dataIndex: "inStock", key: "inStock",
      render: (v) => (v ? <CheckOutlined style={{ color: '#36c740ff' }} /> : <CloseOutlined style={{ color: '#FF0000' }} />),
      width: 130,
      align: 'center',
      filters: [
        { text: "Còn hàng", value: true },
        { text: "Hết hàng", value: false },
      ],
      onFilter: (value, record) => record.inStock === value,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleOpenDrawer(record)}>
            Chi tiết
          </Button>
          <Button type="link" onClick={() => handleOpenModal(record)}>Sửa</Button>
          <Popconfirm
            title="Xóa sản phẩm?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleUploadImgProduct: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoadingImgProduct(false);
        setImageUrl(url);
        // Gán avatar base64 vào form
        form.setFieldsValue({ image: url });
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loadingImgProduct ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  // xuất file excel
  const handleExport = () => {
    exportToExcel(products, "san-pham.xlsx");
  };
  return (
    <>
      <Button type="primary" style={{ marginBottom: 16, marginRight: 8 }} onClick={() => handleOpenModal()}>
        Thêm sản phẩm
      </Button>
      <Button style={{ marginBottom: 16 }} color="cyan" variant="outlined" icon={<FileExcelOutlined />}
        iconPosition="end" onClick={handleExport}>
        Xuất file excel
      </Button>
      <Table<ProductWithVariants>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 10 }}
      />

      {/* Drawer chi tiết */}
      <Drawer
        title="Chi tiết sản phẩm"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={600}
      >
        {selectedProduct && (
          <>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Tên">{selectedProduct.name}</Descriptions.Item>
              <Descriptions.Item label="Danh mục">{selectedProduct.category}</Descriptions.Item>
              <Descriptions.Item label="Giá">
                {selectedProduct.price.toLocaleString()} đ
              </Descriptions.Item>
              {selectedProduct.oldPrice && (
                <Descriptions.Item label="Giá cũ">
                  {selectedProduct.oldPrice.toLocaleString()} đ
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Còn hàng">
                {selectedProduct.inStock ? "Có" : "Hết"}
              </Descriptions.Item>
              <Descriptions.Item label="Đánh giá">{selectedProduct.rating} ⭐</Descriptions.Item>
              <Descriptions.Item label="Mô tả">{selectedProduct.description}</Descriptions.Item>
            </Descriptions>

            <h4 style={{ marginTop: 20 }}>Hình ảnh</h4>
            <Image src={selectedProduct.image} width={200} />

            <h4 style={{ marginTop: 20 }}>Biến thể</h4>
            {selectedProduct.variants.length > 0 ? (
              selectedProduct.variants.map((variant, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid #eee",
                    padding: 8,
                    marginBottom: 8,
                    borderRadius: 6,
                  }}
                >
                  <strong>Màu:</strong>{" "}
                  <Tag color={variant.color}>{variant.color}</Tag>
                  <div>
                    {variant.sizes.map((s, i) => (
                      <Tag key={i}>{`${s.size} (${s.quantity})`}</Tag>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>Không có biến thể</p>
            )}
          </>
        )}
      </Drawer>

      {/* Modal thêm/sửa sản phẩm */}
      <Modal
        title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        width={800}
      >
        <Form<ProductWithVariants> form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm.' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select placeholder="Chọn danh mục">
                  <Select.Option value="Áo">Áo</Select.Option>
                  <Select.Option value="Quần">Quần</Select.Option>
                  <Select.Option value="Giày">Giày</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá"
                rules={[
                  { required: true, message: "Vui lòng nhập giá sản phẩm" },
                  {
                    validator: (_, value) => {
                      if (value > 0) return Promise.resolve();
                      return Promise.reject("Giá sản phẩm phải lớn hơn 0");
                    },
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>

            </Col>
            <Col span={12}>
              <Form.Item name="oldPrice" label="Giá cũ">
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Mô tả" rules={[{ required: true, type: "string", message: 'Vui lòng nhập mô tả sản phẩm' }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="image" label="Tải ảnh">
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleUploadImgProduct}
            >
              {imageUrl ? <img
                src={imageUrl}
                alt="imgProduct"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item name="inStock" label="Còn hàng" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Divider>Biến thể sản phẩm</Divider>
          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ border: "1px solid #eee", padding: 12, marginBottom: 12 }}>
                    <Row gutter={16}>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "color"]}
                          label="Màu"
                          rules={[{ required: true, message: "Nhập màu" }]}
                        >
                          <Input placeholder="VD: Đỏ hoặc #FF0000" />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button
                          type="text"
                          danger
                          onClick={() => remove(name)}
                          icon={<MinusCircleOutlined />}
                          style={{ marginTop: 30 }}
                        />
                      </Col>
                    </Row>

                    {/* Danh sách size trong biến thể */}
                    <Form.List
                      name={[name, "sizes"]}
                      rules={[
                        {
                          validator: async (_, sizes) => {
                            if (!sizes || sizes.length === 0) {
                              return Promise.reject(new Error("Biến thể này phải có ít nhất 1 size"));
                            }
                          },
                        },
                      ]}
                    >
                      {(sizeFields, { add: addSize, remove: removeSize }) => (
                        <>
                          {sizeFields.map(({ key: sizeKey, name: sizeName, ...restSizeField }) => (
                            <Row gutter={16} key={sizeKey}>
                              <Col span={8}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "size"]}
                                  label="Size"
                                  rules={[{ required: true, message: "Vui lòng chọn size" }]}
                                >
                                  <Select placeholder="Chọn size">
                                    <Select.Option value="S">S</Select.Option>
                                    <Select.Option value="M">M</Select.Option>
                                    <Select.Option value="L">L</Select.Option>
                                    <Select.Option value="XL">XL</Select.Option>
                                  </Select>
                                </Form.Item>

                              </Col>
                              <Col span={8}>
                                <Form.Item
                                  {...restSizeField}
                                  name={[sizeName, "quantity"]}
                                  label="Số lượng"
                                  rules={[{ required: true, message: "Nhập số lượng" }]}
                                >
                                  <InputNumber min={0} style={{ width: "100%" }} />
                                </Form.Item>
                              </Col>
                              <Col span={2}>
                                <Button
                                  type="text"
                                  danger
                                  onClick={() => removeSize(sizeName)}
                                  icon={<MinusCircleOutlined />}
                                  style={{ marginTop: 30 }}
                                />
                              </Col>
                            </Row>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => addSize()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Thêm size
                          </Button>
                        </>
                      )}
                    </Form.List>

                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add({ color: "", sizes: [] })}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm biến thể
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default AdminProductsPage;
