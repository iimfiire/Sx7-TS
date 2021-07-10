import Code from "./Code.js"
import { RaidenCol } from "../Typings/collection"
interface Options {
    /**
     * The title for this bin
     */
    title: string,
    /**
     * The description for this bin
     */
    description: string,
    /**
     * The language id for this bin
     */
    languageId: number | "1C Enterprise" | "4D" | "ACTIONSCRIPT" | "ASSEMBLY" | "C#" | "C++" | "PYTHON" | "JAVASCRIPT" | "TEXT"
}

interface OptionsMe<T> {
    /**
     * The id of the bin u want to fetch
     */
    id: T,
    /**
     * How many results u want to get
     */
    limit: number
}
export default class BinManager {
    /**
     * To fetch a bin
     * @param id - The id of the bin you want to fetch
     */
    public fetch(id: string): Promise<Code>
    /**
     * To create a bin
     */
    public create(code: string, options: Options): Promise<Code>
    /**
     * Your bins. Experimental right now as sourcebin has no authorization method as of yet though you can authorize using your access token and refresh
     * but that is it and those token changes, they aren't static
     */
    public me(): Promise<RaidenCol<string, Code>>
    public me<T = undefined>(options: OptionsMe<T>): T extends undefined ? Promise<RaidenCol<string, Code>> : Promise<Code>
    /**
     * Deletes your specified bin. true if successful.
     * @param id - The key of the bin you want to delete
     */
    public delete(id: string): Promise<boolean>
}