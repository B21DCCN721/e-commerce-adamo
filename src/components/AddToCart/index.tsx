import { Button, InputNumber, Tooltip } from "antd";
import { PlusSquareTwoTone, MinusSquareTwoTone } from "@ant-design/icons";
import styles from "./AddToCart.module.css";

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    description: string;
}

interface AddToCartProps {
    product: Product;
    defaultQuantity: number;
    onAdd: (product: Product) => void;
    setQuantity: (quantity: number) => void;
}


const AddToCart: React.FC<AddToCartProps> = ({ product, defaultQuantity, onAdd, setQuantity }) => {
    const handleAddToCart = (): void => {
        onAdd(product);
        console.log('thêm vào giỏ hàng thành công', product);
    }
    return (
        <div className={styles.addToCart}>
            <div className={styles['addToCart_infoProduct']}>
                <img src={product.image} className={styles['addToCart_img']} />
                <div className={styles['addToCart_infoProduct-paragraph']}>
                    <p>{product.name}</p>
                    <p>{product.price} đ</p>
                </div>
            </div>
            <div className={styles['addToCart_quantity']}>
                <p className={styles['addToCart_quantity-paragraph']}>Số lượng: </p>
                <Tooltip title='Giảm' key='minus'><MinusSquareTwoTone onClick={() => setQuantity(defaultQuantity - 1 > 0 ? defaultQuantity - 1 : 1)} /></Tooltip>
                <InputNumber min={1} value={defaultQuantity} defaultValue={defaultQuantity} onChange={(value) => { if (value !== null) setQuantity(value); }} />
                <Tooltip title='Thêm' key='add'><PlusSquareTwoTone onClick={() => setQuantity(defaultQuantity + 1)} /></Tooltip>
                <Button type="primary" htmlType="button" onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
            </div>
        </div>
    )
}
export default AddToCart;