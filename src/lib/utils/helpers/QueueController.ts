type Resolve = (_: Promise<any>) => any
type Reject = () => void
type Callback = () => Promise<any>

export default class QueueController {
  queue: Map<string, Promise<any>> = new Map
  //
  private addQueueItem(key: string, cb: Callback, resolve: Resolve, reject: Reject) {
    this.queue
        .set(key, cb())
        .get(key)!.then(resolve).catch(reject).finally(() => {
          this.queue.delete(key)
        })
  }

  process(key: string, cb: Callback) {
    return new Promise((resolve, reject) => {
      const queueItem = this.queue.get(key)
      if (queueItem) {
        return resolve(queueItem)
      }

      this.addQueueItem(key, cb, resolve, reject)
    })
  }
}
