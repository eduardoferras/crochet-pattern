export type EmailPayload = {
	to: string | string[];
	cc?: string | string[];
	bcc?: string | string[];
	from?: string;
	subject: string;
	text?: string;
	body: string;
	attachments?: EmailAttachment[];
};

export type EmailAttachment = {
	filename: string;
	content: string | Buffer;
	contentType?: string;
};
