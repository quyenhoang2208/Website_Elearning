import 'jquery';
import *as $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/jquery/dist/jquery.min.js';
import '../scss/Pages/detail.scss';
import '../scss/Pages/header.scss';
import '../scss/Pages/footer.scss';
import '../vendor/sticky.js';
import { KhoaHocServices } from '../../app/Services/KhoaHocService';


let contentTitle: string = "";
let ContentDis: string = "";
let makhoahoc = localStorage.getItem("MaKhoaHoc");



let khoaHocService = new KhoaHocServices();
khoaHocService.LayChiTietKhoaHoc(makhoahoc)
    .done(function (data) {
        data.forEach((khoahoc) => {
            contentTitle = `<h2 >${khoahoc.TenKhoaHoc}</h2>
                    `
            ContentDis = ` 
        <img src="${khoahoc.HinhAnh}" style=" width:100%; height:450px">
        <div class="row pt-3">
            <div class="col-md-12 p-3" style="background-color: white; border-radius: 15px">
                <h3 class="text-uppercase">This is a description of the ${khoahoc.TenKhoaHoc} course</h3>
                <div class="text-center" style="background-color: hsl(270, 75%, 34%);
                                         color: hsl(0, 0%, 100%);
                                        border-bottom-right-radius: 100px;
                                        border-bottom-left-radius: 100px;
                                        font-family: auto">
                    <h4 class="text-uppercase">${khoahoc.MoTa}</h4>
                    <h4>Hours:${khoahoc.SoGioHoc}</h4>
                    <h4>Price:${khoahoc.GiaKhoaHoc}</h4>
                </div>
            </div>

        </div>`
                ;

        })
        $('#title').html(contentTitle);
        $('#desctiption').html(ContentDis);
    })


