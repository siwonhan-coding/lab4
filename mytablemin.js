/*!
 * tablesort v1.6.3 (2014-01-16)
 * http://tristen.ca/tablesort/demo
 * Copyright (c) 2014 ; Licensed MIT
 */
(function () {
  function e(e, t) {
    if (e.tagName !== "TABLE") throw new Error("Element must be a table");
    this.init(e, t || {});
  }
  e.prototype = {
    init: function (e, t) {
      var n = this,
        r;
      (this.thead = !1),
        (this.options = t),
        (this.options.d = t.descending || !1),
        e.rows &&
          e.rows.length > 0 &&
          (e.tHead && e.tHead.rows.length > 0
            ? ((r = e.tHead.rows[e.tHead.rows.length - 1]), (n.thead = !0))
            : (r = e.rows[0]));
      if (!r) return;
      var i = function (e) {
        var t = o(u, "tr").getElementsByTagName("th");
        for (var r = 0; r < t.length; r++)
          (c(t[r], "sort-up") || c(t[r], "sort-down")) &&
            t[r] !== this &&
            (t[r].className = t[r].className
              .replace(" sort-down", "")
              .replace(" sort-up", ""));
        (n.current = this), n.sortTable(this);
      };
      for (var s = 0; s < r.cells.length; s++) {
        var u = r.cells[s];
        c(u, "no-sort") || ((u.className += " sort-header"), h(u, "click", i));
      }
    },
    getFirstDataRowIndex: function () {
      return this.thead ? 0 : 1;
    },
    sortTable: function (e, t) {
      var n = this,
        r = e.cellIndex,
        h,
        p = o(e, "table"),
        d = "",
        v = n.getFirstDataRowIndex();
      if (p.rows.length <= 1) return;
      while (d === "" && v < p.tBodies[0].rows.length) {
        (d = u(p.tBodies[0].rows[v].cells[r])), (d = f(d));
        if (d.substr(0, 4) === "<!--" || d.length === 0) d = "";
        v++;
      }
      if (d === "") return;
      var m = function (e, t) {
          var r = u(e.cells[n.col]).toLowerCase(),
            i = u(t.cells[n.col]).toLowerCase();
          return r === i ? 0 : r < i ? 1 : -1;
        },
        g = function (e, t) {
          var r = u(e.cells[n.col]),
            i = u(t.cells[n.col]);
          return (r = l(r)), (i = l(i)), a(i, r);
        },
        y = function (e, t) {
          var r = u(e.cells[n.col]).toLowerCase(),
            i = u(t.cells[n.col]).toLowerCase();
          return s(i) - s(r);
        };
      d.match(/^-?[£\x24Û¢´€] ?\d/) ||
      d.match(/^-?\d+\s*[€]/) ||
      d.match(/^-?(\d+[,\.]?)+(E[\-+][\d]+)?%?$/)
        ? (h = g)
        : i(d)
        ? (h = y)
        : (h = m),
        (this.col = r);
      var b = [],
        w = {},
        E,
        S = 0;
      for (v = 0; v < p.tBodies.length; v++)
        for (E = 0; E < p.tBodies[v].rows.length; E++) {
          var x = p.tBodies[v].rows[E];
          c(x, "no-sort") ? (w[S] = x) : b.push(x), S++;
        }
      b.sort(h),
        t ||
          (n.options.d
            ? c(e, "sort-up")
              ? ((e.className = e.className.replace(/ sort-up/, "")),
                (e.className += " sort-down"))
              : ((e.className = e.className.replace(/ sort-down/, "")),
                (e.className += " sort-up"))
            : c(e, "sort-down")
            ? ((e.className = e.className.replace(/ sort-down/, "")),
              (e.className += " sort-up"))
            : ((e.className = e.className.replace(/ sort-up/, "")),
              (e.className += " sort-down"))),
        c(e, "sort-down") && b.reverse();
      var T = 0;
      for (v = 0; v < S; v++) {
        var N;
        w[v] ? ((N = w[v]), T++) : (N = b[v - T]), p.tBodies[0].appendChild(N);
      }
    },
    refresh: function () {
      this.current !== undefined && this.sortTable(this.current, !0);
    },
  };
  var t = /(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\.?\,?\s*/i,
    n = /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/,
    r = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i,
    i = function (e) {
      return (
        (e.search(t) !== -1 || e.search(n) !== -1 || e.search(r !== -1)) !==
          -1 && !isNaN(s(e))
      );
    },
    s = function (e) {
      return (
        (e = e.replace(/\-/g, "/")),
        (e = e.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3")),
        new Date(e).getTime()
      );
    },
    o = function (e, t) {
      return e === null
        ? null
        : e.nodeType === 1 && e.tagName.toLowerCase() === t.toLowerCase()
        ? e
        : o(e.parentNode, t);
    },
    u = function (e) {
      var t = this;
      if (typeof e == "string" || typeof e == "undefined") return e;
      var n = e.getAttribute("data-sort") || "";
      if (n) return n;
      if (e.textContent) return e.textContent;
      if (e.innerText) return e.innerText;
      var r = e.childNodes,
        i = r.length;
      for (var s = 0; s < i; s++)
        switch (r[s].nodeType) {
          case 1:
            n += t.getInnerText(r[s]);
            break;
          case 3:
            n += r[s].nodeValue;
        }
      return n;
    },
    a = function (e, t) {
      var n = parseFloat(e),
        r = parseFloat(t);
      return (e = isNaN(n) ? 0 : n), (t = isNaN(r) ? 0 : r), e - t;
    },
    f = function (e) {
      return e.replace(/^\s+|\s+$/g, "");
    },
    l = function (e) {
      return e.replace(/[^\-?0-9.]/g, "");
    },
    c = function (e, t) {
      return (" " + e.className + " ").indexOf(" " + t + " ") > -1;
    },
    h = function (e, t, n) {
      e.attachEvent
        ? ((e["e" + t + n] = n),
          (e[t + n] = function () {
            e["e" + t + n](window.event);
          }),
          e.attachEvent("on" + t, e[t + n]))
        : e.addEventListener(t, n, !1);
    };
  typeof module != "undefined" && module.exports
    ? (module.exports = e)
    : (window.Tablesort = e);
})();
