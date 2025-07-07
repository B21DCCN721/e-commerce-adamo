import { useEffect, useState } from "react";
import { Typography, Tabs, Row, Col, Card, Tooltip, Empty } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import type { TabsProps } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../../store";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number; // giá cũ nếu đang khuyến mãi
  description: string;
  image: string;
  inStock: boolean;
  rating: number; // từ 1–5
  tags: string[]; // ví dụ: ['sale', 'hot']
};

const CatogoryPage = () => {
  const [activeKey, setActiveKey] = useState<string>('Áo');
  const [categories] = useState<string[]>(['Áo', 'Quần', 'Giày']);
  const cart = useSelector((state: RootState) => state.cart.items);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Áo thun nam thể thao",
      category: "Áo",
      price: 250000,
      oldPrice: 300000,
      description: "Chất liệu cotton co giãn 4 chiều, thấm hút mồ hôi.",
      image: "https://picsum.photos/id/101/300/200",
      inStock: true,
      rating: 4.5,
      tags: ["sale", "new"],
    },
    {
      id: 2,
      name: "Áo sơ mi trắng công sở",
      category: "Áo",
      price: 320000,
      description: "Thiết kế cổ điển, phù hợp đi làm và sự kiện.",
      image: "https://picsum.photos/id/102/300/200",
      inStock: false,
      rating: 4.2,
      tags: ["out-of-stock"],
    },
    {
      id: 3,
      name: "Quần jeans nam rách nhẹ",
      category: "Quần",
      price: 450000,
      oldPrice: 480000,
      description: "Form slimfit trẻ trung, năng động.",
      image: "https://picsum.photos/id/103/300/200",
      inStock: true,
      rating: 4.8,
      tags: ["hot"],
    },
    {
      id: 4,
      name: "Giày sneaker trắng",
      category: "Giày",
      price: 690000,
      description: "Thiết kế unisex, dễ phối đồ, đế cao su non.",
      image: "https://picsum.photos/id/104/300/200",
      inStock: true,
      rating: 5,
      tags: ["best-seller"],
    },
    {
      id: 5,
      name: "Giày boot cổ cao da lộn",
      category: "Giày",
      price: 980000,
      description: "Chất liệu da lộn cao cấp, đế chắc chắn, chống trượt.",
      image: "https://picsum.photos/id/105/300/200",
      inStock: true,
      rating: 4.3,
      tags: ["premium"],
    },
    {
      id: 6,
      name: "Quần short kaki nam",
      category: "Quần",
      price: 270000,
      description: "Thích hợp mặc đi chơi, dạo phố hoặc ở nhà.",
      image: "https://picsum.photos/id/106/300/200",
      inStock: true,
      rating: 4.0,
      tags: [],
    },
  ]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Áo thun nam thể thao",
        category: "Áo",
        price: 250000,
        oldPrice: 300000,
        description: "Chất liệu cotton co giãn 4 chiều, thấm hút mồ hôi.",
        image: "https://picsum.photos/id/101/300/200",
        inStock: true,
        rating: 4.5,
        tags: ["sale", "new"],
      },
      {
        id: 2,
        name: "Áo sơ mi trắng công sở",
        category: "Áo",
        price: 320000,
        description: "Thiết kế cổ điển, phù hợp đi làm và sự kiện.",
        image: "https://picsum.photos/id/102/300/200",
        inStock: false,
        rating: 4.2,
        tags: ["out-of-stock"],
      },
      {
        id: 3,
        name: "Quần jeans nam rách nhẹ",
        category: "Quần",
        price: 450000,
        oldPrice: 480000,
        description: "Form slimfit trẻ trung, năng động.",
        image: "https://picsum.photos/id/103/300/200",
        inStock: true,
        rating: 4.8,
        tags: ["hot"],
      },
      {
        id: 4,
        name: "Giày sneaker trắng",
        category: "Giày",
        price: 690000,
        description: "Thiết kế unisex, dễ phối đồ, đế cao su non.",
        image: "https://picsum.photos/id/104/300/200",
        inStock: true,
        rating: 5,
        tags: ["best-seller"],
      },
      {
        id: 5,
        name: "Giày boot cổ cao da lộn",
        category: "Giày",
        price: 980000,
        description: "Chất liệu da lộn cao cấp, đế chắc chắn, chống trượt.",
        image: "https://picsum.photos/id/105/300/200",
        inStock: true,
        rating: 4.3,
        tags: ["premium"],
      },
      {
        id: 6,
        name: "Quần short kaki nam",
        category: "Quần",
        price: 270000,
        description: "Thích hợp mặc đi chơi, dạo phố hoặc ở nhà.",
        image: "https://picsum.photos/id/106/300/200",
        inStock: true,
        rating: 4.0,
        tags: [],
      },
    ])
    setProducts((prevProducs) => (
      prevProducs.filter((item) => item.category == activeKey)
    ))
  }, [activeKey])
  console.log('cart: ', cart);
  const renderProducts = () => (
    <Row gutter={[16, 16]}>
      {products && products.length !== 0 ? products.map((product, index) => (
        <Col span={6} key={index}>
          <Card
            onClick={() => navigate(`/product/detail/${product.id}`)}
            hoverable
            style={{ height: 350 }}
            cover={
              <img
                alt={product.name}
                src={product.image}
                style={{ height: 200, objectFit: 'cover' }}
              />
            }
            actions={
              [
                <p>Giá bán: {product.price}</p>,
                <Tooltip title="Thêm vào giỏ" key="cart">
                  <ShoppingCartOutlined style={{ fontSize: 20 }} onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addToCart({
                      id: product.id,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                      quantity: 1,
                      description: product.description,
                    }))
                  }} />
                </Tooltip>,
              ]
            }
          >
            <Card.Meta title={product.name} description={<div style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {product.description}
            </div>} />
          </Card>
        </Col>
      )) : <Empty />}
    </Row>
  );
  const tabItems: TabsProps['items'] = categories.map((category) => ({
    key: category,
    label: category,
    children: renderProducts(),
  }));

  return (
    <DefaultLayout>
      <Typography.Title level={3}>Danh mục sản phẩm</Typography.Title>
      <Tabs
        tabPosition='left'
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={tabItems}
      />
    </DefaultLayout>
  );
}
export default CatogoryPage;