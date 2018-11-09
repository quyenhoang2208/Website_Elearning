import { NguoiDung, NguoiDungDangNhap } from './NguoiDung';
export class DanhSachNguoiDung {
    public MangNguoiDung: Array<NguoiDung> = [];
    public MangDangNhap: Array<NguoiDungDangNhap> = [];

    ThemNguoiDung(nguoidung: NguoiDung) {
        this.MangNguoiDung.push(nguoidung);
    }
    LayThongTinNguoiDung(taikhoan: string) {
        let nguoiDung: Object = {};
        this.MangNguoiDung.map(function (user: NguoiDung) {
            if (taikhoan === user.TaiKhoan) {
                nguoiDung = user;
            }
        })
        return nguoiDung;
    }

    TimKiemNguoiDung(tukhoa: string): DanhSachNguoiDung {

        let dsCanTim: DanhSachNguoiDung = new DanhSachNguoiDung();

        for (let i = 0; i < this.MangNguoiDung.length; i++) {
            let tenCanTim = this.MangNguoiDung[i];
            //Co the viet nhu vay mac dinh no la !null
            if (tenCanTim.HoTen) { //Mot so ban k them them vao hoten nen no bi null em check truong hop nay
                if (tenCanTim.HoTen.trim().toLowerCase().search(tukhoa) != -1) {

                    dsCanTim.ThemNguoiDung(tenCanTim);
                }
            }

        }
        return dsCanTim;
    }


}
