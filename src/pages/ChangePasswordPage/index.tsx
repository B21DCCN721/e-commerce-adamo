import { Button, Form, Input, Typography } from "antd";
import styles from "./ChangePasswordPage.module.css";

interface InfoChangePass {
    oldPass: string;
    newPass: string;
    confirmPass: string;
}
const ChangePasswordPage = () => {
    const handleChangepassWord = (value: InfoChangePass) => {
        console.log('change pass', value);

    }
    return (
        <div className={styles['box_form']}>  
            <Typography.Title level={3}>Đổi mật khẩu</Typography.Title>
            <Form layout="vertical" name="Đổi mật khẩu" autoComplete="off" onFinish={handleChangepassWord} >
                <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPass"
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
        </div>
    )
}
export default ChangePasswordPage;