    export class RaidenCol<K, V> extends Map<K, V>{
        /**
         * Filters the current collection of values and returns a new collection of filtered items
         */
        public filter(fn: (value: V) => {}): this
        /**
         * Filters the current collection of keys and returns a new collection of filtered items
         */
        public filterKey(fn: (key: K) => {}): this
        /**
         * Maps the collection of keys and returns an array of them. Similar to [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
         */
        public map(callbackfn: (value: K, index: number, array: K[]) => any): K[]
        /**
         * Maps the collection of values and returns an array of them. Similar to [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
         */
        public mapVal(callbackfn: (value: V, index: number, array: V[]) => any): V[]
        /**
         * Randomizes the collection and returns the randomized values
         */
        public random(): V
        /**
         * Check if all array of keys exist in the collection, else false
         */
        public hasAll(k: K[]): boolean
        /**
         * Checks if specified key exist in collection
         */
        public has(k: K): boolean
        /**
         * Puts all keys to an array
         */
        public keyArray(): K[]
        /**
         * Gets the very last value in the collection
         */
        public last(): V
        /**
         * Returns the very last key in the collection
         */
        public lastKey(limit: number): K
        /**
         * Find 1 value from the collection that returns true from fn
         */
        public find(fn: (this: void, value: V, index: number, obj: V[]) => value is any, thisArg?: any): V
        /**
         * Finds 1 key from the collection that returns true from fn
         */
        public findKey(fn: (this: void, value: K, index: number, obj: K[]) => value is any, thisArg?: any): K
        /**
         * Returns the very first value in the collection
         */
        public first(): V
        /**
         * Returns an array of values
         */
        public array(): V[]
        /**
         * Runs a function on the collection and returns the collection.
         * @param {Function} fn Function to execute
         * @param {*} [thisArg] Value to use as `this` when executing function
         * @returns {this}
         * @example
         * collection
         *  .tap(coll => console.log(coll.size))
         *  .filter(user => user.bot)
         *  .tap(coll => console.log(coll.size))
         */
        public tap(fn: (collection: this) => {}): this
        /**
         * Similar to the behaviour of [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
         */
        public every(fn: (value: V) => {}): boolean
        /**
         * Identical to [Map.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach). But returns the collection instead of undefined
         */
        public each(fn: (value: V, key: K, map: this) => {}): this
        /**
         * Returns a randomize key
         */
        public randomKey(): K
        /**
         * Checks if both collection are the same
         */
        public equals(collection: Map<K, V>): boolean
        /**
         * Returns an array of key difference between two Map
         */
        public difference(collection: Map<K, V>): K[]
    }