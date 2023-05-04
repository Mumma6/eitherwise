import { isNullOrUndefiend } from "./utils"

export interface Some<A> {
  readonly _tag: "Some"
  readonly value: A
}

export interface None {
  readonly _tag: "None"
}

export type TOption<A> = Some<A> | None

export const some = <A>(x: A): TOption<A> => ({
  _tag: "Some",
  value: x,
})

export const none: TOption<never> = {
  _tag: "None",
}

const isSome = <A>(x: TOption<A>): x is Some<A> => x._tag === "Some"

export const getOption = <A>(a: A): TOption<NonNullable<A>> => (isNullOrUndefiend(a) ? none : some(a as NonNullable<A>))

export const optionFold = <A, B>(oa: TOption<A>, onNone: () => B, onSome: (a: A) => B): B =>
  isSome(oa) ? onSome(oa.value) : onNone()

export const getOptionOrElse = <A, B>(x: TOption<A>, e: B) => (isSome(x) ? x.value : e)

export function optionMap<A, B>(oa: TOption<A>, f: (a: A) => B): TOption<B>
export function optionMap<A, B, C>(oa: TOption<A>, f: (a: A) => B, g: (b: B) => C): TOption<C>
export function optionMap<A, B, C, D>(oa: TOption<A>, f: (a: A) => B, g: (b: B) => C, h: (c: C) => D): TOption<D>
export function optionMap<A, B, C, D, E>(
  oa: TOption<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E
): TOption<E>
export function optionMap<A, B, C, D, E, F>(
  oa: TOption<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
  j: (e: E) => F
): TOption<F>
export function optionMap<A, B, C, D, E, F, G>(
  oa: TOption<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
  j: (e: E) => F,
  k: (f: F) => G
): TOption<G>
export function optionMap<A, B, C, D, E, F, G, H>(
  oa: TOption<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
  j: (e: E) => F,
  k: (f: F) => G,
  l: (g: G) => H
): TOption<H>
export function optionMap<A, B, C, D, E, F, G, H, I>(
  oa: TOption<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
  j: (e: E) => F,
  k: (f: F) => G,
  l: (g: G) => H,
  m: (h: H) => I
): TOption<I>
export function optionMap<A, B, C, D, E, F, G, H, I, J>(
  oa: TOption<A>,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
  j: (e: E) => F,
  k: (f: F) => G,
  l: (g: G) => H,
  m: (h: H) => I,
  n: (i: I) => J
): TOption<J>
export function optionMap(oa: TOption<unknown>, ...fns: ((a: unknown) => unknown)[]): TOption<unknown> {
  return fns.reduce((acc: TOption<unknown>, fn) => {
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
