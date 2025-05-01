import { makeAutoObservable } from 'mobx';

class UserStore {
    private loggeidIn = false;
    private loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    getLogin = async () => {
        this.setLoading(true);
        try {
        } catch (error) {
            console.error('Error fetching login status:', error);
        } finally {
            this.setLoading(false);
        }
    };

    setLogin = (loggeidIn: boolean) => {
        this.loggeidIn = loggeidIn;
    };

    setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    get isLoading() {
        return this.loading;
    }
    get isLoggedIn() {
        return this.loggeidIn;
    }
}

export default UserStore;
