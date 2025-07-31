/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Segmented, Empty, Spin, Flex, DatePicker, message } from "antd";
import type { Order } from "../../types/order";
import OrderCard from "../../components/OrderCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { changeStatus } from "../../features/order/orderSlice";
import { getListOrders, updatedOrder } from "../../services/orderService";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { addReview } from "../../services/reviewService";
import type { Review } from "../../types/review";
import convertToContentArray from "../../utils/convertDataReview";
const { RangePicker } = DatePicker;
// const orders: Order[] = [
//   {
//     id: 1,
//     customerId:1,
//     paymentMethod: 'cash',
//     customerPhone:"0123456789",
//     customerAddress: "Yên phương-Yên Lạc-Vĩnh Phúc",
//     status: "delivered",
//     isPaid: true,
//     deliverySuccessAt: "Giao hàng thành công",
//     totalAmount: 55000,
//     items: [
//       {
//         productId: 1,
//         productName: "Áo thể thao",
//         productImage: "https://picsum.photos/id/101/300/200",
//         productCategory: "Áo",
//         quantity: 1,
//         price: 55000,
//         oldPrice: 99000,
//       },
//     ],
//   },
//   {
//     id: 2,
//     customerId:1,
//     paymentMethod: 'cash',
//     customerPhone:"0123456789",
//     customerAddress: "Yên phương-Yên Lạc-Vĩnh Phúc",
//     status: "canceled",
//     statusLabel: "HỦY ĐƠN",
//     isPaid: false,
//     deliverySuccessAt: "Giao hàng thành công",
//     totalAmount: 55000,
//     items: [
//       {
//         id: 1,
//         productName: "Áo thể thao",
//         productImage: "https://picsum.photos/id/101/300/200",
//         productCategory: "Áo",
//         quantity: 1,
//         price: 55000,
//         oldPrice: 99000,
//       },
//     ],
//   },
//   {
//     id: 3,
//     customerId:1,
//     paymentMethod: 'cash',
//     customerPhone:"0123456789",
//     customerAddress: "Yên phương-Yên Lạc-Vĩnh Phúc",
//     status: "pending",
//     statusLabel: "Đợi xác nhận",
//     isPaid: false,
//     deliverySuccessAt: "Giao hàng thành công",
//     totalAmount: 55000,
//     items: [
//       {
//         id: 1,
//         productName: "Áo thể thao",
//         productImage: "https://picsum.photos/id/101/300/200",
//         productCategory: "Áo",
//         quantity: 1,
//         price: 55000,
//         oldPrice: 99000,
//       },
//       {
//         id: 2,
//         productName: "Áo thể thao",
//         productImage: "https://picsum.photos/id/101/300/200",
//         productCategory: "Áo",
//         quantity: 1,
//         price: 55000,
//         oldPrice: 99000,
//       },
//       {
//         id: 3,
//         productName: "Áo thể thao",
//         productImage: "https://picsum.photos/id/101/300/200",
//         productCategory: "Áo",
//         quantity: 1,
//         price: 55000,
//         oldPrice: 99000,
//       },
//     ],
//   },
// ];

const OrderHistoryPage = () => {
  const statusMap: Record<string, string | null> = {
    "Tất cả": null,
    "Đang xử lý": "pending",
    "Đã xác nhận": "confirmed",
    "Đang vận chuyển": "shipping",
    "Đã giao": "delivered",
    "Đã hủy": "canceled"
  };
  const [selectedStatus, setSelectedStatus] = useState<string>("Tất cả");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = localStorage.getItem('infoUser') ?? '';
  // lọc đơn hàng theo trạng thái và thời gian 
  const filteredOrders = orders.filter((order) => {
    const statusFilter = statusMap[selectedStatus];
    const matchStatus = statusFilter ? order.status === statusFilter : true;

    const matchDate = dateRange
      ? (() => {
        const createdAt = dayjs(order.updatedAt);
        return createdAt.isAfter(dateRange[0].startOf("day")) &&
          createdAt.isBefore(dateRange[1].endOf("day"));
      })()
      : true;

    return matchStatus && matchDate;
  });
  // lấy thông tin orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getListOrders();
        setOrders(response);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);
  // xử lý hủy đơn hàng
  const dispatch = useDispatch<AppDispatch>();
  const handleCanceled = (id: number) => {
    return dispatch(changeStatus({ id, status: "canceled" }));
  }
  // xử lý đánh giá sản phẩm
  const handleReviewProduct = async (data: any, indexItem, orderId) => {
    console.log('review-indexItem-orderId', data, indexItem, orderId);
    const payload: Review = {
      avatarUrl: JSON.parse(user).avatar,
      username: JSON.parse(user).name,
      productId: data.productId,
      rating: data.rating,
      contents: convertToContentArray(data.comment, data.images),
    }
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map((item, index) => {
            if(index === indexItem) {
              return {
                ...item,
                isReview: true
              }
            }
            return item;
          }
        )
        };
      }
      return order;
    });

    try {
      await addReview(payload);
      await updatedOrder(updatedOrders);
      message.success("Cảm ơn bạn đã đánh giá sản phẩm!");
    } catch (error) {
      console.error('Failed to add review', error);
      message.error("Lỗi, vui lòng thử lại sau");
    }
  }
  if (loading) {
    return <Flex justify="center"><Spin size="large" /></Flex>
  }
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Space direction="horizontal" size="middle" wrap style={{ width: "100%" }}>
        <Segmented
          options={["Tất cả", "Đang xử lý", "Đã xác nhận", "Đang vận chuyển", "Đã giao", "Đã hủy"]}
          defaultValue="Tất cả"
          onChange={(value) => setSelectedStatus(value as string)}
        />
        <RangePicker
          disabledDate={(current) => current && current > dayjs().endOf("day")}
          onChange={(range) => setDateRange(range as [Dayjs, Dayjs] | null)}
          format="DD/MM/YYYY"
          placeholder={["Từ ngày", "Đến ngày"]}
        />
      </Space>
      <div>
        {filteredOrders?.length ? (filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} handleCanceled={() => handleCanceled(order.id)} submitReview={handleReviewProduct} />
        ))) : (<Empty />)}
      </div>
    </Space>
  );
}
export default OrderHistoryPage;
