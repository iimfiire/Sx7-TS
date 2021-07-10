import Label from "./Label"

export default class Analysis {
    private _labels: any[]
    private _moderationLabels: any[]
    private _vendor: string
    private _imageID: string
    public createdAt: Date
    private _createdTimestamp: number
    constructor(data) {
        this._labels = "labels" in data ? data.labels : null
        this._moderationLabels = "moderation_labels" in data ? data.moderation_labels : null
        this._vendor = "vendor" in data ? data.vendor : null
        this._imageID = "image_id" in data ? data.image_id : null
        this.createdAt = "created_at" in data ? new Date(data.created_at) : null
        this._createdTimestamp = this.createdAt?.getTime()
    }
    /**
     * The labels for this analysis
     * @param options - If you want to randomize the labels
     */
    labels<T = undefined>(options: { random: T}): T extends undefined ? Label[] : T extends boolean ? Label : Label[] {
        if(options?.random && typeof options?.random === "boolean") {
            return new Label(this._labels[Math.floor(Math.random() * this._labels.length)]) as undefined
        } else {
            return this._labels.map(value => new Label(value)) as undefined
        }
    }
    /**
     * The moderation labels
     * @return {Label[]}
     */
    get moderationLabel() {
        return this._moderationLabels.map(value => new Label(value))
    }
    /**
     * The vendor of this image
     * @return {string}
     */
    get vendor() {
        return this._vendor
    }
    /**
     * The image ID for this image
     * @return {string}
     */
    get imageID() {
        return this._imageID
    }
    /**
     * The epoch of when this image was created
     * @return {number}
     */
    get createdTimestamp() {
        return this._createdTimestamp
    }
}