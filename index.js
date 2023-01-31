import { curry, map, compose, prop }  from 'ramda'
import M  from 'ramda-fantasy';
const Maybe = M.Maybe
const Just = Maybe.Just;
const Nothing = Maybe.Nothing;
// const { compose,  curry , map } = require('ramda');

// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((amount, { balance }) =>
  Maybe.of(balance >= amount ? { balance: balance - amount } : null));

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

const r = getTwenty({ balance: 200.00 }); 
console.log({r});
// Just('Your balance is $180')

const t = getTwenty({ balance: 10.00 });
console.log({t});
// Nothing