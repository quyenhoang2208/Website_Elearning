import 'jquery';
import 'bootstrap';
import 'popper.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../vendor/Pagination.min.css';
import '../vendor/Pagination.min.js';
import '../scss/Pages/admin.scss';
import swal from 'sweetalert2/dist/sweetalert2.js'
import '../../node_modules/sweetalert2/dist/sweetalert2.min.css';


import *as $ from 'jquery';
import { KhoaHocServices } from '../../app/Services/KhoaHocService';
import { NguoiDungServices } from '../../app/Services/NguoiDungService';
import { NguoiDung } from '../../app/Models/NguoiDung';
import { DanhSachNguoiDung } from '../../app/Models/DanhSachNguoiDung';


let khoaHocService = new KhoaHocServices();
let nguoiDungService = new NguoiDungServices();
let danhSachNguoiDung = new DanhSachNguoiDung();

HienThiNguoiDungGhiDanh();
SelectKhoaHoc();
$('.inputMKH').click(function(){
    $('#tableHeadtr').html("");
    $('#tableBodytr').html("");
    $('#HocVien').html("");
});
function HienThiNguoiDungGhiDanh() {

    nguoiDungService.LayDanhSachNguoiDungService().done(function (data: any) {
        danhSachNguoiDung.MangNguoiDung = data;
        PhanTrang(data, '#tableBody');
    })
        .fail(function (error) {
            alert("Loi roi ");
        })
}
function PhanTrang(mangNguoiDung: any, idTable: string) {
    $('#pagination-container').pagination({
        dataSource: mangNguoiDung,
        pageSize: 8,
        showGoInput: true,
        showGoButton: true,
        callback: function (data, pagination) {
            let nguoiDungInfo = LoadDanhSachNguoiDungGhiDanh(data);
            $(idTable).html(nguoiDungInfo);
        }
    });
}
function LoadDanhSachNguoiDungGhiDanh(mangNguoiDung: any) {
    let nguoiDungInfo = "";
    mangNguoiDung.map(function (nguoidung: NguoiDung) {

        nguoiDungInfo += `
        <tr>
            <td>${nguoidung.TaiKhoan}</td>
            <td>${nguoidung.HoTen}</td>
            <td>${nguoidung.Email}</td>
            <td class="text-center" >
                <button class="btn btn-success btnGhiDanh " layTaiKhoan =${nguoidung.TaiKhoan}><i class="fa fa-check"></i></button>
            </td>

        </tr>
        `;
    })
    return nguoiDungInfo;
}

function SelectKhoaHoc() {
    khoaHocService.LayDanhSachKhoaHocService().done(function (data) {
        LoadSelectKhoaHoc(data);
    })
        .fail(function (error) {
            console.log(error);
        })
}


function  LoadSelectKhoaHoc(mangKhoaHoc) {
    var noiDungSelect = "";
    mangKhoaHoc.map(function (khoahoc) {
        if (khoahoc) {
            noiDungSelect +=
                `
               <option value = "${khoahoc.MaKhoaHoc}">${khoahoc.TenKhoaHoc}</option>
            `;
        }
    });
    $(".inputMKH").html(noiDungSelect);
}

$('body').delegate('.btnGhiDanh',"click",function(){

    let makhoahoc:string = $('.inputMKH').val();
    
    let taikhoan:string = $(this).attr("laytaikhoan");
   if((makhoahoc !== null) && (taikhoan!==null)){
        khoaHocService.GhiDanhKhoaHoc(makhoahoc,taikhoan).done(function(res){
            if(res.result){
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Bạn ghi danh thành công',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }else{
                swal({
                    position: 'center',
                    type: 'warning',
                    title: 'Khóa học này bạn đã ghi danh rồi',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
   }
})



$('.logout').click(function () {
    localStorage.clear();
    window.location.href = '/login.html';
});