export type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never
export type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never
export type PromiseType<T extends Promise<any>> = T extends Promise<infer R> ? R : never