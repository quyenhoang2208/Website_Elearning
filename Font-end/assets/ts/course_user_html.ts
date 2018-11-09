import 'jquery';
import 'bootstrap';
import 'popper.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/jquery/dist/jquery.min.js';
import '../vendor/sticky.js';
import '../scss/Pages/header.scss';
import '../scss/Pages/footer.scss';
import '../scss/Pages/course.scss';

import *as $ from 'jquery';
import { NguoiDungServices } from '../../app/Services/NguoiDungService';



let userLogin = JSON.parse(localStorage.getItem("userLogin"));
$('#accountUser').html(userLogin.TaiKhoan);
let nguoiDungService = new NguoiDungServices();


if (userLogin == null) {
  window.location.href = "/login.html";
}
$("#accountUser").html(userLogin.HoTen);

$('.logout').click(function () {
  localStorage.clear();
  window.location.href = '/home.html';
});




let taikhoan: string = userLogin.TaiKhoan;
let content: string = "";
nguoiDungService.LayThongTinKhoaHoc(taikhoan).done(function (data) {
  data.forEach((khoahoc) => {
    console.log(khoahoc);
    let moTa: string = khoahoc.MoTa;
    let luotXem: number = khoahoc.LuotXem;

    if (luotXem != null) {
      luotXem = khoahoc.LuotXem;
    } else {
      luotXem = 0;
    }
    if (khoahoc.MoTa != null) {
      khoahoc.MoTa.length >= 50 ? moTa = khoahoc.MoTa.substring(0, 20) : moTa = khoahoc.MoTa;
    }
    content += `
    <div class="item_course col-md-3" style="height:550px">
      <div class="service-block mb-md-30 bg-white" style="height:80%;border-radius:5px">
        <div class="thumb" style="height:60%">
          <img alt="featured project" src="${khoahoc.HinhAnh}" class="img-responsive img-fullwidth" style="width:100%;height:100%;">
        
          <div class="course_price btn btn-info">
            <span>${khoahoc.GiaKhoaHoc}</span>
          </div>
         
        </div>
        <div class="content text-left flip p-25 pt-0" style="height:20%">
          <h4 class="line-bottom mb-2 mt-2" style="text-align: center;text-transform: uppercase;">${khoahoc.TenKhoaHoc}</h4>
          <p class="text-center">${moTa}</p>
          
        </div>
      
        <div class="row mt-3" style="height:20%">
            <div class="col-md-7">
              <button class="btn btn-success mt-3" idMaKH="${khoahoc.MaKhoaHoc}">Start Lesson</button>
            </div>
            <div class="col-md-5 d-flex">
              <div class="col-md-4" style="padding:0;">
                  <i class="fa fa-users pt-3" style="font-size: 25px"></i>
              </div>
              <div class="col-md-8" style="padding:0;margin-top:40px;">
                  <span>${luotXem}</span>
              </div>
           
              
            </div>
        </div>
      </div>
    </div>`;
  })
  $('#mycourses').html(content);

})






