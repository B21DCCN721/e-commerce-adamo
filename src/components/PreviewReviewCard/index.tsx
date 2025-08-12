import React from "react";
import { Card, Rate, Typography, Avatar } from "antd";
import {  LinkOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

interface PreviewReviewCardProps {
  name: string;
  date: string;
  avatar: string;
  rating: number;
  content: string;
}

const PreviewReviewCard: React.FC<PreviewReviewCardProps> = ({
  name,
  date,
  avatar,
  rating,
  content,
}) => {
  return (
    <Card
      style={{
        width: 280,
        height: 400,
        textAlign: "center",
        borderRadius: 8,
        overflow: "hidden",
        paddingTop: 16,
      }}
    >
      <div style={{ position: "relative", display: "inline-block", border: "2px solid #333", borderRadius: "50%", padding:"16px"}}>
       <div style={{position: "relative"}}>
            <Avatar
              src={avatar}
              size={80}
              style={{
                border: "2px solid #f24123",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: -10,
                bottom: -5,
                width: 15,
                height: 15,
                borderRadius: "50%",
                backgroundColor: "#f24123",
              }}
            ></span>
            <span
              style={{
                position: "absolute",
                right: -10,
                top: -5,
                width: 15,
                height: 15,
                borderRadius: "50%",
                backgroundColor: "#f24123",
              }}
            ></span>
       </div>
        <div
          style={{
            position: "absolute",
            right: -70,
            top: -18,
            color: "#555",
          }}
        >
          <LinkOutlined style={{fontSize:'25px'}} />
        </div>
      </div>

      {/* Name */}
      <div
        style={{
          background: "#f24123",
          color: "#fff",
          fontWeight: 500,
          padding: "6px 0",
          marginTop: 12,
        }}
      >
        {name}
      </div>

      {/* Rating + Date */}
      <Rate disabled defaultValue={rating} style={{ marginTop: 8 }} />
      <div style={{ fontSize: 13, color: "#888" }}>{date}</div>

      {/* Review */}
      <Paragraph style={{ fontSize: 14, marginTop: 8 }}>{content}</Paragraph>
    </Card>
  );
};

export default PreviewReviewCard;
