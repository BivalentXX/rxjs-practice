// Tutorial Link = https://www.youtube.com/watch?v=2LCo926NFLI&t=314s
// Title = "RxJS Quick Start with Practical Examples" 
// Author = Fireship

// Hot vs Cold article = https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html

// Publish is deprecated = https://rxjs.dev/api/operators/publish

//https://stackoverflow.com/questions/71392565/what-is-the-replacement-for-publishreplay1-refcount-in-rxjs-version-7-4-0
//Operators publishReplay(1) + refCount() are equals to shareReplay(1)

//Stop hot Observable from sharing value after complete




/////////////////////////////////////////////////////////////////////

const { Observable, fromEvent, from, timer, of, share, connect, interval, map, tap, concatMap, take, filter } = rxjs
// const { share } = rxjs.operators

function print(val) {
  let el = document.createElement('p')
  el.innerText = val
  document.body.appendChild(el)
}


////Observable
// const observable =  new Observable( subscriber => {
//   subscriber.next('hello')
//   subscriber.next('yes')
// })
// observable.subscribe(val=>print(val))

////fromEvent
// const clicks = fromEvent(document, 'click')
// clicks.subscribe(click => console.log(click))

////from
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('resolved!')
//   }, 1000)
// })
// const obvPromise = from(promise)
// obvPromise.subscribe(result => print(result))

////timer
// const timerAlert = timer(1000, 2000)
// timerAlert.subscribe(val => print( new Date().getSeconds() ))

////of
// const mashup = of('anything', ['you', 'want'], 23, {cool: 'stuff'})
// mashup.subscribe(val=>print(val))

/* 
HOT vs COLD, Observables
COLD = data created inside
HOT = data is existing outside
*/

////cold
// const cold = Observable.create(observer => {
//   observer.next( Math.random() )
// })
// cold.subscribe(a => print(`Subscriber A: ${a}`))
// cold.subscribe(b => print(`Subscriber B: ${b}`))

////hot
// const random = Math.random()
// const hot = Observable.create(observer => {
//   observer.next( random )
// })
// hot.subscribe(a => print(`Subscriber A: ${a}`))
// hot.subscribe(b => print(`Subscriber B: ${b}`))

////share
// const observable1 = Observable.create(observer => {
//   observer.next(`I am alive.`);
//   setTimeout(() => {
//     observer.next(`I am alive again.`);
//   }, 5000);
// }).pipe(share());
// observable1.subscribe(x => console.log('a', x));
// observable1.subscribe(x => console.log('b', x));

////DOES NOT WORK because no event fire to trigger the call to the second subscriber
// const hotAlt = new Observable (observer => {
//   observer.next( Math.random() )
// }).pipe(share())
// hotAlt.subscribe(a => console.log(a))
// hotAlt.subscribe(b => console.log(b))


// const source = interval(1000)
//   .pipe(share()); 
// source.subscribe(x => console.log('subscription 1: ', x));
// source.subscribe(x => console.log('subscription 1: ', x));


////OBSERVABLES DO NOT RETURN A PROMISE ANYMORE. THEY CAN YIELD UNDEFINED
////CAN CAUSE A MEMORY LEAK IF IT DOES NOT RESOLVE
// const observable = timer(1000)
// console.log(observable.toPromise().finally(() => print('All done!')))

////interval
// const observable = interval(1000)
// const subscription = observable.subscribe(x => print(x))
// setTimeout(() => {
//   subscription.unsubscribe()
// }, 3000)

// //pipe&map need a pipe operator now
// const numbers = of(10, 100, 1000);
// console.log(numbers)
// numbers
//   .pipe(map(num => Math.log(num) ))
//   .subscribe(x => print(x))


////map used in a more practical way
// const jsonString = '{ "type":"Dog", "breed":"Pug" }'
// const apiCall = of(jsonString)
// apiCall
//   .pipe(map(json => JSON.parse(json) ) )
//   .subscribe(obj => { 
//     print(obj.type)
//     print(obj.breed)
//   })


////tap ability to create an action on the observable at a snapshot in time
// const names = of('Simon', 'Garfunkle')
// names
//   .pipe(
//     tap(name => print(name)),
//     map(name => name.toUpperCase() ),
//     tap(name => print(name))
//   )
//   .subscribe()

