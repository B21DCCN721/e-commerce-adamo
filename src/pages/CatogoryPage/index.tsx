import { useEffect, useState } from "react";
import { Typography, Empty, Menu, Layout, Flex, Pagination, Input, Space } from "antd";
import type { Product } from "../../types/product";
import { mockClothingProducts } from "./data";
import ProductCard from "../../components/ProductCard";

const { Sider, Content } = Layout;

const CatogoryPage = () => {
  const [activeKey, setActiveKey] = useState<string>("Áo");
  const [categories] = useState<string[]>(["Áo", "Quần", "Giày"]);
  const [allProducts] = useState<Product[]>(mockClothingProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<string>("");


  useEffect(() => {
    const filtered = allProducts.filter((item) => item.category === activeKey && item.name.toLowerCase().includes(searchText));
    setFilteredProducts(filtered);
  }, [activeKey, allProducts, searchText]);

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
            image={item.image}
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
      <Space size='middle' align="center" style={{margin: '0 0 16px'}}>
        <Typography.Title level={3}>Danh mục sản phẩm</Typography.Title>
        <Input.Search placeholder="Tìm kiếm sản phẩm" allowClear enterButton size="middle" 
        onSearch={setSearchText}
        style={{width:400, marginLeft: '16px'}}/>
      </Space>
      <Layout>
        <Sider width={264} theme="light">
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
          <Pagination style={{ marginTop: "8px" }} align="center" defaultCurrent={1} total={filteredProducts.length} pageSize={20} showSizeChanger={false} onChange={(page) => console.log("category pagination", page)
          } />
        </Layout>
      </Layout>
    </>
  );
};

export default CatogoryPage;
