export const useLocalStorage = (key) => {
    const setItem = (value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    return { setItem };
}