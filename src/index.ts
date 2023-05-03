import { pipeline } from "./utils"

interface Some<A> {
  readonly _tag: "Some"
  readonly value: A
}

interface None {
  readonly _tag: "None"
}

type TOption<A> = Some<A> | None

const some = <A>(x: A): TOption<A> => ({
  _tag: "Some",
  value: x,
})

const none: TOption<never> = {
  _tag: "None",
}

const getOption = <A>(a: A): TOption<NonNullable<A>> => (a == null ? none : some(a as NonNullable<A>))

const isNullOrUndefiend = (x: unknown): boolean => x === null || x === undefined

const isSome = <A>(x: TOption<A>): x is Some<A> => x._tag === "Some"

const optionFold = <A, B>(oa: TOption<A>, onNone: () => B, onSome: (a: A) => B): B =>
  isSome(oa) ? onSome(oa.value) : onNone()

const getOrElse = <A, B>(x: TOption<A>, d: B) => (isSome(x) ? x.value : d)

const optionMap = <A, B>(oa: TOption<A>, f: (a: A) => B): TOption<B> => (isSome(oa) ? some(f(oa.value)) : none)

const num9 = 1
const opt10 = getOption(num9)
const num10 = getOrElse(
  optionMap(opt10, (num) => num * 2),
  0
)
