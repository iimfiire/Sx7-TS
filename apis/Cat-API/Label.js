class Label {
    constructor(data = {}) {
        /**
         * @private
         */
        this._name = "Name" in data ? data.Name : null
        /**
         * @private
         */
        this._confidence = "Confidence" in data ? data.Confidence : null
        /**
         * @private
         */
        this._instances = "Instances" in data ? data.Instances : null
        /**
         * @private
         */
        this._parents = "Parents" in data ? data.Parents : null
    }

    /**
     * The name for this label
     * @return {string}
     */
    get name() {
        return this._name
    }
    /**
     * The confidence for this label
     * @return {number}
     */
    get confidence() {
        return this._confidence
    }
    /**
     * The instances bounding box for this label
     * @return {any[]}
     */
    get instancesBoundingBox() {
        return this._instances.map(parent => parent.BoundingBox)
    }
    /**
     * The instances bounding box width for this label
     * @return {any[]}
     */
    get instancesBoundingBoxWidth() {
        return this.instancesBoundingBox.map(value => value.Width)
    }
    /**
     * The instances bounding box height for this label
     * @return {any[]}
     */
     get instancesBoundingBoxHeight() {
        return this.instancesBoundingBox.map(value => value.Height)
    }
    /**
     * The instances bounding box left for this label
     * @return {any[]}
     */
     get instancesBoundingBoxLeft() {
        return this.instancesBoundingBox.map(value => value.Left)
    }
    /**
     * The instances bounding box top for this label
     * @return {any[]}
     */
     get instancesBoundingBoxTop() {
        return this.instancesBoundingBox.map(value => value.Top)
    }
    /**
     * The parents name for this label
     * @return {any[]}
     */
    get parentsName() {
        return this._parents.map(parent => parent.Name)   
    }
}

module.exports = Label