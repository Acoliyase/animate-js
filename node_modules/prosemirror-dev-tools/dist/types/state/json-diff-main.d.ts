import { DiffPatcher } from "jsondiffpatch";
import { IdleScheduler } from "./idle-scheduler";
export declare class JsonDiffMain {
    diffPatcher: DiffPatcher;
    scheduler: IdleScheduler;
    diff(input: {
        id: string;
        a: unknown;
        b: unknown;
    }): Promise<{
        id: string;
        delta: import("jsondiffpatch").Delta | undefined;
    }>;
}
