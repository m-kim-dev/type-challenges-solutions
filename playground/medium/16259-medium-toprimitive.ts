/*
  16259 - ToPrimitive
  -------
  by 前端子鱼 (@mwc) #medium

  ### Question

  Convert a property of type literal (label type) to a primitive type.

  For example

  ```typescript
  type X = {
    name: 'Tom',
    age: 30,
    married: false,
    addr: {
      home: '123456',
      phone: '13111111111'
    }
  }

  type Expected = {
    name: string,
    age: number,
    married: boolean,
    addr: {
      home: string,
      phone: string
    }
  }
  type Todo = ToPrimitive<X> // should be same as `Expected`
  ```

  > View on GitHub: https://tsch.js.org/16259
*/

/* _____________ Your Code Here _____________ */

// my solution
type ToPrimitive<T> = 
  T extends number  //case: number
  ? number
  : T extends string //case: string
    ? string
    : T extends boolean //case: boolean
      ? boolean
      : T extends Function // case: function
          ? Function
          : T extends {[key: string]: unknown}  //case: object
            ? {[K in keyof T]: ToPrimitive<T[K]>}
            : T extends [] // case: array
              ? []
              : T extends [infer F, ... infer R]  //case: non readonly array
                ? ToPrimitive<R> extends unknown[]
                  ? [ToPrimitive<F>, ... ToPrimitive<R>]
                  : never
                : T extends readonly [infer F, ... infer R] //case: readonly array
                  ? ToPrimitive<R> extends unknown[]
                    ? readonly [ToPrimitive<F>, ... ToPrimitive<R>]
                    : never
                  : never;

// ONLINE SOLUTION
// Lesson: the valueOf property of fundamental types 
//type ToPrimitive<T> = T extends object ? (
//  T extends (...args: never[]) => unknown ? Function : {
//    [Key in keyof T]: ToPrimitive<T[Key]>
//  }
//) : (
//  T extends { valueOf: () => infer P } ? P : T
//)

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/16259/answer
  > View solutions: https://tsch.js.org/16259/solutions
  > More Challenges: https://tsch.js.org
*/
