export class KhoaHoc{
    public MaKhoaHoc:string;
    public TenKhoaHoc:string;
    public MoTa:string;
    public HinhAnh:string;
    public LuotXem:number;
    public NguoiTao:string;
    public GiaKhoaHoc:string;
    public SoGioHoc:string;
    constructor(maKhoaHoc:string,tenKhoaHoc:string,moTa:string,hinhAnh:string,luotXem:number,nguoiTao:string,giaKH:string,sogio:string){
        this.MaKhoaHoc = maKhoaHoc;
        this.TenKhoaHoc = tenKhoaHoc;
        this.MoTa = moTa;
        this.HinhAnh  = hinhAnh;
        this.LuotXem = luotXem;
        this.NguoiTao = nguoiTao;
        this.GiaKhoaHoc = giaKH;
        this.SoGioHoc = sogio;
    }
}