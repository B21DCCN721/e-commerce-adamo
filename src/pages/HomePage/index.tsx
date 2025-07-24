import { Typography, Flex, Carousel, Button, } from "antd";
import styles from "./HomePage.module.css";
import thumbNail1 from "../../assets/imgs/thumbNail1.png";
import thumbNail2 from "../../assets/imgs/thumbNail2.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { mockClothingProducts } from "./data";
import imgClothing from "../../assets/imgs/shrit.png"
import { useTranslation } from "react-i18next";


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
  const navigate = useNavigate();
  const { t } = useTranslation('home');

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
      <Typography.Title level={3}>{t('titleListProduct')}</Typography.Title>
      <div style={{marginLeft:"50px"}}>
        <Flex wrap={true} gap="large">
          {mockClothingProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              category={item.category}
              price={item.price}
              oldPrice={500000}
              image={imgClothing}
              inStock={true}
              rating={4.5}
              tags={item.tags}
            />
  
          ))}
        </Flex>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}><Button type="primary" onClick={() => navigate('/catogory')}>{t('btnMore')}</Button></div>
    </>
  );
};
export default HomePage;