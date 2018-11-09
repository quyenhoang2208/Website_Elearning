import *as $ from 'jquery';
import swal from 'sweetalert2/dist/sweetalert2.js'
import { NguoiDung } from '../Models/NguoiDung';
import { DanhSachNguoiDung } from '../Models/DanhSachNguoiDung';
import { NguoiDungServices } from '../Services/NguoiDungService';

let danhSachNguoiDung = new DanhSachNguoiDung();
let nguoiDungService = new NguoiDungServices();

//Kiểm tra đăng nhập

HienThiNguoiDung();



//Lấy danh sách người dùng từ API hiển thị lên màn hình
 function HienThiNguoiDung() {

    nguoiDungService.LayDanhSachNguoiDungService().done(function (data: any) {
        danhSachNguoiDung.MangNguoiDung = data;
        PhanTrang(data, '#tableBody');
    })
        .fail(function (error) {
            alert("Loi roi ");
        })
}
//Load người dùng trên danh sách

function LoadDanhSachNguoiDung(mangNguoiDung: any) {
    let nguoiDungInfo = "";
    mangNguoiDung.map(function (nguoidung: NguoiDung) {

        nguoiDungInfo += `
        <tr>
            <td>${nguoidung.TaiKhoan}</td>
            <td>${nguoidung.MatKhau}</td>
            <td>${nguoidung.HoTen}</td>
            <td>${nguoidung.Email}</td>
            <td>${nguoidung.SoDT}</td>
            <td>${nguoidung.TenLoaiNguoiDung}</td>
            <td class="text-center"><button class="btn btn-danger" id="btnXoaNguoiDung" layTaiKhoan =${nguoidung.TaiKhoan}><i class="fa fa-trash-o"></i></button>
            </td>
            <td class="text-center">
            <button class="btn btn-info " id="btnSuaNguoiDung" taikhoan = ${nguoidung.TaiKhoan}  data-toggle="modal" data-target="#myModalNguoiDung"><i class="fa fa-pencil-square-o"></i></button>

            </td>
        </tr>
        `;
    })
    return nguoiDungInfo;
}

//Phân trang nguoi dung
function PhanTrang(mangNguoiDung: any, idTable: string) {
    $('#pagination-container').pagination({
        dataSource: mangNguoiDung,
        pageSize: 8,
        showGoInput: true,
        showGoButton: true,
        callback: function (data, pagination) {
            let nguoiDungInfo = LoadDanhSachNguoiDung(data);
            $(idTable).html(nguoiDungInfo);
        }
    });
}
//Thêm người dùng vào danh sách
$("body").delegate("#btnThemNguoiDung", "click", function () {
    $('.modal-title').html('Thêm Khóa Học');
    var modalFooter = `<button class = "btn btn-success" id="btnThemND">Thêm Người Dùng</button>
                            <button class = "btn btn-dark" data-dismiss="modal" id="btnHuy">Hủy</button>`;
    $('.modal-footer').html(modalFooter);
    /*Input rỗng sau khi thực thi thêm người dùng*/
    $('.modal-body input').val('');
});

$("body").delegate('#btnThemND', "click", function () {
    let TaiKhoan: string = $('#TaiKhoan').val();
    let MatKhau: string = $('#MatKhau').val();
    let HoTen: string = $('#HoTen').val();
    let Email: string = $('#Email').val();
    let SoDT: number = $('#SoDT').val();
    let MaLoaiNguoiDung: string = $('#LoaiNguoiDung').val();

    let nguoidung = new NguoiDung(TaiKhoan, MatKhau, HoTen, Email, SoDT, MaLoaiNguoiDung);

    nguoiDungService.ThemNguoiDung(nguoidung).done(function (ketqua) {
        if (ketqua) {
            HienThiNguoiDung();          
              $('#myModalNguoiDung').modal('hide');

        }
    })
        .fail(function (error) {
            alert("Loi roi");
        })
})
//Xóa người dùng 
$('body').delegate('#btnXoaNguoiDung', "click", function () {
    let taikhoan = $(this).attr('layTaiKhoan');
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            nguoiDungService.XoaNguoiDung(taikhoan).done(function (ketqua) {

                if (ketqua) {
                    HienThiNguoiDung();
                }
                swal(
                    'Deleted!',
                    'Xóa Thành Công.',
                    'warning'
                )
            })
                .fail(function (error) {
                    swal(
                        'Error!',
                        'Không xóa được.',
                        'fa'
                    )
                })
           
        }
    })

})
//Sửa thông tin người dùng
$('body').delegate('#btnSuaNguoiDung', 'click', function () {

    $('.modal-title').html('Cập nhật thông tin');
    var modalFooter = `<button class = "btn btn-success" id="btnLuuNguoiDung">Lưu</button>
                    <button class = "btn btn-dark" data-dismiss="modal" id="btnHuy">Hủy</button>`;
    $('.modal-footer').html(modalFooter);


    let laytaikhoan = $(this).attr('taikhoan');

    let nguoiDung: any = danhSachNguoiDung.LayThongTinNguoiDung(laytaikhoan);
    
    if (nguoiDung != null) {
        //Đổ dữ liệu vào ô input
        $("#TaiKhoan").val(nguoiDung.TaiKhoan);
        $("#MatKhau").val(nguoiDung.MatKhau);
        $("#HoTen").val(nguoiDung.HoTen);
        $("#Email").val(nguoiDung.Email);
        $("#SoDT").val(nguoiDung.SoDT);
        $("#LoaiNguoiDung").val(nguoiDung.MaLoaiNguoiDung);
    }
});
//Lưu thông tin người dùng vào dữ liệu

$('body').delegate('#btnLuuNguoiDung', 'click', function () {
    let TaiKhoan: string = $('#TaiKhoan').val();
    let MatKhau: string = $('#MatKhau').val();
    let HoTen: string = $('#HoTen').val();
    let Email: string = $('#Email').val();
    let SoDT: number = $('#SoDT').val();
    let MaLoaiNguoiDung: string = $('#LoaiNguoiDung').val();
    let nguoidung = new NguoiDung(TaiKhoan, MatKhau, HoTen, Email, SoDT, MaLoaiNguoiDung);
    nguoiDungService.CapNhatThongTinNguoiDung(nguoidung).done(function (ketqua) {
        if (ketqua) {
            HienThiNguoiDung();
            $('#myModalNguoiDung').modal('hide');
        }
    })
        .fail(function (error) {
            alert("Loi roi");
        })
    swal({
        position: 'center',
        type: 'success',
        title: 'Bạn đã lưu thành công',
        showConfirmButton: false,
        timer: 1500
    })
})
//Tìm kiếm tên người dùng 
$("#txtTimKiemND").keyup(function () {

    let key: string = $(this).val().trim().toLowerCase();
    let mangCanTim = danhSachNguoiDung.TimKiemNguoiDung(key);
    PhanTrang(mangCanTim.MangNguoiDung, '#tableBody');
   
})
