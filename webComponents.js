/**
* @vue/shared v3.4.19
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Tr(t, e) {
  const r = new Set(t.split(","));
  return e ? (o) => r.has(o.toLowerCase()) : (o) => r.has(o);
}
const U = {}, qt = [], ot = () => {
}, Ua = () => !1, Ve = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Mr = (t) => t.startsWith("onUpdate:"), q = Object.assign, Pr = (t, e) => {
  const r = t.indexOf(e);
  r > -1 && t.splice(r, 1);
}, Ba = Object.prototype.hasOwnProperty, M = (t, e) => Ba.call(t, e), A = Array.isArray, Yt = (t) => $e(t) === "[object Map]", jo = (t) => $e(t) === "[object Set]", R = (t) => typeof t == "function", V = (t) => typeof t == "string", re = (t) => typeof t == "symbol", B = (t) => t !== null && typeof t == "object", Uo = (t) => (B(t) || R(t)) && R(t.then) && R(t.catch), Bo = Object.prototype.toString, $e = (t) => Bo.call(t), Da = (t) => $e(t).slice(8, -1), Do = (t) => $e(t) === "[object Object]", Fr = (t) => V(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, se = /* @__PURE__ */ Tr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), We = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (r) => e[r] || (e[r] = t(r));
}, Ha = /-(\w)/g, kt = We((t) => t.replace(Ha, (e, r) => r ? r.toUpperCase() : "")), Va = /\B([A-Z])/g, dt = We(
  (t) => t.replace(Va, "-$1").toLowerCase()
), Ho = We((t) => t.charAt(0).toUpperCase() + t.slice(1)), dr = We((t) => t ? `on${Ho(t)}` : ""), Pt = (t, e) => !Object.is(t, e), br = (t, e) => {
  for (let r = 0; r < t.length; r++)
    t[r](e);
}, ze = (t, e, r) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: r
  });
}, $a = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, ao = (t) => {
  const e = V(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let io;
const Vo = () => io || (io = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Lr(t) {
  if (A(t)) {
    const e = {};
    for (let r = 0; r < t.length; r++) {
      const o = t[r], a = V(o) ? qa(o) : Lr(o);
      if (a)
        for (const i in a)
          e[i] = a[i];
    }
    return e;
  } else if (V(t) || B(t))
    return t;
}
const Wa = /;(?![^(]*\))/g, Ka = /:([^]+)/, Ga = /\/\*[^]*?\*\//g;
function qa(t) {
  const e = {};
  return t.replace(Ga, "").split(Wa).forEach((r) => {
    if (r) {
      const o = r.split(Ka);
      o.length > 1 && (e[o[0].trim()] = o[1].trim());
    }
  }), e;
}
function Nr(t) {
  let e = "";
  if (V(t))
    e = t;
  else if (A(t))
    for (let r = 0; r < t.length; r++) {
      const o = Nr(t[r]);
      o && (e += o + " ");
    }
  else if (B(t))
    for (const r in t)
      t[r] && (e += r + " ");
  return e.trim();
}
const Ya = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ja = /* @__PURE__ */ Tr(Ya);
function $o(t) {
  return !!t || t === "";
}
const $t = (t) => V(t) ? t : t == null ? "" : A(t) || B(t) && (t.toString === Bo || !R(t.toString)) ? JSON.stringify(t, Wo, 2) : String(t), Wo = (t, e) => e && e.__v_isRef ? Wo(t, e.value) : Yt(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (r, [o, a], i) => (r[fr(o, i) + " =>"] = a, r),
    {}
  )
} : jo(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((r) => fr(r))
} : re(e) ? fr(e) : B(e) && !A(e) && !Do(e) ? String(e) : e, fr = (t, e = "") => {
  var r;
  return re(t) ? `Symbol(${(r = t.description) != null ? r : e})` : t;
};
let ct;
class Xa {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ct, !e && ct && (this.index = (ct.scopes || (ct.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const r = ct;
      try {
        return ct = this, e();
      } finally {
        ct = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ct = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ct = this.parent;
  }
  stop(e) {
    if (this._active) {
      let r, o;
      for (r = 0, o = this.effects.length; r < o; r++)
        this.effects[r].stop();
      for (r = 0, o = this.cleanups.length; r < o; r++)
        this.cleanups[r]();
      if (this.scopes)
        for (r = 0, o = this.scopes.length; r < o; r++)
          this.scopes[r].stop(!0);
      if (!this.detached && this.parent && !e) {
        const a = this.parent.scopes.pop();
        a && a !== this && (this.parent.scopes[this.index] = a, a.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Qa(t, e = ct) {
  e && e.active && e.effects.push(t);
}
function Za() {
  return ct;
}
let Ht;
class zr {
  constructor(e, r, o, a) {
    this.fn = e, this.trigger = r, this.scheduler = o, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Qa(this, a);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Ft();
      for (let e = 0; e < this._depsLength; e++) {
        const r = this.deps[e];
        if (r.computed && (ti(r.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Lt();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(e) {
    this._dirtyLevel = e ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let e = Tt, r = Ht;
    try {
      return Tt = !0, Ht = this, this._runnings++, no(this), this.fn();
    } finally {
      so(this), this._runnings--, Ht = r, Tt = e;
    }
  }
  stop() {
    var e;
    this.active && (no(this), so(this), (e = this.onStop) == null || e.call(this), this.active = !1);
  }
}
function ti(t) {
  return t.value;
}
function no(t) {
  t._trackId++, t._depsLength = 0;
}
function so(t) {
  if (t.deps.length > t._depsLength) {
    for (let e = t._depsLength; e < t.deps.length; e++)
      Ko(t.deps[e], t);
    t.deps.length = t._depsLength;
  }
}
function Ko(t, e) {
  const r = t.get(e);
  r !== void 0 && e._trackId !== r && (t.delete(e), t.size === 0 && t.cleanup());
}
let Tt = !0, yr = 0;
const Go = [];
function Ft() {
  Go.push(Tt), Tt = !1;
}
function Lt() {
  const t = Go.pop();
  Tt = t === void 0 ? !0 : t;
}
function jr() {
  yr++;
}
function Ur() {
  for (yr--; !yr && _r.length; )
    _r.shift()();
}
function qo(t, e, r) {
  if (e.get(t) !== t._trackId) {
    e.set(t, t._trackId);
    const o = t.deps[t._depsLength];
    o !== e ? (o && Ko(o, t), t.deps[t._depsLength++] = e) : t._depsLength++;
  }
}
const _r = [];
function Yo(t, e, r) {
  jr();
  for (const o of t.keys()) {
    let a;
    o._dirtyLevel < e && (a ?? (a = t.get(o) === o._trackId)) && (o._shouldSchedule || (o._shouldSchedule = o._dirtyLevel === 0), o._dirtyLevel = e), o._shouldSchedule && (a ?? (a = t.get(o) === o._trackId)) && (o.trigger(), (!o._runnings || o.allowRecurse) && o._dirtyLevel !== 2 && (o._shouldSchedule = !1, o.scheduler && _r.push(o.scheduler)));
  }
  Ur();
}
const Jo = (t, e) => {
  const r = /* @__PURE__ */ new Map();
  return r.cleanup = t, r.computed = e, r;
}, je = /* @__PURE__ */ new WeakMap(), Vt = Symbol(""), xr = Symbol("");
function et(t, e, r) {
  if (Tt && Ht) {
    let o = je.get(t);
    o || je.set(t, o = /* @__PURE__ */ new Map());
    let a = o.get(r);
    a || o.set(r, a = Jo(() => o.delete(r))), qo(
      Ht,
      a
    );
  }
}
function Et(t, e, r, o, a, i) {
  const n = je.get(t);
  if (!n)
    return;
  let l = [];
  if (e === "clear")
    l = [...n.values()];
  else if (r === "length" && A(t)) {
    const d = Number(o);
    n.forEach((b, u) => {
      (u === "length" || !re(u) && u >= d) && l.push(b);
    });
  } else
    switch (r !== void 0 && l.push(n.get(r)), e) {
      case "add":
        A(t) ? Fr(r) && l.push(n.get("length")) : (l.push(n.get(Vt)), Yt(t) && l.push(n.get(xr)));
        break;
      case "delete":
        A(t) || (l.push(n.get(Vt)), Yt(t) && l.push(n.get(xr)));
        break;
      case "set":
        Yt(t) && l.push(n.get(Vt));
        break;
    }
  jr();
  for (const d of l)
    d && Yo(
      d,
      4
    );
  Ur();
}
function ei(t, e) {
  var r;
  return (r = je.get(t)) == null ? void 0 : r.get(e);
}
const ri = /* @__PURE__ */ Tr("__proto__,__v_isRef,__isVue"), Xo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(re)
), lo = /* @__PURE__ */ oi();
function oi() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...r) {
      const o = T(this);
      for (let i = 0, n = this.length; i < n; i++)
        et(o, "get", i + "");
      const a = o[e](...r);
      return a === -1 || a === !1 ? o[e](...r.map(T)) : a;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...r) {
      Ft(), jr();
      const o = T(this)[e].apply(this, r);
      return Ur(), Lt(), o;
    };
  }), t;
}
function ai(t) {
  const e = T(this);
  return et(e, "has", t), e.hasOwnProperty(t);
}
class Qo {
  constructor(e = !1, r = !1) {
    this._isReadonly = e, this._shallow = r;
  }
  get(e, r, o) {
    const a = this._isReadonly, i = this._shallow;
    if (r === "__v_isReactive")
      return !a;
    if (r === "__v_isReadonly")
      return a;
    if (r === "__v_isShallow")
      return i;
    if (r === "__v_raw")
      return o === (a ? i ? wi : ra : i ? ea : ta).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(o) ? e : void 0;
    const n = A(e);
    if (!a) {
      if (n && M(lo, r))
        return Reflect.get(lo, r, o);
      if (r === "hasOwnProperty")
        return ai;
    }
    const l = Reflect.get(e, r, o);
    return (re(r) ? Xo.has(r) : ri(r)) || (a || et(e, "get", r), i) ? l : J(l) ? n && Fr(r) ? l : l.value : B(l) ? a ? oa(l) : ve(l) : l;
  }
}
class Zo extends Qo {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, r, o, a) {
    let i = e[r];
    if (!this._shallow) {
      const d = te(i);
      if (!Ue(o) && !te(o) && (i = T(i), o = T(o)), !A(e) && J(i) && !J(o))
        return d ? !1 : (i.value = o, !0);
    }
    const n = A(e) && Fr(r) ? Number(r) < e.length : M(e, r), l = Reflect.set(e, r, o, a);
    return e === T(a) && (n ? Pt(o, i) && Et(e, "set", r, o) : Et(e, "add", r, o)), l;
  }
  deleteProperty(e, r) {
    const o = M(e, r);
    e[r];
    const a = Reflect.deleteProperty(e, r);
    return a && o && Et(e, "delete", r, void 0), a;
  }
  has(e, r) {
    const o = Reflect.has(e, r);
    return (!re(r) || !Xo.has(r)) && et(e, "has", r), o;
  }
  ownKeys(e) {
    return et(
      e,
      "iterate",
      A(e) ? "length" : Vt
    ), Reflect.ownKeys(e);
  }
}
class ii extends Qo {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, r) {
    return !0;
  }
  deleteProperty(e, r) {
    return !0;
  }
}
const ni = /* @__PURE__ */ new Zo(), si = /* @__PURE__ */ new ii(), li = /* @__PURE__ */ new Zo(
  !0
), Br = (t) => t, Ke = (t) => Reflect.getPrototypeOf(t);
function Ce(t, e, r = !1, o = !1) {
  t = t.__v_raw;
  const a = T(t), i = T(e);
  r || (Pt(e, i) && et(a, "get", e), et(a, "get", i));
  const { has: n } = Ke(a), l = o ? Br : r ? Vr : ue;
  if (n.call(a, e))
    return l(t.get(e));
  if (n.call(a, i))
    return l(t.get(i));
  t !== a && t.get(e);
}
function Ae(t, e = !1) {
  const r = this.__v_raw, o = T(r), a = T(t);
  return e || (Pt(t, a) && et(o, "has", t), et(o, "has", a)), t === a ? r.has(t) : r.has(t) || r.has(a);
}
function Se(t, e = !1) {
  return t = t.__v_raw, !e && et(T(t), "iterate", Vt), Reflect.get(t, "size", t);
}
function co(t) {
  t = T(t);
  const e = T(this);
  return Ke(e).has.call(e, t) || (e.add(t), Et(e, "add", t, t)), this;
}
function bo(t, e) {
  e = T(e);
  const r = T(this), { has: o, get: a } = Ke(r);
  let i = o.call(r, t);
  i || (t = T(t), i = o.call(r, t));
  const n = a.call(r, t);
  return r.set(t, e), i ? Pt(e, n) && Et(r, "set", t, e) : Et(r, "add", t, e), this;
}
function fo(t) {
  const e = T(this), { has: r, get: o } = Ke(e);
  let a = r.call(e, t);
  a || (t = T(t), a = r.call(e, t)), o && o.call(e, t);
  const i = e.delete(t);
  return a && Et(e, "delete", t, void 0), i;
}
function uo() {
  const t = T(this), e = t.size !== 0, r = t.clear();
  return e && Et(t, "clear", void 0, void 0), r;
}
function Oe(t, e) {
  return function(o, a) {
    const i = this, n = i.__v_raw, l = T(n), d = e ? Br : t ? Vr : ue;
    return !t && et(l, "iterate", Vt), n.forEach((b, u) => o.call(a, d(b), d(u), i));
  };
}
function Re(t, e, r) {
  return function(...o) {
    const a = this.__v_raw, i = T(a), n = Yt(i), l = t === "entries" || t === Symbol.iterator && n, d = t === "keys" && n, b = a[t](...o), u = r ? Br : e ? Vr : ue;
    return !e && et(
      i,
      "iterate",
      d ? xr : Vt
    ), {
      // iterator protocol
      next() {
        const { value: _, done: k } = b.next();
        return k ? { value: _, done: k } : {
          value: l ? [u(_[0]), u(_[1])] : u(_),
          done: k
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function St(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function ci() {
  const t = {
    get(i) {
      return Ce(this, i);
    },
    get size() {
      return Se(this);
    },
    has: Ae,
    add: co,
    set: bo,
    delete: fo,
    clear: uo,
    forEach: Oe(!1, !1)
  }, e = {
    get(i) {
      return Ce(this, i, !1, !0);
    },
    get size() {
      return Se(this);
    },
    has: Ae,
    add: co,
    set: bo,
    delete: fo,
    clear: uo,
    forEach: Oe(!1, !0)
  }, r = {
    get(i) {
      return Ce(this, i, !0);
    },
    get size() {
      return Se(this, !0);
    },
    has(i) {
      return Ae.call(this, i, !0);
    },
    add: St("add"),
    set: St("set"),
    delete: St("delete"),
    clear: St("clear"),
    forEach: Oe(!0, !1)
  }, o = {
    get(i) {
      return Ce(this, i, !0, !0);
    },
    get size() {
      return Se(this, !0);
    },
    has(i) {
      return Ae.call(this, i, !0);
    },
    add: St("add"),
    set: St("set"),
    delete: St("delete"),
    clear: St("clear"),
    forEach: Oe(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    t[i] = Re(
      i,
      !1,
      !1
    ), r[i] = Re(
      i,
      !0,
      !1
    ), e[i] = Re(
      i,
      !1,
      !0
    ), o[i] = Re(
      i,
      !0,
      !0
    );
  }), [
    t,
    r,
    e,
    o
  ];
}
const [
  di,
  bi,
  fi,
  ui
] = /* @__PURE__ */ ci();
function Dr(t, e) {
  const r = e ? t ? ui : fi : t ? bi : di;
  return (o, a, i) => a === "__v_isReactive" ? !t : a === "__v_isReadonly" ? t : a === "__v_raw" ? o : Reflect.get(
    M(r, a) && a in o ? r : o,
    a,
    i
  );
}
const pi = {
  get: /* @__PURE__ */ Dr(!1, !1)
}, hi = {
  get: /* @__PURE__ */ Dr(!1, !0)
}, gi = {
  get: /* @__PURE__ */ Dr(!0, !1)
}, ta = /* @__PURE__ */ new WeakMap(), ea = /* @__PURE__ */ new WeakMap(), ra = /* @__PURE__ */ new WeakMap(), wi = /* @__PURE__ */ new WeakMap();
function vi(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function mi(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : vi(Da(t));
}
function ve(t) {
  return te(t) ? t : Hr(
    t,
    !1,
    ni,
    pi,
    ta
  );
}
function yi(t) {
  return Hr(
    t,
    !1,
    li,
    hi,
    ea
  );
}
function oa(t) {
  return Hr(
    t,
    !0,
    si,
    gi,
    ra
  );
}
function Hr(t, e, r, o, a) {
  if (!B(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const i = a.get(t);
  if (i)
    return i;
  const n = mi(t);
  if (n === 0)
    return t;
  const l = new Proxy(
    t,
    n === 2 ? o : r
  );
  return a.set(t, l), l;
}
function Jt(t) {
  return te(t) ? Jt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function te(t) {
  return !!(t && t.__v_isReadonly);
}
function Ue(t) {
  return !!(t && t.__v_isShallow);
}
function aa(t) {
  return Jt(t) || te(t);
}
function T(t) {
  const e = t && t.__v_raw;
  return e ? T(e) : t;
}
function ia(t) {
  return Object.isExtensible(t) && ze(t, "__v_skip", !0), t;
}
const ue = (t) => B(t) ? ve(t) : t, Vr = (t) => B(t) ? oa(t) : t;
class na {
  constructor(e, r, o, a) {
    this._setter = r, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new zr(
      () => e(this._value),
      () => Me(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !a, this.__v_isReadonly = o;
  }
  get value() {
    const e = T(this);
    return (!e._cacheable || e.effect.dirty) && Pt(e._value, e._value = e.effect.run()) && Me(e, 4), sa(e), e.effect._dirtyLevel >= 2 && Me(e, 2), e._value;
  }
  set value(e) {
    this._setter(e);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(e) {
    this.effect.dirty = e;
  }
  // #endregion
}
function _i(t, e, r = !1) {
  let o, a;
  const i = R(t);
  return i ? (o = t, a = ot) : (o = t.get, a = t.set), new na(o, a, i || !a, r);
}
function sa(t) {
  var e;
  Tt && Ht && (t = T(t), qo(
    Ht,
    (e = t.dep) != null ? e : t.dep = Jo(
      () => t.dep = void 0,
      t instanceof na ? t : void 0
    )
  ));
}
function Me(t, e = 4, r) {
  t = T(t);
  const o = t.dep;
  o && Yo(
    o,
    e
  );
}
function J(t) {
  return !!(t && t.__v_isRef === !0);
}
function xi(t) {
  return ki(t, !1);
}
function ki(t, e) {
  return J(t) ? t : new Ei(t, e);
}
class Ei {
  constructor(e, r) {
    this.__v_isShallow = r, this.dep = void 0, this.__v_isRef = !0, this._rawValue = r ? e : T(e), this._value = r ? e : ue(e);
  }
  get value() {
    return sa(this), this._value;
  }
  set value(e) {
    const r = this.__v_isShallow || Ue(e) || te(e);
    e = r ? e : T(e), Pt(e, this._rawValue) && (this._rawValue = e, this._value = r ? e : ue(e), Me(this, 4));
  }
}
function yt(t) {
  return J(t) ? t.value : t;
}
const Ci = {
  get: (t, e, r) => yt(Reflect.get(t, e, r)),
  set: (t, e, r, o) => {
    const a = t[e];
    return J(a) && !J(r) ? (a.value = r, !0) : Reflect.set(t, e, r, o);
  }
};
function la(t) {
  return Jt(t) ? t : new Proxy(t, Ci);
}
class Ai {
  constructor(e, r, o) {
    this._object = e, this._key = r, this._defaultValue = o, this.__v_isRef = !0;
  }
  get value() {
    const e = this._object[this._key];
    return e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    this._object[this._key] = e;
  }
  get dep() {
    return ei(T(this._object), this._key);
  }
}
class Si {
  constructor(e) {
    this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function ca(t, e, r) {
  return J(t) ? t : R(t) ? new Si(t) : B(t) && arguments.length > 1 ? Oi(t, e, r) : xi(t);
}
function Oi(t, e, r) {
  const o = t[e];
  return J(o) ? o : new Ai(t, e, r);
}
var le = { MANPATH: "/opt/homebrew/share/man::", TERM_PROGRAM: "iTerm.app", NODE: "/opt/homebrew/Cellar/node/21.5.0/bin/node", INIT_CWD: "/Users/bahek2462774/www/diablo/is-diabolo-lib", NVM_CD_FLAGS: "-q", TERM: "xterm-256color", SHELL: "/bin/zsh", HOMEBREW_REPOSITORY: "/opt/homebrew", TMPDIR: "/var/folders/bd/8zxcblxd3v774w3j06k1w04w0000gn/T/", npm_config_global_prefix: "/opt/homebrew", TERM_PROGRAM_VERSION: "3.4.23", COLOR: "1", TERM_SESSION_ID: "w0t1p0:B3A31BFC-F095-42E2-B8F7-125594629931", npm_config_noproxy: "", npm_config_local_prefix: "/Users/bahek2462774/www/diablo/is-diabolo-lib", ZSH: "/Users/bahek2462774/.oh-my-zsh", NVM_DIR: "/Users/bahek2462774/.nvm", USER: "bahek2462774", LS_COLORS: "di=1;36:ln=35:so=32:pi=33:ex=31:bd=34;46:cd=34;43:su=30;41:sg=30;46:tw=30;42:ow=30;43", COMMAND_MODE: "unix2003", npm_config_globalconfig: "/opt/homebrew/etc/npmrc", SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.d2ehxZrPeL/Listeners", __CF_USER_TEXT_ENCODING: "0x1F5:0x0:0x0", npm_execpath: "/opt/homebrew/lib/node_modules/npm/bin/npm-cli.js", PAGER: "less", LSCOLORS: "Gxfxcxdxbxegedabagacad", PATH: "/Users/bahek2462774/www/diablo/is-diabolo-lib/node_modules/.bin:/Users/bahek2462774/www/diablo/node_modules/.bin:/Users/bahek2462774/www/node_modules/.bin:/Users/bahek2462774/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/opt/homebrew/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/bahek2462774/www/diablo/is-diabolo-lib/node_modules/.bin:/Users/bahek2462774/www/diablo/node_modules/.bin:/Users/bahek2462774/www/node_modules/.bin:/Users/bahek2462774/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/opt/homebrew/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/bahek2462774/www/diablo/is-diabolo-lib/node_modules/.bin:/Users/bahek2462774/www/diablo/node_modules/.bin:/Users/bahek2462774/www/node_modules/.bin:/Users/bahek2462774/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/opt/homebrew/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/opt/homebrew/opt/solr@8.11/bin:/opt/homebrew/opt/openjdk@17/bin:/opt/homebrew/opt/mysql@5.7/bin:/Users/bahek2462774/bin:/usr/local/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Library/Apple/usr/bin", npm_package_json: "/Users/bahek2462774/www/diablo/is-diabolo-lib/package.json", _: "/Users/bahek2462774/www/diablo/is-diabolo-lib/node_modules/.bin/vite", npm_config_userconfig: "/Users/bahek2462774/.npmrc", npm_config_init_module: "/Users/bahek2462774/.npm-init.js", __CFBundleIdentifier: "com.googlecode.iterm2", npm_command: "run-script", PWD: "/Users/bahek2462774/www/diablo/is-diabolo-lib", npm_lifecycle_event: "build-web-components", EDITOR: "vi", npm_package_name: "is-diabolo-lib", ITERM_PROFILE: "Default", npm_config_npm_version: "10.2.4", XPC_FLAGS: "0x0", npm_config_node_gyp: "/opt/homebrew/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js", npm_package_version: "1.0.0-alpha.0", XPC_SERVICE_NAME: "0", SHLVL: "4", HOME: "/Users/bahek2462774", COLORFGBG: "15;0", LC_TERMINAL_VERSION: "3.4.23", HOMEBREW_PREFIX: "/opt/homebrew", ITERM_SESSION_ID: "w0t1p0:B3A31BFC-F095-42E2-B8F7-125594629931", npm_config_cache: "/Users/bahek2462774/.npm", LESS: "-R", LOGNAME: "bahek2462774", npm_lifecycle_script: "vite build -c webComponents.config.js", LC_CTYPE: "UTF-8", npm_config_user_agent: "npm/10.2.4 node/v21.5.0 darwin arm64 workspaces/false", INFOPATH: "/opt/homebrew/share/info:", HOMEBREW_CELLAR: "/opt/homebrew/Cellar", LC_TERMINAL: "iTerm2", npm_node_execpath: "/opt/homebrew/Cellar/node/21.5.0/bin/node", npm_config_prefix: "/opt/homebrew", COLORTERM: "truecolor", NODE_ENV: "production" };
const ce = [];
function Ri(t, ...e) {
  Ft();
  const r = ce.length ? ce[ce.length - 1].component : null, o = r && r.appContext.config.warnHandler, a = Ii();
  if (o)
    Ct(
      o,
      r,
      11,
      [
        t + e.join(""),
        r && r.proxy,
        a.map(
          ({ vnode: i }) => `at <${La(r, i.type)}>`
        ).join(`
`),
        a
      ]
    );
  else {
    const i = [`[Vue warn]: ${t}`, ...e];
    a.length && i.push(`
`, ...Ti(a)), console.warn(...i);
  }
  Lt();
}
function Ii() {
  let t = ce[ce.length - 1];
  if (!t)
    return [];
  const e = [];
  for (; t; ) {
    const r = e[0];
    r && r.vnode === t ? r.recurseCount++ : e.push({
      vnode: t,
      recurseCount: 0
    });
    const o = t.component && t.component.parent;
    t = o && o.vnode;
  }
  return e;
}
function Ti(t) {
  const e = [];
  return t.forEach((r, o) => {
    e.push(...o === 0 ? [] : [`
`], ...Mi(r));
  }), e;
}
function Mi({ vnode: t, recurseCount: e }) {
  const r = e > 0 ? `... (${e} recursive calls)` : "", o = t.component ? t.component.parent == null : !1, a = ` at <${La(
    t.component,
    t.type,
    o
  )}`, i = ">" + r;
  return t.props ? [a, ...Pi(t.props), i] : [a + i];
}
function Pi(t) {
  const e = [], r = Object.keys(t);
  return r.slice(0, 3).forEach((o) => {
    e.push(...da(o, t[o]));
  }), r.length > 3 && e.push(" ..."), e;
}
function da(t, e, r) {
  return V(e) ? (e = JSON.stringify(e), r ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? r ? e : [`${t}=${e}`] : J(e) ? (e = da(t, T(e.value), !0), r ? e : [`${t}=Ref<`, e, ">"]) : R(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = T(e), r ? e : [`${t}=`, e]);
}
function Ct(t, e, r, o) {
  try {
    return o ? t(...o) : t();
  } catch (a) {
    Ge(a, e, r);
  }
}
function ft(t, e, r, o) {
  if (R(t)) {
    const i = Ct(t, e, r, o);
    return i && Uo(i) && i.catch((n) => {
      Ge(n, e, r);
    }), i;
  }
  const a = [];
  for (let i = 0; i < t.length; i++)
    a.push(ft(t[i], e, r, o));
  return a;
}
function Ge(t, e, r, o = !0) {
  const a = e ? e.vnode : null;
  if (e) {
    let i = e.parent;
    const n = e.proxy, l = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; i; ) {
      const b = i.ec;
      if (b) {
        for (let u = 0; u < b.length; u++)
          if (b[u](t, n, l) === !1)
            return;
      }
      i = i.parent;
    }
    const d = e.appContext.config.errorHandler;
    if (d) {
      Ct(
        d,
        null,
        10,
        [t, n, l]
      );
      return;
    }
  }
  Fi(t, r, a, o);
}
function Fi(t, e, r, o = !0) {
  console.error(t);
}
let pe = !1, kr = !1;
const X = [];
let mt = 0;
const Xt = [];
let Ot = null, Dt = 0;
const ba = /* @__PURE__ */ Promise.resolve();
let $r = null;
function fa(t) {
  const e = $r || ba;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Li(t) {
  let e = mt + 1, r = X.length;
  for (; e < r; ) {
    const o = e + r >>> 1, a = X[o], i = he(a);
    i < t || i === t && a.pre ? e = o + 1 : r = o;
  }
  return e;
}
function Wr(t) {
  (!X.length || !X.includes(
    t,
    pe && t.allowRecurse ? mt + 1 : mt
  )) && (t.id == null ? X.push(t) : X.splice(Li(t.id), 0, t), ua());
}
function ua() {
  !pe && !kr && (kr = !0, $r = ba.then(ha));
}
function Ni(t) {
  const e = X.indexOf(t);
  e > mt && X.splice(e, 1);
}
function zi(t) {
  A(t) ? Xt.push(...t) : (!Ot || !Ot.includes(
    t,
    t.allowRecurse ? Dt + 1 : Dt
  )) && Xt.push(t), ua();
}
function po(t, e, r = pe ? mt + 1 : 0) {
  for (; r < X.length; r++) {
    const o = X[r];
    if (o && o.pre) {
      if (t && o.id !== t.uid)
        continue;
      X.splice(r, 1), r--, o();
    }
  }
}
function pa(t) {
  if (Xt.length) {
    const e = [...new Set(Xt)].sort(
      (r, o) => he(r) - he(o)
    );
    if (Xt.length = 0, Ot) {
      Ot.push(...e);
      return;
    }
    for (Ot = e, Dt = 0; Dt < Ot.length; Dt++)
      Ot[Dt]();
    Ot = null, Dt = 0;
  }
}
const he = (t) => t.id == null ? 1 / 0 : t.id, ji = (t, e) => {
  const r = he(t) - he(e);
  if (r === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return r;
};
function ha(t) {
  kr = !1, pe = !0, X.sort(ji);
  const e = ot;
  try {
    for (mt = 0; mt < X.length; mt++) {
      const r = X[mt];
      r && r.active !== !1 && (le.NODE_ENV !== "production" && e(r), Ct(r, null, 14));
    }
  } finally {
    mt = 0, X.length = 0, pa(), pe = !1, $r = null, (X.length || Xt.length) && ha();
  }
}
function Ui(t, e, ...r) {
  if (t.isUnmounted)
    return;
  const o = t.vnode.props || U;
  let a = r;
  const i = e.startsWith("update:"), n = i && e.slice(7);
  if (n && n in o) {
    const u = `${n === "modelValue" ? "model" : n}Modifiers`, { number: _, trim: k } = o[u] || U;
    k && (a = r.map((O) => V(O) ? O.trim() : O)), _ && (a = r.map($a));
  }
  let l, d = o[l = dr(e)] || // also try camelCase event handler (#2249)
  o[l = dr(kt(e))];
  !d && i && (d = o[l = dr(dt(e))]), d && ft(
    d,
    t,
    6,
    a
  );
  const b = o[l + "Once"];
  if (b) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[l])
      return;
    t.emitted[l] = !0, ft(
      b,
      t,
      6,
      a
    );
  }
}
function ga(t, e, r = !1) {
  const o = e.emitsCache, a = o.get(t);
  if (a !== void 0)
    return a;
  const i = t.emits;
  let n = {}, l = !1;
  if (!R(t)) {
    const d = (b) => {
      const u = ga(b, e, !0);
      u && (l = !0, q(n, u));
    };
    !r && e.mixins.length && e.mixins.forEach(d), t.extends && d(t.extends), t.mixins && t.mixins.forEach(d);
  }
  return !i && !l ? (B(t) && o.set(t, null), null) : (A(i) ? i.forEach((d) => n[d] = null) : q(n, i), B(t) && o.set(t, n), n);
}
function qe(t, e) {
  return !t || !Ve(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), M(t, e[0].toLowerCase() + e.slice(1)) || M(t, dt(e)) || M(t, e));
}
let _t = null, Ye = null;
function Be(t) {
  const e = _t;
  return _t = t, Ye = t && t.type.__scopeId || null, e;
}
function Je(t) {
  Ye = t;
}
function Xe() {
  Ye = null;
}
function Bi(t, e = _t, r) {
  if (!e || t._n)
    return t;
  const o = (...a) => {
    o._d && Eo(-1);
    const i = Be(e);
    let n;
    try {
      n = t(...a);
    } finally {
      Be(i), o._d && Eo(1);
    }
    return n;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function ur(t) {
  const {
    type: e,
    vnode: r,
    proxy: o,
    withProxy: a,
    props: i,
    propsOptions: [n],
    slots: l,
    attrs: d,
    emit: b,
    render: u,
    renderCache: _,
    data: k,
    setupState: O,
    ctx: H,
    inheritAttrs: F
  } = t;
  let K, $;
  const ut = Be(t);
  try {
    if (r.shapeFlag & 4) {
      const W = a || o, it = le.NODE_ENV !== "production" && O.__isScriptSetup ? new Proxy(W, {
        get(P, nt, st) {
          return Ri(
            `Property '${String(
              nt
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(P, nt, st);
        }
      }) : W;
      K = vt(
        u.call(
          it,
          W,
          _,
          i,
          O,
          k,
          H
        )
      ), $ = d;
    } else {
      const W = e;
      le.NODE_ENV, K = vt(
        W.length > 1 ? W(
          i,
          le.NODE_ENV !== "production" ? {
            get attrs() {
              return d;
            },
            slots: l,
            emit: b
          } : { attrs: d, slots: l, emit: b }
        ) : W(
          i,
          null
          /* we know it doesn't need it */
        )
      ), $ = e.props ? d : Di(d);
    }
  } catch (W) {
    fe.length = 0, Ge(W, t, 1), K = Mt(ge);
  }
  let N = K;
  if ($ && F !== !1) {
    const W = Object.keys($), { shapeFlag: it } = N;
    W.length && it & 7 && (n && W.some(Mr) && ($ = Hi(
      $,
      n
    )), N = ee(N, $));
  }
  return r.dirs && (N = ee(N), N.dirs = N.dirs ? N.dirs.concat(r.dirs) : r.dirs), r.transition && (N.transition = r.transition), K = N, Be(ut), K;
}
const Di = (t) => {
  let e;
  for (const r in t)
    (r === "class" || r === "style" || Ve(r)) && ((e || (e = {}))[r] = t[r]);
  return e;
}, Hi = (t, e) => {
  const r = {};
  for (const o in t)
    (!Mr(o) || !(o.slice(9) in e)) && (r[o] = t[o]);
  return r;
};
function Vi(t, e, r) {
  const { props: o, children: a, component: i } = t, { props: n, children: l, patchFlag: d } = e, b = i.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (r && d >= 0) {
    if (d & 1024)
      return !0;
    if (d & 16)
      return o ? ho(o, n, b) : !!n;
    if (d & 8) {
      const u = e.dynamicProps;
      for (let _ = 0; _ < u.length; _++) {
        const k = u[_];
        if (n[k] !== o[k] && !qe(b, k))
          return !0;
      }
    }
  } else
    return (a || l) && (!l || !l.$stable) ? !0 : o === n ? !1 : o ? n ? ho(o, n, b) : !0 : !!n;
  return !1;
}
function ho(t, e, r) {
  const o = Object.keys(e);
  if (o.length !== Object.keys(t).length)
    return !0;
  for (let a = 0; a < o.length; a++) {
    const i = o[a];
    if (e[i] !== t[i] && !qe(r, i))
      return !0;
  }
  return !1;
}
function $i({ vnode: t, parent: e }, r) {
  for (; e; ) {
    const o = e.subTree;
    if (o.suspense && o.suspense.activeBranch === t && (o.el = t.el), o === t)
      (t = e.vnode).el = r, e = e.parent;
    else
      break;
  }
}
const Wi = Symbol.for("v-ndc"), Ki = (t) => t.__isSuspense;
function Gi(t, e) {
  e && e.pendingBranch ? A(t) ? e.effects.push(...t) : e.effects.push(t) : zi(t);
}
const qi = Symbol.for("v-scx"), Yi = () => Fe(qi), Ie = {};
function pr(t, e, r) {
  return wa(t, e, r);
}
function wa(t, e, {
  immediate: r,
  deep: o,
  flush: a,
  once: i,
  onTrack: n,
  onTrigger: l
} = U) {
  if (e && i) {
    const P = e;
    e = (...nt) => {
      P(...nt), it();
    };
  }
  const d = Y, b = (P) => o === !0 ? P : (
    // for deep: false, only traverse root-level properties
    Gt(P, o === !1 ? 1 : void 0)
  );
  let u, _ = !1, k = !1;
  if (J(t) ? (u = () => t.value, _ = Ue(t)) : Jt(t) ? (u = () => b(t), _ = !0) : A(t) ? (k = !0, _ = t.some((P) => Jt(P) || Ue(P)), u = () => t.map((P) => {
    if (J(P))
      return P.value;
    if (Jt(P))
      return b(P);
    if (R(P))
      return Ct(P, d, 2);
  })) : R(t) ? e ? u = () => Ct(t, d, 2) : u = () => (O && O(), ft(
    t,
    d,
    3,
    [H]
  )) : u = ot, e && o) {
    const P = u;
    u = () => Gt(P());
  }
  let O, H = (P) => {
    O = N.onStop = () => {
      Ct(P, d, 4), O = N.onStop = void 0;
    };
  }, F;
  if (er)
    if (H = ot, e ? r && ft(e, d, 3, [
      u(),
      k ? [] : void 0,
      H
    ]) : u(), a === "sync") {
      const P = Yi();
      F = P.__watcherHandles || (P.__watcherHandles = []);
    } else
      return ot;
  let K = k ? new Array(t.length).fill(Ie) : Ie;
  const $ = () => {
    if (!(!N.active || !N.dirty))
      if (e) {
        const P = N.run();
        (o || _ || (k ? P.some((nt, st) => Pt(nt, K[st])) : Pt(P, K))) && (O && O(), ft(e, d, 3, [
          P,
          // pass undefined as the old value when it's changed for the first time
          K === Ie ? void 0 : k && K[0] === Ie ? [] : K,
          H
        ]), K = P);
      } else
        N.run();
  };
  $.allowRecurse = !!e;
  let ut;
  a === "sync" ? ut = $ : a === "post" ? ut = () => tt($, d && d.suspense) : ($.pre = !0, d && ($.id = d.uid), ut = () => Wr($));
  const N = new zr(u, ot, ut), W = Za(), it = () => {
    N.stop(), W && Pr(W.effects, N);
  };
  return e ? r ? $() : K = N.run() : a === "post" ? tt(
    N.run.bind(N),
    d && d.suspense
  ) : N.run(), F && F.push(it), it;
}
function Ji(t, e, r) {
  const o = this.proxy, a = V(t) ? t.includes(".") ? va(o, t) : () => o[t] : t.bind(o, o);
  let i;
  R(e) ? i = e : (i = e.handler, r = e);
  const n = ye(this), l = wa(a, i.bind(o), r);
  return n(), l;
}
function va(t, e) {
  const r = e.split(".");
  return () => {
    let o = t;
    for (let a = 0; a < r.length && o; a++)
      o = o[r[a]];
    return o;
  };
}
function Gt(t, e, r = 0, o) {
  if (!B(t) || t.__v_skip)
    return t;
  if (e && e > 0) {
    if (r >= e)
      return t;
    r++;
  }
  if (o = o || /* @__PURE__ */ new Set(), o.has(t))
    return t;
  if (o.add(t), J(t))
    Gt(t.value, e, r, o);
  else if (A(t))
    for (let a = 0; a < t.length; a++)
      Gt(t[a], e, r, o);
  else if (jo(t) || Yt(t))
    t.forEach((a) => {
      Gt(a, e, r, o);
    });
  else if (Do(t))
    for (const a in t)
      Gt(t[a], e, r, o);
  return t;
}
function Ut(t, e, r, o) {
  const a = t.dirs, i = e && e.dirs;
  for (let n = 0; n < a.length; n++) {
    const l = a[n];
    i && (l.oldValue = i[n].value);
    let d = l.dir[o];
    d && (Ft(), ft(d, r, 8, [
      t.el,
      l,
      t,
      e
    ]), Lt());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function me(t, e) {
  return R(t) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    q({ name: t.name }, e, { setup: t })
  ) : t;
}
const Pe = (t) => !!t.type.__asyncLoader, ma = (t) => t.type.__isKeepAlive;
function Xi(t, e) {
  ya(t, "a", e);
}
function Qi(t, e) {
  ya(t, "da", e);
}
function ya(t, e, r = Y) {
  const o = t.__wdc || (t.__wdc = () => {
    let a = r;
    for (; a; ) {
      if (a.isDeactivated)
        return;
      a = a.parent;
    }
    return t();
  });
  if (Qe(e, o, r), r) {
    let a = r.parent;
    for (; a && a.parent; )
      ma(a.parent.vnode) && Zi(o, e, r, a), a = a.parent;
  }
}
function Zi(t, e, r, o) {
  const a = Qe(
    e,
    t,
    o,
    !0
    /* prepend */
  );
  _a(() => {
    Pr(o[e], a);
  }, r);
}
function Qe(t, e, r = Y, o = !1) {
  if (r) {
    const a = r[t] || (r[t] = []), i = e.__weh || (e.__weh = (...n) => {
      if (r.isUnmounted)
        return;
      Ft();
      const l = ye(r), d = ft(e, r, t, n);
      return l(), Lt(), d;
    });
    return o ? a.unshift(i) : a.push(i), i;
  }
}
const At = (t) => (e, r = Y) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!er || t === "sp") && Qe(t, (...o) => e(...o), r)
), tn = At("bm"), en = At("m"), rn = At("bu"), on = At("u"), an = At("bum"), _a = At("um"), nn = At("sp"), sn = At(
  "rtg"
), ln = At(
  "rtc"
);
function cn(t, e = Y) {
  Qe("ec", t, e);
}
function dn(t, e, r, o) {
  let a;
  const i = r && r[o];
  if (A(t) || V(t)) {
    a = new Array(t.length);
    for (let n = 0, l = t.length; n < l; n++)
      a[n] = e(t[n], n, void 0, i && i[n]);
  } else if (typeof t == "number") {
    a = new Array(t);
    for (let n = 0; n < t; n++)
      a[n] = e(n + 1, n, void 0, i && i[n]);
  } else if (B(t))
    if (t[Symbol.iterator])
      a = Array.from(
        t,
        (n, l) => e(n, l, void 0, i && i[l])
      );
    else {
      const n = Object.keys(t);
      a = new Array(n.length);
      for (let l = 0, d = n.length; l < d; l++) {
        const b = n[l];
        a[l] = e(t[b], b, l, i && i[l]);
      }
    }
  else
    a = [];
  return r && (r[o] = a), a;
}
const Er = (t) => t ? Pa(t) ? Yr(t) || t.proxy : Er(t.parent) : null, de = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ q(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => Er(t.parent),
    $root: (t) => Er(t.root),
    $emit: (t) => t.emit,
    $options: (t) => Kr(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      t.effect.dirty = !0, Wr(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = fa.bind(t.proxy)),
    $watch: (t) => Ji.bind(t)
  })
), hr = (t, e) => t !== U && !t.__isScriptSetup && M(t, e), bn = {
  get({ _: t }, e) {
    const { ctx: r, setupState: o, data: a, props: i, accessCache: n, type: l, appContext: d } = t;
    let b;
    if (e[0] !== "$") {
      const O = n[e];
      if (O !== void 0)
        switch (O) {
          case 1:
            return o[e];
          case 2:
            return a[e];
          case 4:
            return r[e];
          case 3:
            return i[e];
        }
      else {
        if (hr(o, e))
          return n[e] = 1, o[e];
        if (a !== U && M(a, e))
          return n[e] = 2, a[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (b = t.propsOptions[0]) && M(b, e)
        )
          return n[e] = 3, i[e];
        if (r !== U && M(r, e))
          return n[e] = 4, r[e];
        Cr && (n[e] = 0);
      }
    }
    const u = de[e];
    let _, k;
    if (u)
      return e === "$attrs" && et(t, "get", e), u(t);
    if (
      // css module (injected by vue-loader)
      (_ = l.__cssModules) && (_ = _[e])
    )
      return _;
    if (r !== U && M(r, e))
      return n[e] = 4, r[e];
    if (
      // global properties
      k = d.config.globalProperties, M(k, e)
    )
      return k[e];
  },
  set({ _: t }, e, r) {
    const { data: o, setupState: a, ctx: i } = t;
    return hr(a, e) ? (a[e] = r, !0) : o !== U && M(o, e) ? (o[e] = r, !0) : M(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (i[e] = r, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: r, ctx: o, appContext: a, propsOptions: i }
  }, n) {
    let l;
    return !!r[n] || t !== U && M(t, n) || hr(e, n) || (l = i[0]) && M(l, n) || M(o, n) || M(de, n) || M(a.config.globalProperties, n);
  },
  defineProperty(t, e, r) {
    return r.get != null ? t._.accessCache[e] = 0 : M(r, "value") && this.set(t, e, r.value, null), Reflect.defineProperty(t, e, r);
  }
};
function go(t) {
  return A(t) ? t.reduce(
    (e, r) => (e[r] = null, e),
    {}
  ) : t;
}
let Cr = !0;
function fn(t) {
  const e = Kr(t), r = t.proxy, o = t.ctx;
  Cr = !1, e.beforeCreate && wo(e.beforeCreate, t, "bc");
  const {
    // state
    data: a,
    computed: i,
    methods: n,
    watch: l,
    provide: d,
    inject: b,
    // lifecycle
    created: u,
    beforeMount: _,
    mounted: k,
    beforeUpdate: O,
    updated: H,
    activated: F,
    deactivated: K,
    beforeDestroy: $,
    beforeUnmount: ut,
    destroyed: N,
    unmounted: W,
    render: it,
    renderTracked: P,
    renderTriggered: nt,
    errorCaptured: st,
    serverPrefetch: ir,
    // public API
    expose: Nt,
    inheritAttrs: oe,
    // assets
    components: _e,
    directives: xe,
    filters: nr
  } = e;
  if (b && un(b, o, null), n)
    for (const D in n) {
      const z = n[D];
      R(z) && (o[D] = z.bind(r));
    }
  if (a) {
    const D = a.call(r, r);
    B(D) && (t.data = ve(D));
  }
  if (Cr = !0, i)
    for (const D in i) {
      const z = i[D], zt = R(z) ? z.bind(r, r) : R(z.get) ? z.get.bind(r, r) : ot, ke = !R(z) && R(z.set) ? z.set.bind(r) : ot, jt = Gn({
        get: zt,
        set: ke
      });
      Object.defineProperty(o, D, {
        enumerable: !0,
        configurable: !0,
        get: () => jt.value,
        set: (pt) => jt.value = pt
      });
    }
  if (l)
    for (const D in l)
      xa(l[D], o, r, D);
  if (d) {
    const D = R(d) ? d.call(r) : d;
    Reflect.ownKeys(D).forEach((z) => {
      mn(z, D[z]);
    });
  }
  u && wo(u, t, "c");
  function Q(D, z) {
    A(z) ? z.forEach((zt) => D(zt.bind(r))) : z && D(z.bind(r));
  }
  if (Q(tn, _), Q(en, k), Q(rn, O), Q(on, H), Q(Xi, F), Q(Qi, K), Q(cn, st), Q(ln, P), Q(sn, nt), Q(an, ut), Q(_a, W), Q(nn, ir), A(Nt))
    if (Nt.length) {
      const D = t.exposed || (t.exposed = {});
      Nt.forEach((z) => {
        Object.defineProperty(D, z, {
          get: () => r[z],
          set: (zt) => r[z] = zt
        });
      });
    } else
      t.exposed || (t.exposed = {});
  it && t.render === ot && (t.render = it), oe != null && (t.inheritAttrs = oe), _e && (t.components = _e), xe && (t.directives = xe);
}
function un(t, e, r = ot) {
  A(t) && (t = Ar(t));
  for (const o in t) {
    const a = t[o];
    let i;
    B(a) ? "default" in a ? i = Fe(
      a.from || o,
      a.default,
      !0
    ) : i = Fe(a.from || o) : i = Fe(a), J(i) ? Object.defineProperty(e, o, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (n) => i.value = n
    }) : e[o] = i;
  }
}
function wo(t, e, r) {
  ft(
    A(t) ? t.map((o) => o.bind(e.proxy)) : t.bind(e.proxy),
    e,
    r
  );
}
function xa(t, e, r, o) {
  const a = o.includes(".") ? va(r, o) : () => r[o];
  if (V(t)) {
    const i = e[t];
    R(i) && pr(a, i);
  } else if (R(t))
    pr(a, t.bind(r));
  else if (B(t))
    if (A(t))
      t.forEach((i) => xa(i, e, r, o));
    else {
      const i = R(t.handler) ? t.handler.bind(r) : e[t.handler];
      R(i) && pr(a, i, t);
    }
}
function Kr(t) {
  const e = t.type, { mixins: r, extends: o } = e, {
    mixins: a,
    optionsCache: i,
    config: { optionMergeStrategies: n }
  } = t.appContext, l = i.get(e);
  let d;
  return l ? d = l : !a.length && !r && !o ? d = e : (d = {}, a.length && a.forEach(
    (b) => De(d, b, n, !0)
  ), De(d, e, n)), B(e) && i.set(e, d), d;
}
function De(t, e, r, o = !1) {
  const { mixins: a, extends: i } = e;
  i && De(t, i, r, !0), a && a.forEach(
    (n) => De(t, n, r, !0)
  );
  for (const n in e)
    if (!(o && n === "expose")) {
      const l = pn[n] || r && r[n];
      t[n] = l ? l(t[n], e[n]) : e[n];
    }
  return t;
}
const pn = {
  data: vo,
  props: mo,
  emits: mo,
  // objects
  methods: ne,
  computed: ne,
  // lifecycle
  beforeCreate: Z,
  created: Z,
  beforeMount: Z,
  mounted: Z,
  beforeUpdate: Z,
  updated: Z,
  beforeDestroy: Z,
  beforeUnmount: Z,
  destroyed: Z,
  unmounted: Z,
  activated: Z,
  deactivated: Z,
  errorCaptured: Z,
  serverPrefetch: Z,
  // assets
  components: ne,
  directives: ne,
  // watch
  watch: gn,
  // provide / inject
  provide: vo,
  inject: hn
};
function vo(t, e) {
  return e ? t ? function() {
    return q(
      R(t) ? t.call(this, this) : t,
      R(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function hn(t, e) {
  return ne(Ar(t), Ar(e));
}
function Ar(t) {
  if (A(t)) {
    const e = {};
    for (let r = 0; r < t.length; r++)
      e[t[r]] = t[r];
    return e;
  }
  return t;
}
function Z(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function ne(t, e) {
  return t ? q(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function mo(t, e) {
  return t ? A(t) && A(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : q(
    /* @__PURE__ */ Object.create(null),
    go(t),
    go(e ?? {})
  ) : e;
}
function gn(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const r = q(/* @__PURE__ */ Object.create(null), t);
  for (const o in e)
    r[o] = Z(t[o], e[o]);
  return r;
}
function ka() {
  return {
    app: null,
    config: {
      isNativeTag: Ua,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let wn = 0;
function vn(t, e) {
  return function(o, a = null) {
    R(o) || (o = q({}, o)), a != null && !B(a) && (a = null);
    const i = ka(), n = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const d = i.app = {
      _uid: wn++,
      _component: o,
      _props: a,
      _container: null,
      _context: i,
      _instance: null,
      version: qn,
      get config() {
        return i.config;
      },
      set config(b) {
      },
      use(b, ...u) {
        return n.has(b) || (b && R(b.install) ? (n.add(b), b.install(d, ...u)) : R(b) && (n.add(b), b(d, ...u))), d;
      },
      mixin(b) {
        return i.mixins.includes(b) || i.mixins.push(b), d;
      },
      component(b, u) {
        return u ? (i.components[b] = u, d) : i.components[b];
      },
      directive(b, u) {
        return u ? (i.directives[b] = u, d) : i.directives[b];
      },
      mount(b, u, _) {
        if (!l) {
          const k = Mt(o, a);
          return k.appContext = i, _ === !0 ? _ = "svg" : _ === !1 && (_ = void 0), u && e ? e(k, b) : t(k, b, _), l = !0, d._container = b, b.__vue_app__ = d, Yr(k.component) || k.component.proxy;
        }
      },
      unmount() {
        l && (t(null, d._container), delete d._container.__vue_app__);
      },
      provide(b, u) {
        return i.provides[b] = u, d;
      },
      runWithContext(b) {
        const u = be;
        be = d;
        try {
          return b();
        } finally {
          be = u;
        }
      }
    };
    return d;
  };
}
let be = null;
function mn(t, e) {
  if (Y) {
    let r = Y.provides;
    const o = Y.parent && Y.parent.provides;
    o === r && (r = Y.provides = Object.create(o)), r[t] = e;
  }
}
function Fe(t, e, r = !1) {
  const o = Y || _t;
  if (o || be) {
    const a = o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : be._context.provides;
    if (a && t in a)
      return a[t];
    if (arguments.length > 1)
      return r && R(e) ? e.call(o && o.proxy) : e;
  }
}
function yn(t, e, r, o = !1) {
  const a = {}, i = {};
  ze(i, tr, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), Ea(t, e, a, i);
  for (const n in t.propsOptions[0])
    n in a || (a[n] = void 0);
  r ? t.props = o ? a : yi(a) : t.type.props ? t.props = a : t.props = i, t.attrs = i;
}
function _n(t, e, r, o) {
  const {
    props: a,
    attrs: i,
    vnode: { patchFlag: n }
  } = t, l = T(a), [d] = t.propsOptions;
  let b = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (o || n > 0) && !(n & 16)
  ) {
    if (n & 8) {
      const u = t.vnode.dynamicProps;
      for (let _ = 0; _ < u.length; _++) {
        let k = u[_];
        if (qe(t.emitsOptions, k))
          continue;
        const O = e[k];
        if (d)
          if (M(i, k))
            O !== i[k] && (i[k] = O, b = !0);
          else {
            const H = kt(k);
            a[H] = Sr(
              d,
              l,
              H,
              O,
              t,
              !1
            );
          }
        else
          O !== i[k] && (i[k] = O, b = !0);
      }
    }
  } else {
    Ea(t, e, a, i) && (b = !0);
    let u;
    for (const _ in l)
      (!e || // for camelCase
      !M(e, _) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = dt(_)) === _ || !M(e, u))) && (d ? r && // for camelCase
      (r[_] !== void 0 || // for kebab-case
      r[u] !== void 0) && (a[_] = Sr(
        d,
        l,
        _,
        void 0,
        t,
        !0
      )) : delete a[_]);
    if (i !== l)
      for (const _ in i)
        (!e || !M(e, _)) && (delete i[_], b = !0);
  }
  b && Et(t, "set", "$attrs");
}
function Ea(t, e, r, o) {
  const [a, i] = t.propsOptions;
  let n = !1, l;
  if (e)
    for (let d in e) {
      if (se(d))
        continue;
      const b = e[d];
      let u;
      a && M(a, u = kt(d)) ? !i || !i.includes(u) ? r[u] = b : (l || (l = {}))[u] = b : qe(t.emitsOptions, d) || (!(d in o) || b !== o[d]) && (o[d] = b, n = !0);
    }
  if (i) {
    const d = T(r), b = l || U;
    for (let u = 0; u < i.length; u++) {
      const _ = i[u];
      r[_] = Sr(
        a,
        d,
        _,
        b[_],
        t,
        !M(b, _)
      );
    }
  }
  return n;
}
function Sr(t, e, r, o, a, i) {
  const n = t[r];
  if (n != null) {
    const l = M(n, "default");
    if (l && o === void 0) {
      const d = n.default;
      if (n.type !== Function && !n.skipFactory && R(d)) {
        const { propsDefaults: b } = a;
        if (r in b)
          o = b[r];
        else {
          const u = ye(a);
          o = b[r] = d.call(
            null,
            e
          ), u();
        }
      } else
        o = d;
    }
    n[
      0
      /* shouldCast */
    ] && (i && !l ? o = !1 : n[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === dt(r)) && (o = !0));
  }
  return o;
}
function Ca(t, e, r = !1) {
  const o = e.propsCache, a = o.get(t);
  if (a)
    return a;
  const i = t.props, n = {}, l = [];
  let d = !1;
  if (!R(t)) {
    const u = (_) => {
      d = !0;
      const [k, O] = Ca(_, e, !0);
      q(n, k), O && l.push(...O);
    };
    !r && e.mixins.length && e.mixins.forEach(u), t.extends && u(t.extends), t.mixins && t.mixins.forEach(u);
  }
  if (!i && !d)
    return B(t) && o.set(t, qt), qt;
  if (A(i))
    for (let u = 0; u < i.length; u++) {
      const _ = kt(i[u]);
      yo(_) && (n[_] = U);
    }
  else if (i)
    for (const u in i) {
      const _ = kt(u);
      if (yo(_)) {
        const k = i[u], O = n[_] = A(k) || R(k) ? { type: k } : q({}, k);
        if (O) {
          const H = ko(Boolean, O.type), F = ko(String, O.type);
          O[
            0
            /* shouldCast */
          ] = H > -1, O[
            1
            /* shouldCastTrue */
          ] = F < 0 || H < F, (H > -1 || M(O, "default")) && l.push(_);
        }
      }
    }
  const b = [n, l];
  return B(t) && o.set(t, b), b;
}
function yo(t) {
  return t[0] !== "$" && !se(t);
}
function _o(t) {
  return t === null ? "null" : typeof t == "function" ? t.name || "" : typeof t == "object" && t.constructor && t.constructor.name || "";
}
function xo(t, e) {
  return _o(t) === _o(e);
}
function ko(t, e) {
  return A(e) ? e.findIndex((r) => xo(r, t)) : R(e) && xo(e, t) ? 0 : -1;
}
const Aa = (t) => t[0] === "_" || t === "$stable", Gr = (t) => A(t) ? t.map(vt) : [vt(t)], xn = (t, e, r) => {
  if (e._n)
    return e;
  const o = Bi((...a) => (le.NODE_ENV !== "production" && Y && (!r || (r.root, Y.root)), Gr(e(...a))), r);
  return o._c = !1, o;
}, Sa = (t, e, r) => {
  const o = t._ctx;
  for (const a in t) {
    if (Aa(a))
      continue;
    const i = t[a];
    if (R(i))
      e[a] = xn(a, i, o);
    else if (i != null) {
      const n = Gr(i);
      e[a] = () => n;
    }
  }
}, Oa = (t, e) => {
  const r = Gr(e);
  t.slots.default = () => r;
}, kn = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const r = e._;
    r ? (t.slots = T(e), ze(e, "_", r)) : Sa(
      e,
      t.slots = {}
    );
  } else
    t.slots = {}, e && Oa(t, e);
  ze(t.slots, tr, 1);
}, En = (t, e, r) => {
  const { vnode: o, slots: a } = t;
  let i = !0, n = U;
  if (o.shapeFlag & 32) {
    const l = e._;
    l ? r && l === 1 ? i = !1 : (q(a, e), !r && l === 1 && delete a._) : (i = !e.$stable, Sa(e, a)), n = e;
  } else
    e && (Oa(t, e), n = { default: 1 });
  if (i)
    for (const l in a)
      !Aa(l) && n[l] == null && delete a[l];
};
function Or(t, e, r, o, a = !1) {
  if (A(t)) {
    t.forEach(
      (k, O) => Or(
        k,
        e && (A(e) ? e[O] : e),
        r,
        o,
        a
      )
    );
    return;
  }
  if (Pe(o) && !a)
    return;
  const i = o.shapeFlag & 4 ? Yr(o.component) || o.component.proxy : o.el, n = a ? null : i, { i: l, r: d } = t, b = e && e.r, u = l.refs === U ? l.refs = {} : l.refs, _ = l.setupState;
  if (b != null && b !== d && (V(b) ? (u[b] = null, M(_, b) && (_[b] = null)) : J(b) && (b.value = null)), R(d))
    Ct(d, l, 12, [n, u]);
  else {
    const k = V(d), O = J(d);
    if (k || O) {
      const H = () => {
        if (t.f) {
          const F = k ? M(_, d) ? _[d] : u[d] : d.value;
          a ? A(F) && Pr(F, i) : A(F) ? F.includes(i) || F.push(i) : k ? (u[d] = [i], M(_, d) && (_[d] = u[d])) : (d.value = [i], t.k && (u[t.k] = d.value));
        } else
          k ? (u[d] = n, M(_, d) && (_[d] = n)) : O && (d.value = n, t.k && (u[t.k] = n));
      };
      n ? (H.id = -1, tt(H, r)) : H();
    }
  }
}
const tt = Gi;
function Cn(t) {
  return An(t);
}
function An(t, e) {
  const r = Vo();
  r.__VUE__ = !0;
  const {
    insert: o,
    remove: a,
    patchProp: i,
    createElement: n,
    createText: l,
    createComment: d,
    setText: b,
    setElementText: u,
    parentNode: _,
    nextSibling: k,
    setScopeId: O = ot,
    insertStaticContent: H
  } = t, F = (s, c, f, p = null, h = null, v = null, y = void 0, w = null, m = !!c.dynamicChildren) => {
    if (s === c)
      return;
    s && !ie(s, c) && (p = Ee(s), pt(s, h, v, !0), s = null), c.patchFlag === -2 && (m = !1, c.dynamicChildren = null);
    const { type: g, ref: x, shapeFlag: C } = c;
    switch (g) {
      case Ze:
        K(s, c, f, p);
        break;
      case ge:
        $(s, c, f, p);
        break;
      case wr:
        s == null && ut(c, f, p, y);
        break;
      case wt:
        _e(
          s,
          c,
          f,
          p,
          h,
          v,
          y,
          w,
          m
        );
        break;
      default:
        C & 1 ? it(
          s,
          c,
          f,
          p,
          h,
          v,
          y,
          w,
          m
        ) : C & 6 ? xe(
          s,
          c,
          f,
          p,
          h,
          v,
          y,
          w,
          m
        ) : (C & 64 || C & 128) && g.process(
          s,
          c,
          f,
          p,
          h,
          v,
          y,
          w,
          m,
          Wt
        );
    }
    x != null && h && Or(x, s && s.ref, v, c || s, !c);
  }, K = (s, c, f, p) => {
    if (s == null)
      o(
        c.el = l(c.children),
        f,
        p
      );
    else {
      const h = c.el = s.el;
      c.children !== s.children && b(h, c.children);
    }
  }, $ = (s, c, f, p) => {
    s == null ? o(
      c.el = d(c.children || ""),
      f,
      p
    ) : c.el = s.el;
  }, ut = (s, c, f, p) => {
    [s.el, s.anchor] = H(
      s.children,
      c,
      f,
      p,
      s.el,
      s.anchor
    );
  }, N = ({ el: s, anchor: c }, f, p) => {
    let h;
    for (; s && s !== c; )
      h = k(s), o(s, f, p), s = h;
    o(c, f, p);
  }, W = ({ el: s, anchor: c }) => {
    let f;
    for (; s && s !== c; )
      f = k(s), a(s), s = f;
    a(c);
  }, it = (s, c, f, p, h, v, y, w, m) => {
    c.type === "svg" ? y = "svg" : c.type === "math" && (y = "mathml"), s == null ? P(
      c,
      f,
      p,
      h,
      v,
      y,
      w,
      m
    ) : ir(
      s,
      c,
      h,
      v,
      y,
      w,
      m
    );
  }, P = (s, c, f, p, h, v, y, w) => {
    let m, g;
    const { props: x, shapeFlag: C, transition: E, dirs: S } = s;
    if (m = s.el = n(
      s.type,
      v,
      x && x.is,
      x
    ), C & 8 ? u(m, s.children) : C & 16 && st(
      s.children,
      m,
      null,
      p,
      h,
      gr(s, v),
      y,
      w
    ), S && Ut(s, null, p, "created"), nt(m, s, s.scopeId, y, p), x) {
      for (const L in x)
        L !== "value" && !se(L) && i(
          m,
          L,
          null,
          x[L],
          v,
          s.children,
          p,
          h,
          xt
        );
      "value" in x && i(m, "value", null, x.value, v), (g = x.onVnodeBeforeMount) && gt(g, p, s);
    }
    S && Ut(s, null, p, "beforeMount");
    const I = Sn(h, E);
    I && E.beforeEnter(m), o(m, c, f), ((g = x && x.onVnodeMounted) || I || S) && tt(() => {
      g && gt(g, p, s), I && E.enter(m), S && Ut(s, null, p, "mounted");
    }, h);
  }, nt = (s, c, f, p, h) => {
    if (f && O(s, f), p)
      for (let v = 0; v < p.length; v++)
        O(s, p[v]);
    if (h) {
      let v = h.subTree;
      if (c === v) {
        const y = h.vnode;
        nt(
          s,
          y,
          y.scopeId,
          y.slotScopeIds,
          h.parent
        );
      }
    }
  }, st = (s, c, f, p, h, v, y, w, m = 0) => {
    for (let g = m; g < s.length; g++) {
      const x = s[g] = w ? Rt(s[g]) : vt(s[g]);
      F(
        null,
        x,
        c,
        f,
        p,
        h,
        v,
        y,
        w
      );
    }
  }, ir = (s, c, f, p, h, v, y) => {
    const w = c.el = s.el;
    let { patchFlag: m, dynamicChildren: g, dirs: x } = c;
    m |= s.patchFlag & 16;
    const C = s.props || U, E = c.props || U;
    let S;
    if (f && Bt(f, !1), (S = E.onVnodeBeforeUpdate) && gt(S, f, c, s), x && Ut(c, s, f, "beforeUpdate"), f && Bt(f, !0), g ? Nt(
      s.dynamicChildren,
      g,
      w,
      f,
      p,
      gr(c, h),
      v
    ) : y || z(
      s,
      c,
      w,
      null,
      f,
      p,
      gr(c, h),
      v,
      !1
    ), m > 0) {
      if (m & 16)
        oe(
          w,
          c,
          C,
          E,
          f,
          p,
          h
        );
      else if (m & 2 && C.class !== E.class && i(w, "class", null, E.class, h), m & 4 && i(w, "style", C.style, E.style, h), m & 8) {
        const I = c.dynamicProps;
        for (let L = 0; L < I.length; L++) {
          const j = I[L], G = C[j], lt = E[j];
          (lt !== G || j === "value") && i(
            w,
            j,
            G,
            lt,
            h,
            s.children,
            f,
            p,
            xt
          );
        }
      }
      m & 1 && s.children !== c.children && u(w, c.children);
    } else
      !y && g == null && oe(
        w,
        c,
        C,
        E,
        f,
        p,
        h
      );
    ((S = E.onVnodeUpdated) || x) && tt(() => {
      S && gt(S, f, c, s), x && Ut(c, s, f, "updated");
    }, p);
  }, Nt = (s, c, f, p, h, v, y) => {
    for (let w = 0; w < c.length; w++) {
      const m = s[w], g = c[w], x = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        m.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (m.type === wt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ie(m, g) || // - In the case of a component, it could contain anything.
        m.shapeFlag & 70) ? _(m.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          f
        )
      );
      F(
        m,
        g,
        x,
        null,
        p,
        h,
        v,
        y,
        !0
      );
    }
  }, oe = (s, c, f, p, h, v, y) => {
    if (f !== p) {
      if (f !== U)
        for (const w in f)
          !se(w) && !(w in p) && i(
            s,
            w,
            f[w],
            null,
            y,
            c.children,
            h,
            v,
            xt
          );
      for (const w in p) {
        if (se(w))
          continue;
        const m = p[w], g = f[w];
        m !== g && w !== "value" && i(
          s,
          w,
          g,
          m,
          y,
          c.children,
          h,
          v,
          xt
        );
      }
      "value" in p && i(s, "value", f.value, p.value, y);
    }
  }, _e = (s, c, f, p, h, v, y, w, m) => {
    const g = c.el = s ? s.el : l(""), x = c.anchor = s ? s.anchor : l("");
    let { patchFlag: C, dynamicChildren: E, slotScopeIds: S } = c;
    S && (w = w ? w.concat(S) : S), s == null ? (o(g, f, p), o(x, f, p), st(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      c.children || [],
      f,
      x,
      h,
      v,
      y,
      w,
      m
    )) : C > 0 && C & 64 && E && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    s.dynamicChildren ? (Nt(
      s.dynamicChildren,
      E,
      f,
      h,
      v,
      y,
      w
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (c.key != null || h && c === h.subTree) && Ra(
      s,
      c,
      !0
      /* shallow */
    )) : z(
      s,
      c,
      f,
      x,
      h,
      v,
      y,
      w,
      m
    );
  }, xe = (s, c, f, p, h, v, y, w, m) => {
    c.slotScopeIds = w, s == null ? c.shapeFlag & 512 ? h.ctx.activate(
      c,
      f,
      p,
      y,
      m
    ) : nr(
      c,
      f,
      p,
      h,
      v,
      y,
      m
    ) : Qr(s, c, m);
  }, nr = (s, c, f, p, h, v, y) => {
    const w = s.component = jn(
      s,
      p,
      h
    );
    if (ma(s) && (w.ctx.renderer = Wt), Un(w), w.asyncDep) {
      if (h && h.registerDep(w, Q), !s.el) {
        const m = w.subTree = Mt(ge);
        $(null, m, c, f);
      }
    } else
      Q(
        w,
        s,
        c,
        f,
        h,
        v,
        y
      );
  }, Qr = (s, c, f) => {
    const p = c.component = s.component;
    if (Vi(s, c, f))
      if (p.asyncDep && !p.asyncResolved) {
        D(p, c, f);
        return;
      } else
        p.next = c, Ni(p.update), p.effect.dirty = !0, p.update();
    else
      c.el = s.el, p.vnode = c;
  }, Q = (s, c, f, p, h, v, y) => {
    const w = () => {
      if (s.isMounted) {
        let { next: x, bu: C, u: E, parent: S, vnode: I } = s;
        {
          const Kt = Ia(s);
          if (Kt) {
            x && (x.el = I.el, D(s, x, y)), Kt.asyncDep.then(() => {
              s.isUnmounted || w();
            });
            return;
          }
        }
        let L = x, j;
        Bt(s, !1), x ? (x.el = I.el, D(s, x, y)) : x = I, C && br(C), (j = x.props && x.props.onVnodeBeforeUpdate) && gt(j, S, x, I), Bt(s, !0);
        const G = ur(s), lt = s.subTree;
        s.subTree = G, F(
          lt,
          G,
          // parent may have changed if it's in a teleport
          _(lt.el),
          // anchor may have changed if it's in a fragment
          Ee(lt),
          s,
          h,
          v
        ), x.el = G.el, L === null && $i(s, G.el), E && tt(E, h), (j = x.props && x.props.onVnodeUpdated) && tt(
          () => gt(j, S, x, I),
          h
        );
      } else {
        let x;
        const { el: C, props: E } = c, { bm: S, m: I, parent: L } = s, j = Pe(c);
        if (Bt(s, !1), S && br(S), !j && (x = E && E.onVnodeBeforeMount) && gt(x, L, c), Bt(s, !0), C && cr) {
          const G = () => {
            s.subTree = ur(s), cr(
              C,
              s.subTree,
              s,
              h,
              null
            );
          };
          j ? c.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !s.isUnmounted && G()
          ) : G();
        } else {
          const G = s.subTree = ur(s);
          F(
            null,
            G,
            f,
            p,
            s,
            h,
            v
          ), c.el = G.el;
        }
        if (I && tt(I, h), !j && (x = E && E.onVnodeMounted)) {
          const G = c;
          tt(
            () => gt(x, L, G),
            h
          );
        }
        (c.shapeFlag & 256 || L && Pe(L.vnode) && L.vnode.shapeFlag & 256) && s.a && tt(s.a, h), s.isMounted = !0, c = f = p = null;
      }
    }, m = s.effect = new zr(
      w,
      ot,
      () => Wr(g),
      s.scope
      // track it in component's effect scope
    ), g = s.update = () => {
      m.dirty && m.run();
    };
    g.id = s.uid, Bt(s, !0), g();
  }, D = (s, c, f) => {
    c.component = s;
    const p = s.vnode.props;
    s.vnode = c, s.next = null, _n(s, c.props, p, f), En(s, c.children, f), Ft(), po(s), Lt();
  }, z = (s, c, f, p, h, v, y, w, m = !1) => {
    const g = s && s.children, x = s ? s.shapeFlag : 0, C = c.children, { patchFlag: E, shapeFlag: S } = c;
    if (E > 0) {
      if (E & 128) {
        ke(
          g,
          C,
          f,
          p,
          h,
          v,
          y,
          w,
          m
        );
        return;
      } else if (E & 256) {
        zt(
          g,
          C,
          f,
          p,
          h,
          v,
          y,
          w,
          m
        );
        return;
      }
    }
    S & 8 ? (x & 16 && xt(g, h, v), C !== g && u(f, C)) : x & 16 ? S & 16 ? ke(
      g,
      C,
      f,
      p,
      h,
      v,
      y,
      w,
      m
    ) : xt(g, h, v, !0) : (x & 8 && u(f, ""), S & 16 && st(
      C,
      f,
      p,
      h,
      v,
      y,
      w,
      m
    ));
  }, zt = (s, c, f, p, h, v, y, w, m) => {
    s = s || qt, c = c || qt;
    const g = s.length, x = c.length, C = Math.min(g, x);
    let E;
    for (E = 0; E < C; E++) {
      const S = c[E] = m ? Rt(c[E]) : vt(c[E]);
      F(
        s[E],
        S,
        f,
        null,
        h,
        v,
        y,
        w,
        m
      );
    }
    g > x ? xt(
      s,
      h,
      v,
      !0,
      !1,
      C
    ) : st(
      c,
      f,
      p,
      h,
      v,
      y,
      w,
      m,
      C
    );
  }, ke = (s, c, f, p, h, v, y, w, m) => {
    let g = 0;
    const x = c.length;
    let C = s.length - 1, E = x - 1;
    for (; g <= C && g <= E; ) {
      const S = s[g], I = c[g] = m ? Rt(c[g]) : vt(c[g]);
      if (ie(S, I))
        F(
          S,
          I,
          f,
          null,
          h,
          v,
          y,
          w,
          m
        );
      else
        break;
      g++;
    }
    for (; g <= C && g <= E; ) {
      const S = s[C], I = c[E] = m ? Rt(c[E]) : vt(c[E]);
      if (ie(S, I))
        F(
          S,
          I,
          f,
          null,
          h,
          v,
          y,
          w,
          m
        );
      else
        break;
      C--, E--;
    }
    if (g > C) {
      if (g <= E) {
        const S = E + 1, I = S < x ? c[S].el : p;
        for (; g <= E; )
          F(
            null,
            c[g] = m ? Rt(c[g]) : vt(c[g]),
            f,
            I,
            h,
            v,
            y,
            w,
            m
          ), g++;
      }
    } else if (g > E)
      for (; g <= C; )
        pt(s[g], h, v, !0), g++;
    else {
      const S = g, I = g, L = /* @__PURE__ */ new Map();
      for (g = I; g <= E; g++) {
        const rt = c[g] = m ? Rt(c[g]) : vt(c[g]);
        rt.key != null && L.set(rt.key, g);
      }
      let j, G = 0;
      const lt = E - I + 1;
      let Kt = !1, eo = 0;
      const ae = new Array(lt);
      for (g = 0; g < lt; g++)
        ae[g] = 0;
      for (g = S; g <= C; g++) {
        const rt = s[g];
        if (G >= lt) {
          pt(rt, h, v, !0);
          continue;
        }
        let ht;
        if (rt.key != null)
          ht = L.get(rt.key);
        else
          for (j = I; j <= E; j++)
            if (ae[j - I] === 0 && ie(rt, c[j])) {
              ht = j;
              break;
            }
        ht === void 0 ? pt(rt, h, v, !0) : (ae[ht - I] = g + 1, ht >= eo ? eo = ht : Kt = !0, F(
          rt,
          c[ht],
          f,
          null,
          h,
          v,
          y,
          w,
          m
        ), G++);
      }
      const ro = Kt ? On(ae) : qt;
      for (j = ro.length - 1, g = lt - 1; g >= 0; g--) {
        const rt = I + g, ht = c[rt], oo = rt + 1 < x ? c[rt + 1].el : p;
        ae[g] === 0 ? F(
          null,
          ht,
          f,
          oo,
          h,
          v,
          y,
          w,
          m
        ) : Kt && (j < 0 || g !== ro[j] ? jt(ht, f, oo, 2) : j--);
      }
    }
  }, jt = (s, c, f, p, h = null) => {
    const { el: v, type: y, transition: w, children: m, shapeFlag: g } = s;
    if (g & 6) {
      jt(s.component.subTree, c, f, p);
      return;
    }
    if (g & 128) {
      s.suspense.move(c, f, p);
      return;
    }
    if (g & 64) {
      y.move(s, c, f, Wt);
      return;
    }
    if (y === wt) {
      o(v, c, f);
      for (let C = 0; C < m.length; C++)
        jt(m[C], c, f, p);
      o(s.anchor, c, f);
      return;
    }
    if (y === wr) {
      N(s, c, f);
      return;
    }
    if (p !== 2 && g & 1 && w)
      if (p === 0)
        w.beforeEnter(v), o(v, c, f), tt(() => w.enter(v), h);
      else {
        const { leave: C, delayLeave: E, afterLeave: S } = w, I = () => o(v, c, f), L = () => {
          C(v, () => {
            I(), S && S();
          });
        };
        E ? E(v, I, L) : L();
      }
    else
      o(v, c, f);
  }, pt = (s, c, f, p = !1, h = !1) => {
    const {
      type: v,
      props: y,
      ref: w,
      children: m,
      dynamicChildren: g,
      shapeFlag: x,
      patchFlag: C,
      dirs: E
    } = s;
    if (w != null && Or(w, null, f, s, !0), x & 256) {
      c.ctx.deactivate(s);
      return;
    }
    const S = x & 1 && E, I = !Pe(s);
    let L;
    if (I && (L = y && y.onVnodeBeforeUnmount) && gt(L, c, s), x & 6)
      ja(s.component, f, p);
    else {
      if (x & 128) {
        s.suspense.unmount(f, p);
        return;
      }
      S && Ut(s, null, c, "beforeUnmount"), x & 64 ? s.type.remove(
        s,
        c,
        f,
        h,
        Wt,
        p
      ) : g && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== wt || C > 0 && C & 64) ? xt(
        g,
        c,
        f,
        !1,
        !0
      ) : (v === wt && C & 384 || !h && x & 16) && xt(m, c, f), p && Zr(s);
    }
    (I && (L = y && y.onVnodeUnmounted) || S) && tt(() => {
      L && gt(L, c, s), S && Ut(s, null, c, "unmounted");
    }, f);
  }, Zr = (s) => {
    const { type: c, el: f, anchor: p, transition: h } = s;
    if (c === wt) {
      za(f, p);
      return;
    }
    if (c === wr) {
      W(s);
      return;
    }
    const v = () => {
      a(f), h && !h.persisted && h.afterLeave && h.afterLeave();
    };
    if (s.shapeFlag & 1 && h && !h.persisted) {
      const { leave: y, delayLeave: w } = h, m = () => y(f, v);
      w ? w(s.el, v, m) : m();
    } else
      v();
  }, za = (s, c) => {
    let f;
    for (; s !== c; )
      f = k(s), a(s), s = f;
    a(c);
  }, ja = (s, c, f) => {
    const { bum: p, scope: h, update: v, subTree: y, um: w } = s;
    p && br(p), h.stop(), v && (v.active = !1, pt(y, s, c, f)), w && tt(w, c), tt(() => {
      s.isUnmounted = !0;
    }, c), c && c.pendingBranch && !c.isUnmounted && s.asyncDep && !s.asyncResolved && s.suspenseId === c.pendingId && (c.deps--, c.deps === 0 && c.resolve());
  }, xt = (s, c, f, p = !1, h = !1, v = 0) => {
    for (let y = v; y < s.length; y++)
      pt(s[y], c, f, p, h);
  }, Ee = (s) => s.shapeFlag & 6 ? Ee(s.component.subTree) : s.shapeFlag & 128 ? s.suspense.next() : k(s.anchor || s.el);
  let sr = !1;
  const to = (s, c, f) => {
    s == null ? c._vnode && pt(c._vnode, null, null, !0) : F(
      c._vnode || null,
      s,
      c,
      null,
      null,
      null,
      f
    ), sr || (sr = !0, po(), pa(), sr = !1), c._vnode = s;
  }, Wt = {
    p: F,
    um: pt,
    m: jt,
    r: Zr,
    mt: nr,
    mc: st,
    pc: z,
    pbc: Nt,
    n: Ee,
    o: t
  };
  let lr, cr;
  return e && ([lr, cr] = e(
    Wt
  )), {
    render: to,
    hydrate: lr,
    createApp: vn(to, lr)
  };
}
function gr({ type: t, props: e }, r) {
  return r === "svg" && t === "foreignObject" || r === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : r;
}
function Bt({ effect: t, update: e }, r) {
  t.allowRecurse = e.allowRecurse = r;
}
function Sn(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Ra(t, e, r = !1) {
  const o = t.children, a = e.children;
  if (A(o) && A(a))
    for (let i = 0; i < o.length; i++) {
      const n = o[i];
      let l = a[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = a[i] = Rt(a[i]), l.el = n.el), r || Ra(n, l)), l.type === Ze && (l.el = n.el);
    }
}
function On(t) {
  const e = t.slice(), r = [0];
  let o, a, i, n, l;
  const d = t.length;
  for (o = 0; o < d; o++) {
    const b = t[o];
    if (b !== 0) {
      if (a = r[r.length - 1], t[a] < b) {
        e[o] = a, r.push(o);
        continue;
      }
      for (i = 0, n = r.length - 1; i < n; )
        l = i + n >> 1, t[r[l]] < b ? i = l + 1 : n = l;
      b < t[r[i]] && (i > 0 && (e[o] = r[i - 1]), r[i] = o);
    }
  }
  for (i = r.length, n = r[i - 1]; i-- > 0; )
    r[i] = n, n = e[n];
  return r;
}
function Ia(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : Ia(e);
}
const Rn = (t) => t.__isTeleport, wt = Symbol.for("v-fgt"), Ze = Symbol.for("v-txt"), ge = Symbol.for("v-cmt"), wr = Symbol.for("v-stc"), fe = [];
let bt = null;
function Qt(t = !1) {
  fe.push(bt = t ? null : []);
}
function In() {
  fe.pop(), bt = fe[fe.length - 1] || null;
}
let we = 1;
function Eo(t) {
  we += t;
}
function Tn(t) {
  return t.dynamicChildren = we > 0 ? bt || qt : null, In(), we > 0 && bt && bt.push(t), t;
}
function Zt(t, e, r, o, a, i) {
  return Tn(
    at(
      t,
      e,
      r,
      o,
      a,
      i,
      !0
    )
  );
}
function Mn(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function ie(t, e) {
  return t.type === e.type && t.key === e.key;
}
const tr = "__vInternal", Ta = ({ key: t }) => t ?? null, Le = ({
  ref: t,
  ref_key: e,
  ref_for: r
}) => (typeof t == "number" && (t = "" + t), t != null ? V(t) || J(t) || R(t) ? { i: _t, r: t, k: e, f: !!r } : t : null);
function at(t, e = null, r = null, o = 0, a = null, i = t === wt ? 0 : 1, n = !1, l = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Ta(e),
    ref: e && Le(e),
    scopeId: Ye,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: o,
    dynamicProps: a,
    dynamicChildren: null,
    appContext: null,
    ctx: _t
  };
  return l ? (qr(d, r), i & 128 && t.normalize(d)) : r && (d.shapeFlag |= V(r) ? 8 : 16), we > 0 && // avoid a block node from tracking itself
  !n && // has current parent block
  bt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (d.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  d.patchFlag !== 32 && bt.push(d), d;
}
const Mt = Pn;
function Pn(t, e = null, r = null, o = 0, a = null, i = !1) {
  if ((!t || t === Wi) && (t = ge), Mn(t)) {
    const l = ee(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return r && qr(l, r), we > 0 && !i && bt && (l.shapeFlag & 6 ? bt[bt.indexOf(t)] = l : bt.push(l)), l.patchFlag |= -2, l;
  }
  if (Kn(t) && (t = t.__vccOpts), e) {
    e = Fn(e);
    let { class: l, style: d } = e;
    l && !V(l) && (e.class = Nr(l)), B(d) && (aa(d) && !A(d) && (d = q({}, d)), e.style = Lr(d));
  }
  const n = V(t) ? 1 : Ki(t) ? 128 : Rn(t) ? 64 : B(t) ? 4 : R(t) ? 2 : 0;
  return at(
    t,
    e,
    r,
    o,
    a,
    n,
    i,
    !0
  );
}
function Fn(t) {
  return t ? aa(t) || tr in t ? q({}, t) : t : null;
}
function ee(t, e, r = !1) {
  const { props: o, ref: a, patchFlag: i, children: n } = t, l = e ? Ln(o || {}, e) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: l,
    key: l && Ta(l),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && a ? A(a) ? a.concat(Le(e)) : [a, Le(e)] : Le(e)
    ) : a,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: n,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== wt ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && ee(t.ssContent),
    ssFallback: t.ssFallback && ee(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function Ma(t = " ", e = 0) {
  return Mt(Ze, null, t, e);
}
function vt(t) {
  return t == null || typeof t == "boolean" ? Mt(ge) : A(t) ? Mt(
    wt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? Rt(t) : Mt(Ze, null, String(t));
}
function Rt(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : ee(t);
}
function qr(t, e) {
  let r = 0;
  const { shapeFlag: o } = t;
  if (e == null)
    e = null;
  else if (A(e))
    r = 16;
  else if (typeof e == "object")
    if (o & 65) {
      const a = e.default;
      a && (a._c && (a._d = !1), qr(t, a()), a._c && (a._d = !0));
      return;
    } else {
      r = 32;
      const a = e._;
      !a && !(tr in e) ? e._ctx = _t : a === 3 && _t && (_t.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    R(e) ? (e = { default: e, _ctx: _t }, r = 32) : (e = String(e), o & 64 ? (r = 16, e = [Ma(e)]) : r = 8);
  t.children = e, t.shapeFlag |= r;
}
function Ln(...t) {
  const e = {};
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    for (const a in o)
      if (a === "class")
        e.class !== o.class && (e.class = Nr([e.class, o.class]));
      else if (a === "style")
        e.style = Lr([e.style, o.style]);
      else if (Ve(a)) {
        const i = e[a], n = o[a];
        n && i !== n && !(A(i) && i.includes(n)) && (e[a] = i ? [].concat(i, n) : n);
      } else
        a !== "" && (e[a] = o[a]);
  }
  return e;
}
function gt(t, e, r, o = null) {
  ft(t, e, 7, [
    r,
    o
  ]);
}
const Nn = ka();
let zn = 0;
function jn(t, e, r) {
  const o = t.type, a = (e ? e.appContext : t.appContext) || Nn, i = {
    uid: zn++,
    vnode: t,
    type: o,
    parent: e,
    appContext: a,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Xa(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(a.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ca(o, a),
    emitsOptions: ga(o, a),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: U,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: U,
    data: U,
    props: U,
    attrs: U,
    slots: U,
    refs: U,
    setupState: U,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: r,
    suspenseId: r ? r.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = e ? e.root : i, i.emit = Ui.bind(null, i), t.ce && t.ce(i), i;
}
let Y = null, He, Rr;
{
  const t = Vo(), e = (r, o) => {
    let a;
    return (a = t[r]) || (a = t[r] = []), a.push(o), (i) => {
      a.length > 1 ? a.forEach((n) => n(i)) : a[0](i);
    };
  };
  He = e(
    "__VUE_INSTANCE_SETTERS__",
    (r) => Y = r
  ), Rr = e(
    "__VUE_SSR_SETTERS__",
    (r) => er = r
  );
}
const ye = (t) => {
  const e = Y;
  return He(t), t.scope.on(), () => {
    t.scope.off(), He(e);
  };
}, Co = () => {
  Y && Y.scope.off(), He(null);
};
function Pa(t) {
  return t.vnode.shapeFlag & 4;
}
let er = !1;
function Un(t, e = !1) {
  e && Rr(e);
  const { props: r, children: o } = t.vnode, a = Pa(t);
  yn(t, r, a, e), kn(t, o);
  const i = a ? Bn(t, e) : void 0;
  return e && Rr(!1), i;
}
function Bn(t, e) {
  const r = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = ia(new Proxy(t.ctx, bn));
  const { setup: o } = r;
  if (o) {
    const a = t.setupContext = o.length > 1 ? Hn(t) : null, i = ye(t);
    Ft();
    const n = Ct(
      o,
      t,
      0,
      [
        t.props,
        a
      ]
    );
    if (Lt(), i(), Uo(n)) {
      if (n.then(Co, Co), e)
        return n.then((l) => {
          Ao(t, l, e);
        }).catch((l) => {
          Ge(l, t, 0);
        });
      t.asyncDep = n;
    } else
      Ao(t, n, e);
  } else
    Fa(t, e);
}
function Ao(t, e, r) {
  R(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : B(e) && (t.setupState = la(e)), Fa(t, r);
}
let So;
function Fa(t, e, r) {
  const o = t.type;
  if (!t.render) {
    if (!e && So && !o.render) {
      const a = o.template || Kr(t).template;
      if (a) {
        const { isCustomElement: i, compilerOptions: n } = t.appContext.config, { delimiters: l, compilerOptions: d } = o, b = q(
          q(
            {
              isCustomElement: i,
              delimiters: l
            },
            n
          ),
          d
        );
        o.render = So(a, b);
      }
    }
    t.render = o.render || ot;
  }
  {
    const a = ye(t);
    Ft();
    try {
      fn(t);
    } finally {
      Lt(), a();
    }
  }
}
function Dn(t) {
  return t.attrsProxy || (t.attrsProxy = new Proxy(
    t.attrs,
    {
      get(e, r) {
        return et(t, "get", "$attrs"), e[r];
      }
    }
  ));
}
function Hn(t) {
  const e = (r) => {
    t.exposed = r || {};
  };
  return {
    get attrs() {
      return Dn(t);
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function Yr(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(la(ia(t.exposed)), {
      get(e, r) {
        if (r in e)
          return e[r];
        if (r in de)
          return de[r](t);
      },
      has(e, r) {
        return r in e || r in de;
      }
    }));
}
const Vn = /(?:^|[-_])(\w)/g, $n = (t) => t.replace(Vn, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function Wn(t, e = !0) {
  return R(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function La(t, e, r = !1) {
  let o = Wn(e);
  if (!o && e.__file) {
    const a = e.__file.match(/([^/\\]+)\.\w+$/);
    a && (o = a[1]);
  }
  if (!o && t && t.parent) {
    const a = (i) => {
      for (const n in i)
        if (i[n] === e)
          return n;
    };
    o = a(
      t.components || t.parent.type.components
    ) || a(t.appContext.components);
  }
  return o ? $n(o) : r ? "App" : "Anonymous";
}
function Kn(t) {
  return R(t) && "__vccOpts" in t;
}
const Gn = (t, e) => _i(t, e, er), qn = "3.4.19", Yn = "http://www.w3.org/2000/svg", Jn = "http://www.w3.org/1998/Math/MathML", It = typeof document < "u" ? document : null, Oo = It && /* @__PURE__ */ It.createElement("template"), Xn = {
  insert: (t, e, r) => {
    e.insertBefore(t, r || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, r, o) => {
    const a = e === "svg" ? It.createElementNS(Yn, t) : e === "mathml" ? It.createElementNS(Jn, t) : It.createElement(t, r ? { is: r } : void 0);
    return t === "select" && o && o.multiple != null && a.setAttribute("multiple", o.multiple), a;
  },
  createText: (t) => It.createTextNode(t),
  createComment: (t) => It.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => It.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, r, o, a, i) {
    const n = r ? r.previousSibling : e.lastChild;
    if (a && (a === i || a.nextSibling))
      for (; e.insertBefore(a.cloneNode(!0), r), !(a === i || !(a = a.nextSibling)); )
        ;
    else {
      Oo.innerHTML = o === "svg" ? `<svg>${t}</svg>` : o === "mathml" ? `<math>${t}</math>` : t;
      const l = Oo.content;
      if (o === "svg" || o === "mathml") {
        const d = l.firstChild;
        for (; d.firstChild; )
          l.appendChild(d.firstChild);
        l.removeChild(d);
      }
      e.insertBefore(l, r);
    }
    return [
      // first
      n ? n.nextSibling : e.firstChild,
      // last
      r ? r.previousSibling : e.lastChild
    ];
  }
}, Qn = Symbol("_vtc");
function Zn(t, e, r) {
  const o = t[Qn];
  o && (e = (e ? [e, ...o] : [...o]).join(" ")), e == null ? t.removeAttribute("class") : r ? t.setAttribute("class", e) : t.className = e;
}
const Ro = Symbol("_vod"), ts = Symbol(""), es = /(^|;)\s*display\s*:/;
function rs(t, e, r) {
  const o = t.style, a = V(r), i = o.display;
  let n = !1;
  if (r && !a) {
    if (e && !V(e))
      for (const l in e)
        r[l] == null && Ir(o, l, "");
    for (const l in r)
      l === "display" && (n = !0), Ir(o, l, r[l]);
  } else if (a) {
    if (e !== r) {
      const l = o[ts];
      l && (r += ";" + l), o.cssText = r, n = es.test(r);
    }
  } else
    e && t.removeAttribute("style");
  Ro in t && (t[Ro] = n ? o.display : "", o.display = i);
}
const Io = /\s*!important$/;
function Ir(t, e, r) {
  if (A(r))
    r.forEach((o) => Ir(t, e, o));
  else if (r == null && (r = ""), e.startsWith("--"))
    t.setProperty(e, r);
  else {
    const o = os(t, e);
    Io.test(r) ? t.setProperty(
      dt(o),
      r.replace(Io, ""),
      "important"
    ) : t[o] = r;
  }
}
const To = ["Webkit", "Moz", "ms"], vr = {};
function os(t, e) {
  const r = vr[e];
  if (r)
    return r;
  let o = kt(e);
  if (o !== "filter" && o in t)
    return vr[e] = o;
  o = Ho(o);
  for (let a = 0; a < To.length; a++) {
    const i = To[a] + o;
    if (i in t)
      return vr[e] = i;
  }
  return e;
}
const Mo = "http://www.w3.org/1999/xlink";
function as(t, e, r, o, a) {
  if (o && e.startsWith("xlink:"))
    r == null ? t.removeAttributeNS(Mo, e.slice(6, e.length)) : t.setAttributeNS(Mo, e, r);
  else {
    const i = Ja(e);
    r == null || i && !$o(r) ? t.removeAttribute(e) : t.setAttribute(e, i ? "" : r);
  }
}
function is(t, e, r, o, a, i, n) {
  if (e === "innerHTML" || e === "textContent") {
    o && n(o, a, i), t[e] = r ?? "";
    return;
  }
  const l = t.tagName;
  if (e === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    t._value = r;
    const b = l === "OPTION" ? t.getAttribute("value") : t.value, u = r ?? "";
    b !== u && (t.value = u), r == null && t.removeAttribute(e);
    return;
  }
  let d = !1;
  if (r === "" || r == null) {
    const b = typeof t[e];
    b === "boolean" ? r = $o(r) : r == null && b === "string" ? (r = "", d = !0) : b === "number" && (r = 0, d = !0);
  }
  try {
    t[e] = r;
  } catch {
  }
  d && t.removeAttribute(e);
}
function ns(t, e, r, o) {
  t.addEventListener(e, r, o);
}
function ss(t, e, r, o) {
  t.removeEventListener(e, r, o);
}
const Po = Symbol("_vei");
function ls(t, e, r, o, a = null) {
  const i = t[Po] || (t[Po] = {}), n = i[e];
  if (o && n)
    n.value = o;
  else {
    const [l, d] = cs(e);
    if (o) {
      const b = i[e] = fs(o, a);
      ns(t, l, b, d);
    } else
      n && (ss(t, l, n, d), i[e] = void 0);
  }
}
const Fo = /(?:Once|Passive|Capture)$/;
function cs(t) {
  let e;
  if (Fo.test(t)) {
    e = {};
    let o;
    for (; o = t.match(Fo); )
      t = t.slice(0, t.length - o[0].length), e[o[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : dt(t.slice(2)), e];
}
let mr = 0;
const ds = /* @__PURE__ */ Promise.resolve(), bs = () => mr || (ds.then(() => mr = 0), mr = Date.now());
function fs(t, e) {
  const r = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= r.attached)
      return;
    ft(
      us(o, r.value),
      e,
      5,
      [o]
    );
  };
  return r.value = t, r.attached = bs(), r;
}
function us(t, e) {
  if (A(e)) {
    const r = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      r.call(t), t._stopped = !0;
    }, e.map((o) => (a) => !a._stopped && o && o(a));
  } else
    return e;
}
const Lo = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, ps = (t, e, r, o, a, i, n, l, d) => {
  const b = a === "svg";
  e === "class" ? Zn(t, o, b) : e === "style" ? rs(t, r, o) : Ve(e) ? Mr(e) || ls(t, e, r, o, n) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : hs(t, e, o, b)) ? is(
    t,
    e,
    o,
    i,
    n,
    l,
    d
  ) : (e === "true-value" ? t._trueValue = o : e === "false-value" && (t._falseValue = o), as(t, e, o, b));
};
function hs(t, e, r, o) {
  if (o)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Lo(e) && R(r));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const a = t.tagName;
    if (a === "IMG" || a === "VIDEO" || a === "CANVAS" || a === "SOURCE")
      return !1;
  }
  return Lo(e) && V(r) ? !1 : e in t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function rr(t, e) {
  const r = /* @__PURE__ */ me(t);
  class o extends Jr {
    constructor(i) {
      super(r, i, e);
    }
  }
  return o.def = r, o;
}
const gs = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Jr extends gs {
  constructor(e, r = {}, o) {
    super(), this._def = e, this._props = r, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && o ? o(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), fa(() => {
      this._connected || (zo(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let o = 0; o < this.attributes.length; o++)
      this._setAttr(this.attributes[o].name);
    this._ob = new MutationObserver((o) => {
      for (const a of o)
        this._setAttr(a.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const e = (o, a = !1) => {
      const { props: i, styles: n } = o;
      let l;
      if (i && !A(i))
        for (const d in i) {
          const b = i[d];
          (b === Number || b && b.type === Number) && (d in this._props && (this._props[d] = ao(this._props[d])), (l || (l = /* @__PURE__ */ Object.create(null)))[kt(d)] = !0);
        }
      this._numberProps = l, a && this._resolveProps(o), this._applyStyles(n), this._update();
    }, r = this._def.__asyncLoader;
    r ? r().then((o) => e(o, !0)) : e(this._def);
  }
  _resolveProps(e) {
    const { props: r } = e, o = A(r) ? r : Object.keys(r || {});
    for (const a of Object.keys(this))
      a[0] !== "_" && o.includes(a) && this._setProp(a, this[a], !0, !1);
    for (const a of o.map(kt))
      Object.defineProperty(this, a, {
        get() {
          return this._getProp(a);
        },
        set(i) {
          this._setProp(a, i);
        }
      });
  }
  _setAttr(e) {
    let r = this.getAttribute(e);
    const o = kt(e);
    this._numberProps && this._numberProps[o] && (r = ao(r)), this._setProp(o, r, !1);
  }
  /**
   * @internal
   */
  _getProp(e) {
    return this._props[e];
  }
  /**
   * @internal
   */
  _setProp(e, r, o = !0, a = !0) {
    r !== this._props[e] && (this._props[e] = r, a && this._instance && this._update(), o && (r === !0 ? this.setAttribute(dt(e), "") : typeof r == "string" || typeof r == "number" ? this.setAttribute(dt(e), r + "") : r || this.removeAttribute(dt(e))));
  }
  _update() {
    zo(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const e = Mt(this._def, q({}, this._props));
    return this._instance || (e.ce = (r) => {
      this._instance = r, r.isCE = !0;
      const o = (i, n) => {
        this.dispatchEvent(
          new CustomEvent(i, {
            detail: n
          })
        );
      };
      r.emit = (i, ...n) => {
        o(i, n), dt(i) !== i && o(dt(i), n);
      };
      let a = this;
      for (; a = a && (a.parentNode || a.host); )
        if (a instanceof Jr) {
          r.parent = a._instance, r.provides = a._instance.provides;
          break;
        }
    }), e;
  }
  _applyStyles(e) {
    e && e.forEach((r) => {
      const o = document.createElement("style");
      o.textContent = r, this.shadowRoot.appendChild(o);
    });
  }
}
const ws = /* @__PURE__ */ q({ patchProp: ps }, Xn);
let No;
function vs() {
  return No || (No = Cn(ws));
}
const zo = (...t) => {
  vs().render(...t);
}, Na = {
  languages: ["en", "fr"]
}, Te = ve({});
function or(t, e) {
  return Te[t] = Na.languages[0], {
    language: ca(Te, t),
    $t: (r) => e[Te[t]].messages[r] || r,
    setLanguage: (r) => {
      Te[t] = r;
    }
  };
}
const Ne = ve({
  initState(t) {
    Ne.counters[t] = 0;
  },
  counters: {}
});
function Xr(t) {
  return Ne.counters[t] === void 0 && Ne.initState(t), {
    counter: ca(Ne.counters, t)
  };
}
const ms = (t) => (Je("data-v-7cbabc4b"), t = t(), Xe(), t), ys = { class: "bg-blue-100 p-5 pt-16 text-center relative" }, _s = /* @__PURE__ */ ms(() => /* @__PURE__ */ at("h3", { class: "text-center text-xl text-blue-400 absolute right-2 top-2" }, "Component A", -1)), xs = /* @__PURE__ */ me({
  __name: "ComponentA.ce",
  props: {
    stateId: { type: String, required: !0 }
  },
  setup(t) {
    const e = t, r = {
      en: {
        messages: {
          Plus: "Plus",
          Minus: "Minus"
        }
      },
      fr: {
        messages: {
          Plus: "Plus",
          Minus: "Moins"
        }
      }
    }, { $t: o } = or(e.stateId, r), { counter: a } = Xr(e.stateId);
    function i() {
      a.value++;
    }
    function n() {
      a.value--;
    }
    return (l, d) => (Qt(), Zt("div", ys, [
      _s,
      at("button", {
        class: "btn btn--danger",
        onClick: i
      }, $t(yt(o)("Plus")), 1),
      at("button", {
        class: "btn btn--danger ml-4",
        onClick: n
      }, $t(yt(o)("Minus")), 1)
    ]));
  }
}), ks = '*[data-v-7cbabc4b],[data-v-7cbabc4b]:before,[data-v-7cbabc4b]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[data-v-7cbabc4b]:before,[data-v-7cbabc4b]:after{--tw-content: ""}html[data-v-7cbabc4b],[data-v-7cbabc4b]:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body[data-v-7cbabc4b]{margin:0;line-height:inherit}hr[data-v-7cbabc4b]{height:0;color:inherit;border-top-width:1px}abbr:where([title][data-v-7cbabc4b]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[data-v-7cbabc4b],h2[data-v-7cbabc4b],h3[data-v-7cbabc4b],h4[data-v-7cbabc4b],h5[data-v-7cbabc4b],h6[data-v-7cbabc4b]{font-size:inherit;font-weight:inherit}a[data-v-7cbabc4b]{color:inherit;text-decoration:inherit}b[data-v-7cbabc4b],strong[data-v-7cbabc4b]{font-weight:bolder}code[data-v-7cbabc4b],kbd[data-v-7cbabc4b],samp[data-v-7cbabc4b],pre[data-v-7cbabc4b]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small[data-v-7cbabc4b]{font-size:80%}sub[data-v-7cbabc4b],sup[data-v-7cbabc4b]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[data-v-7cbabc4b]{bottom:-.25em}sup[data-v-7cbabc4b]{top:-.5em}table[data-v-7cbabc4b]{text-indent:0;border-color:inherit;border-collapse:collapse}button[data-v-7cbabc4b],input[data-v-7cbabc4b],optgroup[data-v-7cbabc4b],select[data-v-7cbabc4b],textarea[data-v-7cbabc4b]{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button[data-v-7cbabc4b],select[data-v-7cbabc4b]{text-transform:none}button[data-v-7cbabc4b],[type=button][data-v-7cbabc4b],[type=reset][data-v-7cbabc4b],[type=submit][data-v-7cbabc4b]{-webkit-appearance:button;background-color:transparent;background-image:none}[data-v-7cbabc4b]:-moz-focusring{outline:auto}[data-v-7cbabc4b]:-moz-ui-invalid{box-shadow:none}progress[data-v-7cbabc4b]{vertical-align:baseline}[data-v-7cbabc4b]::-webkit-inner-spin-button,[data-v-7cbabc4b]::-webkit-outer-spin-button{height:auto}[type=search][data-v-7cbabc4b]{-webkit-appearance:textfield;outline-offset:-2px}[data-v-7cbabc4b]::-webkit-search-decoration{-webkit-appearance:none}[data-v-7cbabc4b]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[data-v-7cbabc4b]{display:list-item}blockquote[data-v-7cbabc4b],dl[data-v-7cbabc4b],dd[data-v-7cbabc4b],h1[data-v-7cbabc4b],h2[data-v-7cbabc4b],h3[data-v-7cbabc4b],h4[data-v-7cbabc4b],h5[data-v-7cbabc4b],h6[data-v-7cbabc4b],hr[data-v-7cbabc4b],figure[data-v-7cbabc4b],p[data-v-7cbabc4b],pre[data-v-7cbabc4b]{margin:0}fieldset[data-v-7cbabc4b]{margin:0;padding:0}legend[data-v-7cbabc4b]{padding:0}ol[data-v-7cbabc4b],ul[data-v-7cbabc4b],menu[data-v-7cbabc4b]{list-style:none;margin:0;padding:0}dialog[data-v-7cbabc4b]{padding:0}textarea[data-v-7cbabc4b]{resize:vertical}input[data-v-7cbabc4b]::-moz-placeholder,textarea[data-v-7cbabc4b]::-moz-placeholder{opacity:1;color:#9ca3af}input[data-v-7cbabc4b]::placeholder,textarea[data-v-7cbabc4b]::placeholder{opacity:1;color:#9ca3af}button[data-v-7cbabc4b],[role=button][data-v-7cbabc4b]{cursor:pointer}[data-v-7cbabc4b]:disabled{cursor:default}img[data-v-7cbabc4b],svg[data-v-7cbabc4b],video[data-v-7cbabc4b],canvas[data-v-7cbabc4b],audio[data-v-7cbabc4b],iframe[data-v-7cbabc4b],embed[data-v-7cbabc4b],object[data-v-7cbabc4b]{display:block;vertical-align:middle}img[data-v-7cbabc4b],video[data-v-7cbabc4b]{max-width:100%;height:auto}[hidden][data-v-7cbabc4b]{display:none}*[data-v-7cbabc4b],[data-v-7cbabc4b]:before,[data-v-7cbabc4b]:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }[data-v-7cbabc4b]::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.absolute[data-v-7cbabc4b]{position:absolute}.relative[data-v-7cbabc4b]{position:relative}.right-2[data-v-7cbabc4b]{right:.5rem}.top-2[data-v-7cbabc4b]{top:.5rem}.ml-2[data-v-7cbabc4b]{margin-left:.5rem}.ml-4[data-v-7cbabc4b]{margin-left:1rem}.block[data-v-7cbabc4b]{display:block}.flex[data-v-7cbabc4b]{display:flex}.table[data-v-7cbabc4b]{display:table}.w-full[data-v-7cbabc4b]{width:100%}.flex-wrap[data-v-7cbabc4b]{flex-wrap:wrap}.rounded-lg[data-v-7cbabc4b]{border-radius:.5rem}.border[data-v-7cbabc4b]{border-width:1px}.border-solid[data-v-7cbabc4b]{border-style:solid}.border-gray-300[data-v-7cbabc4b]{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-purple-900[data-v-7cbabc4b]{--tw-border-opacity: 1;border-color:rgb(88 28 135 / var(--tw-border-opacity))}.bg-blue-100[data-v-7cbabc4b]{--tw-bg-opacity: 1;background-color:rgb(219 234 254 / var(--tw-bg-opacity))}.bg-gray-50[data-v-7cbabc4b]{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.bg-green-100[data-v-7cbabc4b]{--tw-bg-opacity: 1;background-color:rgb(220 252 231 / var(--tw-bg-opacity))}.bg-purple-100[data-v-7cbabc4b]{--tw-bg-opacity: 1;background-color:rgb(243 232 255 / var(--tw-bg-opacity))}.bg-red-100[data-v-7cbabc4b]{--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity))}.p-2[data-v-7cbabc4b]{padding:.5rem}.p-2\\.5[data-v-7cbabc4b]{padding:.625rem}.p-5[data-v-7cbabc4b]{padding:1.25rem}.pb-4[data-v-7cbabc4b]{padding-bottom:1rem}.pt-16[data-v-7cbabc4b]{padding-top:4rem}.text-center[data-v-7cbabc4b]{text-align:center}.text-sm[data-v-7cbabc4b]{font-size:.875rem;line-height:1.25rem}.text-xl[data-v-7cbabc4b]{font-size:1.25rem;line-height:1.75rem}.text-blue-400[data-v-7cbabc4b]{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity))}.text-gray-900[data-v-7cbabc4b]{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.text-green-400[data-v-7cbabc4b]{--tw-text-opacity: 1;color:rgb(74 222 128 / var(--tw-text-opacity))}.text-purple-400[data-v-7cbabc4b]{--tw-text-opacity: 1;color:rgb(192 132 252 / var(--tw-text-opacity))}.text-red-400[data-v-7cbabc4b]{--tw-text-opacity: 1;color:rgb(248 113 113 / var(--tw-text-opacity))}.btn[data-v-7cbabc4b]{border-radius:.25rem;border-width:1px;border-style:solid;--tw-border-opacity: 1;border-color:rgb(156 163 175 / var(--tw-border-opacity));--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity));padding:1.25rem 2.25rem;--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity));line-height:1.13;font-size:1.2rem;font-weight:700;text-align:center}.btn--danger[data-v-7cbabc4b]{--tw-border-opacity: 1;border-color:rgb(220 38 38 / var(--tw-border-opacity));--tw-bg-opacity: 1;background-color:rgb(239 68 68 / var(--tw-bg-opacity));--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.focus\\:border-blue-500[data-v-7cbabc4b]:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity))}.focus\\:ring-blue-500[data-v-7cbabc4b]:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity))}@media (prefers-color-scheme: dark){.dark\\:border-gray-600[data-v-7cbabc4b]{--tw-border-opacity: 1;border-color:rgb(75 85 99 / var(--tw-border-opacity))}.dark\\:bg-gray-700[data-v-7cbabc4b]{--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}.dark\\:text-white[data-v-7cbabc4b]{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.dark\\:placeholder-gray-400[data-v-7cbabc4b]::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}.dark\\:placeholder-gray-400[data-v-7cbabc4b]::placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}.dark\\:focus\\:border-blue-500[data-v-7cbabc4b]:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity))}.dark\\:focus\\:ring-blue-500[data-v-7cbabc4b]:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity))}}', ar = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [o, a] of e)
    r[o] = a;
  return r;
}, Es = /* @__PURE__ */ ar(xs, [["styles", [ks]], ["__scopeId", "data-v-7cbabc4b"]]), Cs = (t) => (Je("data-v-6eb9b9d1"), t = t(), Xe(), t), As = { class: "bg-purple-100 border-solid border-1 border-purple-900 p-5 pt-16 relative" }, Ss = /* @__PURE__ */ Cs(() => /* @__PURE__ */ at("h3", { class: "text-center text-xl text-purple-400 absolute right-2 top-2" }, "Component B", -1)), Os = { class: "text-xl text-center" }, Rs = /* @__PURE__ */ me({
  __name: "ComponentB.ce",
  props: {
    stateId: { type: String, required: !0 }
  },
  setup(t) {
    const e = t, r = {
      en: {
        messages: {
          Counter: "Counter"
        }
      },
      fr: {
        messages: {
          Counter: "Compteur"
        }
      }
    }, { $t: o } = or(e.stateId, r), { counter: a } = Xr(e.stateId);
    return (i, n) => (Qt(), Zt("div", As, [
      Ss,
      at("h4", Os, $t(yt(o)("Counter")) + ": " + $t(yt(a)), 1)
    ]));
  }
}), Is = '*[data-v-6eb9b9d1],[data-v-6eb9b9d1]:before,[data-v-6eb9b9d1]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[data-v-6eb9b9d1]:before,[data-v-6eb9b9d1]:after{--tw-content: ""}html[data-v-6eb9b9d1],[data-v-6eb9b9d1]:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body[data-v-6eb9b9d1]{margin:0;line-height:inherit}hr[data-v-6eb9b9d1]{height:0;color:inherit;border-top-width:1px}abbr:where([title][data-v-6eb9b9d1]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[data-v-6eb9b9d1],h2[data-v-6eb9b9d1],h3[data-v-6eb9b9d1],h4[data-v-6eb9b9d1],h5[data-v-6eb9b9d1],h6[data-v-6eb9b9d1]{font-size:inherit;font-weight:inherit}a[data-v-6eb9b9d1]{color:inherit;text-decoration:inherit}b[data-v-6eb9b9d1],strong[data-v-6eb9b9d1]{font-weight:bolder}code[data-v-6eb9b9d1],kbd[data-v-6eb9b9d1],samp[data-v-6eb9b9d1],pre[data-v-6eb9b9d1]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small[data-v-6eb9b9d1]{font-size:80%}sub[data-v-6eb9b9d1],sup[data-v-6eb9b9d1]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[data-v-6eb9b9d1]{bottom:-.25em}sup[data-v-6eb9b9d1]{top:-.5em}table[data-v-6eb9b9d1]{text-indent:0;border-color:inherit;border-collapse:collapse}button[data-v-6eb9b9d1],input[data-v-6eb9b9d1],optgroup[data-v-6eb9b9d1],select[data-v-6eb9b9d1],textarea[data-v-6eb9b9d1]{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button[data-v-6eb9b9d1],select[data-v-6eb9b9d1]{text-transform:none}button[data-v-6eb9b9d1],[type=button][data-v-6eb9b9d1],[type=reset][data-v-6eb9b9d1],[type=submit][data-v-6eb9b9d1]{-webkit-appearance:button;background-color:transparent;background-image:none}[data-v-6eb9b9d1]:-moz-focusring{outline:auto}[data-v-6eb9b9d1]:-moz-ui-invalid{box-shadow:none}progress[data-v-6eb9b9d1]{vertical-align:baseline}[data-v-6eb9b9d1]::-webkit-inner-spin-button,[data-v-6eb9b9d1]::-webkit-outer-spin-button{height:auto}[type=search][data-v-6eb9b9d1]{-webkit-appearance:textfield;outline-offset:-2px}[data-v-6eb9b9d1]::-webkit-search-decoration{-webkit-appearance:none}[data-v-6eb9b9d1]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[data-v-6eb9b9d1]{display:list-item}blockquote[data-v-6eb9b9d1],dl[data-v-6eb9b9d1],dd[data-v-6eb9b9d1],h1[data-v-6eb9b9d1],h2[data-v-6eb9b9d1],h3[data-v-6eb9b9d1],h4[data-v-6eb9b9d1],h5[data-v-6eb9b9d1],h6[data-v-6eb9b9d1],hr[data-v-6eb9b9d1],figure[data-v-6eb9b9d1],p[data-v-6eb9b9d1],pre[data-v-6eb9b9d1]{margin:0}fieldset[data-v-6eb9b9d1]{margin:0;padding:0}legend[data-v-6eb9b9d1]{padding:0}ol[data-v-6eb9b9d1],ul[data-v-6eb9b9d1],menu[data-v-6eb9b9d1]{list-style:none;margin:0;padding:0}dialog[data-v-6eb9b9d1]{padding:0}textarea[data-v-6eb9b9d1]{resize:vertical}input[data-v-6eb9b9d1]::-moz-placeholder,textarea[data-v-6eb9b9d1]::-moz-placeholder{opacity:1;color:#9ca3af}input[data-v-6eb9b9d1]::placeholder,textarea[data-v-6eb9b9d1]::placeholder{opacity:1;color:#9ca3af}button[data-v-6eb9b9d1],[role=button][data-v-6eb9b9d1]{cursor:pointer}[data-v-6eb9b9d1]:disabled{cursor:default}img[data-v-6eb9b9d1],svg[data-v-6eb9b9d1],video[data-v-6eb9b9d1],canvas[data-v-6eb9b9d1],audio[data-v-6eb9b9d1],iframe[data-v-6eb9b9d1],embed[data-v-6eb9b9d1],object[data-v-6eb9b9d1]{display:block;vertical-align:middle}img[data-v-6eb9b9d1],video[data-v-6eb9b9d1]{max-width:100%;height:auto}[hidden][data-v-6eb9b9d1]{display:none}*[data-v-6eb9b9d1],[data-v-6eb9b9d1]:before,[data-v-6eb9b9d1]:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }[data-v-6eb9b9d1]::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.absolute[data-v-6eb9b9d1]{position:absolute}.relative[data-v-6eb9b9d1]{position:relative}.right-2[data-v-6eb9b9d1]{right:.5rem}.top-2[data-v-6eb9b9d1]{top:.5rem}.ml-2[data-v-6eb9b9d1]{margin-left:.5rem}.ml-4[data-v-6eb9b9d1]{margin-left:1rem}.block[data-v-6eb9b9d1]{display:block}.flex[data-v-6eb9b9d1]{display:flex}.table[data-v-6eb9b9d1]{display:table}.w-full[data-v-6eb9b9d1]{width:100%}.flex-wrap[data-v-6eb9b9d1]{flex-wrap:wrap}.rounded-lg[data-v-6eb9b9d1]{border-radius:.5rem}.border[data-v-6eb9b9d1]{border-width:1px}.border-solid[data-v-6eb9b9d1]{border-style:solid}.border-gray-300[data-v-6eb9b9d1]{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-purple-900[data-v-6eb9b9d1]{--tw-border-opacity: 1;border-color:rgb(88 28 135 / var(--tw-border-opacity))}.bg-blue-100[data-v-6eb9b9d1]{--tw-bg-opacity: 1;background-color:rgb(219 234 254 / var(--tw-bg-opacity))}.bg-gray-50[data-v-6eb9b9d1]{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.bg-green-100[data-v-6eb9b9d1]{--tw-bg-opacity: 1;background-color:rgb(220 252 231 / var(--tw-bg-opacity))}.bg-purple-100[data-v-6eb9b9d1]{--tw-bg-opacity: 1;background-color:rgb(243 232 255 / var(--tw-bg-opacity))}.bg-red-100[data-v-6eb9b9d1]{--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity))}.p-2[data-v-6eb9b9d1]{padding:.5rem}.p-2\\.5[data-v-6eb9b9d1]{padding:.625rem}.p-5[data-v-6eb9b9d1]{padding:1.25rem}.pb-4[data-v-6eb9b9d1]{padding-bottom:1rem}.pt-16[data-v-6eb9b9d1]{padding-top:4rem}.text-center[data-v-6eb9b9d1]{text-align:center}.text-sm[data-v-6eb9b9d1]{font-size:.875rem;line-height:1.25rem}.text-xl[data-v-6eb9b9d1]{font-size:1.25rem;line-height:1.75rem}.text-blue-400[data-v-6eb9b9d1]{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity))}.text-gray-900[data-v-6eb9b9d1]{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.text-green-400[data-v-6eb9b9d1]{--tw-text-opacity: 1;color:rgb(74 222 128 / var(--tw-text-opacity))}.text-purple-400[data-v-6eb9b9d1]{--tw-text-opacity: 1;color:rgb(192 132 252 / var(--tw-text-opacity))}.text-red-400[data-v-6eb9b9d1]{--tw-text-opacity: 1;color:rgb(248 113 113 / var(--tw-text-opacity))}.focus\\:border-blue-500[data-v-6eb9b9d1]:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity))}.focus\\:ring-blue-500[data-v-6eb9b9d1]:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity))}@media (prefers-color-scheme: dark){.dark\\:border-gray-600[data-v-6eb9b9d1]{--tw-border-opacity: 1;border-color:rgb(75 85 99 / var(--tw-border-opacity))}.dark\\:bg-gray-700[data-v-6eb9b9d1]{--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}.dark\\:text-white[data-v-6eb9b9d1]{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.dark\\:placeholder-gray-400[data-v-6eb9b9d1]::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}.dark\\:placeholder-gray-400[data-v-6eb9b9d1]::placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}.dark\\:focus\\:border-blue-500[data-v-6eb9b9d1]:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity))}.dark\\:focus\\:ring-blue-500[data-v-6eb9b9d1]:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity))}}', Ts = /* @__PURE__ */ ar(Rs, [["styles", [Is]], ["__scopeId", "data-v-6eb9b9d1"]]), Ms = (t) => (Je("data-v-fb74dd00"), t = t(), Xe(), t), Ps = { class: "bg-green-100 p-5 pt-16 text-center relative" }, Fs = /* @__PURE__ */ Ms(() => /* @__PURE__ */ at("h3", { class: "text-center text-xl text-green-400 absolute right-2 top-2" }, "Component C", -1)), Ls = /* @__PURE__ */ me({
  __name: "ComponentC.ce",
  props: {
    stateId: { type: String, required: !0 }
  },
  setup(t) {
    const e = t, r = {
      en: {
        messages: {
          ResetCounter: "Reset Counter"
        }
      },
      fr: {
        messages: {
          ResetCounter: "Réinitialiser le Compteur"
        }
      }
    }, { counter: o } = Xr(e.stateId), { $t: a } = or(e.stateId, r);
    function i() {
      o.value = 0;
    }
    return (n, l) => (Qt(), Zt("div", Ps, [
      Fs,
      at("button", {
        class: "btn btn--danger",
        onClick: i
      }, $t(yt(a)("ResetCounter")), 1)
    ]));
  }
}), Ns = '*[data-v-fb74dd00],[data-v-fb74dd00]:before,[data-v-fb74dd00]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[data-v-fb74dd00]:before,[data-v-fb74dd00]:after{--tw-content: ""}html[data-v-fb74dd00],[data-v-fb74dd00]:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body[data-v-fb74dd00]{margin:0;line-height:inherit}hr[data-v-fb74dd00]{height:0;color:inherit;border-top-width:1px}abbr:where([title][data-v-fb74dd00]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[data-v-fb74dd00],h2[data-v-fb74dd00],h3[data-v-fb74dd00],h4[data-v-fb74dd00],h5[data-v-fb74dd00],h6[data-v-fb74dd00]{font-size:inherit;font-weight:inherit}a[data-v-fb74dd00]{color:inherit;text-decoration:inherit}b[data-v-fb74dd00],strong[data-v-fb74dd00]{font-weight:bolder}code[data-v-fb74dd00],kbd[data-v-fb74dd00],samp[data-v-fb74dd00],pre[data-v-fb74dd00]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small[data-v-fb74dd00]{font-size:80%}sub[data-v-fb74dd00],sup[data-v-fb74dd00]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[data-v-fb74dd00]{bottom:-.25em}sup[data-v-fb74dd00]{top:-.5em}table[data-v-fb74dd00]{text-indent:0;border-color:inherit;border-collapse:collapse}button[data-v-fb74dd00],input[data-v-fb74dd00],optgroup[data-v-fb74dd00],select[data-v-fb74dd00],textarea[data-v-fb74dd00]{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button[data-v-fb74dd00],select[data-v-fb74dd00]{text-transform:none}button[data-v-fb74dd00],[type=button][data-v-fb74dd00],[type=reset][data-v-fb74dd00],[type=submit][data-v-fb74dd00]{-webkit-appearance:button;background-color:transparent;background-image:none}[data-v-fb74dd00]:-moz-focusring{outline:auto}[data-v-fb74dd00]:-moz-ui-invalid{box-shadow:none}progress[data-v-fb74dd00]{vertical-align:baseline}[data-v-fb74dd00]::-webkit-inner-spin-button,[data-v-fb74dd00]::-webkit-outer-spin-button{height:auto}[type=search][data-v-fb74dd00]{-webkit-appearance:textfield;outline-offset:-2px}[data-v-fb74dd00]::-webkit-search-decoration{-webkit-appearance:none}[data-v-fb74dd00]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[data-v-fb74dd00]{display:list-item}blockquote[data-v-fb74dd00],dl[data-v-fb74dd00],dd[data-v-fb74dd00],h1[data-v-fb74dd00],h2[data-v-fb74dd00],h3[data-v-fb74dd00],h4[data-v-fb74dd00],h5[data-v-fb74dd00],h6[data-v-fb74dd00],hr[data-v-fb74dd00],figure[data-v-fb74dd00],p[data-v-fb74dd00],pre[data-v-fb74dd00]{margin:0}fieldset[data-v-fb74dd00]{margin:0;padding:0}legend[data-v-fb74dd00]{padding:0}ol[data-v-fb74dd00],ul[data-v-fb74dd00],menu[data-v-fb74dd00]{list-style:none;margin:0;padding:0}dialog[data-v-fb74dd00]{padding:0}textarea[data-v-fb74dd00]{resize:vertical}input[data-v-fb74dd00]::-moz-placeholder,textarea[data-v-fb74dd00]::-moz-placeholder{opacity:1;color:#9ca3af}input[data-v-fb74dd00]::placeholder,textarea[data-v-fb74dd00]::placeholder{opacity:1;color:#9ca3af}button[data-v-fb74dd00],[role=button][data-v-fb74dd00]{cursor:pointer}[data-v-fb74dd00]:disabled{cursor:default}img[data-v-fb74dd00],svg[data-v-fb74dd00],video[data-v-fb74dd00],canvas[data-v-fb74dd00],audio[data-v-fb74dd00],iframe[data-v-fb74dd00],embed[data-v-fb74dd00],object[data-v-fb74dd00]{display:block;vertical-align:middle}img[data-v-fb74dd00],video[data-v-fb74dd00]{max-width:100%;height:auto}[hidden][data-v-fb74dd00]{display:none}*[data-v-fb74dd00],[data-v-fb74dd00]:before,[data-v-fb74dd00]:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }[data-v-fb74dd00]::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.absolute[data-v-fb74dd00]{position:absolute}.relative[data-v-fb74dd00]{position:relative}.right-2[data-v-fb74dd00]{right:.5rem}.top-2[data-v-fb74dd00]{top:.5rem}.ml-2[data-v-fb74dd00]{margin-left:.5rem}.ml-4[data-v-fb74dd00]{margin-left:1rem}.block[data-v-fb74dd00]{display:block}.flex[data-v-fb74dd00]{display:flex}.table[data-v-fb74dd00]{display:table}.w-full[data-v-fb74dd00]{width:100%}.flex-wrap[data-v-fb74dd00]{flex-wrap:wrap}.rounded-lg[data-v-fb74dd00]{border-radius:.5rem}.border[data-v-fb74dd00]{border-width:1px}.border-solid[data-v-fb74dd00]{border-style:solid}.border-gray-300[data-v-fb74dd00]{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-purple-900[data-v-fb74dd00]{--tw-border-opacity: 1;border-color:rgb(88 28 135 / var(--tw-border-opacity))}.bg-blue-100[data-v-fb74dd00]{--tw-bg-opacity: 1;background-color:rgb(219 234 254 / var(--tw-bg-opacity))}.bg-gray-50[data-v-fb74dd00]{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.bg-green-100[data-v-fb74dd00]{--tw-bg-opacity: 1;background-color:rgb(220 252 231 / var(--tw-bg-opacity))}.bg-purple-100[data-v-fb74dd00]{--tw-bg-opacity: 1;background-color:rgb(243 232 255 / var(--tw-bg-opacity))}.bg-red-100[data-v-fb74dd00]{--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity))}.p-2[data-v-fb74dd00]{padding:.5rem}.p-2\\.5[data-v-fb74dd00]{padding:.625rem}.p-5[data-v-fb74dd00]{padding:1.25rem}.pb-4[data-v-fb74dd00]{padding-bottom:1rem}.pt-16[data-v-fb74dd00]{padding-top:4rem}.text-center[data-v-fb74dd00]{text-align:center}.text-sm[data-v-fb74dd00]{font-size:.875rem;line-height:1.25rem}.text-xl[data-v-fb74dd00]{font-size:1.25rem;line-height:1.75rem}.text-blue-400[data-v-fb74dd00]{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity))}.text-gray-900[data-v-fb74dd00]{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.text-green-400[data-v-fb74dd00]{--tw-text-opacity: 1;color:rgb(74 222 128 / var(--tw-text-opacity))}.text-purple-400[data-v-fb74dd00]{--tw-text-opacity: 1;color:rgb(192 132 252 / var(--tw-text-opacity))}.text-red-400[data-v-fb74dd00]{--tw-text-opacity: 1;color:rgb(248 113 113 / var(--tw-text-opacity))}.btn[data-v-fb74dd00]{border-radius:.25rem;border-width:1px;border-style:solid;--tw-border-opacity: 1;border-color:rgb(156 163 175 / var(--tw-border-opacity));--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity));padding:1.25rem 2.25rem;--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity));line-height:1.13;font-size:1.2rem;font-weight:700;text-align:center}.btn--danger[data-v-fb74dd00]{--tw-border-opacity: 1;border-color:rgb(220 38 38 / var(--tw-border-opacity));--tw-bg-opacity: 1;background-color:rgb(239 68 68 / var(--tw-bg-opacity));--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.focus\\:border-blue-500[data-v-fb74dd00]:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity))}.focus\\:ring-blue-500[data-v-fb74dd00]:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity))}@media (prefers-color-scheme: dark){.dark\\:border-gray-600[data-v-fb74dd00]{--tw-border-opacity: 1;border-color:rgb(75 85 99 / var(--tw-border-opacity))}.dark\\:bg-gray-700[data-v-fb74dd00]{--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}.dark\\:text-white[data-v-fb74dd00]{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.dark\\:placeholder-gray-400[data-v-fb74dd00]::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}.dark\\:placeholder-gray-400[data-v-fb74dd00]::placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}.dark\\:focus\\:border-blue-500[data-v-fb74dd00]:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity))}.dark\\:focus\\:ring-blue-500[data-v-fb74dd00]:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity))}}', zs = /* @__PURE__ */ ar(Ls, [["styles", [Ns]], ["__scopeId", "data-v-fb74dd00"]]), js = (t) => (Je("data-v-84f58bb8"), t = t(), Xe(), t), Us = { class: "bg-red-100 p-5 pt-16 relative" }, Bs = /* @__PURE__ */ js(() => /* @__PURE__ */ at("h3", { class: "text-center text-red-400 text-xl absolute right-2 top-2" }, "Component D", -1)), Ds = { class: "pb-4 text-center text-red-400 text-xl flex" }, Hs = ["src"], Vs = ["value"], $s = ["value"], Ws = /* @__PURE__ */ me({
  __name: "ComponentD.ce",
  props: {
    stateId: { type: String, required: !0 }
  },
  setup(t) {
    const e = t, r = {
      en: {
        messages: {
          YourLanguage: "Your language is English",
          Lang: "English",
          Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAD/klEQVRYhe1WXWwUVRSehMRooZDGYrJtGjRCrKFSaTfdgoamlB8jYiDRhyb+Pe2DJMqTQiHRFF8Q29iU+GQjhISk0ChFIgZDjZAWSgtIqt2tW7oLuu3utt2fmd2d3dmZ+bz3TufO2t2mLA/yQE/ybe7eOfc735x759wjCEv22NtbwqbWVmG51i4IoGjt6GJYX9UFQTiaA/O56T9/XbZvUVEbn5+/jsaksYXs4NlE/ikJFRXfPLSAZcu+xLlez4ICTBGC+SdSX4Xom9uQGRqEaeFIBtt3jMHhGOUQRZU9C1RWYtJmY6BjavSZ6Td4Q4Ku62xeCwUhfeRkMUyYcbmA2br1BhxVSHQcg55Os8WxmAqn0/vAAhoa3HC5kvwl0n2XEN622eLfVI1Y21FLgJma2NdtmCYPp+0vMkSa9yDjGWMkqqqju3t2UQHJpAa/3xCuxyWInx/kfBThfU4kxu5CljUkEgpOnx61BLDJcR9mP/4QwY0vMITqNyBx6jvCpjMRly/HEI9rOQKCdrsR1Mg4lNvDmHmjifNM73kNUt+vLAbFwICE3bt75s4L+dm58wz6+yXuIP12FcG9r2Oqeh3DrPM9qIEpZDI6D/IfAXV1MBWIHV9hqqaSrQu8UoNo17eQxRTj9XpT6OwMskxaB3tuQCfb2wPweAxnOa4gcvIEJjfX4J+XnsckIUte/JHvbT4BKjls1Ne/YR1mDh9Awh/iL9XTE8bWrW5+lrgAcwsKtbwZKMD4Z/vIBZifg0n2fyGnDiwJoHtaCCbLyizC8vKC1+dUwkd2CM0BLbEUtJxqmlHVdDLQJAlqLApNlhcVoGcU4htj0BXF4CBQFJ3zm7Buz6xCRIuFWThC587jzto1+P3ZMoR/+J4H1hfJgDzuweirDtx6pgS+lhYkpTTj6+sTsWvXX7mFiP7YbMeZA3VMkrLp/fQTDJeuwkhtNRJ/jBiBSWTfPTn/XTBvC1SStfEP3sHw0yvx544miOP3GLfPl8b+/ffzV0LqQB1HGhswWLIC7rf3IhOJGISajp9+jmDLFlfe2zBYW8vmouTqTqW1OcE6/G3HcKN0JW4+V4HQhYs8u2fPhnMFBHsvYGhNOa6tWo77rZ9BV41AKUXDkS/8D9wPNDffZY2MaZFfLnHeiUOHyZYoTER3twurV3dan2F/8VO4bivFzPlea3E0wwgL7YgaG90YuCZCm7s6Ze8Ebtfb0b/iSdxpaoQ48XduHRh+mXRCrlGevsEhiRFlBy+kJaPoPB4gV7ixJWo8Dvf77+Jq0RO4TjJi1YF5TSld0HLoSt6OuNCumMJuP0kymVqgKS1WWVt+JEuEo/7UgsEfRgBFSUlHnra8WGVt+ZI99vYviMsfDRTQ5aEAAAAASUVORK5CYII="
        }
      },
      fr: {
        messages: {
          YourLanguage: "Votre langue est le français",
          Lang: "French",
          Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAeElEQVR42mMYBaPAWWe2uJv+vMtA/B8fbpo4lyS8lIsLL17GxXV5GTe3OAPMcvo6AOEIBpgFaU6f8OKvP36ThJ/KyuLDcEeMOmDUAaMOGHXAqANGHTDqgFEHjDpgwB1A30YpJj4Hbpa76s+7OgAOOAdqlo92jEYBABPTRkb6FjqAAAAAAElFTkSuQmCC"
        }
      }
    }, { setLanguage: o, $t: a, language: i } = or(e.stateId, r);
    function n(l) {
      const d = l.target;
      d.value && o(d.value);
    }
    return (l, d) => (Qt(), Zt("div", Us, [
      Bs,
      at("h3", Ds, [
        Ma($t(yt(a)("YourLanguage")) + " ", 1),
        at("img", {
          class: "ml-2",
          src: yt(a)("Flag")
        }, null, 8, Hs)
      ]),
      at("select", {
        value: yt(i),
        class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
        onChange: n
      }, [
        (Qt(!0), Zt(wt, null, dn(yt(Na).languages, (b) => (Qt(), Zt("option", {
          key: b,
          value: b
        }, $t(r[b].messages.Lang), 9, $s))), 128))
      ], 40, Vs)
    ]));
  }
}), Ks = '*[data-v-84f58bb8],[data-v-84f58bb8]:before,[data-v-84f58bb8]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[data-v-84f58bb8]:before,[data-v-84f58bb8]:after{--tw-content: ""}html[data-v-84f58bb8],[data-v-84f58bb8]:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body[data-v-84f58bb8]{margin:0;line-height:inherit}hr[data-v-84f58bb8]{height:0;color:inherit;border-top-width:1px}abbr:where([title][data-v-84f58bb8]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[data-v-84f58bb8],h2[data-v-84f58bb8],h3[data-v-84f58bb8],h4[data-v-84f58bb8],h5[data-v-84f58bb8],h6[data-v-84f58bb8]{font-size:inherit;font-weight:inherit}a[data-v-84f58bb8]{color:inherit;text-decoration:inherit}b[data-v-84f58bb8],strong[data-v-84f58bb8]{font-weight:bolder}code[data-v-84f58bb8],kbd[data-v-84f58bb8],samp[data-v-84f58bb8],pre[data-v-84f58bb8]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small[data-v-84f58bb8]{font-size:80%}sub[data-v-84f58bb8],sup[data-v-84f58bb8]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[data-v-84f58bb8]{bottom:-.25em}sup[data-v-84f58bb8]{top:-.5em}table[data-v-84f58bb8]{text-indent:0;border-color:inherit;border-collapse:collapse}button[data-v-84f58bb8],input[data-v-84f58bb8],optgroup[data-v-84f58bb8],select[data-v-84f58bb8],textarea[data-v-84f58bb8]{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button[data-v-84f58bb8],select[data-v-84f58bb8]{text-transform:none}button[data-v-84f58bb8],[type=button][data-v-84f58bb8],[type=reset][data-v-84f58bb8],[type=submit][data-v-84f58bb8]{-webkit-appearance:button;background-color:transparent;background-image:none}[data-v-84f58bb8]:-moz-focusring{outline:auto}[data-v-84f58bb8]:-moz-ui-invalid{box-shadow:none}progress[data-v-84f58bb8]{vertical-align:baseline}[data-v-84f58bb8]::-webkit-inner-spin-button,[data-v-84f58bb8]::-webkit-outer-spin-button{height:auto}[type=search][data-v-84f58bb8]{-webkit-appearance:textfield;outline-offset:-2px}[data-v-84f58bb8]::-webkit-search-decoration{-webkit-appearance:none}[data-v-84f58bb8]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[data-v-84f58bb8]{display:list-item}blockquote[data-v-84f58bb8],dl[data-v-84f58bb8],dd[data-v-84f58bb8],h1[data-v-84f58bb8],h2[data-v-84f58bb8],h3[data-v-84f58bb8],h4[data-v-84f58bb8],h5[data-v-84f58bb8],h6[data-v-84f58bb8],hr[data-v-84f58bb8],figure[data-v-84f58bb8],p[data-v-84f58bb8],pre[data-v-84f58bb8]{margin:0}fieldset[data-v-84f58bb8]{margin:0;padding:0}legend[data-v-84f58bb8]{padding:0}ol[data-v-84f58bb8],ul[data-v-84f58bb8],menu[data-v-84f58bb8]{list-style:none;margin:0;padding:0}dialog[data-v-84f58bb8]{padding:0}textarea[data-v-84f58bb8]{resize:vertical}input[data-v-84f58bb8]::-moz-placeholder,textarea[data-v-84f58bb8]::-moz-placeholder{opacity:1;color:#9ca3af}input[data-v-84f58bb8]::placeholder,textarea[data-v-84f58bb8]::placeholder{opacity:1;color:#9ca3af}button[data-v-84f58bb8],[role=button][data-v-84f58bb8]{cursor:pointer}[data-v-84f58bb8]:disabled{cursor:default}img[data-v-84f58bb8],svg[data-v-84f58bb8],video[data-v-84f58bb8],canvas[data-v-84f58bb8],audio[data-v-84f58bb8],iframe[data-v-84f58bb8],embed[data-v-84f58bb8],object[data-v-84f58bb8]{display:block;vertical-align:middle}img[data-v-84f58bb8],video[data-v-84f58bb8]{max-width:100%;height:auto}[hidden][data-v-84f58bb8]{display:none}*[data-v-84f58bb8],[data-v-84f58bb8]:before,[data-v-84f58bb8]:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }[data-v-84f58bb8]::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.absolute[data-v-84f58bb8]{position:absolute}.relative[data-v-84f58bb8]{position:relative}.right-2[data-v-84f58bb8]{right:.5rem}.top-2[data-v-84f58bb8]{top:.5rem}.ml-2[data-v-84f58bb8]{margin-left:.5rem}.ml-4[data-v-84f58bb8]{margin-left:1rem}.block[data-v-84f58bb8]{display:block}.flex[data-v-84f58bb8]{display:flex}.table[data-v-84f58bb8]{display:table}.w-full[data-v-84f58bb8]{width:100%}.flex-wrap[data-v-84f58bb8]{flex-wrap:wrap}.rounded-lg[data-v-84f58bb8]{border-radius:.5rem}.border[data-v-84f58bb8]{border-width:1px}.border-solid[data-v-84f58bb8]{border-style:solid}.border-gray-300[data-v-84f58bb8]{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-purple-900[data-v-84f58bb8]{--tw-border-opacity: 1;border-color:rgb(88 28 135 / var(--tw-border-opacity))}.bg-blue-100[data-v-84f58bb8]{--tw-bg-opacity: 1;background-color:rgb(219 234 254 / var(--tw-bg-opacity))}.bg-gray-50[data-v-84f58bb8]{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.bg-green-100[data-v-84f58bb8]{--tw-bg-opacity: 1;background-color:rgb(220 252 231 / var(--tw-bg-opacity))}.bg-purple-100[data-v-84f58bb8]{--tw-bg-opacity: 1;background-color:rgb(243 232 255 / var(--tw-bg-opacity))}.bg-red-100[data-v-84f58bb8]{--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity))}.p-2[data-v-84f58bb8]{padding:.5rem}.p-2\\.5[data-v-84f58bb8]{padding:.625rem}.p-5[data-v-84f58bb8]{padding:1.25rem}.pb-4[data-v-84f58bb8]{padding-bottom:1rem}.pt-16[data-v-84f58bb8]{padding-top:4rem}.text-center[data-v-84f58bb8]{text-align:center}.text-sm[data-v-84f58bb8]{font-size:.875rem;line-height:1.25rem}.text-xl[data-v-84f58bb8]{font-size:1.25rem;line-height:1.75rem}.text-blue-400[data-v-84f58bb8]{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity))}.text-gray-900[data-v-84f58bb8]{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.text-green-400[data-v-84f58bb8]{--tw-text-opacity: 1;color:rgb(74 222 128 / var(--tw-text-opacity))}.text-purple-400[data-v-84f58bb8]{--tw-text-opacity: 1;color:rgb(192 132 252 / var(--tw-text-opacity))}.text-red-400[data-v-84f58bb8]{--tw-text-opacity: 1;color:rgb(248 113 113 / var(--tw-text-opacity))}.focus\\:border-blue-500[data-v-84f58bb8]:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity))}.focus\\:ring-blue-500[data-v-84f58bb8]:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity))}@media (prefers-color-scheme: dark){.dark\\:border-gray-600[data-v-84f58bb8]{--tw-border-opacity: 1;border-color:rgb(75 85 99 / var(--tw-border-opacity))}.dark\\:bg-gray-700[data-v-84f58bb8]{--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}.dark\\:text-white[data-v-84f58bb8]{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.dark\\:placeholder-gray-400[data-v-84f58bb8]::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}.dark\\:placeholder-gray-400[data-v-84f58bb8]::placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}.dark\\:focus\\:border-blue-500[data-v-84f58bb8]:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity))}.dark\\:focus\\:ring-blue-500[data-v-84f58bb8]:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity))}}', Gs = /* @__PURE__ */ ar(Ws, [["styles", [Ks]], ["__scopeId", "data-v-84f58bb8"]]), qs = /* @__PURE__ */ rr(Es), Ys = /* @__PURE__ */ rr(Ts), Js = /* @__PURE__ */ rr(zs), Xs = /* @__PURE__ */ rr(Gs);
function Qs() {
  customElements.define("component-a", qs), customElements.define("component-b", Ys), customElements.define("component-c", Js), customElements.define("component-d", Xs);
}
Qs();
