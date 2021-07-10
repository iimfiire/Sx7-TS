let CodeManager = require("./CodeManager").default
class Base {
    /**
     * The codes manager
     */
    get codes() {
        return new CodeManager(this.constructor.LANGUAGES)
    }
}

Base.LANGUAGES = {
    COFFEESCRIPT: "coffeescript",
    CSS: "css",
    D: "d",
    DART: "dart",
    DIFF: "diff",
    DJANGO: "django",
    DOCKERFILE: "dockerfile",
    ERLANG: "erlang",
    GO: "go",
    HANDLEBARS: "handlebars",
    "HTML/XML": "html/xml",
    HTTP: "http",
    JAVASCRIPT: "javascript",
    JSX: "jsx",
    LIVESCRIPT: "livescript",
    LUA: "lua",
    MARKDOWN: "markdown",
    NGINX: "nginx",
    PASCAL: "pascal",
    PERL: "perl",
    PHP: "php",
    POWERSHELL: "powershell",
    PYTHON: "python",
    RUBY: "ruby",
    RUST: "rust",
    SAS: "sas",
    SASS: "sass",
    SHELL: "shell",
    SPARQL: "sparql",
    SPREADSHEET: "spreadsheet",
    SQL: "sql",
    SWIFT: "swift",
    VB: "vb",
    VBSCRIPT: "vbscript",
    VUE: "vue",
    XQUERY: "xquery",
    YAML: "yaml",
    "YAML-FRONTMATTER":"yaml-frontmatter",
}

module.exports = Base