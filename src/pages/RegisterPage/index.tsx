import { Form, Input, Button, Card, Row, Col } from 'antd';
import styles from "./Register.module.css";
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [form] = Form.useForm();

  const handleRegister = (values: unknown) => {
    console.log('Đăng ký với:', values);
    // TODO: Gọi API đăng ký
  };

  return (
    <Row style={{ height: '100vh' }}>
      <Col span={12} className={styles['box_decor']}>
      </Col>
      <Col span={12} className={styles['box_form']}>
        <Card title="Đăng ký tài khoản" className={styles['box_form-card']}>
          <Form form={form} onFinish={handleRegister} layout="vertical">
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input placeholder="Nhập email" />
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
              <Input.Password placeholder="Nhập mật khẩu" />
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
              <Input.Password placeholder="Xác nhận mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
          <Link to="/login">Đã có tài khoản? Đăng nhập ngay</Link>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterPage;
