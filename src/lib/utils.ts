export function debounce(func: Function, wait: number): Function {
    let timeout: number | null = null;
    return function (...args: any[]) {
        // @ts-ignore
        const context = this; 
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(context, args);
            timeout = null;
        }, wait);
    };
}
