import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, inject as l, normalizeClass as u, normalizeStyle as d, onMounted as ee, onUnmounted as f, openBlock as p, provide as te, ref as ne, renderList as m, renderSlot as re, resolveDynamicComponent as ie, shallowRef as ae, toDisplayString as h, toValue as oe, unref as g, withCtx as _ } from "vue";
import { Button as se, CellGroup as ce, Checkbox as le, CheckboxGroup as ue, Field as de, Icon as fe, Image as pe, Popup as me, Radio as he, RadioGroup as ge, Slider as _e, Tab as ve, Tabs as ye, Tag as be } from "vant";
//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/util.js
var v;
(function(e) {
	e.assertEqual = (e) => {};
	function t(e) {}
	e.assertIs = t;
	function n(e) {
		throw Error();
	}
	e.assertNever = n, e.arrayToEnum = (e) => {
		let t = {};
		for (let n of e) t[n] = n;
		return t;
	}, e.getValidEnumValues = (t) => {
		let n = e.objectKeys(t).filter((e) => typeof t[t[e]] != "number"), r = {};
		for (let e of n) r[e] = t[e];
		return e.objectValues(r);
	}, e.objectValues = (t) => e.objectKeys(t).map(function(e) {
		return t[e];
	}), e.objectKeys = typeof Object.keys == "function" ? (e) => Object.keys(e) : (e) => {
		let t = [];
		for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
		return t;
	}, e.find = (e, t) => {
		for (let n of e) if (t(n)) return n;
	}, e.isInteger = typeof Number.isInteger == "function" ? (e) => Number.isInteger(e) : (e) => typeof e == "number" && Number.isFinite(e) && Math.floor(e) === e;
	function r(e, t = " | ") {
		return e.map((e) => typeof e == "string" ? `'${e}'` : e).join(t);
	}
	e.joinValues = r, e.jsonStringifyReplacer = (e, t) => typeof t == "bigint" ? t.toString() : t;
})(v ||= {});
var xe;
(function(e) {
	e.mergeShapes = (e, t) => ({
		...e,
		...t
	});
})(xe ||= {});
var y = v.arrayToEnum([
	"string",
	"nan",
	"number",
	"integer",
	"float",
	"boolean",
	"date",
	"bigint",
	"symbol",
	"function",
	"undefined",
	"null",
	"array",
	"object",
	"unknown",
	"promise",
	"void",
	"never",
	"map",
	"set"
]), Se = (e) => {
	switch (typeof e) {
		case "undefined": return y.undefined;
		case "string": return y.string;
		case "number": return Number.isNaN(e) ? y.nan : y.number;
		case "boolean": return y.boolean;
		case "function": return y.function;
		case "bigint": return y.bigint;
		case "symbol": return y.symbol;
		case "object": return Array.isArray(e) ? y.array : e === null ? y.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? y.promise : typeof Map < "u" && e instanceof Map ? y.map : typeof Set < "u" && e instanceof Set ? y.set : typeof Date < "u" && e instanceof Date ? y.date : y.object;
		default: return y.unknown;
	}
}, b = v.arrayToEnum([
	"invalid_type",
	"invalid_literal",
	"custom",
	"invalid_union",
	"invalid_union_discriminator",
	"invalid_enum_value",
	"unrecognized_keys",
	"invalid_arguments",
	"invalid_return_type",
	"invalid_date",
	"invalid_string",
	"too_small",
	"too_big",
	"invalid_intersection_types",
	"not_multiple_of",
	"not_finite"
]), x = class e extends Error {
	get errors() {
		return this.issues;
	}
	constructor(e) {
		super(), this.issues = [], this.addIssue = (e) => {
			this.issues = [...this.issues, e];
		}, this.addIssues = (e = []) => {
			this.issues = [...this.issues, ...e];
		};
		let t = new.target.prototype;
		Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
	}
	format(e) {
		let t = e || function(e) {
			return e.message;
		}, n = { _errors: [] }, r = (e) => {
			for (let i of e.issues) if (i.code === "invalid_union") i.unionErrors.map(r);
			else if (i.code === "invalid_return_type") r(i.returnTypeError);
			else if (i.code === "invalid_arguments") r(i.argumentsError);
			else if (i.path.length === 0) n._errors.push(t(i));
			else {
				let e = n, r = 0;
				for (; r < i.path.length;) {
					let n = i.path[r];
					r === i.path.length - 1 ? (e[n] = e[n] || { _errors: [] }, e[n]._errors.push(t(i))) : e[n] = e[n] || { _errors: [] }, e = e[n], r++;
				}
			}
		};
		return r(this), n;
	}
	static assert(t) {
		if (!(t instanceof e)) throw Error(`Not a ZodError: ${t}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, v.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(e = (e) => e.message) {
		let t = {}, n = [];
		for (let r of this.issues) if (r.path.length > 0) {
			let n = r.path[0];
			t[n] = t[n] || [], t[n].push(e(r));
		} else n.push(e(r));
		return {
			formErrors: n,
			fieldErrors: t
		};
	}
	get formErrors() {
		return this.flatten();
	}
};
x.create = (e) => new x(e);
//#endregion
//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/locales/en.js
var Ce = (e, t) => {
	let n;
	switch (e.code) {
		case b.invalid_type:
			n = e.received === y.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
			break;
		case b.invalid_literal:
			n = `Invalid literal value, expected ${JSON.stringify(e.expected, v.jsonStringifyReplacer)}`;
			break;
		case b.unrecognized_keys:
			n = `Unrecognized key(s) in object: ${v.joinValues(e.keys, ", ")}`;
			break;
		case b.invalid_union:
			n = "Invalid input";
			break;
		case b.invalid_union_discriminator:
			n = `Invalid discriminator value. Expected ${v.joinValues(e.options)}`;
			break;
		case b.invalid_enum_value:
			n = `Invalid enum value. Expected ${v.joinValues(e.options)}, received '${e.received}'`;
			break;
		case b.invalid_arguments:
			n = "Invalid function arguments";
			break;
		case b.invalid_return_type:
			n = "Invalid function return type";
			break;
		case b.invalid_date:
			n = "Invalid date";
			break;
		case b.invalid_string:
			typeof e.validation == "object" ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : v.assertNever(e.validation) : n = e.validation === "regex" ? "Invalid" : `Invalid ${e.validation}`;
			break;
		case b.too_small:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" || e.type === "bigint" ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
			break;
		case b.too_big:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
			break;
		case b.custom:
			n = "Invalid input";
			break;
		case b.invalid_intersection_types:
			n = "Intersection results could not be merged";
			break;
		case b.not_multiple_of:
			n = `Number must be a multiple of ${e.multipleOf}`;
			break;
		case b.not_finite:
			n = "Number must be finite";
			break;
		default: n = t.defaultError, v.assertNever(e);
	}
	return { message: n };
}, we = Ce;
function Te() {
	return we;
}
//#endregion
//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/parseUtil.js
var Ee = (e) => {
	let { data: t, path: n, errorMaps: r, issueData: i } = e, a = [...n, ...i.path || []], o = {
		...i,
		path: a
	};
	if (i.message !== void 0) return {
		...i,
		path: a,
		message: i.message
	};
	let s = "", c = r.filter((e) => !!e).slice().reverse();
	for (let e of c) s = e(o, {
		data: t,
		defaultError: s
	}).message;
	return {
		...i,
		path: a,
		message: s
	};
};
function S(e, t) {
	let n = Te(), r = Ee({
		issueData: t,
		data: e.data,
		path: e.path,
		errorMaps: [
			e.common.contextualErrorMap,
			e.schemaErrorMap,
			n,
			n === Ce ? void 0 : Ce
		].filter((e) => !!e)
	});
	e.common.issues.push(r);
}
var C = class e {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		this.value === "valid" && (this.value = "dirty");
	}
	abort() {
		this.value !== "aborted" && (this.value = "aborted");
	}
	static mergeArray(e, t) {
		let n = [];
		for (let r of t) {
			if (r.status === "aborted") return w;
			r.status === "dirty" && e.dirty(), n.push(r.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
	static async mergeObjectAsync(t, n) {
		let r = [];
		for (let e of n) {
			let t = await e.key, n = await e.value;
			r.push({
				key: t,
				value: n
			});
		}
		return e.mergeObjectSync(t, r);
	}
	static mergeObjectSync(e, t) {
		let n = {};
		for (let r of t) {
			let { key: t, value: i } = r;
			if (t.status === "aborted" || i.status === "aborted") return w;
			t.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), t.value !== "__proto__" && (i.value !== void 0 || r.alwaysSet) && (n[t.value] = i.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
}, w = Object.freeze({ status: "aborted" }), De = (e) => ({
	status: "dirty",
	value: e
}), T = (e) => ({
	status: "valid",
	value: e
}), Oe = (e) => e.status === "aborted", ke = (e) => e.status === "dirty", Ae = (e) => e.status === "valid", je = (e) => typeof Promise < "u" && e instanceof Promise, E;
(function(e) {
	e.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, e.toString = (e) => typeof e == "string" ? e : e?.message;
})(E ||= {});
//#endregion
//#region node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js
var D = class {
	constructor(e, t, n, r) {
		this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = r;
	}
	get path() {
		return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
	}
}, Me = (e, t) => {
	if (Ae(t)) return {
		success: !0,
		data: t.value
	};
	if (!e.common.issues.length) throw Error("Validation failed but no issues detected.");
	return {
		success: !1,
		get error() {
			if (this._error) return this._error;
			let t = new x(e.common.issues);
			return this._error = t, this._error;
		}
	};
};
function O(e) {
	if (!e) return {};
	let { errorMap: t, invalid_type_error: n, required_error: r, description: i } = e;
	if (t && (n || r)) throw Error("Can't use \"invalid_type_error\" or \"required_error\" in conjunction with custom error map.");
	return t ? {
		errorMap: t,
		description: i
	} : {
		errorMap: (t, i) => {
			let { message: a } = e;
			return t.code === "invalid_enum_value" ? { message: a ?? i.defaultError } : i.data === void 0 ? { message: a ?? r ?? i.defaultError } : t.code === "invalid_type" ? { message: a ?? n ?? i.defaultError } : { message: i.defaultError };
		},
		description: i
	};
}
var k = class {
	get description() {
		return this._def.description;
	}
	_getType(e) {
		return Se(e.data);
	}
	_getOrReturnCtx(e, t) {
		return t || {
			common: e.parent.common,
			data: e.data,
			parsedType: Se(e.data),
			schemaErrorMap: this._def.errorMap,
			path: e.path,
			parent: e.parent
		};
	}
	_processInputParams(e) {
		return {
			status: new C(),
			ctx: {
				common: e.parent.common,
				data: e.data,
				parsedType: Se(e.data),
				schemaErrorMap: this._def.errorMap,
				path: e.path,
				parent: e.parent
			}
		};
	}
	_parseSync(e) {
		let t = this._parse(e);
		if (je(t)) throw Error("Synchronous parse encountered promise.");
		return t;
	}
	_parseAsync(e) {
		let t = this._parse(e);
		return Promise.resolve(t);
	}
	parse(e, t) {
		let n = this.safeParse(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	safeParse(e, t) {
		let n = {
			common: {
				issues: [],
				async: t?.async ?? !1,
				contextualErrorMap: t?.errorMap
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: Se(e)
		};
		return Me(n, this._parseSync({
			data: e,
			path: n.path,
			parent: n
		}));
	}
	"~validate"(e) {
		let t = {
			common: {
				issues: [],
				async: !!this["~standard"].async
			},
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: Se(e)
		};
		if (!this["~standard"].async) try {
			let n = this._parseSync({
				data: e,
				path: [],
				parent: t
			});
			return Ae(n) ? { value: n.value } : { issues: t.common.issues };
		} catch (e) {
			e?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), t.common = {
				issues: [],
				async: !0
			};
		}
		return this._parseAsync({
			data: e,
			path: [],
			parent: t
		}).then((e) => Ae(e) ? { value: e.value } : { issues: t.common.issues });
	}
	async parseAsync(e, t) {
		let n = await this.safeParseAsync(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	async safeParseAsync(e, t) {
		let n = {
			common: {
				issues: [],
				contextualErrorMap: t?.errorMap,
				async: !0
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: Se(e)
		}, r = this._parse({
			data: e,
			path: n.path,
			parent: n
		});
		return Me(n, await (je(r) ? r : Promise.resolve(r)));
	}
	refine(e, t) {
		let n = (e) => typeof t == "string" || t === void 0 ? { message: t } : typeof t == "function" ? t(e) : t;
		return this._refinement((t, r) => {
			let i = e(t), a = () => r.addIssue({
				code: b.custom,
				...n(t)
			});
			return typeof Promise < "u" && i instanceof Promise ? i.then((e) => e ? !0 : (a(), !1)) : i ? !0 : (a(), !1);
		});
	}
	refinement(e, t) {
		return this._refinement((n, r) => e(n) ? !0 : (r.addIssue(typeof t == "function" ? t(n, r) : t), !1));
	}
	_refinement(e) {
		return new Pt({
			schema: this,
			typeName: j.ZodEffects,
			effect: {
				type: "refinement",
				refinement: e
			}
		});
	}
	superRefine(e) {
		return this._refinement(e);
	}
	constructor(e) {
		this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: (e) => this["~validate"](e)
		};
	}
	optional() {
		return Ft.create(this, this._def);
	}
	nullable() {
		return It.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return gt.create(this);
	}
	promise() {
		return Nt.create(this, this._def);
	}
	or(e) {
		return vt.create([this, e], this._def);
	}
	and(e) {
		return St.create(this, e, this._def);
	}
	transform(e) {
		return new Pt({
			...O(this._def),
			schema: this,
			typeName: j.ZodEffects,
			effect: {
				type: "transform",
				transform: e
			}
		});
	}
	default(e) {
		let t = typeof e == "function" ? e : () => e;
		return new Lt({
			...O(this._def),
			innerType: this,
			defaultValue: t,
			typeName: j.ZodDefault
		});
	}
	brand() {
		return new Bt({
			typeName: j.ZodBranded,
			type: this,
			...O(this._def)
		});
	}
	catch(e) {
		let t = typeof e == "function" ? e : () => e;
		return new Rt({
			...O(this._def),
			innerType: this,
			catchValue: t,
			typeName: j.ZodCatch
		});
	}
	describe(e) {
		let t = this.constructor;
		return new t({
			...this._def,
			description: e
		});
	}
	pipe(e) {
		return Vt.create(this, e);
	}
	readonly() {
		return Ht.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
}, Ne = /^c[^\s-]{8,}$/i, Pe = /^[0-9a-z]+$/, Fe = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Ie = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Le = /^[a-z0-9_-]{21}$/i, Re = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, ze = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Be = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Ve = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", He, Ue = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, We = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Ge = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Ke = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, qe = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Je = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Ye = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Xe = RegExp(`^${Ye}$`);
function Ze(e) {
	let t = "[0-5]\\d";
	e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision ?? (t = `${t}(\\.\\d+)?`);
	let n = e.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${n}`;
}
function Qe(e) {
	return RegExp(`^${Ze(e)}$`);
}
function $e(e) {
	let t = `${Ye}T${Ze(e)}`, n = [];
	return n.push(e.local ? "Z?" : "Z"), e.offset && n.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${n.join("|")})`, RegExp(`^${t}$`);
}
function et(e, t) {
	return !!((t === "v4" || !t) && Ue.test(e) || (t === "v6" || !t) && Ge.test(e));
}
function tt(e, t) {
	if (!Re.test(e)) return !1;
	try {
		let [n] = e.split(".");
		if (!n) return !1;
		let r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), i = JSON.parse(atob(r));
		return !(typeof i != "object" || !i || "typ" in i && i?.typ !== "JWT" || !i.alg || t && i.alg !== t);
	} catch {
		return !1;
	}
}
function nt(e, t) {
	return !!((t === "v4" || !t) && We.test(e) || (t === "v6" || !t) && Ke.test(e));
}
var rt = class e extends k {
	_parse(e) {
		if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== y.string) {
			let t = this._getOrReturnCtx(e);
			return S(t, {
				code: b.invalid_type,
				expected: y.string,
				received: t.parsedType
			}), w;
		}
		let t = new C(), n;
		for (let r of this._def.checks) if (r.kind === "min") e.data.length < r.value && (n = this._getOrReturnCtx(e, n), S(n, {
			code: b.too_small,
			minimum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "max") e.data.length > r.value && (n = this._getOrReturnCtx(e, n), S(n, {
			code: b.too_big,
			maximum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "length") {
			let i = e.data.length > r.value, a = e.data.length < r.value;
			(i || a) && (n = this._getOrReturnCtx(e, n), i ? S(n, {
				code: b.too_big,
				maximum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}) : a && S(n, {
				code: b.too_small,
				minimum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}), t.dirty());
		} else if (r.kind === "email") Be.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "email",
			code: b.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "emoji") He ||= new RegExp(Ve, "u"), He.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "emoji",
			code: b.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "uuid") Ie.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "uuid",
			code: b.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "nanoid") Le.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "nanoid",
			code: b.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid") Ne.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "cuid",
			code: b.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid2") Pe.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "cuid2",
			code: b.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "ulid") Fe.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "ulid",
			code: b.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "url") try {
			new URL(e.data);
		} catch {
			n = this._getOrReturnCtx(e, n), S(n, {
				validation: "url",
				code: b.invalid_string,
				message: r.message
			}), t.dirty();
		}
		else r.kind === "regex" ? (r.regex.lastIndex = 0, r.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "regex",
			code: b.invalid_string,
			message: r.message
		}), t.dirty())) : r.kind === "trim" ? e.data = e.data.trim() : r.kind === "includes" ? e.data.includes(r.value, r.position) || (n = this._getOrReturnCtx(e, n), S(n, {
			code: b.invalid_string,
			validation: {
				includes: r.value,
				position: r.position
			},
			message: r.message
		}), t.dirty()) : r.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : r.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : r.kind === "startsWith" ? e.data.startsWith(r.value) || (n = this._getOrReturnCtx(e, n), S(n, {
			code: b.invalid_string,
			validation: { startsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "endsWith" ? e.data.endsWith(r.value) || (n = this._getOrReturnCtx(e, n), S(n, {
			code: b.invalid_string,
			validation: { endsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "datetime" ? $e(r).test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			code: b.invalid_string,
			validation: "datetime",
			message: r.message
		}), t.dirty()) : r.kind === "date" ? Xe.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			code: b.invalid_string,
			validation: "date",
			message: r.message
		}), t.dirty()) : r.kind === "time" ? Qe(r).test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			code: b.invalid_string,
			validation: "time",
			message: r.message
		}), t.dirty()) : r.kind === "duration" ? ze.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "duration",
			code: b.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "ip" ? et(e.data, r.version) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "ip",
			code: b.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "jwt" ? tt(e.data, r.alg) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "jwt",
			code: b.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "cidr" ? nt(e.data, r.version) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "cidr",
			code: b.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "base64" ? qe.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "base64",
			code: b.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "base64url" ? Je.test(e.data) || (n = this._getOrReturnCtx(e, n), S(n, {
			validation: "base64url",
			code: b.invalid_string,
			message: r.message
		}), t.dirty()) : v.assertNever(r);
		return {
			status: t.value,
			value: e.data
		};
	}
	_regex(e, t, n) {
		return this.refinement((t) => e.test(t), {
			validation: t,
			code: b.invalid_string,
			...E.errToObj(n)
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	email(e) {
		return this._addCheck({
			kind: "email",
			...E.errToObj(e)
		});
	}
	url(e) {
		return this._addCheck({
			kind: "url",
			...E.errToObj(e)
		});
	}
	emoji(e) {
		return this._addCheck({
			kind: "emoji",
			...E.errToObj(e)
		});
	}
	uuid(e) {
		return this._addCheck({
			kind: "uuid",
			...E.errToObj(e)
		});
	}
	nanoid(e) {
		return this._addCheck({
			kind: "nanoid",
			...E.errToObj(e)
		});
	}
	cuid(e) {
		return this._addCheck({
			kind: "cuid",
			...E.errToObj(e)
		});
	}
	cuid2(e) {
		return this._addCheck({
			kind: "cuid2",
			...E.errToObj(e)
		});
	}
	ulid(e) {
		return this._addCheck({
			kind: "ulid",
			...E.errToObj(e)
		});
	}
	base64(e) {
		return this._addCheck({
			kind: "base64",
			...E.errToObj(e)
		});
	}
	base64url(e) {
		return this._addCheck({
			kind: "base64url",
			...E.errToObj(e)
		});
	}
	jwt(e) {
		return this._addCheck({
			kind: "jwt",
			...E.errToObj(e)
		});
	}
	ip(e) {
		return this._addCheck({
			kind: "ip",
			...E.errToObj(e)
		});
	}
	cidr(e) {
		return this._addCheck({
			kind: "cidr",
			...E.errToObj(e)
		});
	}
	datetime(e) {
		return typeof e == "string" ? this._addCheck({
			kind: "datetime",
			precision: null,
			offset: !1,
			local: !1,
			message: e
		}) : this._addCheck({
			kind: "datetime",
			precision: e?.precision === void 0 ? null : e?.precision,
			offset: e?.offset ?? !1,
			local: e?.local ?? !1,
			...E.errToObj(e?.message)
		});
	}
	date(e) {
		return this._addCheck({
			kind: "date",
			message: e
		});
	}
	time(e) {
		return typeof e == "string" ? this._addCheck({
			kind: "time",
			precision: null,
			message: e
		}) : this._addCheck({
			kind: "time",
			precision: e?.precision === void 0 ? null : e?.precision,
			...E.errToObj(e?.message)
		});
	}
	duration(e) {
		return this._addCheck({
			kind: "duration",
			...E.errToObj(e)
		});
	}
	regex(e, t) {
		return this._addCheck({
			kind: "regex",
			regex: e,
			...E.errToObj(t)
		});
	}
	includes(e, t) {
		return this._addCheck({
			kind: "includes",
			value: e,
			position: t?.position,
			...E.errToObj(t?.message)
		});
	}
	startsWith(e, t) {
		return this._addCheck({
			kind: "startsWith",
			value: e,
			...E.errToObj(t)
		});
	}
	endsWith(e, t) {
		return this._addCheck({
			kind: "endsWith",
			value: e,
			...E.errToObj(t)
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e,
			...E.errToObj(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e,
			...E.errToObj(t)
		});
	}
	length(e, t) {
		return this._addCheck({
			kind: "length",
			value: e,
			...E.errToObj(t)
		});
	}
	nonempty(e) {
		return this.min(1, E.errToObj(e));
	}
	trim() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }]
		});
	}
	toLowerCase() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }]
		});
	}
	toUpperCase() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }]
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((e) => e.kind === "datetime");
	}
	get isDate() {
		return !!this._def.checks.find((e) => e.kind === "date");
	}
	get isTime() {
		return !!this._def.checks.find((e) => e.kind === "time");
	}
	get isDuration() {
		return !!this._def.checks.find((e) => e.kind === "duration");
	}
	get isEmail() {
		return !!this._def.checks.find((e) => e.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((e) => e.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((e) => e.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((e) => e.kind === "uuid");
	}
	get isNANOID() {
		return !!this._def.checks.find((e) => e.kind === "nanoid");
	}
	get isCUID() {
		return !!this._def.checks.find((e) => e.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((e) => e.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((e) => e.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((e) => e.kind === "ip");
	}
	get isCIDR() {
		return !!this._def.checks.find((e) => e.kind === "cidr");
	}
	get isBase64() {
		return !!this._def.checks.find((e) => e.kind === "base64");
	}
	get isBase64url() {
		return !!this._def.checks.find((e) => e.kind === "base64url");
	}
	get minLength() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxLength() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
rt.create = (e) => new rt({
	checks: [],
	typeName: j.ZodString,
	coerce: e?.coerce ?? !1,
	...O(e)
});
function it(e, t) {
	let n = (e.toString().split(".")[1] || "").length, r = (t.toString().split(".")[1] || "").length, i = n > r ? n : r;
	return Number.parseInt(e.toFixed(i).replace(".", "")) % Number.parseInt(t.toFixed(i).replace(".", "")) / 10 ** i;
}
var at = class e extends k {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
	}
	_parse(e) {
		if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== y.number) {
			let t = this._getOrReturnCtx(e);
			return S(t, {
				code: b.invalid_type,
				expected: y.number,
				received: t.parsedType
			}), w;
		}
		let t, n = new C();
		for (let r of this._def.checks) r.kind === "int" ? v.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), S(t, {
			code: b.invalid_type,
			expected: "integer",
			received: "float",
			message: r.message
		}), n.dirty()) : r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), S(t, {
			code: b.too_small,
			minimum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), S(t, {
			code: b.too_big,
			maximum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? it(e.data, r.value) !== 0 && (t = this._getOrReturnCtx(e, t), S(t, {
			code: b.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : r.kind === "finite" ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), S(t, {
			code: b.not_finite,
			message: r.message
		}), n.dirty()) : v.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, E.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, E.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, E.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, E.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: E.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	int(e) {
		return this._addCheck({
			kind: "int",
			message: E.toString(e)
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !1,
			message: E.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !1,
			message: E.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !0,
			message: E.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !0,
			message: E.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: E.toString(t)
		});
	}
	finite(e) {
		return this._addCheck({
			kind: "finite",
			message: E.toString(e)
		});
	}
	safe(e) {
		return this._addCheck({
			kind: "min",
			inclusive: !0,
			value: -(2 ** 53 - 1),
			message: E.toString(e)
		})._addCheck({
			kind: "max",
			inclusive: !0,
			value: 2 ** 53 - 1,
			message: E.toString(e)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
	get isInt() {
		return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && v.isInteger(e.value));
	}
	get isFinite() {
		let e = null, t = null;
		for (let n of this._def.checks) if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf") return !0;
		else n.kind === "min" ? (t === null || n.value > t) && (t = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
		return Number.isFinite(t) && Number.isFinite(e);
	}
};
at.create = (e) => new at({
	checks: [],
	typeName: j.ZodNumber,
	coerce: e?.coerce || !1,
	...O(e)
});
var ot = class e extends k {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte;
	}
	_parse(e) {
		if (this._def.coerce) try {
			e.data = BigInt(e.data);
		} catch {
			return this._getInvalidInput(e);
		}
		if (this._getType(e) !== y.bigint) return this._getInvalidInput(e);
		let t, n = new C();
		for (let r of this._def.checks) r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), S(t, {
			code: b.too_small,
			type: "bigint",
			minimum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), S(t, {
			code: b.too_big,
			type: "bigint",
			maximum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? e.data % r.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), S(t, {
			code: b.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : v.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	_getInvalidInput(e) {
		let t = this._getOrReturnCtx(e);
		return S(t, {
			code: b.invalid_type,
			expected: y.bigint,
			received: t.parsedType
		}), w;
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, E.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, E.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, E.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, E.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: E.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !1,
			message: E.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !1,
			message: E.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !0,
			message: E.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !0,
			message: E.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: E.toString(t)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
ot.create = (e) => new ot({
	checks: [],
	typeName: j.ZodBigInt,
	coerce: e?.coerce ?? !1,
	...O(e)
});
var st = class extends k {
	_parse(e) {
		if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== y.boolean) {
			let t = this._getOrReturnCtx(e);
			return S(t, {
				code: b.invalid_type,
				expected: y.boolean,
				received: t.parsedType
			}), w;
		}
		return T(e.data);
	}
};
st.create = (e) => new st({
	typeName: j.ZodBoolean,
	coerce: e?.coerce || !1,
	...O(e)
});
var ct = class e extends k {
	_parse(e) {
		if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== y.date) {
			let t = this._getOrReturnCtx(e);
			return S(t, {
				code: b.invalid_type,
				expected: y.date,
				received: t.parsedType
			}), w;
		}
		if (Number.isNaN(e.data.getTime())) return S(this._getOrReturnCtx(e), { code: b.invalid_date }), w;
		let t = new C(), n;
		for (let r of this._def.checks) r.kind === "min" ? e.data.getTime() < r.value && (n = this._getOrReturnCtx(e, n), S(n, {
			code: b.too_small,
			message: r.message,
			inclusive: !0,
			exact: !1,
			minimum: r.value,
			type: "date"
		}), t.dirty()) : r.kind === "max" ? e.data.getTime() > r.value && (n = this._getOrReturnCtx(e, n), S(n, {
			code: b.too_big,
			message: r.message,
			inclusive: !0,
			exact: !1,
			maximum: r.value,
			type: "date"
		}), t.dirty()) : v.assertNever(r);
		return {
			status: t.value,
			value: new Date(e.data.getTime())
		};
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e.getTime(),
			message: E.toString(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e.getTime(),
			message: E.toString(t)
		});
	}
	get minDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
	get maxDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
};
ct.create = (e) => new ct({
	checks: [],
	coerce: e?.coerce || !1,
	typeName: j.ZodDate,
	...O(e)
});
var lt = class extends k {
	_parse(e) {
		if (this._getType(e) !== y.symbol) {
			let t = this._getOrReturnCtx(e);
			return S(t, {
				code: b.invalid_type,
				expected: y.symbol,
				received: t.parsedType
			}), w;
		}
		return T(e.data);
	}
};
lt.create = (e) => new lt({
	typeName: j.ZodSymbol,
	...O(e)
});
var ut = class extends k {
	_parse(e) {
		if (this._getType(e) !== y.undefined) {
			let t = this._getOrReturnCtx(e);
			return S(t, {
				code: b.invalid_type,
				expected: y.undefined,
				received: t.parsedType
			}), w;
		}
		return T(e.data);
	}
};
ut.create = (e) => new ut({
	typeName: j.ZodUndefined,
	...O(e)
});
var dt = class extends k {
	_parse(e) {
		if (this._getType(e) !== y.null) {
			let t = this._getOrReturnCtx(e);
			return S(t, {
				code: b.invalid_type,
				expected: y.null,
				received: t.parsedType
			}), w;
		}
		return T(e.data);
	}
};
dt.create = (e) => new dt({
	typeName: j.ZodNull,
	...O(e)
});
var ft = class extends k {
	constructor() {
		super(...arguments), this._any = !0;
	}
	_parse(e) {
		return T(e.data);
	}
};
ft.create = (e) => new ft({
	typeName: j.ZodAny,
	...O(e)
});
var pt = class extends k {
	constructor() {
		super(...arguments), this._unknown = !0;
	}
	_parse(e) {
		return T(e.data);
	}
};
pt.create = (e) => new pt({
	typeName: j.ZodUnknown,
	...O(e)
});
var mt = class extends k {
	_parse(e) {
		let t = this._getOrReturnCtx(e);
		return S(t, {
			code: b.invalid_type,
			expected: y.never,
			received: t.parsedType
		}), w;
	}
};
mt.create = (e) => new mt({
	typeName: j.ZodNever,
	...O(e)
});
var ht = class extends k {
	_parse(e) {
		if (this._getType(e) !== y.undefined) {
			let t = this._getOrReturnCtx(e);
			return S(t, {
				code: b.invalid_type,
				expected: y.void,
				received: t.parsedType
			}), w;
		}
		return T(e.data);
	}
};
ht.create = (e) => new ht({
	typeName: j.ZodVoid,
	...O(e)
});
var gt = class e extends k {
	_parse(e) {
		let { ctx: t, status: n } = this._processInputParams(e), r = this._def;
		if (t.parsedType !== y.array) return S(t, {
			code: b.invalid_type,
			expected: y.array,
			received: t.parsedType
		}), w;
		if (r.exactLength !== null) {
			let e = t.data.length > r.exactLength.value, i = t.data.length < r.exactLength.value;
			(e || i) && (S(t, {
				code: e ? b.too_big : b.too_small,
				minimum: i ? r.exactLength.value : void 0,
				maximum: e ? r.exactLength.value : void 0,
				type: "array",
				inclusive: !0,
				exact: !0,
				message: r.exactLength.message
			}), n.dirty());
		}
		if (r.minLength !== null && t.data.length < r.minLength.value && (S(t, {
			code: b.too_small,
			minimum: r.minLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.minLength.message
		}), n.dirty()), r.maxLength !== null && t.data.length > r.maxLength.value && (S(t, {
			code: b.too_big,
			maximum: r.maxLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.maxLength.message
		}), n.dirty()), t.common.async) return Promise.all([...t.data].map((e, n) => r.type._parseAsync(new D(t, e, t.path, n)))).then((e) => C.mergeArray(n, e));
		let i = [...t.data].map((e, n) => r.type._parseSync(new D(t, e, t.path, n)));
		return C.mergeArray(n, i);
	}
	get element() {
		return this._def.type;
	}
	min(t, n) {
		return new e({
			...this._def,
			minLength: {
				value: t,
				message: E.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxLength: {
				value: t,
				message: E.toString(n)
			}
		});
	}
	length(t, n) {
		return new e({
			...this._def,
			exactLength: {
				value: t,
				message: E.toString(n)
			}
		});
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
gt.create = (e, t) => new gt({
	type: e,
	minLength: null,
	maxLength: null,
	exactLength: null,
	typeName: j.ZodArray,
	...O(t)
});
function _t(e) {
	if (e instanceof A) {
		let t = {};
		for (let n in e.shape) {
			let r = e.shape[n];
			t[n] = Ft.create(_t(r));
		}
		return new A({
			...e._def,
			shape: () => t
		});
	} else if (e instanceof gt) return new gt({
		...e._def,
		type: _t(e.element)
	});
	else if (e instanceof Ft) return Ft.create(_t(e.unwrap()));
	else if (e instanceof It) return It.create(_t(e.unwrap()));
	else if (e instanceof Ct) return Ct.create(e.items.map((e) => _t(e)));
	else return e;
}
var A = class e extends k {
	constructor() {
		super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		let e = this._def.shape(), t = v.objectKeys(e);
		return this._cached = {
			shape: e,
			keys: t
		}, this._cached;
	}
	_parse(e) {
		if (this._getType(e) !== y.object) {
			let t = this._getOrReturnCtx(e);
			return S(t, {
				code: b.invalid_type,
				expected: y.object,
				received: t.parsedType
			}), w;
		}
		let { status: t, ctx: n } = this._processInputParams(e), { shape: r, keys: i } = this._getCached(), a = [];
		if (!(this._def.catchall instanceof mt && this._def.unknownKeys === "strip")) for (let e in n.data) i.includes(e) || a.push(e);
		let o = [];
		for (let e of i) {
			let t = r[e], i = n.data[e];
			o.push({
				key: {
					status: "valid",
					value: e
				},
				value: t._parse(new D(n, i, n.path, e)),
				alwaysSet: e in n.data
			});
		}
		if (this._def.catchall instanceof mt) {
			let e = this._def.unknownKeys;
			if (e === "passthrough") for (let e of a) o.push({
				key: {
					status: "valid",
					value: e
				},
				value: {
					status: "valid",
					value: n.data[e]
				}
			});
			else if (e === "strict") a.length > 0 && (S(n, {
				code: b.unrecognized_keys,
				keys: a
			}), t.dirty());
			else if (e !== "strip") throw Error("Internal ZodObject error: invalid unknownKeys value.");
		} else {
			let e = this._def.catchall;
			for (let t of a) {
				let r = n.data[t];
				o.push({
					key: {
						status: "valid",
						value: t
					},
					value: e._parse(new D(n, r, n.path, t)),
					alwaysSet: t in n.data
				});
			}
		}
		return n.common.async ? Promise.resolve().then(async () => {
			let e = [];
			for (let t of o) {
				let n = await t.key, r = await t.value;
				e.push({
					key: n,
					value: r,
					alwaysSet: t.alwaysSet
				});
			}
			return e;
		}).then((e) => C.mergeObjectSync(t, e)) : C.mergeObjectSync(t, o);
	}
	get shape() {
		return this._def.shape();
	}
	strict(t) {
		return E.errToObj, new e({
			...this._def,
			unknownKeys: "strict",
			...t === void 0 ? {} : { errorMap: (e, n) => {
				let r = this._def.errorMap?.(e, n).message ?? n.defaultError;
				return e.code === "unrecognized_keys" ? { message: E.errToObj(t).message ?? r } : { message: r };
			} }
		});
	}
	strip() {
		return new e({
			...this._def,
			unknownKeys: "strip"
		});
	}
	passthrough() {
		return new e({
			...this._def,
			unknownKeys: "passthrough"
		});
	}
	extend(t) {
		return new e({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...t
			})
		});
	}
	merge(t) {
		return new e({
			unknownKeys: t._def.unknownKeys,
			catchall: t._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...t._def.shape()
			}),
			typeName: j.ZodObject
		});
	}
	setKey(e, t) {
		return this.augment({ [e]: t });
	}
	catchall(t) {
		return new e({
			...this._def,
			catchall: t
		});
	}
	pick(t) {
		let n = {};
		for (let e of v.objectKeys(t)) t[e] && this.shape[e] && (n[e] = this.shape[e]);
		return new e({
			...this._def,
			shape: () => n
		});
	}
	omit(t) {
		let n = {};
		for (let e of v.objectKeys(this.shape)) t[e] || (n[e] = this.shape[e]);
		return new e({
			...this._def,
			shape: () => n
		});
	}
	deepPartial() {
		return _t(this);
	}
	partial(t) {
		let n = {};
		for (let e of v.objectKeys(this.shape)) {
			let r = this.shape[e];
			t && !t[e] ? n[e] = r : n[e] = r.optional();
		}
		return new e({
			...this._def,
			shape: () => n
		});
	}
	required(t) {
		let n = {};
		for (let e of v.objectKeys(this.shape)) if (t && !t[e]) n[e] = this.shape[e];
		else {
			let t = this.shape[e];
			for (; t instanceof Ft;) t = t._def.innerType;
			n[e] = t;
		}
		return new e({
			...this._def,
			shape: () => n
		});
	}
	keyof() {
		return At(v.objectKeys(this.shape));
	}
};
A.create = (e, t) => new A({
	shape: () => e,
	unknownKeys: "strip",
	catchall: mt.create(),
	typeName: j.ZodObject,
	...O(t)
}), A.strictCreate = (e, t) => new A({
	shape: () => e,
	unknownKeys: "strict",
	catchall: mt.create(),
	typeName: j.ZodObject,
	...O(t)
}), A.lazycreate = (e, t) => new A({
	shape: e,
	unknownKeys: "strip",
	catchall: mt.create(),
	typeName: j.ZodObject,
	...O(t)
});
var vt = class extends k {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = this._def.options;
		function r(e) {
			for (let t of e) if (t.result.status === "valid") return t.result;
			for (let n of e) if (n.result.status === "dirty") return t.common.issues.push(...n.ctx.common.issues), n.result;
			let n = e.map((e) => new x(e.ctx.common.issues));
			return S(t, {
				code: b.invalid_union,
				unionErrors: n
			}), w;
		}
		if (t.common.async) return Promise.all(n.map(async (e) => {
			let n = {
				...t,
				common: {
					...t.common,
					issues: []
				},
				parent: null
			};
			return {
				result: await e._parseAsync({
					data: t.data,
					path: t.path,
					parent: n
				}),
				ctx: n
			};
		})).then(r);
		{
			let e, r = [];
			for (let i of n) {
				let n = {
					...t,
					common: {
						...t.common,
						issues: []
					},
					parent: null
				}, a = i._parseSync({
					data: t.data,
					path: t.path,
					parent: n
				});
				if (a.status === "valid") return a;
				a.status === "dirty" && !e && (e = {
					result: a,
					ctx: n
				}), n.common.issues.length && r.push(n.common.issues);
			}
			if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
			let i = r.map((e) => new x(e));
			return S(t, {
				code: b.invalid_union,
				unionErrors: i
			}), w;
		}
	}
	get options() {
		return this._def.options;
	}
};
vt.create = (e, t) => new vt({
	options: e,
	typeName: j.ZodUnion,
	...O(t)
});
var yt = (e) => e instanceof Ot ? yt(e.schema) : e instanceof Pt ? yt(e.innerType()) : e instanceof kt ? [e.value] : e instanceof jt ? e.options : e instanceof Mt ? v.objectValues(e.enum) : e instanceof Lt ? yt(e._def.innerType) : e instanceof ut ? [void 0] : e instanceof dt ? [null] : e instanceof Ft ? [void 0, ...yt(e.unwrap())] : e instanceof It ? [null, ...yt(e.unwrap())] : e instanceof Bt || e instanceof Ht ? yt(e.unwrap()) : e instanceof Rt ? yt(e._def.innerType) : [], bt = class e extends k {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== y.object) return S(t, {
			code: b.invalid_type,
			expected: y.object,
			received: t.parsedType
		}), w;
		let n = this.discriminator, r = t.data[n], i = this.optionsMap.get(r);
		return i ? t.common.async ? i._parseAsync({
			data: t.data,
			path: t.path,
			parent: t
		}) : i._parseSync({
			data: t.data,
			path: t.path,
			parent: t
		}) : (S(t, {
			code: b.invalid_union_discriminator,
			options: Array.from(this.optionsMap.keys()),
			path: [n]
		}), w);
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	static create(t, n, r) {
		let i = /* @__PURE__ */ new Map();
		for (let e of n) {
			let n = yt(e.shape[t]);
			if (!n.length) throw Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
			for (let r of n) {
				if (i.has(r)) throw Error(`Discriminator property ${String(t)} has duplicate value ${String(r)}`);
				i.set(r, e);
			}
		}
		return new e({
			typeName: j.ZodDiscriminatedUnion,
			discriminator: t,
			options: n,
			optionsMap: i,
			...O(r)
		});
	}
};
function xt(e, t) {
	let n = Se(e), r = Se(t);
	if (e === t) return {
		valid: !0,
		data: e
	};
	if (n === y.object && r === y.object) {
		let n = v.objectKeys(t), r = v.objectKeys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = xt(e[n], t[n]);
			if (!r.valid) return { valid: !1 };
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	} else if (n === y.array && r === y.array) {
		if (e.length !== t.length) return { valid: !1 };
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = xt(i, a);
			if (!o.valid) return { valid: !1 };
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	} else if (n === y.date && r === y.date && +e == +t) return {
		valid: !0,
		data: e
	};
	else return { valid: !1 };
}
var St = class extends k {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = (e, r) => {
			if (Oe(e) || Oe(r)) return w;
			let i = xt(e.value, r.value);
			return i.valid ? ((ke(e) || ke(r)) && t.dirty(), {
				status: t.value,
				value: i.data
			}) : (S(n, { code: b.invalid_intersection_types }), w);
		};
		return n.common.async ? Promise.all([this._def.left._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		})]).then(([e, t]) => r(e, t)) : r(this._def.left._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}));
	}
};
St.create = (e, t, n) => new St({
	left: e,
	right: t,
	typeName: j.ZodIntersection,
	...O(n)
});
var Ct = class e extends k {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== y.array) return S(n, {
			code: b.invalid_type,
			expected: y.array,
			received: n.parsedType
		}), w;
		if (n.data.length < this._def.items.length) return S(n, {
			code: b.too_small,
			minimum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), w;
		!this._def.rest && n.data.length > this._def.items.length && (S(n, {
			code: b.too_big,
			maximum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), t.dirty());
		let r = [...n.data].map((e, t) => {
			let r = this._def.items[t] || this._def.rest;
			return r ? r._parse(new D(n, e, n.path, t)) : null;
		}).filter((e) => !!e);
		return n.common.async ? Promise.all(r).then((e) => C.mergeArray(t, e)) : C.mergeArray(t, r);
	}
	get items() {
		return this._def.items;
	}
	rest(t) {
		return new e({
			...this._def,
			rest: t
		});
	}
};
Ct.create = (e, t) => {
	if (!Array.isArray(e)) throw Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new Ct({
		items: e,
		typeName: j.ZodTuple,
		rest: null,
		...O(t)
	});
};
var wt = class e extends k {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== y.object) return S(n, {
			code: b.invalid_type,
			expected: y.object,
			received: n.parsedType
		}), w;
		let r = [], i = this._def.keyType, a = this._def.valueType;
		for (let e in n.data) r.push({
			key: i._parse(new D(n, e, n.path, e)),
			value: a._parse(new D(n, n.data[e], n.path, e)),
			alwaysSet: e in n.data
		});
		return n.common.async ? C.mergeObjectAsync(t, r) : C.mergeObjectSync(t, r);
	}
	get element() {
		return this._def.valueType;
	}
	static create(t, n, r) {
		return n instanceof k ? new e({
			keyType: t,
			valueType: n,
			typeName: j.ZodRecord,
			...O(r)
		}) : new e({
			keyType: rt.create(),
			valueType: t,
			typeName: j.ZodRecord,
			...O(n)
		});
	}
}, Tt = class extends k {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== y.map) return S(n, {
			code: b.invalid_type,
			expected: y.map,
			received: n.parsedType
		}), w;
		let r = this._def.keyType, i = this._def.valueType, a = [...n.data.entries()].map(([e, t], a) => ({
			key: r._parse(new D(n, e, n.path, [a, "key"])),
			value: i._parse(new D(n, t, n.path, [a, "value"]))
		}));
		if (n.common.async) {
			let e = /* @__PURE__ */ new Map();
			return Promise.resolve().then(async () => {
				for (let n of a) {
					let r = await n.key, i = await n.value;
					if (r.status === "aborted" || i.status === "aborted") return w;
					(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
				}
				return {
					status: t.value,
					value: e
				};
			});
		} else {
			let e = /* @__PURE__ */ new Map();
			for (let n of a) {
				let r = n.key, i = n.value;
				if (r.status === "aborted" || i.status === "aborted") return w;
				(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
			}
			return {
				status: t.value,
				value: e
			};
		}
	}
};
Tt.create = (e, t, n) => new Tt({
	valueType: t,
	keyType: e,
	typeName: j.ZodMap,
	...O(n)
});
var Et = class e extends k {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== y.set) return S(n, {
			code: b.invalid_type,
			expected: y.set,
			received: n.parsedType
		}), w;
		let r = this._def;
		r.minSize !== null && n.data.size < r.minSize.value && (S(n, {
			code: b.too_small,
			minimum: r.minSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.minSize.message
		}), t.dirty()), r.maxSize !== null && n.data.size > r.maxSize.value && (S(n, {
			code: b.too_big,
			maximum: r.maxSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.maxSize.message
		}), t.dirty());
		let i = this._def.valueType;
		function a(e) {
			let n = /* @__PURE__ */ new Set();
			for (let r of e) {
				if (r.status === "aborted") return w;
				r.status === "dirty" && t.dirty(), n.add(r.value);
			}
			return {
				status: t.value,
				value: n
			};
		}
		let o = [...n.data.values()].map((e, t) => i._parse(new D(n, e, n.path, t)));
		return n.common.async ? Promise.all(o).then((e) => a(e)) : a(o);
	}
	min(t, n) {
		return new e({
			...this._def,
			minSize: {
				value: t,
				message: E.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxSize: {
				value: t,
				message: E.toString(n)
			}
		});
	}
	size(e, t) {
		return this.min(e, t).max(e, t);
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
Et.create = (e, t) => new Et({
	valueType: e,
	minSize: null,
	maxSize: null,
	typeName: j.ZodSet,
	...O(t)
});
var Dt = class e extends k {
	constructor() {
		super(...arguments), this.validate = this.implement;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== y.function) return S(t, {
			code: b.invalid_type,
			expected: y.function,
			received: t.parsedType
		}), w;
		function n(e, n) {
			return Ee({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					Te(),
					Ce
				].filter((e) => !!e),
				issueData: {
					code: b.invalid_arguments,
					argumentsError: n
				}
			});
		}
		function r(e, n) {
			return Ee({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					Te(),
					Ce
				].filter((e) => !!e),
				issueData: {
					code: b.invalid_return_type,
					returnTypeError: n
				}
			});
		}
		let i = { errorMap: t.common.contextualErrorMap }, a = t.data;
		if (this._def.returns instanceof Nt) {
			let e = this;
			return T(async function(...t) {
				let o = new x([]), s = await e._def.args.parseAsync(t, i).catch((e) => {
					throw o.addIssue(n(t, e)), o;
				}), c = await Reflect.apply(a, this, s);
				return await e._def.returns._def.type.parseAsync(c, i).catch((e) => {
					throw o.addIssue(r(c, e)), o;
				});
			});
		} else {
			let e = this;
			return T(function(...t) {
				let o = e._def.args.safeParse(t, i);
				if (!o.success) throw new x([n(t, o.error)]);
				let s = Reflect.apply(a, this, o.data), c = e._def.returns.safeParse(s, i);
				if (!c.success) throw new x([r(s, c.error)]);
				return c.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...t) {
		return new e({
			...this._def,
			args: Ct.create(t).rest(pt.create())
		});
	}
	returns(t) {
		return new e({
			...this._def,
			returns: t
		});
	}
	implement(e) {
		return this.parse(e);
	}
	strictImplement(e) {
		return this.parse(e);
	}
	static create(t, n, r) {
		return new e({
			args: t || Ct.create([]).rest(pt.create()),
			returns: n || pt.create(),
			typeName: j.ZodFunction,
			...O(r)
		});
	}
}, Ot = class extends k {
	get schema() {
		return this._def.getter();
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return this._def.getter()._parse({
			data: t.data,
			path: t.path,
			parent: t
		});
	}
};
Ot.create = (e, t) => new Ot({
	getter: e,
	typeName: j.ZodLazy,
	...O(t)
});
var kt = class extends k {
	_parse(e) {
		if (e.data !== this._def.value) {
			let t = this._getOrReturnCtx(e);
			return S(t, {
				received: t.data,
				code: b.invalid_literal,
				expected: this._def.value
			}), w;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
	get value() {
		return this._def.value;
	}
};
kt.create = (e, t) => new kt({
	value: e,
	typeName: j.ZodLiteral,
	...O(t)
});
function At(e, t) {
	return new jt({
		values: e,
		typeName: j.ZodEnum,
		...O(t)
	});
}
var jt = class e extends k {
	_parse(e) {
		if (typeof e.data != "string") {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return S(t, {
				expected: v.joinValues(n),
				received: t.parsedType,
				code: b.invalid_type
			}), w;
		}
		if (this._cache ||= new Set(this._def.values), !this._cache.has(e.data)) {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return S(t, {
				received: t.data,
				code: b.invalid_enum_value,
				options: n
			}), w;
		}
		return T(e.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Values() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	extract(t, n = this._def) {
		return e.create(t, {
			...this._def,
			...n
		});
	}
	exclude(t, n = this._def) {
		return e.create(this.options.filter((e) => !t.includes(e)), {
			...this._def,
			...n
		});
	}
};
jt.create = At;
var Mt = class extends k {
	_parse(e) {
		let t = v.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
		if (n.parsedType !== y.string && n.parsedType !== y.number) {
			let e = v.objectValues(t);
			return S(n, {
				expected: v.joinValues(e),
				received: n.parsedType,
				code: b.invalid_type
			}), w;
		}
		if (this._cache ||= new Set(v.getValidEnumValues(this._def.values)), !this._cache.has(e.data)) {
			let e = v.objectValues(t);
			return S(n, {
				received: n.data,
				code: b.invalid_enum_value,
				options: e
			}), w;
		}
		return T(e.data);
	}
	get enum() {
		return this._def.values;
	}
};
Mt.create = (e, t) => new Mt({
	values: e,
	typeName: j.ZodNativeEnum,
	...O(t)
});
var Nt = class extends k {
	unwrap() {
		return this._def.type;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return t.parsedType !== y.promise && t.common.async === !1 ? (S(t, {
			code: b.invalid_type,
			expected: y.promise,
			received: t.parsedType
		}), w) : T((t.parsedType === y.promise ? t.data : Promise.resolve(t.data)).then((e) => this._def.type.parseAsync(e, {
			path: t.path,
			errorMap: t.common.contextualErrorMap
		})));
	}
};
Nt.create = (e, t) => new Nt({
	type: e,
	typeName: j.ZodPromise,
	...O(t)
});
var Pt = class extends k {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === j.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = this._def.effect || null, i = {
			addIssue: (e) => {
				S(n, e), e.fatal ? t.abort() : t.dirty();
			},
			get path() {
				return n.path;
			}
		};
		if (i.addIssue = i.addIssue.bind(i), r.type === "preprocess") {
			let e = r.transform(n.data, i);
			if (n.common.async) return Promise.resolve(e).then(async (e) => {
				if (t.value === "aborted") return w;
				let r = await this._def.schema._parseAsync({
					data: e,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? w : r.status === "dirty" || t.value === "dirty" ? De(r.value) : r;
			});
			{
				if (t.value === "aborted") return w;
				let r = this._def.schema._parseSync({
					data: e,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? w : r.status === "dirty" || t.value === "dirty" ? De(r.value) : r;
			}
		}
		if (r.type === "refinement") {
			let e = (e) => {
				let t = r.refinement(e, i);
				if (n.common.async) return Promise.resolve(t);
				if (t instanceof Promise) throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
				return e;
			};
			if (n.common.async === !1) {
				let r = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? w : (r.status === "dirty" && t.dirty(), e(r.value), {
					status: t.value,
					value: r.value
				});
			} else return this._def.schema._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			}).then((n) => n.status === "aborted" ? w : (n.status === "dirty" && t.dirty(), e(n.value).then(() => ({
				status: t.value,
				value: n.value
			}))));
		}
		if (r.type === "transform") if (n.common.async === !1) {
			let e = this._def.schema._parseSync({
				data: n.data,
				path: n.path,
				parent: n
			});
			if (!Ae(e)) return w;
			let a = r.transform(e.value, i);
			if (a instanceof Promise) throw Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
			return {
				status: t.value,
				value: a
			};
		} else return this._def.schema._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		}).then((e) => Ae(e) ? Promise.resolve(r.transform(e.value, i)).then((e) => ({
			status: t.value,
			value: e
		})) : w);
		v.assertNever(r);
	}
};
Pt.create = (e, t, n) => new Pt({
	schema: e,
	typeName: j.ZodEffects,
	effect: t,
	...O(n)
}), Pt.createWithPreprocess = (e, t, n) => new Pt({
	schema: t,
	effect: {
		type: "preprocess",
		transform: e
	},
	typeName: j.ZodEffects,
	...O(n)
});
var Ft = class extends k {
	_parse(e) {
		return this._getType(e) === y.undefined ? T(void 0) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
Ft.create = (e, t) => new Ft({
	innerType: e,
	typeName: j.ZodOptional,
	...O(t)
});
var It = class extends k {
	_parse(e) {
		return this._getType(e) === y.null ? T(null) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
It.create = (e, t) => new It({
	innerType: e,
	typeName: j.ZodNullable,
	...O(t)
});
var Lt = class extends k {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return t.parsedType === y.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
};
Lt.create = (e, t) => new Lt({
	innerType: e,
	typeName: j.ZodDefault,
	defaultValue: typeof t.default == "function" ? t.default : () => t.default,
	...O(t)
});
var Rt = class extends k {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = {
			...t,
			common: {
				...t.common,
				issues: []
			}
		}, r = this._def.innerType._parse({
			data: n.data,
			path: n.path,
			parent: { ...n }
		});
		return je(r) ? r.then((e) => ({
			status: "valid",
			value: e.status === "valid" ? e.value : this._def.catchValue({
				get error() {
					return new x(n.common.issues);
				},
				input: n.data
			})
		})) : {
			status: "valid",
			value: r.status === "valid" ? r.value : this._def.catchValue({
				get error() {
					return new x(n.common.issues);
				},
				input: n.data
			})
		};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
Rt.create = (e, t) => new Rt({
	innerType: e,
	typeName: j.ZodCatch,
	catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
	...O(t)
});
var zt = class extends k {
	_parse(e) {
		if (this._getType(e) !== y.nan) {
			let t = this._getOrReturnCtx(e);
			return S(t, {
				code: b.invalid_type,
				expected: y.nan,
				received: t.parsedType
			}), w;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
};
zt.create = (e) => new zt({
	typeName: j.ZodNaN,
	...O(e)
});
var Bt = class extends k {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return this._def.type._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	unwrap() {
		return this._def.type;
	}
}, Vt = class e extends k {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.common.async) return (async () => {
			let e = await this._def.in._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? w : e.status === "dirty" ? (t.dirty(), De(e.value)) : this._def.out._parseAsync({
				data: e.value,
				path: n.path,
				parent: n
			});
		})();
		{
			let e = this._def.in._parseSync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? w : e.status === "dirty" ? (t.dirty(), {
				status: "dirty",
				value: e.value
			}) : this._def.out._parseSync({
				data: e.value,
				path: n.path,
				parent: n
			});
		}
	}
	static create(t, n) {
		return new e({
			in: t,
			out: n,
			typeName: j.ZodPipeline
		});
	}
}, Ht = class extends k {
	_parse(e) {
		let t = this._def.innerType._parse(e), n = (e) => (Ae(e) && (e.value = Object.freeze(e.value)), e);
		return je(t) ? t.then((e) => n(e)) : n(t);
	}
	unwrap() {
		return this._def.innerType;
	}
};
Ht.create = (e, t) => new Ht({
	innerType: e,
	typeName: j.ZodReadonly,
	...O(t)
}), A.lazycreate;
var j;
(function(e) {
	e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(j ||= {});
var M = rt.create, Ut = at.create;
zt.create, ot.create;
var Wt = st.create;
ct.create, lt.create, ut.create, dt.create;
var N = ft.create;
pt.create, mt.create, ht.create;
var Gt = gt.create, P = A.create;
A.strictCreate;
var F = vt.create;
bt.create, St.create, Ct.create;
var Kt = wt.create;
Tt.create, Et.create, Dt.create, Ot.create, kt.create;
var I = jt.create;
Mt.create, Nt.create, Pt.create, Ft.create, It.create;
var L = Pt.createWithPreprocess;
Vt.create;
var R = {
	string: ((e) => rt.create({
		...e,
		coerce: !0
	})),
	number: ((e) => at.create({
		...e,
		coerce: !0
	})),
	boolean: ((e) => st.create({
		...e,
		coerce: !0
	})),
	bigint: ((e) => ot.create({
		...e,
		coerce: !0
	})),
	date: ((e) => ct.create({
		...e,
		coerce: !0
	}))
}, qt = class extends Error {
	constructor(e, t = "UNKNOWN_ERROR") {
		super(e), this.name = this.constructor.name, this.code = t, Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
	}
}, Jt = class extends qt {
	constructor(e, t, n) {
		super(e, "EXPRESSION_ERROR"), this.expression = t, this.details = n;
	}
};
//#endregion
//#region node_modules/.pnpm/@a2ui+web_core@0.9.2/node_modules/@a2ui/web_core/src/v0_9/catalog/types.js
function Yt(e) {
	return e && typeof e == "object" && "value" in e && "peek" in e;
}
function z(e, t) {
	return {
		name: e.name,
		returnType: e.returnType,
		schema: e.schema,
		execute: t
	};
}
//#endregion
//#region node_modules/.pnpm/@preact+signals-core@1.14.1/node_modules/@preact/signals-core/dist/signals-core.module.js
var Xt = Symbol.for("preact-signals");
function Zt() {
	if (tn > 1) tn--;
	else {
		var e, t = !1;
		for ((function() {
			var e = an;
			for (an = void 0; e !== void 0;) e.S.v === e.v && (e.S.i = e.i), e = e.o;
		})(); en !== void 0;) {
			var n = en;
			for (en = void 0, nn++; n !== void 0;) {
				var r = n.u;
				if (n.u = void 0, n.f &= -3, !(8 & n.f) && ln(n)) try {
					n.c();
				} catch (n) {
					t ||= (e = n, !0);
				}
				n = r;
			}
		}
		if (nn = 0, tn--, t) throw e;
	}
}
var B = void 0;
function Qt(e) {
	var t = B;
	B = void 0;
	try {
		return e();
	} finally {
		B = t;
	}
}
var $t, en = void 0, tn = 0, nn = 0, rn = 0, an = void 0, on = 0;
function sn(e) {
	if (B !== void 0) {
		var t = e.n;
		if (t === void 0 || t.t !== B) return t = {
			i: 0,
			S: e,
			p: B.s,
			n: void 0,
			t: B,
			e: void 0,
			x: void 0,
			r: t
		}, B.s !== void 0 && (B.s.n = t), B.s = t, e.n = t, 32 & B.f && e.S(t), t;
		if (t.i === -1) return t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = B.s, t.n = void 0, B.s.n = t, B.s = t), t;
	}
}
function V(e, t) {
	this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = t?.watched, this.Z = t?.unwatched, this.name = t?.name;
}
V.prototype.brand = Xt, V.prototype.h = function() {
	return !0;
}, V.prototype.S = function(e) {
	var t = this, n = this.t;
	n !== e && e.e === void 0 && (e.x = n, this.t = e, n === void 0 ? Qt(function() {
		var e;
		(e = t.W) == null || e.call(t);
	}) : n.e = e);
}, V.prototype.U = function(e) {
	var t = this;
	if (this.t !== void 0) {
		var n = e.e, r = e.x;
		n !== void 0 && (n.x = r, e.e = void 0), r !== void 0 && (r.e = n, e.x = void 0), e === this.t && (this.t = r, r === void 0 && Qt(function() {
			var e;
			(e = t.Z) == null || e.call(t);
		}));
	}
}, V.prototype.subscribe = function(e) {
	var t = this;
	return vn(function() {
		var n = t.value, r = B;
		B = void 0;
		try {
			e(n);
		} finally {
			B = r;
		}
	}, { name: "sub" });
}, V.prototype.valueOf = function() {
	return this.value;
}, V.prototype.toString = function() {
	return this.value + "";
}, V.prototype.toJSON = function() {
	return this.value;
}, V.prototype.peek = function() {
	var e = B;
	B = void 0;
	try {
		return this.value;
	} finally {
		B = e;
	}
}, Object.defineProperty(V.prototype, "value", {
	get: function() {
		var e = sn(this);
		return e !== void 0 && (e.i = this.i), this.v;
	},
	set: function(e) {
		if (e !== this.v) {
			if (nn > 100) throw Error("Cycle detected");
			(function(e) {
				tn !== 0 && nn === 0 && e.l !== rn && (e.l = rn, an = {
					S: e,
					v: e.v,
					i: e.i,
					o: an
				});
			})(this), this.v = e, this.i++, on++, tn++;
			try {
				for (var t = this.t; t !== void 0; t = t.x) t.t.N();
			} finally {
				Zt();
			}
		}
	}
});
function cn(e, t) {
	return new V(e, t);
}
function ln(e) {
	for (var t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
	return !1;
}
function un(e) {
	for (var t = e.s; t !== void 0; t = t.n) {
		var n = t.S.n;
		if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
			e.s = t;
			break;
		}
	}
}
function dn(e) {
	for (var t = e.s, n = void 0; t !== void 0;) {
		var r = t.p;
		t.i === -1 ? (t.S.U(t), r !== void 0 && (r.n = t.n), t.n !== void 0 && (t.n.p = r)) : n = t, t.S.n = t.r, t.r !== void 0 && (t.r = void 0), t = r;
	}
	e.s = n;
}
function fn(e, t) {
	V.call(this, void 0), this.x = e, this.s = void 0, this.g = on - 1, this.f = 4, this.W = t?.watched, this.Z = t?.unwatched, this.name = t?.name;
}
fn.prototype = new V(), fn.prototype.h = function() {
	if (this.f &= -3, 1 & this.f) return !1;
	if ((36 & this.f) == 32 || (this.f &= -5, this.g === on)) return !0;
	if (this.g = on, this.f |= 1, this.i > 0 && !ln(this)) return this.f &= -2, !0;
	var e = B;
	try {
		un(this), B = this;
		var t = this.x();
		(16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
	} catch (e) {
		this.v = e, this.f |= 16, this.i++;
	}
	return B = e, dn(this), this.f &= -2, !0;
}, fn.prototype.S = function(e) {
	if (this.t === void 0) {
		this.f |= 36;
		for (var t = this.s; t !== void 0; t = t.n) t.S.S(t);
	}
	V.prototype.S.call(this, e);
}, fn.prototype.U = function(e) {
	if (this.t !== void 0 && (V.prototype.U.call(this, e), this.t === void 0)) {
		this.f &= -33;
		for (var t = this.s; t !== void 0; t = t.n) t.S.U(t);
	}
}, fn.prototype.N = function() {
	if (!(2 & this.f)) {
		this.f |= 6;
		for (var e = this.t; e !== void 0; e = e.x) e.t.N();
	}
}, Object.defineProperty(fn.prototype, "value", { get: function() {
	if (1 & this.f) throw Error("Cycle detected");
	var e = sn(this);
	if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
	return this.v;
} });
function pn(e, t) {
	return new fn(e, t);
}
function mn(e) {
	var t = e.m;
	if (e.m = void 0, typeof t == "function") {
		tn++;
		var n = B;
		B = void 0;
		try {
			t();
		} catch (t) {
			throw e.f &= -2, e.f |= 8, hn(e), t;
		} finally {
			B = n, Zt();
		}
	}
}
function hn(e) {
	for (var t = e.s; t !== void 0; t = t.n) t.S.U(t);
	e.x = void 0, e.s = void 0, mn(e);
}
function gn(e) {
	if (B !== this) throw Error("Out-of-order effect");
	dn(this), B = e, this.f &= -2, 8 & this.f && hn(this), Zt();
}
function _n(e, t) {
	this.x = e, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = t?.name, $t && $t.push(this);
}
_n.prototype.c = function() {
	var e = this.S();
	try {
		if (8 & this.f || this.x === void 0) return;
		var t = this.x();
		typeof t == "function" && (this.m = t);
	} finally {
		e();
	}
}, _n.prototype.S = function() {
	if (1 & this.f) throw Error("Cycle detected");
	this.f |= 1, this.f &= -9, mn(this), un(this), tn++;
	var e = B;
	return B = this, gn.bind(this, e);
}, _n.prototype.N = function() {
	2 & this.f || (this.f |= 2, this.u = en, en = this);
}, _n.prototype.d = function() {
	this.f |= 8, 1 & this.f || hn(this);
}, _n.prototype.dispose = function() {
	this.d();
};
function vn(e, t) {
	var n = new _n(e, t);
	try {
		n.c();
	} catch (e) {
		throw n.d(), e;
	}
	var r = n.d.bind(n);
	return r[Symbol.dispose] = r, r;
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/Options.js
var yn = Symbol("Let zodToJsonSchema decide on which parser to use"), bn = {
	name: void 0,
	$refStrategy: "root",
	basePath: ["#"],
	effectStrategy: "input",
	pipeStrategy: "all",
	dateStrategy: "format:date-time",
	mapStrategy: "entries",
	removeAdditionalStrategy: "passthrough",
	allowedAdditionalProperties: !0,
	rejectedAdditionalProperties: !1,
	definitionPath: "definitions",
	target: "jsonSchema7",
	strictUnions: !1,
	definitions: {},
	errorMessages: !1,
	markdownDescription: !1,
	patternStrategy: "escape",
	applyRegexFlags: !1,
	emailStrategy: "format:email",
	base64Strategy: "contentEncoding:base64",
	nameStrategy: "ref",
	openAiAnyTypeName: "OpenAiAnyType"
}, xn = (e) => typeof e == "string" ? {
	...bn,
	name: e
} : {
	...bn,
	...e
}, Sn = (e) => {
	let t = xn(e), n = t.name === void 0 ? t.basePath : [
		...t.basePath,
		t.definitionPath,
		t.name
	];
	return {
		...t,
		flags: { hasReferencedOpenAiAnyType: !1 },
		currentPath: n,
		propertyPath: void 0,
		seen: new Map(Object.entries(t.definitions).map(([e, n]) => [n._def, {
			def: n._def,
			path: [
				...t.basePath,
				t.definitionPath,
				e
			],
			jsonSchema: void 0
		}]))
	};
};
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function Cn(e, t, n, r) {
	r?.errorMessages && n && (e.errorMessage = {
		...e.errorMessage,
		[t]: n
	});
}
function H(e, t, n, r, i) {
	e[t] = n, Cn(e, t, r, i);
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/getRelativePath.js
var wn = (e, t) => {
	let n = 0;
	for (; n < e.length && n < t.length && e[n] === t[n]; n++);
	return [(e.length - n).toString(), ...t.slice(n)].join("/");
};
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function U(e) {
	if (e.target !== "openAi") return {};
	let t = [
		...e.basePath,
		e.definitionPath,
		e.openAiAnyTypeName
	];
	return e.flags.hasReferencedOpenAiAnyType = !0, { $ref: e.$refStrategy === "relative" ? wn(t, e.currentPath) : t.join("/") };
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/array.js
function Tn(e, t) {
	let n = { type: "array" };
	return e.type?._def && e.type?._def?.typeName !== j.ZodAny && (n.items = q(e.type._def, {
		...t,
		currentPath: [...t.currentPath, "items"]
	})), e.minLength && H(n, "minItems", e.minLength.value, e.minLength.message, t), e.maxLength && H(n, "maxItems", e.maxLength.value, e.maxLength.message, t), e.exactLength && (H(n, "minItems", e.exactLength.value, e.exactLength.message, t), H(n, "maxItems", e.exactLength.value, e.exactLength.message, t)), n;
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function En(e, t) {
	let n = {
		type: "integer",
		format: "int64"
	};
	if (!e.checks) return n;
	for (let r of e.checks) switch (r.kind) {
		case "min":
			t.target === "jsonSchema7" ? r.inclusive ? H(n, "minimum", r.value, r.message, t) : H(n, "exclusiveMinimum", r.value, r.message, t) : (r.inclusive || (n.exclusiveMinimum = !0), H(n, "minimum", r.value, r.message, t));
			break;
		case "max":
			t.target === "jsonSchema7" ? r.inclusive ? H(n, "maximum", r.value, r.message, t) : H(n, "exclusiveMaximum", r.value, r.message, t) : (r.inclusive || (n.exclusiveMaximum = !0), H(n, "maximum", r.value, r.message, t));
			break;
		case "multipleOf":
			H(n, "multipleOf", r.value, r.message, t);
			break;
	}
	return n;
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function Dn() {
	return { type: "boolean" };
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function On(e, t) {
	return q(e.type._def, t);
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var kn = (e, t) => q(e.innerType._def, t);
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function An(e, t, n) {
	let r = n ?? t.dateStrategy;
	if (Array.isArray(r)) return { anyOf: r.map((n, r) => An(e, t, n)) };
	switch (r) {
		case "string":
		case "format:date-time": return {
			type: "string",
			format: "date-time"
		};
		case "format:date": return {
			type: "string",
			format: "date"
		};
		case "integer": return jn(e, t);
	}
}
var jn = (e, t) => {
	let n = {
		type: "integer",
		format: "unix-time"
	};
	if (t.target === "openApi3") return n;
	for (let r of e.checks) switch (r.kind) {
		case "min":
			H(n, "minimum", r.value, r.message, t);
			break;
		case "max":
			H(n, "maximum", r.value, r.message, t);
			break;
	}
	return n;
};
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function Mn(e, t) {
	return {
		...q(e.innerType._def, t),
		default: e.defaultValue()
	};
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function Nn(e, t) {
	return t.effectStrategy === "input" ? q(e.schema._def, t) : U(t);
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function Pn(e) {
	return {
		type: "string",
		enum: Array.from(e.values)
	};
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
var Fn = (e) => "type" in e && e.type === "string" ? !1 : "allOf" in e;
function In(e, t) {
	let n = [q(e.left._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"allOf",
			"0"
		]
	}), q(e.right._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"allOf",
			"1"
		]
	})].filter((e) => !!e), r = t.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0, i = [];
	return n.forEach((e) => {
		if (Fn(e)) i.push(...e.allOf), e.unevaluatedProperties === void 0 && (r = void 0);
		else {
			let t = e;
			if ("additionalProperties" in e && e.additionalProperties === !1) {
				let { additionalProperties: n, ...r } = e;
				t = r;
			} else r = void 0;
			i.push(t);
		}
	}), i.length ? {
		allOf: i,
		...r
	} : void 0;
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function Ln(e, t) {
	let n = typeof e.value;
	return n !== "bigint" && n !== "number" && n !== "boolean" && n !== "string" ? { type: Array.isArray(e.value) ? "array" : "object" } : t.target === "openApi3" ? {
		type: n === "bigint" ? "integer" : n,
		enum: [e.value]
	} : {
		type: n === "bigint" ? "integer" : n,
		const: e.value
	};
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/string.js
var Rn = void 0, W = {
	cuid: /^[cC][^\s-]{8,}$/,
	cuid2: /^[0-9a-z]+$/,
	ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
	email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
	emoji: () => (Rn === void 0 && (Rn = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), Rn),
	uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
	ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
	ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
	ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
	base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
	nanoid: /^[a-zA-Z0-9_-]{21}$/,
	jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function zn(e, t) {
	let n = { type: "string" };
	if (e.checks) for (let r of e.checks) switch (r.kind) {
		case "min":
			H(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, t);
			break;
		case "max":
			H(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, t);
			break;
		case "email":
			switch (t.emailStrategy) {
				case "format:email":
					G(n, "email", r.message, t);
					break;
				case "format:idn-email":
					G(n, "idn-email", r.message, t);
					break;
				case "pattern:zod":
					K(n, W.email, r.message, t);
					break;
			}
			break;
		case "url":
			G(n, "uri", r.message, t);
			break;
		case "uuid":
			G(n, "uuid", r.message, t);
			break;
		case "regex":
			K(n, r.regex, r.message, t);
			break;
		case "cuid":
			K(n, W.cuid, r.message, t);
			break;
		case "cuid2":
			K(n, W.cuid2, r.message, t);
			break;
		case "startsWith":
			K(n, RegExp(`^${Bn(r.value, t)}`), r.message, t);
			break;
		case "endsWith":
			K(n, RegExp(`${Bn(r.value, t)}$`), r.message, t);
			break;
		case "datetime":
			G(n, "date-time", r.message, t);
			break;
		case "date":
			G(n, "date", r.message, t);
			break;
		case "time":
			G(n, "time", r.message, t);
			break;
		case "duration":
			G(n, "duration", r.message, t);
			break;
		case "length":
			H(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, t), H(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, t);
			break;
		case "includes":
			K(n, RegExp(Bn(r.value, t)), r.message, t);
			break;
		case "ip":
			r.version !== "v6" && G(n, "ipv4", r.message, t), r.version !== "v4" && G(n, "ipv6", r.message, t);
			break;
		case "base64url":
			K(n, W.base64url, r.message, t);
			break;
		case "jwt":
			K(n, W.jwt, r.message, t);
			break;
		case "cidr":
			r.version !== "v6" && K(n, W.ipv4Cidr, r.message, t), r.version !== "v4" && K(n, W.ipv6Cidr, r.message, t);
			break;
		case "emoji":
			K(n, W.emoji(), r.message, t);
			break;
		case "ulid":
			K(n, W.ulid, r.message, t);
			break;
		case "base64":
			switch (t.base64Strategy) {
				case "format:binary":
					G(n, "binary", r.message, t);
					break;
				case "contentEncoding:base64":
					H(n, "contentEncoding", "base64", r.message, t);
					break;
				case "pattern:zod":
					K(n, W.base64, r.message, t);
					break;
			}
			break;
		case "nanoid": K(n, W.nanoid, r.message, t);
		case "toLowerCase":
		case "toUpperCase":
		case "trim": break;
		default: ((e) => {})(r);
	}
	return n;
}
function Bn(e, t) {
	return t.patternStrategy === "escape" ? Hn(e) : e;
}
var Vn = /* @__PURE__ */ new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function Hn(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) Vn.has(e[n]) || (t += "\\"), t += e[n];
	return t;
}
function G(e, t, n, r) {
	e.format || e.anyOf?.some((e) => e.format) ? (e.anyOf ||= [], e.format && (e.anyOf.push({
		format: e.format,
		...e.errorMessage && r.errorMessages && { errorMessage: { format: e.errorMessage.format } }
	}), delete e.format, e.errorMessage && (delete e.errorMessage.format, Object.keys(e.errorMessage).length === 0 && delete e.errorMessage)), e.anyOf.push({
		format: t,
		...n && r.errorMessages && { errorMessage: { format: n } }
	})) : H(e, "format", t, n, r);
}
function K(e, t, n, r) {
	e.pattern || e.allOf?.some((e) => e.pattern) ? (e.allOf ||= [], e.pattern && (e.allOf.push({
		pattern: e.pattern,
		...e.errorMessage && r.errorMessages && { errorMessage: { pattern: e.errorMessage.pattern } }
	}), delete e.pattern, e.errorMessage && (delete e.errorMessage.pattern, Object.keys(e.errorMessage).length === 0 && delete e.errorMessage)), e.allOf.push({
		pattern: Un(t, r),
		...n && r.errorMessages && { errorMessage: { pattern: n } }
	})) : H(e, "pattern", Un(t, r), n, r);
}
function Un(e, t) {
	if (!t.applyRegexFlags || !e.flags) return e.source;
	let n = {
		i: e.flags.includes("i"),
		m: e.flags.includes("m"),
		s: e.flags.includes("s")
	}, r = n.i ? e.source.toLowerCase() : e.source, i = "", a = !1, o = !1, s = !1;
	for (let e = 0; e < r.length; e++) {
		if (a) {
			i += r[e], a = !1;
			continue;
		}
		if (n.i) {
			if (o) {
				if (r[e].match(/[a-z]/)) {
					s ? (i += r[e], i += `${r[e - 2]}-${r[e]}`.toUpperCase(), s = !1) : r[e + 1] === "-" && r[e + 2]?.match(/[a-z]/) ? (i += r[e], s = !0) : i += `${r[e]}${r[e].toUpperCase()}`;
					continue;
				}
			} else if (r[e].match(/[a-z]/)) {
				i += `[${r[e]}${r[e].toUpperCase()}]`;
				continue;
			}
		}
		if (n.m) {
			if (r[e] === "^") {
				i += "(^|(?<=[\r\n]))";
				continue;
			} else if (r[e] === "$") {
				i += "($|(?=[\r\n]))";
				continue;
			}
		}
		if (n.s && r[e] === ".") {
			i += o ? `${r[e]}\r\n` : `[${r[e]}\r\n]`;
			continue;
		}
		i += r[e], r[e] === "\\" ? a = !0 : o && r[e] === "]" ? o = !1 : !o && r[e] === "[" && (o = !0);
	}
	try {
		new RegExp(i);
	} catch {
		return console.warn(`Could not convert regex pattern at ${t.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`), e.source;
	}
	return i;
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function Wn(e, t) {
	if (t.target === "openAi" && console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."), t.target === "openApi3" && e.keyType?._def.typeName === j.ZodEnum) return {
		type: "object",
		required: e.keyType._def.values,
		properties: e.keyType._def.values.reduce((n, r) => ({
			...n,
			[r]: q(e.valueType._def, {
				...t,
				currentPath: [
					...t.currentPath,
					"properties",
					r
				]
			}) ?? U(t)
		}), {}),
		additionalProperties: t.rejectedAdditionalProperties
	};
	let n = {
		type: "object",
		additionalProperties: q(e.valueType._def, {
			...t,
			currentPath: [...t.currentPath, "additionalProperties"]
		}) ?? t.allowedAdditionalProperties
	};
	if (t.target === "openApi3") return n;
	if (e.keyType?._def.typeName === j.ZodString && e.keyType._def.checks?.length) {
		let { type: r, ...i } = zn(e.keyType._def, t);
		return {
			...n,
			propertyNames: i
		};
	} else if (e.keyType?._def.typeName === j.ZodEnum) return {
		...n,
		propertyNames: { enum: e.keyType._def.values }
	};
	else if (e.keyType?._def.typeName === j.ZodBranded && e.keyType._def.type._def.typeName === j.ZodString && e.keyType._def.type._def.checks?.length) {
		let { type: r, ...i } = On(e.keyType._def, t);
		return {
			...n,
			propertyNames: i
		};
	}
	return n;
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function Gn(e, t) {
	return t.mapStrategy === "record" ? Wn(e, t) : {
		type: "array",
		maxItems: 125,
		items: {
			type: "array",
			items: [q(e.keyType._def, {
				...t,
				currentPath: [
					...t.currentPath,
					"items",
					"items",
					"0"
				]
			}) || U(t), q(e.valueType._def, {
				...t,
				currentPath: [
					...t.currentPath,
					"items",
					"items",
					"1"
				]
			}) || U(t)],
			minItems: 2,
			maxItems: 2
		}
	};
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function Kn(e) {
	let t = e.values, n = Object.keys(e.values).filter((e) => typeof t[t[e]] != "number").map((e) => t[e]), r = Array.from(new Set(n.map((e) => typeof e)));
	return {
		type: r.length === 1 ? r[0] === "string" ? "string" : "number" : ["string", "number"],
		enum: n
	};
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function qn(e) {
	return e.target === "openAi" ? void 0 : { not: U({
		...e,
		currentPath: [...e.currentPath, "not"]
	}) };
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function Jn(e) {
	return e.target === "openApi3" ? {
		enum: ["null"],
		nullable: !0
	} : { type: "null" };
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/union.js
var Yn = {
	ZodString: "string",
	ZodNumber: "number",
	ZodBigInt: "integer",
	ZodBoolean: "boolean",
	ZodNull: "null"
};
function Xn(e, t) {
	if (t.target === "openApi3") return Zn(e, t);
	let n = e.options instanceof Map ? Array.from(e.options.values()) : e.options;
	if (n.every((e) => e._def.typeName in Yn && (!e._def.checks || !e._def.checks.length))) {
		let e = n.reduce((e, t) => {
			let n = Yn[t._def.typeName];
			return n && !e.includes(n) ? [...e, n] : e;
		}, []);
		return { type: e.length > 1 ? e : e[0] };
	} else if (n.every((e) => e._def.typeName === "ZodLiteral" && !e.description)) {
		let e = n.reduce((e, t) => {
			let n = typeof t._def.value;
			switch (n) {
				case "string":
				case "number":
				case "boolean": return [...e, n];
				case "bigint": return [...e, "integer"];
				case "object": if (t._def.value === null) return [...e, "null"];
				default: return e;
			}
		}, []);
		if (e.length === n.length) {
			let t = e.filter((e, t, n) => n.indexOf(e) === t);
			return {
				type: t.length > 1 ? t : t[0],
				enum: n.reduce((e, t) => e.includes(t._def.value) ? e : [...e, t._def.value], [])
			};
		}
	} else if (n.every((e) => e._def.typeName === "ZodEnum")) return {
		type: "string",
		enum: n.reduce((e, t) => [...e, ...t._def.values.filter((t) => !e.includes(t))], [])
	};
	return Zn(e, t);
}
var Zn = (e, t) => {
	let n = (e.options instanceof Map ? Array.from(e.options.values()) : e.options).map((e, n) => q(e._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"anyOf",
			`${n}`
		]
	})).filter((e) => !!e && (!t.strictUnions || typeof e == "object" && Object.keys(e).length > 0));
	return n.length ? { anyOf: n } : void 0;
};
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function Qn(e, t) {
	if ([
		"ZodString",
		"ZodNumber",
		"ZodBigInt",
		"ZodBoolean",
		"ZodNull"
	].includes(e.innerType._def.typeName) && (!e.innerType._def.checks || !e.innerType._def.checks.length)) return t.target === "openApi3" ? {
		type: Yn[e.innerType._def.typeName],
		nullable: !0
	} : { type: [Yn[e.innerType._def.typeName], "null"] };
	if (t.target === "openApi3") {
		let n = q(e.innerType._def, {
			...t,
			currentPath: [...t.currentPath]
		});
		return n && "$ref" in n ? {
			allOf: [n],
			nullable: !0
		} : n && {
			...n,
			nullable: !0
		};
	}
	let n = q(e.innerType._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"anyOf",
			"0"
		]
	});
	return n && { anyOf: [n, { type: "null" }] };
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function $n(e, t) {
	let n = { type: "number" };
	if (!e.checks) return n;
	for (let r of e.checks) switch (r.kind) {
		case "int":
			n.type = "integer", Cn(n, "type", r.message, t);
			break;
		case "min":
			t.target === "jsonSchema7" ? r.inclusive ? H(n, "minimum", r.value, r.message, t) : H(n, "exclusiveMinimum", r.value, r.message, t) : (r.inclusive || (n.exclusiveMinimum = !0), H(n, "minimum", r.value, r.message, t));
			break;
		case "max":
			t.target === "jsonSchema7" ? r.inclusive ? H(n, "maximum", r.value, r.message, t) : H(n, "exclusiveMaximum", r.value, r.message, t) : (r.inclusive || (n.exclusiveMaximum = !0), H(n, "maximum", r.value, r.message, t));
			break;
		case "multipleOf":
			H(n, "multipleOf", r.value, r.message, t);
			break;
	}
	return n;
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function er(e, t) {
	let n = t.target === "openAi", r = {
		type: "object",
		properties: {}
	}, i = [], a = e.shape();
	for (let e in a) {
		let o = a[e];
		if (o === void 0 || o._def === void 0) continue;
		let s = nr(o);
		s && n && (o._def.typeName === "ZodOptional" && (o = o._def.innerType), o.isNullable() || (o = o.nullable()), s = !1);
		let c = q(o._def, {
			...t,
			currentPath: [
				...t.currentPath,
				"properties",
				e
			],
			propertyPath: [
				...t.currentPath,
				"properties",
				e
			]
		});
		c !== void 0 && (r.properties[e] = c, s || i.push(e));
	}
	i.length && (r.required = i);
	let o = tr(e, t);
	return o !== void 0 && (r.additionalProperties = o), r;
}
function tr(e, t) {
	if (e.catchall._def.typeName !== "ZodNever") return q(e.catchall._def, {
		...t,
		currentPath: [...t.currentPath, "additionalProperties"]
	});
	switch (e.unknownKeys) {
		case "passthrough": return t.allowedAdditionalProperties;
		case "strict": return t.rejectedAdditionalProperties;
		case "strip": return t.removeAdditionalStrategy === "strict" ? t.allowedAdditionalProperties : t.rejectedAdditionalProperties;
	}
}
function nr(e) {
	try {
		return e.isOptional();
	} catch {
		return !0;
	}
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var rr = (e, t) => {
	if (t.currentPath.toString() === t.propertyPath?.toString()) return q(e.innerType._def, t);
	let n = q(e.innerType._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"anyOf",
			"1"
		]
	});
	return n ? { anyOf: [{ not: U(t) }, n] } : U(t);
}, ir = (e, t) => {
	if (t.pipeStrategy === "input") return q(e.in._def, t);
	if (t.pipeStrategy === "output") return q(e.out._def, t);
	let n = q(e.in._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"allOf",
			"0"
		]
	});
	return { allOf: [n, q(e.out._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"allOf",
			n ? "1" : "0"
		]
	})].filter((e) => e !== void 0) };
};
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function ar(e, t) {
	return q(e.type._def, t);
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function or(e, t) {
	let n = {
		type: "array",
		uniqueItems: !0,
		items: q(e.valueType._def, {
			...t,
			currentPath: [...t.currentPath, "items"]
		})
	};
	return e.minSize && H(n, "minItems", e.minSize.value, e.minSize.message, t), e.maxSize && H(n, "maxItems", e.maxSize.value, e.maxSize.message, t), n;
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function sr(e, t) {
	return e.rest ? {
		type: "array",
		minItems: e.items.length,
		items: e.items.map((e, n) => q(e._def, {
			...t,
			currentPath: [
				...t.currentPath,
				"items",
				`${n}`
			]
		})).reduce((e, t) => t === void 0 ? e : [...e, t], []),
		additionalItems: q(e.rest._def, {
			...t,
			currentPath: [...t.currentPath, "additionalItems"]
		})
	} : {
		type: "array",
		minItems: e.items.length,
		maxItems: e.items.length,
		items: e.items.map((e, n) => q(e._def, {
			...t,
			currentPath: [
				...t.currentPath,
				"items",
				`${n}`
			]
		})).reduce((e, t) => t === void 0 ? e : [...e, t], [])
	};
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function cr(e) {
	return { not: U(e) };
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function lr(e) {
	return U(e);
}
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var ur = (e, t) => q(e.innerType._def, t), dr = (e, t, n) => {
	switch (t) {
		case j.ZodString: return zn(e, n);
		case j.ZodNumber: return $n(e, n);
		case j.ZodObject: return er(e, n);
		case j.ZodBigInt: return En(e, n);
		case j.ZodBoolean: return Dn();
		case j.ZodDate: return An(e, n);
		case j.ZodUndefined: return cr(n);
		case j.ZodNull: return Jn(n);
		case j.ZodArray: return Tn(e, n);
		case j.ZodUnion:
		case j.ZodDiscriminatedUnion: return Xn(e, n);
		case j.ZodIntersection: return In(e, n);
		case j.ZodTuple: return sr(e, n);
		case j.ZodRecord: return Wn(e, n);
		case j.ZodLiteral: return Ln(e, n);
		case j.ZodEnum: return Pn(e);
		case j.ZodNativeEnum: return Kn(e);
		case j.ZodNullable: return Qn(e, n);
		case j.ZodOptional: return rr(e, n);
		case j.ZodMap: return Gn(e, n);
		case j.ZodSet: return or(e, n);
		case j.ZodLazy: return () => e.getter()._def;
		case j.ZodPromise: return ar(e, n);
		case j.ZodNaN:
		case j.ZodNever: return qn(n);
		case j.ZodEffects: return Nn(e, n);
		case j.ZodAny: return U(n);
		case j.ZodUnknown: return lr(n);
		case j.ZodDefault: return Mn(e, n);
		case j.ZodBranded: return On(e, n);
		case j.ZodReadonly: return ur(e, n);
		case j.ZodCatch: return kn(e, n);
		case j.ZodPipeline: return ir(e, n);
		case j.ZodFunction:
		case j.ZodVoid:
		case j.ZodSymbol: return;
		default: return ((e) => void 0)(t);
	}
};
//#endregion
//#region node_modules/.pnpm/zod-to-json-schema@3.25.2_zod@3.25.76/node_modules/zod-to-json-schema/dist/esm/parseDef.js
function q(e, t, n = !1) {
	let r = t.seen.get(e);
	if (t.override) {
		let i = t.override?.(e, t, r, n);
		if (i !== yn) return i;
	}
	if (r && !n) {
		let e = fr(r, t);
		if (e !== void 0) return e;
	}
	let i = {
		def: e,
		path: t.currentPath,
		jsonSchema: void 0
	};
	t.seen.set(e, i);
	let a = dr(e, e.typeName, t), o = typeof a == "function" ? q(a(), t) : a;
	if (o && pr(e, t, o), t.postProcess) {
		let n = t.postProcess(o, e, t);
		return i.jsonSchema = o, n;
	}
	return i.jsonSchema = o, o;
}
var fr = (e, t) => {
	switch (t.$refStrategy) {
		case "root": return { $ref: e.path.join("/") };
		case "relative": return { $ref: wn(t.currentPath, e.path) };
		case "none":
		case "seen": return e.path.length < t.currentPath.length && e.path.every((e, n) => t.currentPath[n] === e) ? (console.warn(`Recursive reference detected at ${t.currentPath.join("/")}! Defaulting to any`), U(t)) : t.$refStrategy === "seen" ? U(t) : void 0;
	}
}, pr = (e, t, n) => (e.description && (n.description = e.description, t.markdownDescription && (n.markdownDescription = e.description)), n), mr = (e, t) => {
	let n = Sn(t), r = typeof t == "object" && t.definitions ? Object.entries(t.definitions).reduce((e, [t, r]) => ({
		...e,
		[t]: q(r._def, {
			...n,
			currentPath: [
				...n.basePath,
				n.definitionPath,
				t
			]
		}, !0) ?? U(n)
	}), {}) : void 0, i = typeof t == "string" ? t : t?.nameStrategy === "title" ? void 0 : t?.name, a = q(e._def, i === void 0 ? n : {
		...n,
		currentPath: [
			...n.basePath,
			n.definitionPath,
			i
		]
	}, !1) ?? U(n), o = typeof t == "object" && t.name !== void 0 && t.nameStrategy === "title" ? t.name : void 0;
	o !== void 0 && (a.title = o), n.flags.hasReferencedOpenAiAnyType && (r ||= {}, r[n.openAiAnyTypeName] || (r[n.openAiAnyTypeName] = {
		type: [
			"string",
			"number",
			"integer",
			"boolean",
			"array",
			"null"
		],
		items: { $ref: n.$refStrategy === "relative" ? "1" : [
			...n.basePath,
			n.definitionPath,
			n.openAiAnyTypeName
		].join("/") }
	}));
	let s = i === void 0 ? r ? {
		...a,
		[n.definitionPath]: r
	} : a : {
		$ref: [
			...n.$refStrategy === "relative" ? [] : n.basePath,
			n.definitionPath,
			i
		].join("/"),
		[n.definitionPath]: {
			...r,
			[i]: a
		}
	};
	return n.target === "jsonSchema7" ? s.$schema = "http://json-schema.org/draft-07/schema#" : (n.target === "jsonSchema2019-09" || n.target === "openAi") && (s.$schema = "https://json-schema.org/draft/2019-09/schema#"), n.target === "openAi" && ("anyOf" in s || "oneOf" in s || "allOf" in s || "type" in s && Array.isArray(s.type)) && console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property."), s;
}, hr = class e {
	constructor(e, t) {
		this.surface = e, this.path = t, this.dataModel = e.dataModel, this.functionInvoker = e.catalog.invoker;
	}
	set(e, t) {
		let n = this.resolvePath(e);
		this.dataModel.set(n, t);
	}
	resolveDynamicValue(e) {
		if (typeof e != "object" || !e || Array.isArray(e)) return e;
		if ("path" in e) {
			let t = this.resolvePath(e.path);
			return this.dataModel.get(t);
		}
		if ("call" in e) {
			let t = e, n = {};
			for (let [e, r] of Object.entries(t.args)) n[e] = this.resolveDynamicValue(r);
			let r = new AbortController(), i = this.evaluateFunctionReactive(t.call, n, r.signal);
			return i === void 0 ? void 0 : Yt(i) ? i.peek() : i;
		}
		return e;
	}
	subscribeDynamicValue(e, t) {
		let n = this.resolveSignal(e), r = !0, i = n.peek(), a = vn(() => {
			let e = n.value;
			i = e, r || t(e);
		});
		return r = !1, {
			get value() {
				return i;
			},
			unsubscribe: () => {
				a(), n.unsubscribe && n.unsubscribe();
			}
		};
	}
	resolveSignal(e) {
		if (typeof e != "object" || !e || Array.isArray(e)) return cn(e);
		if ("path" in e) {
			let t = this.resolvePath(e.path);
			return this.dataModel.getSignal(t);
		}
		if ("call" in e) {
			let t = e, n = {};
			for (let [e, r] of Object.entries(t.args)) n[e] = this.resolveSignal(r);
			if (Object.keys(n).length === 0) {
				let e = new AbortController(), n = this.evaluateFunctionReactive(t.call, {}, e.signal), r = n instanceof V ? n : cn(n);
				return r.unsubscribe = () => e.abort(), r;
			}
			let r = Object.keys(n), i = cn(void 0), a, o, s = pn(() => {
				let e = {};
				for (let t = 0; t < r.length; t++) e[r[t]] = n[r[t]].value;
				return e;
			}), c = vn(() => {
				try {
					let e = s.value;
					a && a.abort(), o &&= (o(), void 0), a = new AbortController();
					let n = this.evaluateFunctionReactive(t.call, e, a.signal);
					Yt(n) ? o = vn(() => {
						i.value = n.value;
					}) : i.value = n;
				} catch (e) {
					this.dispatchExpressionError(e, t.call), i.value = void 0;
				}
			});
			return i.unsubscribe = () => {
				c(), o && o(), a && a.abort();
				for (let e = 0; e < r.length; e++) {
					let t = n[r[e]];
					t.unsubscribe && t.unsubscribe();
				}
			}, i;
		}
		return cn(e);
	}
	resolveAction(e) {
		if ("event" in e) {
			let t = {};
			if (e.event.context) for (let [n, r] of Object.entries(e.event.context)) t[n] = this.resolveDynamicValue(r);
			return { event: {
				...e.event,
				context: t
			} };
		}
		return "functionCall" in e ? this.resolveDynamicValue(e.functionCall) : e;
	}
	evaluateFunctionReactive(e, t, n) {
		try {
			return this.functionInvoker(e, t, this, n);
		} catch (t) {
			this.dispatchExpressionError(t, e);
			return;
		}
	}
	dispatchExpressionError(e, t) {
		if (e?.name === "ZodError" || e instanceof x) {
			let n = new Jt(`Validation failed for function '${t}': ${e.message}`, t, e.errors ?? e.issues);
			this.surface.dispatchError({
				code: "EXPRESSION_ERROR",
				message: n.message,
				expression: t,
				details: n.details
			});
		} else e instanceof Jt ? this.surface.dispatchError({
			code: "EXPRESSION_ERROR",
			message: e.message,
			expression: e.expression,
			details: e.details
		}) : this.surface.dispatchError({
			code: "EXPRESSION_ERROR",
			message: e.message ?? `An unexpected error occurred in function ${t}.`,
			expression: t,
			details: { stack: e.stack }
		});
	}
	nested(t) {
		let n = this.resolvePath(t);
		return new e(this.surface, n);
	}
	resolvePath(e) {
		if (e.startsWith("/")) return e;
		if (e === "" || e === ".") return this.path;
		let t = this.path;
		return t.endsWith("/") && t.length > 1 && (t = t.slice(0, -1)), t === "/" && (t = ""), `${t}/${e}`;
	}
}, gr = P({ path: M().describe("A JSON Pointer path to a value in the data model.") }).describe("REF:common_types.json#/$defs/DataBinding|A JSON Pointer path to a value in the data model."), _r = P({
	call: M().describe("The name of the function to call."),
	args: Kt(N()).describe("Arguments passed to the function."),
	returnType: I([
		"string",
		"number",
		"boolean",
		"array",
		"object",
		"any",
		"void"
	]).default("boolean")
}).describe("REF:common_types.json#/$defs/FunctionCall|Invokes a named function on the client."), vr = F([
	Wt(),
	gr,
	_r
]).describe("REF:common_types.json#/$defs/DynamicBoolean|A boolean value that can be a literal, a path, or a function call returning a boolean."), J = F([
	M(),
	gr,
	_r
]).describe("REF:common_types.json#/$defs/DynamicString|Represents a string"), yr = F([
	Ut(),
	gr,
	_r
]).describe("REF:common_types.json#/$defs/DynamicNumber|Represents a value that can be either a literal number, a path to a number in the data model, or a function call returning a number."), br = F([
	Gt(M()),
	gr,
	_r
]).describe("REF:common_types.json#/$defs/DynamicStringList|Represents a value that can be either a literal array of strings, a path to a string array in the data model, or a function call returning a string array."), xr = F([
	M(),
	Ut(),
	Wt(),
	Gt(N()),
	gr,
	_r
]).describe("REF:common_types.json#/$defs/DynamicValue|A value that can be a literal, a path, or a function call returning any type."), Sr = M().describe("REF:common_types.json#/$defs/ComponentId|The unique identifier for a component."), Cr = F([Gt(Sr).describe("A static list of child component IDs."), P({
	componentId: Sr,
	path: M().describe("The path to the list of component property objects in the data model.")
}).describe("A template for generating a dynamic list of children.")]).describe("REF:common_types.json#/$defs/ChildList"), wr = F([P({ event: P({
	name: M(),
	context: Kt(xr).optional()
}) }).describe("Triggers a server-side event."), P({ functionCall: _r }).describe("Executes a local client-side function.")]).describe("REF:common_types.json#/$defs/Action"), Tr = P({ checks: Gt(P({
	condition: vr,
	message: M().describe("The error message to display if the check fails.")
}).describe("REF:common_types.json#/$defs/CheckRule|A check rule consisting of a condition and an error message.")).optional().describe("A list of checks to perform.") }).describe("REF:common_types.json#/$defs/Checkable|Properties for components that support client-side checks."), Er = P({
	label: J.optional().describe("REF:common_types.json#/$defs/DynamicString|A short string used by assistive technologies to convey the purpose of an element."),
	description: J.optional().describe("REF:common_types.json#/$defs/DynamicString|Additional information provided by assistive technologies about an element.")
}).describe("REF:common_types.json#/$defs/AccessibilityAttributes|Attributes to enhance accessibility.");
P({
	component: M().describe("The type name of the component."),
	id: Sr.optional(),
	weight: Ut().optional()
}).passthrough().describe("A generic A2UI component definition.");
//#endregion
//#region src/composables/useA2UI.ts
var Dr = Symbol("A2UI_CONTEXT_KEY");
function Y() {
	let e = l(Dr);
	if (!e) throw Error("useA2UI must be used within an A2UIProvider");
	let n = e.processor?.model?.getSurface(e.surfaceId), r = t(() => {
		if (!(!n?.dataModel || !n?.catalog)) return new hr(n, e.dataContextPath || "/");
	}), i = (e) => !r.value || e === void 0 ? e : r.value.resolveDynamicValue(e), a = (e) => {
		if (!e || typeof e != "object") return e;
		let t = {};
		for (let n in e) t[n] = i(e[n]);
		return t;
	}, o = (e) => {
		if (Array.isArray(e)) return e.map((e) => typeof e == "string" ? { id: e } : e && typeof e == "object" && e.id ? { id: e.id } : e);
		if (e && typeof e == "object" && e.path && e.componentId && r.value) {
			let t = i({ path: e.path });
			if (Array.isArray(t)) {
				let n = r.value.nested(e.path);
				return t.map((t, r) => ({
					id: e.componentId,
					path: n.nested(String(r)).path
				}));
			}
		}
		return [];
	}, s = (t, r, i) => {
		let o = i ? a(i) : {}, s = { event: {
			name: t,
			context: o
		} };
		n && typeof n.dispatchAction == "function" ? n.dispatchAction(s, r) : e.onAction({
			name: t,
			sourceComponentId: r,
			surfaceId: e.surfaceId,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			context: o
		});
	};
	return {
		surfaceId: e.surfaceId,
		dataContextPath: e.dataContextPath,
		dataContext: r,
		resolveValue: i,
		resolveDynamicChildren: o,
		sendAction: s,
		dispatchNodeAction: (e, t) => {
			let n = i(e.properties.action);
			if (n) {
				if ("event" in n) {
					let r = {
						...n.event.context || {},
						...t || {}
					};
					s(n.event.name, e.id, r);
					return;
				}
				"functionCall" in n && r.value?.resolveAction(n);
			}
		},
		setData: (e, t) => {
			r.value?.set(e, t);
		}
	};
}
//#endregion
//#region src/composables/A2UIProvider.vue
var Or = /* @__PURE__ */ c({
	__name: "A2UIProvider",
	props: {
		processor: {},
		surfaceId: {},
		onAction: { type: Function }
	},
	setup(e) {
		let n = e, r = ae(0), a = () => {
			r.value++;
		};
		ee(() => {
			typeof n.processor?.addEventListener == "function" && n.processor.addEventListener("update", a);
		}), f(() => {
			typeof n.processor?.removeEventListener == "function" && n.processor.removeEventListener("update", a);
		});
		let o = t(() => n.processor?.model?.getSurface(n.surfaceId)), s = t(() => {
			let e = o.value?.theme ?? {};
			return {
				"--a2ui-primary-color": e.primaryColor ?? "",
				"--a2ui-error-color": e.errorColor ?? "",
				"--a2ui-background-color": e.backgroundColor ?? "",
				"--a2ui-surface-color": e.surfaceColor ?? ""
			};
		});
		return te(Dr, {
			get surfaceId() {
				return n.surfaceId;
			},
			get processor() {
				return n.processor;
			},
			onAction: (e) => {
				n.onAction?.(e);
			}
		}), (e, t) => (p(), i("div", {
			key: r.value,
			class: "a2ui-provider",
			style: d(s.value)
		}, [re(e.$slots, "default")], 4));
	}
}), kr = Symbol("A2UI_REGISTRY_KEY"), Ar = class {
	catalogs = /* @__PURE__ */ new Map();
	apis = /* @__PURE__ */ new Map();
	register(e, t, n, r) {
		this.catalogs.has(e) || (this.catalogs.set(e, /* @__PURE__ */ new Map()), this.apis.set(e, /* @__PURE__ */ new Map())), this.catalogs.get(e).set(t, n), r && this.apis.get(e).set(t, r);
	}
	registerAll(e, t, n) {
		this.catalogs.has(e) || (this.catalogs.set(e, /* @__PURE__ */ new Map()), this.apis.set(e, /* @__PURE__ */ new Map()));
		let r = this.catalogs.get(e);
		for (let [e, n] of Object.entries(t)) r.set(e, n);
		if (n) {
			let t = this.apis.get(e);
			for (let [e, r] of Object.entries(n)) t.set(e, r);
		}
	}
	get(e, t) {
		return this.catalogs.get(e)?.get(t);
	}
	getApi(e, t) {
		return this.apis.get(e)?.get(t);
	}
	has(e, t) {
		return this.catalogs.get(e)?.has(t) ?? !1;
	}
	keys(e) {
		let t = this.catalogs.get(e);
		return t ? Array.from(t.keys()) : [];
	}
}, jr = new Ar(), Mr = "https://a2ui.org/specification/v0_9/basic_catalog.json", Nr = "urn:a2ui:catalog:vant:v1", Pr = Nr, Fr = {
	key: 1,
	style: {
		border: "2px solid orange",
		color: "orange",
		padding: "10px"
	}
}, Ir = { style: { "font-size": "10px" } }, Lr = { style: { "font-size": "10px" } }, X = /* @__PURE__ */ c({
	__name: "ComponentNode",
	props: {
		id: {},
		path: {}
	},
	setup(r) {
		let s = r, c = l(Dr), d = l(kr, jr);
		c && s.path !== void 0 && te(Dr, {
			...c,
			dataContextPath: s.path
		});
		let ee = t(() => {
			if (c) return c.processor.model?.getSurface(c.surfaceId);
		}), f = t(() => ee.value?.componentsModel?.get(s.id)), ne = t(() => ee.value?.catalogId || "urn:a2ui:catalog:vant:v1"), m = t(() => f.value?.type), re = t(() => {
			if (!f.value) return {};
			let e = f.value.properties.weight, t = {};
			return typeof e == "number" && (t[`flex-grow-${e}`] = !0), t;
		}), ae = t(() => {
			if (m.value) return d.get(ne.value, m.value);
		});
		return (t, s) => f.value ? (p(), i(e, { key: 0 }, [ae.value ? (p(), n(ie(ae.value), {
			key: 0,
			node: f.value,
			class: u(re.value)
		}, null, 8, ["node", "class"])) : (p(), i("div", {
			key: 1,
			class: u(["a2ui-error-fallback", re.value]),
			style: {
				color: "red",
				border: "1px solid red",
				padding: "4px"
			}
		}, " Unknown component type: " + h(m.value), 3))], 64)) : (p(), i("div", Fr, [
			o(" Missing node: " + h(r.id) + " ", 1),
			a("pre", Ir, "Surface exists: " + h(!!g(c)?.processor?.model?.getSurface(g(c).surfaceId)), 1),
			a("pre", Lr, "Component keys: " + h(Array.from(g(c)?.processor?.model?.getSurface(g(c).surfaceId)?.componentsModel?.components?.keys() || [])), 1)
		]));
	}
}), Rr = {
	key: 0,
	class: "a2ui-audio"
}, zr = {
	key: 0,
	class: "a2ui-audio-description"
}, Br = ["src"], Vr = /* @__PURE__ */ c({
	__name: "A2UIAudioPlayer",
	props: { node: {} },
	setup(e) {
		let n = e, { resolveValue: o } = Y(), s = t(() => o(n.node.properties.url) ?? ""), c = t(() => o(n.node.properties.description) ?? "");
		return (e, t) => s.value ? (p(), i("div", Rr, [c.value ? (p(), i("div", zr, h(c.value), 1)) : r("", !0), a("audio", {
			class: "a2ui-media",
			controls: "",
			src: s.value
		}, null, 8, Br)])) : r("", !0);
	}
}), Hr = /* @__PURE__ */ c({
	__name: "A2UIButton",
	props: { node: {} },
	setup(r) {
		let a = r, { resolveValue: s, dispatchNodeAction: c } = Y(), l = t(() => s(a.node.properties.child)), d = t(() => s(a.node.properties.label) ?? s(a.node.properties.text) ?? ""), ee = t(() => {
			switch (s(a.node.properties.variant)) {
				case "primary": return "primary";
				case "danger": return "danger";
				case "success": return "success";
				default: return "default";
			}
		}), f = t(() => s(a.node.properties.variant) === "borderless"), te = t(() => !!s(a.node.properties.block)), ne = t(() => `a2ui-button--${s(a.node.properties.variant) ?? "default"}`);
		return (t, a) => (p(), n(g(se), {
			class: u(["a2ui-button", ne.value]),
			type: ee.value,
			plain: f.value,
			block: te.value,
			onClick: a[0] ||= (e) => g(c)(r.node)
		}, {
			default: _(() => [l.value ? (p(), n(X, {
				key: 0,
				id: l.value
			}, null, 8, ["id"])) : (p(), i(e, { key: 1 }, [o(h(d.value), 1)], 64))]),
			_: 1
		}, 8, [
			"class",
			"type",
			"plain",
			"block"
		]));
	}
}), Ur = { class: "a2ui-card" }, Wr = /* @__PURE__ */ c({
	__name: "A2UICard",
	props: { node: {} },
	setup(e) {
		let i = e, { resolveValue: o } = Y(), s = t(() => o(i.node.properties.child));
		return (e, t) => (p(), n(g(ce), { inset: "" }, {
			default: _(() => [a("div", Ur, [s.value ? (p(), n(X, {
				key: 0,
				id: s.value
			}, null, 8, ["id"])) : r("", !0)])]),
			_: 1
		}));
	}
}), Gr = /* @__PURE__ */ c({
	__name: "A2UICheckBox",
	props: { node: {} },
	setup(e) {
		let r = e, { resolveValue: i, setData: a, dispatchNodeAction: s } = Y(), c = t(() => i(r.node.properties.label) ?? ""), l = t(() => r.node.properties.value?.path), u = t({
			get: () => i(r.node.properties.value) ?? !1,
			set: (e) => {
				l.value && a(l.value, e), s(r.node, { value: e });
			}
		});
		return (e, t) => (p(), n(g(le), {
			modelValue: u.value,
			"onUpdate:modelValue": t[0] ||= (e) => u.value = e
		}, {
			default: _(() => [o(h(c.value), 1)]),
			_: 1
		}, 8, ["modelValue"]));
	}
}), Kr = { class: "a2ui-choice-picker" }, qr = {
	key: 0,
	class: "a2ui-field-label"
}, Jr = /* @__PURE__ */ c({
	__name: "A2UIChoicePicker",
	props: { node: {} },
	setup(a) {
		let s = a, { resolveValue: c, setData: l, dispatchNodeAction: u } = Y(), d = t(() => c(s.node.properties.options) ?? []), ee = t(() => c(s.node.properties.label) ?? ""), f = t(() => s.node.properties.value?.path), te = t(() => c(s.node.properties.variant) === "multipleSelection"), ne = t({
			get: () => c(s.node.properties.value) ?? (te.value ? [] : ""),
			set: (e) => {
				f.value && l(f.value, e), u(s.node, { value: e });
			}
		});
		return (t, a) => (p(), i("div", Kr, [ee.value ? (p(), i("div", qr, h(ee.value), 1)) : r("", !0), te.value ? (p(), n(g(ue), {
			key: 1,
			modelValue: ne.value,
			"onUpdate:modelValue": a[0] ||= (e) => ne.value = e
		}, {
			default: _(() => [(p(!0), i(e, null, m(d.value, (e) => (p(), n(g(le), {
				key: String(e),
				name: e
			}, {
				default: _(() => [o(h(e), 1)]),
				_: 2
			}, 1032, ["name"]))), 128))]),
			_: 1
		}, 8, ["modelValue"])) : (p(), n(g(ge), {
			key: 2,
			modelValue: ne.value,
			"onUpdate:modelValue": a[1] ||= (e) => ne.value = e
		}, {
			default: _(() => [(p(!0), i(e, null, m(d.value, (e) => (p(), n(g(he), {
				key: String(e),
				name: e
			}, {
				default: _(() => [o(h(e), 1)]),
				_: 2
			}, 1032, ["name"]))), 128))]),
			_: 1
		}, 8, ["modelValue"]))]));
	}
}), Yr = ["data-justify", "data-align"], Xr = /* @__PURE__ */ c({
	__name: "A2UIColumn",
	props: { node: {} },
	setup(r) {
		let a = r, { resolveDynamicChildren: o, resolveValue: s } = Y(), c = t(() => o(a.node.properties.children)), l = t(() => s(a.node.properties.justify) ?? "start"), u = t(() => s(a.node.properties.align) ?? "stretch");
		return (t, r) => (p(), i("div", {
			class: "a2ui-column",
			"data-justify": l.value,
			"data-align": u.value
		}, [(p(!0), i(e, null, m(c.value, (e, t) => (p(), n(X, {
			key: `${e.id}-${t}`,
			id: e.id,
			path: e.path
		}, null, 8, ["id", "path"]))), 128))], 8, Yr));
	}
}), Zr = /* @__PURE__ */ c({
	__name: "A2UIDateTimeInput",
	props: { node: {} },
	setup(e) {
		let r = e, { resolveValue: i, setData: a, dispatchNodeAction: o } = Y(), s = t(() => i(r.node.properties.label) ?? ""), c = t(() => r.node.properties.value?.path), l = t(() => !!i(r.node.properties.enableTime)), u = t(() => l.value ? "datetime-local" : "date"), d = t({
			get: () => i(r.node.properties.value) ?? "",
			set: (e) => {
				c.value && a(c.value, e);
			}
		});
		return (t, r) => (p(), n(g(de), {
			modelValue: d.value,
			"onUpdate:modelValue": r[0] ||= (e) => d.value = e,
			label: s.value,
			type: u.value,
			"data-min": g(i)(e.node.properties.min),
			"data-max": g(i)(e.node.properties.max),
			onBlur: r[1] ||= (t) => g(o)(e.node, { value: d.value })
		}, null, 8, [
			"modelValue",
			"label",
			"type",
			"data-min",
			"data-max"
		]));
	}
}), Qr = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, $r = {}, ei = { class: "a2ui-divider" };
function ti(e, t) {
	return p(), i("div", ei);
}
var ni = /* @__PURE__ */ Qr($r, [["render", ti]]), ri = /* @__PURE__ */ c({
	__name: "A2UIIcon",
	props: { node: {} },
	setup(e) {
		let i = e, { resolveValue: a } = Y(), o = t(() => {
			let e = a(i.node.properties.name);
			return typeof e == "string" ? e : "";
		});
		return (e, t) => o.value ? (p(), n(g(fe), {
			key: 0,
			name: o.value
		}, null, 8, ["name"])) : r("", !0);
	}
}), ii = /* @__PURE__ */ c({
	__name: "A2UIImage",
	props: { node: {} },
	setup(e) {
		let i = e, { resolveValue: a } = Y(), o = t(() => a(i.node.properties.url) ?? "");
		return (e, t) => o.value ? (p(), n(g(pe), {
			key: 0,
			class: "a2ui-image",
			width: "100%",
			fit: "cover",
			src: o.value
		}, null, 8, ["src"])) : r("", !0);
	}
}), ai = { class: "a2ui-list" }, oi = /* @__PURE__ */ c({
	__name: "A2UIList",
	props: { node: {} },
	setup(r) {
		let a = r, { resolveDynamicChildren: o } = Y(), s = t(() => o(a.node.properties.children));
		return (t, r) => (p(), i("div", ai, [(p(!0), i(e, null, m(s.value, (e, t) => (p(), n(X, {
			key: `${e.id}-${t}`,
			id: e.id,
			path: e.path
		}, null, 8, ["id", "path"]))), 128))]));
	}
});
//#endregion
//#region src/composables/useDynamicProps.ts
function si(e) {
	let { resolveValue: n } = Y();
	return t(() => {
		let t = oe(e);
		if (!t) return {};
		let r = {};
		for (let e in t) Object.prototype.hasOwnProperty.call(t, e) && (r[e] = n(t[e]));
		return r;
	});
}
//#endregion
//#region src/components/A2UIModal.vue?vue&type=script&setup=true&lang.ts
var ci = { class: "a2ui-modal" }, li = { class: "a2ui-modal-content" }, ui = /* @__PURE__ */ c({
	__name: "A2UIModal",
	props: { node: {} },
	setup(e) {
		let t = e, o = si(() => t.node.properties), { dispatchNodeAction: c } = Y(), l = ne(!1), u = () => {
			l.value = !0, c(t.node, { open: !0 });
		}, d = () => {
			l.value = !1, c(t.node, { open: !1 });
		};
		return (e, t) => (p(), i("div", ci, [g(o).trigger ? (p(), i("div", {
			key: 0,
			class: "a2ui-modal-trigger",
			onClick: u
		}, [s(X, { id: g(o).trigger }, null, 8, ["id"])])) : r("", !0), s(g(me), {
			show: l.value,
			"onUpdate:show": t[0] ||= (e) => l.value = e,
			round: "",
			position: "bottom",
			onClose: d
		}, {
			default: _(() => [a("div", li, [g(o).content ? (p(), n(X, {
				key: 0,
				id: g(o).content
			}, null, 8, ["id"])) : r("", !0)])]),
			_: 1
		}, 8, ["show"])]));
	}
}), di = ["data-justify", "data-align"], fi = /* @__PURE__ */ c({
	__name: "A2UIRow",
	props: { node: {} },
	setup(r) {
		let a = r, { resolveDynamicChildren: o, resolveValue: s } = Y(), c = t(() => o(a.node.properties.children)), l = t(() => s(a.node.properties.justify) ?? "start"), u = t(() => s(a.node.properties.align) ?? "stretch");
		return (t, r) => (p(), i("div", {
			class: "a2ui-row",
			"data-justify": l.value,
			"data-align": u.value
		}, [(p(!0), i(e, null, m(c.value, (e, t) => (p(), n(X, {
			key: `${e.id}-${t}`,
			id: e.id,
			path: e.path
		}, null, 8, ["id", "path"]))), 128))], 8, di));
	}
}), pi = /* @__PURE__ */ c({
	__name: "A2UISlider",
	props: { node: {} },
	setup(e) {
		let r = e, { resolveValue: i, setData: a, dispatchNodeAction: o } = Y(), s = t(() => r.node.properties.value?.path), c = t(() => i(r.node.properties.min) ?? 0), l = t(() => i(r.node.properties.max) ?? 100), u = t(() => i(r.node.properties.step) ?? 1), d = t({
			get: () => i(r.node.properties.value) ?? 0,
			set: (e) => {
				s.value && a(s.value, e);
			}
		});
		return (t, r) => (p(), n(g(_e), {
			modelValue: d.value,
			"onUpdate:modelValue": r[0] ||= (e) => d.value = e,
			min: c.value,
			max: l.value,
			step: u.value,
			onChange: r[1] ||= (t) => g(o)(e.node, { value: d.value })
		}, null, 8, [
			"modelValue",
			"min",
			"max",
			"step"
		]));
	}
}), mi = /* @__PURE__ */ c({
	__name: "A2UITabs",
	props: { node: {} },
	setup(t) {
		let a = t, o = ne(0), s = si(() => a.node.properties), { dispatchNodeAction: c } = Y(), l = (e) => {
			o.value = e;
			let t = (s.value.tabs ?? [])[e];
			c(a.node, {
				tabIndex: e,
				tabTitle: t?.title
			});
		};
		return (t, a) => (p(), n(g(ye), {
			active: o.value,
			onChange: l
		}, {
			default: _(() => [(p(!0), i(e, null, m(g(s).tabs ?? [], (e, t) => (p(), n(g(ve), {
				key: t,
				title: e.title
			}, {
				default: _(() => [e.child ? (p(), n(X, {
					key: 0,
					id: e.child
				}, null, 8, ["id"])) : r("", !0)]),
				_: 2
			}, 1032, ["title"]))), 128))]),
			_: 1
		}, 8, ["active"]));
	}
}), hi = /* @__PURE__ */ c({
	__name: "A2UIText",
	props: { node: {} },
	setup(e) {
		let n = e, { resolveValue: r } = Y(), a = t(() => r(n.node.properties.text) ?? ""), o = t(() => r(n.node.properties.variant) ?? "body");
		return (e, t) => (p(), i("div", { class: u(["a2ui-text", `a2ui-text--${o.value}`]) }, h(a.value), 3));
	}
});
//#endregion
//#region src/utils/validation.ts
function gi(e, t) {
	if (!Array.isArray(e)) return "";
	for (let n of e) {
		if (n === "required" || n?.type === "required" || n?.name === "required") {
			if (!t) return n?.message || "Field is required";
			continue;
		}
		if (n?.regex || n?.type === "regex") {
			let e = n.regex || n.pattern;
			if (e && !new RegExp(e).test(String(t ?? ""))) return n?.message || "Invalid format";
		}
		if (n?.type === "minLength" && n.value !== void 0 && String(t ?? "").length < n.value) return n?.message || `Minimum length is ${n.value}`;
		if (n?.type === "maxLength" && n.value !== void 0 && String(t ?? "").length > n.value) return n?.message || `Maximum length is ${n.value}`;
	}
	return "";
}
//#endregion
//#region src/components/A2UITextField.vue
var _i = /* @__PURE__ */ c({
	__name: "A2UITextField",
	props: { node: {} },
	setup(e) {
		let r = e, { resolveValue: i, setData: a, dispatchNodeAction: o } = Y(), s = t(() => i(r.node.properties.label) ?? ""), c = t(() => i(r.node.properties.placeholder) ?? ""), l = t(() => i(r.node.properties.checks) ?? []), u = t(() => r.node.properties.value?.path), d = t(() => i(r.node.properties.variant) ?? "shortText"), ee = t(() => gi(l.value, te.value)), f = t(() => {
			switch (d.value) {
				case "number": return "number";
				case "obscured": return "password";
				default: return "text";
			}
		}), te = t({
			get: () => i(r.node.properties.value) ?? "",
			set: (e) => {
				u.value && a(u.value, e);
			}
		});
		return (t, r) => (p(), n(g(de), {
			modelValue: te.value,
			"onUpdate:modelValue": r[0] ||= (e) => te.value = e,
			label: s.value,
			placeholder: c.value,
			type: f.value,
			rows: d.value === "longText" ? 3 : void 0,
			autosize: d.value === "longText",
			error: !!ee.value,
			"error-message": ee.value,
			onBlur: r[1] ||= (t) => g(o)(e.node, { value: te.value })
		}, null, 8, [
			"modelValue",
			"label",
			"placeholder",
			"type",
			"rows",
			"autosize",
			"error",
			"error-message"
		]));
	}
}), vi = ["src"], yi = {
	Text: hi,
	Image: ii,
	Icon: ri,
	Video: /* @__PURE__ */ c({
		__name: "A2UIVideo",
		props: { node: {} },
		setup(e) {
			let n = e, { resolveValue: a } = Y(), o = t(() => a(n.node.properties.url) ?? "");
			return (e, t) => o.value ? (p(), i("video", {
				key: 0,
				class: "a2ui-media",
				controls: "",
				src: o.value
			}, null, 8, vi)) : r("", !0);
		}
	}),
	AudioPlayer: Vr,
	Divider: ni,
	Row: fi,
	Column: Xr,
	List: oi,
	Card: Wr,
	Tabs: mi,
	Modal: ui,
	Button: Hr,
	TextField: _i,
	CheckBox: Gr,
	ChoicePicker: Jr,
	Slider: pi,
	DateTimeInput: Zr
}, bi = /* @__PURE__ */ c({
	__name: "A2UICellGroup",
	props: { node: {} },
	setup(r) {
		let a = r, { resolveDynamicChildren: o, resolveValue: s } = Y(), c = t(() => s(a.node.properties.title) ?? ""), l = t(() => !!s(a.node.properties.inset)), u = t(() => o(a.node.properties.children));
		return (t, r) => (p(), n(g(ce), {
			title: c.value || void 0,
			inset: l.value
		}, {
			default: _(() => [(p(!0), i(e, null, m(u.value, (e, t) => (p(), n(X, {
				key: `${e.id}-${t}`,
				id: e.id,
				path: e.path
			}, null, 8, ["id", "path"]))), 128))]),
			_: 1
		}, 8, ["title", "inset"]));
	}
}), xi = /* @__PURE__ */ c({
	__name: "A2UITag",
	props: { node: {} },
	setup(e) {
		let r = e, { resolveValue: i } = Y(), a = t(() => i(r.node.properties.text) ?? ""), s = t(() => {
			let e = i(r.node.properties.type);
			switch (e) {
				case "primary":
				case "success":
				case "warning":
				case "danger": return e;
				default: return "default";
			}
		}), c = t(() => !!i(r.node.properties.plain));
		return (e, t) => (p(), n(g(be), {
			type: s.value,
			plain: c.value
		}, {
			default: _(() => [o(h(a.value), 1)]),
			_: 1
		}, 8, ["type", "plain"]));
	}
}), Si = {
	...yi,
	CellGroup: bi,
	Tag: xi
}, Ci = class e {
	static {
		this.MAX_DEPTH = 10;
	}
	parse(t, n = 0) {
		if (n > e.MAX_DEPTH) throw new Jt("Max recursion depth reached in parse");
		if (!t || !t.includes("${")) return [t];
		let r = [], i = new wi(t);
		for (; !i.isAtEnd();) if (i.matches("${")) {
			i.advance(2);
			let e = this.extractInterpolationContent(i), t = this.parseExpression(e, n + 1);
			t !== null && r.push(t);
		} else if (i.peek() === "\\" && i.peek(1) === "$" && i.peek(2) === "{") i.advance(), r.push("${"), i.advance(2);
		else {
			let e = i.pos;
			for (; !i.isAtEnd() && !(i.matches("${") || i.peek() === "\\" && i.peek(1) === "$" && i.peek(2) === "{");) i.advance();
			r.push(i.input.substring(e, i.pos));
		}
		return r.filter((e) => e !== null && e !== "");
	}
	extractInterpolationContent(e) {
		let t = e.pos, n = 1;
		for (; !e.isAtEnd() && n > 0;) {
			let t = e.advance();
			if (t === "{") n++;
			else if (t === "}") n--;
			else if (t === "'" || t === "\"") {
				let n = t;
				for (; !e.isAtEnd();) {
					let t = e.advance();
					if (t === "\\") e.advance();
					else if (t === n) break;
				}
			}
		}
		if (n > 0) throw new Jt("Unclosed interpolation: missing '}'");
		return e.input.substring(t, e.pos - 1);
	}
	parseExpression(e, t = 0) {
		if (e = e.trim(), !e) return "";
		let n = new wi(e), r = this.parseExpressionInternal(n, t);
		if (!n.isAtEnd()) throw new Jt(`Unexpected characters at end of expression: '${n.input.substring(n.pos)}'`);
		return r;
	}
	parseExpressionInternal(e, t) {
		if (e.skipWhitespace(), e.isAtEnd()) return "";
		if (e.matches("${")) {
			e.advance(2);
			let n = this.extractInterpolationContent(e);
			return this.parseExpression(n, t + 1);
		}
		if (e.matchesString("'") || e.matchesString("\"")) return this.parseStringLiteral(e);
		if (this.isDigit(e.peek())) return this.parseNumberLiteral(e);
		if (e.matchesKeyword("true")) return !0;
		if (e.matchesKeyword("false")) return !1;
		if (e.matchesKeyword("null")) return "";
		let n = this.scanPathOrIdentifier(e);
		return e.skipWhitespace(), e.peek() === "(" ? this.parseFunctionCall(n, e, t) : n ? { path: n } : "";
	}
	scanPathOrIdentifier(e) {
		let t = e.pos;
		for (; !e.isAtEnd();) {
			let t = e.peek();
			if (this.isAlnum(t) || t === "/" || t === "." || t === "_" || t === "-") e.advance();
			else break;
		}
		return e.input.substring(t, e.pos);
	}
	parseFunctionCall(e, t, n) {
		t.match("("), t.skipWhitespace();
		let r = {};
		for (; !t.isAtEnd() && t.peek() !== ")";) {
			let i = this.scanIdentifier(t);
			if (t.skipWhitespace(), !t.match(":")) throw new Jt(`Expected ':' after argument name '${i}' in function '${e}'`);
			t.skipWhitespace(), r[i] = this.parseExpressionInternal(t, n), t.skipWhitespace(), t.peek() === "," && (t.advance(), t.skipWhitespace());
		}
		if (!t.match(")")) throw new Jt(`Expected ')' after function arguments for '${e}'`);
		return {
			call: e,
			args: r,
			returnType: "any"
		};
	}
	scanIdentifier(e) {
		let t = e.pos;
		for (; !e.isAtEnd() && (this.isAlnum(e.peek()) || e.peek() === "_");) e.advance();
		return e.input.substring(t, e.pos);
	}
	parseStringLiteral(e) {
		let t = e.advance(), n = "";
		for (; !e.isAtEnd();) {
			let r = e.advance();
			if (r === "\\") {
				let t = e.advance();
				t === "n" ? n += "\n" : t === "t" ? n += "	" : t === "r" ? n += "\r" : n += t;
			} else if (r === t) break;
			else n += r;
		}
		return n;
	}
	parseNumberLiteral(e) {
		let t = e.pos;
		for (; !e.isAtEnd() && (this.isDigit(e.peek()) || e.peek() === ".");) e.advance();
		return Number(e.input.substring(t, e.pos));
	}
	isAlnum(e) {
		return e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9";
	}
	isDigit(e) {
		return e >= "0" && e <= "9";
	}
}, wi = class {
	constructor(e) {
		this.input = e, this.pos = 0;
	}
	isAtEnd() {
		return this.pos >= this.input.length;
	}
	peek(e = 0) {
		return this.pos + e >= this.input.length ? "\0" : this.input[this.pos + e];
	}
	advance(e = 1) {
		let t = this.input.substring(this.pos, this.pos + e);
		return this.pos += e, t;
	}
	match(e) {
		return this.peek() === e ? (this.advance(), !0) : !1;
	}
	matches(e) {
		return !!this.input.startsWith(e, this.pos);
	}
	matchesString(e) {
		return this.peek() === e;
	}
	matchesKeyword(e) {
		if (this.input.startsWith(e, this.pos)) {
			let t = this.peek(e.length);
			if (!/[a-zA-Z0-9_]/.test(t)) return this.advance(e.length), !0;
		}
		return !1;
	}
	skipWhitespace() {
		for (; !this.isAtEnd() && /\s/.test(this.peek());) this.advance();
	}
}, Ti = 365.2425, Ei = 6048e5, Di = 864e5, Oi = 3600 * 24;
Oi * 7, Oi * Ti / 12 * 3;
var ki = Symbol.for("constructDateFrom");
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constructFrom.js
function Ai(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && ki in e ? e[ki](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/toDate.js
function Z(e, t) {
	return Ai(t || e, e);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/defaultOptions.js
var ji = {};
function Mi() {
	return ji;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeek.js
function Ni(e, t) {
	let n = Mi(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = Z(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeek.js
function Pi(e, t) {
	return Ni(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeekYear.js
function Fi(e, t) {
	let n = Z(e, t?.in), r = n.getFullYear(), i = Ai(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = Pi(i), o = Ai(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = Pi(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function Ii(e) {
	let t = Z(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeDates.js
function Li(e, ...t) {
	let n = Ai.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js
function Ri(e, t) {
	let n = Z(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarDays.js
function zi(e, t, n) {
	let [r, i] = Li(n?.in, e, t), a = Ri(r), o = Ri(i), s = +a - Ii(a), c = +o - Ii(o);
	return Math.round((s - c) / Di);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeekYear.js
function Bi(e, t) {
	let n = Fi(e, t), r = Ai(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Pi(r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isDate.js
function Vi(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isValid.js
function Hi(e) {
	return !(!Vi(e) && typeof e != "number" || isNaN(+Z(e)));
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfYear.js
function Ui(e, t) {
	let n = Z(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var Wi = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
}, Gi = (e, t, n) => {
	let r, i = Wi[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function Ki(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var qi = {
	date: Ki({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: Ki({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: Ki({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, Ji = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, Yi = (e, t, n, r) => Ji[e];
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function Xi(e) {
	return (t, n) => {
		let r = n?.context ? String(n.context) : "standalone", i;
		if (r === "formatting" && e.formattingValues) {
			let t = e.defaultFormattingWidth || e.defaultWidth, r = n?.width ? String(n.width) : t;
			i = e.formattingValues[r] || e.formattingValues[t];
		} else {
			let t = e.defaultWidth, r = n?.width ? String(n.width) : e.defaultWidth;
			i = e.values[r] || e.values[t];
		}
		let a = e.argumentCallback ? e.argumentCallback(t) : t;
		return i[a];
	};
}
var Zi = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: Xi({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: Xi({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4"
			],
			abbreviated: [
				"Q1",
				"Q2",
				"Q3",
				"Q4"
			],
			wide: [
				"1st quarter",
				"2nd quarter",
				"3rd quarter",
				"4th quarter"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: Xi({
		values: {
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		defaultWidth: "wide"
	}),
	day: Xi({
		values: {
			narrow: [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			],
			short: [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			],
			abbreviated: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			wide: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: Xi({
		values: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			}
		},
		defaultFormattingWidth: "wide"
	})
};
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchFn.js
function Qi(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? ea(s, (e) => e.test(o)) : $i(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function $i(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function ea(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function ta(e) {
	return (t, n = {}) => {
		let r = t.match(e.matchPattern);
		if (!r) return null;
		let i = r[0], a = t.match(e.parsePattern);
		if (!a) return null;
		let o = e.valueCallback ? e.valueCallback(a[0]) : a[0];
		o = n.valueCallback ? n.valueCallback(o) : o;
		let s = t.slice(i.length);
		return {
			value: o,
			rest: s
		};
	};
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US.js
var na = {
	code: "en-US",
	formatDistance: Gi,
	formatLong: qi,
	formatRelative: Yi,
	localize: Zi,
	match: {
		ordinalNumber: ta({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: Qi({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: Qi({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: Qi({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: Qi({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: Qi({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDayOfYear.js
function ra(e, t) {
	let n = Z(e, t?.in);
	return zi(n, Ui(n)) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeek.js
function ia(e, t) {
	let n = Z(e, t?.in), r = Pi(n) - +Bi(n);
	return Math.round(r / Ei) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeekYear.js
function aa(e, t) {
	let n = Z(e, t?.in), r = n.getFullYear(), i = Mi(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = Ai(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = Ni(o, t), c = Ai(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = Ni(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeekYear.js
function oa(e, t) {
	let n = Mi(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = aa(e, t), a = Ai(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), Ni(a, t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeek.js
function sa(e, t) {
	let n = Z(e, t?.in), r = Ni(n, t) - +oa(n, t);
	return Math.round(r / Ei) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/addLeadingZeros.js
function Q(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/lightFormatters.js
var ca = {
	y(e, t) {
		let n = e.getFullYear(), r = n > 0 ? n : 1 - n;
		return Q(t === "yy" ? r % 100 : r, t.length);
	},
	M(e, t) {
		let n = e.getMonth();
		return t === "M" ? String(n + 1) : Q(n + 1, 2);
	},
	d(e, t) {
		return Q(e.getDate(), t.length);
	},
	a(e, t) {
		let n = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.toUpperCase();
			case "aaa": return n;
			case "aaaaa": return n[0];
			default: return n === "am" ? "a.m." : "p.m.";
		}
	},
	h(e, t) {
		return Q(e.getHours() % 12 || 12, t.length);
	},
	H(e, t) {
		return Q(e.getHours(), t.length);
	},
	m(e, t) {
		return Q(e.getMinutes(), t.length);
	},
	s(e, t) {
		return Q(e.getSeconds(), t.length);
	},
	S(e, t) {
		let n = t.length, r = e.getMilliseconds();
		return Q(Math.trunc(r * 10 ** (n - 3)), t.length);
	}
}, la = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, ua = {
	G: function(e, t, n) {
		let r = +(e.getFullYear() > 0);
		switch (t) {
			case "G":
			case "GG":
			case "GGG": return n.era(r, { width: "abbreviated" });
			case "GGGGG": return n.era(r, { width: "narrow" });
			default: return n.era(r, { width: "wide" });
		}
	},
	y: function(e, t, n) {
		if (t === "yo") {
			let t = e.getFullYear(), r = t > 0 ? t : 1 - t;
			return n.ordinalNumber(r, { unit: "year" });
		}
		return ca.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = aa(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? Q(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : Q(a, t.length);
	},
	R: function(e, t) {
		return Q(Fi(e), t.length);
	},
	u: function(e, t) {
		return Q(e.getFullYear(), t.length);
	},
	Q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "Q": return String(r);
			case "QQ": return Q(r, 2);
			case "Qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "QQQ": return n.quarter(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return n.quarter(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "q": return String(r);
			case "qq": return Q(r, 2);
			case "qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "qqq": return n.quarter(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return n.quarter(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "M":
			case "MM": return ca.M(e, t);
			case "Mo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "MMM": return n.month(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return n.month(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.month(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "L": return String(r + 1);
			case "LL": return Q(r + 1, 2);
			case "Lo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "LLL": return n.month(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return n.month(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.month(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(e, t, n, r) {
		let i = sa(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : Q(i, t.length);
	},
	I: function(e, t, n) {
		let r = ia(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Q(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : ca.d(e, t);
	},
	D: function(e, t, n) {
		let r = ra(e);
		return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : Q(r, t.length);
	},
	E: function(e, t, n) {
		let r = e.getDay();
		switch (t) {
			case "E":
			case "EE":
			case "EEE": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "e": return String(a);
			case "ee": return Q(a, 2);
			case "eo": return n.ordinalNumber(a, { unit: "day" });
			case "eee": return n.day(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return n.day(i, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return n.day(i, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "c": return String(a);
			case "cc": return Q(a, t.length);
			case "co": return n.ordinalNumber(a, { unit: "day" });
			case "ccc": return n.day(i, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return n.day(i, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return n.day(i, {
				width: "short",
				context: "standalone"
			});
			default: return n.day(i, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(e, t, n) {
		let r = e.getDay(), i = r === 0 ? 7 : r;
		switch (t) {
			case "i": return String(i);
			case "ii": return Q(i, t.length);
			case "io": return n.ordinalNumber(i, { unit: "day" });
			case "iii": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(e, t, n) {
		let r = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return n.dayPeriod(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r === 12 ? la.noon : r === 0 ? la.midnight : r / 12 >= 1 ? "pm" : "am", t) {
			case "b":
			case "bb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r >= 17 ? la.evening : r >= 12 ? la.afternoon : r >= 4 ? la.morning : la.night, t) {
			case "B":
			case "BB":
			case "BBB": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(e, t, n) {
		if (t === "ho") {
			let t = e.getHours() % 12;
			return t === 0 && (t = 12), n.ordinalNumber(t, { unit: "hour" });
		}
		return ca.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : ca.H(e, t);
	},
	K: function(e, t, n) {
		let r = e.getHours() % 12;
		return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : Q(r, t.length);
	},
	k: function(e, t, n) {
		let r = e.getHours();
		return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : Q(r, t.length);
	},
	m: function(e, t, n) {
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : ca.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : ca.s(e, t);
	},
	S: function(e, t) {
		return ca.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return fa(r);
			case "XXXX":
			case "XX": return pa(r);
			default: return pa(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return fa(r);
			case "xxxx":
			case "xx": return pa(r);
			default: return pa(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + da(r, ":");
			default: return "GMT" + pa(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + da(r, ":");
			default: return "GMT" + pa(r, ":");
		}
	},
	t: function(e, t, n) {
		return Q(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return Q(+e, t.length);
	}
};
function da(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + Q(a, 2);
}
function fa(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + Q(Math.abs(e) / 60, 2) : pa(e, t);
}
function pa(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Q(Math.trunc(r / 60), 2), a = Q(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/longFormatters.js
var ma = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, ha = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, ga = {
	p: ha,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return ma(e, t);
		let a;
		switch (r) {
			case "P":
				a = t.dateTime({ width: "short" });
				break;
			case "PP":
				a = t.dateTime({ width: "medium" });
				break;
			case "PPP":
				a = t.dateTime({ width: "long" });
				break;
			default:
				a = t.dateTime({ width: "full" });
				break;
		}
		return a.replace("{{date}}", ma(r, t)).replace("{{time}}", ha(i, t));
	}
}, _a = /^D+$/, va = /^Y+$/, ya = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function ba(e) {
	return _a.test(e);
}
function xa(e) {
	return va.test(e);
}
function Sa(e, t, n) {
	let r = Ca(e, t, n);
	if (console.warn(r), ya.includes(e)) throw RangeError(r);
}
function Ca(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js
var wa = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Ta = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ea = /^'([^]*?)'?$/, Da = /''/g, Oa = /[a-zA-Z]/;
function ka(e, t, n) {
	let r = Mi(), i = n?.locale ?? r.locale ?? na, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = Z(e, n?.in);
	if (!Hi(s)) throw RangeError("Invalid time value");
	let c = t.match(Ta).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = ga[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(wa).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: Aa(e)
		};
		if (ua[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(Oa)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
		return {
			isToken: !1,
			value: e
		};
	});
	i.localize.preprocessor && (c = i.localize.preprocessor(s, c));
	let l = {
		firstWeekContainsDate: a,
		weekStartsOn: o,
		locale: i
	};
	return c.map((r) => {
		if (!r.isToken) return r.value;
		let a = r.value;
		(!n?.useAdditionalWeekYearTokens && xa(a) || !n?.useAdditionalDayOfYearTokens && ba(a)) && Sa(a, t, String(e));
		let o = ua[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function Aa(e) {
	let t = e.match(Ea);
	return t ? t[1].replace(Da, "'") : e;
}
//#endregion
//#region node_modules/.pnpm/@a2ui+web_core@0.9.2/node_modules/@a2ui/web_core/src/v0_9/basic_catalog/functions/basic_functions_api.js
var ja = {
	name: "add",
	returnType: "number",
	schema: P({
		a: L((e) => e === null ? void 0 : e, R.number()),
		b: L((e) => e === null ? void 0 : e, R.number())
	})
}, Ma = {
	name: "subtract",
	returnType: "number",
	schema: P({
		a: L((e) => e === null ? void 0 : e, R.number()),
		b: L((e) => e === null ? void 0 : e, R.number())
	})
}, Na = {
	name: "multiply",
	returnType: "number",
	schema: P({
		a: L((e) => e === null ? void 0 : e, R.number()),
		b: L((e) => e === null ? void 0 : e, R.number())
	})
}, Pa = {
	name: "divide",
	returnType: "number",
	schema: P({
		a: L((e) => e === null ? void 0 : e, R.number()),
		b: L((e) => e === null ? void 0 : e, R.number())
	})
}, Fa = {
	name: "equals",
	returnType: "boolean",
	schema: P({
		a: N().refine((e) => e !== void 0, "Required"),
		b: N().refine((e) => e !== void 0, "Required")
	})
}, Ia = {
	name: "not_equals",
	returnType: "boolean",
	schema: P({
		a: N().refine((e) => e !== void 0, "Required"),
		b: N().refine((e) => e !== void 0, "Required")
	})
}, La = {
	name: "greater_than",
	returnType: "boolean",
	schema: P({
		a: L((e) => e === null ? void 0 : e, R.number()),
		b: L((e) => e === null ? void 0 : e, R.number())
	})
}, Ra = {
	name: "less_than",
	returnType: "boolean",
	schema: P({
		a: L((e) => e === null ? void 0 : e, R.number()),
		b: L((e) => e === null ? void 0 : e, R.number())
	})
}, za = {
	name: "and",
	returnType: "boolean",
	schema: P({ values: Gt(N()).min(2) })
}, Ba = {
	name: "or",
	returnType: "boolean",
	schema: P({ values: Gt(N()).min(2) })
}, Va = {
	name: "not",
	returnType: "boolean",
	schema: P({ value: N().refine((e) => e !== void 0, "Required") })
}, Ha = {
	name: "contains",
	returnType: "boolean",
	schema: P({
		string: L((e) => e === void 0 ? void 0 : String(e), M()),
		substring: L((e) => e === void 0 ? void 0 : String(e), M())
	})
}, Ua = {
	name: "starts_with",
	returnType: "boolean",
	schema: P({
		string: L((e) => e === void 0 ? void 0 : String(e), M()),
		prefix: L((e) => e === void 0 ? void 0 : String(e), M())
	})
}, Wa = {
	name: "ends_with",
	returnType: "boolean",
	schema: P({
		string: L((e) => e === void 0 ? void 0 : String(e), M()),
		suffix: L((e) => e === void 0 ? void 0 : String(e), M())
	})
}, Ga = {
	name: "required",
	returnType: "boolean",
	schema: P({ value: N().refine((e) => e !== void 0, "Required") })
}, Ka = {
	name: "regex",
	returnType: "boolean",
	schema: P({
		value: L((e) => e === void 0 ? void 0 : String(e), M()),
		pattern: L((e) => e === void 0 ? void 0 : String(e), M())
	})
}, qa = {
	name: "length",
	returnType: "boolean",
	schema: P({
		value: N().refine((e) => e !== void 0, "Required"),
		min: R.number().optional(),
		max: R.number().optional()
	}).refine((e) => e.min !== void 0 || e.max !== void 0, { message: "Must provide either 'min' or 'max'" })
}, Ja = {
	name: "numeric",
	returnType: "boolean",
	schema: P({
		value: R.number(),
		min: R.number().optional(),
		max: R.number().optional()
	}).refine((e) => e.min !== void 0 || e.max !== void 0, { message: "Must provide either 'min' or 'max'" })
}, Ya = {
	name: "email",
	returnType: "boolean",
	schema: P({ value: L((e) => e === void 0 ? void 0 : String(e), M()) })
}, Xa = {
	name: "formatString",
	returnType: "any",
	schema: P({ value: R.string() })
}, Za = {
	name: "formatNumber",
	returnType: "string",
	schema: P({
		value: R.number(),
		decimals: R.number().optional(),
		grouping: Wt().default(!0)
	})
}, Qa = {
	name: "formatCurrency",
	returnType: "string",
	schema: P({
		value: R.number(),
		currency: R.string(),
		decimals: R.number().optional(),
		grouping: Wt().default(!0)
	})
}, $a = {
	name: "formatDate",
	returnType: "string",
	schema: P({
		value: N().refine((e) => e !== void 0, "Required"),
		format: R.string()
	})
}, eo = {
	name: "pluralize",
	returnType: "string",
	schema: P({
		value: R.number(),
		zero: R.string().optional(),
		one: R.string().optional(),
		two: R.string().optional(),
		few: R.string().optional(),
		many: R.string().optional(),
		other: R.string()
	}).passthrough()
}, to = {
	name: "openUrl",
	returnType: "void",
	schema: P({ url: L((e) => e === void 0 ? void 0 : String(e), M()) })
}, no = [
	z(ja, (e) => e.a + e.b),
	z(Ma, (e) => e.a - e.b),
	z(Na, (e) => e.a * e.b),
	z(Pa, (e) => {
		let t = e.a, n = e.b;
		if (t == null || n == null) return NaN;
		let r = Number(t), i = Number(n);
		return Number.isNaN(r) || Number.isNaN(i) ? NaN : i === 0 ? Infinity : r / i;
	}),
	z(Fa, (e) => e.a === e.b),
	z(Ia, (e) => e.a !== e.b),
	z(La, (e) => e.a > e.b),
	z(Ra, (e) => e.a < e.b),
	z(za, (e) => e.values.every((e) => !!e)),
	z(Ba, (e) => e.values.some((e) => !!e)),
	z(Va, (e) => !e.value),
	z(Ha, (e) => e.string.includes(e.substring)),
	z(Ua, (e) => e.string.startsWith(e.prefix)),
	z(Wa, (e) => e.string.endsWith(e.suffix)),
	z(Ga, (e) => {
		let t = e.value;
		return !(t == null || typeof t == "string" && t === "" || Array.isArray(t) && t.length === 0);
	}),
	z(Ka, (e) => {
		try {
			return new RegExp(e.pattern).test(e.value);
		} catch (t) {
			throw new Jt(`Invalid regex pattern: ${e.pattern}`, "regex", t);
		}
	}),
	z(qa, (e) => {
		let t = e.value, n = 0;
		return (typeof t == "string" || Array.isArray(t)) && (n = t.length), !(e.min !== void 0 && !isNaN(e.min) && n < e.min || e.max !== void 0 && !isNaN(e.max) && n > e.max);
	}),
	z(Ja, (e) => !(isNaN(e.value) || e.min !== void 0 && !isNaN(e.min) && e.value < e.min || e.max !== void 0 && !isNaN(e.max) && e.value > e.max)),
	z(Ya, (e) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.value)),
	z(Xa, (e, t) => {
		let n = e.value, r = new Ci().parse(n);
		if (r.length === 0) return "";
		let i = r.map((e) => typeof e != "object" || !e || Array.isArray(e) ? e : t.resolveSignal(e));
		return pn(() => i.map((e) => Yt(e) ? e.value : e).join(""));
	}),
	z(Za, (e) => isNaN(e.value) ? "" : new Intl.NumberFormat("en-US", {
		minimumFractionDigits: e.decimals,
		maximumFractionDigits: e.decimals,
		useGrouping: e.grouping
	}).format(e.value)),
	z(Qa, (e) => {
		if (isNaN(e.value)) return "";
		try {
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: e.currency,
				minimumFractionDigits: e.decimals,
				maximumFractionDigits: e.decimals,
				useGrouping: e.grouping
			}).format(e.value);
		} catch {
			return e.value.toFixed(e.decimals || 2);
		}
	}),
	z($a, (e) => {
		if (!e.value) return "";
		let t = new Date(e.value);
		if (isNaN(t.getTime())) return "";
		try {
			return e.format === "ISO" ? t.toISOString() : ka(t, e.format);
		} catch (e) {
			return console.warn("Error formatting date:", e), t.toISOString();
		}
	}),
	z(eo, (e) => {
		let t = new Intl.PluralRules("en-US").select(e.value);
		return String(e[t] ?? e.other ?? "");
	}),
	z(to, (e) => {
		e.url && typeof window < "u" && window.open && window.open(e.url, "_blank");
	})
], $ = {
	accessibility: Er.optional(),
	weight: Ut().describe("The relative weight of this component within a Row or Column. This is similar to the CSS 'flex-grow' property. Note: this may ONLY be set when the component is a direct descendant of a Row or Column.").optional()
}, ro = {
	name: "Text",
	schema: P({
		...$,
		text: J.describe("The text content to display. While simple Markdown formatting is supported (i.e. without HTML, images, or links), utilizing dedicated UI components is generally preferred for a richer and more structured presentation."),
		variant: I([
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"caption",
			"body"
		]).default("body").describe("A hint for the base text style.").optional()
	}).strict()
}, io = {
	name: "Image",
	schema: P({
		...$,
		url: J.describe("The URL of the image to display."),
		description: J.describe("The accessibility description of the image.").optional(),
		fit: I([
			"contain",
			"cover",
			"fill",
			"none",
			"scaleDown"
		]).default("fill").describe("Specifies how the image should be resized to fit its container. This corresponds to the CSS 'object-fit' property.").optional(),
		variant: I([
			"icon",
			"avatar",
			"smallFeature",
			"mediumFeature",
			"largeFeature",
			"header"
		]).default("mediumFeature").describe("A hint for the image size and style.").optional()
	}).strict()
}, ao = /* @__PURE__ */ "accountCircle.add.arrowBack.arrowForward.attachFile.calendarToday.call.camera.check.close.delete.download.edit.event.error.fastForward.favorite.favoriteOff.folder.help.home.info.locationOn.lock.lockOpen.mail.menu.moreVert.moreHoriz.notificationsOff.notifications.pause.payment.person.phone.photo.play.print.refresh.rewind.search.send.settings.share.shoppingCart.skipNext.skipPrevious.star.starHalf.starOff.stop.upload.visibility.visibilityOff.volumeDown.volumeMute.volumeOff.volumeUp.warning".split("."), oo = [
	ro,
	io,
	{
		name: "Icon",
		schema: P({
			...$,
			name: F([I(ao), P({ path: M() }).strict()]).describe("The name of the icon to display.")
		}).strict()
	},
	{
		name: "Video",
		schema: P({
			...$,
			url: J.describe("The URL of the video to display.")
		}).strict()
	},
	{
		name: "AudioPlayer",
		schema: P({
			...$,
			url: J.describe("The URL of the audio to be played."),
			description: J.describe("A description of the audio, such as a title or summary.").optional()
		}).strict()
	},
	{
		name: "Row",
		schema: P({
			...$,
			children: Cr.describe("Defines the children. Use an array of strings for a fixed set of children, or a template object to generate children from a data list. Children cannot be defined inline, they must be referred to by ID."),
			justify: I([
				"center",
				"end",
				"spaceAround",
				"spaceBetween",
				"spaceEvenly",
				"start",
				"stretch"
			]).default("start").describe("Defines the arrangement of children along the main axis (horizontally). Use 'spaceBetween' to push items to the edges, or 'start'/'end'/'center' to pack them together.").optional(),
			align: I([
				"start",
				"center",
				"end",
				"stretch"
			]).default("stretch").describe("Defines the alignment of children along the cross axis (vertically). This is similar to the CSS 'align-items' property, but uses camelCase values (e.g., 'start').").optional()
		}).strict().describe("A layout component that arranges its children horizontally. To create a grid layout, nest Columns within this Row.")
	},
	{
		name: "Column",
		schema: P({
			...$,
			children: Cr.describe("Defines the children. Use an array of strings for a fixed set of children, or a template object to generate children from a data list. Children cannot be defined inline, they must be referred to by ID."),
			justify: I([
				"start",
				"center",
				"end",
				"spaceBetween",
				"spaceAround",
				"spaceEvenly",
				"stretch"
			]).default("start").describe("Defines the arrangement of children along the main axis (vertically). Use 'spaceBetween' to push items to the edges (e.g. header at top, footer at bottom), or 'start'/'end'/'center' to pack them together.").optional(),
			align: I([
				"center",
				"end",
				"start",
				"stretch"
			]).default("stretch").describe("Defines the alignment of children along the cross axis (horizontally). This is similar to the CSS 'align-items' property.").optional()
		}).strict().describe("A layout component that arranges its children vertically. To create a grid layout, nest Rows within this Column.")
	},
	{
		name: "List",
		schema: P({
			...$,
			children: Cr.describe("Defines the children. Use an array of strings for a fixed set of children, or a template object to generate children from a data list."),
			direction: I(["vertical", "horizontal"]).default("vertical").describe("The direction in which the list items are laid out.").optional(),
			align: I([
				"start",
				"center",
				"end",
				"stretch"
			]).default("stretch").describe("Defines the alignment of children along the cross axis.").optional()
		}).strict()
	},
	{
		name: "Card",
		schema: P({
			...$,
			child: Sr.describe("The ID of the single child component to be rendered inside the card. To display multiple elements, you MUST wrap them in a layout component (like Column or Row) and pass that container's ID here. Do NOT pass multiple IDs or a non-existent ID. Do NOT define the child component inline.")
		}).strict()
	},
	{
		name: "Tabs",
		schema: P({
			...$,
			tabs: Gt(P({
				title: J.describe("The tab title."),
				child: Sr.describe("The ID of the child component. Do NOT define the component inline.")
			}).strict()).min(1).describe("An array of objects, where each object defines a tab with a title and a child component.")
		}).strict()
	},
	{
		name: "Modal",
		schema: P({
			...$,
			trigger: Sr.describe("The ID of the component that opens the modal when interacted with (e.g., a button). Do NOT define the component inline."),
			content: Sr.describe("The ID of the component to be displayed inside the modal. Do NOT define the component inline.")
		}).strict()
	},
	{
		name: "Divider",
		schema: P({
			...$,
			axis: I(["horizontal", "vertical"]).default("horizontal").describe("The orientation of the divider.").optional()
		}).strict()
	},
	{
		name: "Button",
		schema: P({
			...$,
			child: Sr.describe("The ID of the child component. Use a 'Text' component for a labeled button. Only use an 'Icon' if the requirements explicitly ask for an icon-only button. Do NOT define the child component inline."),
			variant: I([
				"default",
				"primary",
				"borderless"
			]).default("default").describe("A hint for the button style. If omitted, a default button style is used. 'primary' indicates this is the main call-to-action button. 'borderless' means the button has no visual border or background, making its child content appear like a clickable link.").optional(),
			action: wr,
			checks: Tr.shape.checks
		}).strict()
	},
	{
		name: "TextField",
		schema: P({
			...$,
			label: J.describe("The text label for the input field."),
			value: J.describe("The value of the text field.").optional(),
			variant: I([
				"longText",
				"number",
				"shortText",
				"obscured"
			]).default("shortText").describe("The type of input field to display.").optional(),
			validationRegexp: M().describe("A regular expression used for client-side validation of the input.").optional(),
			checks: Tr.shape.checks
		}).strict()
	},
	{
		name: "CheckBox",
		schema: P({
			...$,
			label: J.describe("The text to display next to the checkbox."),
			value: vr.describe("The current state of the checkbox (true for checked, false for unchecked)."),
			checks: Tr.shape.checks
		}).strict()
	},
	{
		name: "ChoicePicker",
		schema: P({
			...$,
			label: J.describe("The label for the group of options.").optional(),
			variant: I(["multipleSelection", "mutuallyExclusive"]).default("mutuallyExclusive").describe("A hint for how the choice picker should be displayed and behave.").optional(),
			options: Gt(P({
				label: J.describe("The text to display for this option."),
				value: M().describe("The stable value associated with this option.")
			}).strict()).describe("The list of available options to choose from."),
			value: br.describe("The list of currently selected values. This should be bound to a string array in the data model."),
			displayStyle: I(["checkbox", "chips"]).default("checkbox").describe("The display style of the component.").optional(),
			filterable: Wt().default(!1).describe("If true, displays a search input to filter the options.").optional(),
			checks: Tr.shape.checks
		}).strict().describe("A component that allows selecting one or more options from a list.")
	},
	{
		name: "Slider",
		schema: P({
			...$,
			label: J.describe("The label for the slider.").optional(),
			min: Ut().default(0).describe("The minimum value of the slider.").optional(),
			max: Ut().describe("The maximum value of the slider."),
			value: yr.describe("The current value of the slider."),
			checks: Tr.shape.checks
		}).strict()
	},
	{
		name: "DateTimeInput",
		schema: P({
			...$,
			value: J.describe("The selected date and/or time value in ISO 8601 format. If not yet set, initialize with an empty string."),
			enableDate: Wt().default(!1).describe("If true, allows the user to select a date.").optional(),
			enableTime: Wt().default(!1).describe("If true, allows the user to select a time.").optional(),
			min: F([
				J,
				M().date(),
				M().time(),
				M().datetime()
			]).describe("The minimum allowed date/time in ISO 8601 format.").optional(),
			max: F([
				J,
				M().date(),
				M().time(),
				M().datetime()
			]).describe("The maximum allowed date/time in ISO 8601 format.").optional(),
			label: J.describe("The text label for the input field.").optional(),
			checks: Tr.shape.checks
		}).strict()
	}
], so = [...oo], co = {
	accessibility: Er.optional(),
	weight: Ut().describe("The relative weight of this component within a Row or Column. Similar to CSS 'flex-grow'.").optional()
}, lo = {
	name: "CellGroup",
	schema: P({
		...co,
		title: J.optional(),
		children: Cr,
		inset: vr.optional()
	}).strict()
}, uo = {
	name: "Tag",
	schema: P({
		...co,
		text: J,
		type: I([
			"default",
			"primary",
			"success",
			"warning",
			"danger"
		]).default("default").optional(),
		plain: vr.optional()
	}).strict()
}, fo = {
	name: "Button",
	schema: P({
		...co,
		label: J.optional(),
		text: J.optional(),
		child: M().optional(),
		variant: I([
			"default",
			"primary",
			"borderless",
			"danger",
			"success"
		]).default("default").optional(),
		action: wr,
		checks: Tr.shape.checks,
		block: vr.optional()
	}).strict()
}, po = {
	name: "TextField",
	schema: P({
		...co,
		label: J.optional(),
		value: J.optional(),
		placeholder: J.optional(),
		variant: I([
			"shortText",
			"longText",
			"number",
			"obscured"
		]).default("shortText").optional(),
		action: wr.optional(),
		checks: Tr.shape.checks
	}).strict()
}, mo = {
	name: "ChoicePicker",
	schema: P({
		...co,
		label: J.optional(),
		options: Gt(F([M(), Ut()])),
		value: F([J, Gt(N())]).optional(),
		variant: I(["mutuallyExclusive", "multipleSelection"]).default("mutuallyExclusive").optional(),
		displayStyle: I(["list", "dropdown"]).default("list").optional(),
		checks: Tr.shape.checks
	}).strict()
}, ho = {
	name: "Slider",
	schema: P({
		...co,
		value: yr,
		min: yr.optional(),
		max: yr.optional(),
		step: yr.optional(),
		action: wr.optional()
	}).strict()
}, go = {
	name: "DateTimeInput",
	schema: P({
		...co,
		label: J.optional(),
		value: J.optional(),
		enableTime: vr.optional(),
		min: J.optional(),
		max: J.optional(),
		action: wr.optional()
	}).strict()
}, _o = new Set([
	"Button",
	"TextField",
	"ChoicePicker",
	"Slider",
	"DateTimeInput"
]), vo = [
	...oo.filter((e) => !_o.has(e.name)),
	lo,
	uo,
	fo,
	po,
	mo,
	ho,
	go
], yo = [...no], bo = P({
	primaryColor: M().optional(),
	errorColor: M().optional(),
	backgroundColor: M().optional(),
	surfaceColor: M().optional()
}), xo = bo.extend({
	successColor: M().optional(),
	warningColor: M().optional(),
	roundRadius: M().optional()
}), So = {
	ComponentCommon: {
		type: "object",
		properties: {
			component: { type: "string" },
			id: { type: "string" }
		},
		required: ["component"]
	},
	CatalogComponentCommon: {
		type: "object",
		properties: { weight: { type: "number" } }
	}
};
function Co(e) {
	let t = Object.fromEntries(e.components.map((e) => {
		let t = mr(e.schema, { $refStrategy: "none" });
		return delete t.$schema, delete t.additionalProperties, [e.name, {
			type: "object",
			allOf: [
				{ $ref: "#/$defs/ComponentCommon" },
				{ $ref: "#/$defs/CatalogComponentCommon" },
				{
					type: "object",
					properties: { component: { const: e.name } },
					required: ["component"]
				},
				t
			]
		}];
	})), n = Object.fromEntries((e.functions ?? []).map((e) => {
		let t = mr(e.schema, { $refStrategy: "none" });
		return delete t.$schema, [e.name, {
			type: "object",
			properties: {
				call: { const: e.name },
				args: t
			},
			required: ["call", "args"]
		}];
	})), r = e.themeSchema ? mr(e.themeSchema, { $refStrategy: "none" }).properties : void 0;
	return {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: e.catalogId,
		catalogId: e.catalogId,
		title: e.title,
		description: e.description,
		components: t,
		functions: n,
		theme: r,
		$defs: So
	};
}
//#endregion
//#region src/catalog/index.ts
var wo = so, To = vo, Eo = yo, Do = Co({
	catalogId: Mr,
	title: "A2UI Basic Catalog",
	description: "Official A2UI basic catalog rendered with Vant-compatible Vue components.",
	components: wo,
	functions: no,
	themeSchema: bo
}), Oo = Co({
	catalogId: Nr,
	title: "A2UI Vant Catalog",
	description: "Mobile-oriented A2UI catalog for Vue 3 applications using Vant.",
	components: To,
	functions: Eo,
	themeSchema: xo
});
//#endregion
//#region src/core/defaultCatalog.ts
function ko(e) {
	return Object.fromEntries(e.map((e) => [e.name, e]));
}
function Ao(e, t, n, r) {
	e.registerAll(t, n, r);
}
function jo(e = jr) {
	Ao(e, Mr, yi, ko(wo));
}
function Mo(e = jr) {
	Ao(e, Nr, Si, ko(To));
}
//#endregion
//#region src/A2UIRendererPlugin.ts
var No = { install(e, t) {
	let n = t?.registry ?? jr;
	e.component("A2uiProvider", Or), e.component("A2uiComponentNode", X), e.provide(kr, n), t?.registerBasicCatalog !== !1 && jo(n), t?.registerVantCatalog !== !1 && Mo(n);
	for (let e of t?.catalogs ?? []) Ao(n, e.catalogId, e.components, e.apis);
} };
//#endregion
//#region src/core/getCatalogSchema.ts
function Po(e, t, n) {
	let r = t === "https://a2ui.org/specification/v0_9/basic_catalog.json" ? Do : t === "urn:a2ui:catalog:vant:v1" ? Oo : {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: t,
		catalogId: t,
		title: t,
		description: `Catalog schema for ${t}`,
		components: {}
	}, i = JSON.parse(JSON.stringify(r)), a = e.keys(t);
	for (let n of a) {
		if (i.components[n]) continue;
		let r = e.getApi(t, n);
		if (!r) continue;
		let a = mr(r.schema, { $refStrategy: "none" });
		delete a.$schema, delete a.additionalProperties, i.components[n] = {
			type: "object",
			allOf: [
				{ $ref: "#/$defs/ComponentCommon" },
				{ $ref: "#/$defs/CatalogComponentCommon" },
				{
					type: "object",
					properties: { component: { const: n } },
					required: ["component"]
				},
				a
			]
		};
	}
	if (n?.filter) for (let e of Object.keys(i.components)) n.filter(e) || delete i.components[e];
	return i;
}
//#endregion
//#region src/core/catalogFilters.ts
var Fo = new Set([...wo, ...To].map((e) => e.name)), Io = {
	customOnly: ((e) => !Fo.has(e)),
	only(...e) {
		let t = new Set(e);
		return (e) => t.has(e);
	},
	exclude(...e) {
		let t = new Set(e);
		return (e) => !t.has(e);
	}
};
//#endregion
export { Or as A2UIProvider, Dr as A2UI_CONTEXT_KEY, kr as A2UI_REGISTRY_KEY, No as A2UiVueRenderer, No as plugin, Mr as BASIC_CATALOG_ID, wo as BASIC_COMPONENTS, no as BASIC_FUNCTIONS, bo as BASIC_THEME_SCHEMA, X as ComponentNode, Ar as ComponentRegistry, Pr as DEFAULT_CATALOG_ID, Nr as VANT_CATALOG_ID, To as VANT_COMPONENTS, Eo as VANT_FUNCTIONS, xo as VANT_THEME_SCHEMA, Do as basicCatalogSchema, Io as catalogFilters, jr as defaultRegistry, Po as getCatalogSchema, jo as registerBasicCatalog, Ao as registerCatalogDefinition, Mo as registerVantCatalog, Y as useA2UI, si as useDynamicProps, Oo as vantCatalogSchema };
