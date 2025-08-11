import { Avatar, Rate, Typography, Image, Space, Divider, Button, Modal, message, Select, Input } from "antd";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { Review } from "../../types/review";
import { useState } from "react";

const { TextArea } = Input;

type ReviewCardProps = {
  review: Review;
};

const reportReasons = [
  { value: "spam", label: "Nội dung spam / quảng cáo" },
  { value: "offensive", label: "Ngôn từ xúc phạm / không phù hợp" },
  { value: "false_info", label: "Thông tin sai sự thật" },
  { value: "other", label: "Khác" },
];

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reason, setReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleReportSubmit = async () => {
    if (!reason) {
      message.warning("Vui lòng chọn lý do tố cáo");
      return;
    }

    const finalReason = reason === "other" ? customReason.trim() : reason;
    if (!finalReason) {
      message.warning("Vui lòng nhập lý do tố cáo");
      return;
    }

    setLoading(true);
    try {
      message.success("Đã gửi tố cáo. Cảm ơn bạn đã đóng góp!");
      setReportModalOpen(false);
      setReason("");
      setCustomReason("");
    } catch (error) {
      message.error("Gửi tố cáo thất bại. Vui lòng thử lại!");
      console.log('Lỗi gửi tố cáo', error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ width: "100%", marginBottom: 16, marginTop: 16 }}>
        <Space
          align="start"
          size="middle"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <Space align="start" size="middle">
            <Avatar
              size="large"
              src={review.avatarUrl}
              icon={!review.avatarUrl && <UserOutlined />}
            />
            <div>
              <Typography.Text strong>{review.username}</Typography.Text>
              <br />
              <Rate disabled value={review.rating} />
            </div>
          </Space>

          {/* Nút Tố cáo */}
          <Button
            type="link"
            danger
            icon={<ExclamationCircleOutlined />}
            onClick={() => setReportModalOpen(true)}
          >
            Tố cáo
          </Button>
        </Space>

        <div style={{ marginTop: 12 }}>
          {review.contents.map((item, index) => {
            if (item.type === "text") {
              return (
                <Typography.Paragraph key={index} style={{ marginBottom: 8 }}>
                  {item.content}
                </Typography.Paragraph>
              );
            } else if (item.type === "image") {
              return (
                <div
                  key={index}
                  style={{
                    borderRadius: 8,
                    marginRight: 16,
                    display: "inline-block",
                  }}
                >
                  <Image
                    src={item.content}
                    alt="review-img"
                    width={120}
                    style={{ borderRadius: 8 }}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <Divider />

      {/* Modal tố cáo */}
      <Modal
        title="Tố cáo đánh giá"
        open={reportModalOpen}
        onCancel={() => setReportModalOpen(false)}
        onOk={handleReportSubmit}
        okText="Gửi tố cáo"
        confirmLoading={loading}
      >
        <Typography.Paragraph>
          Vui lòng chọn lý do bạn muốn tố cáo đánh giá này:
        </Typography.Paragraph>
        <Select
          placeholder="Chọn lý do"
          style={{ width: "100%", marginBottom: 12 }}
          options={reportReasons}
          value={reason || undefined}
          onChange={setReason}
        />
        {reason === "other" && (
          <TextArea
            placeholder="Nhập lý do khác..."
            rows={3}
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        )}
      </Modal>
    </>
  );
};

export default ReviewCard;
