/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { Action, ActionCreator, Creator } from "ts-action";

export function ofType<T extends { [key: string]: ActionCreator<string, Creator> }>(ctors: T): (source: Observable<Action<string>>) => Observable<ReturnType<T[keyof T]>>;
export function ofType<T extends ActionCreator<string, Creator>>(ctor: T): (source: Observable<Action<string>>) => Observable<ReturnType<T>>;
export function ofType(arg: { [key: string]: ActionCreator<string, Creator> } | ActionCreator<string, Creator>): (source: Observable<Action<string>>) => Observable<Action<string>> {
    if (arg.type !== undefined) {
        return filter<Action<string>>(action => action.type === arg.type);
    }
    const types = Object.keys(arg).map(key => arg[key].type);
    return filter<Action<string>>(action => types.some(type => action.type === type));
}
