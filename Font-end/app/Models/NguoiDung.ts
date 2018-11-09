export class NguoiDung{
    public TaiKhoan:string;
    public MatKhau:string;
    public HoTen:string;
    public Email:string;
    public SoDT:number;
    public MaLoaiNguoiDung:string;
    public TenLoaiNguoiDung:string;
    constructor(taiKhoan: string, matKhau:string,hoten:string,email:string,sodt:number,maloainguoidung:string){
        this.TaiKhoan = taiKhoan;
        this.MatKhau = matKhau;
        this.HoTen = hoten;
        this.Email = email;
        this.SoDT = sodt;
        this.MaLoaiNguoiDung = maloainguoidung; 
    }
}


export class NguoiDungDangNhap{
    public TaiKhoan:string;
    public MatKhau:string;
    public MaLoaiNguoiDung:string;
    constructor(taiKhoan: string, matKhau:string,maloainguoidung:string){
        this.TaiKhoan = taiKhoan;
        this.MatKhau = matKhau;
        this.MaLoaiNguoiDung = maloainguoidung; 

    }
}


