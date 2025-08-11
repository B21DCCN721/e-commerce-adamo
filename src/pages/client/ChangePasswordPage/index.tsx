import { Button, Card, Form, Input, message, Typography } from "antd";
import { changePassword } from "../../../services/authenticatedService";
import { useForm } from "antd/es/form/Form";
interface InfoChangePass {
    currentPass: string;
    newPass: string;
    confirmPass: string;
}
const ChangePasswordPage = () => {
    const [form] = useForm();
    const handleChangepassWord = async (value: InfoChangePass) => {
        try {
            await changePassword(value.currentPass, value.newPass);
            form.resetFields();
            message.success("Đổi mật khẩu thành công");
        } catch (error) {
            console.error('Đổi mật khẩu thất bại:', error);
            message.error("Đổi mật khẩu thất bại");
        }
    }
    return (
        <Card style={{ maxWidth: "650px", margin: '100px auto' }}>
            <Typography.Title level={3}>Đổi mật khẩu</Typography.Title>
            <Form layout="vertical" form={form} name="Đổi mật khẩu" autoComplete="off" onFinish={handleChangepassWord} >
                <Form.Item
                    label="Mật khẩu cũ"
                    name="currentPass"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu cũ' },
                        {
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                            message: 'Ít nhất 6 ký tự, gồm chữ và số',
                        },
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu mới"
                    name="newPass"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu mới' },
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
                    name="confirmPass"
                    dependencies={['newPass']}
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPass') === value) {
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
                    <Button type="primary" htmlType="submit">Xác nhận</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
export default ChangePasswordPage;