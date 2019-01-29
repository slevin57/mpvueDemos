// http://eslint.org/docs/user-guide/configuring

module.exports = {
    //此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,
    // 指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parser: 'babel-eslint',
    // 指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    parserOptions: {
        sourceType: 'module'
    },
    // 指定环境的全局变量，下面的配置指定为非浏览器
    env: {
        browser: false,
        node: true,
        es6: true
    },
    // 用来配置标准的js风格
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    },
    globals: {
        App: true,
        Page: true,
        wx: true,
        getApp: true,
        getPage: true,
        requirePlugin: true
    }
}
