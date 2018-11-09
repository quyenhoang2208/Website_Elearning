const sql = require('mssql')
const config = require('../connect')


exports.DanhSachKhoaHoc = function(req,res, next){
  new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`Select*from dbo.QuanLyKhoaHoc()
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
exports.ThemKhoaHoc = function(req, res){
  
  console.log(req);
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
      EXECUTE  [dbo].[ThemKhoaHoc] 
      @_MaKhoaHoc = \"${req.body.MaKhoaHoc}\"
        ,@_TenKhoaHoc = \"${req.body.TenKhoaHoc}\"
        ,@_MoTa = \"${req.body.MoTa}\"
        ,@_LuotXem = \"${req.body.LuotXem}\"
        ,@_NguoiTao = \"${req.body.NguoiTao}\"
        ,@_HinhAnh = \"${req.body.HinhAnh}\"
      ,@_GiaKhoaHoc =\"${req.body.GiaKhoaHoc}\"
      ,@_SoGioHoc  = \"${req.body.SoGioHoc}\"
    `)
  }).then(result => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({code: 'ok', value: 
      {
        MaKhoaHoc :req.body.MaKhoaHoc,
        TenKhoaHoc: req.body.TenKhoaHoc,
        MoTa : req.body.MoTa,
        LuotXem : req.body.LuotXem,
        NguoiTao : req.body.NguoiTao,
        HinhAnh : req.body.HinhAnh,
        GiaKhoaHoc :req.body.GiaKhoaHoc,
        SoGioHoc :req.body.SoGioHoc
      }
    });
    sql.close();
  }).catch(err => {
    console.log(err);
    res.status(200).send({ err})

    sql.close();
  });  
}

exports.XoaKhoaHoc = function(req, res, next){
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
    EXECUTE [dbo].[XoaKhoaHoc]
    @_MaKhoaHoc = \"${req.body.MaKhoaHoc}\"
    `)
  }).then(result => {
    let rows = result.recordset
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).send({code: 'Da Xoa Thanh Cong', value: 
      {
         MaKhoaHoc : req.body.MaKhoaHoc
      }
    });
    sql.close();
  }).catch(err => {
    res.status(200).send({ message: err})
    sql.close();
  });
  
}

exports.CapNhatKhoaHoc = function(req, res){
  
  console.log(req);
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
    EXECUTE  [dbo].[CapNhatKhoaHoc] 
      @_MaKhoaHoc = \"${req.body.MaKhoaHoc}\"
        ,@_TenKhoaHoc = \"${req.body.TenKhoaHoc}\"
        ,@_MoTa = \"${req.body.MoTa}\"
        ,@_LuotXem = \"${req.body.LuotXem}\"
        ,@_NguoiTao = \"${req.body.NguoiTao}\"
        ,@_HinhAnh = \"${req.body.HinhAnh}\"
      ,@_GiaKhoaHoc =\"${req.body.GiaKhoaHoc}\"
      ,@_SoGioHoc  = \"${req.body.SoGioHoc}\"
    `)
  }).then(result => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({code: 'ok', value: 
      {
        MaKhoaHoc :req.body.MaKhoaHoc,
        TenKhoaHoc: req.body.TenKhoaHoc,
        MoTa : req.body.MoTa,
        LuotXem : req.body.LuotXem,
        NguoiTao : req.body.NguoiTao,
        HinhAnh : req.body.HinhAnh,
        GiaKhoaHoc :req.body.GiaKhoaHoc,
        SoGioHoc :req.body.SoGioHoc
      }
    });
    sql.close();
  }).catch(err => {
    console.log(err);
    res.status(200).send({ err})

    sql.close();
  });  
}
exports.LayChiTietKhoaHoc = function(req, res,next){
  console.log(req);
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
        select *from dbo.LayChiTietKhoaHoc(\'${req.body.MaKhoaHoc}\')
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