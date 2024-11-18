var Ge = { exports: {} };
(function(ie) {
  ((ne) => {
    var oe = Object.defineProperty, ye = Object.getOwnPropertyDescriptor, Te = Object.getOwnPropertyNames, ee = Object.prototype.hasOwnProperty, Je = (e, n) => {
      for (var r in n)
        oe(e, r, { get: n[r], enumerable: !0 });
    }, Ye = (e, n, r, c) => {
      if (n && typeof n == "object" || typeof n == "function")
        for (let g of Te(n))
          !ee.call(e, g) && g !== r && oe(e, g, { get: () => n[g], enumerable: !(c = ye(n, g)) || c.enumerable });
      return e;
    }, He = (e) => Ye(oe({}, "__esModule", { value: !0 }), e), le = (e, n, r) => new Promise((c, g) => {
      var y = (u) => {
        try {
          _(r.next(u));
        } catch (R) {
          g(R);
        }
      }, h = (u) => {
        try {
          _(r.throw(u));
        } catch (R) {
          g(R);
        }
      }, _ = (u) => u.done ? c(u.value) : Promise.resolve(u.value).then(y, h);
      _((r = r.apply(e, n)).next());
    }), we = {};
    Je(we, {
      analyzeMetafile: () => gt,
      analyzeMetafileSync: () => vt,
      build: () => ft,
      buildSync: () => pt,
      context: () => dt,
      default: () => _t,
      formatMessages: () => mt,
      formatMessagesSync: () => wt,
      initialize: () => xt,
      stop: () => bt,
      transform: () => ht,
      transformSync: () => yt,
      version: () => ut
    }), ne.exports = He(we);
    function Oe(e) {
      let n = (c) => {
        if (c === null)
          r.write8(0);
        else if (typeof c == "boolean")
          r.write8(1), r.write8(+c);
        else if (typeof c == "number")
          r.write8(2), r.write32(c | 0);
        else if (typeof c == "string")
          r.write8(3), r.write(te(c));
        else if (c instanceof Uint8Array)
          r.write8(4), r.write(c);
        else if (c instanceof Array) {
          r.write8(5), r.write32(c.length);
          for (let g of c)
            n(g);
        } else {
          let g = Object.keys(c);
          r.write8(6), r.write32(g.length);
          for (let y of g)
            r.write(te(y)), n(c[y]);
        }
      }, r = new Ce();
      return r.write32(0), r.write32(e.id << 1 | +!e.isRequest), n(e.value), je(r.buf, r.len - 4, 0), r.buf.subarray(0, r.len);
    }
    function Qe(e) {
      let n = () => {
        switch (r.read8()) {
          case 0:
            return null;
          case 1:
            return !!r.read8();
          case 2:
            return r.read32();
          case 3:
            return fe(r.read());
          case 4:
            return r.read();
          case 5: {
            let h = r.read32(), _ = [];
            for (let u = 0; u < h; u++)
              _.push(n());
            return _;
          }
          case 6: {
            let h = r.read32(), _ = {};
            for (let u = 0; u < h; u++)
              _[fe(r.read())] = n();
            return _;
          }
          default:
            throw new Error("Invalid packet");
        }
      }, r = new Ce(e), c = r.read32(), g = (c & 1) === 0;
      c >>>= 1;
      let y = n();
      if (r.ptr !== e.length)
        throw new Error("Invalid packet");
      return { id: c, isRequest: g, value: y };
    }
    var Ce = class {
      constructor(e = new Uint8Array(1024)) {
        this.buf = e, this.len = 0, this.ptr = 0;
      }
      _write(e) {
        if (this.len + e > this.buf.length) {
          let n = new Uint8Array((this.len + e) * 2);
          n.set(this.buf), this.buf = n;
        }
        return this.len += e, this.len - e;
      }
      write8(e) {
        let n = this._write(1);
        this.buf[n] = e;
      }
      write32(e) {
        let n = this._write(4);
        je(this.buf, e, n);
      }
      write(e) {
        let n = this._write(4 + e.length);
        je(this.buf, e.length, n), this.buf.set(e, n + 4);
      }
      _read(e) {
        if (this.ptr + e > this.buf.length)
          throw new Error("Invalid packet");
        return this.ptr += e, this.ptr - e;
      }
      read8() {
        return this.buf[this._read(1)];
      }
      read32() {
        return Ue(this.buf, this._read(4));
      }
      read() {
        let e = this.read32(), n = new Uint8Array(e), r = this._read(n.length);
        return n.set(this.buf.subarray(r, r + e)), n;
      }
    }, te, fe, $e;
    if (typeof TextEncoder < "u" && typeof TextDecoder < "u") {
      let e = new TextEncoder(), n = new TextDecoder();
      te = (r) => e.encode(r), fe = (r) => n.decode(r), $e = 'new TextEncoder().encode("")';
    } else if (typeof Buffer < "u")
      te = (e) => Buffer.from(e), fe = (e) => {
        let { buffer: n, byteOffset: r, byteLength: c } = e;
        return Buffer.from(n, r, c).toString();
      }, $e = 'Buffer.from("")';
    else
      throw new Error("No UTF-8 codec found");
    if (!(te("") instanceof Uint8Array))
      throw new Error(`Invariant violation: "${$e} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
    function Ue(e, n) {
      return e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24;
    }
    function je(e, n, r) {
      e[r++] = n, e[r++] = n >> 8, e[r++] = n >> 16, e[r++] = n >> 24;
    }
    var J = JSON.stringify, De = "warning", Re = "silent";
    function Ae(e) {
      if (H(e, "target"), e.indexOf(",") >= 0) throw new Error(`Invalid target: ${e}`);
      return e;
    }
    var ve = () => null, B = (e) => typeof e == "boolean" ? null : "a boolean", j = (e) => typeof e == "string" ? null : "a string", be = (e) => e instanceof RegExp ? null : "a RegExp object", ae = (e) => typeof e == "number" && e === (e | 0) ? null : "an integer", Ie = (e) => typeof e == "function" ? null : "a function", G = (e) => Array.isArray(e) ? null : "an array", X = (e) => typeof e == "object" && e !== null && !Array.isArray(e) ? null : "an object", Xe = (e) => typeof e == "object" && e !== null ? null : "an array or an object", Ke = (e) => e instanceof WebAssembly.Module ? null : "a WebAssembly.Module", Me = (e) => typeof e == "object" && !Array.isArray(e) ? null : "an object or null", Fe = (e) => typeof e == "string" || typeof e == "boolean" ? null : "a string or a boolean", Ze = (e) => typeof e == "string" || typeof e == "object" && e !== null && !Array.isArray(e) ? null : "a string or an object", et = (e) => typeof e == "string" || Array.isArray(e) ? null : "a string or an array", Ne = (e) => typeof e == "string" || e instanceof Uint8Array ? null : "a string or a Uint8Array", tt = (e) => typeof e == "string" || e instanceof URL ? null : "a string or a URL";
    function i(e, n, r, c) {
      let g = e[r];
      if (n[r + ""] = !0, g === void 0) return;
      let y = c(g);
      if (y !== null) throw new Error(`${J(r)} must be ${y}`);
      return g;
    }
    function Y(e, n, r) {
      for (let c in e)
        if (!(c in n))
          throw new Error(`Invalid option ${r}: ${J(c)}`);
    }
    function nt(e) {
      let n = /* @__PURE__ */ Object.create(null), r = i(e, n, "wasmURL", tt), c = i(e, n, "wasmModule", Ke), g = i(e, n, "worker", B);
      return Y(e, n, "in initialize() call"), {
        wasmURL: r,
        wasmModule: c,
        worker: g
      };
    }
    function Le(e) {
      let n;
      if (e !== void 0) {
        n = /* @__PURE__ */ Object.create(null);
        for (let r in e) {
          let c = e[r];
          if (typeof c == "string" || c === !1)
            n[r] = c;
          else
            throw new Error(`Expected ${J(r)} in mangle cache to map to either a string or false`);
        }
      }
      return n;
    }
    function xe(e, n, r, c, g) {
      let y = i(n, r, "color", B), h = i(n, r, "logLevel", j), _ = i(n, r, "logLimit", ae);
      y !== void 0 ? e.push(`--color=${y}`) : c && e.push("--color=true"), e.push(`--log-level=${h || g}`), e.push(`--log-limit=${_ || 0}`);
    }
    function H(e, n, r) {
      if (typeof e != "string")
        throw new Error(`Expected value for ${n}${r !== void 0 ? " " + J(r) : ""} to be a string, got ${typeof e} instead`);
      return e;
    }
    function Ve(e, n, r) {
      let c = i(n, r, "legalComments", j), g = i(n, r, "sourceRoot", j), y = i(n, r, "sourcesContent", B), h = i(n, r, "target", et), _ = i(n, r, "format", j), u = i(n, r, "globalName", j), R = i(n, r, "mangleProps", be), A = i(n, r, "reserveProps", be), P = i(n, r, "mangleQuoted", B), L = i(n, r, "minify", B), U = i(n, r, "minifySyntax", B), M = i(n, r, "minifyWhitespace", B), F = i(n, r, "minifyIdentifiers", B), $ = i(n, r, "lineLimit", ae), z = i(n, r, "drop", G), S = i(n, r, "dropLabels", G), E = i(n, r, "charset", j), p = i(n, r, "treeShaking", B), f = i(n, r, "ignoreAnnotations", B), s = i(n, r, "jsx", j), o = i(n, r, "jsxFactory", j), d = i(n, r, "jsxFragment", j), b = i(n, r, "jsxImportSource", j), x = i(n, r, "jsxDev", B), a = i(n, r, "jsxSideEffects", B), m = i(n, r, "define", X), t = i(n, r, "logOverride", X), l = i(n, r, "supported", X), w = i(n, r, "pure", G), v = i(n, r, "keepNames", B), T = i(n, r, "platform", j), D = i(n, r, "tsconfigRaw", Ze);
      if (c && e.push(`--legal-comments=${c}`), g !== void 0 && e.push(`--source-root=${g}`), y !== void 0 && e.push(`--sources-content=${y}`), h && (Array.isArray(h) ? e.push(`--target=${Array.from(h).map(Ae).join(",")}`) : e.push(`--target=${Ae(h)}`)), _ && e.push(`--format=${_}`), u && e.push(`--global-name=${u}`), T && e.push(`--platform=${T}`), D && e.push(`--tsconfig-raw=${typeof D == "string" ? D : JSON.stringify(D)}`), L && e.push("--minify"), U && e.push("--minify-syntax"), M && e.push("--minify-whitespace"), F && e.push("--minify-identifiers"), $ && e.push(`--line-limit=${$}`), E && e.push(`--charset=${E}`), p !== void 0 && e.push(`--tree-shaking=${p}`), f && e.push("--ignore-annotations"), z) for (let C of z) e.push(`--drop:${H(C, "drop")}`);
      if (S && e.push(`--drop-labels=${Array.from(S).map((C) => H(C, "dropLabels")).join(",")}`), R && e.push(`--mangle-props=${R.source}`), A && e.push(`--reserve-props=${A.source}`), P !== void 0 && e.push(`--mangle-quoted=${P}`), s && e.push(`--jsx=${s}`), o && e.push(`--jsx-factory=${o}`), d && e.push(`--jsx-fragment=${d}`), b && e.push(`--jsx-import-source=${b}`), x && e.push("--jsx-dev"), a && e.push("--jsx-side-effects"), m)
        for (let C in m) {
          if (C.indexOf("=") >= 0) throw new Error(`Invalid define: ${C}`);
          e.push(`--define:${C}=${H(m[C], "define", C)}`);
        }
      if (t)
        for (let C in t) {
          if (C.indexOf("=") >= 0) throw new Error(`Invalid log override: ${C}`);
          e.push(`--log-override:${C}=${H(t[C], "log override", C)}`);
        }
      if (l)
        for (let C in l) {
          if (C.indexOf("=") >= 0) throw new Error(`Invalid supported: ${C}`);
          const O = l[C];
          if (typeof O != "boolean") throw new Error(`Expected value for supported ${J(C)} to be a boolean, got ${typeof O} instead`);
          e.push(`--supported:${C}=${O}`);
        }
      if (w) for (let C of w) e.push(`--pure:${H(C, "pure")}`);
      v && e.push("--keep-names");
    }
    function rt(e, n, r, c, g) {
      var y;
      let h = [], _ = [], u = /* @__PURE__ */ Object.create(null), R = null, A = null;
      xe(h, n, u, r, c), Ve(h, n, u);
      let P = i(n, u, "sourcemap", Fe), L = i(n, u, "bundle", B), U = i(n, u, "splitting", B), M = i(n, u, "preserveSymlinks", B), F = i(n, u, "metafile", B), $ = i(n, u, "outfile", j), z = i(n, u, "outdir", j), S = i(n, u, "outbase", j), E = i(n, u, "tsconfig", j), p = i(n, u, "resolveExtensions", G), f = i(n, u, "nodePaths", G), s = i(n, u, "mainFields", G), o = i(n, u, "conditions", G), d = i(n, u, "external", G), b = i(n, u, "packages", j), x = i(n, u, "alias", X), a = i(n, u, "loader", X), m = i(n, u, "outExtension", X), t = i(n, u, "publicPath", j), l = i(n, u, "entryNames", j), w = i(n, u, "chunkNames", j), v = i(n, u, "assetNames", j), T = i(n, u, "inject", G), D = i(n, u, "banner", X), C = i(n, u, "footer", X), O = i(n, u, "entryPoints", Xe), V = i(n, u, "absWorkingDir", j), I = i(n, u, "stdin", X), N = (y = i(n, u, "write", B)) != null ? y : g, K = i(n, u, "allowOverwrite", B), q = i(n, u, "mangleCache", X);
      if (u.plugins = !0, Y(n, u, `in ${e}() call`), P && h.push(`--sourcemap${P === !0 ? "" : `=${P}`}`), L && h.push("--bundle"), K && h.push("--allow-overwrite"), U && h.push("--splitting"), M && h.push("--preserve-symlinks"), F && h.push("--metafile"), $ && h.push(`--outfile=${$}`), z && h.push(`--outdir=${z}`), S && h.push(`--outbase=${S}`), E && h.push(`--tsconfig=${E}`), b && h.push(`--packages=${b}`), p) {
        let k = [];
        for (let W of p) {
          if (H(W, "resolve extension"), W.indexOf(",") >= 0) throw new Error(`Invalid resolve extension: ${W}`);
          k.push(W);
        }
        h.push(`--resolve-extensions=${k.join(",")}`);
      }
      if (t && h.push(`--public-path=${t}`), l && h.push(`--entry-names=${l}`), w && h.push(`--chunk-names=${w}`), v && h.push(`--asset-names=${v}`), s) {
        let k = [];
        for (let W of s) {
          if (H(W, "main field"), W.indexOf(",") >= 0) throw new Error(`Invalid main field: ${W}`);
          k.push(W);
        }
        h.push(`--main-fields=${k.join(",")}`);
      }
      if (o) {
        let k = [];
        for (let W of o) {
          if (H(W, "condition"), W.indexOf(",") >= 0) throw new Error(`Invalid condition: ${W}`);
          k.push(W);
        }
        h.push(`--conditions=${k.join(",")}`);
      }
      if (d) for (let k of d) h.push(`--external:${H(k, "external")}`);
      if (x)
        for (let k in x) {
          if (k.indexOf("=") >= 0) throw new Error(`Invalid package name in alias: ${k}`);
          h.push(`--alias:${k}=${H(x[k], "alias", k)}`);
        }
      if (D)
        for (let k in D) {
          if (k.indexOf("=") >= 0) throw new Error(`Invalid banner file type: ${k}`);
          h.push(`--banner:${k}=${H(D[k], "banner", k)}`);
        }
      if (C)
        for (let k in C) {
          if (k.indexOf("=") >= 0) throw new Error(`Invalid footer file type: ${k}`);
          h.push(`--footer:${k}=${H(C[k], "footer", k)}`);
        }
      if (T) for (let k of T) h.push(`--inject:${H(k, "inject")}`);
      if (a)
        for (let k in a) {
          if (k.indexOf("=") >= 0) throw new Error(`Invalid loader extension: ${k}`);
          h.push(`--loader:${k}=${H(a[k], "loader", k)}`);
        }
      if (m)
        for (let k in m) {
          if (k.indexOf("=") >= 0) throw new Error(`Invalid out extension: ${k}`);
          h.push(`--out-extension:${k}=${H(m[k], "out extension", k)}`);
        }
      if (O)
        if (Array.isArray(O))
          for (let k = 0, W = O.length; k < W; k++) {
            let Z = O[k];
            if (typeof Z == "object" && Z !== null) {
              let re = /* @__PURE__ */ Object.create(null), Q = i(Z, re, "in", j), pe = i(Z, re, "out", j);
              if (Y(Z, re, "in entry point at index " + k), Q === void 0) throw new Error('Missing property "in" for entry point at index ' + k);
              if (pe === void 0) throw new Error('Missing property "out" for entry point at index ' + k);
              _.push([pe, Q]);
            } else
              _.push(["", H(Z, "entry point at index " + k)]);
          }
        else
          for (let k in O)
            _.push([k, H(O[k], "entry point", k)]);
      if (I) {
        let k = /* @__PURE__ */ Object.create(null), W = i(I, k, "contents", Ne), Z = i(I, k, "resolveDir", j), re = i(I, k, "sourcefile", j), Q = i(I, k, "loader", j);
        Y(I, k, 'in "stdin" object'), re && h.push(`--sourcefile=${re}`), Q && h.push(`--loader=${Q}`), Z && (A = Z), typeof W == "string" ? R = te(W) : W instanceof Uint8Array && (R = W);
      }
      let he = [];
      if (f)
        for (let k of f)
          k += "", he.push(k);
      return {
        entries: _,
        flags: h,
        write: N,
        stdinContents: R,
        stdinResolveDir: A,
        absWorkingDir: V,
        nodePaths: he,
        mangleCache: Le(q)
      };
    }
    function st(e, n, r, c) {
      let g = [], y = /* @__PURE__ */ Object.create(null);
      xe(g, n, y, r, c), Ve(g, n, y);
      let h = i(n, y, "sourcemap", Fe), _ = i(n, y, "sourcefile", j), u = i(n, y, "loader", j), R = i(n, y, "banner", j), A = i(n, y, "footer", j), P = i(n, y, "mangleCache", X);
      return Y(n, y, `in ${e}() call`), h && g.push(`--sourcemap=${h === !0 ? "external" : h}`), _ && g.push(`--sourcefile=${_}`), u && g.push(`--loader=${u}`), R && g.push(`--banner=${R}`), A && g.push(`--footer=${A}`), {
        flags: g,
        mangleCache: Le(P)
      };
    }
    function it(e) {
      const n = {}, r = { didClose: !1, reason: "" };
      let c = {}, g = 0, y = 0, h = new Uint8Array(16 * 1024), _ = 0, u = (E) => {
        let p = _ + E.length;
        if (p > h.length) {
          let s = new Uint8Array(p * 2);
          s.set(h), h = s;
        }
        h.set(E, _), _ += E.length;
        let f = 0;
        for (; f + 4 <= _; ) {
          let s = Ue(h, f);
          if (f + 4 + s > _)
            break;
          f += 4, M(h.subarray(f, f + s)), f += s;
        }
        f > 0 && (h.copyWithin(0, f, _), _ -= f);
      }, R = (E) => {
        r.didClose = !0, E && (r.reason = ": " + (E.message || E));
        const p = "The service was stopped" + r.reason;
        for (let f in c)
          c[f](p, null);
        c = {};
      }, A = (E, p, f) => {
        if (r.didClose) return f("The service is no longer running" + r.reason, null);
        let s = g++;
        c[s] = (o, d) => {
          try {
            f(o, d);
          } finally {
            E && E.unref();
          }
        }, E && E.ref(), e.writeToStdin(Oe({ id: s, isRequest: !0, value: p }));
      }, P = (E, p) => {
        if (r.didClose) throw new Error("The service is no longer running" + r.reason);
        e.writeToStdin(Oe({ id: E, isRequest: !1, value: p }));
      }, L = (E, p) => le(this, null, function* () {
        try {
          if (p.command === "ping") {
            P(E, {});
            return;
          }
          if (typeof p.key == "number") {
            const f = n[p.key];
            if (!f)
              return;
            const s = f[p.command];
            if (s) {
              yield s(E, p);
              return;
            }
          }
          throw new Error("Invalid command: " + p.command);
        } catch (f) {
          const s = [ce(f, e, null, void 0, "")];
          try {
            P(E, { errors: s });
          } catch {
          }
        }
      }), U = !0, M = (E) => {
        if (U) {
          U = !1;
          let f = String.fromCharCode(...E);
          if (f !== "0.24.0")
            throw new Error(`Cannot start service: Host version "0.24.0" does not match binary version ${J(f)}`);
          return;
        }
        let p = Qe(E);
        if (p.isRequest)
          L(p.id, p.value);
        else {
          let f = c[p.id];
          delete c[p.id], p.value.error ? f(p.value.error, {}) : f(null, p.value);
        }
      };
      return {
        readFromStdout: u,
        afterClose: R,
        service: {
          buildOrContext: ({ callName: E, refs: p, options: f, isTTY: s, defaultWD: o, callback: d }) => {
            let b = 0;
            const x = y++, a = {}, m = {
              ref() {
                ++b === 1 && p && p.ref();
              },
              unref() {
                --b === 0 && (delete n[x], p && p.unref());
              }
            };
            n[x] = a, m.ref(), lt(
              E,
              x,
              A,
              P,
              m,
              e,
              a,
              f,
              s,
              o,
              (t, l) => {
                try {
                  d(t, l);
                } finally {
                  m.unref();
                }
              }
            );
          },
          transform: ({ callName: E, refs: p, input: f, options: s, isTTY: o, fs: d, callback: b }) => {
            const x = Be();
            let a = (m) => {
              try {
                if (typeof f != "string" && !(f instanceof Uint8Array))
                  throw new Error('The input to "transform" must be a string or a Uint8Array');
                let {
                  flags: t,
                  mangleCache: l
                } = st(E, s, o, Re), w = {
                  command: "transform",
                  flags: t,
                  inputFS: m !== null,
                  input: m !== null ? te(m) : typeof f == "string" ? te(f) : f
                };
                l && (w.mangleCache = l), A(p, w, (v, T) => {
                  if (v) return b(new Error(v), null);
                  let D = de(T.errors, x), C = de(T.warnings, x), O = 1, V = () => {
                    if (--O === 0) {
                      let I = {
                        warnings: C,
                        code: T.code,
                        map: T.map,
                        mangleCache: void 0,
                        legalComments: void 0
                      };
                      "legalComments" in T && (I.legalComments = T == null ? void 0 : T.legalComments), T.mangleCache && (I.mangleCache = T == null ? void 0 : T.mangleCache), b(null, I);
                    }
                  };
                  if (D.length > 0) return b(me("Transform failed", D, C), null);
                  T.codeFS && (O++, d.readFile(T.code, (I, N) => {
                    I !== null ? b(I, null) : (T.code = N, V());
                  })), T.mapFS && (O++, d.readFile(T.map, (I, N) => {
                    I !== null ? b(I, null) : (T.map = N, V());
                  })), V();
                });
              } catch (t) {
                let l = [];
                try {
                  xe(l, s, {}, o, Re);
                } catch {
                }
                const w = ce(t, e, x, void 0, "");
                A(p, { command: "error", flags: l, error: w }, () => {
                  w.detail = x.load(w.detail), b(me("Transform failed", [w], []), null);
                });
              }
            };
            if ((typeof f == "string" || f instanceof Uint8Array) && f.length > 1024 * 1024) {
              let m = a;
              a = () => d.writeFile(f, m);
            }
            a(null);
          },
          formatMessages: ({ callName: E, refs: p, messages: f, options: s, callback: o }) => {
            if (!s) throw new Error(`Missing second argument in ${E}() call`);
            let d = {}, b = i(s, d, "kind", j), x = i(s, d, "color", B), a = i(s, d, "terminalWidth", ae);
            if (Y(s, d, `in ${E}() call`), b === void 0) throw new Error(`Missing "kind" in ${E}() call`);
            if (b !== "error" && b !== "warning") throw new Error(`Expected "kind" to be "error" or "warning" in ${E}() call`);
            let m = {
              command: "format-msgs",
              messages: se(f, "messages", null, "", a),
              isWarning: b === "warning"
            };
            x !== void 0 && (m.color = x), a !== void 0 && (m.terminalWidth = a), A(p, m, (t, l) => {
              if (t) return o(new Error(t), null);
              o(null, l.messages);
            });
          },
          analyzeMetafile: ({ callName: E, refs: p, metafile: f, options: s, callback: o }) => {
            s === void 0 && (s = {});
            let d = {}, b = i(s, d, "color", B), x = i(s, d, "verbose", B);
            Y(s, d, `in ${E}() call`);
            let a = {
              command: "analyze-metafile",
              metafile: f
            };
            b !== void 0 && (a.color = b), x !== void 0 && (a.verbose = x), A(p, a, (m, t) => {
              if (m) return o(new Error(m), null);
              o(null, t.result);
            });
          }
        }
      };
    }
    function lt(e, n, r, c, g, y, h, _, u, R, A) {
      const P = Be(), L = e === "context", U = ($, z) => {
        const S = [];
        try {
          xe(S, _, {}, u, De);
        } catch {
        }
        const E = ce($, y, P, void 0, z);
        r(g, { command: "error", flags: S, error: E }, () => {
          E.detail = P.load(E.detail), A(me(L ? "Context failed" : "Build failed", [E], []), null);
        });
      };
      let M;
      if (typeof _ == "object") {
        const $ = _.plugins;
        if ($ !== void 0) {
          if (!Array.isArray($)) return U(new Error('"plugins" must be an array'), "");
          M = $;
        }
      }
      if (M && M.length > 0) {
        if (y.isSync) return U(new Error("Cannot use plugins in synchronous API calls"), "");
        ot(
          n,
          r,
          c,
          g,
          y,
          h,
          _,
          M,
          P
        ).then(
          ($) => {
            if (!$.ok) return U($.error, $.pluginName);
            try {
              F($.requestPlugins, $.runOnEndCallbacks, $.scheduleOnDisposeCallbacks);
            } catch (z) {
              U(z, "");
            }
          },
          ($) => U($, "")
        );
        return;
      }
      try {
        F(null, ($, z) => z([], []), () => {
        });
      } catch ($) {
        U($, "");
      }
      function F($, z, S) {
        const E = y.hasFS, {
          entries: p,
          flags: f,
          write: s,
          stdinContents: o,
          stdinResolveDir: d,
          absWorkingDir: b,
          nodePaths: x,
          mangleCache: a
        } = rt(e, _, u, De, E);
        if (s && !y.hasFS) throw new Error('The "write" option is unavailable in this environment');
        const m = {
          command: "build",
          key: n,
          entries: p,
          flags: f,
          write: s,
          stdinContents: o,
          stdinResolveDir: d,
          absWorkingDir: b || R,
          nodePaths: x,
          context: L
        };
        $ && (m.plugins = $), a && (m.mangleCache = a);
        const t = (v, T) => {
          const D = {
            errors: de(v.errors, P),
            warnings: de(v.warnings, P),
            outputFiles: void 0,
            metafile: void 0,
            mangleCache: void 0
          }, C = D.errors.slice(), O = D.warnings.slice();
          v.outputFiles && (D.outputFiles = v.outputFiles.map(ct)), v.metafile && (D.metafile = JSON.parse(v.metafile)), v.mangleCache && (D.mangleCache = v.mangleCache), v.writeToStdout !== void 0 && console.log(fe(v.writeToStdout).replace(/\n$/, "")), z(D, (V, I) => {
            if (C.length > 0 || V.length > 0) {
              const N = me("Build failed", C.concat(V), O.concat(I));
              return T(N, null, V, I);
            }
            T(null, D, V, I);
          });
        };
        let l, w;
        L && (h["on-end"] = (v, T) => new Promise((D) => {
          t(T, (C, O, V, I) => {
            const N = {
              errors: V,
              warnings: I
            };
            w && w(C, O), l = void 0, w = void 0, c(v, N), D();
          });
        })), r(g, m, (v, T) => {
          if (v) return A(new Error(v), null);
          if (!L)
            return t(T, (O, V) => (S(), A(O, V)));
          if (T.errors.length > 0)
            return A(me("Context failed", T.errors, T.warnings), null);
          let D = !1;
          const C = {
            rebuild: () => (l || (l = new Promise((O, V) => {
              let I;
              w = (K, q) => {
                I || (I = () => K ? V(K) : O(q));
              };
              const N = () => {
                r(g, {
                  command: "rebuild",
                  key: n
                }, (q, he) => {
                  q ? V(new Error(q)) : I ? I() : N();
                });
              };
              N();
            })), l),
            watch: (O = {}) => new Promise((V, I) => {
              if (!y.hasFS) throw new Error('Cannot use the "watch" API in this environment');
              Y(O, {}, "in watch() call"), r(g, {
                command: "watch",
                key: n
              }, (q) => {
                q ? I(new Error(q)) : V(void 0);
              });
            }),
            serve: (O = {}) => new Promise((V, I) => {
              if (!y.hasFS) throw new Error('Cannot use the "serve" API in this environment');
              const N = {}, K = i(O, N, "port", ae), q = i(O, N, "host", j), he = i(O, N, "servedir", j), k = i(O, N, "keyfile", j), W = i(O, N, "certfile", j), Z = i(O, N, "fallback", j), re = i(O, N, "onRequest", Ie);
              Y(O, N, "in serve() call");
              const Q = {
                command: "serve",
                key: n,
                onRequest: !!re
              };
              K !== void 0 && (Q.port = K), q !== void 0 && (Q.host = q), he !== void 0 && (Q.servedir = he), k !== void 0 && (Q.keyfile = k), W !== void 0 && (Q.certfile = W), Z !== void 0 && (Q.fallback = Z), r(g, Q, (pe, Et) => {
                if (pe) return I(new Error(pe));
                re && (h["serve-request"] = (St, Tt) => {
                  re(Tt.args), c(St, {});
                }), V(Et);
              });
            }),
            cancel: () => new Promise((O) => {
              if (D) return O();
              r(g, {
                command: "cancel",
                key: n
              }, () => {
                O();
              });
            }),
            dispose: () => new Promise((O) => {
              if (D) return O();
              D = !0, r(g, {
                command: "dispose",
                key: n
              }, () => {
                O(), S(), g.unref();
              });
            })
          };
          g.ref(), A(null, C);
        });
      }
    }
    var ot = (e, n, r, c, g, y, h, _, u) => le(void 0, null, function* () {
      let R = [], A = [], P = {}, L = {}, U = [], M = 0, F = 0, $ = [], z = !1;
      _ = [..._];
      for (let p of _) {
        let f = {};
        if (typeof p != "object") throw new Error(`Plugin at index ${F} must be an object`);
        const s = i(p, f, "name", j);
        if (typeof s != "string" || s === "") throw new Error(`Plugin at index ${F} is missing a name`);
        try {
          let o = i(p, f, "setup", Ie);
          if (typeof o != "function") throw new Error("Plugin is missing a setup function");
          Y(p, f, `on plugin ${J(s)}`);
          let d = {
            name: s,
            onStart: !1,
            onEnd: !1,
            onResolve: [],
            onLoad: []
          };
          F++;
          let x = o({
            initialOptions: h,
            resolve: (a, m = {}) => {
              if (!z) throw new Error('Cannot call "resolve" before plugin setup has completed');
              if (typeof a != "string") throw new Error("The path to resolve must be a string");
              let t = /* @__PURE__ */ Object.create(null), l = i(m, t, "pluginName", j), w = i(m, t, "importer", j), v = i(m, t, "namespace", j), T = i(m, t, "resolveDir", j), D = i(m, t, "kind", j), C = i(m, t, "pluginData", ve), O = i(m, t, "with", X);
              return Y(m, t, "in resolve() call"), new Promise((V, I) => {
                const N = {
                  command: "resolve",
                  path: a,
                  key: e,
                  pluginName: s
                };
                if (l != null && (N.pluginName = l), w != null && (N.importer = w), v != null && (N.namespace = v), T != null && (N.resolveDir = T), D != null) N.kind = D;
                else throw new Error('Must specify "kind" when calling "resolve"');
                C != null && (N.pluginData = u.store(C)), O != null && (N.with = at(O, "with")), n(c, N, (K, q) => {
                  K !== null ? I(new Error(K)) : V({
                    errors: de(q.errors, u),
                    warnings: de(q.warnings, u),
                    path: q.path,
                    external: q.external,
                    sideEffects: q.sideEffects,
                    namespace: q.namespace,
                    suffix: q.suffix,
                    pluginData: u.load(q.pluginData)
                  });
                });
              });
            },
            onStart(a) {
              let m = 'This error came from the "onStart" callback registered here:', t = ke(new Error(m), g, "onStart");
              R.push({ name: s, callback: a, note: t }), d.onStart = !0;
            },
            onEnd(a) {
              let m = 'This error came from the "onEnd" callback registered here:', t = ke(new Error(m), g, "onEnd");
              A.push({ name: s, callback: a, note: t }), d.onEnd = !0;
            },
            onResolve(a, m) {
              let t = 'This error came from the "onResolve" callback registered here:', l = ke(new Error(t), g, "onResolve"), w = {}, v = i(a, w, "filter", be), T = i(a, w, "namespace", j);
              if (Y(a, w, `in onResolve() call for plugin ${J(s)}`), v == null) throw new Error("onResolve() call is missing a filter");
              let D = M++;
              P[D] = { name: s, callback: m, note: l }, d.onResolve.push({ id: D, filter: v.source, namespace: T || "" });
            },
            onLoad(a, m) {
              let t = 'This error came from the "onLoad" callback registered here:', l = ke(new Error(t), g, "onLoad"), w = {}, v = i(a, w, "filter", be), T = i(a, w, "namespace", j);
              if (Y(a, w, `in onLoad() call for plugin ${J(s)}`), v == null) throw new Error("onLoad() call is missing a filter");
              let D = M++;
              L[D] = { name: s, callback: m, note: l }, d.onLoad.push({ id: D, filter: v.source, namespace: T || "" });
            },
            onDispose(a) {
              U.push(a);
            },
            esbuild: g.esbuild
          });
          x && (yield x), $.push(d);
        } catch (o) {
          return { ok: !1, error: o, pluginName: s };
        }
      }
      y["on-start"] = (p, f) => le(void 0, null, function* () {
        u.clear();
        let s = { errors: [], warnings: [] };
        yield Promise.all(R.map((o) => le(void 0, [o], function* ({ name: d, callback: b, note: x }) {
          try {
            let a = yield b();
            if (a != null) {
              if (typeof a != "object") throw new Error(`Expected onStart() callback in plugin ${J(d)} to return an object`);
              let m = {}, t = i(a, m, "errors", G), l = i(a, m, "warnings", G);
              Y(a, m, `from onStart() callback in plugin ${J(d)}`), t != null && s.errors.push(...se(t, "errors", u, d, void 0)), l != null && s.warnings.push(...se(l, "warnings", u, d, void 0));
            }
          } catch (a) {
            s.errors.push(ce(a, g, u, x && x(), d));
          }
        }))), r(p, s);
      }), y["on-resolve"] = (p, f) => le(void 0, null, function* () {
        let s = {}, o = "", d, b;
        for (let x of f.ids)
          try {
            ({ name: o, callback: d, note: b } = P[x]);
            let a = yield d({
              path: f.path,
              importer: f.importer,
              namespace: f.namespace,
              resolveDir: f.resolveDir,
              kind: f.kind,
              pluginData: u.load(f.pluginData),
              with: f.with
            });
            if (a != null) {
              if (typeof a != "object") throw new Error(`Expected onResolve() callback in plugin ${J(o)} to return an object`);
              let m = {}, t = i(a, m, "pluginName", j), l = i(a, m, "path", j), w = i(a, m, "namespace", j), v = i(a, m, "suffix", j), T = i(a, m, "external", B), D = i(a, m, "sideEffects", B), C = i(a, m, "pluginData", ve), O = i(a, m, "errors", G), V = i(a, m, "warnings", G), I = i(a, m, "watchFiles", G), N = i(a, m, "watchDirs", G);
              Y(a, m, `from onResolve() callback in plugin ${J(o)}`), s.id = x, t != null && (s.pluginName = t), l != null && (s.path = l), w != null && (s.namespace = w), v != null && (s.suffix = v), T != null && (s.external = T), D != null && (s.sideEffects = D), C != null && (s.pluginData = u.store(C)), O != null && (s.errors = se(O, "errors", u, o, void 0)), V != null && (s.warnings = se(V, "warnings", u, o, void 0)), I != null && (s.watchFiles = _e(I, "watchFiles")), N != null && (s.watchDirs = _e(N, "watchDirs"));
              break;
            }
          } catch (a) {
            s = { id: x, errors: [ce(a, g, u, b && b(), o)] };
            break;
          }
        r(p, s);
      }), y["on-load"] = (p, f) => le(void 0, null, function* () {
        let s = {}, o = "", d, b;
        for (let x of f.ids)
          try {
            ({ name: o, callback: d, note: b } = L[x]);
            let a = yield d({
              path: f.path,
              namespace: f.namespace,
              suffix: f.suffix,
              pluginData: u.load(f.pluginData),
              with: f.with
            });
            if (a != null) {
              if (typeof a != "object") throw new Error(`Expected onLoad() callback in plugin ${J(o)} to return an object`);
              let m = {}, t = i(a, m, "pluginName", j), l = i(a, m, "contents", Ne), w = i(a, m, "resolveDir", j), v = i(a, m, "pluginData", ve), T = i(a, m, "loader", j), D = i(a, m, "errors", G), C = i(a, m, "warnings", G), O = i(a, m, "watchFiles", G), V = i(a, m, "watchDirs", G);
              Y(a, m, `from onLoad() callback in plugin ${J(o)}`), s.id = x, t != null && (s.pluginName = t), l instanceof Uint8Array ? s.contents = l : l != null && (s.contents = te(l)), w != null && (s.resolveDir = w), v != null && (s.pluginData = u.store(v)), T != null && (s.loader = T), D != null && (s.errors = se(D, "errors", u, o, void 0)), C != null && (s.warnings = se(C, "warnings", u, o, void 0)), O != null && (s.watchFiles = _e(O, "watchFiles")), V != null && (s.watchDirs = _e(V, "watchDirs"));
              break;
            }
          } catch (a) {
            s = { id: x, errors: [ce(a, g, u, b && b(), o)] };
            break;
          }
        r(p, s);
      });
      let S = (p, f) => f([], []);
      A.length > 0 && (S = (p, f) => {
        le(void 0, null, function* () {
          const s = [], o = [];
          for (const { name: d, callback: b, note: x } of A) {
            let a, m;
            try {
              const t = yield b(p);
              if (t != null) {
                if (typeof t != "object") throw new Error(`Expected onEnd() callback in plugin ${J(d)} to return an object`);
                let l = {}, w = i(t, l, "errors", G), v = i(t, l, "warnings", G);
                Y(t, l, `from onEnd() callback in plugin ${J(d)}`), w != null && (a = se(w, "errors", u, d, void 0)), v != null && (m = se(v, "warnings", u, d, void 0));
              }
            } catch (t) {
              a = [ce(t, g, u, x && x(), d)];
            }
            if (a) {
              s.push(...a);
              try {
                p.errors.push(...a);
              } catch {
              }
            }
            if (m) {
              o.push(...m);
              try {
                p.warnings.push(...m);
              } catch {
              }
            }
          }
          f(s, o);
        });
      });
      let E = () => {
        for (const p of U)
          setTimeout(() => p(), 0);
      };
      return z = !0, {
        ok: !0,
        requestPlugins: $,
        runOnEndCallbacks: S,
        scheduleOnDisposeCallbacks: E
      };
    });
    function Be() {
      const e = /* @__PURE__ */ new Map();
      let n = 0;
      return {
        clear() {
          e.clear();
        },
        load(r) {
          return e.get(r);
        },
        store(r) {
          if (r === void 0) return -1;
          const c = n++;
          return e.set(c, r), c;
        }
      };
    }
    function ke(e, n, r) {
      let c, g = !1;
      return () => {
        if (g) return c;
        g = !0;
        try {
          let y = (e.stack + "").split(`
`);
          y.splice(1, 1);
          let h = We(n, y, r);
          if (h)
            return c = { text: e.message, location: h }, c;
        } catch {
        }
      };
    }
    function ce(e, n, r, c, g) {
      let y = "Internal error", h = null;
      try {
        y = (e && e.message || e) + "";
      } catch {
      }
      try {
        h = We(n, (e.stack + "").split(`
`), "");
      } catch {
      }
      return { id: "", pluginName: g, text: y, location: h, notes: c ? [c] : [], detail: r ? r.store(e) : -1 };
    }
    function We(e, n, r) {
      let c = "    at ";
      if (e.readFileSync && !n[0].startsWith(c) && n[1].startsWith(c))
        for (let g = 1; g < n.length; g++) {
          let y = n[g];
          if (y.startsWith(c))
            for (y = y.slice(c.length); ; ) {
              let h = /^(?:new |async )?\S+ \((.*)\)$/.exec(y);
              if (h) {
                y = h[1];
                continue;
              }
              if (h = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(y), h) {
                y = h[1];
                continue;
              }
              if (h = /^(\S+):(\d+):(\d+)$/.exec(y), h) {
                let _;
                try {
                  _ = e.readFileSync(h[1], "utf8");
                } catch {
                  break;
                }
                let u = _.split(/\r\n|\r|\n|\u2028|\u2029/)[+h[2] - 1] || "", R = +h[3] - 1, A = u.slice(R, R + r.length) === r ? r.length : 0;
                return {
                  file: h[1],
                  namespace: "file",
                  line: +h[2],
                  column: te(u.slice(0, R)).length,
                  length: te(u.slice(R, R + A)).length,
                  lineText: u + `
` + n.slice(1).join(`
`),
                  suggestion: ""
                };
              }
              break;
            }
        }
      return null;
    }
    function me(e, n, r) {
      let c = 5;
      e += n.length < 1 ? "" : ` with ${n.length} error${n.length < 2 ? "" : "s"}:` + n.slice(0, c + 1).map((y, h) => {
        if (h === c) return `
...`;
        if (!y.location) return `
error: ${y.text}`;
        let { file: _, line: u, column: R } = y.location, A = y.pluginName ? `[plugin: ${y.pluginName}] ` : "";
        return `
${_}:${u}:${R}: ERROR: ${A}${y.text}`;
      }).join("");
      let g = new Error(e);
      for (const [y, h] of [["errors", n], ["warnings", r]])
        Object.defineProperty(g, y, {
          configurable: !0,
          enumerable: !0,
          get: () => h,
          set: (_) => Object.defineProperty(g, y, {
            configurable: !0,
            enumerable: !0,
            value: _
          })
        });
      return g;
    }
    function de(e, n) {
      for (const r of e)
        r.detail = n.load(r.detail);
      return e;
    }
    function ze(e, n, r) {
      if (e == null) return null;
      let c = {}, g = i(e, c, "file", j), y = i(e, c, "namespace", j), h = i(e, c, "line", ae), _ = i(e, c, "column", ae), u = i(e, c, "length", ae), R = i(e, c, "lineText", j), A = i(e, c, "suggestion", j);
      if (Y(e, c, n), R) {
        const P = R.slice(
          0,
          (_ && _ > 0 ? _ : 0) + (u && u > 0 ? u : 0) + (r && r > 0 ? r : 80)
        );
        !/[\x7F-\uFFFF]/.test(P) && !/\n/.test(R) && (R = P);
      }
      return {
        file: g || "",
        namespace: y || "",
        line: h || 0,
        column: _ || 0,
        length: u || 0,
        lineText: R || "",
        suggestion: A || ""
      };
    }
    function se(e, n, r, c, g) {
      let y = [], h = 0;
      for (const _ of e) {
        let u = {}, R = i(_, u, "id", j), A = i(_, u, "pluginName", j), P = i(_, u, "text", j), L = i(_, u, "location", Me), U = i(_, u, "notes", G), M = i(_, u, "detail", ve), F = `in element ${h} of "${n}"`;
        Y(_, u, F);
        let $ = [];
        if (U)
          for (const z of U) {
            let S = {}, E = i(z, S, "text", j), p = i(z, S, "location", Me);
            Y(z, S, F), $.push({
              text: E || "",
              location: ze(p, F, g)
            });
          }
        y.push({
          id: R || "",
          pluginName: A || c,
          text: P || "",
          location: ze(L, F, g),
          notes: $,
          detail: r ? r.store(M) : -1
        }), h++;
      }
      return y;
    }
    function _e(e, n) {
      const r = [];
      for (const c of e) {
        if (typeof c != "string") throw new Error(`${J(n)} must be an array of strings`);
        r.push(c);
      }
      return r;
    }
    function at(e, n) {
      const r = /* @__PURE__ */ Object.create(null);
      for (const c in e) {
        const g = e[c];
        if (typeof g != "string") throw new Error(`key ${J(c)} in object ${J(n)} must be a string`);
        r[c] = g;
      }
      return r;
    }
    function ct({ path: e, contents: n, hash: r }) {
      let c = null;
      return {
        path: e,
        contents: n,
        hash: r,
        get text() {
          const g = this.contents;
          return (c === null || g !== n) && (n = g, c = fe(g)), c;
        }
      };
    }
    var ut = "0.24.0", ft = (e) => ge().build(e), dt = (e) => ge().context(e), ht = (e, n) => ge().transform(e, n), mt = (e, n) => ge().formatMessages(e, n), gt = (e, n) => ge().analyzeMetafile(e, n), pt = () => {
      throw new Error('The "buildSync" API only works in node');
    }, yt = () => {
      throw new Error('The "transformSync" API only works in node');
    }, wt = () => {
      throw new Error('The "formatMessagesSync" API only works in node');
    }, vt = () => {
      throw new Error('The "analyzeMetafileSync" API only works in node');
    }, bt = () => (Ee && Ee(), Promise.resolve()), ue, Ee, Se, ge = () => {
      if (Se) return Se;
      throw ue ? new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this') : new Error('You need to call "initialize" before calling this');
    }, xt = (e) => {
      e = nt(e || {});
      let n = e.wasmURL, r = e.wasmModule, c = e.worker !== !1;
      if (!n && !r) throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');
      if (ue) throw new Error('Cannot call "initialize" more than once');
      return ue = kt(n || "", r, c), ue.catch(() => {
        ue = void 0;
      }), ue;
    }, kt = (e, n, r) => le(void 0, null, function* () {
      let c, g;
      const y = new Promise((P) => g = P);
      if (r) {
        let P = new Blob([`onmessage=((postMessage) => {
      // Copyright 2018 The Go Authors. All rights reserved.
      // Use of this source code is governed by a BSD-style
      // license that can be found in the LICENSE file.
      var __async = (__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
          var fulfilled = (value) => {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          };
          var rejected = (value) => {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          };
          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
          step((generator = generator.apply(__this, __arguments)).next());
        });
      };
      let onmessage;
      let globalThis = {};
      for (let o = self; o; o = Object.getPrototypeOf(o))
        for (let k of Object.getOwnPropertyNames(o))
          if (!(k in globalThis))
            Object.defineProperty(globalThis, k, { get: () => self[k] });
      "use strict";
      (() => {
        const enosys = () => {
          const err = new Error("not implemented");
          err.code = "ENOSYS";
          return err;
        };
        if (!globalThis.fs) {
          let outputBuf = "";
          globalThis.fs = {
            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
            // unused
            writeSync(fd, buf) {
              outputBuf += decoder.decode(buf);
              const nl = outputBuf.lastIndexOf("\\n");
              if (nl != -1) {
                console.log(outputBuf.substring(0, nl));
                outputBuf = outputBuf.substring(nl + 1);
              }
              return buf.length;
            },
            write(fd, buf, offset, length, position, callback) {
              if (offset !== 0 || length !== buf.length || position !== null) {
                callback(enosys());
                return;
              }
              const n = this.writeSync(fd, buf);
              callback(null, n);
            },
            chmod(path, mode, callback) {
              callback(enosys());
            },
            chown(path, uid, gid, callback) {
              callback(enosys());
            },
            close(fd, callback) {
              callback(enosys());
            },
            fchmod(fd, mode, callback) {
              callback(enosys());
            },
            fchown(fd, uid, gid, callback) {
              callback(enosys());
            },
            fstat(fd, callback) {
              callback(enosys());
            },
            fsync(fd, callback) {
              callback(null);
            },
            ftruncate(fd, length, callback) {
              callback(enosys());
            },
            lchown(path, uid, gid, callback) {
              callback(enosys());
            },
            link(path, link, callback) {
              callback(enosys());
            },
            lstat(path, callback) {
              callback(enosys());
            },
            mkdir(path, perm, callback) {
              callback(enosys());
            },
            open(path, flags, mode, callback) {
              callback(enosys());
            },
            read(fd, buffer, offset, length, position, callback) {
              callback(enosys());
            },
            readdir(path, callback) {
              callback(enosys());
            },
            readlink(path, callback) {
              callback(enosys());
            },
            rename(from, to, callback) {
              callback(enosys());
            },
            rmdir(path, callback) {
              callback(enosys());
            },
            stat(path, callback) {
              callback(enosys());
            },
            symlink(path, link, callback) {
              callback(enosys());
            },
            truncate(path, length, callback) {
              callback(enosys());
            },
            unlink(path, callback) {
              callback(enosys());
            },
            utimes(path, atime, mtime, callback) {
              callback(enosys());
            }
          };
        }
        if (!globalThis.process) {
          globalThis.process = {
            getuid() {
              return -1;
            },
            getgid() {
              return -1;
            },
            geteuid() {
              return -1;
            },
            getegid() {
              return -1;
            },
            getgroups() {
              throw enosys();
            },
            pid: -1,
            ppid: -1,
            umask() {
              throw enosys();
            },
            cwd() {
              throw enosys();
            },
            chdir() {
              throw enosys();
            }
          };
        }
        if (!globalThis.crypto) {
          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
        }
        if (!globalThis.performance) {
          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
        }
        if (!globalThis.TextEncoder) {
          throw new Error("globalThis.TextEncoder is not available, polyfill required");
        }
        if (!globalThis.TextDecoder) {
          throw new Error("globalThis.TextDecoder is not available, polyfill required");
        }
        const encoder = new TextEncoder("utf-8");
        const decoder = new TextDecoder("utf-8");
        globalThis.Go = class {
          constructor() {
            this.argv = ["js"];
            this.env = {};
            this.exit = (code) => {
              if (code !== 0) {
                console.warn("exit code:", code);
              }
            };
            this._exitPromise = new Promise((resolve) => {
              this._resolveExitPromise = resolve;
            });
            this._pendingEvent = null;
            this._scheduledTimeouts = /* @__PURE__ */ new Map();
            this._nextCallbackTimeoutID = 1;
            const setInt64 = (addr, v) => {
              this.mem.setUint32(addr + 0, v, true);
              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
            };
            const setInt32 = (addr, v) => {
              this.mem.setUint32(addr + 0, v, true);
            };
            const getInt64 = (addr) => {
              const low = this.mem.getUint32(addr + 0, true);
              const high = this.mem.getInt32(addr + 4, true);
              return low + high * 4294967296;
            };
            const loadValue = (addr) => {
              const f = this.mem.getFloat64(addr, true);
              if (f === 0) {
                return void 0;
              }
              if (!isNaN(f)) {
                return f;
              }
              const id = this.mem.getUint32(addr, true);
              return this._values[id];
            };
            const storeValue = (addr, v) => {
              const nanHead = 2146959360;
              if (typeof v === "number" && v !== 0) {
                if (isNaN(v)) {
                  this.mem.setUint32(addr + 4, nanHead, true);
                  this.mem.setUint32(addr, 0, true);
                  return;
                }
                this.mem.setFloat64(addr, v, true);
                return;
              }
              if (v === void 0) {
                this.mem.setFloat64(addr, 0, true);
                return;
              }
              let id = this._ids.get(v);
              if (id === void 0) {
                id = this._idPool.pop();
                if (id === void 0) {
                  id = this._values.length;
                }
                this._values[id] = v;
                this._goRefCounts[id] = 0;
                this._ids.set(v, id);
              }
              this._goRefCounts[id]++;
              let typeFlag = 0;
              switch (typeof v) {
                case "object":
                  if (v !== null) {
                    typeFlag = 1;
                  }
                  break;
                case "string":
                  typeFlag = 2;
                  break;
                case "symbol":
                  typeFlag = 3;
                  break;
                case "function":
                  typeFlag = 4;
                  break;
              }
              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
              this.mem.setUint32(addr, id, true);
            };
            const loadSlice = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return new Uint8Array(this._inst.exports.mem.buffer, array, len);
            };
            const loadSliceOfValues = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              const a = new Array(len);
              for (let i = 0; i < len; i++) {
                a[i] = loadValue(array + i * 8);
              }
              return a;
            };
            const loadString = (addr) => {
              const saddr = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
            };
            const timeOrigin = Date.now() - performance.now();
            this.importObject = {
              _gotest: {
                add: (a, b) => a + b
              },
              gojs: {
                // Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
                // may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
                // function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
                // This changes the SP, thus we have to update the SP used by the imported function.
                // func wasmExit(code int32)
                "runtime.wasmExit": (sp) => {
                  sp >>>= 0;
                  const code = this.mem.getInt32(sp + 8, true);
                  this.exited = true;
                  delete this._inst;
                  delete this._values;
                  delete this._goRefCounts;
                  delete this._ids;
                  delete this._idPool;
                  this.exit(code);
                },
                // func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
                "runtime.wasmWrite": (sp) => {
                  sp >>>= 0;
                  const fd = getInt64(sp + 8);
                  const p = getInt64(sp + 16);
                  const n = this.mem.getInt32(sp + 24, true);
                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
                },
                // func resetMemoryDataView()
                "runtime.resetMemoryDataView": (sp) => {
                  sp >>>= 0;
                  this.mem = new DataView(this._inst.exports.mem.buffer);
                },
                // func nanotime1() int64
                "runtime.nanotime1": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                },
                // func walltime() (sec int64, nsec int32)
                "runtime.walltime": (sp) => {
                  sp >>>= 0;
                  const msec = (/* @__PURE__ */ new Date()).getTime();
                  setInt64(sp + 8, msec / 1e3);
                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
                },
                // func scheduleTimeoutEvent(delay int64) int32
                "runtime.scheduleTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this._nextCallbackTimeoutID;
                  this._nextCallbackTimeoutID++;
                  this._scheduledTimeouts.set(id, setTimeout(
                    () => {
                      this._resume();
                      while (this._scheduledTimeouts.has(id)) {
                        console.warn("scheduleTimeoutEvent: missed timeout event");
                        this._resume();
                      }
                    },
                    getInt64(sp + 8)
                  ));
                  this.mem.setInt32(sp + 16, id, true);
                },
                // func clearTimeoutEvent(id int32)
                "runtime.clearTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getInt32(sp + 8, true);
                  clearTimeout(this._scheduledTimeouts.get(id));
                  this._scheduledTimeouts.delete(id);
                },
                // func getRandomData(r []byte)
                "runtime.getRandomData": (sp) => {
                  sp >>>= 0;
                  crypto.getRandomValues(loadSlice(sp + 8));
                },
                // func finalizeRef(v ref)
                "syscall/js.finalizeRef": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getUint32(sp + 8, true);
                  this._goRefCounts[id]--;
                  if (this._goRefCounts[id] === 0) {
                    const v = this._values[id];
                    this._values[id] = null;
                    this._ids.delete(v);
                    this._idPool.push(id);
                  }
                },
                // func stringVal(value string) ref
                "syscall/js.stringVal": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, loadString(sp + 8));
                },
                // func valueGet(v ref, p string) ref
                "syscall/js.valueGet": (sp) => {
                  sp >>>= 0;
                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
                  sp = this._inst.exports.getsp() >>> 0;
                  storeValue(sp + 32, result);
                },
                // func valueSet(v ref, p string, x ref)
                "syscall/js.valueSet": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
                },
                // func valueDelete(v ref, p string)
                "syscall/js.valueDelete": (sp) => {
                  sp >>>= 0;
                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
                },
                // func valueIndex(v ref, i int) ref
                "syscall/js.valueIndex": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
                },
                // valueSetIndex(v ref, i int, x ref)
                "syscall/js.valueSetIndex": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
                },
                // func valueCall(v ref, m string, args []ref) (ref, bool)
                "syscall/js.valueCall": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const m = Reflect.get(v, loadString(sp + 16));
                    const args = loadSliceOfValues(sp + 32);
                    const result = Reflect.apply(m, v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, result);
                    this.mem.setUint8(sp + 64, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, err);
                    this.mem.setUint8(sp + 64, 0);
                  }
                },
                // func valueInvoke(v ref, args []ref) (ref, bool)
                "syscall/js.valueInvoke": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.apply(v, void 0, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                // func valueNew(v ref, args []ref) (ref, bool)
                "syscall/js.valueNew": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.construct(v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                // func valueLength(v ref) int
                "syscall/js.valueLength": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
                },
                // valuePrepareString(v ref) (ref, int)
                "syscall/js.valuePrepareString": (sp) => {
                  sp >>>= 0;
                  const str = encoder.encode(String(loadValue(sp + 8)));
                  storeValue(sp + 16, str);
                  setInt64(sp + 24, str.length);
                },
                // valueLoadString(v ref, b []byte)
                "syscall/js.valueLoadString": (sp) => {
                  sp >>>= 0;
                  const str = loadValue(sp + 8);
                  loadSlice(sp + 16).set(str);
                },
                // func valueInstanceOf(v ref, t ref) bool
                "syscall/js.valueInstanceOf": (sp) => {
                  sp >>>= 0;
                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
                },
                // func copyBytesToGo(dst []byte, src ref) (int, bool)
                "syscall/js.copyBytesToGo": (sp) => {
                  sp >>>= 0;
                  const dst = loadSlice(sp + 8);
                  const src = loadValue(sp + 32);
                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                // func copyBytesToJS(dst ref, src []byte) (int, bool)
                "syscall/js.copyBytesToJS": (sp) => {
                  sp >>>= 0;
                  const dst = loadValue(sp + 8);
                  const src = loadSlice(sp + 16);
                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                "debug": (value) => {
                  console.log(value);
                }
              }
            };
          }
          run(instance) {
            return __async(this, null, function* () {
              if (!(instance instanceof WebAssembly.Instance)) {
                throw new Error("Go.run: WebAssembly.Instance expected");
              }
              this._inst = instance;
              this.mem = new DataView(this._inst.exports.mem.buffer);
              this._values = [
                // JS values that Go currently has references to, indexed by reference id
                NaN,
                0,
                null,
                true,
                false,
                globalThis,
                this
              ];
              this._goRefCounts = new Array(this._values.length).fill(Infinity);
              this._ids = /* @__PURE__ */ new Map([
                // mapping from JS values to reference ids
                [0, 1],
                [null, 2],
                [true, 3],
                [false, 4],
                [globalThis, 5],
                [this, 6]
              ]);
              this._idPool = [];
              this.exited = false;
              let offset = 4096;
              const strPtr = (str) => {
                const ptr = offset;
                const bytes = encoder.encode(str + "\\0");
                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
                offset += bytes.length;
                if (offset % 8 !== 0) {
                  offset += 8 - offset % 8;
                }
                return ptr;
              };
              const argc = this.argv.length;
              const argvPtrs = [];
              this.argv.forEach((arg) => {
                argvPtrs.push(strPtr(arg));
              });
              argvPtrs.push(0);
              const keys = Object.keys(this.env).sort();
              keys.forEach((key) => {
                argvPtrs.push(strPtr(\`\${key}=\${this.env[key]}\`));
              });
              argvPtrs.push(0);
              const argv = offset;
              argvPtrs.forEach((ptr) => {
                this.mem.setUint32(offset, ptr, true);
                this.mem.setUint32(offset + 4, 0, true);
                offset += 8;
              });
              const wasmMinDataAddr = 4096 + 8192;
              if (offset >= wasmMinDataAddr) {
                throw new Error("total length of command line and environment variables exceeds limit");
              }
              this._inst.exports.run(argc, argv);
              if (this.exited) {
                this._resolveExitPromise();
              }
              yield this._exitPromise;
            });
          }
          _resume() {
            if (this.exited) {
              throw new Error("Go program has already exited");
            }
            this._inst.exports.resume();
            if (this.exited) {
              this._resolveExitPromise();
            }
          }
          _makeFuncWrapper(id) {
            const go = this;
            return function() {
              const event = { id, this: this, args: arguments };
              go._pendingEvent = event;
              go._resume();
              return event.result;
            };
          }
        };
      })();
      onmessage = ({ data: wasm }) => {
        let decoder = new TextDecoder();
        let fs = globalThis.fs;
        let stderr = "";
        fs.writeSync = (fd, buffer) => {
          if (fd === 1) {
            postMessage(buffer);
          } else if (fd === 2) {
            stderr += decoder.decode(buffer);
            let parts = stderr.split("\\n");
            if (parts.length > 1) console.log(parts.slice(0, -1).join("\\n"));
            stderr = parts[parts.length - 1];
          } else {
            throw new Error("Bad write");
          }
          return buffer.length;
        };
        let stdin = [];
        let resumeStdin;
        let stdinPos = 0;
        onmessage = ({ data }) => {
          if (data.length > 0) {
            stdin.push(data);
            if (resumeStdin) resumeStdin();
          }
          return go;
        };
        fs.read = (fd, buffer, offset, length, position, callback) => {
          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
            throw new Error("Bad read");
          }
          if (stdin.length === 0) {
            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);
            return;
          }
          let first = stdin[0];
          let count = Math.max(0, Math.min(length, first.length - stdinPos));
          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
          stdinPos += count;
          if (stdinPos === first.length) {
            stdin.shift();
            stdinPos = 0;
          }
          callback(null, count);
        };
        let go = new globalThis.Go();
        go.argv = ["", \`--service=\${"0.24.0"}\`];
        tryToInstantiateModule(wasm, go).then(
          (instance) => {
            postMessage(null);
            go.run(instance);
          },
          (error) => {
            postMessage(error);
          }
        );
        return go;
      };
      function tryToInstantiateModule(wasm, go) {
        return __async(this, null, function* () {
          if (wasm instanceof WebAssembly.Module) {
            return WebAssembly.instantiate(wasm, go.importObject);
          }
          const res = yield fetch(wasm);
          if (!res.ok) throw new Error(\`Failed to download \${JSON.stringify(wasm)}\`);
          if ("instantiateStreaming" in WebAssembly && /^application\\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {
            const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);
            return result2.instance;
          }
          const bytes = yield res.arrayBuffer();
          const result = yield WebAssembly.instantiate(bytes, go.importObject);
          return result.instance;
        });
      }
      return (m) => onmessage(m);
    })(postMessage)`], { type: "text/javascript" });
        c = new Worker(URL.createObjectURL(P));
      } else {
        let P = ((U) => {
          var M = (S, E, p) => new Promise((f, s) => {
            var o = (x) => {
              try {
                b(p.next(x));
              } catch (a) {
                s(a);
              }
            }, d = (x) => {
              try {
                b(p.throw(x));
              } catch (a) {
                s(a);
              }
            }, b = (x) => x.done ? f(x.value) : Promise.resolve(x.value).then(o, d);
            b((p = p.apply(S, E)).next());
          });
          let F, $ = {};
          for (let S = self; S; S = Object.getPrototypeOf(S))
            for (let E of Object.getOwnPropertyNames(S))
              E in $ || Object.defineProperty($, E, { get: () => self[E] });
          (() => {
            const S = () => {
              const f = new Error("not implemented");
              return f.code = "ENOSYS", f;
            };
            if (!$.fs) {
              let f = "";
              $.fs = {
                constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
                // unused
                writeSync(s, o) {
                  f += p.decode(o);
                  const d = f.lastIndexOf(`
`);
                  return d != -1 && (console.log(f.substring(0, d)), f = f.substring(d + 1)), o.length;
                },
                write(s, o, d, b, x, a) {
                  if (d !== 0 || b !== o.length || x !== null) {
                    a(S());
                    return;
                  }
                  const m = this.writeSync(s, o);
                  a(null, m);
                },
                chmod(s, o, d) {
                  d(S());
                },
                chown(s, o, d, b) {
                  b(S());
                },
                close(s, o) {
                  o(S());
                },
                fchmod(s, o, d) {
                  d(S());
                },
                fchown(s, o, d, b) {
                  b(S());
                },
                fstat(s, o) {
                  o(S());
                },
                fsync(s, o) {
                  o(null);
                },
                ftruncate(s, o, d) {
                  d(S());
                },
                lchown(s, o, d, b) {
                  b(S());
                },
                link(s, o, d) {
                  d(S());
                },
                lstat(s, o) {
                  o(S());
                },
                mkdir(s, o, d) {
                  d(S());
                },
                open(s, o, d, b) {
                  b(S());
                },
                read(s, o, d, b, x, a) {
                  a(S());
                },
                readdir(s, o) {
                  o(S());
                },
                readlink(s, o) {
                  o(S());
                },
                rename(s, o, d) {
                  d(S());
                },
                rmdir(s, o) {
                  o(S());
                },
                stat(s, o) {
                  o(S());
                },
                symlink(s, o, d) {
                  d(S());
                },
                truncate(s, o, d) {
                  d(S());
                },
                unlink(s, o) {
                  o(S());
                },
                utimes(s, o, d, b) {
                  b(S());
                }
              };
            }
            if ($.process || ($.process = {
              getuid() {
                return -1;
              },
              getgid() {
                return -1;
              },
              geteuid() {
                return -1;
              },
              getegid() {
                return -1;
              },
              getgroups() {
                throw S();
              },
              pid: -1,
              ppid: -1,
              umask() {
                throw S();
              },
              cwd() {
                throw S();
              },
              chdir() {
                throw S();
              }
            }), !$.crypto)
              throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
            if (!$.performance)
              throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
            if (!$.TextEncoder)
              throw new Error("globalThis.TextEncoder is not available, polyfill required");
            if (!$.TextDecoder)
              throw new Error("globalThis.TextDecoder is not available, polyfill required");
            const E = new TextEncoder("utf-8"), p = new TextDecoder("utf-8");
            $.Go = class {
              constructor() {
                this.argv = ["js"], this.env = {}, this.exit = (t) => {
                  t !== 0 && console.warn("exit code:", t);
                }, this._exitPromise = new Promise((t) => {
                  this._resolveExitPromise = t;
                }), this._pendingEvent = null, this._scheduledTimeouts = /* @__PURE__ */ new Map(), this._nextCallbackTimeoutID = 1;
                const f = (t, l) => {
                  this.mem.setUint32(t + 0, l, !0), this.mem.setUint32(t + 4, Math.floor(l / 4294967296), !0);
                }, s = (t) => {
                  const l = this.mem.getUint32(t + 0, !0), w = this.mem.getInt32(t + 4, !0);
                  return l + w * 4294967296;
                }, o = (t) => {
                  const l = this.mem.getFloat64(t, !0);
                  if (l === 0)
                    return;
                  if (!isNaN(l))
                    return l;
                  const w = this.mem.getUint32(t, !0);
                  return this._values[w];
                }, d = (t, l) => {
                  if (typeof l == "number" && l !== 0) {
                    if (isNaN(l)) {
                      this.mem.setUint32(t + 4, 2146959360, !0), this.mem.setUint32(t, 0, !0);
                      return;
                    }
                    this.mem.setFloat64(t, l, !0);
                    return;
                  }
                  if (l === void 0) {
                    this.mem.setFloat64(t, 0, !0);
                    return;
                  }
                  let v = this._ids.get(l);
                  v === void 0 && (v = this._idPool.pop(), v === void 0 && (v = this._values.length), this._values[v] = l, this._goRefCounts[v] = 0, this._ids.set(l, v)), this._goRefCounts[v]++;
                  let T = 0;
                  switch (typeof l) {
                    case "object":
                      l !== null && (T = 1);
                      break;
                    case "string":
                      T = 2;
                      break;
                    case "symbol":
                      T = 3;
                      break;
                    case "function":
                      T = 4;
                      break;
                  }
                  this.mem.setUint32(t + 4, 2146959360 | T, !0), this.mem.setUint32(t, v, !0);
                }, b = (t) => {
                  const l = s(t + 0), w = s(t + 8);
                  return new Uint8Array(this._inst.exports.mem.buffer, l, w);
                }, x = (t) => {
                  const l = s(t + 0), w = s(t + 8), v = new Array(w);
                  for (let T = 0; T < w; T++)
                    v[T] = o(l + T * 8);
                  return v;
                }, a = (t) => {
                  const l = s(t + 0), w = s(t + 8);
                  return p.decode(new DataView(this._inst.exports.mem.buffer, l, w));
                }, m = Date.now() - performance.now();
                this.importObject = {
                  _gotest: {
                    add: (t, l) => t + l
                  },
                  gojs: {
                    // Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
                    // may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
                    // function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
                    // This changes the SP, thus we have to update the SP used by the imported function.
                    // func wasmExit(code int32)
                    "runtime.wasmExit": (t) => {
                      t >>>= 0;
                      const l = this.mem.getInt32(t + 8, !0);
                      this.exited = !0, delete this._inst, delete this._values, delete this._goRefCounts, delete this._ids, delete this._idPool, this.exit(l);
                    },
                    // func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
                    "runtime.wasmWrite": (t) => {
                      t >>>= 0;
                      const l = s(t + 8), w = s(t + 16), v = this.mem.getInt32(t + 24, !0);
                      $.fs.writeSync(l, new Uint8Array(this._inst.exports.mem.buffer, w, v));
                    },
                    // func resetMemoryDataView()
                    "runtime.resetMemoryDataView": (t) => {
                      this.mem = new DataView(this._inst.exports.mem.buffer);
                    },
                    // func nanotime1() int64
                    "runtime.nanotime1": (t) => {
                      t >>>= 0, f(t + 8, (m + performance.now()) * 1e6);
                    },
                    // func walltime() (sec int64, nsec int32)
                    "runtime.walltime": (t) => {
                      t >>>= 0;
                      const l = (/* @__PURE__ */ new Date()).getTime();
                      f(t + 8, l / 1e3), this.mem.setInt32(t + 16, l % 1e3 * 1e6, !0);
                    },
                    // func scheduleTimeoutEvent(delay int64) int32
                    "runtime.scheduleTimeoutEvent": (t) => {
                      t >>>= 0;
                      const l = this._nextCallbackTimeoutID;
                      this._nextCallbackTimeoutID++, this._scheduledTimeouts.set(l, setTimeout(
                        () => {
                          for (this._resume(); this._scheduledTimeouts.has(l); )
                            console.warn("scheduleTimeoutEvent: missed timeout event"), this._resume();
                        },
                        s(t + 8)
                      )), this.mem.setInt32(t + 16, l, !0);
                    },
                    // func clearTimeoutEvent(id int32)
                    "runtime.clearTimeoutEvent": (t) => {
                      t >>>= 0;
                      const l = this.mem.getInt32(t + 8, !0);
                      clearTimeout(this._scheduledTimeouts.get(l)), this._scheduledTimeouts.delete(l);
                    },
                    // func getRandomData(r []byte)
                    "runtime.getRandomData": (t) => {
                      t >>>= 0, crypto.getRandomValues(b(t + 8));
                    },
                    // func finalizeRef(v ref)
                    "syscall/js.finalizeRef": (t) => {
                      t >>>= 0;
                      const l = this.mem.getUint32(t + 8, !0);
                      if (this._goRefCounts[l]--, this._goRefCounts[l] === 0) {
                        const w = this._values[l];
                        this._values[l] = null, this._ids.delete(w), this._idPool.push(l);
                      }
                    },
                    // func stringVal(value string) ref
                    "syscall/js.stringVal": (t) => {
                      t >>>= 0, d(t + 24, a(t + 8));
                    },
                    // func valueGet(v ref, p string) ref
                    "syscall/js.valueGet": (t) => {
                      t >>>= 0;
                      const l = Reflect.get(o(t + 8), a(t + 16));
                      t = this._inst.exports.getsp() >>> 0, d(t + 32, l);
                    },
                    // func valueSet(v ref, p string, x ref)
                    "syscall/js.valueSet": (t) => {
                      t >>>= 0, Reflect.set(o(t + 8), a(t + 16), o(t + 32));
                    },
                    // func valueDelete(v ref, p string)
                    "syscall/js.valueDelete": (t) => {
                      t >>>= 0, Reflect.deleteProperty(o(t + 8), a(t + 16));
                    },
                    // func valueIndex(v ref, i int) ref
                    "syscall/js.valueIndex": (t) => {
                      t >>>= 0, d(t + 24, Reflect.get(o(t + 8), s(t + 16)));
                    },
                    // valueSetIndex(v ref, i int, x ref)
                    "syscall/js.valueSetIndex": (t) => {
                      t >>>= 0, Reflect.set(o(t + 8), s(t + 16), o(t + 24));
                    },
                    // func valueCall(v ref, m string, args []ref) (ref, bool)
                    "syscall/js.valueCall": (t) => {
                      t >>>= 0;
                      try {
                        const l = o(t + 8), w = Reflect.get(l, a(t + 16)), v = x(t + 32), T = Reflect.apply(w, l, v);
                        t = this._inst.exports.getsp() >>> 0, d(t + 56, T), this.mem.setUint8(t + 64, 1);
                      } catch (l) {
                        t = this._inst.exports.getsp() >>> 0, d(t + 56, l), this.mem.setUint8(t + 64, 0);
                      }
                    },
                    // func valueInvoke(v ref, args []ref) (ref, bool)
                    "syscall/js.valueInvoke": (t) => {
                      t >>>= 0;
                      try {
                        const l = o(t + 8), w = x(t + 16), v = Reflect.apply(l, void 0, w);
                        t = this._inst.exports.getsp() >>> 0, d(t + 40, v), this.mem.setUint8(t + 48, 1);
                      } catch (l) {
                        t = this._inst.exports.getsp() >>> 0, d(t + 40, l), this.mem.setUint8(t + 48, 0);
                      }
                    },
                    // func valueNew(v ref, args []ref) (ref, bool)
                    "syscall/js.valueNew": (t) => {
                      t >>>= 0;
                      try {
                        const l = o(t + 8), w = x(t + 16), v = Reflect.construct(l, w);
                        t = this._inst.exports.getsp() >>> 0, d(t + 40, v), this.mem.setUint8(t + 48, 1);
                      } catch (l) {
                        t = this._inst.exports.getsp() >>> 0, d(t + 40, l), this.mem.setUint8(t + 48, 0);
                      }
                    },
                    // func valueLength(v ref) int
                    "syscall/js.valueLength": (t) => {
                      t >>>= 0, f(t + 16, parseInt(o(t + 8).length));
                    },
                    // valuePrepareString(v ref) (ref, int)
                    "syscall/js.valuePrepareString": (t) => {
                      t >>>= 0;
                      const l = E.encode(String(o(t + 8)));
                      d(t + 16, l), f(t + 24, l.length);
                    },
                    // valueLoadString(v ref, b []byte)
                    "syscall/js.valueLoadString": (t) => {
                      t >>>= 0;
                      const l = o(t + 8);
                      b(t + 16).set(l);
                    },
                    // func valueInstanceOf(v ref, t ref) bool
                    "syscall/js.valueInstanceOf": (t) => {
                      t >>>= 0, this.mem.setUint8(t + 24, o(t + 8) instanceof o(t + 16) ? 1 : 0);
                    },
                    // func copyBytesToGo(dst []byte, src ref) (int, bool)
                    "syscall/js.copyBytesToGo": (t) => {
                      t >>>= 0;
                      const l = b(t + 8), w = o(t + 32);
                      if (!(w instanceof Uint8Array || w instanceof Uint8ClampedArray)) {
                        this.mem.setUint8(t + 48, 0);
                        return;
                      }
                      const v = w.subarray(0, l.length);
                      l.set(v), f(t + 40, v.length), this.mem.setUint8(t + 48, 1);
                    },
                    // func copyBytesToJS(dst ref, src []byte) (int, bool)
                    "syscall/js.copyBytesToJS": (t) => {
                      t >>>= 0;
                      const l = o(t + 8), w = b(t + 16);
                      if (!(l instanceof Uint8Array || l instanceof Uint8ClampedArray)) {
                        this.mem.setUint8(t + 48, 0);
                        return;
                      }
                      const v = w.subarray(0, l.length);
                      l.set(v), f(t + 40, v.length), this.mem.setUint8(t + 48, 1);
                    },
                    debug: (t) => {
                      console.log(t);
                    }
                  }
                };
              }
              run(f) {
                return M(this, null, function* () {
                  if (!(f instanceof WebAssembly.Instance))
                    throw new Error("Go.run: WebAssembly.Instance expected");
                  this._inst = f, this.mem = new DataView(this._inst.exports.mem.buffer), this._values = [
                    // JS values that Go currently has references to, indexed by reference id
                    NaN,
                    0,
                    null,
                    !0,
                    !1,
                    $,
                    this
                  ], this._goRefCounts = new Array(this._values.length).fill(1 / 0), this._ids = /* @__PURE__ */ new Map([
                    // mapping from JS values to reference ids
                    [0, 1],
                    [null, 2],
                    [!0, 3],
                    [!1, 4],
                    [$, 5],
                    [this, 6]
                  ]), this._idPool = [], this.exited = !1;
                  let s = 4096;
                  const o = (t) => {
                    const l = s, w = E.encode(t + "\0");
                    return new Uint8Array(this.mem.buffer, s, w.length).set(w), s += w.length, s % 8 !== 0 && (s += 8 - s % 8), l;
                  }, d = this.argv.length, b = [];
                  this.argv.forEach((t) => {
                    b.push(o(t));
                  }), b.push(0), Object.keys(this.env).sort().forEach((t) => {
                    b.push(o(`${t}=${this.env[t]}`));
                  }), b.push(0);
                  const a = s;
                  if (b.forEach((t) => {
                    this.mem.setUint32(s, t, !0), this.mem.setUint32(s + 4, 0, !0), s += 8;
                  }), s >= 12288)
                    throw new Error("total length of command line and environment variables exceeds limit");
                  this._inst.exports.run(d, a), this.exited && this._resolveExitPromise(), yield this._exitPromise;
                });
              }
              _resume() {
                if (this.exited)
                  throw new Error("Go program has already exited");
                this._inst.exports.resume(), this.exited && this._resolveExitPromise();
              }
              _makeFuncWrapper(f) {
                const s = this;
                return function() {
                  const o = { id: f, this: this, args: arguments };
                  return s._pendingEvent = o, s._resume(), o.result;
                };
              }
            };
          })(), F = ({ data: S }) => {
            let E = new TextDecoder(), p = $.fs, f = "";
            p.writeSync = (x, a) => {
              if (x === 1)
                U(a);
              else if (x === 2) {
                f += E.decode(a);
                let m = f.split(`
`);
                m.length > 1 && console.log(m.slice(0, -1).join(`
`)), f = m[m.length - 1];
              } else
                throw new Error("Bad write");
              return a.length;
            };
            let s = [], o, d = 0;
            F = ({ data: x }) => (x.length > 0 && (s.push(x), o && o()), b), p.read = (x, a, m, t, l, w) => {
              if (x !== 0 || m !== 0 || t !== a.length || l !== null)
                throw new Error("Bad read");
              if (s.length === 0) {
                o = () => p.read(x, a, m, t, l, w);
                return;
              }
              let v = s[0], T = Math.max(0, Math.min(t, v.length - d));
              a.set(v.subarray(d, d + T), m), d += T, d === v.length && (s.shift(), d = 0), w(null, T);
            };
            let b = new $.Go();
            return b.argv = ["", "--service=0.24.0"], z(S, b).then(
              (x) => {
                U(null), b.run(x);
              },
              (x) => {
                U(x);
              }
            ), b;
          };
          function z(S, E) {
            return M(this, null, function* () {
              if (S instanceof WebAssembly.Module)
                return WebAssembly.instantiate(S, E.importObject);
              const p = yield fetch(S);
              if (!p.ok) throw new Error(`Failed to download ${JSON.stringify(S)}`);
              if ("instantiateStreaming" in WebAssembly && /^application\/wasm($|;)/i.test(p.headers.get("Content-Type") || ""))
                return (yield WebAssembly.instantiateStreaming(p, E.importObject)).instance;
              const f = yield p.arrayBuffer();
              return (yield WebAssembly.instantiate(f, E.importObject)).instance;
            });
          }
          return (S) => F(S);
        })((U) => c.onmessage({ data: U })), L;
        c = {
          onmessage: null,
          postMessage: (U) => setTimeout(() => {
            try {
              L = P({ data: U });
            } catch (M) {
              g(M);
            }
          }),
          terminate() {
            if (L)
              for (let U of L._scheduledTimeouts.values())
                clearTimeout(U);
          }
        };
      }
      let h, _;
      const u = new Promise((P, L) => {
        h = P, _ = L;
      });
      c.onmessage = ({ data: P }) => {
        c.onmessage = ({ data: L }) => R(L), P ? _(P) : h();
      }, c.postMessage(n || new URL(e, location.href).toString());
      let { readFromStdout: R, service: A } = it({
        writeToStdin(P) {
          c.postMessage(P);
        },
        isSync: !1,
        hasFS: !1,
        esbuild: we
      });
      yield u, Ee = () => {
        c.terminate(), ue = void 0, Ee = void 0, Se = void 0;
      }, Se = {
        build: (P) => new Promise((L, U) => {
          y.then(U), A.buildOrContext({
            callName: "build",
            refs: null,
            options: P,
            isTTY: !1,
            defaultWD: "/",
            callback: (M, F) => M ? U(M) : L(F)
          });
        }),
        context: (P) => new Promise((L, U) => {
          y.then(U), A.buildOrContext({
            callName: "context",
            refs: null,
            options: P,
            isTTY: !1,
            defaultWD: "/",
            callback: (M, F) => M ? U(M) : L(F)
          });
        }),
        transform: (P, L) => new Promise((U, M) => {
          y.then(M), A.transform({
            callName: "transform",
            refs: null,
            input: P,
            options: L || {},
            isTTY: !1,
            fs: {
              readFile(F, $) {
                $(new Error("Internal error"), null);
              },
              writeFile(F, $) {
                $(null);
              }
            },
            callback: (F, $) => F ? M(F) : U($)
          });
        }),
        formatMessages: (P, L) => new Promise((U, M) => {
          y.then(M), A.formatMessages({
            callName: "formatMessages",
            refs: null,
            messages: P,
            options: L,
            callback: (F, $) => F ? M(F) : U($)
          });
        }),
        analyzeMetafile: (P, L) => new Promise((U, M) => {
          y.then(M), A.analyzeMetafile({
            callName: "analyzeMetafile",
            refs: null,
            metafile: typeof P == "string" ? P : JSON.stringify(P),
            options: L,
            callback: (F, $) => F ? M(F) : U($)
          });
        })
      };
    }), _t = we;
  })(ie);
})(Ge);
var qe = Ge.exports;
let Pe = !1;
async function Pt() {
  Pe || (await qe.initialize({
    wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
    // Use the CDN for the WASM file
    worker: !0
    // Optional: Use Web Workers for better performance
  }), Pe = !0);
}
async function $t(ie) {
  if (!Pe)
    throw new Error("Esbuild is not initialized. Call `initializeEsbuild` first.");
  return (await qe.transform(ie, {
    loader: "tsx",
    // Or 'ts' if no JSX
    target: "es2015"
  })).code;
}
const Ot = async (ie) => {
  if (!ie)
    return "";
  try {
    const ne = await $t(ie);
    return jt(ne);
  } catch (ne) {
    ne instanceof Error ? console.error("Transpilation failed:", ne.message) : console.log("Transpilation failed:", ne);
  }
}, jt = async (ie) => {
  const ne = new Blob([ie], { type: "application/javascript" }), oe = URL.createObjectURL(ne), ye = [], Te = console.log;
  console.log = (ee) => ye.push(ee);
  try {
    await import(oe);
  } catch (ee) {
    return ee instanceof Error ? (console.log(ee.message), ee == null ? void 0 : ee.message) : (console.log(ee), ee);
  }
  return console.log = Te, URL.revokeObjectURL(oe), ye.join(`
`);
};
export {
  Pt as initializeEsbuild,
  jt as runCode,
  Ot as transpileAndRun,
  $t as transpileCode
};
