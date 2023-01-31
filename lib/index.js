// compose :: ((y -> z), (x -> y),  ..., (a -> b)) -> a -> z
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry(fn) {
    const arity = fn.length;

    return function $curry(...args) {
        if (args.length < arity) {
            return $curry.bind(null, ...args);
        }

        return fn.call(null, ...args);
    };
}

// prop :: String -> Object -> a
const prop = curry((p, obj) => obj[p]);

// class Either {
//     constructor(x) {
//       this.$value = x;
//     }

//     // ----- Pointed (Either a)
//     static of(x) {
//       return new Right(x);
//     }
//   }


//   class Left extends Either {
//     get isLeft() {
//       return true;
//     }

//     get isRight() {
//       return false;
//     }

//     static of(x) {
//       throw new Error('`of` called on class Left (value) instead of Either (type)');
//     }

//     // ----- Functor (Either a)
//     map() {
//       return this;
//     }

//     // ----- Applicative (Either a)
//     ap() {
//       return this;
//     }

//     // ----- Monad (Either a)
//     chain() {
//       return this;
//     }

//     join() {
//       return this;
//     }

//     // ----- Traversable (Either a)
//     sequence(of) {
//       return of(this);
//     }

//     traverse(of, fn) {
//       return of(this);
//     }
//   }

//   class Right extends Either {
//     get isLeft() {
//       return false;
//     }

//     get isRight() {
//       return true;
//     }

//     static of(x) {
//       throw new Error('`of` called on class Right (value) instead of Either (type)');
//     }


//     // ----- Functor (Either a)
//     map(fn) {
//       return Either.of(fn(this.$value));
//     }

//     // ----- Applicative (Either a)
//     ap(f) {
//       return f.map(this.$value);
//     }

//     // ----- Monad (Either a)
//     chain(fn) {
//       return fn(this.$value);
//     }

//     join() {
//       return this.$value;
//     }

//     // ----- Traversable (Either a)
//     sequence(of) {
//       return this.traverse(of, identity);
//     }

//     traverse(of, fn) {
//       fn(this.$value).map(Either.of);
//     }
//   }


//   Either.of('rain').map(str => `b${str}`); 
// // Right('brain')

// left('rain').map(str => `It's gonna ${str}, better bring your umbrella!`); 
// // Left('rain')

// Either.of({ host: 'localhost', port: 80 }).map(prop('host'));
// // Right('localhost')

// left('rolls eyes...').map(prop('host'));
// // Left('rolls eyes...')










class Log {
    static of(x) {
        return new Log(x);
    }

    start() {
        console.log(`---------------  ${this.$value.toUpperCase()}::START  ---------------`);
        return null;
    }

    end() {
        console.log(`---------------  ${this.$value.toUpperCase()}::END  ---------------`);
        return null; 
    }

    constructor(x) {
        this.$value = x;
    }
}

class Either {
    static of(x) {
        return new Right(x);
    }

    constructor(x) {
        this.$value = x;
    }
}

class Left extends Either {
    map(f) {
        return this;
    }

    inspect() {
        return `Left(${inspect(this.$value)})`;
    }
}

class Right extends Either {
    map(f) {
        return Either.of(f(this.$value));
    }

    inspect() {
        return `Right(${inspect(this.$value)})`;
    }
}

export {
    Either, Left, Right, curry, compose, prop, Log
}