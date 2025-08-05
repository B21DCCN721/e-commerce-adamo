import { useEffect, useState, useMemo } from "react";
import { 
  Typography, Empty, Menu, Layout, Flex, Pagination, Input, 
  Space, Spin, Checkbox, Divider, Rate, Slider, Button 
} from "antd";
import type { Product } from "../../../types/product";
import ProductCard from "../../../components/ProductCard";
import { getListProducts } from "../../../services/productService";
import { useSearchParams } from "react-router-dom";

const { Sider, Content } = Layout;

const CategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeKey, setActiveKey] = useState<string>(searchParams.get("category") || "Áo");
  const [categories] = useState<string[]>(["Áo", "Quần", "Giày"]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchText, setSearchText] = useState<string>(searchParams.get("q") || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice") || 0),
    Number(searchParams.get("maxPrice") || 1000000),
  ]);
  const [inStockOnly, setInStockOnly] = useState(searchParams.get("stock") === "1");
  const [minRating, setMinRating] = useState<number>(Number(searchParams.get("rating") || 0));
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page") || 1)
  );
  const [pageSize] = useState(5);

  // fetch product
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

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
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
  }, [products, activeKey, searchText, priceRange, inStockOnly, minRating, selectedTags]);

  // Pagination slice
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Đồng bộ filter lên URL param
  useEffect(() => {
    const params: Record<string, string> = {};
    if (activeKey) params.category = activeKey;
    if (searchText) params.q = searchText;
    if (priceRange[0] !== 0) params.minPrice = String(priceRange[0]);
    if (priceRange[1] !== 1000000) params.maxPrice = String(priceRange[1]);
    if (inStockOnly) params.stock = "1";
    if (minRating > 0) params.rating = String(minRating);
    if (selectedTags.length > 0) params.tags = selectedTags.join(",");
    if (currentPage > 1) params.page = String(currentPage);

    setSearchParams(params, { replace: true });
  }, [
    activeKey, searchText, priceRange, inStockOnly, 
    minRating, selectedTags, currentPage, setSearchParams
  ]);

  const handleResetFilter = () => {
    setActiveKey("Áo");
    setSearchText("");
    setPriceRange([0, 1000000]);
    setInStockOnly(false);
    setMinRating(0);
    setSelectedTags([]);
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
  };

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
        <Input.Search 
          placeholder="Tìm kiếm sản phẩm" 
          allowClear 
          enterButton 
          size="middle"
          defaultValue={searchText}          
          onSearch={(value) => setSearchText(value)} 
          style={{ width: 400, marginLeft: '32px' }} 
        />
        <Button type="primary" onClick={handleResetFilter}>Đặt lại</Button>
      </Space>
      <Layout>
        <Sider width={264} theme="light">
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            onClick={({ key }) => { setActiveKey(key); setCurrentPage(1); }}
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
              onChange={(value) => { setPriceRange(value as [number, number]); setCurrentPage(1); }}
            />

            <Divider />

            <Checkbox 
              checked={inStockOnly} 
              onChange={(e) => { setInStockOnly(e.target.checked); setCurrentPage(1); }}
            >
              Chỉ hiển thị còn hàng
            </Checkbox>

            <Divider />

            <Typography.Text strong>Tối thiểu {minRating} sao</Typography.Text>
            <Rate
              allowClear
              value={minRating}
              onChange={(value) => { setMinRating(value || 0); setCurrentPage(1); }}
            />

            <Divider />

            <Typography.Text strong>Tags</Typography.Text>
            <Checkbox.Group
              options={["Best seller", "Hết hàng", "Rẻ vô địch", "Flash sale"]}
              value={selectedTags}
              onChange={(list) => { setSelectedTags(list as string[]); setCurrentPage(1); }}
            />
          </div>
        </Sider>
        <Layout style={{ padding: "0 24px" }}>
          <Content>
            {loading ? (
              <Flex justify="center" align="center"><Spin size="large" /></Flex>
            ) : renderProducts()}
          </Content>
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
