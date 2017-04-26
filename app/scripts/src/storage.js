class Store {
    constructor(storageApi) {
        this.api = storageApi;
    }

    get() {
        return this.api.getItem(this.key);
    }

    set(value) {
        this.api.setItem(this.key, value);
    }
}

export class UserStore extends Store {
    constructor(key) {
        // super invokes Store's constructor
        super(sessionStorage);
        this.key = key;
    }
}
