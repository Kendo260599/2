// ================= Phong Thủy App – script.js =================

// ———————— Các bảng dữ liệu cơ bản ————————

// Thiên Can & Địa Chi
const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

// Bảng mệnh ngũ hành cho 60 cặp Can-Chi
const MENH_NGU_HANH = {
  "Giáp Tý":"Bính Lò Hỏa","Ất Sửu":"Bính Lò Hỏa",
  "Bính Dần":"Đại Khê Thủy","Đinh Mão":"Đại Khê Thủy",
  "Mậu Thìn":"Sa Trung Kim","Kỷ Tỵ":"Sa Trung Kim",
  "Canh Ngọ":"Tích Lịch Hỏa","Tân Mùi":"Tích Lịch Hỏa",
  "Nhâm Thân":"Kiếm Phong Kim","Quý Dậu":"Kiếm Phong Kim",
  "Giáp Tuất":"Hải Trung Kim","Ất Hợi":"Hải Trung Kim",
  "Bính Tý":"Bích Thượng Thổ","Đinh Sửu":"Bích Thượng Thổ",
  "Mậu Dần":"Thạch Lựu Mộc","Kỷ Mão":"Thạch Lựu Mộc",
  "Canh Thìn":"Kiếm Phong Kim","Tân Tỵ":"Kiếm Phong Kim",
  "Nhâm Ngọ":"Dương Liễu Mộc","Quý Mùi":"Dương Liễu Mộc",
  "Giáp Thân":"Tuyền Trung Thủy","Ất Dậu":"Tuyền Trung Thủy",
  "Bính Tuất":"Ốc Thượng Thổ","Đinh Hợi":"Ốc Thượng Thổ",
  "Mậu Tý":"Thích Lịch Hỏa","Kỷ Sửu":"Thích Lịch Hỏa",
  "Canh Dần":"Tùng Bách Mộc","Tân Mão":"Tùng Bách Mộc",
  "Nhâm Thìn":"Trường Lưu Thủy","Quý Tỵ":"Trường Lưu Thủy",
  "Giáp Ngọ":"Sa Trung Kim","Ất Mùi":"Sa Trung Kim",
  "Bính Thân":"Sơn Hạ Hỏa","Đinh Dậu":"Sơn Hạ Hỏa",
  "Mậu Tuất":"Bình Địa Mộc","Kỷ Hợi":"Bình Địa Mộc",
  "Canh Tý":"Bích Thượng Thổ","Tân Sửu":"Bích Thượng Thổ",
  "Nhâm Dần":"Kim Bạch Kim","Quý Mão":"Kim Bạch Kim",
  "Giáp Thìn":"Phú Đăng Hỏa","Ất Tỵ":"Phú Đăng Hỏa"
};

// Bảng cung phi Bát Trạch
const CUNG_PHI_NAM =  {1:"Khảm",2:"Khảm",3:"Chấn",4:"Tốn",5:"Cấn",6:"Càn",7:"Đoài",8:"Cấn",9:"Ly"};
const CUNG_PHI_NU  =  {1:"Cấn",2:"Khôn",3:"Chấn",4:"Tốn",5:"Khôn",6:"Càn",7:"Đoài",8:"Cấn",9:"Ly"};

// Hướng tốt/xấu theo Đông/Tây tứ mệnh
const H_TOT = {
  "Đông Tứ Mệnh": ["Đông","Đông Nam","Nam","Bắc"],
  "Tây Tứ Mệnh": ["Tây","Tây Bắc","Tây Nam","Đông Bắc"]
};
const H_XAU = {
  "Đông Tứ Mệnh": ["Tây","Tây Bắc","Tây Nam","Đông Bắc"],
  "Tây Tứ Mệnh": ["Đông","Đông Nam","Nam","Bắc"]
};

