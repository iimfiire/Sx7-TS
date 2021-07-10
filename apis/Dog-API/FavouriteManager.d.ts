import { RaidenCol } from "../Typings/collection";
import Favourite from "./Favourite";

export default class FavouriteManager {
    /**
     * Fetches a single favourites in your account by id or imageID otherwise a collection sliced up by limit, you can also filter by subID
     * @param options - The request parameters for this methid
     */
    public fetch<T = undefined>(options: { id: T, imageID: string, limit: number, subID: string}): T extends undefined ? Promise<RaidenCol<string, Favourite>> : Promise<Favourite>
    /**
     * Deletes a favourite from your account, if any
     * @param id - The id of the favourite to delete
     */
    public delete(id: number): Promise<string>
    /**
     * To favourite an image
     * @param imageID - The image id you want to favourite
     * @param options - The subID if you want
     */
     public create(imageID: string, options?: { subID?: string}): Promise<Favourite>
}
