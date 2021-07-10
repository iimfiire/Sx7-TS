import Favourite from "../Cat-API/Favourite";
import { RaidenCol } from "../Typings/collection";
import Vote from "./Vote";

export default class VoteManager {
    /**
     * Fetches a single vote by id otherwise a collection sliced up by limit
     * @param options - The request parameters for this method
     */
    public fetch<T = undefined>(options: { id: T, limit: number, subID: string}): T extends undefined ? Promise<RaidenCol<string, Vote>> : Promise<Vote>
    /**
     * To vote an image
     * @param imageID - The image id you want to vote on
     */
    public create(imageID: string): Promise<Vote>
    /**
     * To downvote an image
     * @param imageID - The image id you want to downvote on, if exist
     */
    public down(imageID: string): Promise<Vote>
    /**
     * To delete an existing vote in your account
     * @param id - The vote id you want to delete
     */
    public delete(id: number): Promise<string>

}