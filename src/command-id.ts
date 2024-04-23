export function commandId(id: string) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            static commandId: string = id;
        };
    };
}
