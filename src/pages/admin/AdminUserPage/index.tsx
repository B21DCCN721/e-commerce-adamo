import { useState, useMemo, useEffect } from "react";
import {
  Table,
  Input,
  Avatar,
  Switch,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { type Dayjs } from "dayjs";
import { getAllUsers } from "../../../services/userService";
import type { User } from "../../../types/user";



const AdminUserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [users, searchText]);


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
       render: (_, record) => (
        <p>{record.gender === 'male' ? 'Nam' : (record.gender === 'female' ? 'Nữ' : 'Khác')}</p>
      ),
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
  // lấy danh sách user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.log('Lỗi lấy danh sách users', error);
      }
    }
    fetchUsers();
  }, []);
  return (
    <div>
      <h2>Quản lý người dùng</h2>

      <Input.Search
        placeholder="Tìm theo tên hoặc email..."
        allowClear
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, maxWidth: 300 }}
      />

      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="email"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AdminUserPage;
