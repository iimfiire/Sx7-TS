"use strict";
exports.__esModule = true;
var Label_1 = require("./Label");
var Analysis = /** @class */ (function () {
    function Analysis(data) {
        var _a;
        this._labels = "labels" in data ? data.labels : null;
        this._moderationLabels = "moderation_labels" in data ? data.moderation_labels : null;
        this._vendor = "vendor" in data ? data.vendor : null;
        this._imageID = "image_id" in data ? data.image_id : null;
        this.createdAt = "created_at" in data ? new Date(data.created_at) : null;
        this._createdTimestamp = (_a = this.createdAt) === null || _a === void 0 ? void 0 : _a.getTime();
    }
    /**
     * The labels for this analysis
     * @param options - If you want to randomize the labels
     */
    Analysis.prototype.labels = function (options) {
        if ((options === null || options === void 0 ? void 0 : options.random) && typeof (options === null || options === void 0 ? void 0 : options.random) === "boolean") {
            return new Label_1(this._labels[Math.floor(Math.random() * this._labels.length)]);
        }
        else {
            return this._labels.map(function (value) { return new Label_1(value); });
        }
    };
    Object.defineProperty(Analysis.prototype, "moderationLabel", {
        /**
         * The moderation labels
         * @return {Label[]}
         */
        get: function () {
            return this._moderationLabels.map(function (value) { return new Label_1(value); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Analysis.prototype, "vendor", {
        /**
         * The vendor of this image
         * @return {string}
         */
        get: function () {
            return this._vendor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Analysis.prototype, "imageID", {
        /**
         * The image ID for this image
         * @return {string}
         */
        get: function () {
            return this._imageID;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Analysis.prototype, "createdTimestamp", {
        /**
         * The epoch of when this image was created
         * @return {number}
         */
        get: function () {
            return this._createdTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    return Analysis;
}());
exports["default"] = Analysis;
