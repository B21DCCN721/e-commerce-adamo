import { Button, Form, Input, Space, message } from "antd";
import React, { useState } from "react";

interface InfoForgotPass {
    email: string;
    otp: string;
    newPass: string;
    confirmPass: string;
}
interface FormForgotPasswordProps {
    sendOtp: (mail: string) => void;
    changePassword: (value: InfoForgotPass) => void;
}
const FormForgotPassword:React.FC<FormForgotPasswordProps> = ({sendOtp, changePassword}) => {
    const [form] = Form.useForm();
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOtp = async () => {
        const email = form.getFieldValue("email");
        if (!email) {
            message.warning("Vui lòng nhập email trước khi gửi OTP");
            return;
        }
        sendOtp(email);
        message.success("Đã gửi OTP tới email của bạn");
        setOtpSent(true);
    };

    const handleChangePassword = (values: InfoForgotPass) => {
        changePassword(values);
        message.success("Đổi mật khẩu thành công!");
        form.resetFields();
        setOtpSent(false);
    };

    return (
        <Form
            form={form}
            name="forgot-password"
            layout="vertical"
            
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Email không hợp lệ" },
                ]}
            >
                <Space.Compact style={{ width: "100%" }}>
                    <Input placeholder="Nhập email"/>
                    <Button type="primary" onClick={handleSendOtp}>
                        Nhận OTP
                    </Button>
                </Space.Compact>
            </Form.Item>

            {otpSent && (
                <>
                    <Form.Item
                        label="Mã OTP"
                        name="otp"
                        rules={[
                            { required: true, message: "Vui lòng nhập mã OTP" },
                            { len: 6, message: "Mã OTP phải có 6 ký tự" }
                        ]}
                    >
                        <Input placeholder="Nhập mã OTP" maxLength={6} />
                    </Form.Item>


                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPass"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirmPass"
                        dependencies={["newPass"]}
                        rules={[
                            { required: true, message: "Vui lòng xác nhận mật khẩu" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("newPass") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Mật khẩu không khớp"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Xác nhận mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block onClick={() => handleChangePassword(form.getFieldsValue())}>
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form>
    );
};

export default FormForgotPassword;
