import { Button, Card, Col, Divider, Flex, Image, Progress, Rate, Row, Space, Typography } from "antd";
import customer from "../../../assets/imgs/Customer.png";
import order from "../../../assets/imgs/Order.png";
import fluentArrowGrowth from "../../../assets/imgs/fluentArrowGrowth.png";
import solardollarbold from "../../../assets/imgs/solardollarbold.png";
import CustomDonutChart from "../../../components/CustomDonutChart";
import StatisticCard from "../../../components/StatisticCard";
import CustomLineChart from "../../../components/CustomLineChart";
import { ReloadOutlined } from "@ant-design/icons";
const dataChartOrder = [
  { name: "Đợi xử lý", value: 400 },
  { name: "Đã xác nhận", value: 300 },
  { name: "Đang vận chuyển", value: 300 },
  { name: "Đã giao", value: 200 },
  { name: "Đã hủy", value: 200 },
];
const dataChartRevenueMonth = [
  { name: "1", value: 400 },
  { name: "2", value: 300 },
  { name: "3", value: 500 },
  { name: "4", value: 200 },
  { name: "5", value: 600 }
];
const AdminDashboardPage = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <StatisticCard icon={customer} title="Tổng số lượng người dùng" content="100" />
        </Col>
        <Col span={6}>
          <StatisticCard icon={order} title="Tổng đơn hàng" content="1000" />
        </Col>
        <Col span={6}>
          <StatisticCard icon={solardollarbold} title="Tổng doanh thu" content="10000000" />
        </Col>
        <Col span={6}>
          <StatisticCard icon={fluentArrowGrowth} title="Tăng trưởng" content="50%" />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '32px' }}>
        <Col span={16}>
          <Row gutter={16}>
            <Col span={12}>
              <Card style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: 12,
                height: '320px'
              }}>
                <Typography.Title level={5}>Đơn hàng</Typography.Title>
                <CustomDonutChart centerText="Tổng đơn hàng" centerValue="100" data={dataChartOrder} />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  height: "320px"
                }}
                title={
                  <Space>
                    <Typography.Text strong>Customer Review</Typography.Text>
                    <ReloadOutlined style={{ color: "#52c41a" }} />
                  </Space>
                }
              >
                {/* Rating */}
                <Space align="center">
                  <Rate allowHalf disabled defaultValue={4} />
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    4.0
                  </Typography.Title>
                  <Typography.Text type="secondary">out of 5 star</Typography.Text>
                </Space>

                {/* Progress Bars */}
                <div style={{ marginTop: 16 }}>
                  <Progress
                    percent={100}
                    size="small"
                    strokeColor="#52c41a"
                    format={() => "Excellent"}
                  />
                  <Progress
                    percent={75}
                    size="small"
                    strokeColor="#73d13d"
                    format={() => "Good"}
                  />
                  <Progress
                    percent={60}
                    size="small"
                    strokeColor="#faad14"
                    format={() => "Average"}
                  />
                  <Progress
                    percent={40}
                    size="small"
                    strokeColor="#fa8c16"
                    format={() => "Avg-below"}
                  />
                  <Progress
                    percent={20}
                    size="small"
                    strokeColor="#ff4d4f"
                    format={() => "Poor"}
                  />
                </div>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: '32px' }}>
            <Col span={24}>
              <Card style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: 12,
              }}>
                <Typography.Title level={5}>Doanh thu tháng</Typography.Title>
                <CustomLineChart data={dataChartRevenueMonth} />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Card style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: 12,
          }}>
            <Typography.Title level={4}>Sản phẩm bán chạy</Typography.Title>
            <Divider />
            {dataChartOrder.map((_, index) => (
              <div key={index}>
                <Flex justify="space-between" align="center">
                  <Image src={solardollarbold} alt="anh product" width={40} height={40} />
                  <Typography.Text strong>Tên sản phẩm</Typography.Text>
                  <Typography.Text>Giá sản phẩm</Typography.Text>
                  <Typography.Text>Số lượt mua</Typography.Text>
                </Flex>
                <Divider />
              </div>
            ))}
            <Flex justify="end"><Button type="primary">Xem thêm</Button></Flex>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default AdminDashboardPage;