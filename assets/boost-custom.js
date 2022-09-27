var boost;
(function(b) {
    b(document).ready(function() {
        boost.init()
    });
    b(window).resize(function() {
        boost.initMobileMenu()
    });
    b(window).scroll(function() {
        200 < b(this).scrollTop() ? b("#back-top").fadeIn() : b("#back-top").fadeOut()
    });
    b(document).on("click touchstart", function(d) {
        var g = b(".quick-view"),
            e = b("#dropdown-cart"),
            f = b("#cartToggle"),
            c = b("#email-modal .modal-window");
        g.is(d.target) || 0 !== g.has(d.target).length || e.is(d.target) || 0 !== e.has(d.target).length || f.is(d.target) || 0 !== f.has(d.target).length || c.is(d.target) || 0 !==
            c.has(d.target).length || (boost.closeQuickViewPopup(), boost.closeDropdownCart(), boost.closeEmailModalWindow())
    });
    b(document).keyup(function(d) {
        27 == d.keyCode && (boost.closeQuickViewPopup(), boost.closeDropdownCart(), clearTimeout(boost.avenuesTimeout), b(".modal").is(":visible") && b(".modal").fadeOut(500))
    });
    boost = {
        avenuesTimeout: null,
        init: function() {
            this.initScrollTop();
            this.initMobileMenu();
            this.initQuickView();
            this.initCloudzoom();
            this.initInfiniteScrolling();
            this.initProductMoreview();
            this.initAddToCart();
            this.initModal();
            this.initProductAddToCart();
            this.initDropDownCart();
            this.initToggleCollectionPanel();
            this.initResizeImage();
            this.initWishlist();
            this.initProductWishlist();
            this.initRemoveWishlist()
        },
        initMobileMenu: function() {
            b(".menu-block").is(":visible") ? (b(".gf-menu-device-container ul.gf-menu li.dropdown").each(function() {
                    0 == b(this).find("> p.toogleClick").length && b(this).prepend('<p class="toogleClick">+</p>')
                }), 0 == b(".menu-block").children().hasClass("gf-menu-device-wrapper") && b(".menu-block").children().addClass("gf-menu-device-wrapper"),
                0 == b(".gf-menu-device-container").find("ul.gf-menu").size() && (b(".gf-menu-device-container").append(b(".nav-bar .container").html()), b(".gf-menu-device-container .site-nav").addClass("gf-menu"), b(".gf-menu-device-container .site-nav").removeClass("nav")), b("p.toogleClick").click(function() {
                    b(this).hasClass("mobile-toggle-open") ? (b(this).next().next().hide(), b(this).removeClass("mobile-toggle-open")) : (b(this).next().next().show(), b(this).addClass("mobile-toggle-open"))
                }), b("p.toogleClick").show(),
                b("div.gf-menu-toggle").hide(), b(".nav-bar .container").hide(), 0 == b("ul.gf-menu").hasClass("clicked") && (b(".gf-menu").hide(), b(".gf-menu li.dropdown ul.site-nav-dropdown").hide()), b(".col-1 .inner ul.dropdown").parent().each(function() {
                    0 == b(this).find("> p.toogleClick").length && b(this).prepend('<p class="toogleClick">+</p>')
                }), b(".cbp-spmenu span.icon-dropdown").remove(), b("ul.gf-menu li.dropdown").each(function() {
                    0 == b(this).find("> p.toogleClick").length && b(this).prepend('<p class="toogleClick">+</p>')
                }),
                b("p.toogleClick").click(function() {
                    b(this).hasClass("mobile-toggle-open") ? (b(this).next().next().hide(), b(this).removeClass("mobile-toggle-open")) : (b(this).next().next().show(), b(this).addClass("mobile-toggle-open"))
                })) : (b(".nav-bar .container").show(), b(".gf-menu").hide());
            0 == b(".menu-block").children().hasClass("gf-menu-device-wrapper") && b(".menu-block").children().addClass("resized")
        },
        initWishlist: function() {
            b(".grid-item button.wishlist").click(function(d) {
                d.preventDefault();
                var g = b(this).parent(),
                    e = g.parents(".grid-item");
                b.ajax({
                    type: "POST",
                    url: "/contact",
                    data: g.serialize(),
                    beforeSend: function() {
                        boost.showLoading()
                    },
                    success: function(d) {
                        boost.hideLoading();
                        g.html('<a class="wishlist" href="/pages/wish-list" title="Go to wishlist"><span class="icon"></span><span>Go to wishlist</span></a>');
                        d = e.find(".product-title").text();
                        var c = e.find("a > img").attr("src");
                        b(".ajax-success-modal").find(".ajax-product-title").text(d);
                        b(".ajax-success-modal").find(".ajax-product-image").attr("src", c);
                        b(".ajax-success-modal").find(".btn-go-to-wishlist").show();
                        b(".ajax-success-modal").find(".btn-go-to-cart").hide();
                        boost.showModal(".ajax-success-modal")
                    },
                    error: function(d, c) {
                        boost.hideLoading();
                        b(".loading-modal").hide();
                        b(".ajax-error-message").text(b.parseJSON(d.responseText).description);
                        boost.showModal(".ajax-error-modal")
                    }
                })
            })
        },
        initProductWishlist: function() {
            b(".product button.wishlist").click(function(d) {
                d.preventDefault();
                var g = b(this).parent();
                g.parents(".grid-item");
                b.ajax({
                    type: "POST",
                    url: "/contact",
                    data: g.serialize(),
                    beforeSend: function() {
                        boost.showLoading()
                    },
                    success: function(d) {
                        boost.hideLoading();
                        g.html('<a class="wishlist" href="/pages/wish-list" title="Go to wishlist"><span class="icon"></span><span>Go to wishlist</span></a>');
                        d = b(".product-title h2").text();
                        var f = b("#product-featured-image").attr("src");
                        b(".ajax-success-modal").find(".ajax-product-title").text(d);
                        b(".ajax-success-modal").find(".ajax-product-image").attr("src", f);
                        b(".ajax-success-modal").find(".btn-go-to-wishlist").show();
                        b(".ajax-success-modal").find(".btn-go-to-cart").hide();
                        boost.showModal(".ajax-success-modal")
                    },
                    error: function(d, f) {
                        boost.hideLoading();
                        b(".loading-modal").hide();
                        b(".ajax-error-message").text(b.parseJSON(d.responseText).description);
                        boost.showModal(".ajax-error-modal")
                    }
                })
            })
        },
        initRemoveWishlist: function() {
            b(".btn-remove-wishlist").click(function(d) {
                var g = b(this).parents("tr");
                d = g.find(".tag-id").val();
                var e = jQuery("#remove-wishlist-form");
                e.find("input[name='contact[tags]']").val("x" + d);
                b.ajax({
                    type: "POST",
                    url: "/contact",
                    data: e.serialize(),
                    beforeSend: function() {
                        boost.showLoading()
                    },
                    success: function(b) {
                        boost.hideLoading();
                        g.fadeOut(1E3)
                    },
                    error: function(d, c) {
                        boost.hideLoading();
                        b(".loading-modal").hide();
                        b(".ajax-error-message").text(b.parseJSON(d.responseText).description);
                        boost.showModal(".ajax-error-modal")
                    }
                })
            })
        },
        initResizeImage: function() {
            b(".products-grid .product-image img").fakecrop({
                fill: window.images_size.is_crop,
                widthSelector: ".products-grid .grid-item .product-image",
                ratioWrapper: window.images_size
            })
        },
        initInfiniteScrolling: function() {
            0 < b(".infinite-scrolling").length && b(".infinite-scrolling a").click(function(d) {
                d.preventDefault();
                b(this).hasClass("disabled") || boost.doInfiniteScrolling()
            })
        },
        doInfiniteScrolling: function() {
            var d = b(".products-grid");
            d.length || (d = b(".product-list"));
            if (d) {
                var g = b(".infinite-scrolling a").first();
                b.ajax({
                    type: "GET",
                    url: g.attr("href"),
                    beforeSend: function() {
                        boost.showLoading();
                        b(".loading-modal").show()
                    },
                    success: function(e) {
                        boost.hideLoading();
                        var f = b(e).find(".products-grid");
                        f.length || (f = b(e).find(".product-list"));
                        f.length && (f.hasClass("products-grid") && f.children().find("img").fakecrop({
                            fill: window.images_size.is_crop,
                            widthSelector: ".products-grid .grid-item .product-image",
                            ratioWrapper: window.images_size
                        }), d.append(f.children()), boost.initQuickView(), boost.initAddToCart(), boost.initWishlist(), 0 < b(e).find(".infinite-scrolling").length ? g.attr("href", b(e).find(".infinite-scrolling a").attr("href")) : (g.hide(), g.next().show()))
                    },
                    error: function(d, f) {
                        boost.hideLoading();
                        b(".loading-modal").hide();
                        b(".ajax-error-message").text(b.parseJSON(d.responseText).description);
                        boost.showModal(".ajax-error-modal")
                    },
                    dataType: "html"
                })
            }
        },
        closeEmailModalWindow: function() {
            0 <
                b("#email-modal").length && b("#email-modal").is(":visible") && b("#email-modal .modal-window").fadeOut(600, function() {
                    b("#email-modal .modal-overlay").fadeOut(600, function() {
                        b("#email-modal").hide();
                        b.cookie("emailSubcribeModal", "closed", {
                            expires: 1,
                            path: "/"
                        })
                    })
                })
        },
        showModal: function(d) {
            b(d).fadeIn(500);
            boost.avenuesTimeout = setTimeout(function() {
                b(d).fadeOut(500)
            }, 5E3)
        },
        initToggleCollectionPanel: function() {
            0 < b(".collection-sharing-btn").length && b(".collection-sharing-btn").click(function() {
                b(".collection-sharing-panel").toggle();
                b(".collection-sharing-panel").is(":visible") ? (b(".collection-sharing-btn").addClass("btn-hover"), b(".collection-filter-panel").hide(), b(".collection-filter-btn").removeClass("btn-hover")) : b(".collection-sharing-btn").removeClass("btn-hover")
            });
            0 < b(".collection-filter-btn").length && (b(".collection-filter-btn").click(function() {
                b(".collection-filter-panel").toggle();
                b(".collection-filter-panel").is(":visible") ? (b(".collection-filter-btn").addClass("btn-hover"), b(".collection-sharing-panel").hide(),
                    b(".collection-sharing-btn").removeClass("btn-hover")) : b(".collection-filter-btn").removeClass("btn-hover")
            }), b(".collection-filter-panel select").change(function(a) {
                window.location = b(this).find("option:selected").val()
            }))
        },
        checkItemsInDropdownCart: function() {
            0 < b("#dropdown-cart .mini-products-list").children().length ? (b("#dropdown-cart .no-items").hide(), b("#dropdown-cart .has-items").show()) : (b("#dropdown-cart .has-items").hide(), b("#dropdown-cart .no-items").show())
        },
        initModal: function() {
            b(".continue-shopping").click(function() {
                clearTimeout(boost.avenuesTimeout);
                b(".ajax-success-modal").fadeOut(500)
            });
            b(".close-modal, .overlay").click(function() {
                clearTimeout(boost.avenuesTimeout);
                b(".ajax-success-modal").fadeOut(500)
            })
        },
        initDropDownCart: function() {
            "click" == window.dropdowncart_type ? b("#cartToggle").click(function() {
                    b("#dropdown-cart").is(":visible") ? b("#dropdown-cart").slideUp("fast") : b("#dropdown-cart").slideDown("fast")
                }) : "ontouchstart" in document ? b("#cartToggle").click(function() {
                    b("#dropdown-cart").is(":visible") ? b("#dropdown-cart").slideUp("fast") : b("#dropdown-cart").slideDown("fast")
                }) :
                (b("#cartToggle").hover(function() {
                    b("#dropdown-cart").is(":visible") || b("#dropdown-cart").slideDown("fast")
                }), b(".wrapper-top-cart").mouseleave(function() {
                    b("#dropdown-cart").slideUp("fast")
                }));
            boost.checkItemsInDropdownCart();
            b("#dropdown-cart .no-items a").click(function() {
                b("#dropdown-cart").slideUp("fast")
            });
            b("#dropdown-cart .btn-remove").click(function(d) {
                d.preventDefault();
                d = b(this).parents(".item").attr("id");
                d = d.match(/\d+/g);
                Shopify.removeItem(d, function(b) {
                    boost.doUpdateDropdownCart(b)
                })
            })
        },
        closeDropdownCart: function() {
            b("#dropdown-cart").is(":visible") &&
                b("#dropdown-cart").slideUp("fast")
        },
        initProductMoreview: function() {
            0 < b(".more-view-wrapper-owlslider").length ? this.initOwlMoreview() : 0 < b(".more-view-wrapper-jcarousel").length && this.initJcarouselMoreview()
        },
        initOwlMoreview: function() {
            b(".more-view-wrapper-owlslider ul").owlCarousel({
                navigation: !0,
                items: 5,
                itemsDesktop: [1199, 4],
                itemsDesktopSmall: [979, 3],
                itemsTablet: [768, 3],
                itemsTabletSmall: [540, 3],
                itemsMobile: [360, 3]
            }).css("visibility", "visible")
        },
        initJcarouselMoreview: function() {
            b(".more-view-wrapper-jcarousel ul").jcarousel({
                vertical: !0
            }).css("visibility",
                "visible");
            b(".product-img-box").addClass("has-jcarousel");
            var a = b(".product-photo-container").outerHeight();
            b(".more-view-wrapper .jcarousel-clip-vertical").css("height", a - 40 + "px");
            b(".more-view-wrapper").css("visibility", "visible")
        },
        initCloudzoom: function() {
            0 < b("#product-featured-image").length && (b(".visible-phone").is(":visible") ? (b("#product-featured-image").elevateZoom({
                gallery: "more-view-carousel",
                cursor: "pointer",
                galleryActiveClass: "active",
                imageCrossfade: !1,
                scrollZoom: !1,
                onImageSwapComplete: function() {
                    b(".zoomWrapper div").hide()
                },
                loadingIcon: window.loading_url
            }), b("#product-featured-image").bind("click", function(a) {
                return !1
            })) : (b("#product-featured-image").elevateZoom({
                gallery: "more-view-carousel",
                cursor: "pointer",
                galleryActiveClass: "active",
                imageCrossfade: !0,
                scrollZoom: !0,
                onImageSwapComplete: function() {
                    b(".zoomWrapper div").hide()
                },
                loadingIcon: window.loading_url
            }), b("#product-featured-image").bind("click", function(a) {
                a = b("#product-featured-image").data("elevateZoom");
                b.fancybox(boost.getGalleryList());
                return !1
            })))
        },
        initScrollTop: function() {
            b("#back-top").click(function() {
                b("body,html").animate({
                        scrollTop: 0
                    },
                    400);
                return !1
            })
        },
        initProductAddToCart: function() {
            0 < b("#product-add-to-cart").length && b("#product-add-to-cart").click(function(d) {
                d.preventDefault();
                if ("disabled" != b(this).attr("disabled"))
                    if (window.ajax_cart) {
                        (d = b("#add-to-cart-form select[name=id]").val()) || (d = b("#add-to-cart-form input[name=id]").val());
                        var g = b("#add-to-cart-form input[name=quantity]").val();
                        g || (g = 1);
                        var e = b(".product-title h2").text(),
                            f = b("#product-featured-image").attr("src");
                        boost.doAjaxAddToCart(d, g, e, f)
                    } else b(this).closest("form").submit();
                return !1
            })
        },
        initAddToCart: function() {
            0 < b(".add-to-cart-btn").length && b(".add-to-cart-btn").click(function(d) {
                d.preventDefault();
                if ("disabled" != b(this).attr("disabled")) {
                    var g = b(this).parents(".product-item"),
                        e = b(g).attr("id"),
                        e = e.match(/\d+/g);
                    if (window.ajax_cart) {
                        (d = b("#product-actions-" + e + " select[name=id]").val()) || (d = b("#product-actions-" + e + " input[name=id]").val());
                        (e = b("#product-actions-" + e + " input[name=quantity]").val()) || (e = 1);
                        var f = b(g).find(".product-title").text(),
                            g = b(g).find(".product-grid-image img").attr("src");
                        boost.doAjaxAddToCart(d, e, f, g)
                    } else b("#product-actions-" + e).submit()
                }
                return !1
            })
        },
        showLoading: function() {
            b(".loading-modal").show()
        },
        hideLoading: function() {
            b(".loading-modal").hide()
        },
        doAjaxAddToCart: function(d, g, e, f) {
            b.ajax({
                type: "post",
                url: "/cart/add.js",
                data: "quantity=" + g + "&id=" + d,
                dataType: "json",
                beforeSend: function() {
                    boost.showLoading()
                },
                success: function(c) {
                    boost.hideLoading();
                    b(".ajax-success-modal").find(".ajax-product-title").text(e);
                    b(".ajax-success-modal").find(".ajax-product-image").attr("src", f);
                    b(".ajax-success-modal").find(".btn-go-to-wishlist").hide();
                    b(".ajax-success-modal").find(".btn-go-to-cart").show();
                    boost.showModal(".ajax-success-modal");
                    boost.updateDropdownCart()
                },
                error: function(c, d) {
                    boost.hideLoading();
                    b(".ajax-error-message").text(b.parseJSON(c.responseText).description);
                    boost.showModal(".ajax-error-modal")
                }
            })
        },
        initQuickView: function() {
            b(".quickview-button a").click(function() {
                var d = b(this).attr("id");
                Shopify.getProduct(d, function(d) {
                    var e = b("#quickview-template").html();
                    b(".quick-view").html(e);
                    var e = b(".quick-view"),
                        f = d.description.replace(/(<([^>]+)>)/ig,
                            ""),
                        f = f.split(" ").splice(0, 20).join(" ") + "...";
                    e.find(".product-title a").text(d.title);
                    e.find(".product-title a").attr("href", d.url);
                    e.find(".product-description").text(f);
                    e.find(".price").html(Shopify.formatMoney(d.price, window.money_format));
                    e.find(".product-item").attr("id", "product-" + d.id);
                    e.find(".variants").attr("id", "product-actions-" + d.id);
                    e.find(".variants select").attr("id", "product-select-" + d.id);
                    d.compare_at_price > d.price ? (e.find(".compare-price").html(Shopify.formatMoney(d.compare_at_price_max,
                        window.money_format)).show(), e.find(".price").addClass("on-sale")) : (e.find(".compare-price").html(""), e.find(".price").removeClass("on-sale"));
                    d.available ? (e.find(".total-price span").html(Shopify.formatMoney(d.price, window.money_format)), boost.createQuickviewVariants(d, e)) : (e.find("select, input, label").remove(), e.find(".total-price").remove(), e.find(".add-to-cart-btn").text("Unavailable").addClass("disabled").attr("disabled", "disabled"));
                    window.show_multiple_currencies && Currency.convertAll(window.shop_currency,
                        jQuery("#currencies").val(), "span.money", "money_format");
                    boost.loadQuickViewSlider(d, e);
                    boost.initQuickviewAddToCart();
                    b(".quick-view").fadeIn(500);
                    b(".quick-view input[name=quantity]").on("change", boost.updatePricingQuickview)
                });
                return !1
            });
            b(".quick-view .overlay, .close-window").live("click", function() {
                boost.closeQuickViewPopup();
                return !1
            })
        },
        updatePricingQuickview: function() {
            var a = /([0-9]+[.|,][0-9]+)/g,
                g = b(".quick-view .price").text().match(a)[0],
                e = g.replace(/[.|,]/, ""),
                f = parseInt(b(".quick-view input[name=quantity]").val()),
                e = Shopify.formatMoney(e * f, window.money_format),
                e = e.match(a)[0],
                a = b(".quick-view .price").html().replace(g, e),
                a = boost.replace(g, e);
            b(".quick-view .total-price span").html(a)
        },
        initQuickviewAddToCart: function() {
            0 < b(".quick-view .add-to-cart-btn").length && b(".quick-view .add-to-cart-btn").click(function() {
                var d = b(".quick-view select[name=id]").val();
                d || (d = b(".quick-view input[name=id]").val());
                var g = b(".quick-view input[name=quantity]").val();
                g || (g = 1);
                var e = b(".quick-view .product-title a").text(),
                    f = b(".quick-view .quickview-featured-image img").attr("src");
                boost.doAjaxAddToCart(d, g, e, f);
                boost.closeQuickViewPopup()
            })
        },
        updateDropdownCart: function() {
            Shopify.getCart(function(b) {
                boost.doUpdateDropdownCart(b)
            })
        },
        doUpdateDropdownCart: function(d) {
            b("#cartCount").text(d.item_count);
            b("#dropdown-cart .summary .price").html(Shopify.formatMoney(d.total_price, window.money_format));
            b("#dropdown-cart .mini-products-list").html("");
            if (0 < d.item_count) {
                for (var g = 0; g < d.items.length; g++) {
                    var e = '<li class="item" id="cart-item-{ID}"><a href="{URL}" title="{TITLE}" class="product-image"><img src="{IMAGE}" alt="{TITLE}"></a><div class="product-details"><a href="javascript:void(0)" title="Remove This Item" class="btn-remove">X</a><p class="product-name"><a href="{URL}">{TITLE}</a></p><div class="cart-collateral">{QUANTITY} x <span class="price">{PRICE}</span></div></div></li>',
                        e = e.replace(/\{ID\}/g, d.items[g].id),
                        e = e.replace(/\{URL\}/g, d.items[g].url),
                        e = e.replace(/\{TITLE\}/g, d.items[g].title),
                        e = e.replace(/\{QUANTITY\}/g, d.items[g].quantity),
                        e = e.replace(/\{IMAGE\}/g, Shopify.resizeImage(d.items[g].image, "small")),
                        e = e.replace(/\{PRICE\}/g, Shopify.formatMoney(d.items[g].price, window.money_format));
                    b("#dropdown-cart .mini-products-list").append(e)
                }
                b("#dropdown-cart .btn-remove").click(function(d) {
                    d.preventDefault();
                    d = b(this).parents(".item").attr("id");
                    d = d.match(/\d+/g);
                    Shopify.removeItem(d,
                        function(b) {
                            boost.doUpdateDropdownCart(b)
                        })
                });
                boost.checkNeedToConvertCurrency() && Currency.convertAll(window.shop_currency, jQuery("#currencies").val(), "#dropdown-cart span.money", "money_format")
            }
            boost.checkItemsInDropdownCart()
        },
        checkNeedToConvertCurrency: function() {
            return window.show_multiple_currencies && Currency.currentCurrency != shopCurrency
        },
        loadQuickViewSlider: function(d, g) {
            var e = Shopify.resizeImage(d.featured_image, "grande");
            g.find(".quickview-featured-image").append('<a href="' + d.url + '"><img src="' + e + '" title="' +
                d.title + '"/><div style="height: 100%; width: 100%; top:0; left:0 z-index: 2000; position: absolute; display: none; background: url(' + window.loading_url + ') 50% 50% no-repeat;"></div></a>');
            if (2 < d.images.length) {
                e = g.find(".more-view-wrapper ul");
                for (i in d.images) {
                    var f = Shopify.resizeImage(d.images[i], "grande"),
                        c = Shopify.resizeImage(d.images[i], "compact");
                    e.append('<li><a href="javascript:void(0)" data-image="' + f + '"><img src="' + c + '"  /></a></li>')
                }
                e.find("a").click(function() {
                    var a = g.find(".quickview-featured-image img"),
                        c = g.find(".quickview-featured-image div");
                    boost.attr("src") != b(this).attr("data-image") && (boost.attr("src", b(this).attr("data-image")), c.show(), boost.load(function(a) {
                        c.hide();
                        b(this).unbind("load");
                        c.hide()
                    }))
                });
                e.hasClass("quickview-more-views-owlslider") ? boost.initQuickViewCarousel(e) : boost.initQuickViewVerticalMoreview(e)
            } else g.find(".quickview-more-views").remove(), g.find(".quickview-more-view-wrapper-jcarousel").remove()
        },
        initQuickViewCarousel: function(a) {
            a && a.owlCarousel({
                navigation: !0,
                items: 5,
                itemsDesktop: [1199,
                    4
                ],
                itemsDesktopSmall: [979, 3],
                itemsTablet: [768, 3],
                itemsTabletSmall: [540, 3],
                itemsMobile: [360, 3]
            }).css("visibility", "visible")
        },
        initQuickViewVerticalMoreview: function(a) {
            a && (a.jcarousel({
                vertical: !0
            }), b(".product-img-box").addClass("has-jcarousel"), b(".more-view-wrapper").css("visibility", "visible"))
        },
        createQuickviewVariants: function(a, g) {
            if (1 < a.variants.length) {
                for (var e = 0; e < a.variants.length; e++) {
                    var f = a.variants[e],
                        f = '<option value="' + f.id + '">' + f.title + "</option>";
                    g.find("form.variants > select").append(f)
                }
                new Shopify.OptionSelectors("product-select-" +
                    a.id, {
                        product: a,
                        onVariantSelected: selectCallbackQuickview
                    });
                b(".quick-view .single-option-selector").selectize();
                b(".quick-view .selectize-input input").attr("disabled", "disabled");
                1 == a.options.length && b(".selector-wrapper:eq(0)").prepend("<label>" + a.options[0].name + "</label>");
                g.find("form.variants .selector-wrapper label").each(function(c, e) {
                    b(this).html(a.options[c].name)
                })
            } else g.find("form.variants > select").remove(), e = '<input type="hidden" name="id" value="' + a.variants[0].id + '">', g.find("form.variants").append(e)
        },
        closeQuickViewPopup: function() {
            b(".quick-view").fadeOut(500)
        }
    }
})(jQuery);