// //filter
// const numbers = of(-3, 5, 7, -1)
// numbers
//     .pipe(filter(n => n >= 0 ) )
//     .subscribe(n => print(n))

const { first, last, throttleTime, debounceTime, scan, switchMap, takeUntil, finalize, takeWhile } = rxjs;

// //first&last this will alter the observable such that it becomes just a single element?
// const numbers = of(-3, 5, 7, -1)
// numbers
//   .pipe(
//     last(),
//     tap(name => print(name)),
//     first(),
//     tap(name => print(name))
//   )
//   .subscribe()

// //throttleTime first event
// //debounceTime last event such as making sure a user is done typing an autocomplete form
// const mouseEvents = fromEvent(document, 'mousemove')
// mouseEvents
//   .pipe(throttleTime(1000))
//   // .pipe(debounceTime(1000))
//   .subscribe(e => print(e.type))

////scan similar to reduce() from js
// const clicks = fromEvent(document, 'click')
// clicks
//   .pipe(
//     map(e => parseInt(Math.random() * 5 ) ),
//     tap(score => print(`Click scored + ${score}`)),
//     scan((totalScore, score) => totalScore + score)
//   )
//   .subscribe(totalScore => print(`Total Score + ${totalScore}`))


////switchMap useful of an observable of a userId as argument for POST of user data
//// creates an observable off an observable
// const clicks = fromEvent(document, 'click')
// clicks
//   .pipe(
//     switchMap(() => { 
//       return interval(1000)
//     })
//   )
//   .subscribe(i => print(i))

// //takeUntil complete an observable based on the value of another
// const observable = interval(500)
// const notifier = timer(2000)
// observable
//     .pipe(
//       takeUntil(notifier),
//       finalize(() => print('Complete'))
//     )
//     .subscribe(i => print(i))

// //takeWhile take until certain condition turns true
// const names = of('Simon', 'Garfunkle', 'Doug', 'Steve')
// names
//     .pipe(
//       takeWhile(name => name != 'Doug'),
//       finalize(() => print('Found Doug!'))
//     )
//     .subscribe(condition => print(condition))

const { zip, forkJoin, catchError, retry, Subject, multicast } = rxjs;

////zip combines observables
// const names = of('Simon', 'Garfunkle', 'Doug', 'Steve')
// const nicknames = of('12', 'goofy', '3', 'zed')
// const combo = zip(names, nicknames)
// combo.subscribe(arr => print(arr))

// //forkJoin another way to merge. waits for both values to complete. promise.all(). Useful for await functions/apis
// const names = of('Simon', 'Garfunkle', 'Doug', 'Steve')
// const nicknames = of('12', 'goofy', '3', 'zed').delay(2000)
// const combo = zip(names, nicknames)
// combo.subscribe(arr => print(arr))

// //catchError&retry
// const observable = new Observable( observer => {
//   observer.next('good')
//   observer.next('great')
//   throw 'catch me!'
// })
// observable
//   .pipe(
//     catchError(err => print(err)),
//     retry(2)
//   )
//   //not emitted because it errors
//   .subscribe(x => print(x))

// //Subject is an observable with bonus features. Acts as a proxy to another data source. useful when calling next on Subject. Be able to broadcast new values to subscribers
// const subject = new Subject
// const subA = subject.subscribe( a => print(`Subscriber A: ${a}`))
// const subB = subject.subscribe( b => print(`Subscriber B: ${b}`))
// subject.next('Hello')
// setTimeout(() => {
//   subject.next('World')
// }, 1000)

// //multicast&connect send value to multiple subscribers but no related side effects
// //EXAMPLE if we had 100 subscribers it would run for every single one of them
// //DESIRE just to run 100 times on the observer
// const observable = fromEvent(document, 'click')
// const clicks = observable
//   .pipe(
//     tap(() => print('Tapped once'))
//   )
//   const subject = clicks.pipe(multicast(() => new Subject))
// const subA = subject.subscribe( a => print(`Subscriber A: ${a.timeStamp}`))
// const subB = subject.subscribe( b => print(`Subscriber B: ${b.timeStamp}`))
// subject.connect()