export class LocalStorageUtils {
    public static checkLocalStorageExistence() {
        try {
            localStorage.getItem('authToken')
        } catch (err) {
            throw new Error("You need to be in a browser")
        }
    }
}
