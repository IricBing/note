# Vue 项目 vscode 配置

## `.vscode/settings.json` 文件配置

``` json
{
  "editor.detectIndentation": false, // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.tabSize": 2, // 重新设定tabsize
  "editor.formatOnSave": true, // #每次保存的时候自动格式化
  "window.zoomLevel": 0,
  // 在使用搜索功能时，将这些文件夹/文件排除在外
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/target": true,
    "**/logs": true,
    "**/dist": true
  },
  // 这些文件将不会显示在工作空间中
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/*.js": {
      "when": "$(basename).ts" //ts编译后生成的js文件将不会显示在工作空中
    },
    "**/node_modules": true
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "vetur.validation.template": false, // 使用eslint插件时需要把此项设置为false
  "vetur.validation.script": true, //检查js代码
  "vetur.validation.style": true, //能检查css的属性是否存在,分隔符是否正确，
  "vetur.format.defaultFormatter.html": "js-beautify-html", //默认采用js-beautify-html格式化
  "vetur.format.defaultFormatterOptions": {
    //对vue文件html的格式化，对js的格式化在全局的prettierrc.json文件控制
    "js-beautify-html": {
      "wrap_attributes": "auto",
      "indent_size": 2, //缩进大小
      "indent_char": " ", //缩进字符
      "indent_with_tabs": false,
      "eol": "\n", // 用作行终止的字符，默认为\n
      "end_with_newline": true, //是否用换行符结束
      "preserve_newlines": true, // 是否保留现有的换行符
      "max-preserve-newlines": 40, // 一次可保留的最大换行数
      "indent-inner-html": true, //缩进 head body代码片段
      "wrap_line_length": 1200, //超过多少字符换行
      "editorconfig": false //使用editorconfig设置选项
    }
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "prettier.semi": true,
  "prettier.singleQuote": true,
  "html.format.maxPreserveNewLines": 40,
  "html.format.enable": false,
  "cSpell.words": ["appender", "disturl", "mixins", "nprogress", "screenfull", "submenu", "vuex"]
}
```

## `.vscode/extensions.json` 文件配置

``` json
{
  "recommendations": [
    "streetsidesoftware.code-spell-checker",
    "aaron-bond.better-comments",
    "mikestead.dotenv",
    "hookyqr.beautify",
    "dbaeumer.vscode-eslint",
    "octref.vetur",
    "wayou.vscode-todo-highlight",
    "gruntfuggly.todo-tree",
    "esbenp.prettier-vscode"
  ]
}
```

## `.eslintrc.js` 文件配置

由于文件长度过长，不做展开，可从文件下载： 附件：[.eslintrc.js](assets/files/.eslintrc.js)

<details>
<summary>展开查看全部配置</summary>

