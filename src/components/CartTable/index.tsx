import React from 'react';
import { Table, Checkbox, InputNumber, Button, Image, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { changeQuantityItem, changeSizeItem, removeFromCart, selectItem } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../../types/cart';
import styles from "./CartTable.module.css";
import type { Size } from '../../types/size';
interface CartTableProps {
  items: CartItem[];
}

const CartTable: React.FC<CartTableProps> = ({ items }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isAllSelected = items.length > 0 && items.every((item) => item.selected);

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    dispatch(selectItem({ checked, selectAll: true }));
  };

  const handleSelectItem = (id: number) => {
    const cartItem = items.find((item) => item.id === id);
    dispatch(selectItem({ id, checked: !(cartItem?.selected ?? false), selectAll: false }));
  };

  const handleQuantityChange = (id: number, value: number | null) => {
    if (value === null || value < 1) return;
    dispatch(changeQuantityItem({ id, quantity: value }))
  };
  const handleSizeChange = (id: number, value: Size | null) => {
    if (value === null) return;
    dispatch(changeSizeItem({ id, size: value }))
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const total = items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const columns: ColumnsType<CartItem> = [
    {
      title: <Checkbox checked={isAllSelected} onChange={handleSelectAll} />,
      dataIndex: 'selected',
      key: 'selected',
      render: (_value, record) => (
        <Checkbox
          checked={record.selected}
          onChange={() => handleSelectItem(record.id)}
        />
      ),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_value, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={record.image} width={60} preview={false} style={{ marginRight: '10px' }} />
          <div style={{ marginLeft: '10px' }}>
            <div>{record.name}</div>
            <div style={{ fontSize: 12, color: '#999' }}>{record.description}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()}₫`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_value, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: 'Kích thước',
      key: 'size',
      render: (_value, record) => (
        <Select
          defaultValue={record.size}
          style={{ width: 120 }}
          onChange={(value) => handleSizeChange(record.id, value)}
          options={[
            { value: 'S', label: 'S' },
            { value: 'M', label: 'M' },
            { value: 'L', label: 'L' },
            { value: 'XL', label: 'XL' },
          ]}
        />
      )
    },
     {
      title: 'Màu sắc',
      key: 'color',
      render: (_value, record) =>
        `${(record.color)}`,
    },
    {
      title: 'Số tiền',
      key: 'total',
      render: (_value, record) =>
        `${(record.price * record.quantity).toLocaleString()}₫`,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_value, record) => (
        <Button type="text" danger onClick={() => handleRemove(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        rowKey="id"
      />
      <div
        className={styles['purchase']}
      >
        <span className={styles['purchase_title']}>
          Tổng cộng:{' '}
          <strong className={styles['purchase_title-price']}>
            {total.toLocaleString()}₫
          </strong>
        </span>
        <Button type="primary" size="large" disabled={total === 0} onClick={() => navigate('/payment')}>
          Mua hàng
        </Button>
      </div>
    </div>
  );
};

export default CartTable;
