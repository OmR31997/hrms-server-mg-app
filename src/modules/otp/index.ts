export type SendCodeResponse = {
    sentAt: Date;
    timeout: number;
    attempt: number;
    maxAttempt: number
}