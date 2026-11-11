// Exercise 2: Observer pattern store
const createStore = (initialState) => {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => state,

        setState: (updates) => {
            state = { ...state, ...updates };
            listeners.forEach((listener) => listener(state));
        },

        subscribe: (listener) => {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            };
        },
    };
};

const store = createStore({ count: 0 });

const unsubscribe = store.subscribe((state) => {
    console.log("State changed:", state);
});

store.setState({ count: 1 });
store.setState({ count: 2 });

unsubscribe();
store.setState({ count: 3 });
console.log("Final state:", store.getState());
