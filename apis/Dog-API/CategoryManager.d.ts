import { RaidenCol } from "../Typings/collection";
import Category from "./Category";

export default class CategoryManager {
    /**
     * Fetches a single category by name or id otherwise a collection sliced up by limit.
     * @param options - The request parameters for this method
     */
    public fetch<T = undefined>(options: {id: T, limit: number, name: string}): T extends undefined ? Promise<RaidenCol<string, Category>> : Promise<Category>
}