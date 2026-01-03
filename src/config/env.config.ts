export const ENV = {
    get IS_PROD() {
        return process.env.NODE_ENV === "production";
    },
    get IS_DEV() {
        return process.env.NODE_ENV !== "production";
    }
}