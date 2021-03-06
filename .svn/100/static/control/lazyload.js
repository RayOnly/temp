(function(a) {
    if (window["define"] == undefined) {
        var b = {},
        c = b.exports = {};
        a(null, c, b),
        window.lazyload = b.exports;
    } else{
        define("control/lazyload", ["zepto"], a);
    }
})(function(a, b, c) {
    var d = a ? a("zepto") : window.$,
    e = {
        init: function(a) {
            var b = this;
            b.img.init()
        },
        img: {
            trigger: function() {
                var a = this,
                b = a.op;
                isPhone = a.isPhone,
                eventType = isPhone && "touchend" || "scroll",
                a.prevlist && a.prevlist.each(function(a, b) {
                    b && (b.onerror = b.onload = null)
                }),
                a.imglist = d("img.lazy"),
                a.prevlist = d(a.imglist.concat()),
                d(window).trigger(eventType)
            },
            init: function() {
                var a = this,
                b = 5,
                c = 200,
                e = navigator.appVersion.match(/(iPhone\sOS)\s([\d_]+)/),
                f = e && !0 || !1,
                g = f && e[2].split("_");
                g = g && parseFloat(g.length > 1 ? g.splice(0, 2).join(".") : g[0], 10),
                f = a.isPhone = f && g < 6;
                if (f) {
                    var h, i;
                    d(window).on("touchstart",
                    function(a) {
                        h = {
                            sy: window.scrollY,
                            time: Date.now()
                        },
                        i && clearTimeout(i)
                    }).on("touchend",
                    function(d) {
                        if (d && d.changedTouches) {
                            var e = Math.abs(window.scrollY - h.sy);
                            if (e > b) {
                                var f = Date.now() - h.time;
                                i = setTimeout(function() {
                                    a.changeimg(),
                                    h = {},
                                    clearTimeout(i),
                                    i = null
                                },
                                f > c ? 0 : 200)
                            }
                        } else a.changeimg()
                    }).on("touchcancel",
                    function() {
                        i && clearTimeout(i),
                        h = {}
                    })
                } else d(window).on("scroll",
                function() {
                    a.changeimg()
                });
                a.trigger(),
                a.isload = !0
            },
            changeimg: function() {
                function b(a) {
                    var b = window.pageYOffset,
                    c = window.pageYOffset + window.innerHeight,
                    d = a.offset().top;
                    return d >= b && d - 400 <= c
                }
                function c(b, c) {
                    var e = b.attr("dataimg");
                    b.attr("src", e),
                    b[0].onload || (b[0].onload = function() {
                        d(this).removeClass("lazy").removeAttr("dataimg"),
                        a.imglist[c] = null,
                        this.onerror = this.onload = null
                    },
                    b[0].onerror = function() {
                        this.src = "http://a.tbcdn.cn/mw/s/common/icons/nopic/no-90.png",
                        d(this).removeClass("lazy").removeAttr("dataimg"),
                        a.imglist[c] = null,
                        this.onerror = this.onload = null
                    })
                }
                var a = this;
                a.imglist.each(function(a, e) {
                    if (!e) return;
                    var f = d(e);
                    if (!b(f)) return;
                    if (!f.attr("dataimg")) return;
                    c(f, a)
                })
            }
        }
    };
    c.exports = e
});