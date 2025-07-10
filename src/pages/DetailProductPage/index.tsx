import { Col, Empty, Flex, Row, Tag, Typography } from "antd";
import AddToCart from "../../components/AddToCart";
import styles from "./DetailProductPage.module.css";
import type { Size, ProductWithSizes } from "../../schemas/product";
import { StarFilled } from "@ant-design/icons";
import { useState } from "react";
import { mockClothingProducts, mockReview } from "./data";
import { useParams } from "react-router-dom";
import ReviewCard from "../../components/ReviewCard";
import type { Review } from "../../schemas/review";

const DetailProductPage = () => {
    const { id } = useParams();
    const normalizedProducts: ProductWithSizes[] = mockClothingProducts.map(product => ({
        ...product,
        sizes: product.sizes.map(size => ({
            ...size,
            size: size.size as Size,
        }))
    }));
    const normalizedReviews: Review[] = mockReview.map(review => ({
        ...review,
        contents: review.contents.map(content => ({
            ...content,
            type: content.type === "text" || content.type === "image" ? content.type : "text",
        }))
    }));
    const product: ProductWithSizes | undefined = normalizedProducts.find((item) => item.id === Number(id ?? -1));
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedSize, setSelectedSize] = useState<Size>('S');

    return (
        <>
            {
                product ? (
                    <>
                        <Row>
                            <Col span={12}>
                                <div className={styles['box_imgProduct']}>
                                    <img src={product.image} alt={product.name} className={styles['box_imgProduct-img']} />
                                </div>
                            </Col>
                            <Col span={12} className={styles['box_infoProduct']}>
                                <div>
                                    <Flex gap={4}>
                                        {product.tags.map(tag => (
                                            <Tag color="magenta">{tag}</Tag>
                                        ))}
                                    </Flex>
                                    <Typography.Title level={2}>{product.name}</Typography.Title>
                                    <p><Typography.Title level={5}>Thể loại: </Typography.Title> {product.category}</p>
                                    <p>
                                        <Typography.Title level={5}>Giá: </Typography.Title>  <span className={styles['box_infoProduct-price']}>{product.price.toLocaleString()}₫</span>
                                        {product.oldPrice && (
                                            <span className={styles['box_infoProduct-oldPrice']}>
                                                {product.oldPrice.toLocaleString()}₫
                                            </span>
                                        )}
                                    </p>
                                    <Typography.Title level={5}>Chi tiết: </Typography.Title>
                                    <p>{product.description}</p>
                                    <p><Typography.Title level={5}>Kho: </Typography.Title>
                                        <Flex gap={8} wrap>
                                            {product.sizes.map((item, index) =>
                                                (<Tag key={index} color="default">Size {item.size}: {item.quantity}</Tag>)
                                            )}
                                        </Flex>
                                    </p>
                                    <p><Typography.Title level={5}>Đánh giá: </Typography.Title> {product.rating} <StarFilled style={{ color: "#e2f01d" }} /> </p>
                                </div>
                                <AddToCart item={
                                    {
                                        id: Math.random(),
                                        productId: product.id,
                                        selected: false,
                                        name: product.name,
                                        price: product.price,
                                        quantity: quantity,
                                        image: product.image,
                                        description: product.description,
                                        size: selectedSize
                                    }
                                }
                                    setQuantity={setQuantity}
                                    defaultQuantity={quantity}
                                    selectedSize={selectedSize}
                                    setSelectedSize={setSelectedSize}
                                    quantityForSize={product.sizes}
                                />
                            </Col>
                        </Row>
                        <div className={styles['box_review']}>
                            <Typography.Title level={3}>ĐÁNH GIÁ SẢN PHẨM</Typography.Title>
                            {normalizedReviews.length > 0 ? (
                                normalizedReviews.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))
                            ) : (
                                <Typography.Text>abc</Typography.Text>
                            )}
                        </div>

                    </>
                ) : (
                    <Empty />
                )
            }
        </>
    )
}
export default DetailProductPage;