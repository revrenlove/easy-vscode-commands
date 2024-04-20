export abstract class CommandBase {
    public abstract execute(...args: any[]): Promise<void>;

    public static commandId: string;
}
