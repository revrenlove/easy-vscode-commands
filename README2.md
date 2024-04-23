# Easy VSCode Commands

This library/pattern helps keep the code for your commands in your VSCode extension a touch more structured and clean (hopefully).

## Installation

`npm install @revrenlove/easy-vscode-commands`

## Usage

### `@commandId` decorator

Every "command" class should be decorated with `@commandId('my-org.myCommandName')` where the string parameter passed in corresponds to the the entry in your `commands` contribution point in your `package.json`.

It is the equivalent to the `command` parameter of the `vscode.commands.registerCommand` function.

In addition, it sets a static property `commandId` to the value on every class instance derived from the `CommandBase` or `ContextCommandBase` (which itself is derived from `CommandBase`).

**NOTE:** If this is not included on a command class, and your extension is activated, a run-time error will be thrown. This will **NOT** be caught at compile-time.

### "Command" Class

#### `src/hello-world-command.ts`

```ts
import * as vscode from 'vscode';
import { CommandBase, commandId } from '@revrenlove/easy-vscode-commands';

@commandId('your-org.helloWorld')
export class HelloWorldCommand extends CommandBase {

    public async execute(): Promise<void> {
        await vscode.window.showInformationMessage("Hello, World!");
    }
}
```

### "Command" class with access to the `vscode.ExtensionContext`

If you need access to the extension context, you can extend the `ContextCommandBase`. The only implementation difference is that you need to include the constructor.

The `vscode.ExtensionContext` can be accessed via the `context` property.

#### `src/set-global-state-command.ts`

```ts
import * as vscode from 'vscode';
import { ContextCommandBase, commandId } from '@revrenlove/easy-vscode-commands';

@commandId('your-org.setGlobalState')
export class SetGlobalStateCommand extends ContextCommandBase {

    constructor(context: vscode.ExtensionContext) {
        super(context);
    }

    public async execute(): Promise<void> {
        await this.context.globalState.update("now", new Date());
    }
}
```

### Explicitly Executing A Command

You can use the static `commandId` property to avoid using magic strings when explicitly calling `vscode.commands.executeCommand`.

#### `src/explicit-call-command.ts`

```ts
import * as vscode from 'vscode';
import { CommandBase, commandId } from '@revrenlove/easy-vscode-commands';
import { HelloWorldCommand } from './hello-world-command';

@commandId('your-org.explicitCall')
export class ExplicitCallCommand extends CommandBase {

    public async execute(): Promise<void> {
        await vscode.commands.executeCommand(HelloWorldCommand.commandId);
    }
}
```

### Register Commands

#### `src/extension.ts`

```ts
import * as vscode from 'vscode';
import { registerCommands } from '@revrenlove/easy-vscode-commands';
import { HelloWorldCommand } from './hello-world-command';
import { SetGlobalStateCommand } from './set-global-state-command';
import { ExplicitCallCommand } from './set-global-state-command';

export function activate(context: vscode.ExtensionContext) {
    //---
    registerCommands(context, [HelloWorldCommand, SetGlobalStateCommand, ExplicitCallCommand]);
    //---
}

export function deactivate() { }
```
