# @revrenlove/easy-vscode-commands

This is for developers of VSCode extensions.

If you find the `activate` method of your `extension.ts` file feeling a little cluttered, perhaps this can help.

The idea is that instead of manually registering each command of your extension, just make a new class file for each command.

## Install

`npm i @revrenlove/easy-vscode-commands`

## Requirements

Enable `experimentalDecorators`.

`tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## Basic Usage

### Declare A Command

`package.json`

```json
{
  "contributes": {
    "commands": [
      {
        "command": "your-org.howdyEarth",
        "title": "Howdy, Earth!" 
      }
    ]
  }
}
```

### Create A Command

`src/howdy-earth-command.ts`

```ts
import * as vscode from 'vscode';
import { CommandBase, commandId } from '@revrenlove/easy-vscode-commands';

@commandId('your-org.howdyEarth')
export class HowdyEarthCommand extends CommandBase {

    public execute(): void {
        vscode.window.showInformationMessage('Howdy, Earth!');
    }
}
```

### Register A Command

`src/extension.ts`

```ts
import * as vscode from 'vscode';
import { registerCommands } from '@revrenlove/easy-vscode-commands';
import { HowdyEarthCommand } from './howdy-earth-command';

export function activate(context: vscode.ExtensionContext) {
    registerCommands(context, [HowdyEarthCommand]);
}

export function deactivate() { }
```

## Extra Features

`src/fancy-command.ts`

```ts
import * as vscode from 'vscode';
import { CommandBase, commandId } from '@revrenlove/easy-vscode-commands';
import { HowdyEarthCommand } from './howdy-earth-command';

@commandId('your-org.fancy')
export class FancyCommand extends CommandBase {

    // `async`/`await` is supported
    public async execute(): Promise<void> {

        // Access `vscode.ExtensionContext` instance with `this.context`
        const extensionId = this.context.extension.id;
        await vscode.window.showInformationMessage(`Extension Id: ${extensionId}`);

        // Static `commandId` property (comes from the `commandId` decorator)
        vscode.commands.executeCommand(HowdyEarthCommand.commandId);
    }
}
```

## Dependency Injection

- Register the `vscode.ExtensionContext` instance in your container.

- Inject that into your command.

- Call `super` and pass in the `vscode.ExtensionContext` instance.
