const sql = require('mssql')
const config = require('../connect')

exports.DanhSachNguoiDung = function(req,res, next){
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query(`select * from dbo.QuanLyNguoiDung()
        `)
      }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        sql.close();
      }).catch(err => {
        res.status(200).send({ message: "${err}"})
        sql.close();
      });
}
exports.ThemNguoiDung = function(req, res){
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
      EXECUTE  [dbo].[ThemNguoiDung] 
       @_TaiKhoan = \"${req.body.TaiKhoan}\"
      ,@_MatKhau = \"${req.body.MatKhau}\"
      ,@_HoTen =\" ${req.body.HoTen}\"
      ,@_Email = \"${req.body.Email}\"
      ,@_SoDT = \"${req.body.SoDT}\"
      ,@_MaLoaiNguoiDung = \"${req.body.MaLoaiNguoiDung}\"
    `)
  }).then(result => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({code: 'ok', value: 
      {
        TaiKhoan :req.body.TaiKhoan,
        MatKhau : req.body.MatKhau,
        HoTen : req.body.HoTen,
        Email : req.body.Email,
        SoDT : req.body.SoDT,
        MaLoaiNguoiDung : req.body.MaLoaiNguoiDung
      }
    });
    sql.close();
  }).catch(err => {
    console.log(err);
    res.status(200).send({ err})

    sql.close();
  });
  
}
exports.XoaNguoiDung = function(req, res, next){
  console.log(req)
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
    EXECUTE [dbo].[XoaNguoiDung]
       @_TaiKhoan = \"${req.body.TaiKhoan}\"
    `)
  }).then(result => {
    let rows = result.recordset
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).send({code: 'Da Xoa Thanh Cong', value: 
      {
          TaiKhoan : req.body.TaiKhoan
      }
    });
    
    sql.close();
  }).catch(err => {
    res.status(200).send({ message: err})
    sql.close();
  });
  
}
exports.CapNhatNguoiDung = function(req, res){
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
      EXECUTE  [dbo].[CapNhatNguoiDung] 
       @_TaiKhoan = \"${req.body.TaiKhoan}\"
      ,@_MatKhau = \"${req.body.MatKhau}\"
      ,@_HoTen =\" ${req.body.HoTen}\"
      ,@_Email = \"${req.body.Email}\"
      ,@_SoDT = \"${req.body.SoDT}\"
      ,@_MaLoaiNguoiDung = \"${req.body.MaLoaiNguoiDung}\"
    `)
  }).then(result => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({code: 'ok', value: 
      {
        TaiKhoan :req.body.TaiKhoan,
        MatKhau : req.body.MatKhau,
        HoTen : req.body.HoTen,
        Email : req.body.Email,
        SoDT : req.body.SoDT,
        MaLoaiNguoiDung : req.body.MaLoaiNguoiDung
      }
    });
    sql.close();
  }).catch(err => {
    console.log(err);
    res.status(200).send({ err})

    sql.close();
  });
}

exports.GhiDanhKhoaHoc = function(req, res, next){
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
    EXECUTE [dbo].[GhiDanhKhoaHoc]
    @_MaKhoaHoc = \"${req.body.MaKhoaHoc}\",
    @_TaiKhoan= \"${req.body.TaiKhoan}\" 
    `)
  }).then(result => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({result:true,code: 'Ghi Danh Thanh Cong', value: 
      {
         MaKhoaHoc : req.body.MaKhoaHoc,
         TaiKhoan:req.body.TaiKhoan
      }
    });
    sql.close();
  }).catch(err => {
    res.status(200).send({ result:false})
    sql.close();
  });
  
}

exports.LayThongTinKhoaHocCuaHocVien = function(req, res,next){
  console.log(req);
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
    select*from dbo.LayKhoaHocCuaHocVien(\'${req.body.TaiKhoan}\')
    `)
  }).then(result => {
    let rows = result.recordset
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(rows);
    sql.close();
  }).catch(err => {
    res.status(200).send({result:false})
    sql.close();
  });
}

exports.DanhSachDangNhap = function(req,res, next){
  new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`Select *from dbo.DangNhapNguoiDung()
      `)
    }).then(result => {
      let rows = result.recordset
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200).json(rows);
      sql.close();
    }).catch(err => {
      res.status(200).send(err)
      sql.close();
    });
}