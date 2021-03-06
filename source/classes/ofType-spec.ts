/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { of } from "rxjs";
import { map, tap, toArray } from "rxjs/operators";
import { observe } from "rxjs-marbles/mocha";
import { Action, isType } from "ts-action/classes";
import { usingBase, usingEmpty, usingPayload, usingProps } from "./foobar-spec";
import { ofType } from "./ofType";

describe("ofType", () => {

    describe("base", () => {

        const { Bar, Baz, Foo } = usingBase;

        it("should filter actions matching a single type", observe(() => {
            return of<Action<string>>(new Foo(42), new Bar(54)).pipe(
                ofType(Foo),
                tap(action => expect(isType(action, Foo)).to.be.true),
                map(action => action.foo),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action<string>>(new Foo(42), new Bar(54)).pipe(
                ofType({ Foo, Bar }),
                tap(action => expect(isType(action, { Foo, Bar })).to.be.true),
                map(action => (action.type === Foo.type) ? action.foo : action.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, 54]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action<string>>(new Foo(42)).pipe(
                ofType(Bar),
                tap(action => expect(isType(action, Bar)).to.be.true),
                map(action => action.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));

        it("should filter actions not matching multiple types", observe(() => {
            return of<Action<string>>(new Foo(42)).pipe(
                ofType({ Bar, Baz }),
                tap(action => expect(isType(action, { Bar, Baz })).to.be.true),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });

    describe("empty", () => {

        const { Bar, Baz, Foo } = usingEmpty;

        it("should filter actions matching a single type", observe(() => {
            return of<Action<string>>(new Foo(), new Bar()).pipe(
                ofType(Foo),
                tap(action => expect(isType(action, Foo)).to.be.true),
                map(action => action.type),
                toArray(),
                tap(array => expect(array).to.deep.equal(["[foobar] FOO"]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action<string>>(new Foo(), new Bar()).pipe(
                ofType({ Foo, Bar }),
                tap(action => expect(isType(action, { Foo, Bar })).to.be.true),
                map(action => action.type),
                toArray(),
                tap(array => expect(array).to.deep.equal(["[foobar] FOO", "[foobar] BAR"]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action<string>>(new Foo()).pipe(
                ofType(Bar),
                tap(action => expect(isType(action, Bar)).to.be.true),
                map(action => action.type),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));

        it("should filter actions not matching multiple types", observe(() => {
            return of<Action<string>>(new Foo()).pipe(
                ofType({ Bar, Baz }),
                tap(action => expect(isType(action, { Bar, Baz })).to.be.true),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });

    describe("payload", () => {

        const { Bar, Baz, Foo } = usingPayload;

        it("should filter actions matching a single type", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 }), new Bar({ bar: 54 })).pipe(
                ofType(Foo),
                tap(action => expect(isType(action, Foo)).to.be.true),
                map(action => action.payload.foo),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 }), new Bar({ bar: 54 })).pipe(
                ofType({ Foo, Bar }),
                tap(action => expect(isType(action, { Foo, Bar })).to.be.true),
                map(action => (action.type === Foo.type) ? action.payload.foo : action.payload.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, 54]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 })).pipe(
                ofType(Bar),
                tap(action => expect(isType(action, Bar)).to.be.true),
                map(action => action.payload.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));

        it("should filter actions not matching multiple types", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 })).pipe(
                ofType({ Bar, Baz }),
                tap(action => expect(isType(action, { Bar, Baz })).to.be.true),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });

    describe("props", () => {

        const { Bar, Baz, Foo } = usingProps;

        it("should filter actions matching a single type", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 }), new Bar({ bar: 54 })).pipe(
                ofType(Foo),
                tap(action => expect(isType(action, Foo)).to.be.true),
                map(action => action.foo),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 }), new Bar({ bar: 54 })).pipe(
                ofType({ Foo, Bar }),
                tap(action => expect(isType(action, { Foo, Bar })).to.be.true),
                map(action => (action.type === Foo.type) ? action.foo : action.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, 54]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 })).pipe(
                ofType(Bar),
                tap(action => expect(isType(action, Bar)).to.be.true),
                map(action => action.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));

        it("should filter actions not matching multiple types", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 })).pipe(
                ofType({ Bar, Baz }),
                tap(action => expect(isType(action, { Bar, Baz })).to.be.true),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });
});
