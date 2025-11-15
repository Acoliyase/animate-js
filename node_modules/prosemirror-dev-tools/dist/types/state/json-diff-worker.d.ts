import type { Delta } from "jsondiffpatch";
import { IdleScheduler } from "./idle-scheduler";
export declare class JsonDiffWorker {
    queue: Map<any, any>;
    scheduler: IdleScheduler;
    worker: Worker;
    constructor(worker: Worker);
    diff(input: unknown): Promise<{
        id: string;
        delta?: Delta;
    }>;
}
