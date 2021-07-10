import { RaidenCol } from "../Typings/collection";
import Favourite from "./Favourite";
//@ts-ignore
class FavouriteManager {
    /**
     * Fetches a specific favourite id from your account or returns a collection of all of them sliced by limit
     */
    public fetch<T = undefined>(options: { id: T, imageID: string, limit: number, subID: string}): T extends undefined ? Promise<RaidenCol<number, Favourite>> : Promise<Favourite>
    /**
     * Deletes a specific favourite ID
     * @param id - The favourite id to delete
     */
    public delete(id: string): Promise<string>
    /**
     * Favourites a specific image
     * @param id - The image id you want to favourite
     * @param options - (Optional) An optional ‘sub_id’ can be passed to help filter Favourites when performing GET /favourites
     */
    public create(id: string, options?: { subID?: string}): Promise<Favourite>
}

export = FavouriteManager