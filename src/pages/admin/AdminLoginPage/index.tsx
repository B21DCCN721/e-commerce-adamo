import { Button, Card, Col, Divider, Flex, Form, Image, Input, Row, Typography } from "antd";
import decorLoginAdmin from '../../../assets/imgs/decorLoginAdmin.png';
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import logoWeb from '../../../assets/imgs/logoSilverWolf.png';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [form] = useForm();
    const handleLogin = () => {
        console.log('admin login', form.getFieldsValue());
        navigate('/admin/dashboard');
    }
    return (
        <Row style={{ height: '100vh' }}>
            <Col span={8} style={{ backgroundColor: "#F4F9FF", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={decorLoginAdmin} preview={false} />
            </Col>
            <Col span={16} style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                <Card
                    style={{
                        width: "40%",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                >
                    <Flex vertical align="center">
                        <Image src={logoWeb} preview={false} width={40} height={40}/>
                        <Typography.Title level={5}>Admin Login</Typography.Title>
                    </Flex>
                    <Divider></Divider>
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
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default AdminLoginPage;