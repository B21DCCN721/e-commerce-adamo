import DefaultLayout from "../../layouts/DefaultLayout";
import { Card, Typography, Row, Col, Tooltip, Empty, Space,} from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, reduceQuantityItem, addToCart, clearCart } from "../../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../../store";
import styles from "./CartPage.module.css";
import ModalConfirm from "../../components/ModalConfirm";

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  description: string;
};;

const CartPage = () => {
  const listProducts: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  // const handleClearCart = () => {
  //   Modal.confirm({
  //     title: 'Bạn có chắc muốn xóa?',
  //     content: 'Hành động này không thể hoàn tác.',
  //     okText: 'Xác nhận',
  //     okType: 'danger',
  //     cancelText: 'Hủy',
  //     onOk() {
  //       console.log('Đã xác nhận');
  //       dispatch(clearCart())
  //     },
  //     onCancel() {
  //       console.log('Đã hủy');
  //     },
  //   });
  // }
  return (
    <DefaultLayout>
      <Space align="center" size="middle">
        <Typography.Title level={3}>
          Danh sách sản phẩm trong giỏ hàng
        </Typography.Title>
        <ModalConfirm btnTitle="Xóa toàn bộ" modalTitle="Xác nhận xóa" content="Hành động này không thể hoàn tác." disabled={listProducts.length === 0}
        onOk={() => dispatch(clearCart())}
        />
      </Space>
      <Row gutter={[16, 16]}>
        {listProducts.length !== 0 ? (
          listProducts.map((product, index) => (
            <Col span={6} key={index}>
              <Card
                hoverable
                className={styles.card}
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    className={styles['card_img']}
                  />
                }
                actions={
                  [
                    <p>Giá bán: <span>{product.price}</span></p>,
                    <p>Số lượng: <span>{product.quantity}</span></p>,
                    <Tooltip title="Thêm" key="plus">
                      <PlusOutlined style={{ fontSize: 20, color: 'green' }} onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToCart({
                          id: product.id,
                          name: product.name,
                          image: product.image,
                          price: product.price,
                          quantity: 1,
                          description: product.description,
                        }))
                      }} />
                    </Tooltip>,
                    <Tooltip title="Giảm" key="minus">
                      <MinusOutlined style={{ fontSize: 20, }} onClick={(e) => {
                        e.stopPropagation();
                        dispatch(reduceQuantityItem(product.id))
                      }} />
                    </Tooltip>,
                    <Tooltip title="Xóa khỏi giỏ hàng" key="remove">
                      <DeleteOutlined style={{ fontSize: 20, color: 'red' }} onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeFromCart(product.id))
                      }} />
                    </Tooltip>,
                  ]
                }
              >
                <Card.Meta title={product.name} description={<p className={styles['card_title']}>
                  {product.description}
                </p>} />
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}><Empty /></Col>
        )}
      </Row>
    </DefaultLayout>
  );
};

export default CartPage;
