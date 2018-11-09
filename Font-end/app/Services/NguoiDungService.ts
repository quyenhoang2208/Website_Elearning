import*as $ from 'jquery';
import {NguoiDung} from '../Models/NguoiDung';
const apiURL = 'http://localhost:8800/api';

export class NguoiDungServices{
   
    LayDanhSachNguoiDungService(){
        return $.ajax({
            async:false,
            url:`${apiURL}/LayDanhSachNguoiDung`,
            type:'GET',
            dataType:"json"
        })
    }

    ThemNguoiDung (NguoiDung:NguoiDung){
        
        return $.ajax({
            url:`${apiURL}/ThemNguoiDung`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(NguoiDung ),
            processData: false       
        });
        
       
    }

    CapNhatThongTinNguoiDung(nguoiDung:NguoiDung){
        return $.ajax({
            url:`${apiURL}/CapNhatThongTinNguoiDung`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(nguoiDung ),
            processData: false
        });
     }

     XoaNguoiDung(taiKhoan:String){
        
        return $.ajax({
            type:"POST",
            url:`${apiURL}/XoaNguoiDung`,
            contentType: 'application/json',
            data: JSON.stringify({TaiKhoan: `${taiKhoan}`}),
            dataType: 'json',
            processData: false 
        });
     }
   
    DangNhapNguoiDung(){
        return $.ajax({
			url : `${apiURL}/DangNhap`,
            type : "GET",
            dataType:'json',
		
		});
    }

    LayThongTinKhoaHoc(taikhoan:string){
        console.log(taikhoan);
        return $.ajax({
            type: 'POST',
            url:`${apiURL}/LayThongtinKhoaHocCuaHocVien`,
            contentType: 'application/json',
            data:JSON.stringify({TaiKhoan:`${taikhoan}`}),
            dataType:"json",
            processData: false
          
        })
     }
}