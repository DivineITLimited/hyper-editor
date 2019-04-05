import {default as deepMerge} from 'deepmerge'

let UIID = 0

export function uniqueId (prefix) {
    UIID = UIID + 1
    return prefix + UIID
}
export function has(obj, key) {
    if (obj && obj.hasOwnProperty(key)) return true
    return false
}

export function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function isFunction(v){
    if (v instanceof Function) {
        return true;
    }
    return false;
}

export function merge(objA, objB) {
    return deepMerge(objA, objB)
}

export function assign(objA, objB) {
    return Object.assign({}, objA, objB)
}

export function unique_id(prefix = 'i') {
    return uniqueId(prefix + Math.ceil(new Date().getTime() / 1000) + '_')
}

export function recursivelyFindByID(obj, id) {
    if (obj instanceof Array) {
        let toReturn = null
        for(let i = 0; i<obj.length; i++) {

            toReturn = recursivelyFindByID(obj[i], id)

            if (toReturn != null) {
                return toReturn
            }
        }
    } else if (obj instanceof Object) {
        if (obj.hasOwnProperty('id') && obj.id == id) {
            return obj
        }

        if (obj.hasOwnProperty('children')) {
            return recursivelyFindByID(obj.children, id)
        }

        return null
    }
    return null
}

export function recursivelyDeleteByID(obj, id) {
    if (obj instanceof Array) {
        let found = null
        for(let i = 0; i<obj.length; i++) {
            if(obj[i].id == id) {
                found = i
                continue
            } else {
                recursivelyDeleteByID(obj[i], id)
            }
        }
        if (found != null) {
            obj.splice(found, 1);
        }
    } else if (obj instanceof Object) {
        if (obj.hasOwnProperty('children')) {
            recursivelyDeleteByID(obj.children, id)
        }
    }
}

function recursivelyRenewID(obj) {
    if (obj instanceof Array) {
        for (let i = 0; i<obj.length; i++) {
            recursivelyRenewID(obj[i])
        }
    } else if (obj instanceof Object) {
        obj.id = unique_id()
        if(has(obj, 'children')) {
            recursivelyRenewID(obj.children)
        }
    }
}

export function recursivelyCloneByID(obj, id) {
    if (obj instanceof Array) {
        let found = null
        for(let i = 0; i<obj.length; i++) {
            if(obj[i].id == id) {
                found = i
                continue
            } else {
                recursivelyCloneByID(obj[i], id)
            }
        }
        if (found != null) {
            let new_obj = cloneDeep(obj[found])
            recursivelyRenewID(new_obj)
            if (obj.length-1 == found) {
                obj.push(new_obj)
            } else {
                obj.splice(found+1, 0, new_obj)
            }
        }
    } else if (obj instanceof Object) {
        if (obj.hasOwnProperty('children')) {
            recursivelyCloneByID(obj.children, id)
        }
    }
}


