import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class Store<T> {
state$:Observable<T>;
private _state$ : BehaviorSubject<T>;

protected constructor(intialState: T){
this._state$=new BehaviorSubject<T>(intialState);
this.state$=this._state$.asObservable();
}

select<T>(selectorFunction:any):Observable<T>{
return this.state$.pipe(
distinctUntilChanged(),
  map(selectorFunction));
}

get state(){
return this._state$.getValue();
}
protected setState(nexState :T) : void{
console.log('--------------');
console.log('Previous State',this.state);

this._state$.next(nexState);

console.log('Current State',this.state);
console.log('--------------');
}
}
