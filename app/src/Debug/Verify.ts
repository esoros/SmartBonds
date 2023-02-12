import { assert } from "./assert"

function verify_array(obj: any, prototype: any) {
    let objtype = typeof obj
    let prototypetype = typeof prototype
    assert(objtype == "object" && prototypetype == "object", "must be objects")
    assert(Array.isArray(obj) && Array.isArray(prototype), "both items must be arrays")
    assert(prototype.length == 1, "prototype array must have one seed item")
    for (let i = 0; i < obj.length; ++i) {
        verify_internal(obj[i], prototype[0])
    }
}

function verify_object(obj: any, prototype: any) {
    let objtype = typeof obj
    let prototypetype = typeof prototype
    assert(objtype == "object" && prototypetype == "object", "must be objects")
    assert(!Array.isArray(obj) && !Array.isArray(prototype), "both inputs must be objects")

    Object.keys(prototype).forEach((key) => {
        let objChild = obj[key]
        if (objChild == undefined) {
            throw new Error("type mismatch foundd")
        } else {
            verify_internal(obj[key], prototype[key])
        }
    })
}

function verify_internal(obj: any, prototype: any) {
    if (obj == undefined) {
        throw new Error("obj undefined")
    }

    if (prototype == undefined) {
        throw new Error("prototupe undefined")
    }

    let objtype = typeof obj
    let prototypetype = typeof prototype

    if (objtype != prototypetype) {
        throw new Error("obj type and prototype must match")
    }

    switch (objtype) {
        case "bigint":
        case "boolean":
        case "number":
        case "string": {
            break
        }
        
        case "object": {
            if (Array.isArray(obj)) {
                verify_array(obj, prototype)
            } else {
                verify_object(obj, prototype)
            }
            break;
        }

        default:
            console.log('unsupported object', obj, objtype)
            throw new Error("unsuported object found")
    }
}

export function verify<T>(obj: any | string, prototype: T): T {
    if (typeof obj == "string") {
        obj = JSON.parse(obj)
    }
    
    verify_internal(obj, prototype)
    return obj as T
}

export async function verifyResp<T>(resp: Response, prototype: T) {
    if(resp.status >= 200 && resp.status <= 299) {
        return verify(await resp.json(), prototype)
    } else {
        throw new Error("http status indicates failure")
    }
}