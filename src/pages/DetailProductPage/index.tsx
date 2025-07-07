import { Col, Flex, Row, Tag, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import DefaultLayout from "../../layouts/DefaultLayout";
import AddToCart from "../../components/AddToCart";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import styles from "./DetailProductPage.module.css";
import { useState } from "react";
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
const DetailProductPage = () => {
    const product: Product = {
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
    }
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useDispatch();
    return (
        <DefaultLayout>
            <Row>
                <Col span={12}>
                    <div className={styles['block_imgProduct']}>
                        <img src={product.image} alt={product.name} className={styles['block_imgProduct-img']} />
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles['block_infoProduct']}>
                        <Flex gap={4}>
                            {product.tags.map(tag => (
                                <Tag color="magenta">{tag}</Tag>
                            ))}
                        </Flex>
                        <Typography.Title level={2}>{product.name}</Typography.Title>
                        <p><Typography.Title level={5}>Thể loại: </Typography.Title> {product.category}</p>
                        <p>
                            <Typography.Title level={5}>Giá: </Typography.Title>  <span style={{ color: "red" }}>{product.price.toLocaleString()}₫</span>
                            {product.oldPrice && (
                                <span style={{ textDecoration: "line-through", marginLeft: 8, color: "#888" }}>
                                    {product.oldPrice.toLocaleString()}₫
                                </span>
                            )}
                        </p>
                        <Typography.Title level={5}>Chi tiết: </Typography.Title>
                        <p>{product.description}</p>
                        <p><Typography.Title level={5}>Kho: </Typography.Title> {product.inStock ? "Còn hàng" : "Hết hàng"}</p>
                        <p><Typography.Title level={5}>Đánh giá: </Typography.Title> {product.rating} <StarFilled style={{color:"#e2f01d"}}/> </p>
                    </div>
                </Col>
            </Row>
            <AddToCart product={{
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity,
                description: product.description
            }}
                defaultQuantity={quantity}
                onAdd={(item) => dispatch(addToCart(item))}
                setQuantity={setQuantity}
            />
        </DefaultLayout>
    )
}
export default DetailProductPage;