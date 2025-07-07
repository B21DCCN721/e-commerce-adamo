import { Typography, Card, Flex, Carousel } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import styles from "./HomePage.module.css";
import anh1 from "../../assets/imgs/anh1.jpg";
import anh2 from "../../assets/imgs/anh2.jpg";
import anh3 from "../../assets/imgs/anh3.jpg";
import demoHome from "../../assets/imgs/demoHome.png";
const data = [
  {
    id: 1,
    name: "Áo thun nam",
    price: 250000,
    image: anh1,
    description: "Áo thun nam chất liệu cotton, thoáng mát, phù hợp cho mùa hè.",
    category: "Thời trang nam"
  },
  {
    id: 2,
    name: "Giày thể thao nữ",
    price: 450000,
    image: anh2,
    description: "Giày thể thao nữ thiết kế năng động, thoải mái khi vận động.",
    category: "Giày dép"
  },
  {
    id: 3,
    name: "Balo học sinh",
    price: 300000,
    image: anh3,
    description: "Balo học sinh đa năng, có ngăn đựng laptop tiện lợi.",
    category: "Phụ kiện"
  }
]
const HomePage = () => {
  return (
    <DefaultLayout>
      <Typography.Title level={3}>Trang chủ</Typography.Title>
      <div style={{marginBottom: "16px"}}>
        <Carousel autoplay>
          {data.map((item) => (
            <div key={item.id}>
              <div className={styles['boxSlide']}>
                <img className={styles['boxSlide_img']} alt={item.description} src={demoHome}/>
                <div className={styles['boxSlideInfo']}>
                  <h1>Thong tin san pham</h1>
                  <p>Thoong tin ve web bla bla...</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <Typography.Title level={3}>Danh sách sản phẩm nổi bật</Typography.Title>
      <Flex wrap={true} gap="middle">
        {data.map((item) => (
          <Card key={item.id} style={{ width: '300px' }} hoverable variant="borderless"
          cover={<img alt={item.description} src={item.image} style={{ height: 200, objectFit: 'cover' }} />}
          onClick={() => console.log('click')}
          >
            <Card.Meta title={item.name} description={item.description} />
          </Card>
        ))}
      </Flex>
    </DefaultLayout>
  );
};
export default HomePage;