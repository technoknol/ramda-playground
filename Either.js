const moment = require('moment');
import { Either, Left, prop,  Log } from 'lib'
import { curry } from 'ramda';

const log = Log.of('either')
log.start();

const left = x => new Left(x);

const brain = Either.of('rain').map(str => `b${str}`); // Right('brain')
console.log(brain);

const leftrain = left('rain').map(str => `It's gonna ${str}, better bring your umbrella!`); // Left('rain')
console.log(leftrain);

const localhost = Either.of({ host: 'localhost', port: 80 }).map(prop('host')); // Right('localhost')
console.log(localhost)

const rolleyes = left('rolls eyes...').map(prop('host')); // Left('rolls eyes...');
console.log(rolleyes );

// getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
    const birthDate = moment(user.birthDate, 'YYYY-MM-DD');

    return birthDate.isValid() 
    ? Either.of(now.diff(birthDate, 'years'))
    : left('Birthdate could not be parsed');
})

const validAge = getAge(moment(), { birthDate: '1992-07-18'});
console.log(validAge);

const inValidAge = getAge(moment(), { birthDate: 'July 4 21'});
console.log(inValidAge);

log.end();
