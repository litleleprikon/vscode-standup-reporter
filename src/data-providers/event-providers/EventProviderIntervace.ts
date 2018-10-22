export interface IEventProvider {
    getEvents(): Promise<string[]>;
    getProviderName(): string;
}
