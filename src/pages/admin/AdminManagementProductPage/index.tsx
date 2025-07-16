/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Table,
  Button,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  DatePicker,
} from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface Product {
  id: number;
  name: string;
  category: string;
  active: boolean;
  createAt: Date;
}

const initialData: Product[] = [
  {
    id: 1,
    name: "Áo thun trắng",
    category: "Áo",
    active: true,
    createAt: new Date("2025-07-10T10:00:00"),
  },
  {
    id: 2,
    name: "Quần jean",
    category: "Quần",
    active: false,
    createAt: new Date("2025-07-12T15:30:00"),
  },
];

const AdminManagementProductPage: React.FC = () => {
  const [data, setData] = useState<Product[]>(initialData);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleAddNew = () => {
    form.resetFields();
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const newProduct: Product = {
        ...values,
        id: editingProduct?.id || Math.floor(Math.random() * 1000),
        active: editingProduct?.active ?? true,
        createAt: editingProduct?.createAt ?? new Date(),
      };

      setData((prev) =>
        editingProduct
          ? prev.map((item) => (item.id === editingProduct.id ? newProduct : item))
          : [...prev, newProduct]
      );

      setIsModalOpen(false);
    });
  };

  const handleToggleStatus = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const filteredData = data.filter((item) => {
    const matchText =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.id.toString().includes(searchText);

    const matchDate =
      !dateRange ||
      (!dateRange[0] && !dateRange[1]) ||
      (dayjs(item.createAt).isAfter(dateRange[0], "day") &&
        dayjs(item.createAt).isBefore(dateRange[1], "day"));

    return matchText && matchDate;
  });

  const columns = [
    { title: "Mã sản phẩm", dataIndex: "id" },
    { title: "Tên sản phẩm", dataIndex: "name" },
    { title: "Loại", dataIndex: "category" },
    {
      title: "Trạng thái",
      dataIndex: "active",
      render: (val: boolean) =>
        val ? <Tag color="blue">Đang bán</Tag> : <Tag color="default">Vô hiệu</Tag>,
    },
    {
      title: "Thời gian thêm",
      dataIndex: "createAt",
      render: (value: Date) =>
        dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Thao tác",
      render: (_: any, record: Product) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title={`Bạn có chắc muốn ${record.active ? "vô hiệu" : "kích hoạt"} sản phẩm này?`}
            onConfirm={() => handleToggleStatus(record.id)}
          >
            <Button danger={!record.active}>
              {record.active ? "Vô hiệu" : "Kích hoạt"}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "",
      render: (_: any, record: Product) => (
        <Button type="link" onClick={() => navigate(`${record.id}`)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
          Thêm sản phẩm
        </Button>

        <Input.Search
          placeholder="Tìm theo mã hoặc tên sản phẩm"
          allowClear
          enterButton
          onSearch={(value) => setSearchText(value)}
          style={{ width: 300 }}
        />

        <DatePicker.RangePicker
          format="DD/MM/YYYY"
          onChange={(range) => setDateRange(range)}
        />
      </div>

      <Table columns={columns} dataSource={filteredData} rowKey="id" />

      <Modal
        title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Loại"
            rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm" }]}
          >
            <Select options={[{ value: "Áo" }, { value: "Quần" }, { value: "Giày" }]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManagementProductPage;