``` javascript
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    plugins: ['prettier'],
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? ['error', {
            allow: ['warn', 'error']
        }] : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prettier/prettier': 0, // 会优先采用prettierrc.json的配置，不符合规则会提示错误
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: 100,
                multiline: {
                    max: 80,
                    allowFirstLine: true
                }
            }
        ],
        'vue/html-self-closing': 'off',
        'vue/no-parsing-error': 'off',
        'vue/require-default-prop': 'off',
        'vue/mustache-interpolation-spacing': ['error', 'always'],
        'vue/attribute-hyphenation': 'off',
        // 组件顺序
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',
                    'name',
                    'parent',
                    'functional',
                    ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    'inheritAttrs',
                    'model',
                    ['props', 'propsData'],
                    'fetch',
                    'asyncData',
                    'data',
                    'computed',
                    'watch',
                    'methods',
                    'filter',
                    'head',
                    ['template', 'render'],
                    'renderError'
                ]
            }
        ],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/require-prop-types': 'off',
        'vue/name-property-casing': ['error', 'PascalCase'],
        'vue/no-v-html': 'off',
        'no-constant-condition': 'off',
        'accessor-pairs': 2,
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'block-spacing': [2, 'always'],
        'brace-style': [
            2,
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        camelcase: [
            0,
            {
                properties: 'always'
            }
        ],
        'comma-dangle': [2, 'never'],
        'comma-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        'comma-style': [2, 'last'],
        'constructor-super': 2,
        curly: [2, 'multi-line'],
        'dot-location': [2, 'property'],
        'eol-last': 2,
        eqeqeq: 0,
        'generator-star-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'handle-callback-err': 0,
        indent: [
            2,
            2,
            {
                SwitchCase: 1
            }
        ],
        'jsx-quotes': [2, 'prefer-single'],
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'new-cap': [
            2,
            {
                newIsCap: true,
                capIsNew: false
            }
        ],
        'new-parens': 2,
        'no-array-constructor': 'off',
        'no-caller': 2,
        'no-class-assign': 2,
        'no-cond-assign': 2,
        'no-const-assign': 2,
        'no-control-regex': 0,
        'no-delete-var': 2,
        'no-dupe-args': 2,
        'no-dupe-class-members': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-empty-character-class': 2,
        'no-empty-pattern': 2,
        'no-eval': 2,
        'no-ex-assign': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-boolean-cast': 2,
        'no-extra-parens': [2, 'functions'],
        'no-fallthrough': 2,
        'no-floating-decimal': 2,
        'no-func-assign': 2,
        'no-implied-eval': 2,
        'no-inner-declarations': [2, 'functions'],
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-labels': [
            2,
            {
                allowLoop: false,
                allowSwitch: false
            }
        ],
        'no-lone-blocks': 2,
        'no-mixed-spaces-and-tabs': 2,
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-multiple-empty-lines': [
            2,
            {
                max: 1
            }
        ],
        'no-native-reassign': 2,
        'no-negated-in-lhs': 2,
        'no-new-object': 0,
        'no-new-require': 2,
        'no-new-symbol': 2,
        'no-new-wrappers': 0,
        'no-obj-calls': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-path-concat': 2,
        'no-proto': 2,
        'no-redeclare': 2,
        'no-regex-spaces': 2,
        'no-return-assign': [2, 'except-parens'],
        'no-self-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-spaced-func': 2,
        'no-sparse-arrays': 2,
        'no-this-before-super': 2,
        'no-throw-literal': 2,
        'no-trailing-spaces': 0,
        'no-undef': 0,
        'no-undef-init': 0,
        'no-unexpected-multiline': 2,
        'no-unmodified-loop-condition': 2,
        'no-unneeded-ternary': [
            2,
            {
                defaultAssignment: false
            }
        ],
        'no-unreachable': 2,
        'no-unsafe-finally': 2,
        'no-unused-vars': 0,
        'no-useless-call': 2,
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        'no-useless-escape': 0,
        'no-whitespace-before-property': 2,
        'no-with': 2,
        'one-var': [
            2,
            {
                initialized: 'never'
            }
        ],
        'operator-linebreak': [
            2,
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before'
                }
            }
        ],
        'padded-blocks': [2, 'never'],
        quotes: [
            1,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        semi: ['error', 'always'],
        'semi-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        'space-before-blocks': [0, 'always'],
        'space-before-function-paren': [0, 'never'],
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],

        'template-curly-spacing': [2, 'never'],
        'use-isnan': 2,
        'valid-typeof': 0,
        'wrap-iife': [2, 'any'],
        'yield-star-spacing': [2, 'both'],
        yoda: [2, 'never'],
        'prefer-const': 0,
        'object-curly-spacing': 'off',
        'array-bracket-spacing': [2, 'never']
    }
};
```

</details>

## `.prettierrc.json` 文件配置

``` json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 180,
  "endOfLine": "auto",
  "trailingComma": "none",
  "bracketSpacing": true,
  "jsxBracketSameLine": true,
  "arrowParens": "avoid",
  "eslintIntegration": true,
  "htmlWhitespaceSensitivity": "ignore",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

# 可选配置

## 提交代码前自动格式化代码

`注意：`  `monoRepo` 模式不可用，需要使用 `lerna` 来配置。

安装 `husky` 和 `lint-staged` 包

``` shell
$ yarn add -D husky lint-staged cross-env
```

之后修改 `package.json` 文件，在最后面增加如下规则:

``` json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*{.js,.vue}": [
      "cross-env NODE_ENV=production vue-cli-service lint"
    ]
  }
}
```
