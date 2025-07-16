import { useEffect, useState } from "react";
import { Typography, Empty, Menu, Layout, Flex, Pagination } from "antd";
import type { Product } from "../../types/product";
import { mockClothingProducts } from "./data";
import ProductCard from "../../components/ProductCard";
import imgClothing from "../../assets/imgs/shrit.png"

const { Sider, Content } = Layout;

const CatogoryPage = () => {
  const [activeKey, setActiveKey] = useState<string>("Áo");
  const [categories] = useState<string[]>(["Áo", "Quần", "Giày"]);
  const [allProducts] = useState<Product[]>(mockClothingProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);


  useEffect(() => {
    const filtered = allProducts.filter((item) => item.category === activeKey);
    setFilteredProducts(filtered);
  }, [activeKey, allProducts]);

  const renderProducts = () => (
    <Flex wrap={true} gap="large">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
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
        ))
      ) : (
        <Empty />
      )}
    </Flex>
  );

  return (
    <>
      <Typography.Title level={3}>Danh mục sản phẩm</Typography.Title>
      <Layout>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            onClick={({ key }) => setActiveKey(key)}
            items={categories.map((c) => ({
              key: c,
              label: c,
            }))}
          />
        </Sider>
        <Layout style={{ padding: "0 24px", }}>
          <Content>{renderProducts()}</Content>
          <Pagination style={{ marginTop: "8px" }} align="center" defaultCurrent={1} total={100} pageSize={20} showSizeChanger={false} onChange={(page) => console.log("category pagination", page)
          } />
        </Layout>
      </Layout>
    </>
  );
};

export default CatogoryPage;
