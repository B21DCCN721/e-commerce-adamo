import { Typography, Flex, Carousel, Button, Spin, Image, Space, Row, Col, } from "antd";
import styles from "./HomePage.module.css";
import thumbNail1 from "../../../assets/imgs/thumbNail1.png";
import thumbNail2 from "../../../assets/imgs/thumbNail2.webp";
import thumbNail3 from "../../../assets/imgs/thumbNail3.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../../components/ProductCard";
import imgClothing from "../../../assets/imgs/shrit.png"
import { getListProductWithVariants } from "../../../services/productService";
import type { ProductWithVariants } from "../../../types/product";
import bgSubscribe from '../../../assets/imgs/bgSubscribe.png';
import { SignatureOutlined } from "@ant-design/icons";
import iconQuality from '../../../assets/imgs/iconQuality.png';
import iconDelivery from '../../../assets/imgs/iconDelivery.png';
import iconReplace from '../../../assets/imgs/iconReplace.png';
import decorSubscribe from '../../../assets/imgs/decorSubscribe.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import PreviewReviewCard from "../../../components/PreviewReviewCard";
const reviews = [
  {
    name: "John Smith",
    date: "01/01/1999",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    content:
      "Sản phẩm đẹp đúng với mô tả.",
  },
  {
    name: "Sarah Johnson",
    date: "12/12/1234",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    content:
      "Giao hàng nhanh, đóng gói cẩn thận.",
  },
  {
    name: "Michael Brown",
    date: "01/03/1478",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
    content:
      "Tuyệt vời.",
  },
  {
    name: "Michael Brown",
    date: "13/06/2025",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    content:
      "Tôi hài lòng với sản phẩm.",
  },
  {
    name: "Michael Brown",
    date: "13/08/2025",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 5,
    content:
      "Sản phẩm chất lượng tốt.",
  },
];
const HomePage = () => {
  const [dataSlide] = useState([
    {
      id: 1,
      name: "Áo thun nam",
      image: thumbNail1,
      description: "Áo thun nam chất liệu cotton, thoáng mát, phù hợp cho mùa hè.",
    },
    {
      id: 2,
      name: "Giày thể thao",
      image: thumbNail2,
      description: "Giày thể thao thiết kế năng động, thoải mái khi vận động.",
    },
    {
      id: 3,
      name: "Balo học sinh",
      image: thumbNail3,
      description: "Balo học sinh đa năng, có ngăn đựng laptop tiện lợi.",
    }
  ])
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductWithVariants[]>([]);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') ?? false;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getListProductWithVariants();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <Carousel autoplay autoplaySpeed={2000}>
          {dataSlide.map((item) => (
            <div key={item.id}>
              <div className={styles['boxSlide']}>
                <img className={styles['boxSlide_img']} alt={item.description} src={item.image} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <Typography.Title level={3}>Sản phẩm nổi bật</Typography.Title>
      {loading ? (
        <Flex justify="center" align="center"><Spin size="large" /></Flex>
      ) : (
        <>
            <Row gutter={[16, 16]} align={"middle"} justify={"space-between"}>
              {products.slice(0, 10).map((item) => (
                <Col span={4.8}>
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    image={item.image || imgClothing}
                    inStock={true}
                    rating={item.rating}
                    tags={item.tags}
                  />
                </Col>

              ))}
            </Row>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0px' }}>
            <Button type="primary" onClick={() => navigate('/category')}>Xem thêm</Button>
          </div>
          {!isAuthenticated && (<Flex style={{ width: "100%", backgroundColor: "#F5F7FA" }}>
            <Image src={bgSubscribe} width={430} height={300} preview={false} />
            <Space size={"large"}>
              <Space direction="vertical" align="start" style={{ margin: "64px" }}>
                <Typography.Text>20% giảm giá</Typography.Text>
                <Typography.Title level={3}>Nhận phiếu giảm giá cho lần đầu đăng ký</Typography.Title>
                <Typography.Text>Tìm kiếm giảm giá cho đơn hàng của bạn?</Typography.Text>
                <Button variant="solid" color="red" icon={<SignatureOutlined />} iconPosition="end" onClick={() => navigate('/register')}>
                  Đăng ký ngay
                </Button>
                <Typography.Text>Lần đầu đăng ký tài khoản bạn sẽ nhận được phiếu giảm giá 20% giá trị đơn hàng.</Typography.Text>
              </Space>
              <Image src={decorSubscribe} preview={false} width={80} height={80} style={{ marginLeft: "64px" }} />
            </Space>
          </Flex>)}
          <div className={styles['boxPreviewReview']}>
            <Typography.Title level={4}>Đánh giá từ khách hàng</Typography.Title>
            <div style={{ flex: 1, width: "70%", marginTop: "16px" }}>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView='auto'
                // centeredSlides={true}
                navigation
              // pagination={{ clickable: true }}
              >
                {reviews.map((item, i) => (
                  <SwiperSlide key={i} style={{ width: "280px" }}>
                    <PreviewReviewCard {...item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <Flex align="center" justify="center" gap={16} style={{ margin: '32px 0px', width: "100%" }}>
            <Space>
              <Image src={iconReplace} preview={false} />
              <Space direction="vertical">
                <Typography.Text strong>Dễ dàng đổi trả</Typography.Text>
                <Typography.Text>Hoàn trả trong vòng 7 ngày nếu sản phẩm hư hỏng</Typography.Text>
              </Space>
            </Space>
            <Space>
              <Image src={iconDelivery} preview={false} />
              <Space direction="vertical">
                <Typography.Text strong>Miễn phí vận chuyển</Typography.Text>
                <Typography.Text>Các đơn hàng được miễn phí vận chuyển trong 1km</Typography.Text>
              </Space>
            </Space>
            <Space>
              <Image src={iconQuality} preview={false} />
              <Space direction="vertical">
                <Typography.Text strong>Đảm bảo chất lượng</Typography.Text>
                <Typography.Text>Mọi sản phẩm đều được đảm bảo chất lượng</Typography.Text>
              </Space>
            </Space>
          </Flex>
        </>
      )}
    </>
  );
};
export default HomePage;