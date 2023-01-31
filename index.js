import { curry, map, compose, prop }  from 'ramda'
import M  from 'ramda-fantasy';
const Maybe = M.Maybe
const Just = Maybe.Just;
const Nothing = Maybe.Nothing;
// const { compose,  curry , map } = require('ramda');

// withdraw :: Number -> Account -> Maybe(Account)
// const withdraw = curry((amount, { balance }) =>
//   Maybe.of(balance >= amount ? { balance: balance - amount } : Nothing()));

  const withdraw = curry((amount, { balance }) =>
  balance >= amount ? Maybe.of({ balance: balance - amount }) : Nothing());

// This function is hypothetical, not implemented here... nor anywhere else.
// updateLedger :: Account -> Account 
const updateLedger = account => account;

// remainingBalance :: Account -> String
// const remainingBalance = (account) => `Your balance is $${prop(`balance`)(account)}`;
const remainingBalance = ({ balance }) => `Your balance is $${balance}`;

// finishTransaction :: Account -> String
const finishTransaction = compose(remainingBalance, updateLedger);

// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(map(finishTransaction), withdraw(20));

const r = getTwenty({ balance: 200.00 });  // Just('Your balance is $180')
console.log({r});


const t = getTwenty({ balance: 0 }); // Nothing
console.log({t});;

// console.log('afasfasfa', withdraw(20)({balance: 0})) 