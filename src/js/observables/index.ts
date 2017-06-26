import { Observable } from 'rxjs-es/Observable'
import { Subject } from 'rxjs-es/Subject'
import 'rxjs-es/add/observable/fromPromise'
import 'rxjs-es/add/operator/mergeMap'
import services from 'services/index'

const API = services.api

export const HttpCallSubject = new Subject()

export const HttpCallObservable = HttpCallSubject.mergeMap(() => Observable.fromPromise(API.users()))