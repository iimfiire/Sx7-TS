import Vote from "./Vote";
import { RaidenCol } from "../Typings/collection"
//@ts-ignore
class VoteManager {
    public token: string
    /**
     * Fetches this vote or fetches a collection of the votes you have in your account
     * @param options - The options
     */
    public fetch<T = undefined>(options?: {voteID: T, limit: number}): T extends undefined ? Promise<RaidenCol<string, Vote>> : Promise<Vote>
    /**
    * Votes on this image
    * @param {string} id - The image ID you want to vote on
    * @return The ID of the vote
    */
    public vote(id: string): Promise<string>
    /**
     * Downvotes this image
     * @param id - The Image ID you want to downvote on
     */
    public downvote(id: string): Promise<string>
    /**
     * To delete a vote
     * @param id - The vote id you want to delete
     */
    public delete(id: number): Promise<string>
}

export = VoteManager