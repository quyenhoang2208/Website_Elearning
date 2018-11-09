const express = require('express');
const router = express.Router();

const nguoiDungController = require('../controller/NguoiDungController');
const khoaHocController = require('../controller/KhoaHocController');



router.get('/LayDanhSachKhoaHoc', khoaHocController.DanhSachKhoaHoc);
router.post('/ThemKhoaHoc', khoaHocController.ThemKhoaHoc);
router.post('/XoaKhoaHoc', khoaHocController.XoaKhoaHoc);
router.post('/CapNhatKhoaHoc', khoaHocController.CapNhatKhoaHoc);
router.post('/LayChiTietKhoaHoc', khoaHocController.LayChiTietKhoaHoc);


router.post('/GhiDanhKhoaHoc', nguoiDungController.GhiDanhKhoaHoc);
router.post('/CapNhatThongTinNguoiDung', nguoiDungController.CapNhatNguoiDung);
router.get('/LayDanhSachNguoiDung', nguoiDungController.DanhSachNguoiDung);
router.post('/ThemNguoiDung', nguoiDungController.ThemNguoiDung);
router.post('/XoaNguoiDung', nguoiDungController.XoaNguoiDung);
router.post('/LayThongtinKhoaHocCuaHocVien', nguoiDungController.LayThongTinKhoaHocCuaHocVien);
router.get('/DangNhap', nguoiDungController.DanhSachDangNhap);



module.exports = router;
