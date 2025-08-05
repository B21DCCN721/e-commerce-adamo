/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Space, Segmented, Empty, Spin, Flex, DatePicker, message, Tooltip, Button
} from "antd";
import type { Order } from "../../../types/order";
import OrderCard from "../../../components/OrderCard";
import { useEffect, useState, useMemo } from "react";
import { getListOrdersByUid, updatedOrder } from "../../../services/orderService";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { addReview } from "../../../services/reviewService";
import type { Review } from "../../../types/review";
import convertToContentArray from "../../../utils/convertDataReview";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import type { CartItem } from "../../../types/cart";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { addItemsToCartServer } from "../../../services/cartService";
import { addToCart } from "../../../features/cart/cartSlice";

const { RangePicker } = DatePicker;

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const listLocalProducts: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const user = localStorage.getItem("infoUser") ?? "";
  const userId = localStorage.getItem("userId") ?? "";

  // URL Param
  const [searchParams, setSearchParams] = useSearchParams();

  const statusMap = useMemo(
    () => ({
      "Tất cả": null,
      "Đang xử lý": "pending",
      "Đã xác nhận": "confirmed",
      "Đang vận chuyển": "shipping",
      "Đã giao": "delivered",
      "Đã hủy": "canceled",
    }),
    []
  );

  const initialStatus = searchParams.get("status") || "Tất cả";
  const initialSort = (searchParams.get("sort") as "asc" | "desc") || "desc";
  const initialFrom = searchParams.get("from");
  const initialTo = searchParams.get("to");

  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSort);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(
    initialFrom && initialTo ? [dayjs(initialFrom), dayjs(initialTo)] : null
  );

  // Đồng bộ URL khi filter/sort thay đổi
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedStatus !== "Tất cả") params.status = selectedStatus;
    if (dateRange) {
      params.from = dateRange[0].format("YYYY-MM-DD");
      params.to = dateRange[1].format("YYYY-MM-DD");
    }
    params.sort = sortOrder;
    setSearchParams(params);
  }, [selectedStatus, dateRange, sortOrder, setSearchParams]);

  // Lấy danh sách orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getListOrdersByUid(userId);
        setOrders(response);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  // Lọc + sắp xếp đơn hàng
  const filteredOrders = useMemo(() => {
    const statusFilter = statusMap[selectedStatus];
    return orders
      .filter((order) => {
        const matchStatus = statusFilter ? order.status === statusFilter : true;
        const matchDate = dateRange
          ? (() => {
            const createdAt = dayjs(order.updatedAt);
            return (
              createdAt.isAfter(dateRange[0].startOf("day")) &&
              createdAt.isBefore(dateRange[1].endOf("day"))
            );
          })()
          : true;
        return matchStatus && matchDate;
      })
      .sort((a, b) => {
        const dateA = dayjs(a.updatedAt).valueOf();
        const dateB = dayjs(b.updatedAt).valueOf();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [orders, selectedStatus, dateRange, sortOrder, statusMap]);

  // Xử lý hủy đơn hàng
  const handleCancel = async (orderId: number) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          status: "canceled" as Order['status'],
        }
      }
      return order;
    });

    try {
      const response = await updatedOrder(userId, updatedOrders);
      setOrders(response);
      message.success('Hủy đơn hàng thành công')
    } catch (error) {
      console.error('Failed to cancel order', error);
      message.error('Hủy đơn hàng thất bại');
    }
  };

  // xử lý đặt lại đơn hàng
  const handleRepurchase = async (orderId: number) => {
    const orderRepurchase = orders.find((order) => order.id === orderId);
    if (!orderRepurchase) return;
    const repurchaseItems: CartItem[] = orderRepurchase.items.map((item) => ({
      ...item,
      selected: true,
      category: item.productCategory,
      color: item.productColor,
      name: item.productName,
      price: item.price,
      oldPrice: item.oldPrice,
      image: item.productImage,
      quantity: item.quantity,
      id: Date.now() + Math.random(),
      description: item.description,
      size: item.size,
    }));

    try {
      const newCart = [...listLocalProducts, ...repurchaseItems];
      await addItemsToCartServer(userId, newCart);
      repurchaseItems.forEach((item) => dispatch(addToCart(item)));
      message.success("Đã thêm lại vào giỏ hàng!");
    } catch (error) {
      console.error("Failed to repurchase item", error);
      message.error("Lỗi, vui lòng thử lại sau.");
    }
  };

  // Xử lý đánh giá sản phẩm
  const handleReviewProduct = async (data: any, indexItem: number, orderId: number) => {
    const payloadReview: Review = {
      userId: userId,
      avatarUrl: JSON.parse(user).avatar,
      username: JSON.parse(user).name,
      rating: data.rating,
      contents: convertToContentArray(data.comment, data.images),
    };
    let productReviewId = 0;
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map((item, index) =>
           {
             if(index === indexItem){
              productReviewId = item.productId;
              return {
                ...item, isReview: true
              }
            }
            return item;
           }
          ),
        };
      }
      return order;
    });

    try {
      await addReview(productReviewId.toString(), payloadReview);
      const response = await updatedOrder(userId, updatedOrders);
      setOrders(response);
      message.success("Cảm ơn bạn đã đánh giá sản phẩm!");
    } catch (error) {
      console.error("Failed to add review", error);
      message.error("Lỗi, vui lòng thử lại sau");
    }
  };

  // Clear Filter
  const handleClearFilter = () => {
    setSelectedStatus("Tất cả");
    setDateRange(null);
    setSortOrder("desc");
    setSearchParams({});
  };

  if (loading) {
    return (
      <Flex justify="center">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Bộ lọc + Sort */}
      <Space direction="horizontal" size="middle" wrap style={{ width: "100%" }}>
        <Segmented
          options={Object.keys(statusMap)}
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value as string)}
        />
        <RangePicker
          value={dateRange}
          disabledDate={(current) => current && current > dayjs().endOf("day")}
          onChange={(range) => setDateRange(range as [Dayjs, Dayjs] | null)}
          format="DD/MM/YYYY"
          placeholder={["Từ ngày", "Đến ngày"]}
        />
        <Tooltip
          title={sortOrder === "desc" ? "Thời gian giảm dần" : "Thời gian tăng dần"}
        >
          <span
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          >
            {sortOrder === "desc" ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
          </span>
        </Tooltip>

        <Button type="primary" onClick={handleClearFilter}>Đặt lại</Button>
      </Space>

      {/* Danh sách đơn hàng */}
      <div>
        {filteredOrders.length ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              handleCancel={() => handleCancel(order.id)}
              submitReview={handleReviewProduct}
              handleRepurchase={() => handleRepurchase(order.id)}
            />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </Space>
  );
};

export default OrderHistoryPage;
