/*
import { pipeline } from "./utils"

interface Some<A> {
  readonly _tag: "Some"
  readonly value: A
}

interface None {
  readonly _tag: "None"
}

type TOption<A> = Some<A> | None

const createSome = <A>(x: A): Some<A> => ({
  _tag: "Some",
  value: x,
})

const createNone = (): None => ({
  _tag: "None",
})

const isNullOrUndefiend = (x: unknown): boolean => x === null || x === undefined

const isSome = <A>(x: TOption<A>): x is Some<A> => x._tag === "Some"

const getOption = <T>(x: T): TOption<T> => (isNullOrUndefiend(x) ? createNone() : createSome(x))

const optionFold = <A, B>(oa: TOption<A>, onNone: () => B, onSome: (a: A) => B): B =>
  isSome(oa) ? onSome(oa.value) : onNone()

const getOrElse = <A, B>(x: TOption<A>, d: B) => (isSome(x) ? x.value : d)

const optionMap = <A, B>(oa: TOption<A>, f: (a: A) => B): TOption<B> => (isSome(oa) ? createSome(f(oa.value)) : createNone())

// chain?

/*
const optionPipeline = <A>(oa: TOption<A>, ...fns: ((oa: TOption<A>) => TOption<A>)[]): TOption<A> =>
  fns.reduce((acc, fn) => fn(acc), oa)


  //////////////////////////////////////////////////////////////
  class
  /////////////////////////////////////////
  import { pipeline } from "./utils"

interface Some<A> {
  readonly _tag: "Some"
  readonly value: A
}

interface None {
  readonly _tag: "None"
}

const createSome = <A>(x: A): Some<A> => ({
  _tag: "Some",
  value: x,
})

const createNone = (): None => ({
  _tag: "None",
})

const isNullOrUndefiend = (x: unknown): boolean => x === null || x === undefined

const isSome = <A>(x: TOption<A>): x is Some<A> => x._tag === "Some"
type TOption<A> = Some<A> | None

const optionFold = <A, B>(oa: TOption<A>, onNone: () => B, onSome: (a: A) => B): B =>
  isSome(oa) ? onSome(oa.value) : onNone()

const optionMap = <A, B>(oa: TOption<A>, f: (a: A) => B): TOption<B> => (isSome(oa) ? createSome(f(oa.value)) : createNone())

const optionFlatMap = <A, B>(oa: TOption<A>, fn: (a: A) => TOption<B>): TOption<B> => {
  return isSome(oa) ? fn(oa.value) : createNone()
}

const getOption = <T>(x: T): TOption<T> => (isNullOrUndefiend(x) ? createNone() : createSome(x))

const getOrElse = <A, B>(x: TOption<A>, d: B) => (isSome(x) ? x.value : d)

class Option<A> {
  private constructor(private readonly oa: TOption<A>) {}

  static of<A>(value: A): Option<A> {
    const oa = getOption(value)
    return new Option(oa)
  }

  static some<A>(a: A): Option<A> {
    return new Option(createSome(a))
  }

  static none<A>(): Option<A> {
    return new Option(createNone())
  }

  getOrElse<B extends A>(d: B): A | B {
    return getOrElse(this.oa, d)
  }

  flatMap<B>(f: (a: A) => Option<B>): Option<B> {
    return new Option(optionFlatMap(this.oa, (a) => f(a).oa))
  }

  map<B>(f: (a: A) => B): Option<B> {
    return new Option(optionMap(this.oa, f))
  }

  fold<B>(onNone: () => B, onSome: (a: A) => B): B {
    return optionFold(this.oa, onNone, onSome)
  }
}

const maybeS = (): string | null => "hello"
const maybeS2 = (): string | null => null

const om1 = Option.of(maybeS()).fold(
  () => "none",
  (x) => x
)
const om2 = Option.of(maybeS2())

const d1 = getOption(maybeS())
console.log(d1)

const d = getOrElse(d1, "hej")

console.log(d)

// chain?

/*
const optionPipeline = <A>(oa: TOption<A>, ...fns: ((oa: TOption<A>) => TOption<A>)[]): TOption<A> =>
  fns.reduce((acc, fn) => fn(acc), oa)

*/
