import { r as c, a as Ze, R as Xe, b as Ce } from "./react-b69f2a9f.js";
(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s);
  new MutationObserver((s) => {
    for (const l of s)
      if (l.type === "childList")
        for (const i of l.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(s) {
    const l = {};
    return (
      s.integrity && (l.integrity = s.integrity),
      s.referrerPolicy && (l.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function n(s) {
    if (s.ep) return;
    s.ep = !0;
    const l = a(s);
    fetch(s.href, l);
  }
})();
var Se = { exports: {} },
  re = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qe = c,
  et = Symbol.for("react.element"),
  tt = Symbol.for("react.fragment"),
  rt = Object.prototype.hasOwnProperty,
  at = Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  nt = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ee(e, r, a) {
  var n,
    s = {},
    l = null,
    i = null;
  (a !== void 0 && (l = "" + a),
    r.key !== void 0 && (l = "" + r.key),
    r.ref !== void 0 && (i = r.ref));
  for (n in r) rt.call(r, n) && !nt.hasOwnProperty(n) && (s[n] = r[n]);
  if (e && e.defaultProps)
    for (n in ((r = e.defaultProps), r)) s[n] === void 0 && (s[n] = r[n]);
  return {
    $$typeof: et,
    type: e,
    key: l,
    ref: i,
    props: s,
    _owner: at.current,
  };
}
re.Fragment = tt;
re.jsx = Ee;
re.jsxs = Ee;
Se.exports = re;
var t = Se.exports,
  Re,
  xe = Ze;
((Re = xe.createRoot), xe.hydrateRoot);
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function G() {
  return (
    (G = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var a = arguments[r];
            for (var n in a)
              Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
          }
          return e;
        }),
    G.apply(this, arguments)
  );
}
var U;
(function (e) {
  ((e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE"));
})(U || (U = {}));
const me = "popstate";
function st(e) {
  e === void 0 && (e = {});
  function r(n, s) {
    let { pathname: l, search: i, hash: o } = n.location;
    return ie(
      "",
      { pathname: l, search: i, hash: o },
      (s.state && s.state.usr) || null,
      (s.state && s.state.key) || "default"
    );
  }
  function a(n, s) {
    return typeof s == "string" ? s : X(s);
  }
  return it(r, a, null, e);
}
function C(e, r) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(r);
}
function Le(e, r) {
  if (!e) {
    typeof console < "u" && console.warn(r);
    try {
      throw new Error(r);
    } catch {}
  }
}
function lt() {
  return Math.random().toString(36).substr(2, 8);
}
function fe(e, r) {
  return { usr: e.state, key: e.key, idx: r };
}
function ie(e, r, a, n) {
  return (
    a === void 0 && (a = null),
    G(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof r == "string" ? V(r) : r,
      { state: a, key: (r && r.key) || n || lt() }
    )
  );
}
function X(e) {
  let { pathname: r = "/", search: a = "", hash: n = "" } = e;
  return (
    a && a !== "?" && (r += a.charAt(0) === "?" ? a : "?" + a),
    n && n !== "#" && (r += n.charAt(0) === "#" ? n : "#" + n),
    r
  );
}
function V(e) {
  let r = {};
  if (e) {
    let a = e.indexOf("#");
    a >= 0 && ((r.hash = e.substr(a)), (e = e.substr(0, a)));
    let n = e.indexOf("?");
    (n >= 0 && ((r.search = e.substr(n)), (e = e.substr(0, n))),
      e && (r.pathname = e));
  }
  return r;
}
function it(e, r, a, n) {
  n === void 0 && (n = {});
  let { window: s = document.defaultView, v5Compat: l = !1 } = n,
    i = s.history,
    o = U.Pop,
    u = null,
    d = x();
  d == null && ((d = 0), i.replaceState(G({}, i.state, { idx: d }), ""));
  function x() {
    return (i.state || { idx: null }).idx;
  }
  function h() {
    o = U.Pop;
    let f = x(),
      N = f == null ? null : f - d;
    ((d = f), u && u({ action: o, location: p.location, delta: N }));
  }
  function g(f, N) {
    o = U.Push;
    let j = ie(p.location, f, N);
    (a && a(j, f), (d = x() + 1));
    let w = fe(j, d),
      k = p.createHref(j);
    try {
      i.pushState(w, "", k);
    } catch (P) {
      if (P instanceof DOMException && P.name === "DataCloneError") throw P;
      s.location.assign(k);
    }
    l && u && u({ action: o, location: p.location, delta: 1 });
  }
  function y(f, N) {
    o = U.Replace;
    let j = ie(p.location, f, N);
    (a && a(j, f), (d = x()));
    let w = fe(j, d),
      k = p.createHref(j);
    (i.replaceState(w, "", k),
      l && u && u({ action: o, location: p.location, delta: 0 }));
  }
  function b(f) {
    let N = s.location.origin !== "null" ? s.location.origin : s.location.href,
      j = typeof f == "string" ? f : X(f);
    return (
      (j = j.replace(/ $/, "%20")),
      C(
        N,
        "No window.location.(origin|href) available to create URL for href: " +
          j
      ),
      new URL(j, N)
    );
  }
  let p = {
    get action() {
      return o;
    },
    get location() {
      return e(s, i);
    },
    listen(f) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        s.addEventListener(me, h),
        (u = f),
        () => {
          (s.removeEventListener(me, h), (u = null));
        }
      );
    },
    createHref(f) {
      return r(s, f);
    },
    createURL: b,
    encodeLocation(f) {
      let N = b(f);
      return { pathname: N.pathname, search: N.search, hash: N.hash };
    },
    push: g,
    replace: y,
    go(f) {
      return i.go(f);
    },
  };
  return p;
}
var ge;
(function (e) {
  ((e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error"));
})(ge || (ge = {}));
function ot(e, r, a) {
  return (a === void 0 && (a = "/"), ct(e, r, a, !1));
}
function ct(e, r, a, n) {
  let s = typeof r == "string" ? V(r) : r,
    l = T(s.pathname || "/", a);
  if (l == null) return null;
  let i = Pe(e);
  dt(i);
  let o = null;
  for (let u = 0; o == null && u < i.length; ++u) {
    let d = jt(l);
    o = bt(i[u], d, n);
  }
  return o;
}
function Pe(e, r, a, n) {
  (r === void 0 && (r = []),
    a === void 0 && (a = []),
    n === void 0 && (n = ""));
  let s = (l, i, o) => {
    let u = {
      relativePath: o === void 0 ? l.path || "" : o,
      caseSensitive: l.caseSensitive === !0,
      childrenIndex: i,
      route: l,
    };
    u.relativePath.startsWith("/") &&
      (C(
        u.relativePath.startsWith(n),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + n + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (u.relativePath = u.relativePath.slice(n.length)));
    let d = A([n, u.relativePath]),
      x = a.concat(u);
    (l.children &&
      l.children.length > 0 &&
      (C(
        l.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + d + '".')
      ),
      Pe(l.children, r, x, d)),
      !(l.path == null && !l.index) &&
        r.push({ path: d, score: pt(d, l.index), routesMeta: x }));
  };
  return (
    e.forEach((l, i) => {
      var o;
      if (l.path === "" || !((o = l.path) != null && o.includes("?"))) s(l, i);
      else for (let u of De(l.path)) s(l, i, u);
    }),
    r
  );
}
function De(e) {
  let r = e.split("/");
  if (r.length === 0) return [];
  let [a, ...n] = r,
    s = a.endsWith("?"),
    l = a.replace(/\?$/, "");
  if (n.length === 0) return s ? [l, ""] : [l];
  let i = De(n.join("/")),
    o = [];
  return (
    o.push(...i.map((u) => (u === "" ? l : [l, u].join("/")))),
    s && o.push(...i),
    o.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function dt(e) {
  e.sort((r, a) =>
    r.score !== a.score
      ? a.score - r.score
      : yt(
          r.routesMeta.map((n) => n.childrenIndex),
          a.routesMeta.map((n) => n.childrenIndex)
        )
  );
}
const ut = /^:[\w-]+$/,
  ht = 3,
  xt = 2,
  mt = 1,
  ft = 10,
  gt = -2,
  pe = (e) => e === "*";
function pt(e, r) {
  let a = e.split("/"),
    n = a.length;
  return (
    a.some(pe) && (n += gt),
    r && (n += xt),
    a
      .filter((s) => !pe(s))
      .reduce((s, l) => s + (ut.test(l) ? ht : l === "" ? mt : ft), n)
  );
}
function yt(e, r) {
  return e.length === r.length && e.slice(0, -1).every((n, s) => n === r[s])
    ? e[e.length - 1] - r[r.length - 1]
    : 0;
}
function bt(e, r, a) {
  a === void 0 && (a = !1);
  let { routesMeta: n } = e,
    s = {},
    l = "/",
    i = [];
  for (let o = 0; o < n.length; ++o) {
    let u = n[o],
      d = o === n.length - 1,
      x = l === "/" ? r : r.slice(l.length) || "/",
      h = Q(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: d },
        x
      ),
      g = u.route;
    if (
      (!h &&
        d &&
        a &&
        !n[n.length - 1].route.index &&
        (h = Q(
          { path: u.relativePath, caseSensitive: u.caseSensitive, end: !1 },
          x
        )),
      !h)
    )
      return null;
    (Object.assign(s, h.params),
      i.push({
        params: s,
        pathname: A([l, h.pathname]),
        pathnameBase: Ct(A([l, h.pathnameBase])),
        route: g,
      }),
      h.pathnameBase !== "/" && (l = A([l, h.pathnameBase])));
  }
  return i;
}
function Q(e, r) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [a, n] = vt(e.path, e.caseSensitive, e.end),
    s = r.match(a);
  if (!s) return null;
  let l = s[0],
    i = l.replace(/(.)\/+$/, "$1"),
    o = s.slice(1);
  return {
    params: n.reduce((d, x, h) => {
      let { paramName: g, isOptional: y } = x;
      if (g === "*") {
        let p = o[h] || "";
        i = l.slice(0, l.length - p.length).replace(/(.)\/+$/, "$1");
      }
      const b = o[h];
      return (
        y && !b ? (d[g] = void 0) : (d[g] = (b || "").replace(/%2F/g, "/")),
        d
      );
    }, {}),
    pathname: l,
    pathnameBase: i,
    pattern: e,
  };
}
function vt(e, r, a) {
  (r === void 0 && (r = !1),
    a === void 0 && (a = !0),
    Le(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    ));
  let n = [],
    s =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (i, o, u) => (
            n.push({ paramName: o, isOptional: u != null }),
            u ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (n.push({ paramName: "*" }),
        (s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : a
        ? (s += "\\/*$")
        : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"),
    [new RegExp(s, r ? void 0 : "i"), n]
  );
}
function jt(e) {
  try {
    return e
      .split("/")
      .map((r) => decodeURIComponent(r).replace(/\//g, "%2F"))
      .join("/");
  } catch (r) {
    return (
      Le(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + r + ").")
      ),
      e
    );
  }
}
function T(e, r) {
  if (r === "/") return e;
  if (!e.toLowerCase().startsWith(r.toLowerCase())) return null;
  let a = r.endsWith("/") ? r.length - 1 : r.length,
    n = e.charAt(a);
  return n && n !== "/" ? null : e.slice(a) || "/";
}
function wt(e, r) {
  r === void 0 && (r = "/");
  let {
    pathname: a,
    search: n = "",
    hash: s = "",
  } = typeof e == "string" ? V(e) : e;
  return {
    pathname: a ? (a.startsWith("/") ? a : Nt(a, r)) : r,
    search: St(n),
    hash: Et(s),
  };
}
function Nt(e, r) {
  let a = r.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((s) => {
      s === ".." ? a.length > 1 && a.pop() : s !== "." && a.push(s);
    }),
    a.length > 1 ? a.join("/") : "/"
  );
}
function le(e, r, a, n) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      r +
      "` field [" +
      JSON.stringify(n) +
      "].  Please separate it out to the ") +
    ("`to." + a + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function kt(e) {
  return e.filter(
    (r, a) => a === 0 || (r.route.path && r.route.path.length > 0)
  );
}
function de(e, r) {
  let a = kt(e);
  return r
    ? a.map((n, s) => (s === a.length - 1 ? n.pathname : n.pathnameBase))
    : a.map((n) => n.pathnameBase);
}
function ue(e, r, a, n) {
  n === void 0 && (n = !1);
  let s;
  typeof e == "string"
    ? (s = V(e))
    : ((s = G({}, e)),
      C(
        !s.pathname || !s.pathname.includes("?"),
        le("?", "pathname", "search", s)
      ),
      C(
        !s.pathname || !s.pathname.includes("#"),
        le("#", "pathname", "hash", s)
      ),
      C(!s.search || !s.search.includes("#"), le("#", "search", "hash", s)));
  let l = e === "" || s.pathname === "",
    i = l ? "/" : s.pathname,
    o;
  if (i == null) o = a;
  else {
    let h = r.length - 1;
    if (!n && i.startsWith("..")) {
      let g = i.split("/");
      for (; g[0] === ".."; ) (g.shift(), (h -= 1));
      s.pathname = g.join("/");
    }
    o = h >= 0 ? r[h] : "/";
  }
  let u = wt(s, o),
    d = i && i !== "/" && i.endsWith("/"),
    x = (l || i === ".") && a.endsWith("/");
  return (!u.pathname.endsWith("/") && (d || x) && (u.pathname += "/"), u);
}
const A = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Ct = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  St = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Et = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Rt(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const _e = ["post", "put", "patch", "delete"];
new Set(_e);
const Lt = ["get", ..._e];
new Set(Lt);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function K() {
  return (
    (K = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var a = arguments[r];
            for (var n in a)
              Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
          }
          return e;
        }),
    K.apply(this, arguments)
  );
}
const ae = c.createContext(null),
  Me = c.createContext(null),
  M = c.createContext(null),
  ne = c.createContext(null),
  I = c.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Ue = c.createContext(null);
function Pt(e, r) {
  let { relative: a } = r === void 0 ? {} : r;
  F() || C(!1);
  let { basename: n, navigator: s } = c.useContext(M),
    { hash: l, pathname: i, search: o } = se(e, { relative: a }),
    u = i;
  return (
    n !== "/" && (u = i === "/" ? n : A([n, i])),
    s.createHref({ pathname: u, search: o, hash: l })
  );
}
function F() {
  return c.useContext(ne) != null;
}
function O() {
  return (F() || C(!1), c.useContext(ne).location);
}
function Ae(e) {
  c.useContext(M).static || c.useLayoutEffect(e);
}
function z() {
  let { isDataRoute: e } = c.useContext(I);
  return e ? zt() : Dt();
}
function Dt() {
  F() || C(!1);
  let e = c.useContext(ae),
    { basename: r, future: a, navigator: n } = c.useContext(M),
    { matches: s } = c.useContext(I),
    { pathname: l } = O(),
    i = JSON.stringify(de(s, a.v7_relativeSplatPath)),
    o = c.useRef(!1);
  return (
    Ae(() => {
      o.current = !0;
    }),
    c.useCallback(
      function (d, x) {
        if ((x === void 0 && (x = {}), !o.current)) return;
        if (typeof d == "number") {
          n.go(d);
          return;
        }
        let h = ue(d, JSON.parse(i), l, x.relative === "path");
        (e == null &&
          r !== "/" &&
          (h.pathname = h.pathname === "/" ? r : A([r, h.pathname])),
          (x.replace ? n.replace : n.push)(h, x.state, x));
      },
      [r, n, i, l, e]
    )
  );
}
function se(e, r) {
  let { relative: a } = r === void 0 ? {} : r,
    { future: n } = c.useContext(M),
    { matches: s } = c.useContext(I),
    { pathname: l } = O(),
    i = JSON.stringify(de(s, n.v7_relativeSplatPath));
  return c.useMemo(() => ue(e, JSON.parse(i), l, a === "path"), [e, i, l, a]);
}
function _t(e, r) {
  return Mt(e, r);
}
function Mt(e, r, a, n) {
  F() || C(!1);
  let { navigator: s } = c.useContext(M),
    { matches: l } = c.useContext(I),
    i = l[l.length - 1],
    o = i ? i.params : {};
  i && i.pathname;
  let u = i ? i.pathnameBase : "/";
  i && i.route;
  let d = O(),
    x;
  if (r) {
    var h;
    let f = typeof r == "string" ? V(r) : r;
    (u === "/" || ((h = f.pathname) != null && h.startsWith(u)) || C(!1),
      (x = f));
  } else x = d;
  let g = x.pathname || "/",
    y = g;
  if (u !== "/") {
    let f = u.replace(/^\//, "").split("/");
    y = "/" + g.replace(/^\//, "").split("/").slice(f.length).join("/");
  }
  let b = ot(e, { pathname: y }),
    p = $t(
      b &&
        b.map((f) =>
          Object.assign({}, f, {
            params: Object.assign({}, o, f.params),
            pathname: A([
              u,
              s.encodeLocation
                ? s.encodeLocation(f.pathname).pathname
                : f.pathname,
            ]),
            pathnameBase:
              f.pathnameBase === "/"
                ? u
                : A([
                    u,
                    s.encodeLocation
                      ? s.encodeLocation(f.pathnameBase).pathname
                      : f.pathnameBase,
                  ]),
          })
        ),
      l,
      a,
      n
    );
  return r && p
    ? c.createElement(
        ne.Provider,
        {
          value: {
            location: K(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              x
            ),
            navigationType: U.Pop,
          },
        },
        p
      )
    : p;
}
function Ut() {
  let e = Ft(),
    r = Rt(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    a = e instanceof Error ? e.stack : null,
    s = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" },
    l = null;
  return c.createElement(
    c.Fragment,
    null,
    c.createElement("h2", null, "Unexpected Application Error!"),
    c.createElement("h3", { style: { fontStyle: "italic" } }, r),
    a ? c.createElement("pre", { style: s }, a) : null,
    l
  );
}
const At = c.createElement(Ut, null);
class It extends c.Component {
  constructor(r) {
    (super(r),
      (this.state = {
        location: r.location,
        revalidation: r.revalidation,
        error: r.error,
      }));
  }
  static getDerivedStateFromError(r) {
    return { error: r };
  }
  static getDerivedStateFromProps(r, a) {
    return a.location !== r.location ||
      (a.revalidation !== "idle" && r.revalidation === "idle")
      ? { error: r.error, location: r.location, revalidation: r.revalidation }
      : {
          error: r.error !== void 0 ? r.error : a.error,
          location: a.location,
          revalidation: r.revalidation || a.revalidation,
        };
  }
  componentDidCatch(r, a) {
    console.error(
      "React Router caught the following error during render",
      r,
      a
    );
  }
  render() {
    return this.state.error !== void 0
      ? c.createElement(
          I.Provider,
          { value: this.props.routeContext },
          c.createElement(Ue.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function Ot(e) {
  let { routeContext: r, match: a, children: n } = e,
    s = c.useContext(ae);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (a.route.errorElement || a.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = a.route.id),
    c.createElement(I.Provider, { value: r }, n)
  );
}
function $t(e, r, a, n) {
  var s;
  if (
    (r === void 0 && (r = []),
    a === void 0 && (a = null),
    n === void 0 && (n = null),
    e == null)
  ) {
    var l;
    if (!a) return null;
    if (a.errors) e = a.matches;
    else if (
      (l = n) != null &&
      l.v7_partialHydration &&
      r.length === 0 &&
      !a.initialized &&
      a.matches.length > 0
    )
      e = a.matches;
    else return null;
  }
  let i = e,
    o = (s = a) == null ? void 0 : s.errors;
  if (o != null) {
    let x = i.findIndex(
      (h) => h.route.id && (o == null ? void 0 : o[h.route.id]) !== void 0
    );
    (x >= 0 || C(!1), (i = i.slice(0, Math.min(i.length, x + 1))));
  }
  let u = !1,
    d = -1;
  if (a && n && n.v7_partialHydration)
    for (let x = 0; x < i.length; x++) {
      let h = i[x];
      if (
        ((h.route.HydrateFallback || h.route.hydrateFallbackElement) && (d = x),
        h.route.id)
      ) {
        let { loaderData: g, errors: y } = a,
          b =
            h.route.loader &&
            g[h.route.id] === void 0 &&
            (!y || y[h.route.id] === void 0);
        if (h.route.lazy || b) {
          ((u = !0), d >= 0 ? (i = i.slice(0, d + 1)) : (i = [i[0]]));
          break;
        }
      }
    }
  return i.reduceRight((x, h, g) => {
    let y,
      b = !1,
      p = null,
      f = null;
    a &&
      ((y = o && h.route.id ? o[h.route.id] : void 0),
      (p = h.route.errorElement || At),
      u &&
        (d < 0 && g === 0
          ? (Wt("route-fallback", !1), (b = !0), (f = null))
          : d === g &&
            ((b = !0), (f = h.route.hydrateFallbackElement || null))));
    let N = r.concat(i.slice(0, g + 1)),
      j = () => {
        let w;
        return (
          y
            ? (w = p)
            : b
              ? (w = f)
              : h.route.Component
                ? (w = c.createElement(h.route.Component, null))
                : h.route.element
                  ? (w = h.route.element)
                  : (w = x),
          c.createElement(Ot, {
            match: h,
            routeContext: { outlet: x, matches: N, isDataRoute: a != null },
            children: w,
          })
        );
      };
    return a && (h.route.ErrorBoundary || h.route.errorElement || g === 0)
      ? c.createElement(It, {
          location: a.location,
          revalidation: a.revalidation,
          component: p,
          error: y,
          children: j(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 },
        })
      : j();
  }, null);
}
var Ie = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(Ie || {}),
  ee = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(ee || {});
function Bt(e) {
  let r = c.useContext(ae);
  return (r || C(!1), r);
}
function Tt(e) {
  let r = c.useContext(Me);
  return (r || C(!1), r);
}
function Vt(e) {
  let r = c.useContext(I);
  return (r || C(!1), r);
}
function Oe(e) {
  let r = Vt(),
    a = r.matches[r.matches.length - 1];
  return (a.route.id || C(!1), a.route.id);
}
function Ft() {
  var e;
  let r = c.useContext(Ue),
    a = Tt(ee.UseRouteError),
    n = Oe(ee.UseRouteError);
  return r !== void 0 ? r : (e = a.errors) == null ? void 0 : e[n];
}
function zt() {
  let { router: e } = Bt(Ie.UseNavigateStable),
    r = Oe(ee.UseNavigateStable),
    a = c.useRef(!1);
  return (
    Ae(() => {
      a.current = !0;
    }),
    c.useCallback(
      function (s, l) {
        (l === void 0 && (l = {}),
          a.current &&
            (typeof s == "number"
              ? e.navigate(s)
              : e.navigate(s, K({ fromRouteId: r }, l))));
      },
      [e, r]
    )
  );
}
const ye = {};
function Wt(e, r, a) {
  !r && !ye[e] && (ye[e] = !0);
}
function qt(e, r) {
  (e == null || e.v7_startTransition,
    (e == null ? void 0 : e.v7_relativeSplatPath) === void 0 &&
      (!r || r.v7_relativeSplatPath),
    r &&
      (r.v7_fetcherPersist,
      r.v7_normalizeFormMethod,
      r.v7_partialHydration,
      r.v7_skipActionErrorRevalidation));
}
function be(e) {
  let { to: r, replace: a, state: n, relative: s } = e;
  F() || C(!1);
  let { future: l, static: i } = c.useContext(M),
    { matches: o } = c.useContext(I),
    { pathname: u } = O(),
    d = z(),
    x = ue(r, de(o, l.v7_relativeSplatPath), u, s === "path"),
    h = JSON.stringify(x);
  return (
    c.useEffect(
      () => d(JSON.parse(h), { replace: a, state: n, relative: s }),
      [d, h, s, a, n]
    ),
    null
  );
}
function L(e) {
  C(!1);
}
function Jt(e) {
  let {
    basename: r = "/",
    children: a = null,
    location: n,
    navigationType: s = U.Pop,
    navigator: l,
    static: i = !1,
    future: o,
  } = e;
  F() && C(!1);
  let u = r.replace(/^\/*/, "/"),
    d = c.useMemo(
      () => ({
        basename: u,
        navigator: l,
        static: i,
        future: K({ v7_relativeSplatPath: !1 }, o),
      }),
      [u, o, l, i]
    );
  typeof n == "string" && (n = V(n));
  let {
      pathname: x = "/",
      search: h = "",
      hash: g = "",
      state: y = null,
      key: b = "default",
    } = n,
    p = c.useMemo(() => {
      let f = T(x, u);
      return f == null
        ? null
        : {
            location: { pathname: f, search: h, hash: g, state: y, key: b },
            navigationType: s,
          };
    }, [u, x, h, g, y, b, s]);
  return p == null
    ? null
    : c.createElement(
        M.Provider,
        { value: d },
        c.createElement(ne.Provider, { children: a, value: p })
      );
}
function Ht(e) {
  let { children: r, location: a } = e;
  return _t(oe(r), a);
}
new Promise(() => {});
function oe(e, r) {
  r === void 0 && (r = []);
  let a = [];
  return (
    c.Children.forEach(e, (n, s) => {
      if (!c.isValidElement(n)) return;
      let l = [...r, s];
      if (n.type === c.Fragment) {
        a.push.apply(a, oe(n.props.children, l));
        return;
      }
      (n.type !== L && C(!1), !n.props.index || !n.props.children || C(!1));
      let i = {
        id: n.props.id || l.join("-"),
        caseSensitive: n.props.caseSensitive,
        element: n.props.element,
        Component: n.props.Component,
        index: n.props.index,
        path: n.props.path,
        loader: n.props.loader,
        action: n.props.action,
        errorElement: n.props.errorElement,
        ErrorBoundary: n.props.ErrorBoundary,
        hasErrorBoundary:
          n.props.ErrorBoundary != null || n.props.errorElement != null,
        shouldRevalidate: n.props.shouldRevalidate,
        handle: n.props.handle,
        lazy: n.props.lazy,
      };
      (n.props.children && (i.children = oe(n.props.children, l)), a.push(i));
    }),
    a
  );
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function te() {
  return (
    (te = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var a = arguments[r];
            for (var n in a)
              Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
          }
          return e;
        }),
    te.apply(this, arguments)
  );
}
function $e(e, r) {
  if (e == null) return {};
  var a = {},
    n = Object.keys(e),
    s,
    l;
  for (l = 0; l < n.length; l++)
    ((s = n[l]), !(r.indexOf(s) >= 0) && (a[s] = e[s]));
  return a;
}
function Gt(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Kt(e, r) {
  return e.button === 0 && (!r || r === "_self") && !Gt(e);
}
const Yt = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  Zt = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "viewTransition",
    "children",
  ],
  Xt = "6";
try {
  window.__reactRouterVersion = Xt;
} catch {}
const Qt = c.createContext({ isTransitioning: !1 }),
  er = "startTransition",
  ve = Xe[er];
function tr(e) {
  let { basename: r, children: a, future: n, window: s } = e,
    l = c.useRef();
  l.current == null && (l.current = st({ window: s, v5Compat: !0 }));
  let i = l.current,
    [o, u] = c.useState({ action: i.action, location: i.location }),
    { v7_startTransition: d } = n || {},
    x = c.useCallback(
      (h) => {
        d && ve ? ve(() => u(h)) : u(h);
      },
      [u, d]
    );
  return (
    c.useLayoutEffect(() => i.listen(x), [i, x]),
    c.useEffect(() => qt(n), [n]),
    c.createElement(Jt, {
      basename: r,
      children: a,
      location: o.location,
      navigationType: o.action,
      navigator: i,
      future: n,
    })
  );
}
const rr =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  ar = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  R = c.forwardRef(function (r, a) {
    let {
        onClick: n,
        relative: s,
        reloadDocument: l,
        replace: i,
        state: o,
        target: u,
        to: d,
        preventScrollReset: x,
        viewTransition: h,
      } = r,
      g = $e(r, Yt),
      { basename: y } = c.useContext(M),
      b,
      p = !1;
    if (typeof d == "string" && ar.test(d) && ((b = d), rr))
      try {
        let w = new URL(window.location.href),
          k = d.startsWith("//") ? new URL(w.protocol + d) : new URL(d),
          P = T(k.pathname, y);
        k.origin === w.origin && P != null
          ? (d = P + k.search + k.hash)
          : (p = !0);
      } catch {}
    let f = Pt(d, { relative: s }),
      N = sr(d, {
        replace: i,
        state: o,
        target: u,
        preventScrollReset: x,
        relative: s,
        viewTransition: h,
      });
    function j(w) {
      (n && n(w), w.defaultPrevented || N(w));
    }
    return c.createElement(
      "a",
      te({}, g, { href: b || f, onClick: p || l ? n : j, ref: a, target: u })
    );
  }),
  je = c.forwardRef(function (r, a) {
    let {
        "aria-current": n = "page",
        caseSensitive: s = !1,
        className: l = "",
        end: i = !1,
        style: o,
        to: u,
        viewTransition: d,
        children: x,
      } = r,
      h = $e(r, Zt),
      g = se(u, { relative: h.relative }),
      y = O(),
      b = c.useContext(Me),
      { navigator: p, basename: f } = c.useContext(M),
      N = b != null && lr(g) && d === !0,
      j = p.encodeLocation ? p.encodeLocation(g).pathname : g.pathname,
      w = y.pathname,
      k =
        b && b.navigation && b.navigation.location
          ? b.navigation.location.pathname
          : null;
    (s ||
      ((w = w.toLowerCase()),
      (k = k ? k.toLowerCase() : null),
      (j = j.toLowerCase())),
      k && f && (k = T(k, f) || k));
    const P = j !== "/" && j.endsWith("/") ? j.length - 1 : j.length;
    let W = w === j || (!i && w.startsWith(j) && w.charAt(P) === "/"),
      Z =
        k != null &&
        (k === j || (!i && k.startsWith(j) && k.charAt(j.length) === "/")),
      m = { isActive: W, isPending: Z, isTransitioning: N },
      v = W ? n : void 0,
      S;
    typeof l == "function"
      ? (S = l(m))
      : (S = [
          l,
          W ? "active" : null,
          Z ? "pending" : null,
          N ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let q = typeof o == "function" ? o(m) : o;
    return c.createElement(
      R,
      te({}, h, {
        "aria-current": v,
        className: S,
        ref: a,
        style: q,
        to: u,
        viewTransition: d,
      }),
      typeof x == "function" ? x(m) : x
    );
  });
var ce;
(function (e) {
  ((e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState"));
})(ce || (ce = {}));
var we;
(function (e) {
  ((e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration"));
})(we || (we = {}));
function nr(e) {
  let r = c.useContext(ae);
  return (r || C(!1), r);
}
function sr(e, r) {
  let {
      target: a,
      replace: n,
      state: s,
      preventScrollReset: l,
      relative: i,
      viewTransition: o,
    } = r === void 0 ? {} : r,
    u = z(),
    d = O(),
    x = se(e, { relative: i });
  return c.useCallback(
    (h) => {
      if (Kt(h, a)) {
        h.preventDefault();
        let g = n !== void 0 ? n : X(d) === X(x);
        u(e, {
          replace: g,
          state: s,
          preventScrollReset: l,
          relative: i,
          viewTransition: o,
        });
      }
    },
    [d, u, x, n, s, a, e, l, i, o]
  );
}
function lr(e, r) {
  r === void 0 && (r = {});
  let a = c.useContext(Qt);
  a == null && C(!1);
  let { basename: n } = nr(ce.useViewTransitionState),
    s = se(e, { relative: r.relative });
  if (!a.isTransitioning) return !1;
  let l = T(a.currentLocation.pathname, n) || a.currentLocation.pathname,
    i = T(a.nextLocation.pathname, n) || a.nextLocation.pathname;
  return Q(s.pathname, i) != null || Q(s.pathname, l) != null;
}
const Be = c.createContext(),
  ir = ({ children: e }) => {
    const [r, a] = c.useState(null),
      [n, s] = c.useState(!0),
      [l, i] = c.useState(null);
    c.useEffect(() => {
      try {
        const h = localStorage.getItem("mc_user");
        h && a(JSON.parse(h));
      } catch (h) {
        console.error("Error loading stored user:", h);
      } finally {
        s(!1);
      }
    }, []);
    const o = c.useCallback(({ email: h, role: g }) => {
        try {
          i(null);
          const y = { email: h, role: g, loggedInAt: new Date().toISOString() };
          (a(y),
            localStorage.setItem("mc_user", JSON.stringify(y)),
            console.info(`[Auth] User logged in as ${g}`));
        } catch (y) {
          (console.error("Login failed:", y),
            i("Failed to log in. Please try again."));
        }
      }, []),
      u = c.useCallback(
        ({ email: h, role: g }) => {
          (o({ email: h, role: g }),
            console.info(`[Auth] User registered as ${g}`));
        },
        [o]
      ),
      d = c.useCallback(() => {
        (a(null),
          localStorage.removeItem("mc_user"),
          console.info("[Auth] User logged out."));
      }, []),
      x = {
        user: r,
        loading: n,
        error: l,
        login: o,
        register: u,
        logout: d,
        isAuthenticated: !!r,
      };
    return t.jsx(Be.Provider, {
      value: x,
      children: n
        ? t.jsx("div", {
            className:
              "flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900",
            children: t.jsx("div", {
              className:
                "text-gray-600 dark:text-gray-300 text-sm animate-pulse",
              children: "Loading authentication...",
            }),
          })
        : e,
    });
  },
  $ = () => c.useContext(Be);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const or = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  cr = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (r, a, n) =>
      n ? n.toUpperCase() : a.toLowerCase()
    ),
  Ne = (e) => {
    const r = cr(e);
    return r.charAt(0).toUpperCase() + r.slice(1);
  },
  Te = (...e) =>
    e
      .filter((r, a, n) => !!r && r.trim() !== "" && n.indexOf(r) === a)
      .join(" ")
      .trim(),
  dr = (e) => {
    for (const r in e)
      if (r.startsWith("aria-") || r === "role" || r === "title") return !0;
  };
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var ur = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const hr = c.forwardRef(
  (
    {
      color: e = "currentColor",
      size: r = 24,
      strokeWidth: a = 2,
      absoluteStrokeWidth: n,
      className: s = "",
      children: l,
      iconNode: i,
      ...o
    },
    u
  ) =>
    c.createElement(
      "svg",
      {
        ref: u,
        ...ur,
        width: r,
        height: r,
        stroke: e,
        strokeWidth: n ? (Number(a) * 24) / Number(r) : a,
        className: Te("lucide", s),
        ...(!l && !dr(o) && { "aria-hidden": "true" }),
        ...o,
      },
      [
        ...i.map(([d, x]) => c.createElement(d, x)),
        ...(Array.isArray(l) ? l : [l]),
      ]
    )
);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const E = (e, r) => {
  const a = c.forwardRef(({ className: n, ...s }, l) =>
    c.createElement(hr, {
      ref: l,
      iconNode: r,
      className: Te(`lucide-${or(Ne(e))}`, `lucide-${e}`, n),
      ...s,
    })
  );
  return ((a.displayName = Ne(e)), a);
};
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xr = [
    ["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }],
    ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ],
  mr = E("circle-user-round", xr);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const fr = [
    ["path", { d: "M12 13v8", key: "1l5pq0" }],
    [
      "path",
      {
        d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
        key: "1pljnt",
      },
    ],
    ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }],
  ],
  gr = E("cloud-upload", fr);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pr = [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }],
  ],
  yr = E("download", pr);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const br = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  Ve = E("eye", br);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const vr = [
    [
      "path",
      {
        d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        key: "1rqfz7",
      },
    ],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }],
  ],
  Fe = E("file-text", vr);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jr = [
    [
      "path",
      {
        d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
        key: "tonef",
      },
    ],
    ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }],
  ],
  wr = E("github", jr);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Nr = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    [
      "path",
      { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" },
    ],
    ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ],
  kr = E("globe", Nr);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Cr = [
    [
      "path",
      {
        d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
        key: "c2jq9f",
      },
    ],
    ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
    ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }],
  ],
  Sr = E("linkedin", Cr);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Er = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  ze = E("loader-circle", Er);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Rr = [
    ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
    ["path", { d: "M15 12H3", key: "6jk70r" }],
    ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }],
  ],
  Lr = E("log-in", Rr);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Pr = [
    [
      "rect",
      {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2",
        key: "1w4ew1",
      },
    ],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
  ],
  Dr = E("lock", Pr);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _r = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    [
      "rect",
      { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" },
    ],
  ],
  Mr = E("mail", _r);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ur = [
    ["path", { d: "M4 5h16", key: "1tepv9" }],
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 19h16", key: "1djgab" }],
  ],
  Ar = E("menu", Ur);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ir = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ],
  Or = E("search", Ir);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $r = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y",
      },
    ],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  We = E("shield-check", $r);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Br = [
    [
      "path",
      {
        d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",
        key: "2acyp4",
      },
    ],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  ke = E("square-check-big", Br);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Tr = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }],
  ],
  qe = E("trash-2", Tr);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Vr = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ],
  Fr = E("users", Vr);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zr = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  Wr = E("x", zr);
function qr() {
  const { user: e, logout: r } = $(),
    [a, n] = c.useState(!1),
    s = z(),
    l = async () => {
      (await r(), s("/login"));
    },
    i = () => n(!a),
    u = [
      { to: "/", label: "Home" },
      { to: "/upload", label: "Upload", roles: ["Institution", "Admin"] },
      { to: "/verify", label: "Verify", roles: ["Admin", "Employer"] },
      {
        to: "/dashboard",
        label: "Dashboard",
        roles: ["Learner", "Institution", "Employer", "Admin"],
      },
    ].filter((d) => !d.roles || (e && d.roles.includes(e.role)));
  return t.jsxs("nav", {
    className:
      "bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300",
    children: [
      t.jsxs("div", {
        className:
          "container mx-auto px-4 py-3 flex items-center justify-between",
        children: [
          t.jsx(R, {
            to: "/",
            className:
              "font-extrabold text-2xl text-blue-600 dark:text-blue-400 hover:text-blue-700 transition",
            children: "MicroCred",
          }),
          t.jsxs("div", {
            className: "hidden md:flex items-center gap-6",
            children: [
              u.map((d) =>
                t.jsx(
                  je,
                  {
                    to: d.to,
                    className: ({ isActive: x }) =>
                      `font-medium hover:text-blue-600 transition ${x ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-200"}`,
                    children: d.label,
                  },
                  d.to
                )
              ),
              e
                ? t.jsxs(t.Fragment, {
                    children: [
                      t.jsxs("span", {
                        className:
                          "px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-300",
                        children: [
                          e.email,
                          " ",
                          t.jsxs("span", {
                            className: "text-xs text-gray-400",
                            children: ["(", e.role, ")"],
                          }),
                        ],
                      }),
                      t.jsx("button", {
                        onClick: l,
                        className:
                          "px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition",
                        children: "Logout",
                      }),
                    ],
                  })
                : t.jsxs(t.Fragment, {
                    children: [
                      t.jsx(R, {
                        to: "/login",
                        className:
                          "px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition",
                        children: "Login",
                      }),
                      t.jsx(R, {
                        to: "/register",
                        className:
                          "px-4 py-1.5 border border-gray-300 hover:border-blue-500 text-gray-700 dark:text-gray-200 rounded-md transition",
                        children: "Register",
                      }),
                    ],
                  }),
            ],
          }),
          t.jsx("button", {
            onClick: i,
            className:
              "md:hidden text-gray-700 dark:text-gray-200 hover:text-blue-600 transition",
            children: a ? t.jsx(Wr, { size: 26 }) : t.jsx(Ar, { size: 26 }),
          }),
        ],
      }),
      a &&
        t.jsxs("div", {
          className:
            "md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 pb-3 space-y-3 transition-all",
          children: [
            u.map((d) =>
              t.jsx(
                je,
                {
                  to: d.to,
                  onClick: () => n(!1),
                  className: ({ isActive: x }) =>
                    `block py-2 font-medium ${x ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-200"}`,
                  children: d.label,
                },
                d.to
              )
            ),
            e
              ? t.jsxs("div", {
                  className:
                    "pt-2 border-t border-gray-200 dark:border-gray-700",
                  children: [
                    t.jsxs("span", {
                      className:
                        "block text-sm text-gray-600 dark:text-gray-300 mb-2",
                      children: [e.email, " (", e.role, ")"],
                    }),
                    t.jsx("button", {
                      onClick: l,
                      className:
                        "w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition",
                      children: "Logout",
                    }),
                  ],
                })
              : t.jsxs("div", {
                  className:
                    "space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700",
                  children: [
                    t.jsx(R, {
                      to: "/login",
                      onClick: () => n(!1),
                      className:
                        "block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md",
                      children: "Login",
                    }),
                    t.jsx(R, {
                      to: "/register",
                      onClick: () => n(!1),
                      className:
                        "block w-full text-center px-4 py-2 border border-gray-300 hover:border-blue-500 rounded-md text-gray-700 dark:text-gray-200",
                      children: "Register",
                    }),
                  ],
                }),
          ],
        }),
    ],
  });
}
function Jr() {
  const e = new Date().getFullYear();
  return t.jsx("footer", {
    className:
      "bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-10",
    children: t.jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 py-8",
      children: [
        t.jsxs("div", {
          className:
            "flex flex-col sm:flex-row justify-between items-center gap-4",
          children: [
            t.jsx(R, {
              to: "/",
              className:
                "text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 transition",
              children: "MicroCred",
            }),
            t.jsxs("div", {
              className:
                "flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400",
              children: [
                t.jsx(R, {
                  to: "/about",
                  className: "hover:text-blue-600 transition",
                  children: "About",
                }),
                t.jsx(R, {
                  to: "/verify",
                  className: "hover:text-blue-600 transition",
                  children: "Verify",
                }),
                t.jsx(R, {
                  to: "/upload",
                  className: "hover:text-blue-600 transition",
                  children: "Upload",
                }),
                t.jsx(R, {
                  to: "/contact",
                  className: "hover:text-blue-600 transition",
                  children: "Contact",
                }),
              ],
            }),
            t.jsxs("div", {
              className: "flex gap-3 text-gray-500",
              children: [
                t.jsx("a", {
                  href: "https://github.com/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "hover:text-blue-600 transition",
                  "aria-label": "GitHub",
                  children: t.jsx(wr, { className: "w-5 h-5" }),
                }),
                t.jsx("a", {
                  href: "https://linkedin.com/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "hover:text-blue-600 transition",
                  "aria-label": "LinkedIn",
                  children: t.jsx(Sr, { className: "w-5 h-5" }),
                }),
                t.jsx("a", {
                  href: "https://microcred.example.com",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "hover:text-blue-600 transition",
                  "aria-label": "Website",
                  children: t.jsx(kr, { className: "w-5 h-5" }),
                }),
              ],
            }),
          ],
        }),
        t.jsx("div", {
          className: "border-t border-gray-200 dark:border-gray-700 my-6",
        }),
        t.jsxs("div", {
          className: "text-center text-xs text-gray-500 dark:text-gray-400",
          children: [
            "© ",
            e,
            " ",
            t.jsx("span", { className: "font-medium", children: "MicroCred" }),
            " — A demo micro-credential frontend built with ",
            t.jsx("span", {
              className: "text-blue-600 font-medium",
              children: "React + TailwindCSS",
            }),
            ".",
            t.jsx("br", { className: "sm:hidden" }),
            " All rights reserved.",
          ],
        }),
      ],
    }),
  });
}
function Hr() {
  return t.jsxs("div", {
    className:
      "bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col justify-between",
    children: [
      t.jsxs("section", {
        className: "text-center py-20 px-6",
        children: [
          t.jsx("h1", {
            className:
              "text-5xl font-extrabold mb-4 text-blue-700 dark:text-blue-400 tracking-tight",
            children: "MicroCred",
          }),
          t.jsx("p", {
            className:
              "text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed",
            children:
              "Empowering learners, institutions, and employers with a unified platform to create, manage, and verify micro-credentials securely and instantly.",
          }),
          t.jsxs("div", {
            className: "flex flex-wrap justify-center gap-4",
            children: [
              t.jsx(R, {
                to: "/register",
                className:
                  "px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition",
                children: "Get Started",
              }),
              t.jsx(R, {
                to: "/login",
                className:
                  "px-6 py-3 border border-gray-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition",
                children: "Sign In",
              }),
            ],
          }),
          t.jsx("div", {
            className: "mt-12",
            children: t.jsx("img", {
              src: "https://cdn.dribbble.com/userupload/11634377/file/original-1330bb7718d2.png?resize=1024x768",
              alt: "MicroCred illustration",
              className: "w-full max-w-3xl mx-auto rounded-xl shadow-lg",
            }),
          }),
        ],
      }),
      t.jsxs("section", {
        className:
          "py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700",
        children: [
          t.jsx("h2", {
            className:
              "text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100",
            children: "Why Choose MicroCred?",
          }),
          t.jsx("div", {
            className:
              "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6",
            children: [
              {
                icon: t.jsx(gr, {
                  className: "w-10 h-10 text-blue-600 dark:text-blue-400",
                }),
                title: "Easy Uploads",
                desc: "Upload, manage, and store credentials securely in a few clicks.",
              },
              {
                icon: t.jsx(We, {
                  className: "w-10 h-10 text-blue-600 dark:text-blue-400",
                }),
                title: "Secure Verification",
                desc: "Blockchain-ready verification ensures document authenticity.",
              },
              {
                icon: t.jsx(Fr, {
                  className: "w-10 h-10 text-blue-600 dark:text-blue-400",
                }),
                title: "Role-based Access",
                desc: "Different dashboards for Learners, Institutions, Employers, and Admins.",
              },
            ].map((e, r) =>
              t.jsxs(
                "div",
                {
                  className:
                    "bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1",
                  children: [
                    t.jsx("div", {
                      className: "mb-4 flex justify-center",
                      children: e.icon,
                    }),
                    t.jsx("h3", {
                      className: "text-lg font-semibold mb-2 text-center",
                      children: e.title,
                    }),
                    t.jsx("p", {
                      className:
                        "text-sm text-gray-600 dark:text-gray-300 text-center",
                      children: e.desc,
                    }),
                  ],
                },
                r
              )
            ),
          }),
        ],
      }),
      t.jsxs("section", {
        className:
          "py-16 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white",
        children: [
          t.jsx("h2", {
            className: "text-3xl font-bold mb-4",
            children: "Join the Future of Credential Management",
          }),
          t.jsx("p", {
            className: "max-w-2xl mx-auto mb-8 text-blue-100",
            children:
              "Start uploading, verifying, and sharing credentials securely today.",
          }),
          t.jsx(R, {
            to: "/register",
            className:
              "px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition",
            children: "Get Started Free",
          }),
        ],
      }),
      t.jsxs("footer", {
        className:
          "py-6 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700",
        children: [
          "© ",
          new Date().getFullYear(),
          " MicroCred. All rights reserved.",
        ],
      }),
    ],
  });
}
function Gr() {
  var y, b;
  const [e, r] = c.useState(""),
    [a, n] = c.useState(""),
    [s, l] = c.useState("Learner"),
    [i, o] = c.useState(""),
    { login: u } = $(),
    d = z(),
    h =
      ((b = (y = O().state) == null ? void 0 : y.from) == null
        ? void 0
        : b.pathname) || "/",
    g = (p) => {
      if ((p.preventDefault(), !e || !a)) {
        o("Please enter both email and password.");
        return;
      }
      (o(""),
        u({ email: e, role: s }),
        d(
          {
            Learner: "/dashboard/learner",
            Institution: "/dashboard/institution",
            Employer: "/dashboard/employer",
            Admin: "/dashboard/admin",
          }[s] || h,
          { replace: !0 }
        ));
    };
  return t.jsx("div", {
    className:
      "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4",
    children: t.jsxs("div", {
      className:
        "bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-8 transition transform hover:scale-[1.01]",
      children: [
        t.jsxs("div", {
          className: "text-center mb-6",
          children: [
            t.jsx(mr, {
              className: "mx-auto w-12 h-12 text-blue-600 dark:text-blue-400",
            }),
            t.jsx("h2", {
              className:
                "text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100",
              children: "Welcome Back",
            }),
            t.jsx("p", {
              className: "text-gray-500 dark:text-gray-400 text-sm",
              children: "Sign in to continue to MicroCred",
            }),
          ],
        }),
        i &&
          t.jsx("div", {
            className:
              "mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded-md text-center",
            children: i,
          }),
        t.jsxs("form", {
          onSubmit: g,
          className: "space-y-4",
          children: [
            t.jsxs("div", {
              children: [
                t.jsx("label", {
                  className:
                    "block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1",
                  children: "Email Address",
                }),
                t.jsxs("div", {
                  className: "relative",
                  children: [
                    t.jsx(Mr, {
                      className:
                        "absolute left-3 top-2.5 w-5 h-5 text-gray-400",
                    }),
                    t.jsx("input", {
                      type: "email",
                      required: !0,
                      value: e,
                      onChange: (p) => r(p.target.value),
                      className:
                        "w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition",
                      placeholder: "you@example.com",
                    }),
                  ],
                }),
              ],
            }),
            t.jsxs("div", {
              children: [
                t.jsx("label", {
                  className:
                    "block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1",
                  children: "Password",
                }),
                t.jsxs("div", {
                  className: "relative",
                  children: [
                    t.jsx(Dr, {
                      className:
                        "absolute left-3 top-2.5 w-5 h-5 text-gray-400",
                    }),
                    t.jsx("input", {
                      type: "password",
                      required: !0,
                      value: a,
                      onChange: (p) => n(p.target.value),
                      className:
                        "w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition",
                      placeholder: "••••••••",
                    }),
                  ],
                }),
              ],
            }),
            t.jsxs("div", {
              children: [
                t.jsx("label", {
                  className:
                    "block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1",
                  children: "Select Role",
                }),
                t.jsxs("select", {
                  value: s,
                  onChange: (p) => l(p.target.value),
                  className:
                    "w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition",
                  children: [
                    t.jsx("option", { children: "Learner" }),
                    t.jsx("option", { children: "Institution" }),
                    t.jsx("option", { children: "Employer" }),
                    t.jsx("option", { children: "Admin" }),
                  ],
                }),
              ],
            }),
            t.jsxs("div", {
              className: "flex flex-col sm:flex-row gap-3 mt-6",
              children: [
                t.jsxs("button", {
                  type: "submit",
                  className:
                    "flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition",
                  children: [t.jsx(Lr, { className: "w-5 h-5" }), " Sign In"],
                }),
                t.jsx(R, {
                  to: "/register",
                  className:
                    "w-full sm:w-auto text-center px-5 py-2.5 border border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition",
                  children: "Register",
                }),
              ],
            }),
          ],
        }),
        t.jsxs("p", {
          className:
            "mt-6 text-center text-sm text-gray-500 dark:text-gray-400",
          children: [
            "Don’t have an account?",
            " ",
            t.jsx(R, {
              to: "/register",
              className:
                "text-blue-600 dark:text-blue-400 hover:underline font-medium",
              children: "Create one",
            }),
          ],
        }),
      ],
    }),
  });
}
function Kr() {
  const [e, r] = c.useState(""),
    [a, n] = c.useState("Learner"),
    { register: s } = $(),
    l = z(),
    i = (o) => {
      (o.preventDefault(),
        s({ email: e, role: a }),
        l(`/dashboard/${a.toLowerCase()}`, { replace: !0 }));
    };
  return t.jsxs("div", {
    className: "max-w-md mx-auto bg-white p-6 rounded shadow mt-10",
    children: [
      t.jsx("h2", {
        className: "text-2xl font-semibold mb-4 text-center",
        children: "Create an Account",
      }),
      t.jsxs("form", {
        onSubmit: i,
        className: "space-y-4",
        children: [
          t.jsxs("div", {
            children: [
              t.jsx("label", {
                className: "block text-sm font-medium",
                children: "Email",
              }),
              t.jsx("input", {
                required: !0,
                type: "email",
                value: e,
                onChange: (o) => r(o.target.value),
                className:
                  "w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200 outline-none",
                placeholder: "you@example.com",
              }),
            ],
          }),
          t.jsxs("div", {
            children: [
              t.jsx("label", {
                className: "block text-sm font-medium",
                children: "Role",
              }),
              t.jsxs("select", {
                value: a,
                onChange: (o) => n(o.target.value),
                className:
                  "w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200 outline-none",
                children: [
                  t.jsx("option", { children: "Learner" }),
                  t.jsx("option", { children: "Institution" }),
                  t.jsx("option", { children: "Employer" }),
                  t.jsx("option", { children: "Admin" }),
                ],
              }),
            ],
          }),
          t.jsx("button", {
            type: "submit",
            className:
              "w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition",
            children: "Create Account",
          }),
        ],
      }),
    ],
  });
}
const Je = "docs",
  D = () => {
    try {
      return JSON.parse(localStorage.getItem(Je) || "[]");
    } catch (e) {
      return (console.error("Failed to parse docs from localStorage:", e), []);
    }
  },
  Y = (e) => {
    localStorage.setItem(Je, JSON.stringify(e));
  },
  Yr = (e) => {
    const r = D(),
      a = r.findIndex((n) => n.id === e.id);
    (a >= 0 ? (r[a] = e) : r.unshift(e), Y(r));
  },
  He = (e) => {
    const r = D().filter((a) => a.id !== e);
    Y(r);
  },
  Zr = (e) => {
    const r = D().map((a) => (a.id === e ? { ...a, status: "verified" } : a));
    Y(r);
  };
function Ge() {
  const { user: e } = $(),
    [r, a] = c.useState([]),
    [n, s] = c.useState(!0);
  c.useEffect(() => {
    (async () => {
      s(!0);
      const u = await D();
      if (!e) {
        (a([]), s(!1));
        return;
      }
      (e.role === "Admin"
        ? a(u)
        : a(u.filter((d) => d.owner === e.email || d.owner === e.role)),
        s(!1));
    })();
  }, [e]);
  const l = async (o) => {
      window.confirm("Are you sure you want to delete this document?") &&
        (await He(o), a((u) => u.filter((d) => d.id !== o)));
    },
    i = async (o) => {
      (await Zr(o),
        a((u) =>
          u.map((d) => (d.id === o ? { ...d, status: "verified" } : d))
        ));
    };
  return t.jsxs("div", {
    className: "max-w-4xl mx-auto mt-6",
    children: [
      t.jsxs("div", {
        className: "mb-6 flex flex-wrap justify-between items-center",
        children: [
          t.jsx("h2", {
            className: "text-xl font-semibold text-gray-800 dark:text-gray-200",
            children: "Document Repository",
          }),
          e &&
            t.jsx(R, {
              to: "/upload",
              className:
                "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition",
              children: "Upload New",
            }),
        ],
      }),
      n
        ? t.jsx("div", {
            className: "flex justify-center py-10",
            children: t.jsx(ze, {
              className: "animate-spin text-blue-500 w-8 h-8",
            }),
          })
        : r.length === 0
          ? t.jsxs("div", {
              className:
                "bg-white dark:bg-gray-800 text-center py-10 rounded-lg shadow",
              children: [
                t.jsx(Fe, { className: "mx-auto w-10 h-10 text-gray-400" }),
                t.jsx("p", {
                  className: "mt-3 text-gray-600 dark:text-gray-300",
                  children: "No documents found.",
                }),
                t.jsx(R, {
                  to: "/upload",
                  className:
                    "mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition",
                  children: "Upload Your First Document",
                }),
              ],
            })
          : t.jsx("div", {
              className: "space-y-4",
              children: r.map((o) =>
                t.jsxs(
                  "div",
                  {
                    className:
                      "bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center justify-between transition hover:shadow-lg",
                    children: [
                      t.jsxs("div", {
                        className: "flex flex-col",
                        children: [
                          t.jsx("span", {
                            className:
                              "font-semibold text-gray-800 dark:text-gray-100 text-lg",
                            children: o.name,
                          }),
                          t.jsxs("span", {
                            className:
                              "text-sm text-gray-500 dark:text-gray-400",
                            children: [
                              "Uploaded: ",
                              new Date(o.createdAt).toLocaleString(),
                            ],
                          }),
                          t.jsxs("span", {
                            className: "mt-1 text-sm",
                            children: [
                              "Status:",
                              " ",
                              t.jsx("span", {
                                className: `font-medium ${o.status === "verified" ? "text-green-600 dark:text-green-400" : o.status === "pending" ? "text-yellow-600 dark:text-yellow-400" : "text-gray-500"}`,
                                children:
                                  o.status.charAt(0).toUpperCase() +
                                  o.status.slice(1),
                              }),
                            ],
                          }),
                        ],
                      }),
                      t.jsxs("div", {
                        className: "flex gap-2 mt-3 sm:mt-0",
                        children: [
                          o.dataUrl &&
                            t.jsxs("a", {
                              href: o.dataUrl,
                              target: "_blank",
                              rel: "noreferrer",
                              className:
                                "flex items-center gap-1 px-3 py-1.5 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition",
                              children: [t.jsx(Ve, { size: 16 }), " View"],
                            }),
                          (e == null ? void 0 : e.role) === "Admin" &&
                            o.status !== "verified" &&
                            t.jsxs("button", {
                              onClick: () => i(o.id),
                              className:
                                "flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition",
                              children: [t.jsx(We, { size: 16 }), " Verify"],
                            }),
                          ((e == null ? void 0 : e.role) === "Admin" ||
                            o.owner === e.email) &&
                            t.jsxs("button", {
                              onClick: () => l(o.id),
                              className:
                                "flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md transition",
                              children: [t.jsx(qe, { size: 16 }), " Delete"],
                            }),
                        ],
                      }),
                    ],
                  },
                  o.id
                )
              ),
            }),
    ],
  });
}
function Xr() {
  const e = D(),
    r = c.useMemo(() => e.filter((l) => l.owner === "Learner"), [e]),
    a = r.length,
    n = r.filter((l) => l.status === "verified").length,
    s = r.filter((l) => l.status !== "verified").length;
  return t.jsxs("div", {
    className: "max-w-7xl mx-auto px-4 py-8",
    children: [
      t.jsxs("div", {
        className: "mb-8",
        children: [
          t.jsx("h1", {
            className:
              "text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2",
            children: "Learner Dashboard",
          }),
          t.jsx("p", {
            className: "text-gray-600 dark:text-gray-300",
            children: "Upload, track, and manage your credentials here.",
          }),
          t.jsxs("div", {
            className: "mt-4 flex flex-wrap gap-4",
            children: [
              t.jsxs("div", {
                className:
                  "bg-white dark:bg-gray-800 p-4 rounded shadow flex-1 min-w-[150px] text-center",
                children: [
                  t.jsx("div", {
                    className: "text-gray-500 dark:text-gray-400 text-sm",
                    children: "Total Documents",
                  }),
                  t.jsx("div", {
                    className:
                      "text-xl font-semibold text-gray-800 dark:text-gray-100",
                    children: a,
                  }),
                ],
              }),
              t.jsxs("div", {
                className:
                  "bg-green-100 dark:bg-green-900 p-4 rounded shadow flex-1 min-w-[150px] text-center",
                children: [
                  t.jsx("div", {
                    className: "text-green-800 dark:text-green-300 text-sm",
                    children: "Verified",
                  }),
                  t.jsx("div", {
                    className:
                      "text-xl font-semibold text-green-900 dark:text-green-100",
                    children: n,
                  }),
                ],
              }),
              t.jsxs("div", {
                className:
                  "bg-yellow-100 dark:bg-yellow-900 p-4 rounded shadow flex-1 min-w-[150px] text-center",
                children: [
                  t.jsx("div", {
                    className: "text-yellow-800 dark:text-yellow-300 text-sm",
                    children: "Pending",
                  }),
                  t.jsx("div", {
                    className:
                      "text-xl font-semibold text-yellow-900 dark:text-yellow-100",
                    children: s,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      t.jsxs("div", {
        className: "bg-white dark:bg-gray-800 p-6 rounded shadow",
        children: [
          t.jsx("h2", {
            className:
              "text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4",
            children: "Your Documents",
          }),
          t.jsx(Ge, {}),
        ],
      }),
    ],
  });
}
function Qr() {
  const e = D(),
    r = c.useMemo(() => e.filter((l) => l.owner === "Institution"), [e]),
    a = r.length,
    n = r.filter((l) => l.status === "verified").length,
    s = r.filter((l) => l.status !== "verified").length;
  return t.jsxs("div", {
    className: "max-w-7xl mx-auto px-4 py-8",
    children: [
      t.jsxs("div", {
        className: "mb-8",
        children: [
          t.jsx("h1", {
            className:
              "text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2",
            children: "Institution Dashboard",
          }),
          t.jsx("p", {
            className: "text-gray-600 dark:text-gray-300",
            children: "Manage and track documents issued by your institution.",
          }),
          t.jsxs("div", {
            className: "mt-4 flex flex-wrap gap-4",
            children: [
              t.jsxs("div", {
                className:
                  "bg-white dark:bg-gray-800 p-4 rounded shadow flex-1 min-w-[150px] text-center",
                children: [
                  t.jsx("div", {
                    className: "text-gray-500 dark:text-gray-400 text-sm",
                    children: "Total Documents",
                  }),
                  t.jsx("div", {
                    className:
                      "text-xl font-semibold text-gray-800 dark:text-gray-100",
                    children: a,
                  }),
                ],
              }),
              t.jsxs("div", {
                className:
                  "bg-green-100 dark:bg-green-900 p-4 rounded shadow flex-1 min-w-[150px] text-center",
                children: [
                  t.jsx("div", {
                    className: "text-green-800 dark:text-green-300 text-sm",
                    children: "Verified",
                  }),
                  t.jsx("div", {
                    className:
                      "text-xl font-semibold text-green-900 dark:text-green-100",
                    children: n,
                  }),
                ],
              }),
              t.jsxs("div", {
                className:
                  "bg-yellow-100 dark:bg-yellow-900 p-4 rounded shadow flex-1 min-w-[150px] text-center",
                children: [
                  t.jsx("div", {
                    className: "text-yellow-800 dark:text-yellow-300 text-sm",
                    children: "Pending",
                  }),
                  t.jsx("div", {
                    className:
                      "text-xl font-semibold text-yellow-900 dark:text-yellow-100",
                    children: s,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      t.jsxs("div", {
        className: "bg-white dark:bg-gray-800 p-6 rounded shadow",
        children: [
          t.jsx("h2", {
            className:
              "text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4",
            children: "Documents",
          }),
          t.jsx(Ge, {}),
        ],
      }),
    ],
  });
}
function ea() {
  const e = D(),
    r = c.useMemo(() => e.filter((n) => n.status === "verified"), [e]),
    a = r.length;
  return t.jsxs("div", {
    className: "max-w-7xl mx-auto px-4 py-8",
    children: [
      t.jsxs("div", {
        className: "mb-8",
        children: [
          t.jsx("h1", {
            className:
              "text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2",
            children: "Employer Dashboard",
          }),
          t.jsx("p", {
            className: "text-gray-600 dark:text-gray-300",
            children:
              "View all verified credentials uploaded by learners and institutions.",
          }),
          t.jsx("div", {
            className: "mt-4 flex flex-wrap gap-4",
            children: t.jsxs("div", {
              className:
                "bg-white dark:bg-gray-800 p-4 rounded shadow flex-1 min-w-[150px] text-center",
              children: [
                t.jsx("div", {
                  className: "text-gray-500 dark:text-gray-400 text-sm",
                  children: "Verified Documents",
                }),
                t.jsx("div", {
                  className:
                    "text-xl font-semibold text-green-600 dark:text-green-400",
                  children: a,
                }),
              ],
            }),
          }),
        ],
      }),
      t.jsx("div", {
        className: "space-y-4",
        children:
          r.length === 0
            ? t.jsx("p", {
                className: "text-gray-600 dark:text-gray-300",
                children: "No verified documents yet.",
              })
            : r.map((n) =>
                t.jsxs(
                  "div",
                  {
                    className:
                      "bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center",
                    children: [
                      t.jsxs("div", {
                        children: [
                          t.jsx("div", {
                            className:
                              "font-semibold text-gray-800 dark:text-gray-100",
                            children: n.name,
                          }),
                          t.jsxs("div", {
                            className:
                              "text-sm text-gray-500 dark:text-gray-400",
                            children: [
                              n.owner,
                              " • ",
                              new Date(n.createdAt).toLocaleString(),
                            ],
                          }),
                        ],
                      }),
                      t.jsx("div", {
                        className:
                          "text-green-600 dark:text-green-400 font-medium",
                        children: "Verified",
                      }),
                    ],
                  },
                  n.id
                )
              ),
      }),
    ],
  });
}
const H = 8;
function Ke() {
  const { user: e } = $(),
    [r, a] = c.useState([]),
    [n, s] = c.useState(!0),
    [l, i] = c.useState(""),
    [o, u] = c.useState("all"),
    [d, x] = c.useState("newest"),
    [h, g] = c.useState(new Set()),
    [y, b] = c.useState(1);
  c.useEffect(() => {
    s(!0);
    try {
      const m = D() || [];
      a(m);
    } catch (m) {
      (console.error("Failed to load docs", m), a([]));
    } finally {
      s(!1);
    }
  }, []);
  const p = c.useMemo(() => {
      let m = [...r];
      if (l.trim()) {
        const v = l.toLowerCase();
        m = m.filter(
          (S) =>
            (S.name || "").toLowerCase().includes(v) ||
            (S.owner || "").toLowerCase().includes(v) ||
            (S.id || "").toLowerCase().includes(v)
        );
      }
      return (
        o !== "all" && (m = m.filter((v) => v.status === o)),
        e
          ? (e.role !== "Admin" &&
              (m = m.filter((v) => v.owner === e.email || v.owner === e.role)),
            d === "newest"
              ? m.sort((v, S) => new Date(S.createdAt) - new Date(v.createdAt))
              : d === "oldest"
                ? m.sort(
                    (v, S) => new Date(v.createdAt) - new Date(S.createdAt)
                  )
                : d === "name" &&
                  m.sort((v, S) => (v.name || "").localeCompare(S.name || "")),
            m)
          : []
      );
    }, [r, l, o, d, e]),
    f = Math.max(1, Math.ceil(p.length / H));
  c.useEffect(() => {
    y > f && b(f);
  }, [f, y]);
  const N = p.slice((y - 1) * H, y * H),
    j = (m) => {
      const v = r.map((S) => (S.id === m.id ? m : S));
      (a(v), Y(v));
    },
    w = (m) => {
      if (!window.confirm("Mark this document as VERIFIED?")) return;
      const v = r.find((q) => q.id === m);
      if (!v) return;
      const S = {
        ...v,
        status: "verified",
        verifiedAt: new Date().toISOString(),
      };
      j(S);
    },
    k = () => {
      if (h.size === 0) return alert("No documents selected.");
      if (!window.confirm(`Verify ${h.size} selected document(s)?`)) return;
      const m = r.map((v) =>
        h.has(v.id)
          ? { ...v, status: "verified", verifiedAt: new Date().toISOString() }
          : v
      );
      (a(m), Y(m), g(new Set()));
    },
    P = (m) => {
      if (!window.confirm("Delete this document permanently?")) return;
      He(m);
      const v = r.filter((S) => S.id !== m);
      a(v);
    },
    W = (m) => {
      const v = new Set(h);
      (v.has(m) ? v.delete(m) : v.add(m), g(v));
    },
    Z = () => {
      const m = p;
      if (m.length === 0) return alert("No documents to export.");
      const S = [
          [
            "id",
            "name",
            "owner",
            "status",
            "createdAt",
            "verifiedAt",
            "dataUrl",
          ],
          ...m.map((_) => [
            _.id,
            _.name,
            _.owner,
            _.status,
            _.createdAt,
            _.verifiedAt || "",
            _.dataUrl || "",
          ]),
        ].map((_) =>
          _.map((Ye) => `"${String(Ye).replace(/"/g, '""')}"`).join(",")
        ).join(`
`),
        q = new Blob([S], { type: "text/csv;charset=utf-8;" }),
        he = URL.createObjectURL(q),
        J = document.createElement("a");
      ((J.href = he),
        (J.download = `microcred-docs-${new Date().toISOString().slice(0, 10)}.csv`),
        document.body.appendChild(J),
        J.click(),
        J.remove(),
        URL.revokeObjectURL(he));
    };
  return n
    ? t.jsx("div", {
        className: "py-16 flex justify-center",
        children: t.jsx(ze, {
          className: "animate-spin w-8 h-8 text-blue-600",
        }),
      })
    : t.jsxs("div", {
        className: "max-w-6xl mx-auto py-6",
        children: [
          t.jsxs("div", {
            className:
              "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6",
            children: [
              t.jsxs("div", {
                className: "flex items-center gap-3",
                children: [
                  t.jsx(Fe, { className: "w-6 h-6 text-blue-600" }),
                  t.jsxs("div", {
                    children: [
                      t.jsx("h3", {
                        className: "text-lg font-semibold",
                        children: "Document Verification",
                      }),
                      t.jsx("p", {
                        className: "text-sm text-gray-500",
                        children: "Review and verify uploaded credentials",
                      }),
                    ],
                  }),
                ],
              }),
              t.jsxs("div", {
                className: "flex flex-col sm:flex-row gap-2 items-stretch",
                children: [
                  t.jsxs("div", {
                    className:
                      "flex items-center gap-2 bg-white dark:bg-gray-800 border rounded px-2",
                    children: [
                      t.jsx(Or, { className: "w-4 h-4 text-gray-400" }),
                      t.jsx("input", {
                        value: l,
                        onChange: (m) => {
                          (i(m.target.value), b(1));
                        },
                        placeholder: "Search by name, owner or id",
                        className:
                          "px-2 py-2 outline-none bg-transparent text-sm min-w-[200px]",
                      }),
                    ],
                  }),
                  t.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      t.jsx("label", {
                        className: "sr-only",
                        children: "Status filter",
                      }),
                      t.jsxs("select", {
                        value: o,
                        onChange: (m) => {
                          (u(m.target.value), b(1));
                        },
                        className:
                          "border rounded px-3 py-2 text-sm bg-white dark:bg-gray-800",
                        "aria-label": "Filter by status",
                        children: [
                          t.jsx("option", {
                            value: "all",
                            children: "All statuses",
                          }),
                          t.jsx("option", {
                            value: "pending",
                            children: "Pending",
                          }),
                          t.jsx("option", {
                            value: "verified",
                            children: "Verified",
                          }),
                          t.jsx("option", {
                            value: "rejected",
                            children: "Rejected",
                          }),
                        ],
                      }),
                      t.jsxs("select", {
                        value: d,
                        onChange: (m) => x(m.target.value),
                        className:
                          "border rounded px-3 py-2 text-sm bg-white dark:bg-gray-800",
                        "aria-label": "Sort documents",
                        children: [
                          t.jsx("option", {
                            value: "newest",
                            children: "Newest",
                          }),
                          t.jsx("option", {
                            value: "oldest",
                            children: "Oldest",
                          }),
                          t.jsx("option", {
                            value: "name",
                            children: "Name (A–Z)",
                          }),
                        ],
                      }),
                    ],
                  }),
                  t.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      t.jsxs("button", {
                        onClick: Z,
                        className:
                          "inline-flex items-center gap-2 px-3 py-2 border rounded bg-white dark:bg-gray-800 text-sm hover:shadow",
                        title: "Export filtered list as CSV",
                        children: [
                          t.jsx(yr, { className: "w-4 h-4" }),
                          " Export",
                        ],
                      }),
                      (e == null ? void 0 : e.role) === "Admin" &&
                        t.jsxs("button", {
                          onClick: k,
                          disabled: h.size === 0,
                          className: `inline-flex items-center gap-2 px-3 py-2 rounded text-sm ${h.size === 0 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`,
                          children: [
                            t.jsx(ke, { className: "w-4 h-4" }),
                            " Verify Selected",
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          t.jsx("div", {
            className: "space-y-3",
            children:
              p.length === 0
                ? t.jsxs("div", {
                    className:
                      "bg-white dark:bg-gray-800 p-6 rounded shadow text-center",
                    children: [
                      t.jsx("p", {
                        className: "text-gray-600",
                        children: "No documents found for the current filters.",
                      }),
                      t.jsx("p", {
                        className: "text-sm text-gray-400 mt-2",
                        children:
                          "Try clearing the search or changing filters.",
                      }),
                    ],
                  })
                : t.jsxs(t.Fragment, {
                    children: [
                      t.jsx("div", {
                        className: "grid gap-3",
                        children: N.map((m) =>
                          t.jsxs(
                            "div",
                            {
                              className:
                                "bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                              children: [
                                t.jsxs("div", {
                                  className: "flex items-start gap-3",
                                  children: [
                                    t.jsx("input", {
                                      "aria-label": `Select document ${m.name}`,
                                      type: "checkbox",
                                      checked: h.has(m.id),
                                      onChange: () => W(m.id),
                                      className: "mt-1",
                                    }),
                                    t.jsxs("div", {
                                      children: [
                                        t.jsxs("div", {
                                          className: "flex items-center gap-2",
                                          children: [
                                            t.jsx("span", {
                                              className:
                                                "font-semibold text-gray-800 dark:text-gray-100",
                                              children: m.name,
                                            }),
                                            t.jsx("span", {
                                              className:
                                                "text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600",
                                              children: m.type || "Document",
                                            }),
                                          ],
                                        }),
                                        t.jsxs("div", {
                                          className: "text-sm text-gray-500",
                                          children: [
                                            m.owner,
                                            " • ",
                                            new Date(
                                              m.createdAt
                                            ).toLocaleString(),
                                          ],
                                        }),
                                        t.jsxs("div", {
                                          className: "text-sm mt-1",
                                          children: [
                                            "Status:",
                                            " ",
                                            t.jsx("span", {
                                              className:
                                                m.status === "verified"
                                                  ? "text-green-600"
                                                  : m.status === "pending"
                                                    ? "text-yellow-600"
                                                    : "text-gray-500",
                                              children: m.status,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                t.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    m.dataUrl &&
                                      t.jsxs("a", {
                                        href: m.dataUrl,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className:
                                          "inline-flex items-center gap-1 px-3 py-1.5 border rounded text-sm hover:bg-gray-50",
                                        title: "Open document",
                                        children: [
                                          t.jsx(Ve, { className: "w-4 h-4" }),
                                          " Open",
                                        ],
                                      }),
                                    (e == null ? void 0 : e.role) === "Admin" &&
                                      m.status !== "verified" &&
                                      t.jsxs("button", {
                                        onClick: () => w(m.id),
                                        className:
                                          "inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700",
                                        children: [
                                          t.jsx(ke, { className: "w-4 h-4" }),
                                          " Verify",
                                        ],
                                      }),
                                    ((e == null ? void 0 : e.role) ===
                                      "Admin" ||
                                      m.owner ===
                                        (e == null ? void 0 : e.email)) &&
                                      t.jsxs("button", {
                                        onClick: () => P(m.id),
                                        className:
                                          "inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded text-sm hover:bg-red-600",
                                        children: [
                                          t.jsx(qe, { className: "w-4 h-4" }),
                                          " Delete",
                                        ],
                                      }),
                                  ],
                                }),
                              ],
                            },
                            m.id
                          )
                        ),
                      }),
                      t.jsxs("div", {
                        className: "mt-4 flex items-center justify-between",
                        children: [
                          t.jsxs("div", {
                            className: "text-sm text-gray-600",
                            children: [
                              "Showing ",
                              (y - 1) * H + 1,
                              " -",
                              " ",
                              Math.min(y * H, p.length),
                              " of ",
                              p.length,
                            ],
                          }),
                          t.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              t.jsx("button", {
                                onClick: () => b((m) => Math.max(1, m - 1)),
                                disabled: y === 1,
                                className:
                                  "px-3 py-1 border rounded disabled:opacity-50",
                                children: "Prev",
                              }),
                              t.jsxs("span", {
                                className: "px-3 py-1 text-sm",
                                children: ["Page ", y, " / ", f],
                              }),
                              t.jsx("button", {
                                onClick: () => b((m) => Math.min(f, m + 1)),
                                disabled: y === f,
                                className:
                                  "px-3 py-1 border rounded disabled:opacity-50",
                                children: "Next",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
          }),
        ],
      });
}
function ta() {
  const e = D(),
    r = e.length,
    a = e.filter((s) => s.status === "verified").length,
    n = e.filter((s) => s.status !== "verified").length;
  return t.jsxs("div", {
    className: "max-w-7xl mx-auto px-4 py-8",
    children: [
      t.jsxs("div", {
        className: "mb-8",
        children: [
          t.jsx("h1", {
            className:
              "text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2",
            children: "Admin Dashboard",
          }),
          t.jsx("p", {
            className: "text-gray-600 dark:text-gray-300",
            children: "Manage and verify uploaded credentials below.",
          }),
          t.jsxs("div", {
            className: "mt-4 flex flex-wrap gap-4",
            children: [
              t.jsxs("div", {
                className:
                  "bg-white dark:bg-gray-800 p-4 rounded shadow flex-1 min-w-[150px] text-center",
                children: [
                  t.jsx("div", {
                    className: "text-gray-500 text-sm",
                    children: "Total Documents",
                  }),
                  t.jsx("div", {
                    className:
                      "text-xl font-semibold text-gray-800 dark:text-gray-100",
                    children: r,
                  }),
                ],
              }),
              t.jsxs("div", {
                className:
                  "bg-green-100 dark:bg-green-900 p-4 rounded shadow flex-1 min-w-[150px] text-center",
                children: [
                  t.jsx("div", {
                    className: "text-green-800 dark:text-green-300 text-sm",
                    children: "Verified",
                  }),
                  t.jsx("div", {
                    className:
                      "text-xl font-semibold text-green-900 dark:text-green-100",
                    children: a,
                  }),
                ],
              }),
              t.jsxs("div", {
                className:
                  "bg-yellow-100 dark:bg-yellow-900 p-4 rounded shadow flex-1 min-w-[150px] text-center",
                children: [
                  t.jsx("div", {
                    className: "text-yellow-800 dark:text-yellow-300 text-sm",
                    children: "Pending",
                  }),
                  t.jsx("div", {
                    className:
                      "text-xl font-semibold text-yellow-900 dark:text-yellow-100",
                    children: n,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      t.jsxs("div", {
        className: "bg-white dark:bg-gray-800 p-6 rounded shadow",
        children: [
          t.jsx("h2", {
            className:
              "text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4",
            children: "Verify Documents",
          }),
          t.jsx(Ke, {}),
        ],
      }),
    ],
  });
}
function ra() {
  const { user: e } = $(),
    [r, a] = c.useState([]),
    n = z(),
    s = async (i) => {
      const o = i.target.files[0];
      if (!o) return;
      const u = await l(o),
        d = {
          id: Date.now().toString(),
          owner:
            (e == null ? void 0 : e.email) || (e == null ? void 0 : e.role),
          name: o.name,
          size: o.size,
          type: o.type,
          dataUrl: u,
          status: "pending",
          createdAt: Date.now(),
        };
      (Yr(d),
        a(D().filter((x) => x.owner === d.owner)),
        alert("Document uploaded (demo). Admin can verify from /verify."));
    },
    l = (i) =>
      new Promise((o, u) => {
        const d = new FileReader();
        ((d.onload = () => o(d.result)), (d.onerror = u), d.readAsDataURL(i));
      });
  return t.jsxs("div", {
    className: "max-w-xl mx-auto bg-white p-6 rounded shadow",
    children: [
      t.jsx("h2", {
        className: "text-xl font-semibold mb-4",
        children: "Upload Document",
      }),
      t.jsx("p", {
        className: "text-sm text-gray-600 mb-4",
        children:
          "Allowed: PDF, images. Uploaded docs are stored locally (demo).",
      }),
      t.jsxs("div", {
        className: "space-y-3",
        children: [
          t.jsx("input", { type: "file", onChange: s }),
          t.jsx("button", {
            onClick: () => n(-1),
            className: "px-3 py-1 border rounded",
            children: "Back",
          }),
        ],
      }),
    ],
  });
}
function aa() {
  return t.jsxs("div", {
    className: "text-center",
    children: [
      t.jsx("h2", {
        className: "text-2xl font-semibold",
        children: "404 — Page not found",
      }),
      t.jsx("p", {
        className: "mt-4",
        children: "The page you are looking for doesn't exist.",
      }),
    ],
  });
}
function B({ children: e, allowedRoles: r = [] }) {
  const { user: a, loading: n } = $(),
    s = O();
  return n
    ? t.jsx("div", {
        className:
          "flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900",
        children: t.jsx("div", {
          className: "text-gray-600 dark:text-gray-300 text-sm animate-pulse",
          children: "Checking authentication...",
        }),
      })
    : a
      ? r.length > 0 && !r.includes(a.role)
        ? t.jsx(be, { to: "/unauthorized", replace: !0 })
        : t.jsx(t.Fragment, { children: e })
      : t.jsx(be, { to: "/login", state: { from: s }, replace: !0 });
}
function na() {
  return t.jsxs("div", {
    className: "container mx-auto p-8 text-center",
    children: [
      t.jsx("h2", {
        className: "text-2xl font-bold",
        children: "Unauthorized",
      }),
      t.jsx("p", {
        className: "mt-4",
        children: "You don’t have permission to view this page.",
      }),
    ],
  });
}
function sa() {
  return t.jsxs("div", {
    className: "min-h-screen flex flex-col",
    children: [
      t.jsx(qr, {}),
      t.jsx("main", {
        className: "flex-1 container mx-auto px-4 py-8",
        children: t.jsxs(Ht, {
          children: [
            t.jsx(L, { path: "/", element: t.jsx(Hr, {}) }),
            t.jsx(L, { path: "/login", element: t.jsx(Gr, {}) }),
            t.jsx(L, { path: "/register", element: t.jsx(Kr, {}) }),
            t.jsx(L, {
              path: "/upload",
              element: t.jsx(B, {
                allowedRoles: ["Learner", "Institution"],
                children: t.jsx(ra, {}),
              }),
            }),
            t.jsx(L, {
              path: "/verify",
              element: t.jsx(B, {
                allowedRoles: ["Admin"],
                children: t.jsx(Ke, {}),
              }),
            }),
            t.jsx(L, {
              path: "/dashboard/learner",
              element: t.jsx(B, {
                allowedRoles: ["Learner"],
                children: t.jsx(Xr, {}),
              }),
            }),
            t.jsx(L, {
              path: "/dashboard/institution",
              element: t.jsx(B, {
                allowedRoles: ["Institution"],
                children: t.jsx(Qr, {}),
              }),
            }),
            t.jsx(L, {
              path: "/dashboard/employer",
              element: t.jsx(B, {
                allowedRoles: ["Employer"],
                children: t.jsx(ea, {}),
              }),
            }),
            t.jsx(L, {
              path: "/dashboard/admin",
              element: t.jsx(B, {
                allowedRoles: ["Admin"],
                children: t.jsx(ta, {}),
              }),
            }),
            t.jsx(L, { path: "*", element: t.jsx(aa, {}) }),
            t.jsx(L, { path: "/unauthorized", element: t.jsx(na, {}) }),
          ],
        }),
      }),
      t.jsx(Jr, {}),
    ],
  });
}
function la() {
  return t.jsx("div", {
    className:
      "flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900",
    children: t.jsx("p", {
      className: "text-gray-600 dark:text-gray-300 animate-pulse",
      children: "Loading application...",
    }),
  });
}
class ia extends Ce.Component {
  constructor(r) {
    (super(r), (this.state = { hasError: !1, error: null }));
  }
  static getDerivedStateFromError(r) {
    return { hasError: !0, error: r };
  }
  componentDidCatch(r, a) {
    console.error("Error caught in ErrorBoundary:", r, a);
  }
  render() {
    var r;
    return this.state.hasError
      ? t.jsxs("div", {
          className:
            "flex flex-col items-center justify-center h-screen bg-red-50 dark:bg-red-900 px-4",
          children: [
            t.jsx("h1", {
              className:
                "text-2xl font-bold text-red-600 dark:text-red-400 mb-2",
              children: "Something went wrong.",
            }),
            t.jsx("p", {
              className: "text-gray-700 dark:text-gray-200 mb-4",
              children:
                ((r = this.state.error) == null ? void 0 : r.message) ||
                "Please refresh the page or try again later.",
            }),
            t.jsx("button", {
              onClick: () => window.location.reload(),
              className:
                "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition",
              children: "Reload",
            }),
          ],
        })
      : this.props.children;
  }
}
const oa = document.getElementById("root"),
  ca = Re(oa);
ca.render(
  t.jsx(Ce.StrictMode, {
    children: t.jsx(ia, {
      children: t.jsx(c.Suspense, {
        fallback: t.jsx(la, {}),
        children: t.jsx(ir, {
          children: t.jsx(tr, { children: t.jsx(sa, {}) }),
        }),
      }),
    }),
  })
);
