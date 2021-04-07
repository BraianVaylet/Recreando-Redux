// Recreadno Redux

// 1. createStore
const createStore = (reducer, initialState) => {
  let state = initialState; // inicializo mi estado local
  let updater = () => {}; // mi actualizador

  // 1.a. getState (obtengo el estado)
  const getState = (_) => state;
  // 1.b. dispatch (realizo una accion)
  const dispatch = (action) => {
    state = reducer(state, action);
    updater();
  };
  // 1.c. subscribe (detecto los cambios)
  const subscribe = (listener) => {
    updater = listener;
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

// 2. reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "BURN":
      return state + action.payload;

    default:
      return state;
  }
};

// 3. Usamos nuestro Redux
// inicializamos
const store = createStore(reducer, 0);
// nos subscribimos al store
store.subscribe(
  () => (window.result.textContent = `Haz quemado ${store.getState()} calorías`)
);
// usamos un action
const burn = () =>
  store.dispatch({
    type: "BURN",
    payload: 1.42,
  });
// evento click
window.burn.addEventListener("click", burn);
