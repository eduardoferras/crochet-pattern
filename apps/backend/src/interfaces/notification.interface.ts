export interface INotification<T = unknown> {
	send(message: T): Promise<void>;
}
