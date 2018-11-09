/*Kiểm tra người dùng đăng nhập và chuyển đến các trang html */

import *as $ from 'jquery';
import { NguoiDungServices } from '../Services/NguoiDungService';
import { DanhSachNguoiDung } from '../Models/DanhSachNguoiDung';
import { NguoiDungDangNhap } from '../Models/NguoiDung';
let nguoiDungService = new NguoiDungServices();
let danhSachDangNhap = new DanhSachNguoiDung();
localStorage.clear();

nguoiDungService.DangNhapNguoiDung().done(function (data) {
    danhSachDangNhap.MangDangNhap = data;
})

$('#login').click(function KiemTraNguoiDungDangNhap() {
    /*Lấy giá trị từ thẻ input*/
    if( KiemTraDangNhap()){
        let data:any = KiemTraDangNhap()
        localStorage.setItem("userLogin",JSON.stringify(data));
        if(data.MaLoaiNguoiDung === "GV"){
                window.location.href = "/admin.html";
        }else{
                window.location.href = "/courseOfUser.html";
        }
    }
});

function KiemTraDangNhap(){
    let TaiKhoanInput: string = $('#taikhoan').val();
    let MatKhau: string = $('#matkhau').val();
    for( let i = 0; i < danhSachDangNhap.MangDangNhap.length; i++){
        let nguoidung:NguoiDungDangNhap = danhSachDangNhap.MangDangNhap[i];
        if((nguoidung.TaiKhoan === TaiKhoanInput)&&(nguoidung.MatKhau === MatKhau)){
            return nguoidung;
        }
    }
    return false

 }




// if(result!="failed to login")
        // {
        //     //Luu thong tin nguoi dung vao storage (để mấy trang khác khỏi gọi lại đăng nhập chỉ cần kiem3tr tra từ storage)
            
        //     localStorage.setItem("userLogin",JSON.stringify(result[0]));
           
        //     //Đăng nhập thành công
        //     if(result[0].MaLoaiNguoiDung.toLowerCase() =="GV")
        //     {
        //         window.location.href = "/admin.html";
        //     }else{
        //         window.location.href = "/courseOfUser.html";
        //     }
           
         
        // } 