import { Form, Input, Button, Card, message, Typography, Flex } from 'antd';
import styles from "./Register.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../../services/authenticatedService';
import { createProfile } from '../../../services/userService';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
interface FormRegister {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleRegister = async (values: FormRegister) => {
    try {
      setLoading(true);
      const { user } = await register(values.email, values.password);
      await createProfile(
        user.uid, {
        name: values.fullName,
        email: values.email,
        isActive: true,
      });
      form.resetFields();
      message.success("Đăng ký thành công");
      navigate("/login");
    } catch (error: unknown) {
      message.error('Đăng ký thất bại');
      console.error('Đăng ký thất bại:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['box']}>
        <Card title="Đăng ký tài khoản" className={styles['box_form-card']}>
          <Form form={form} onFinish={handleRegister} layout="vertical">
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input placeholder="Nhập họ và tên" prefix={<UserOutlined/>} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input placeholder="Nhập email" prefix={<MailOutlined/>} />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu' },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: 'Ít nhất 6 ký tự, gồm chữ và số',
                },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu" prefix={<LockOutlined/>} />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Xác nhận mật khẩu" prefix={<LockOutlined/>} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
          <Flex justify='center'><Typography.Text>Đã có tài khoản? <Link to="/login">Đăng nhập.</Link></Typography.Text></Flex>
        </Card>
    </div>
  );
};

export default RegisterPage;
