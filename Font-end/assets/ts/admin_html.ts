import 'jquery';
import 'bootstrap';
import 'popper.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../vendor/Pagination.min.css';
import '../vendor/Pagination.min.js';
import '../scss/Pages/admin.scss';

import *as $ from 'jquery';
let userLogin = JSON.parse(localStorage.getItem("userLogin"));
if (userLogin == null) {
    window.location.href = "/login.html";
} else {

    if (userLogin.MaLoaiNguoiDung.toLowerCase() != "gv") //Neu la tai khoan hoc vien
    {

        window.location.href = "/courseOfUser.html";

    }
}
$('.logout').click(function () {
    localStorage.clear();
    window.location.href = '/home.html';
});
