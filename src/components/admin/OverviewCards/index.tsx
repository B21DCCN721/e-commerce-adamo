import React from "react";
import { Card, Col, Row, Statistic, Tooltip } from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const OverviewCards: React.FC = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Statistic
            title="Tổng đơn hàng"
            value={1240}
            prefix={<ShoppingCartOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Statistic
            title="Doanh thu hôm nay"
            value={4250000}
            prefix={<DollarOutlined />}
            precision={0}
            suffix="₫"
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Statistic
            title="Khách hàng"
            value={863}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Statistic
            title={
              <Tooltip title="Sản phẩm còn dưới 5 cái">
                Tồn kho thấp <ExclamationCircleOutlined style={{ color: "orange" }} />
              </Tooltip>
            }
            value={14}
            suffix="mặt hàng"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default OverviewCards;