// ———————— Sinh birthData tự động cho 1950–2025 ————————
const birthData = {};
for (let year = 1950; year <= 2025; year++) {
  // Can-Chi
  const can = CAN[(year + 6) % 10];
  const chi = CHI[(year + 8) % 12];
  const canChi = `${can} ${chi}`;
  // Mệnh ngũ hành
  const menhNguHanh = MENH_NGU_HANH[canChi] || "Chưa rõ";
  // Cung phi
  let sum = (year % 100).toString().split("").map(Number).reduce((a,b)=>a+b,0);
  while (sum > 9) sum = sum.toString().split("").map(Number).reduce((a,b)=>a+b,0);
  const cungNam = CUNG_PHI_NAM[sum];
  const cungNu  = CUNG_PHI_NU[sum];
  // Tứ mệnh
  const menhNam = ["Cấn","Càn","Đoài","Khôn"].includes(cungNam) ? "Tây Tứ Mệnh" : "Đông Tứ Mệnh";
  const menhNu  = ["Cấn","Càn","Đoài","Khôn"].includes(cungNu)  ? "Tây Tứ Mệnh" : "Đông Tứ Mệnh";
  // Hướng tốt/xấu
  const huongTotNam = H_TOT[menhNam], huongXauNam = H_XAU[menhNam];
  const huongTotNu  = H_TOT[menhNu],  huongXauNu  = H_XAU[menhNu];

  birthData[year] = {
    name: canChi,
    menhNguHanh,
    quaiMenh: {
      nam: { cung: cungNam, menh: menhNam },
      nu:  { cung: cungNu,  menh: menhNu }
    },
    huongTotNam, huongXauNam,
    huongTotNu,  huongXauNu
  };
}

// ———————— Các hàm phong thủy bổ trợ ————————

function getYearFromDate(dateStr) {
  return new Date(dateStr).getFullYear();
}

function tinhKimLau(namSinh, namXem) {
  const tuoiAm = namXem - namSinh + 1;
  const du = tuoiAm % 9;
  let loai = "Không phạm Kim Lâu";
  if (du === 1) loai = "Kim Lâu Thân";
  if (du === 3) loai = "Kim Lâu Thê";
  if (du === 6) loai = "Kim Lâu Tử";
  if (du === 8) loai = "Kim Lâu Súc";
  return { tuoiAm, loai };
}

function tinhHoangOc(namSinh, namXem) {
  const tuoiAm = namXem - namSinh + 1;
  const du = tuoiAm % 6;
  const map = {
    1: "Nhất Cát",2: "Nhì Nghi",3: "Tam Địa Sát",
    4: "Tứ Tấn Tài",5: "Ngũ Thọ Tử",0: "Lục Hoang Ốc"
  };
  return map[du];
}

function tinhTamTai(namSinh, namXem) {
  const chiList = CHI;
  const chiSinh = chiList[(namSinh + 8) % 12];
  const chiXem  = chiList[(namXem + 8) % 12];
  const tk = {
    "Thân":["Dần","Mão","Thìn"],"Tý":["Dần","Mão","Thìn"],"Thìn":["Dần","Mão","Thìn"],
    "Dậu":["Tỵ","Ngọ","Mùi"],"Sửu":["Tỵ","Ngọ","Mùi"],"Tỵ":["Tỵ","Ngọ","Mùi"],
    "Hợi":["Thân","Dậu","Tuất"],"Mão":["Thân","Dậu","Tuất"],"Mùi":["Thân","Dậu","Tuất"],
    "Ngọ":["Hợi","Tý","Sửu"],"Dần":["Hợi","Tý","Sửu"]
  };
  return tk[chiSinh]?.includes(chiXem) ? true : false;
}

function danhGiaNgayTotXau(birthday) {
  const chiNguoi = CHI[(new Date(birthday).getFullYear() + 8) % 12];
  const chiNgay  = CHI[(new Date().getDate() + 8) % 12];
  const xung = {
    "Tý":"Ngọ","Sửu":"Mùi","Dần":"Thân","Mão":"Dậu",
    "Thìn":"Tuất","Tỵ":"Hợi","Ngọ":"Tý","Mùi":"Sửu",
    "Thân":"Dần","Dậu":"Mão","Tuất":"Thìn","Hợi":"Tỵ"
  };
  return xung[chiNguoi] === chiNgay
    ? `Ngày ${chiNgay} xung tuổi ${chiNguoi}` 
    : `Ngày ${chiNgay} không xung tuổi ${chiNguoi}`;
}

