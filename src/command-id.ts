/**
 * @param command - A unique identifier for the command. Should match the contribution point in `package.json`.
 */
export function commandId(command: string) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            static commandId: string = command;
        };
    };
}
