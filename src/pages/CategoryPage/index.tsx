import { useEffect, useState } from "react";
import { Typography, Empty, Menu, Layout, Flex, Pagination, Input, Space, Spin, Checkbox, Divider, Rate, Slider } from "antd";
import type { Product } from "../../types/product";
import ProductCard from "../../components/ProductCard";
import { getListProducts } from "../../services/productService";

const { Sider, Content } = Layout;

const CategoryPage = () => {
  const [activeKey, setActiveKey] = useState<string>("Áo");
  const [categories] = useState<string[]>(["Áo", "Quần", "Giày"]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState(5);

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
  // bộ lọc sản phẩm
  useEffect(() => {
    const filtered = products.filter((item) => {
      const matchCategory = item.category === activeKey;
      const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
      const matchPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchStock = !inStockOnly || item.inStock;
      const matchRating = item.rating >= minRating;
      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.some(selectedTag =>
          item.tags?.some(itemTag => itemTag.toLowerCase() === selectedTag.toLowerCase())
        );


      return matchCategory && matchSearch && matchPrice && matchStock && matchRating && matchTags;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [activeKey, products, searchText, priceRange, inStockOnly, minRating, selectedTags]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderProducts = () => (
    <Flex wrap={true} gap="large">
      {paginatedProducts.length > 0 ? (
        paginatedProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            category={item.category}
            price={item.price}
            oldPrice={item.oldPrice}
            image={item.image}
            inStock={item.inStock}
            rating={item.rating}
            tags={item.tags}
          />
        ))
      ) : (
        <Flex flex={1} justify="center"><Empty /></Flex>
      )}
    </Flex>
  );

  return (
    <>
      <Space size='middle' align="center" style={{ margin: '0 0 16px' }}>
        <Typography.Title level={3}>Danh mục sản phẩm</Typography.Title>
        <Input.Search placeholder="Tìm kiếm sản phẩm" allowClear enterButton size="middle"
          onSearch={setSearchText}
          style={{ width: 400, marginLeft: '32px' }} />
      </Space>
      <Layout>
        <Sider width={264} theme="light">
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            onClick={({ key }) => setActiveKey(key)}
            items={categories.map((c) => ({ key: c, label: c }))}
          />
          <Divider />
          <div style={{ padding: "0 16px" }}>
            <Typography.Text strong>Khoảng giá</Typography.Text>
            <Slider
              range
              min={0}
              max={1000000}
              step={50000}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
            />

            <Divider />

            <Checkbox checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)}>
              Chỉ hiển thị còn hàng
            </Checkbox>

            <Divider />

            <Typography.Text strong>Tối thiểu {minRating} sao</Typography.Text>
            <Rate
              allowClear
              value={minRating}
              onChange={(value) => setMinRating(value)}
            />

            <Divider />

            <Typography.Text strong>Tags</Typography.Text>
            <Checkbox.Group
              options={["Best seller", "Hết hàng", "Rẻ vô địch", "Flash sale"]}
              value={selectedTags}
              onChange={(list) => setSelectedTags(list as string[])}
            />
          </div>
        </Sider>
        <Layout style={{ padding: "0 24px", }}>
          <Content>{loading ? (
            <Flex justify="center" align="center"><Spin tip="Loading" size="large" ></Spin></Flex>
          ) : renderProducts()}</Content>
          <Pagination
            style={{ marginTop: "8px" }}
            align="center"
            current={currentPage}
            total={filteredProducts.length}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={(page) => setCurrentPage(page)}
          />

        </Layout>
      </Layout>
    </>
  );
};

export default CategoryPage;