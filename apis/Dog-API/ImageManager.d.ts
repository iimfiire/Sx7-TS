import { RaidenCol } from "../Typings/collection"
import Image from "./Image"

type Size = "full" | "med" | "small" | "thumb"
export default class ImageManager {
    /**
     * Fetches a single value otherwise fetches a collection of them
     * @param options - The request parameter
     */
    public fetch<T = undefined>(options: { id: T, size: Size, limit: number, categoryIDS: number[], breedID: number}): T extends undefined ? Promise<RaidenCol<string, Image>> : Promise<Image>
    /**
     * The randomized image
     */
    public fetch(options: { random: true}): Promise<Image>
    /**
     * Uploads an image to your account
     * @param file - The path to file
     * @param options - If you want a subID
     */
    public create<T>(file: T, options?: { subID?: string}): Promise<Image>
    /**
     * Deletes an uploaded image by you in your account
     * @param id - The image ID you want to delete
     */
    public delete(id: string): Promise<string>
    /**
     * Fetches a single image in your account or a collection of them, if any
     * @param options - The request parameters
     */
    public myImages<T = undefined>(options: {id: T, limit: number, categoryIDS: [], breedID: []}): T extends undefined ? Promise<RaidenCol<string, Image>> : Promise<Image>
    /**
     * The randomized uploaded images by you
     */
    public myImages(options: { random: true}): Promise<Image>
}