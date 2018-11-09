
import 'jquery';
import 'bootstrap';
import 'popper.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/jquery/dist/jquery.min.js';
import '../scss/Pages/home.scss';
import '../scss/Pages/header.scss';
import '../scss/Pages/footer.scss';
import '../vendor/sticky.js';
import '../../node_modules/owl.carousel/dist/owl.carousel.min.js';
import '../../node_modules/owl.carousel/dist/assets/owl.carousel.min.css';
import '../../assets/vendor/autoCarousel.js';
import '../../assets/vendor/scroll.min.css';
import '../../assets/vendor/scroll.min.js';
import *as $ from 'jquery';
import { KhoaHoc } from '../../app/Models/KhoaHoc';
import { DanhSachKhoaHoc } from '../../app/Models/DanhSachKhoaHoc';
import { KhoaHocServices } from '../../app/Services/KhoaHocService';


let danhSachKhoaHoc = new DanhSachKhoaHoc();
let khoaHocService = new KhoaHocServices();

khoaHocService.LayDanhSachKhoaHocService().done(function (data: any) {
  danhSachKhoaHoc.MangKhoaHoc = data;
  let content: string = "";

  
    data.map(function (khoahoc: KhoaHoc,index) {
      //kiem tra de hien thi 8 khoa hoc dau tien 
      if(index < 8){
        let moTa: string = khoahoc.MoTa;
        let luotXem:number = khoahoc.LuotXem;
        if (khoahoc.MoTa != null) {
          khoahoc.MoTa.length >= 50 ? moTa = khoahoc.MoTa.substring(0, 20) : moTa = khoahoc.MoTa;
        }
        
        if(luotXem !=null){
          luotXem = khoahoc.LuotXem;
        }else{
          luotXem = 0;
        }
  
      content +=`
      <div class="item_course col-md-3" style="height:550px">
      <div class="service-block mb-md-30 bg-white" style="height:80%;border-radius:5px">
        <div class="thumb" style="height:60%">
          <img alt="featured project" src="${khoahoc.HinhAnh}" class="img-responsive img-fullwidth" style="width:100%;height:100%;">
          <div class="new_course text-white">
              <span> New</span>
          </div>
          <div class="course_price btn btn-block btn-primary text-uppercase" >
            <span>${khoahoc.GiaKhoaHoc} $</span>
          </div>
          <div class="course_star  ">
            <ul>
              <li>
                <i class="fa fa-star"></i>
              </li>
              <li>
                <i class="fa fa-star"></i>
              </li>
              <li>
                <i class="fa fa-star"></i>
              </li>
              <li>
                <i class="fa fa-star"></i>
              </li>
              <li>
                <i class="fa fa-star"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="content mt-3" style="height:20%">
          <h4 class="line-bottom mb-2" style="text-align: center;text-transform: uppercase;">${khoahoc.TenKhoaHoc}</h4>
          <p class="text-center">${moTa}</p>
          
        </div>
      
        <div class="row mt-3" style="height:20%">
            <div class="col-md-7">
              <button class="btn btn-success idDetail mt-3" idMaKH="${khoahoc.MaKhoaHoc}"> View Detail</button>
            </div>
            <div class="col-md-5 d-flex">
              <div class="col-md-4" style="padding:0;">
                  <i class="fa fa-users pt-3" style="font-size: 25px"></i>
              </div>
              <div class="col-md-8" style="padding:0;margin-top:35px;">
                  <span>${luotXem}</span>
              </div>
           
              
            </div>
        </div>
      </div>
    </div>
      
      `;
      }
    })
  
  $('#listcourse').html(content);
})

$('body').delegate('.idDetail', "click", function () {
  window.location.href = "/detail.html"
  let makhoahoc: string = $(this).attr("idMaKH");
  localStorage.setItem("MaKhoaHoc", makhoahoc);
})
$('.login').click(function(){
  localStorage.clear();
})
$('.register').click(function(){
  localStorage.clear();
})

