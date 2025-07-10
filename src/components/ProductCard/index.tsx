import { Card, Tag, Image, Typography, Button, Flex } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import type { Product } from '../../schemas/product';
import styles from "./ProductCard.module.css";
import { useNavigate } from 'react-router-dom';

const { Text, Paragraph } = Typography;
type ProductCardProps = Pick<Product, 'id' | 'name' | 'category' | 'inStock' | 'rating' | 'price' | 'oldPrice' | 'image' | 'tags'>;

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  inStock,
  price,
  oldPrice,
  image,
  tags,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      className={styles['card']}
      styles={{
        body: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        },
      }}
      cover={
        <Image
          alt={name}
          src={image}
          preview={false}
          // style={{ height: 140, objectFit: 'cover' }}
          className={styles['card_img']}
        />
      }
    >
      {/* Nội dung Card body */}
      <Flex vertical style={{ flex: 1 }}>

        <Flex wrap gap="small">
          {tags.map((tag, index) => (
            <Tag color="red" key={index}>
              {tag}
            </Tag>
          ))}
        </Flex>

        <Paragraph ellipsis={{ rows: 2 }} style={{ flex: 1 }}>{name}</Paragraph>
        <Flex align="center" justify='space-between'>
          <h4>{category}</h4>
          <h4>{inStock? "Còn hàng" : "Hết hàng"}</h4>
        </Flex>

        <Flex align="center" gap="small">
          <Text strong style={{ fontSize: 16, color: '#ff4d4f' }}>
            ₫{price.toLocaleString()}
          </Text>
          {oldPrice && (
            <Text delete style={{ color: '#999' }}>
              ₫{oldPrice.toLocaleString()}
            </Text>
          )}
        </Flex>

        <Button
          type="primary"
          size="small"
          icon={<ShoppingCartOutlined />}
          block
          onClick={()=> navigate(`/product/detail/${id}`)}
        >
          Mua ngay
        </Button>
      </Flex>
    </Card>

  );
};

export default ProductCard;
