import { RestApi, Acl } from '@servicenow/sdk/core'

// TEMPORARY DIAGNOSTIC SCAFFOLDING -- not part of the app's real functionality.
// Each route is a plain inline script (not a function reference) testing exactly ONE
// JS syntax feature in isolation, on this specific instance's server-side script engine.
// A syntax error is a whole-script parse failure (can't be try/caught), so each pattern must
// live in its own separate script -- that's why there are so many near-identical tiny routes
// instead of one script with several try/catch blocks.
// Delete this whole file (and the diagnostics-probes-acl Now.ID entries) once we have answers.

const diagnosticsAccess = Acl({
    $id: Now.ID['diagnostics-probes-acl'],
    type: 'rest_endpoint',
    name: 'es6_diagnostics_access',
    script: `answer = gs.hasRole('global.hr_mtg_admin')`,
    operation: 'execute',
})

RestApi({
    $id: Now.ID['es6-diagnostics-api'],
    name: 'ES6 Diagnostics (temporary)',
    serviceId: 'es6_diagnostics',
    consumes: 'application/json',
    produces: 'application/json',
    enforceAcl: [diagnosticsAccess],
    routes: [
        {
            $id: Now.ID['probe-baseline'],
            name: 'probeBaseline',
            method: 'GET',
            path: '/probe/baseline',
            internalRole: false,
            shortDescription: 'Simplest possible route -- confirms probes work at all, rules out ACL/infra issues.',
            script: `
                response.setBody({ probe: 'baseline', ok: true });
            `,
        },
        {
            $id: Now.ID['probe-arrow-function'],
            name: 'probeArrowFunction',
            method: 'GET',
            path: '/probe/arrow-function',
            internalRole: false,
            shortDescription: 'Arrow function syntax.',
            script: `
                var f = (x) => x + 1;
                response.setBody({ probe: 'arrow-function', ok: true, result: f(1) });
            `,
        },
        {
            $id: Now.ID['probe-const-let'],
            name: 'probeConstLet',
            method: 'GET',
            path: '/probe/const-let',
            internalRole: false,
            shortDescription: 'const/let block-scoped declarations.',
            script: `
                const x = 1;
                let y = 2;
                response.setBody({ probe: 'const-let', ok: true, result: x + y });
            `,
        },
        {
            $id: Now.ID['probe-template-literal'],
            name: 'probeTemplateLiteral',
            method: 'GET',
            path: '/probe/template-literal',
            internalRole: false,
            shortDescription: 'Template literal string interpolation.',
            script: `
                var x = 1;
                var text = 'value is ' + x;
                var templated = \`value is \${x}\`;
                response.setBody({ probe: 'template-literal', ok: true, result: templated, matches: text === templated });
            `,
        },
        {
            $id: Now.ID['probe-destructuring-array'],
            name: 'probeDestructuringArray',
            method: 'GET',
            path: '/probe/destructuring-array',
            internalRole: false,
            shortDescription: 'Array destructuring assignment -- already confirmed broken elsewhere; included for a complete report.',
            script: `
                var arr = [1, 2];
                var [a, b] = arr;
                response.setBody({ probe: 'destructuring-array', ok: true, result: a + '-' + b });
            `,
        },
        {
            $id: Now.ID['probe-destructuring-object'],
            name: 'probeDestructuringObject',
            method: 'GET',
            path: '/probe/destructuring-object',
            internalRole: false,
            shortDescription: 'Object destructuring assignment -- the exact form the SDK generates for named-export script: references.',
            script: `
                var obj = { a: 1, b: 2 };
                var { a, b } = obj;
                response.setBody({ probe: 'destructuring-object', ok: true, result: a + '-' + b });
            `,
        },
        {
            $id: Now.ID['probe-for-of'],
            name: 'probeForOf',
            method: 'GET',
            path: '/probe/for-of',
            internalRole: false,
            shortDescription: 'for...of loop over a plain array.',
            script: `
                var arr = [1, 2, 3];
                var sum = 0;
                for (var x of arr) {
                    sum += x;
                }
                response.setBody({ probe: 'for-of', ok: true, result: sum });
            `,
        },
        {
            $id: Now.ID['probe-map-set'],
            name: 'probeMapSet',
            method: 'GET',
            path: '/probe/map-set',
            internalRole: false,
            shortDescription: 'Map and Set built-ins.',
            script: `
                var m = new Map();
                m.set('a', 1);
                var s = new Set();
                s.add(1);
                response.setBody({ probe: 'map-set', ok: true, result: m.get('a') + '-' + s.has(1) });
            `,
        },
        {
            $id: Now.ID['probe-array-find-includes'],
            name: 'probeArrayFindIncludes',
            method: 'GET',
            path: '/probe/array-find-includes',
            internalRole: false,
            shortDescription: 'Array.prototype.find and .includes -- used extensively in agendaService.ts.',
            script: `
                var arr = [1, 2, 3];
                var found = arr.find(function (x) { return x === 2; });
                var has = arr.includes(2);
                response.setBody({ probe: 'array-find-includes', ok: true, result: found + '-' + has });
            `,
        },
        {
            $id: Now.ID['probe-optional-chaining'],
            name: 'probeOptionalChaining',
            method: 'GET',
            path: '/probe/optional-chaining',
            internalRole: false,
            shortDescription: 'Optional chaining (?.) -- not currently used in our code, checking for future reference.',
            script: `
                var obj = { a: { b: 1 } };
                var v = obj?.a?.b;
                response.setBody({ probe: 'optional-chaining', ok: true, result: v });
            `,
        },
        {
            $id: Now.ID['probe-nullish-coalescing'],
            name: 'probeNullishCoalescing',
            method: 'GET',
            path: '/probe/nullish-coalescing',
            internalRole: false,
            shortDescription: 'Nullish coalescing (??).',
            script: `
                var x = null;
                var v = x ?? 'default';
                response.setBody({ probe: 'nullish-coalescing', ok: true, result: v });
            `,
        },
        {
            $id: Now.ID['probe-spread'],
            name: 'probeSpread',
            method: 'GET',
            path: '/probe/spread',
            internalRole: false,
            shortDescription: 'Spread syntax in an array literal.',
            script: `
                var arr1 = [1, 2];
                var arr2 = [...arr1, 3];
                response.setBody({ probe: 'spread', ok: true, result: arr2.join('-') });
            `,
        },
        {
            $id: Now.ID['probe-class-syntax'],
            name: 'probeClassSyntax',
            method: 'GET',
            path: '/probe/class-syntax',
            internalRole: false,
            shortDescription: 'ES6 class syntax (known unsupported for Script Includes per SDK docs -- testing for REST route scripts specifically).',
            script: `
                class Foo {
                    constructor(x) {
                        this.x = x;
                    }
                    getX() {
                        return this.x;
                    }
                }
                var f = new Foo(5);
                response.setBody({ probe: 'class-syntax', ok: true, result: f.getX() });
            `,
        },
        {
            $id: Now.ID['probe-default-params'],
            name: 'probeDefaultParams',
            method: 'GET',
            path: '/probe/default-params',
            internalRole: false,
            shortDescription: 'Default function parameters.',
            script: `
                function f(x = 1) {
                    return x;
                }
                response.setBody({ probe: 'default-params', ok: true, result: f() });
            `,
        },
    ],
})
