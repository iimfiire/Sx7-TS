export class RaidenSet<V> extends Set<T> {
    public add(k: V): this
    /**
     * Gets the first value in the set
     */
    public first(): V
    /**
     * Filters the Set and return the filtered Set
     */
    public filter(fn: (value: V) => any): this
    public delete(value: V): boolean
    /**
     * Maps the values in the set
     */
    public map(fn: (value: V) => any): V[]
    /**
     * Finds 1 value that returns true from fn
     */
    public find(fn: (value: V) => any): V
    /**
     * Returns an array representation of the Set
     * @param limit - How many values you want to return
     */
    public array(limit: number): V[]
    public get size(): number
    public clear(): void
    /**
     * Gets the last value from the Set
     */
    public last(): V
}