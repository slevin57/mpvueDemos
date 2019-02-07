// http://eslint.org/docs/user-guide/configuring

module.exports = {
    //此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,
    // 指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parser: "babel-eslint",
    // 指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    parserOptions: {
        sourceType: "module"
    },
    // 指定环境的全局变量，下面的配置指定为非浏览器
    env: {
        browser: false,
        node: true,
        es6: true
    },
    // 用来配置标准的js风格
    // eslint推荐规则：http://eslint.cn/docs/rules/
    extends: "eslint:recommended",
    // required to lint *.vue files
    // 用来提供插件的，插件名称省略了eslint- plugin -，下面这个配置是用来规范html的
    plugins: ["html"],
    /**add your custom rules here
     * 下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
     * 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
     * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    rules: {
        // allow paren-less arrow functions
        "arrow-parens": 0,
        // allow async-await
        "generator-star-spacing": 0,
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
        //缩进风格.默认4，否则会报错
        indent: [
            2,
            4,
            {
                SwitchCase: 1 // 针对switch case的缩进
            }
        ],
        // console的使用规则
        "no-console": [0, { allow: ["warn", "error"] }],
        // 语句强制分号结尾
        semi: [2, "always"],
        // 分号前后空格。默认选项禁止分号之前有空格，强制分号之后有空格。
        "semi-spacing": [1, { before: false, after: true }],
        // 禁止有声明后未被使用的变量或参数
        "no-unused-vars": [2, { vars: "all", args: "after-used" }]
    },
    globals: {
        App: true,
        Page: true,
        wx: true,
        getApp: true,
        getPage: true,
        requirePlugin: true
    }
};
