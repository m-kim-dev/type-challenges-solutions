/*
  4518 - Fill
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  `Fill`, a common JavaScript function, now let us implement it with types.
  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.

  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)

  > View on GitHub: https://tsch.js.org/4518
*/

/* _____________ Your Code Here _____________ */

type ConcatSingle<T extends string,S>= S extends string ? `${T}${S}` : never;
type ConcatMulti<T extends string,S>= T extends `${infer Head}${infer Tail}`
  ? ConcatSingle<Head,S> | ConcatMulti<Tail,S>
  : never;
type ConcatLessThan<T extends string,S>= '0123456789' extends `${infer A}${T}${infer _}`
  ? ConcatMulti<A,S>
  : never;

type Nines<S extends string> = S extends `${infer _}${infer B}`
  ? `9${Nines<B>}`
  : '';

type NumberRangeOndeSide<Hi extends number | string> = 
  `${Hi}` extends `${infer A}${infer B}`
  ? ConcatLessThan<A,NumberRangeOndeSide<Nines<B>>> | ConcatSingle<A,NumberRangeOndeSide<B>>
  : ''

type NumberRangeTwoSides<Lo extends number | string,Hi extends number | string> = 
  Exclude<NumberRangeOndeSide<Hi>,NumberRangeOndeSide<Lo>>|`${Lo}`;

type RmZeros<T extends string> = T extends '0'
  ? '0'
  : T extends `${infer _ extends '0'}${infer B}`
    ? RmZeros<B>
    : T;

type NumberRange<Lo extends number,Hi extends number> = RmZeros<NumberRangeTwoSides<Lo,Hi>> extends `${infer N extends number}`
  ? N
  : never;
//END: NumberRange

type A1 = [1,2,3,4,5];
type Res = Exclude<NumberRange<30,30>,3>;
type F1<T extends any[], N extends number, Acc extends any[]=[]> = 
  T extends [infer F, ...infer R]
  ? Acc['length'] extends Res
    ? F1<R,N,[...Acc,N]>
    : F1<R,N,[...Acc,F]>
  : Acc;
type Res2 = F1<A1,0>;

//type Fill<
//  T extends unknown[],
//  N,
//  Start extends number = 0,
//  End extends number = T['length'],
//> = any
type Fill<T extends any[], N extends number, Start extends number =0, End extends number = T['length'],Acc extends any[]=[], Range=Exclude<NumberRange<Start,End>,End>> = 
  T extends [infer F, ...infer R]
  ? Acc['length'] extends Range
    ? F1<R,N,[...Acc,N]>
    : F1<R,N,[...Acc,F]>
  : Acc;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4518/answer
  > View solutions: https://tsch.js.org/4518/solutions
  > More Challenges: https://tsch.js.org
*/
