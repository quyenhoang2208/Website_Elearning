import* as $ from "jquery";
import {KhoaHoc} from '../Models/KhoaHoc';
let apiURL = 'http://localhost:8800/api';

export class KhoaHocServices{
    
    LayDanhSachKhoaHocService(){
        return $.ajax({
            async:false,
            url: `${apiURL}/LayDanhSachKhoaHoc`,
            type:"GET",
            dataType:"json"
        });
    }
    
    ThemKhoaHoc(khoahoc:KhoaHoc){
        return $.ajax({
            url:`${apiURL}/ThemKhoaHoc`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(khoahoc),
            processData: false, 
        });
    }
    CapNhatThongTinKhoaHoc(khoahoc:KhoaHoc){
      
        return $.ajax({
            url:`${apiURL}/CapNhatKhoaHoc`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(khoahoc),
            processData: false, 
        });
     }
     XoaKhoaHoc(maKhoaHoc:KhoaHoc){
        return $.ajax({
            type:"POST",
            url:`${apiURL}/XoaKhoaHoc`,
            contentType: 'application/json',
            data: JSON.stringify({MaKhoaHoc: `${maKhoaHoc}`}),
            dataType: 'json',
            processData: false 
        });
     }
     GhiDanhKhoaHoc(makhoahoc:string,taikhoan:string){
        return $.ajax({
            type:"POST",
            url:`${apiURL}/GhiDanhKhoaHoc`,
            contentType: 'application/json',
            data:JSON.stringify({MaKhoaHoc: `${makhoahoc}`,TaiKhoan:`${taikhoan}`}),
            dataType:'json',
            processData: false 
        });
     }
   
     LayChiTietKhoaHoc(makhoahoc:string){
         return $.ajax({
             type:"POST",
             url:`${apiURL}/LayChiTietKhoaHoc`,
             contentType: 'application/json',
             data:JSON.stringify({MaKhoaHoc:`${makhoahoc}`}),
             dataType:'json',
             processData: false
         })
     }
     
}