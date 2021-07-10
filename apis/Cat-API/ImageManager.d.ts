import { RaidenCol } from "../Typings/collection";
import Image from "./Image";
type Size = "full" | "med" | "small" | "thumb"
//@ts-ignore
class ImageManager {
    /**
     * Fetches a single image by id or return collection of them, if breedID is specified it will return an array of Breed with that id, if random is specified it will be randomized
     * @param options - The request parameters for this request
     */
    public fetch<T = undefined>(options: { id: T, size: Size, limit: number, categoryIDS: number[], breedID: number}): T extends undefined ? Promise<RaidenCol<string, Image>> : Promise<Image>
    /**
     * The randomized image
     */
    public fetch(options: { random: true}): Promise<Image>
    /**
     * The images you have uploaded
     */
    public myImages<T = undefined>(options: {id: T, limit: number, categoryIDS: [], breedID: []}): T extends undefined ? Promise<RaidenCol<string, Image>> : Promise<Image>
    /**
     * Uploads an image
     * @param file - The path to the image you want to uplaod
     * @param options - The options for this upload
     */
    public create<T>(file: T, options: { subID: string}): Promise<Image>
    /**
     * Deletes an uploaded image from your account
     * @param id - The image id
     */
    public delete(id: string): Promise<string>
}

export = ImageManager