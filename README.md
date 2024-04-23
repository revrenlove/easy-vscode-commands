# Easy VSCode Commands

This library/pattern helps keep the code for your commands in your VSCode extension a touch more structured and clean (hopefully).

## Installation

`npm install @revrenlove/easy-vscode-commands`

## "Tl;dr;"

### `src/hello-world.ts`

```ts
import { CommandBase, commandId } from '@revrenlove/easy-vscode-commands';

@commandId('whatever.helloWorld') // This should match the command contribute in your package.json
export class HelloWorldCommand extends CommandBase {
    
    public async execute(): Promise<void> {

        // whatever code you want to execute for your command

        // e.g.: console.log('Hello, World!!!');
    }
}
```

### `src/extension.ts`

```ts
import * as vscode from 'vscode';
import { HelloWorldCommand } from './hello-world-command';
import { registerCommands } from '@revrenlove/easy-vscode-commands';

export function activate(context: vscode.ExtensionContext) {

    // ...
    registerCommands(context, [HelloWorldCommand]);
    // ...
}

export function deactivate() { }
```

## Usage

The goal behind this package is to de-clutter the command definitions/registration in the `activate` method of your `extension.ts` file. It contains 2 abstract classes (`CommandBase`, `ContextCommandBase`) from which you can inherit to define your commands, a decorator function (`commandId`) to declare an Id, and a method to register your commands (`registerCommands`). In addition, it makes calling one command from another command a little more sane without reliance on magic strings.

### Command Classes

#### `commandId(command: string)` decorator

This is used to decorate each of your classes with an id that corresponds to the id listed in the `commands` contribution point of your `package.json`. This is equivalent to the `command` parameter of the `vscode.commands.registerCommand` method.

#### `execute` method

Each class extending the abstract classes will need to implement an `execute` method. This is equivalent `callback` parameter of the `vscode.commands.registerCommand` method.
