export function waiting (time:number) {
    return new Promise((resolve) => setTimeout(resolve, time))
}