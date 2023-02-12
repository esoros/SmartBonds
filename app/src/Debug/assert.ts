export function assert(b: boolean, message: string) {
    if (!b) {
        throw new Error(message)
    }
}
