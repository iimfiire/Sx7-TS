import { RaidenCol } from "../Typings/collection";
import Breeds from "./Breeds";
//@ts-ignore
class BreedManager {
    /**
     * Fetches a breed that matches the id or the name else will return all breeds sliced up by the limit
     */
    public fetch<T = undefined>(options: { id: T, limit: number, name: string}): T extends undefined ? Promise<RaidenCol<string, Breeds>> : Promise<Breeds>
}

export = BreedManager