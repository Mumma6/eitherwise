interface Task<A> {
  run(): Promise<A>
  map<B>(f: (a: A) => B): Task<B>
  chain<B>(f: (a: A) => Task<B>): Task<B>
  catchError(f: (e: unknown) => Task<A>): Task<A>
  fold<B>(onFailure: (e: unknown) => B, onSuccess: (a: A) => B): Promise<B>
}

const createTask = <A>(p: () => Promise<A>): Task<A> => ({
  run: p,
  map: function <B>(f: (a: A) => B): Task<B> {
    return createTask(async () => {
      const a = await this.run()
      return f(a)
    })
  },
  chain: function <B>(f: (a: A) => Task<B>): Task<B> {
    return createTask(async () => {
      const a = await this.run()
      return f(a).run()
    })
  },
  catchError: function (f: (e: unknown) => Task<A>): Task<A> {
    return createTask(async () => {
      try {
        return await this.run()
      } catch (e) {
        return f(e).run()
      }
    })
  },
  fold: function <B>(onFailure: (e: unknown) => B, onSuccess: (a: A) => B): Promise<B> {
    return this.run().then(onSuccess).catch(onFailure)
  },
})

const task = createTask<string>(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")
  const json = await response.json()
  return json.title
})

task
  .map((title) => title.toUpperCase())
  .fold(
    (e) => console.error("Error: ", e),
    (title) => console.log("Title: ", title)
  )

console.log(task)
