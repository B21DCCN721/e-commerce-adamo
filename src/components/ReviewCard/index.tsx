import { Avatar, Rate, Typography, Image, Space, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { Review } from "../../types/review";


type ReviewCardProps = {
  review: Review;
};

const ReviewCard:React.FC<ReviewCardProps> = ({ review } ) => {
  return (
   <>
        <div style={{ width: "100%", marginBottom: 16, marginTop: 16 }}>
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
                  <div style={{ borderRadius: 8, marginRight: 16, display: 'inline-block' }} >
                    <Image
                      key={index}
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
        <Divider/>
   </>
  );
};

export default ReviewCard;
