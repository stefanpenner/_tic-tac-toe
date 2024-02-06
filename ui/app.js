// Import React and ReactDOM from a CDN
import { createElement } from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const span = (...args) => createElement('span', ...args)
const div = (...args) => createElement('div', ...args)
const h1 = (...args) => createElement('h1', ...args)

const Title = h1(null, 'Tic Tac Toe');

const STATES = Object.freeze({
  empty: null,
  X: 'X',
  O: 'O'
});

function cell(own, gameState) {
  const attributes = {
      className: ['cell', own.state !== null && 'clicked', own.state].filter(Boolean).join(' '),
  }

  if (own.state === STATES.empty) {
    attributes.onClick = () => {
      own.state = gameState.nextState;
      gameState.endTurn();
    };
  }

  return div(attributes, own.state);
}

function Board(gameState) {
  const cells = [];

  for (const current of gameState.cells) {
    cells.push(cell(current, gameState));
  }

  return div(
    { className: "board" },
    ...cells
  );
}


function App(gameState) {
  return div(
    null,
    Title,
    Board(gameState)
  );
}

function render(gameState) {
  root.render(App(gameState));
}

// setup the world
render({
  endTurn() {
    this.nextState = this.nextState === STATES.X ? STATES.O: STATES.X;
    // check for winner
    render(this);
  },

  nextState: 'X',
  cells: new Array(9).fill(null).map((value, index) => {
    return {
      index,
      state: value
    }
  })
})
