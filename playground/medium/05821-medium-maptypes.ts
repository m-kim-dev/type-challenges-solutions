/*
  5821 - MapTypes
  -------
  by Krzysztof "Wokay" Łokaj (@wokayme) #medium #map #object #utils

  ### Question

  Implement `MapTypes<T, R>` which will transform types in object T to different types defined by type R which has the following structure

  ```ts
  type StringToNumber = {
    mapFrom: string; // value of key which value is string
    mapTo: number; // will be transformed for number
  }
  ```

  ## Examples:

  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  MapTypes<{iWillBeANumberOneDay: string}, StringToNumber> // gives { iWillBeANumberOneDay: number; }
  ```

  Be aware that user can provide a union of types:
  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  type StringToDate = { mapFrom: string; mapTo: Date;}
  MapTypes<{iWillBeNumberOrDate: string}, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }
  ```

  If the type doesn't exist in our map, leave it as it was:
  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  MapTypes<{iWillBeANumberOneDay: string, iWillStayTheSame: Function}, StringToNumber> // // gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }
  ```

  > View on GitHub: https://tsch.js.org/5821
*/

/* _____________ Your Code Here _____________ */

//type MapTypes<T, R> = any

// independently written 
type MapTypesAux<T extends {[key: string]: any}, R> = 
  R extends infer A
  ? A extends {mapFrom: any, mapTo: any}
    ? {[K in keyof T]: A['mapFrom'] extends T[K] ? A['mapTo'] : T[K]}
    : never
  : never;

type ExcludeOriginal<T extends {[key: string]: any}, U extends {[key: string]: any}> = 
  {[K in keyof T]: K extends keyof U 
    ? Equal<T[K],U[K]> extends true
      ? T[K]
      : Exclude<T[K],U[K]>
    : never}

type MapTypes<T extends {[key: string]: any}, R> = ExcludeOriginal<Omit<MapTypesAux<T,R>,never>,T>;

// refactored with AI assistance (ChatGPT)
//type MapTypes<T, R> = {
//  [K in keyof T]: R extends { mapFrom: infer From; mapTo: infer To }
//    ? [T[K]] extends [From]
//      ? To
//      : never
//    : never
//} extends infer Mapped
//  ? {
//      [K in keyof Mapped]:
//        // If multiple mapFrom matched, Mapped[K] is a union of To's
//        [Mapped[K]] extends [never] 
//          ?  K extends keyof T ? T[K]  : never
//          : Mapped[K]
//    }
//  : never;


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
Expect<Equal<MapTypes<{ stringToArray: string }, { mapFrom: string, mapTo: [] }>, { stringToArray: [] }>>,
Expect<Equal<MapTypes<{ stringToNumber: string }, { mapFrom: string, mapTo: number }>, { stringToNumber: number }>>,
Expect<Equal<MapTypes<{ stringToNumber: string, skipParsingMe: boolean }, { mapFrom: string, mapTo: number }>, { stringToNumber: number, skipParsingMe: boolean }>>,
Expect<Equal<MapTypes<{ date: string }, { mapFrom: string, mapTo: Date } | { mapFrom: string, mapTo: null }>, { date: null | Date }>>,
Expect<Equal<MapTypes<{ date: string }, { mapFrom: string, mapTo: Date | null }>, { date: null | Date }>>,
Expect<Equal<MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>, mapTo: string[] }>, { fields: string[] }>>,
Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean, mapTo: never }>, { name: string }>>,
Expect<Equal<MapTypes<{ name: string, date: Date }, { mapFrom: string, mapTo: boolean } | { mapFrom: Date, mapTo: string }>, { name: boolean, date: string }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5821/answer
  > View solutions: https://tsch.js.org/5821/solutions
  > More Challenges: https://tsch.js.org
*/
