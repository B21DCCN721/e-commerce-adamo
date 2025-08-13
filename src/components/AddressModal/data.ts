export const provinces = [
  { code: "01", name: "Hà Nội" },
  { code: "79", name: "Hồ Chí Minh" },
  { code: "48", name: "Đà Nẵng" },
  // ... thêm đủ 63 tỉnh/thành phố
];

export const districts = [
  { code: "001", name: "Ba Đình", provinceCode: "01" },
  { code: "002", name: "Hoàn Kiếm", provinceCode: "01" },
  { code: "760", name: "Quận 1", provinceCode: "79" },
  { code: "770", name: "Quận 7", provinceCode: "79" },
  { code: "490", name: "Hải Châu", provinceCode: "48" },
  // ...
];

export const wards = [
  { code: "00001", name: "Phúc Xá", districtCode: "001" },
  { code: "00004", name: "Trúc Bạch", districtCode: "001" },
  { code: "26734", name: "Bến Nghé", districtCode: "760" },
  { code: "26737", name: "Bến Thành", districtCode: "760" },
  { code: "20101", name: "Thạch Thang", districtCode: "490" },
  // ...
];
