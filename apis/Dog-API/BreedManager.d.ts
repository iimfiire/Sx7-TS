import { RaidenCol } from "../Typings/collection";
import Breeds from "./Breeds";

export default class BreedManager {
    /**
     * Fetches a single breed by id or by name otherwise returns a collection of breeds sliced up by limit. Limit is defeault = 10
     * @param options - The request parameters for this method
     */
    public fetch<T = undefined>(options: {id: T, limit: number, name: string, attachBreed: number}): T extends undefined ? Promise<RaidenCol<number, Breeds>> : Promise<Breeds>
}
