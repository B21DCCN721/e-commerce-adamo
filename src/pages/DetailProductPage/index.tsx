import { Button, Col, Empty, Flex, Rate, Row, Spin, Tag, Typography } from "antd";
import AddToCart from "../../components/AddToCart";
import styles from "./DetailProductPage.module.css";
import type { ProductWithVariants } from "../../types/product";
import type { Size } from "../../types/size";
import { StarFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../../components/ReviewCard";
import type { Review } from "../../types/review";
import { getProductById } from "../../services/productService";
import { getListReviews } from "../../services/reviewService";

const DetailProductPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<ProductWithVariants>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedSize, setSelectedSize] = useState<Size>('S');
    const [selectedColor, setSelectedColor] = useState<string>(product?.variants[0]?.color || "");
    const selectedVariant = product?.variants.find(v => v.color === selectedColor);
    const [selectedFilter, setSelectedFilter] = useState<number | 'all' | 'hasImage'>('all');

    // lấy thông tin sản phẩm
    useEffect(() => {
        const fetchProductById = async () => {
            try {
                setLoading(true);
                const productId = Number(id);
                if (!id || isNaN(productId)) {
                    console.error("ID không hợp lệ:", id);
                    return;
                }
                const data = await getProductById(productId - 1);
                if (data) {
                    setProduct({
                        ...data,
                        variants: data.variants.map(variant => ({
                            ...variant,
                            sizes: variant.sizes.map(size => ({
                                ...size,
                                size: size.size as Size,
                            }))
                        })),
                    });
                    setSelectedColor(data?.variants[0]?.color)
                } else {
                    console.error("Không tìm thấy sản phẩm với ID:", productId);
                }
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductById();
    }, [id]);
    // lấy thông tin review
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await getListReviews();
                setReviews(response.filter(review => review.productId === Number(id))
                    .sort((a, b) => b.rating - a.rating));
            } catch (error) {
                console.error("Failed to load reviews", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [id]);
    // bộ lọc cho review
    const ratingSummary = {
        average: reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : '0.0',
        total: reviews.length,
        byStar: [5, 4, 3, 2, 1].map(star => ({
            star,
            count: reviews.filter(r => r.rating === star).length
        })),
        imageCount: reviews.filter(r =>
            r.contents.some(c => c.type === 'image')
        ).length,
    };

    const filteredReviews = reviews.filter(r => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'hasImage') return r.contents.some(c => c.type === 'image');
        return r.rating === selectedFilter;
    });

    if (loading) {
        return <Flex justify="center"><Spin size="large" /></Flex>;
    }
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
                                    {product.rating} <StarFilled style={{ color: "#fadb14" }} />
                                </p>
                            </div>

                            <AddToCart
                                item={{
                                    ...product,
                                    id: Math.random(),
                                    productId: product.id,
                                    selected: false,
                                    quantity: quantity,
                                    image: product.image,
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

                        {reviews.length > 0 && (
                            <div style={{ marginBottom: 16 }}>
                                <Flex align="center" gap={20} style={{ marginBottom: 16 }}>
                                    <Typography.Title level={2} style={{ color: 'red', margin: 0 }}>
                                        {ratingSummary.average} <small>trên 5</small>
                                    </Typography.Title>
                                    <Flex vertical>
                                        <Rate allowHalf value={Number(ratingSummary.average)}/>
                                        <Typography.Text>
                                            {ratingSummary.total} đánh giá
                                        </Typography.Text>
                                    </Flex>
                                </Flex>

                                <Flex gap={8} wrap>
                                    <Button
                                        type={selectedFilter === 'all' ? 'primary' : 'default'}
                                        onClick={() => setSelectedFilter('all')}
                                    >
                                        Tất Cả
                                    </Button>

                                    {ratingSummary.byStar.map(item => (
                                        <Button
                                            key={item.star}
                                            type={selectedFilter === item.star ? 'primary' : 'default'}
                                            onClick={() => setSelectedFilter(item.star)}
                                        >
                                            {item.star} Sao ({item.count})
                                        </Button>
                                    ))}

                                    <Button
                                        type={selectedFilter === 'hasImage' ? 'primary' : 'default'}
                                        onClick={() => setSelectedFilter('hasImage')}
                                    >
                                        Có Hình Ảnh ({ratingSummary.imageCount})
                                    </Button>
                                </Flex>
                            </div>
                        )}

                        {filteredReviews.length > 0 ? (
                            filteredReviews.map((review, index) => (
                                <ReviewCard key={index} review={review} />
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
