import * as vscode from 'vscode';

/**
 * Base class all "command" classes should extend.
 */
export abstract class CommandBase {

    /**
     * @param context - The extension's `vscode.ExtensionContext` instance.
     */
    public constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    /**
     * This is equivalent to the `callback` parameter of the
     * `vscode.commands.registerCommand` function.
     * @param args - This type signature should be tailored to your specific use case.
     * @returns `any`
     */
    public abstract execute(...args: any[]): any;

    /**
     * The extension's `vscode.ExtensionContext` instance.
     */
    protected readonly context: vscode.ExtensionContext;

    /**
     * The string value supplied in the `commandId` decorator
     */
    public static commandId: string;
}
