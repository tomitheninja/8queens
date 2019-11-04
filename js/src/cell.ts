export enum State { Free, Blocked }
  
export interface CellInterface {
    change(newState: State, depth: number): void | never
    isFree: boolean
}


export class Cell implements CellInterface {
// STATE:
    private _val: State[]
    private _isFree: boolean
    public get isFree() { return this._isFree }

// PUBLIC:
    constructor(depth: number) {
        this._val = new Array(depth).fill(State.Free)
        this._isFree = true
    }

    public change(newState: State, depth: number) {
        switch (newState) {
            case State.Free:
                this._free(depth)
                break
            case State.Blocked:
                this._block(depth)
                break
            default:
                throw new Error('Please implement me')
        }
    }

// PRIVATE:
    private _block(depth: number) {
        this._val[depth] = State.Blocked
        this._isFree = false
    }

    private _free(depth: number) {
        this._val[depth] = State.Free
        this._isFree = this._val.every(x => x == State.Free)
    }
}

export class Cell2_8 implements CellInterface {  // TODO: Cell factory
    // cell 2 with size of 8
// STATE: 
    // MAX_DEPTH = 7
    private _val = 0
    public get isFree() { return this._val === 0 }
    private static readonly _DEPTH_CACHE_OF_8 = [
        /* cached values of depth */
        0b10000000, // 0
        0b01000000, // 1
        0b00100000, // 2
        0b00010000, // 3
        0b00001000, // 4
        0b00000100, // 5
        0b00000010, // 6
        0b00000001, // 7
    ]

// PUBLIC
    constructor(depth: number) {
        if (depth !== 8) {
            throw new Error('Please use the more generic Cell instead')
        }
    }

    public change(newState: State, depth: number) {
        switch (newState) {
            case State.Free:
                this._free(depth)
                break
            case State.Blocked:
                this._block(depth)
                break
            default:
                throw new Error('Please implement me')
        }
    }

// PRIVATE:
    private _free(depth: number) {
        if (!this._isDepthFree(depth)) {
            this._val -= Cell2_8._DEPTH_CACHE_OF_8[depth]
        }
    }

    private _block(depth: number) {
        if (this._isDepthFree(depth)) {
            this._val += Cell2_8._DEPTH_CACHE_OF_8[depth]
        }
    }

    private _isDepthFree(depth: number) {
        // bit at depth is 0
        const d = 7 - depth
        return ((this._val >> d) % 2) === 0
    }
}

export class Cell2 implements CellInterface {
// STATE:
    private _val = 0
    private readonly _maxDepth: number
    public get isFree () { return this._val === 0 }

// PUBLIC: 
    constructor(maxDepth: number) {
        this._maxDepth = maxDepth - 1
    }

    public change(newState: State, depth: number) {
        switch (newState) {
            case State.Free:
                this._free(depth)
                break
            case State.Blocked:
                this._block(depth)
                break
            default:
                throw new Error('Please implement me')
        }
    }

    // public toString() {
    //     let s = this.val
    //         .toString(2)
    //         .split('')
    //         .reverse()
    //         .join('')
    //     while (s.length <= this.maxDepth) s += '0'
    //     return s
    // }

// PRIVATE:
    private _block(depth: number) {
        if (this._isDepthFree(depth)) {
            this._val += this._toDepth(depth)
        }
    }

    private _free(depth: number) {
        if (!this._isDepthFree(depth)) {
            this._val -= this._toDepth(depth)
        }
    }

    private _toDepth(depth: number) {
        return 2 ** (this._maxDepth - depth)
    }

    private _isDepthFree(depth: number) {
        const d = this._maxDepth - depth
        return ((this._val >> d) % 2) === 0
    }
}

export default Cell2_8
