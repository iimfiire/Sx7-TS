import Code from "./Code";

export default class CodeManager {
    /**
     * Fetches a paste
     * @param id - The id of this paste you want to fetch
     */
    public fetch(id: string): Promise<Code>
    /**
     * To create a paste
     * @param file - The code file you want to make
     */
    public create(file: string): Promise<Code>
}