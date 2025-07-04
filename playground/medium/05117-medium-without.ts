/*
  5117 - Without
  -------
  by Pineapple (@Pineapple0919) #medium #union #array

  ### Question

  Implement the type version of Lodash.without, Without<T, U> takes an Array T, number or array U and returns an Array without the elements of U.

  ```ts
  type Res = Without<[1, 2], 1>; // expected to be [2]
  type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
  type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
  ```

  > View on GitHub: https://tsch.js.org/5117
*/

/* _____________ Your Code Here _____________ */

//written independently
type TupleToUnion<T extends any[]> = T[number];

type Without<T, U, Acc extends any[]=[]> = 
  T extends [infer F, ...infer R]
  ? U extends any[]
    ? F extends TupleToUnion<U>
      ? Without<R,U,Acc>
      : Without<R,U,[...Acc,F]>
    : F extends U
      ? Without<R,U,Acc>
      : Without<R,U,[...Acc,F]>
  : Acc;

//refactored using AI (chatGPT)
//type Without<T extends any[], U> = 
//  T extends [infer F, ...infer R]
//    ? F extends (U extends any[] ? TupleToUnion<U> : U)
//      ? Without<R, U>
//      : [F, ...Without<R, U>]
//    : [];


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5117/answer
  > View solutions: https://tsch.js.org/5117/solutions
  > More Challenges: https://tsch.js.org
*/
