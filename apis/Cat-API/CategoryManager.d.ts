import { RaidenCol } from "../Typings/collection";
import Category from "./Category";
//@ts-ignore
class CategoryManager {
    /**
     * Fetches a collection of category sliced by the limit if there is any or a single category
     */
    public fetch<T = undefined>(options: { id: T, limit: number}): T extends undefined ? Promise<RaidenCol<string, Category>> : Promise<Category>
}

export = CategoryManager