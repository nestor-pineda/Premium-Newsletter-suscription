export declare class CreateUserCommand {
    readonly email: string;
    readonly password: string;
    readonly name?: string | undefined;
    constructor(email: string, password: string, name?: string | undefined);
}
