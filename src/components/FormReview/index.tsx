import React, { useState } from "react";
import {
  Form,
  Input,
  Rate,
  Typography,
  Upload,
  Button,
  Space,
  Image,
} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Text } = Typography;

interface FormReviewProps {
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (data: any) => void;
  product: {
    id: number;
    name: string;
    category: string;
    image: string;
  };
}

const FormReview: React.FC<FormReviewProps> = ({
  onClose,
  onSubmit,
  product,
}) => {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(5);
  const rateText = ["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Tuyệt vời"];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinish = (values: any) => {
    if (onSubmit) onSubmit({ productId: product.id, ...values });
    form.resetFields();
    setRating(5);
    onClose();
  };

  return (
    <>
      <Space align="start" style={{ marginBottom: 16 }}>
        <Image
          src={product.image}
          width={60}
          height={60}
          preview={false}
          style={{ borderRadius: 4, objectFit: "cover" }}
        />
        <div>
          <Title level={5} style={{ margin: 0 }}>
            {product.name}
          </Title>
          <Text type="secondary">Phân loại: {product.category}</Text>
        </div>
      </Space>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{ rating: 5 }}
      >
        <Form.Item label="Chất lượng sản phẩm" name="rating">
          <div>
            <Rate value={rating} onChange={(val) => { setRating(val); form.setFieldsValue({ rating: val }) }} />
            <Text style={{ marginLeft: 8, color: "#FAAD14" }}>
              {rateText[rating - 1]}
            </Text>
          </div>
        </Form.Item>

        <Form.Item
          label="Đánh giá chi tiết"
          name="comment"
          rules={[
            { required: true, message: "Vui lòng nhập đánh giá chi tiết" },
            { min: 10, message: "Đánh giá cần ít nhất 10 ký tự" },
          ]}
        >
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item
          label="Thêm hình ảnh"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload beforeUpload={() => false} listType="picture-card">
            <button
              style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        {/* <Form.Item
            label="Thêm video"
            name="videos"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<VideoCameraOutlined />}>Thêm Video</Button>
            </Upload>
          </Form.Item> */}

        <Form.Item style={{ marginTop: 24 }}>
          <Space>
            <Button onClick={onClose}>TRỞ LẠI</Button>
            <Button htmlType="submit" type="primary" danger>
              HOÀN THÀNH
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormReview;
