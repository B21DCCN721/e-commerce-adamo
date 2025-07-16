// import { Button, InputNumber, Select, Tooltip } from "antd";
// import { PlusSquareTwoTone, MinusSquareTwoTone } from "@ant-design/icons";
// import styles from "./AddToCart.module.css";
// import type { CartItem } from "../../schemas/cart";

// interface AddToCartProps {
//     product: CartItem;
//     defaultQuantity: number;
//     onAdd: (product: CartItem) => void;
//     setQuantity: (quantity: number) => void;
//     size: 'S'|'M'|'L'|'XL';
//     setSize: (size: 'S'|'M'|'L'|'XL') => void;
//     quantityForSize: { size: 'S' | 'M' | 'L' | 'XL', quantity: number }[];
// }


// const AddToCart: React.FC<AddToCartProps> = ({ product, defaultQuantity, onAdd, setQuantity, size, setSize, quantityForSize }) => {
//     const handleAddToCart = (): void => {
//         onAdd(product);
//         console.log('thêm vào giỏ hàng thành công', product);
//     }
//     return (
//         <div className={styles.addToCart}>
//             <div className={styles['addToCart_infoProduct']}>
//                 <img src={product.image} className={styles['addToCart_img']} />
//                 <div className={styles['addToCart_infoProduct-paragraph']}>
//                     <p>{product.name}</p>
//                     <p>{product.price} đ</p>
//                 </div>
//             </div>
//             <div className={styles['addToCart_quantity']}>
//                 <p className={styles['addToCart_quantity-paragraph']}>Số lượng: </p>
//                 <Tooltip title='Giảm' key='minus'><MinusSquareTwoTone onClick={() => setQuantity(defaultQuantity - 1 > 0 ? defaultQuantity - 1 : 1)} /></Tooltip>
//                 <InputNumber min={1} value={defaultQuantity} defaultValue={defaultQuantity} onChange={(value) => { if (value !== null) setQuantity(value); }} />
//                 <Tooltip title='Thêm' key='add'><PlusSquareTwoTone onClick={() => setQuantity(defaultQuantity + 1)} /></Tooltip>
//                 <Select
//                     value={size}
//                     style={{ width: 120 }}
//                     onChange={(value) => setSize(value)}
//                     options={quantityForSize.map((s) => ({
//                         value: s.size,
//                         label: `Size ${s.size}`,
//                         disabled: s.quantity === 0,
//                     }))}
//                 />
//                 <Button type="primary" htmlType="button" onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
//             </div>
//         </div>
//     )
// }
// export default AddToCart;

import { Button, InputNumber, Typography, Space, Row, Col, Divider, Flex } from 'antd';
import type { Size } from '../../types/size';
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import type { CartItem } from '../../types/cart';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';

interface AddToCartProps {
    item: CartItem;
    defaultQuantity: number;
    setQuantity: (quantity: number) => void;
    selectedSize: Size;
    setSelectedSize: (size: Size) => void;
    quantityForSize: { size: Size, quantity: number }[];
}
const AddToCart: React.FC<AddToCartProps> = ({ item, defaultQuantity,selectedSize,setSelectedSize, setQuantity, quantityForSize }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (): void => {
        dispatch(addToCart(item));
        console.log('thêm vào giỏ hàng thành công', item);
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
                    <InputNumber min={1} value={defaultQuantity} defaultValue={defaultQuantity}
                     onChange={(value) => { if (value !== null) setQuantity(value); }} />
                </Space>
            </div>

            <Divider />
            <Flex align="center" gap="large" wrap>
                <Button onClick={handleAddToCart} type="primary" icon={<ShoppingCartOutlined />}>Thêm vào giỏ hàng</Button>
                <Button type="primary" icon={<ShoppingOutlined />} iconPosition="end">Mua ngay</Button>
            </Flex>
        </Space>
    );
};

export default AddToCart;
