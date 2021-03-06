/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { of } from "rxjs";
import { tap, toArray } from "rxjs/operators";
import { observe } from "rxjs-marbles/mocha";
import { Action } from "ts-action/classes";
import { usingPayload } from "./foobar-spec";
import { ofType } from "./ofType";
import { toPayload } from "./toPayload";

describe("toPayload", () => {

    const Bar = usingPayload.Bar;
    const Foo = usingPayload.Foo;

    it("should obtain the payload", observe(() => {
        return of<Action<string>>(new Foo({ foo: 42 })).pipe(
            ofType(Foo),
            toPayload(),
            toArray(),
            tap(array => expect(array).to.deep.equal([{ foo: 42 }]))
        );
    }));
});
