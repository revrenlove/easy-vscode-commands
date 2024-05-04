import * as vscode from 'vscode';
import { CommandBase } from "./command-base";

/**
 * Type alias for any class extending `CommandBase`
 */
type EasyVsCodeCommand = new (context: vscode.ExtensionContext) => CommandBase;

export { EasyVsCodeCommand };
