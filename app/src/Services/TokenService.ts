export type Token = {
    name: string
    address: string
    color: string
}

export default class TokenService {
    private _isFrozen = false
    private _tokens : Array<Token> = []

    AddToken(token: Token) {
        this._tokens.push(token)
    }
    
    Freeze() {
        if(this._tokens.length == 0) {
            throw new Error("please configure tokens before freezing")
        }
        this._isFrozen = true
    }
    
    GetDefaultToken() {
        if(!this._isFrozen) {
            throw new Error("token service must be frozen")
        }
        return this._tokens[0];
    }

    GetTokens() {
        if(!this._isFrozen) {
            throw new Error("token service must be frozen")
        }
        return [...this._tokens]
    }
}