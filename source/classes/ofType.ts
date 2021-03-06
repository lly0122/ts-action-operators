/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { Action, ActionCtor, Ctor } from "ts-action/classes";

export function ofType<T extends { [key: string]: ActionCtor<string, {}, Ctor<{}>> }>(ctors: T): (source: Observable<Action<string>>) => Observable<InstanceType<T[keyof T]>>;
export function ofType<T extends ActionCtor<string, {}, Ctor<{}>>>(ctor: T): (source: Observable<Action<string>>) => Observable<InstanceType<T>>;
export function ofType(arg: { [key: string]: ActionCtor<string, {}, Ctor<{}>> } | ActionCtor<string, {}, Ctor<{}>>): (source: Observable<Action<string>>) => Observable<Action<string>> {
    if (arg.type !== undefined) {
        return filter<Action<string>>(action => action.type === arg.type);
    }
    const types = Object.keys(arg).map(key => arg[key].type);
    return filter<Action<string>>(action => types.some(type => action.type === type));
}
