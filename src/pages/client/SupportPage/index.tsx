/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Layout, Collapse, Form, Input, Button, message, Card } from "antd";

const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;

const SupportPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Thông tin liên hệ:", values);
    message.success("Gửi yêu cầu hỗ trợ thành công!");
    form.resetFields();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "white", fontSize: 24 }}>
        Hỗ trợ khách hàng
      </Header>

      <Content style={{ padding: "24px 48px", maxWidth: 800, margin: "0 auto" }}>
        {/* FAQ */}
        <div>
          <h2>Câu hỏi thường gặp</h2>
          <Collapse accordion>
            <Panel header="Làm sao để theo dõi đơn hàng?" key="1">
              Bạn có thể tra cứu đơn hàng bằng mã đơn trong phần "Tra cứu đơn hàng".
            </Panel>
            <Panel header="Làm sao để đổi trả sản phẩm?" key="2">
              Vui lòng đọc chính sách đổi trả hoặc liên hệ hỗ trợ để được hướng dẫn.
            </Panel>
            <Panel header="Tôi muốn hủy đơn thì sao?" key="3">
              Nếu đơn chưa được giao, bạn có thể yêu cầu hủy thông qua trang đơn hàng.
            </Panel>
          </Collapse>
        </div>

        {/* Support Info */}
        <div style={{ marginTop: 32 }}>
          <h2>Thông tin liên hệ</h2>
          <Card>
            <p><strong>Email:</strong> support@ecommerce.vn</p>
            <p><strong>Hotline:</strong> 1900 1234</p>
            <p><strong>Thời gian hỗ trợ:</strong> 8h - 20h (T2 - CN)</p>
          </Card>
        </div>

        {/* Contact Form */}
        <div style={{ marginTop: 32 }}>
          <h2>Liên hệ hỗ trợ</h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ marginTop: 16 }}
          >
            <Form.Item name="name" label="Họ tên" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="message"
              label="Nội dung"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Gửi yêu cầu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        © {new Date().getFullYear()} E-Commerce Inc.
      </Footer>
    </Layout>
  );
};

export default SupportPage;
