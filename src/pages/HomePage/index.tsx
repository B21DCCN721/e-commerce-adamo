import { Typography, Flex, Carousel, Button, Spin, } from "antd";
import styles from "./HomePage.module.css";
import thumbNail1 from "../../assets/imgs/thumbNail1.png";
import thumbNail2 from "../../assets/imgs/thumbNail2.webp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import imgClothing from "../../assets/imgs/shrit.png"
import { getListProducts } from "../../services/productService";
import type { Product } from "../../types/product";


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
      image: thumbNail2,
      description: "Balo học sinh đa năng, có ngăn đựng laptop tiện lợi.",
    }
  ])
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getListProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div>
        <Carousel autoplay autoplaySpeed={2000}>
          {dataSlide.map((item) => (
            <div key={item.id}>
              <div className={styles['boxSlide']}>
                <img className={styles['boxSlide_img']} alt={item.description} src={item.image} />
                <div className={styles['boxSlideInfo']}>
                  <Typography.Title level={3}>{item.name}</Typography.Title>
                  <Typography.Text>{item.description}</Typography.Text>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <Typography.Title level={3}>Danh sách sản phẩm nổi bật</Typography.Title>
      {loading ? (
        <Flex justify="center" align="center"><Spin tip="Loading" size="large" ></Spin></Flex>
      ) : (
        <>
          <div style={{ marginLeft: "50px" }}>
            <Flex wrap={true} gap="large">
              {products.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  oldPrice={500000}
                  image={item.image || imgClothing}
                  inStock={true}
                  rating={4.5}
                  tags={item.tags}
                />

              ))}
            </Flex>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}><Button type="primary" onClick={() => navigate('/category')}>Xem thêm</Button></div>
        </>
      )}
    </>
  );
};
export default HomePage;