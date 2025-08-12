/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, Card, Divider, Flex, message, Modal, Col, Row, Image, Typography } from 'antd';
import styles from "./Login.module.css";
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/authenticatedService';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import avatar from "../../../assets/imgs/avatar.jpg";
import FormForgotPassword from '../../../components/FormForgotPassword';
import { createProfile, getProflie } from '../../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store';
import { mergeCarts } from '../../../utils/cartMerge';
import { addItemsToCartServer, getCartByUserId } from '../../../services/cartService';
import { setCart } from '../../../features/cart/cartSlice';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import decorLogin from '../../../assets/imgs/decorLogin.png';
interface FormLogin {
  email: string;
  password: string
}
const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isOpenModalForgotPassword, setIsOpenModalForgotPassword] = useState(false);
  const showModal = () => {
    setIsOpenModalForgotPassword(true);
  };
  const localCartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = async (values: FormLogin) => {
    try {
      const { user } = await login(values.email, values.password);
      const profile = await getProflie(user.uid);
      localStorage.setItem('infoUser', JSON.stringify({ email: profile?.email, name: profile?.name ?? 'user', avatar: avatar }));
      const serverCartItems = await getCartByUserId(user.uid);
      const mergeCart = mergeCarts(localCartItems, serverCartItems);
      await addItemsToCartServer(user.uid, mergeCart);
      dispatch(setCart(mergeCart))
      message.success("Đăng nhập thành công");
      navigate("/");
    } catch (error: any) {
      message.error("Đăng nhập thất bại");
      console.error('Đăng nhập thất bại:', error);
    }
  };
  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;
    if (token) {
      const decoded: any = jwtDecode(token);
      await createProfile(
        decoded.sub, {
        name: decoded.family_name,
        email: decoded.email,
        avatar: decoded.picture,
        isActive: true,
      });
      const serverCartItems = await getCartByUserId(decoded.sub);
      const mergeCart = mergeCarts(localCartItems, serverCartItems);
      await addItemsToCartServer(decoded.sub, mergeCart);
      dispatch(setCart(mergeCart))
      localStorage.setItem('accessToken', token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userId', decoded.sub);
      localStorage.setItem('infoUser', JSON.stringify({ email: decoded.email, name: decoded.family_name ?? 'user', avatar: decoded.picture }));
      console.log('Đăng nhập bằng Google:', decoded);
      message.success("Đăng nhập thành công");
      navigate("/");
    } else {
      message.error("Đăng nhập thất bại");
    }
  };
  return (
    <div className={styles['box']}>
      <Row className={styles['box_form']}>
        <Col>
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
                <Input placeholder="Nhập email" prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }, {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
                  message: 'Ít nhất 6 ký tự, gồm chữ và số',
                },]}
              >
                <Input.Password placeholder="Nhập mật khẩu" prefix={<LockOutlined />} />
              </Form.Item>
              <Flex justify='end' style={{marginBottom: "16px"}}>
                <Button type='link' onClick={showModal}>Quên mật khẩu?</Button>
              </Flex>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <Divider>Hoặc</Divider>

            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log('Đăng nhập Google thất bại');
              }}
            />
           <Flex justify='center' style={{marginTop: "16px"}}>
              <Typography.Text>Chưa có tài khoản? 
                <Link to="/register"> Đăng ký ngay.</Link>
              </Typography.Text>
           </Flex>
          </Card>
        </Col>
        <Col>
          <Image src={decorLogin} preview={false} width={560} height={495} />
        </Col>
      </Row>
      <Modal
        title="Lấy lại mật khẩu"
        closeIcon
        open={isOpenModalForgotPassword}
        onCancel={() => setIsOpenModalForgotPassword(false)}
        footer={null}
        centered
      >
        <FormForgotPassword />
      </Modal>
    </div>
  );
};

export default LoginPage;
