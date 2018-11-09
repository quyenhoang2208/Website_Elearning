const path = require('path');
const webpack = require('webpack'); //Khai báo đối tượng webpack
var libs=[
    'jquery',
    'bootstrap',
    'popper.js'
]

module.exports = {
    plugins:[
        //plugin giúp nhận dạng cú pháp jquery
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            CKEDITOR: 'ckeditor',
            'window.CKEDITOR': 'ckeditor'
        }),
       
    ], 
    entry: {   
     //Danh sách các file đầu vào
      admin:"./assets/ts/admin_html.ts",
      login:"./assets/ts/dangnhap_html.ts",
      register:"./assets/ts/dangky_html.ts",
      home:"./assets/ts/home_html.ts",
      courseOfUser:"./assets/ts/course_user_html.ts",
      course:"./assets/ts/course_html.ts",
      contact:"./assets/ts/contact_html.ts",
      aboutUs:"./assets/ts/about_us_html.ts",
      dsnguoidung:"./assets/ts/danhsachnguoidung.ts",
      dskhoahoc:"./assets/ts/danhsachkhoahoc.ts",
      dsghidanh:"./assets/ts/ghidanhkhoahoc.ts",
      chitietkhoahoc:"./assets/ts/detail_course.ts",
      vendor:libs //Danh sách các thư viện
    },
    output: { 
        path: path.resolve(__dirname, "dist"), //Thư mục chứa file sau khi webpack
        filename: "[name].js", //Tên các file webpack đầu ra 
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            //Đóng gói css
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" },
                {
                    loader: "css-loader",
                    options: {
                        minimize: true,
                    }
                }],
            }
            //Đóng gói sass
            , {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                        }
                    },
                    { loader: "sass-loader" },
                ]
            },
           

            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 100000,
                       
                        name: "../[path][name].[ext]",
                       
                    }
                }]
            },
            
        ]
    }, resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    
    optimization: {
        splitChunks: { //cache các thư viện 
            cacheGroups: {		
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    minSize: 50000,
                    name: "vendor",
                    enforce: true,
                }
            }
        }
    }
}