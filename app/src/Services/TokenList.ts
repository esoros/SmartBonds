export type Token = {
    name: string
    address: string
}

export default class TokenList {
    private _frozen = false
    private _tokens : Array<Token> = []

    freeze() {
        if(this._tokens.length == 0) {
            throw new Error("please add tokens before freezing")
        }
        this._frozen = true
    }

    addTokens(token: Token) {
        if(this._frozen) {
            throw new Error("unable to add token, list frozen")
        } else {
            this._tokens.push(token)
        }
    }
    
    getTokens() {
        return [...this._tokens]
    }
}