function goiYHuongNha(quaiPhi) {
  return H_TOT[quaiPhi.menh].join(" • ");
}

function xacDinhVan(namXay) {
  if (namXay >= 2004 && namXay <= 2023) return 8;
  if (namXay >= 2024 && namXay <= 2043) return 9;
  return null;
}

function phanTichHuyenKhong(houseDirection, namXay) {
  const van = xacDinhVan(namXay);
  if (!van) return "Ngoài Vận 8–9";
  // ví dụ đơn giản
  if (van === 8) return `Vận 8 – ${houseDirection}: Tốt/Tùy hóa giải`;
  return `Vận 9 – ${houseDirection}: Rất cát`;
}

// ———————— Xử lý form ————————
document.getElementById("birthForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const birthday      = this.birthday.value;
  const hour          = parseInt(this.hour.value);
  const gender        = this.gender.value;
  const houseYear     = parseInt(this.houseYear.value);
  const houseDirection= this.houseDirection.value;
  const namSinh       = getYearFromDate(birthday);
  const namXem        = new Date().getFullYear();

  // Can–Chi, Giờ Chi
  const canChiNam = `${CAN[(namSinh + 6)%10]} ${CHI[(namSinh + 8)%12]}`;
  const gioChi    = CHI[Math.floor(hour/2)%12];

  // Cung Phi (nối với Bát Trạch truyền thống)
  const num = (namSinh%100).toString().split("").map(Number).reduce((a,b)=>a+b,0);
  while (num>9) num = num.toString().split("").map(Number).reduce((a,b)=>a+b,0);
  const cungPhi = gender==="nam"
    ? CUNG_PHI_NAM[num]
    : CUNG_PHI_NU[num];

  // Các chỉ số
  const kimLau   = tinhKimLau(namSinh, namXem);
  const hoangOc  = tinhHoangOc(namSinh, namXem);
  const tamTai   = tinhTamTai(namSinh, namXem);
  const ngayXau  = danhGiaNgayTotXau(birthday);
  const birth    = birthData[namSinh];
  const quaiInfo = birth.quaiMenh[gender];
  const huongBat = birth[gender==="nam"?"huongTotNam":"huongTotNu"];
  const huongY   = huongBat.includes(houseDirection)
    ? "✅ Hợp"
    : "❌ Không hợp";
  const huyenkhong = phanTichHuyenKhong(houseDirection, houseYear);

  // Hiển thị
  document.getElementById("result").innerHTML = `
    <h2>Kết quả phân tích</h2>
    <p><strong>Can Chi năm sinh:</strong> ${canChiNam}</p>
    <p><strong>Giờ sinh (Chi):</strong> ${gioChi}</p>
    <p><strong>Mệnh ngũ hành:</strong> ${birth.menhNguHanh}</p>
    <p><strong>Quái mệnh:</strong> ${quaiInfo.cung} – ${quaiInfo.menh}</p>
    <p><strong>Hướng tốt:</strong> ${huongBat.join(", ")}</p>
    <p><strong>Hướng bạn chọn:</strong> ${houseDirection} → ${huongY}</p>
    <hr>
    <p><strong>Kim Lâu:</strong> ${kimLau.loai} (Tuổi âm: ${kimLau.tuoiAm})</p>
    <p><strong>Hoang Ốc:</strong> ${hoangOc}</p>
    <p><strong>Tam Tai:</strong> ${tamTai ? "⚠️ Phạm Tam Tai" : "✅ Không phạm Tam Tai"}</p>
    <p><strong>Đánh giá ngày:</strong> ${ngayXau}</p>
    <p><strong>Huyền Không Phi Tinh:</strong> ${huyenkhong}</p>
  `;
});
