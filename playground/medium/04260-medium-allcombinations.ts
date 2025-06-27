/*
  4260 - AllCombinations
  -------
  by 蛭子屋双六 (@sugoroku-y) #medium #template-literal #infer #union

  ### Question

  Implement type ```AllCombinations<S>``` that return all combinations of strings which use characters from ```S``` at most once.

  For example:

  ```ts
  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
  ```

  > View on GitHub: https://tsch.js.org/4260
*/

/* _____________ Your Code Here _____________ */

// Original implementation — written independently
type Permutation<T extends string,U extends any[]=[T]> = 
  U[0] extends never
  ? []
  : T extends infer A 
    ? A extends string
      ? [A,...Permutation<Exclude<U[0],A>>]
      : never
    : never;

type StringToUnion<T extends string> = T extends `${infer A}${infer B}` ? A | StringToUnion<B> : never;

type AllCombinationsAux<S extends string, T extends string=StringToUnion<S>, U extends any[]=[T]> = Permutation<U[0]> | (T extends infer A ? AllCombinationsAux<Exclude<U[0],A>> : never) ;

type ArrayToString<T extends string[]> = 
  T extends [infer Head extends string, ...infer Tail extends string[]]
  ? `${Head}${ArrayToString<Tail>}`
  : '';

type AllCombinations<S extends string> = AllCombinationsAux<S> extends infer A
  ? A extends string[]
    ? ArrayToString<A>
    : never
  : never;

// Refactored after review and discussion with AI assistant (ChatGPT).
//type StringToUnion<S extends string> = 
//  S extends `${infer F}${infer R}` ? F | StringToUnion<R> : never;
//
//type Combination<T extends string, U extends string = T> =
//  [T] extends [never] ? ''
//  : T extends T ? `${T}${Combination<Exclude<U, T>>}` | Combination<Exclude<U, T>>
//  : never;
//
//type AllCombinations<S extends string> = Combination<StringToUnion<S>>;



/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4260/answer
  > View solutions: https://tsch.js.org/4260/solutions
  > More Challenges: https://tsch.js.org
*/
