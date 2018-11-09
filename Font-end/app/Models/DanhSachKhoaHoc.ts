import {KhoaHoc}from './KhoaHoc'; 

export class DanhSachKhoaHoc{
    MangKhoaHoc:Array<KhoaHoc> = [];
    ThemKhoaHoc(khoahoc:KhoaHoc){
        this.MangKhoaHoc.push(khoahoc);
    }
    LayThongTinKhoaHoc(makhoaHoc:string){
        let khoaHoc:Object= {};
        this.MangKhoaHoc.map(function(kh:KhoaHoc,index:number){
           
            if(kh.MaKhoaHoc === makhoaHoc){
                khoaHoc = kh;
            }
        });
        return khoaHoc;
        console.log(khoaHoc);
    }
    TimKhoaHocTheoTen(tenkhoahoc:string):DanhSachKhoaHoc{
		let dskhoaHocCanTim:DanhSachKhoaHoc = new DanhSachKhoaHoc();
		for(let i = 0; i < this.MangKhoaHoc.length; i++){
			let khCanTim = this.MangKhoaHoc[i];
			if(khCanTim.TenKhoaHoc.toLowerCase().trim().search(tenkhoahoc) !== -1){
				dskhoaHocCanTim.ThemKhoaHoc(khCanTim);
			}
		}
		return dskhoaHocCanTim;
	}
}