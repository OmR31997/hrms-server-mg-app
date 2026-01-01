import crypto from "crypto";

export const generateRefreshToken = ():string =>{
    return crypto.randomBytes(64).toString("hex");   
}

export const cryptoHash = (token: string): string => {
    return crypto.createHash("sha256").update(token).digest("hex");
}

export const addDays = (days: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}