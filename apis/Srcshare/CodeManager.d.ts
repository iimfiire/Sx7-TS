import Code from "./Code";

type Languages = "coffeescript" | "css" | "d" | "dart" | "diff" | "django" | "dockerfile" | "erlang" | "go" | "handlebars" | "html/xml" | "html" | "http" | "javascript" | "jsx" | "livescript" | "lua" | "markdown" | "nginx" | "pascal" | "perl" | "php" | "powershell" | "python" | "ruby" | "rust" | "sas" | "sass" | "shell" | "sparql" | "spreadsheet" | "sql" | "swift" | "vb" | "vbscript" | "vue" | "xquery" | "yaml" | "yaml-frontmatter"
interface Options {
    /**
     * The error in your code
     */
    error: string,
    /**
     * The language you want to highlight this code
     */
    language: Languages,
    /**
     * The title of this code
     */
    title: string,
    /**
     * The description for this code
     */
    description: string
}

export default class CodeManager {
    /**
     * To fetch an existing srcshare
     * @param id - The srcshare id you want to fetch
     */
    public fetch(id: string): Promise<Code>

    /**
     * To create a srcshare
     * @param code - Your code, must be file path
     * @param options - The request parameters
     */
    public create(code: string, options: Options): Promise<Code>
}