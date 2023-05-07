import { isNullOrUndefiend } from "./utils"

export interface Some<A> {
  readonly _tag: "Some"
  readonly value: A
}

export interface None {
  readonly _tag: "None"
}

export type Option<A> = Some<A> | None

export const some = <A>(x: A): Option<A> => ({
  _tag: "Some",
  value: x,
})

export const none: Option<never> = {
  _tag: "None",
}

export const isSome = <A>(x: Option<A>): x is Some<A> => x._tag === "Some"

export const getOption = <A>(a: A): Option<NonNullable<A>> => (isNullOrUndefiend(a) ? none : some(a as NonNullable<A>))

export const optionFold = <A, B>(oa: Option<A>, onNone: () => B, onSome: (a: A) => A | B): A | B =>
  isSome(oa) ? onSome(oa.value) : onNone()

export const getOptionOrElse = <A, B>(x: Option<A>, e: B) => (isSome(x) ? x.value : e)

export function optionMap<A, B>(oa: Option<A>, f: (a: A) => B): Option<B>
export function optionMap<A, B, C>(oa: Option<A>, f: (a: A) => B, g: (b: B) => C): Option<C>
export function optionMap<A, B, C, D>(oa: Option<A>, f: (a: A) => B, g: (b: B) => C, h: (c: C) => D): Option<D>
export function optionMap<A, B, C, D, E>(
  oa: Option<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E
): Option<E>
export function optionMap<A, B, C, D, E, F>(
  oa: Option<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
  j: (e: E) => F
): Option<F>
export function optionMap<A, B, C, D, E, F, G>(
  oa: Option<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
  j: (e: E) => F,
  k: (f: F) => G
): Option<G>
export function optionMap<A, B, C, D, E, F, G, H>(
  oa: Option<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
  j: (e: E) => F,
  k: (f: F) => G,
  l: (g: G) => H
): Option<H>
export function optionMap<A, B, C, D, E, F, G, H, I>(
  oa: Option<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
  j: (e: E) => F,
  k: (f: F) => G,
  l: (g: G) => H,
  m: (h: H) => I
): Option<I>
export function optionMap<A, B, C, D, E, F, G, H, I, J>(
  oa: Option<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
  j: (e: E) => F,
  k: (f: F) => G,
  l: (g: G) => H,
  m: (h: H) => I,
  n: (i: I) => J
): Option<J>
export function optionMap(oa: Option<unknown>, ...fns: ((a: unknown) => unknown)[]): Option<unknown> {
  return fns.reduce((acc: Option<unknown>, fn) => {
    if (isSome(acc)) {
      const result = fn(acc.value)
      if (isNullOrUndefiend(result)) {
        return none
      }
      return some(result)
    }
    return none
  }, oa)
}
