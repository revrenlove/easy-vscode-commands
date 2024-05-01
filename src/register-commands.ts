import * as vscode from 'vscode';
import { CommandBase } from "./command-base";

/**
 * Registers all commands supplied and pushes them to the `context`
 * @param context - `vscode.ExtensionContext` - just pass the `context` variable from the `activate` method
 * @param commands - Array of command classes - e.g. `[HelloWorldCommand]`
 */
export function registerCommands(
    context: vscode.ExtensionContext,
    commands: (new (context: vscode.ExtensionContext) => CommandBase)[]): void {

    commands.forEach(command => {

        const instance = new command(context);
        const commandId = (<typeof CommandBase>instance.constructor).commandId;

        if (!commandId) {
            throw new Error(`No commandId found for ${command.name}`);
        }

        const subscription = vscode.commands.registerCommand(commandId, instance.execute, instance);

        context.subscriptions.push(subscription);
    });
}
