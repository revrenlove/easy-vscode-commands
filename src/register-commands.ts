import * as vscode from 'vscode';
import { CommandBase } from "./command-base";
import { ContextCommandBase } from './context-command-base';

export function registerCommands(
    context: vscode.ExtensionContext,
    commands: ((new () => CommandBase) | (new (context: vscode.ExtensionContext) => ContextCommandBase))[]): void {

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
