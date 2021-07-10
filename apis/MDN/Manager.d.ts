import Me from "./Me";
import ResultManager from "./ResultManager";
interface Options {
    /**
     * The limit of result you want to get
     */
    limit: number,
    /**
     * How should the result be sorted
     */
    sort: "relevance" | "best" | "popularity",
    /**
     * The locale
     */
    locale: "en-US" | "de" | "es" | "fr" | "ja" | "ko" | "pl" | "pt-BR" | "ru",
    /**
     * The page for this search
     */
    page: number
}
export default class Manager {
    public fetch(query: string, options: Options): Promise<ResultManager>
    /**
     * The me manager
     */
    public me(): Promise<Me>
}