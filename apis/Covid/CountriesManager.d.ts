import Country from "./Country"
import { RaidenCol } from "../Typings/collection"
export default class CountriesManager {
    /**
     * The country name to filter with
     */
    public fetch(options: { name: string}): Promise<Country>
    /**
     * The collection of countries
     */
    public fetch(options: { limit: number}): Promise<RaidenCol<string, Country>>
    public fetch(): Promise<RaidenCol<string, Country>>
}