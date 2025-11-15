export type NodePickerState = {
    top: number;
    left: number;
    width: number;
    height: number;
    active: boolean;
};
export declare function useNodePicker(): readonly [NodePickerState, {
    activate: () => void;
    deactivate: () => void;
    select: (target: HTMLElement) => void;
    updatePosition: (target: HTMLElement) => void;
}];
