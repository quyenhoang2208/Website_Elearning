import *as $ from 'jquery';
import swal from 'sweetalert2/dist/sweetalert2.js'
import { NguoiDungServices } from '../Services/NguoiDungService';
import { KhoaHoc } from '../Models/KhoaHoc';
import { DanhSachKhoaHoc } from '../Models/DanhSachKhoaHoc';
import { KhoaHocServices } from '../Services/KhoaHocService';
let danhSachKhoaHoc = new DanhSachKhoaHoc();
let khoaHocService = new KhoaHocServices();


HienThiKhoaHoc();

function HienThiKhoaHoc(){

    khoaHocService.LayDanhSachKhoaHocService().done(function (data: any) {
        danhSachKhoaHoc.MangKhoaHoc = data;
        PhanTrang(data);
    })
        .fail(function (error) {
            alert("error");
        })
}
//Load khóa học trên danh sách

function LoadDanhSachKhoaHoc(mangKhoaHoc: any) {
    let khoaHocContent = "";
    mangKhoaHoc.map(function (khoahoc: KhoaHoc) {
        let moTa = khoahoc.MoTa;
        if (khoahoc.MoTa != null) {
            khoahoc.MoTa.length >= 100 ? moTa = khoahoc.MoTa.substring(0, 100) : moTa = khoahoc.MoTa;
        }
        khoaHocContent += `
        <tr>
            <td>${khoahoc.MaKhoaHoc}</td>
            <td>${khoahoc.TenKhoaHoc}</td>
            <td>${moTa}....</td>
            <td><img src='${khoahoc.HinhAnh}' width="50" height="50"></td>
            <td>${Number(khoahoc.LuotXem).toLocaleString()}</td>
            <td>${khoahoc.NguoiTao}</td>
            <td class="text-center"> 
                <button  class= "btn btn-danger btnXoaKhoaHoc"  laykhoahoc = ${khoahoc.MaKhoaHoc} ><i class="fa fa-trash-o"></i></button>
            </td>
            <td class="text-center">
                <button  class= "btn btn-info btnSuaKhoaHoc" makhoahoc = ${khoahoc.MaKhoaHoc}  data-toggle="modal" data-target="#myModalKhoaHoc"><i class="fa fa-pencil-square-o"></i></button>

            </td>
            
        </tr>
        `;
    })
    return khoaHocContent;
}

//Phân trang khóa học
function PhanTrang(mangKhoaHoc: any) {
    $('#pagination-container').pagination({
        dataSource: mangKhoaHoc,
        pageSize: 5,
        showGoInput: true,
        showGoButton: true,
        callback: function (data, pagination) {
            let khoaHocContent = LoadDanhSachKhoaHoc(data);
            $('#tableBody').html(khoaHocContent);
        }
    });
}
//Tìm kiếm tên khóa học
$("#txtNhapTen").keyup(function () {

    let key: string = $(this).val().trim().toLowerCase();
    let mangCanTim = danhSachKhoaHoc.TimKhoaHocTheoTen(key);
    PhanTrang(mangCanTim.MangKhoaHoc);
   
})

//Thêm khóa học 
$("body").delegate("#btnThemKhoaHoc", "click", function () {
    $('.modal-title').html('Thêm Khóa Học');
    var modalFooter = `<button class = "btn btn-success " id="btnThem">Thêm Khóa Học</button>
                            <button class = "btn btn-dark btnHuy" data-dismiss="modal" >Hủy</button>`;
    $('.modal-footer').html(modalFooter);
    $('.modal-body input').val('');
});
$("body").delegate("#btnThem", "click", function () {
    let MaKhoaHoc: string = $("#MaKhoaHoc").val();
    let TenKhoaHoc: string = $("#TenKhoaHoc").val();
    let MoTa: string = $("#MoTa").val();
    let HinhAnh: string = $("#HinhAnh").val();
    let LuotXem: number = $("#LuotXem").val();
    let NguoiTao: string = $("#NguoiTao").val();
    let GiaKhoaHoc:string =$("#GiaKhoaHoc").val();
    let SoGioHoc:string =$("#SoGioHoc").val();
    let khoaHoc = new KhoaHoc(MaKhoaHoc, TenKhoaHoc, MoTa, HinhAnh, LuotXem, NguoiTao,GiaKhoaHoc,SoGioHoc);
    khoaHocService.ThemKhoaHoc(khoaHoc).done(function (ketqua) {

        if (ketqua) {
            /*Load lại table khóa học*/
            HienThiKhoaHoc();
            /*Ẩn modal*/
            $("#myModalKhoaHoc").modal("hide");
        }

    })
        .fail(function (error) {
            alert("error");
        })
});

//Chỉnh sửa  khóa học

$('body').delegate('.btnSuaKhoaHoc', 'click', function () {

    $('.modal-title').html('Cập nhật thông tin');
    var modalFooter = `<button class = "btn btn-success btnLuu">Lưu</button>
                        <button class = "btn btn-dark " data-dismiss="modal" >Hủy</button>`;
    $('.modal-footer').html(modalFooter);


    let maKhoaHoc = $(this).attr("makhoahoc");

    let khoaHoc: any = danhSachKhoaHoc.LayThongTinKhoaHoc(maKhoaHoc);
    console.log(khoaHoc);
    if (khoaHoc != null) {
        $("#MaKhoaHoc").val(khoaHoc.MaKhoaHoc);
        $("#TenKhoaHoc").val(khoaHoc.TenKhoaHoc);
        $("#MoTa").val(khoaHoc.MoTa);
        $("#HinhAnh").val(khoaHoc.HinhAnh);
        $("#LuotXem").val(khoaHoc.LuotXem);
        $("#NguoiTao").val(khoaHoc.NguoiTao);
        $("#GiaKhoaHoc").val(khoaHoc.GiaKhoaHoc);
        $("#SoGioHoc").val(khoaHoc.SoGioHoc);
    }

});

$('body').delegate('.btnLuu', 'click', function () {

    let MaKhoaHoc: string = $("#MaKhoaHoc").val();
    let TenKhoaHoc: string = $("#TenKhoaHoc").val();
    let MoTa: string = $("#MoTa").val();
    let HinhAnh: string = $("#HinhAnh").val();
    let LuotXem: number = $("#LuotXem").val();
    let NguoiTao: string = $("#NguoiTao").val();
    let GiaKhoaHoc:string =$("#GiaKhoaHoc").val();
    let SoGioHoc:string =$("#SoGioHoc").val();
    let khoaHoc = new KhoaHoc(MaKhoaHoc, TenKhoaHoc, MoTa, HinhAnh, LuotXem, NguoiTao,GiaKhoaHoc,SoGioHoc);
    khoaHocService.CapNhatThongTinKhoaHoc(khoaHoc).done(function (ketqua) {

        if (ketqua) {
            HienThiKhoaHoc();
            $("#myModalKhoaHoc").modal("hide");
        }

    })
        .fail(function (error) {
            alert("error");
        })
    swal({
        position: 'center',
        type: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
    })
});

$('body').delegate('.btnXoaKhoaHoc', 'click', function () {
    let khoaHoc = $(this).attr('laykhoahoc');
    // alert khi xóa khóa học
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
            khoaHocService.XoaKhoaHoc(khoaHoc).done(function (ketqua) {

                if (ketqua) {

                    HienThiKhoaHoc();
                }

            })
            swal(
                'Deleted!',
                'Bạn đã xóa thành công.',
                'success'
            )
        }
    })

})

