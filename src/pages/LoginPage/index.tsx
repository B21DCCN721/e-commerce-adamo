import { Form, Input, Button, Card, Row, Col, Divider, Flex } from 'antd';
import imgLogin from "../../assets/imgs/imgLogin.jpg";
import styles from "./Login.module.css";
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [form] = Form.useForm();

  const handleLogin = (values: unknown) => {
    console.log('Đăng nhập với:', values);
    // TODO: Gọi API đăng nhập
  };

  const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse ) => {
    const token = credentialResponse.credential;
    if (token) {
      const decoded: unknown = jwtDecode(token);
      console.log('Đăng nhập bằng Google:', decoded);
      // TODO: Gửi token hoặc decoded về backend để xác thực
    }
  };

  return (
    <Row style={{ height: '100vh' }}>
      <Col span={12} className={styles['box_decor']}>
        <img src={imgLogin} alt='ảnh nền login' className={styles['box_decor-img']} />
      </Col>
      <Col
        span={12}
        className={styles['box_form']}
      >
        <Card title="Đăng nhập" className={styles['box_form-card']}>
          <Form form={form} onFinish={handleLogin} layout="vertical">
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
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <Flex justify='space-between'>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
            <Link to="/register">Đăng ký tài khoản mới</Link>
          </Flex>
          <Divider>Hoặc</Divider>

          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.log('Đăng nhập Google thất bại');
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
