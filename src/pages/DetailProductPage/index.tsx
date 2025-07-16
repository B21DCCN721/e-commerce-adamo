import { Button, Col, Empty, Flex, Row, Tag, Typography } from "antd";
import AddToCart from "../../components/AddToCart";
import styles from "./DetailProductPage.module.css";
import type { ProductWithVariants } from "../../types/product";
import type { Size } from "../../types/size";
import { StarFilled } from "@ant-design/icons";
import { useState } from "react";
import { mockClothingProducts, mockReview } from "./data";
import { useParams } from "react-router-dom";
import ReviewCard from "../../components/ReviewCard";
import type { Review } from "../../types/review";

const DetailProductPage = () => {
    const { id } = useParams();

    const normalizedProducts: ProductWithVariants[] = mockClothingProducts.map(product => ({
        ...product,
        variants: product.variants.map(variant => ({
            ...variant,
            sizes: variant.sizes.map(size => ({
                ...size,
                size: size.size as Size,
            }))
        })),
    }));

    const normalizedReviews: Review[] = mockReview.map((review) => ({
        ...review,
        contents: review.contents.map((content) => ({
            ...content,
            type: content.type === "text" || content.type === "image" ? content.type : "text",
        }))
    }));

    const product: ProductWithVariants | undefined = normalizedProducts.find((item) => item.id === Number(id ?? -1));
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedSize, setSelectedSize] = useState<Size>('S');
    const [selectedColor, setSelectedColor] = useState<string>(product?.variants[0]?.color || "");

    const selectedVariant = product?.variants.find(v => v.color === selectedColor);

    return (
        <>
            {product ? (
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
                                    {product.tags.map((tag, index) => (
                                        <Tag key={index} color="magenta">{tag}</Tag>
                                    ))}
                                </Flex>
                                <Typography.Title level={2}>{product.name}</Typography.Title>
                                <p><Typography.Title level={5}>Thể loại: </Typography.Title> {product.category}</p>
                                <p>
                                    <Typography.Title level={5}>Giá: </Typography.Title>
                                    <span className={styles['box_infoProduct-price']}>{product.price.toLocaleString()}₫</span>
                                    {product.oldPrice && (
                                        <span className={styles['box_infoProduct-oldPrice']}>
                                            {product.oldPrice.toLocaleString()}₫
                                        </span>
                                    )}
                                </p>
                                <Typography.Title level={5}>Chi tiết: </Typography.Title>
                                <p>{product.description}</p>

                                <p>
                                    <Typography.Title level={5}>Màu sắc: </Typography.Title>
                                    <Flex gap={8} wrap>
                                        {product.variants.map((variant, index) => (
                                            <Button
                                                key={index}
                                                type={variant.color === selectedColor ? 'primary' : 'default'}
                                                onClick={() => {
                                                    setSelectedColor(variant.color);
                                                    setSelectedSize(variant.sizes[0]?.size || 'S');
                                                }}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {variant.color}
                                            </Button>
                                        ))}
                                    </Flex>
                                </p>

                                <p>
                                    <Typography.Title level={5}>Kho theo size: </Typography.Title>
                                    <Flex gap={8} wrap>
                                        {selectedVariant?.sizes.map((item, index) => (
                                            <Tag key={index} color="default">
                                                Size {item.size}: {item.quantity}
                                            </Tag>
                                        ))}
                                    </Flex>
                                </p>

                                <p>
                                    <Typography.Title level={5}>Đánh giá: </Typography.Title>
                                    {product.rating} <StarFilled style={{ color: "#FAAD14" }} />
                                </p>
                            </div>

                            <AddToCart
                                item={{
                                    id: Math.random(),
                                    productId: product.id,
                                    selected: false,
                                    name: product.name,
                                    price: product.price,
                                    oldPrice: product.oldPrice,
                                    category: product.category,
                                    quantity: quantity,
                                    image: product.image,
                                    description: product.description,
                                    size: selectedSize,
                                    color: selectedColor,
                                }}
                                setQuantity={setQuantity}
                                defaultQuantity={quantity}
                                selectedSize={selectedSize}
                                setSelectedSize={setSelectedSize}
                                quantityForSize={selectedVariant?.sizes ?? []}
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
                            <Typography.Text>Chưa có đánh giá nào.</Typography.Text>
                        )}
                    </div>
                </>
            ) : (
                <Empty />
            )}
        </>
    );
};

export default DetailProductPage;
