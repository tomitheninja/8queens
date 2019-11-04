"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State;
(function (State) {
    State[State["Free"] = 0] = "Free";
    State[State["Blocked"] = 1] = "Blocked";
})(State = exports.State || (exports.State = {}));
class Cell {
    get isFree() { return this._isFree; }
    // PUBLIC:
    constructor(depth) {
        this._val = new Array(depth).fill(State.Free);
        this._isFree = true;
    }
    change(newState, depth) {
        switch (newState) {
            case State.Free:
                this._free(depth);
                break;
            case State.Blocked:
                this._block(depth);
                break;
            default:
                throw new Error('Please implement me');
        }
    }
    // PRIVATE:
    _block(depth) {
        this._val[depth] = State.Blocked;
        this._isFree = false;
    }
    _free(depth) {
        this._val[depth] = State.Free;
        this._isFree = this._val.every(x => x == State.Free);
    }
}
exports.Cell = Cell;
class Cell2_8 {
    // PUBLIC
    constructor(depth) {
        // cell 2 with size of 8
        // STATE: 
        // MAX_DEPTH = 7
        this._val = 0;
        if (depth !== 8) {
            throw new Error('Please use the more generic Cell instead');
        }
    }
    get isFree() { return this._val === 0; }
    change(newState, depth) {
        switch (newState) {
            case State.Free:
                this._free(depth);
                break;
            case State.Blocked:
                this._block(depth);
                break;
            default:
                throw new Error('Please implement me');
        }
    }
    // PRIVATE:
    _free(depth) {
        if (!this._isDepthFree(depth)) {
            this._val -= Cell2_8._DEPTH_CACHE_OF_8[depth];
        }
    }
    _block(depth) {
        if (this._isDepthFree(depth)) {
            this._val += Cell2_8._DEPTH_CACHE_OF_8[depth];
        }
    }
    _isDepthFree(depth) {
        // bit at depth is 0
        const d = 7 - depth;
        return ((this._val >> d) % 2) === 0;
    }
}
Cell2_8._DEPTH_CACHE_OF_8 = [
    /* cached values of depth */
    0b10000000,
    0b01000000,
    0b00100000,
    0b00010000,
    0b00001000,
    0b00000100,
    0b00000010,
    0b00000001,
];
exports.Cell2_8 = Cell2_8;
class Cell2 {
    // PUBLIC: 
    constructor(maxDepth) {
        // STATE:
        this._val = 0;
        this._maxDepth = maxDepth - 1;
    }
    get isFree() { return this._val === 0; }
    change(newState, depth) {
        switch (newState) {
            case State.Free:
                this._free(depth);
                break;
            case State.Blocked:
                this._block(depth);
                break;
            default:
                throw new Error('Please implement me');
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
    _block(depth) {
        if (this._isDepthFree(depth)) {
            this._val += this._toDepth(depth);
        }
    }
    _free(depth) {
        if (!this._isDepthFree(depth)) {
            this._val -= this._toDepth(depth);
        }
    }
    _toDepth(depth) {
        return 2 ** (this._maxDepth - depth);
    }
    _isDepthFree(depth) {
        const d = this._maxDepth - depth;
        return ((this._val >> d) % 2) === 0;
    }
}
exports.Cell2 = Cell2;
exports.default = Cell2_8;
