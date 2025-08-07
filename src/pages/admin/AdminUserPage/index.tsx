import { useState, useMemo } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Avatar,
  Switch,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { z } from "zod";
import dayjs, { type Dayjs } from "dayjs";

const { Option } = Select;

export const UserSchema = z.object({
  avatar: z.string().optional(),
  name: z.string(),
  gender: z.string().optional(),
  email: z.string(),
  birthday: z.custom<Dayjs>().optional(),
  isActive: z.boolean().optional().default(true),
});
export type User = z.infer<typeof UserSchema>;

const dummyUsers: User[] = [
  {
    name: "Nguyễn Văn A",
    email: "a@example.com",
    gender: "Nam",
    avatar: "",
    birthday: dayjs("1990-01-01"),
    isActive: true,
  },
  {
    name: "Trần Thị B",
    email: "b@example.com",
    gender: "Nữ",
    avatar: "",
    birthday: dayjs("1995-06-15"),
    isActive: false,
  },
];

const AdminUserPage = () => {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<User>();

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [users, searchText]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      const updated = users.map((u) =>
        u.email === selectedUser?.email ? { ...u, ...values } : u
      );
      setUsers(updated);
      setIsModalOpen(false);
      setSelectedUser(null);
    });
  };

  const toggleActive = (email: string) => {
    const updated = users.map((u) =>
      u.email === email ? { ...u, isActive: !u.isActive } : u
    );
    setUsers(updated);
  };

  const columns: ColumnsType<User> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (url) =>
        url ? <Avatar src={url} /> : <Avatar style={{ backgroundColor: "#ccc" }} />,
      width: 80,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      width: 180,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      width: 100,
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      render: (date: Dayjs | undefined) =>
        date ? dayjs(date).format("DD/MM/YYYY") : "—",
      width: 140,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (_, record) => (
        <Switch
          checked={record.isActive}
          onChange={() => toggleActive(record.email)}
          checkedChildren="Kích hoạt"
          unCheckedChildren="Vô hiệu"
        />
      ),
      width: 120,
    },
  ];

  return (
    <div>
      <h2>Quản lý người dùng</h2>

      <Input.Search
        placeholder="Tìm theo tên hoặc email..."
        allowClear
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, maxWidth: 300 }}
      />

      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="email"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Chỉnh sửa người dùng"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="avatar" label="Ảnh đại diện">
            <Input placeholder="Dán URL ảnh..." />
          </Form.Item>
          <Form.Item name="name" label="Họ tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="gender" label="Giới tính">
            <Select placeholder="Chọn giới tính">
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>
          <Form.Item name="birthday" label="Ngày sinh">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUserPage;
