type Order = {
  id: string;
  date: string;
  total: number;
  paymentMethod: "cash" | "banking";
};

export const orders: Order[] = [
  // ==== Tuần này (giả sử tuần hiện tại bắt đầu 11/08/2025) ====
  { id: "A1", date: "2025-08-11", total: 1200000, paymentMethod: "cash" },
  { id: "A2", date: "2025-08-12", total: 2500000, paymentMethod: "banking" },
  { id: "A3", date: "2025-08-13", total: 1800000, paymentMethod: "cash" },

  // ==== Tháng 8/2025 (thêm các ngày khác trong tháng) ====
  { id: "A4", date: "2025-08-01", total: 2000000, paymentMethod: "banking" },
  { id: "A5", date: "2025-08-05", total: 1500000, paymentMethod: "cash" },
  { id: "A6", date: "2025-08-20", total: 3000000, paymentMethod: "banking" },
  { id: "A7", date: "2025-08-25", total: 900000, paymentMethod: "cash" },
  { id: "A8", date: "2025-08-28", total: 1700000, paymentMethod: "cash" },

  // ==== Tháng 7/2025 ====
  { id: "B1", date: "2025-07-02", total: 2100000, paymentMethod: "cash" },
  { id: "B2", date: "2025-07-10", total: 2600000, paymentMethod: "banking" },
  { id: "B3", date: "2025-07-22", total: 1200000, paymentMethod: "cash" },

  // ==== Tháng 6/2025 ====
  { id: "C1", date: "2025-06-05", total: 1900000, paymentMethod: "banking" },
  { id: "C2", date: "2025-06-14", total: 800000, paymentMethod: "cash" },
  { id: "C3", date: "2025-06-27", total: 2200000, paymentMethod: "banking" },

  // ==== Tháng 5/2025 ====
  { id: "D1", date: "2025-05-03", total: 1700000, paymentMethod: "cash" },
  { id: "D2", date: "2025-05-15", total: 2500000, paymentMethod: "banking" },
  { id: "D3", date: "2025-05-29", total: 1100000, paymentMethod: "cash" },

  // ==== Tháng 4/2025 ====
  { id: "E1", date: "2025-04-04", total: 2000000, paymentMethod: "cash" },
  { id: "E2", date: "2025-04-16", total: 2300000, paymentMethod: "banking" },
  { id: "E3", date: "2025-04-27", total: 900000, paymentMethod: "cash" },

  // ==== Tháng 3/2025 ====
  { id: "F1", date: "2025-03-01", total: 1500000, paymentMethod: "banking" },
  { id: "F2", date: "2025-03-15", total: 2800000, paymentMethod: "cash" },
  { id: "F3", date: "2025-03-30", total: 1000000, paymentMethod: "cash" },

  // ==== Tháng 2/2025 ====
  { id: "G1", date: "2025-02-05", total: 1700000, paymentMethod: "cash" },
  { id: "G2", date: "2025-02-14", total: 900000, paymentMethod: "banking" },
  { id: "G3", date: "2025-02-28", total: 2100000, paymentMethod: "cash" },

  // ==== Tháng 1/2025 ====
  { id: "H1", date: "2025-01-07", total: 2000000, paymentMethod: "banking" },
  { id: "H2", date: "2025-01-15", total: 1500000, paymentMethod: "cash" },
  { id: "H3", date: "2025-01-25", total: 1200000, paymentMethod: "banking" },
];