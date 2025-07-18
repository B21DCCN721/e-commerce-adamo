import { Button, InputNumber, Typography, Space, Row, Col, Divider, Flex } from 'antd';
import type { Size } from '../../types/size';
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import type { CartItem } from '../../types/cart';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import type { AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';

interface AddToCartProps {
    item: CartItem;
    defaultQuantity: number;
    setQuantity: (quantity: number) => void;
    selectedSize: Size;
    setSelectedSize: (size: Size) => void;
    quantityForSize: { size: Size, quantity: number }[];
}
const AddToCart: React.FC<AddToCartProps> = ({ item, defaultQuantity, selectedSize, setSelectedSize, setQuantity, quantityForSize }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleAddToCart = (): void => {
        dispatch(addToCart(item));
        console.log('thêm vào giỏ hàng thành công', item);
    }
    const handleBuyNow = (): void => {
        dispatch(addToCart({
            ...item,
            selected: true
        }))
        navigate("/cart")
    }

    return (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {/* Size selection */}
            <div>
                <Typography.Text strong>Chọn Size</Typography.Text>
                <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                    {quantityForSize.map((item) => (
                        <Col key={item.size}>
                            <Button
                                type={selectedSize === item.size ? 'primary' : 'default'}
                                onClick={() => {
                                    setSelectedSize(item.size);
                                    setQuantity(1);
                                }}
                                disabled={item.quantity === 0}
                            >
                                {item.size}
                            </Button>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Quantity */}
            <div>
                <Typography.Text strong>Số Lượng</Typography.Text>
                <Space size="middle" style={{ marginLeft: 16 }}>
                    <InputNumber
                        min={1}
                        max={quantityForSize.find(q => q.size === selectedSize)?.quantity || 1}
                        value={defaultQuantity}
                        onChange={(value) => {
                            if (value !== null) setQuantity(value);
                        }}
                    />
                </Space>
            </div>


            <Divider />
            <Flex align="center" gap="large" wrap>
                <Button onClick={handleAddToCart} type="primary" icon={<ShoppingCartOutlined />}>Thêm vào giỏ hàng</Button>
                <Button onClick={handleBuyNow} type="primary" icon={<ShoppingOutlined />} iconPosition="end">Mua ngay</Button>
            </Flex>
        </Space>
    );
};

export default AddToCart;
