const webpack=require('webpack');
const ExtractTextPlugin=require('extract-text-webpack-plugin'); //css单独打包
const HtmlWebpackPlugin=require('html-webpack-plugin'); //生成html文件
const OpenBrowserPlugin=require('open-browser-webpack-plugin');
const path=require('path');

module.exports={
    entry:{
      app:'./src/index'
    },
    output:{
        filename:'[name].js',
        path:path.join(__dirname,'/dist'),
        publicPath:'/'
    },
    module:{
        loaders:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:[ 'es2015','react',"stage-0"],
                    "plugins": [
                        ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
                    ]
                },

            },{
                test:/\.scss$/,
                exclude:/node_modules/,
                loader:ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader!sass-loader!autoprefixer-loader'})
            },{
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                include: /iconfont/,
                loader: 'file-loader?name=images/iconfont/[name].[ext]'
            },{
                test: /\.(png|jpg)$/,
                include: /default/,
                loader: 'url?limit=20000&name=images/default/[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            },{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader'})
            }
        ]
    },
    plugins:[
        // new OpenBrowserPlugin({url:'http://localhost:8099'}),    //自动打开浏览器
        new HtmlWebpackPlugin({
            title:'cnode',
            template:path.join(__dirname,'/src/html/index.html'),
            filename:'index.html',  //生成的html存放路径，相对于path
            hash:true,  //为静态资源生成hash值
            inject:true,    //要把script插入到标签里
            favicon:path.join(__dirname,'/src/images/pic/cnode.png')
        }),
        new ExtractTextPlugin('[name].css') //css单独打包
    ],
    devtool:'cheap-module-source-map',
    resolve:{
        extensions:['.js','.jsx'] //后缀名自动补全
    },
    devServer:{
        historyApiFallback: true,   //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        //hot: true,// 在package.json的script里命令里配置比较好,就能自动添加HotModuleReplacementPlugin，同时将服务转化为热加载形式
        inline: true,   //inline模式的热模块替换，自动刷新
        proxy: {    //代理某些 URL
            "/api/*": {
                target: "https://cnodejs.org",//后台服务器所在的地址
                secure: false   //默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，修改配置为false
            }
        },
        contentBase: "./dist",  //告诉服务器从哪里提供内容
        colors: true,   //Enables/Disables colors on the console.
        port:8099,  //指定要监听请求的端口号
        open:true   //When open is enabled, the dev server will open the browser.
    }
};