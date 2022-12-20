/*
  Реализуйте функцию createStore, которая возвращает объект store.
  createStore должна принимать на вход reducer и initialState.
  В store должна быть функция subscribe, подписывающая на себя переданного в неё listener.
  При обновлении данных в store, он (store) должен уведомить об обновлении всех listeners.
  В приложении есть 2 "компонента", каждый подписывается на обновления в store.
  Они отображают содержимое стора и кнопки.
  Нажатие на кнопку increment/decrement изменяет состояние стора, соответственно UI должен обновиться.
  При нажатии кнопки unsubscribe в одном из компонентов должен отписаться только этот компонент.
  То есть второй компонент при этом сохраняет свою возможность получать обновления из стора.
*/

export function createStore(reducer, state) {
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener(state));
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners.splice(listeners.indexOf(listener), 1);
        };
    };

    dispatch({});

    return { getState, dispatch, subscribe };
}
