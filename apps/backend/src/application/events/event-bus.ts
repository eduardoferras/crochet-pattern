export interface IEventBus {
	publish(event: string, data: unknown): Promise<void>;
}
