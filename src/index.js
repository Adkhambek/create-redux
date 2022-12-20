import { store, increment, decrement } from "./store";
import { createWrappedButton, createDiv } from "./dom";

const firstComponentRoot = document.getElementById("root1");
const secondComponentRoot = document.getElementById("root2");

function firstComponentRender(unsubscribe) {
  firstComponentRoot.appendChild(createDiv(store.getState()));
  firstComponentRoot.appendChild(createWrappedButton("increment", increment));
  firstComponentRoot.appendChild(createWrappedButton("decrement", decrement));
  firstComponentRoot.appendChild(
    createWrappedButton("unsubscribe", unsubscribe)
  );
}

function secondComponentRender(unsubscribe) {
  secondComponentRoot.appendChild(createDiv(store.getState()));
  secondComponentRoot.appendChild(
    createWrappedButton("unsubscribe", unsubscribe)
  );
}

const firstComponentUnsubscribe = store.subscribe(() =>
  firstComponentRender(firstComponentUnsubscribe)
);
const secondComponentUnsubscribe = store.subscribe(() =>
  secondComponentRender(secondComponentUnsubscribe)
);

firstComponentRender(firstComponentUnsubscribe);
secondComponentRender(secondComponentUnsubscribe);
