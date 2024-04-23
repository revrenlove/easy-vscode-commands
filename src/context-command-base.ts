import * as vscode from 'vscode';
import { CommandBase } from "./command-base";

export abstract class ContextCommandBase extends CommandBase {

    private _context: vscode.ExtensionContext;

    protected constructor(context: vscode.ExtensionContext) {
        super();

        this._context = context;
    }

    protected get context(): vscode.ExtensionContext {
        return this._context;
    }
}
