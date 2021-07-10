import Docs from "./Docs";
type DocsType = "commando" | "collection" | "main" | "rpc"
type Version = "stable" | "master" | "v11" | "v12" | "12.5.3" | "12.4.1" | "12.3.1" | "12.2.0" | "12.1.1" | "12.0.2" | "11.6.4" | "11.5.1" | "11.4.2" | "11.3.2"
export default class DocsManager {
    public fetch(query: string, options: { type: DocsType, version: Version}): Promise<Docs>
}