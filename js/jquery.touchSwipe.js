(function(h) {
    function da(i) {
        if (i && i.allowPageScroll === undefined && (i.swipe !== undefined || i.swipeStatus !== undefined)) i.allowPageScroll = P;
        i || (i = {});
        i = h.extend({}, h.fn.swipe.defaults, i);
        return this.each(function() {
            var b = h(this),
                l = b.data(x);
            if (!l) {
                l = new ea(this, i);
                b.data(x, l)
            }
        })
    }

    function ea(i, b) {
        function l(a) {
            if (!(g.data(x + "_intouch") === true ? true : false))
                if (!(h(a.target).closest(b.excludedElements, g).length > 0)) {
                    var d = a;
                    a = a.originalEvent;
                    var c, t = n ? a.touches[0] : d;
                    f = X;
                    if (n) j = a.touches.length;
                    else d.preventDefault();
                    m = 0;
                    u = o = null;
                    p = w = k = 0;
                    v = 1;
                    d = [];
                    for (var q = 0; q <= 5; q++) d.push({
                        start: {
                            x: 0,
                            y: 0
                        },
                        end: {
                            x: 0,
                            y: 0
                        },
                        delta: {
                            x: 0,
                            y: 0
                        }
                    });
                    e = d;
                    if (!n || j === b.fingers || b.fingers === D || z()) {
                        e[0].start.x = e[0].end.x = t.pageX;
                        e[0].start.y = e[0].end.y = t.pageY;
                        E = (new Date).getTime();
                        if (j == 2) {
                            e[1].start.x = e[1].end.x = a.touches[1].pageX;
                            e[1].start.y = e[1].end.y = a.touches[1].pageY;
                            w = p = F(e[0].start, e[1].start)
                        }
                        if (b.swipeStatus || b.pinchStatus) c = r(a, f)
                    } else {
                        A(a);
                        c = false
                    }
                    if (c === false) {
                        f = s;
                        r(a, f);
                        return c
                    } else {
                        G(true);
                        h(document).bind(Q, R);
                        h(document).bind(S, T)
                    }
                }
        }

        function R(a) {
            var d = a;
            a = a.originalEvent;
            if (!(f === y || f === s)) {
                var c, t = n ? a.touches[0] : d;
                e[0].end.x = n ? a.touches[0].pageX : t.pageX;
                e[0].end.y = n ? a.touches[0].pageY : t.pageY;
                B = (new Date).getTime();
                o = Y(e[0].start, e[0].end);
                if (n) j = a.touches.length;
                f = H;
                if (j == 2) {
                    if (w == 0) {
                        e[1].start.x = a.touches[1].pageX;
                        e[1].start.y = a.touches[1].pageY;
                        w = p = F(e[0].start, e[1].start)
                    } else {
                        e[1].end.x = a.touches[1].pageX;
                        e[1].end.y = a.touches[1].pageY;
                        p = F(e[0].end, e[1].end);
                        u = v < 1 ? I : J
                    }
                    v = (p / w * 1).toFixed(2)
                }
                if (j === b.fingers || b.fingers === D || !n) {
                    t = o;
                    if (b.allowPageScroll === P || z()) d.preventDefault();
                    else {
                        var q = b.allowPageScroll === Z;
                        switch (t) {
                            case C:
                                if (b.swipeLeft && q || !q && b.allowPageScroll != U) d.preventDefault();
                                break;
                            case K:
                                if (b.swipeRight && q || !q && b.allowPageScroll != U) d.preventDefault();
                                break;
                            case L:
                                if (b.swipeUp && q || !q && b.allowPageScroll != V) d.preventDefault();
                                break;
                            case M:
                                if (b.swipeDown && q || !q && b.allowPageScroll != V) d.preventDefault()
                        }
                    }
                    m = $(e[0].start, e[0].end);
                    k = B - E;
                    if (b.swipeStatus || b.pinchStatus) c = r(a, f);
                    if (!b.triggerOnTouchEnd) {
                        d = !aa();
                        if (ba() === true) {
                            f = y;
                            c = r(a, f)
                        } else if (d) {
                            f = s;
                            r(a, f)
                        }
                    }
                } else {
                    f = s;
                    r(a, f)
                }
                if (c === false) {
                    f = s;
                    r(a, f)
                }
            }
        }

        function T(a) {
            var d = a;
            a = a.originalEvent;
            if (a.touches && a.touches.length > 0) return true;
            d.preventDefault();
            B = (new Date).getTime();
            if (w != 0) {
                p = F(e[0].end, e[1].end);
                v = (p / w * 1).toFixed(2);
                u = v < 1 ? I : J
            }
            m = $(e[0].start, e[0].end);
            o = Y(e[0].start, e[0].end);
            k = B - E;
            if (b.triggerOnTouchEnd || b.triggerOnTouchEnd === false && f === H) {
                f = y;
                d = u && z() || !z();
                var c = e[0].end.x !== 0;
                if ((j === b.fingers || b.fingers === D || !n) && c && d) {
                    d = aa();
                    c = ba();
                    if ((c === true || c === null) && d) r(a, f);
                    else if (!d || c === false) {
                        f = s;
                        r(a, f)
                    }
                } else {
                    f = s;
                    r(a, f)
                }
            } else if (f === H) {
                f = s;
                r(a, f)
            }
            h(document).unbind(Q, R, false);
            h(document).unbind(S, T, false);
            G(false)
        }

        function A() {
            p = w = E = B = j = 0;
            v = 1;
            G(false)
        }

        function r(a, d) {
            var c = undefined;
            if (b.swipeStatus) c = b.swipeStatus.call(g, a, d, o || null, m || 0, k || 0, j);
            if (b.pinchStatus && u && z()) c = b.pinchStatus.call(g, a, d, u || null, p || 0, k || 0, j, v);
            if (d === s)
                if (b.click && (j === 1 || !n) && (isNaN(m) || m === 0)) c = b.click.call(g, a, a.target);
            if (d == y) {
                if (b.swipe) c = b.swipe.call(g, a, o, m, k, j);
                switch (o) {
                    case C:
                        if (b.swipeLeft) c = b.swipeLeft.call(g, a, o, m, k, j);
                        break;
                    case K:
                        if (b.swipeRight) c = b.swipeRight.call(g, a, o, m, k, j);
                        break;
                    case L:
                        if (b.swipeUp) c = b.swipeUp.call(g, a, o, m, k, j);
                        break;
                    case M:
                        if (b.swipeDown) c = b.swipeDown.call(g, a, o, m, k, j)
                }
                switch (u) {
                    case J:
                        if (b.pinchIn) c = b.pinchIn.call(g, a, u || null, p || 0, k || 0, j, v);
                        break;
                    case I:
                        if (b.pinchOut) c = b.pinchOut.call(g, a, u || null, p || 0, k || 0, j, v)
                }
            }
            if (d === s || d === y) A(a);
            return c
        }

        function ba() {
            if (b.threshold !== null) return m >= b.threshold;
            return null
        }

        function aa() {
            return b.maxTimeThreshold ? k >= b.maxTimeThreshold ? false : true : true
        }

        function F(a, d) {
            var c = Math.abs(a.x - d.x),
                t = Math.abs(a.y - d.y);
            return Math.round(Math.sqrt(c * c + t * t))
        }

        function $(a, d) {
            return Math.round(Math.sqrt(Math.pow(d.x - a.x, 2) + Math.pow(d.y - a.y, 2)))
        }

        function Y(a, d) {
            var c;
            c = Math.round(Math.atan2(d.y - a.y, a.x - d.x) * 180 / Math.PI);
            if (c < 0) c = 360 - Math.abs(c);
            c = c;
            return c <= 45 && c >= 0 ? C : c <= 360 && c >= 315 ? C : c >= 135 && c <= 225 ? K : c > 45 && c < 135 ? M : L
        }

        function ca() {
            g.unbind(N, l);
            g.unbind(O, A);
            h(document).unbind(Q, R);
            h(document).unbind(S, T);
            G(false)
        }

        function z() {
            return b.pinchStatus || b.pinchIn || b.pinchOut
        }

        function G(a) {
            a = a === true ? true : false;
            g.data(x + "_intouch", a)
        }
        var W = n || !b.fallbackToMouseEvents,
            N = W ? "touchstart" : "mousedown",
            Q = W ? "touchmove" : "mousemove",
            S = W ? "touchend" : "mouseup",
            O = "touchcancel",
            m = 0,
            o = null,
            k = 0,
            w = 0,
            p = 0,
            v = 1,
            u = 0,
            g = h(i),
            f = "start",
            j = 0,
            e = null,
            E = 0,
            B = 0;
        try {
            g.bind(N, l);
            g.bind(O, A)
        } catch (fa) {
            h.error("events not supported " + N + "," + O + " on jQuery.swipe")
        }
        this.enable = function() {
            g.bind(N, l);
            g.bind(O, A);
            return g
        };
        this.disable = function() {
            ca();
            return g
        };
        this.destroy = function() {
            ca();
            g.data(x, null);
            return g
        }
    }
    var C = "left",
        K = "right",
        L = "up",
        M = "down",
        J = "in",
        I = "out",
        P = "none",
        Z = "auto",
        U = "horizontal",
        V = "vertical",
        D = "all",
        X = "start",
        H = "move",
        y = "end",
        s = "cancel",
        n = "ontouchstart" in window,
        x = "TouchSwipe";
    h.fn.swipe = function(i) {
        var b = h(this),
            l = b.data(x);
        if (l && typeof i === "string")
            if (l[i]) return l[i].apply(this, Array.prototype.slice.call(arguments, 1));
            else h.error("Method " + i + " does not exist on jQuery.swipe");
        else if (!l && (typeof i === "object" || !i)) return da.apply(this, arguments);
        return b
    };
    h.fn.swipe.defaults = {
        fingers: 1,
        threshold: 75,
        maxTimeThreshold: null,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        triggerOnTouchEnd: true,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "button, input, select, textarea, a, .noSwipe"
    };
    h.fn.swipe.phases = {
        PHASE_START: X,
        PHASE_MOVE: H,
        PHASE_END: y,
        PHASE_CANCEL: s
    };
    h.fn.swipe.directions = {
        LEFT: C,
        RIGHT: K,
        UP: L,
        DOWN: M,
        IN: J,
        OUT: I
    };
    h.fn.swipe.pageScroll = {
        NONE: P,
        HORIZONTAL: U,
        VERTICAL: V,
        AUTO: Z
    };
    h.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: D
    }
})(jQuery);
