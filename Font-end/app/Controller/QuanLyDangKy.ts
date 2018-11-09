import *as $ from 'jquery';
import swal from 'sweetalert2/dist/sweetalert2.js'
import { NguoiDungServices } from '../Services/NguoiDungService';
import { NguoiDung } from '../Models/NguoiDung';
let nguoiDungService = new NguoiDungServices();
localStorage.clear();
$("#register").click(function(){
	
		let TaiKhoan: string = $("#username").val();
		let MatKhau: string = $("#password").val();
		let Email:string = $("#email").val();
		let SoDT: number = $("#phone").val();
		let HoTen:string = $("#name").val();
		let nguoiDung:any = new NguoiDung(TaiKhoan, MatKhau,HoTen, Email,SoDT, "HV");
		nguoiDungService.ThemNguoiDung(nguoiDung).done(function (ketqua) {
		
			if (ketqua) {
				swal({
					position: 'center',
					type: 'success',
					title: 'You registered successfully',
					showConfirmButton: false,
					timer: 2500
				})
				location.reload();
			}
		})
		.fail(function (error) {
			
				alert("error");
		})
})