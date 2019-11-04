
export interface readonlyConfig {
    readonly [key: string]: any
}

export const config: readonlyConfig = {
    numQueen: 8,
    width: 8,
    height: 8,
    queensLogLength: 3,
}

export default config
