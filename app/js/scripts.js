$(document).ready(function(){"use strict";$(".header-nav-btn-menu, .menu-add-to").click(function(n){n.stopPropagation()})});
$(document).ready(function(){$("#cmeNotifyModal").modal({backdrop:"static",keyboard:!1})}),$(document).ready(function(){$("#cmeNotifyModal").modal("show")});
$("#search-query-top-btn").click(function(){setTimeout(function(){$("#search-query-top").focus()},400)});
var didScroll,lastScrollTop=0,delta=5,navbarHeight=$("header.site-headerxxx").outerHeight();function hasScrolled(){var l=$(this).scrollTop();Math.abs(lastScrollTop-l)<=delta||(lastScrollTop<l&&navbarHeight<l?$("header.site-header").removeClass("nav-down").addClass("nav-up"):l+$(window).height()<$(document).height()&&$("header.site-header").removeClass("nav-up").addClass("nav-down"),lastScrollTop=l)}$(window).scroll(function(l){didScroll=!0}),setInterval(function(){didScroll&&(hasScrolled(),didScroll=!1)},250);
!function(u,l){var h=u();u.fn.dropdownHover=function(s){return"ontouchstart"in document?this:(h=h.add(this.parent()),this.each(function(){var e,n,o=u(this),t=o.parent(),r={delay:u(this).data("delay"),hoverDelay:u(this).data("hover-delay"),instantlyCloseOthers:u(this).data("close-others")},a="show.bs.dropdown",i=u.extend(!0,{},{delay:500,hoverDelay:0,instantlyCloseOthers:!0},s,r);function d(){o.parents(".navbar").find(".navbar-toggle").is(":visible")||(l.clearTimeout(e),l.clearTimeout(n),n=l.setTimeout(function(){h.find(":focus").blur(),!0===i.instantlyCloseOthers&&h.removeClass("open"),l.clearTimeout(n),o.attr("aria-expanded","true"),t.addClass("open"),o.trigger(a)},i.hoverDelay))}t.hover(function(e){if(!t.hasClass("open")&&!o.is(e.target))return!0;d(e)},function(){l.clearTimeout(n),e=l.setTimeout(function(){o.attr("aria-expanded","false"),t.removeClass("open"),o.trigger("hide.bs.dropdown")},i.delay)}),o.hover(function(e){if(!t.hasClass("open")&&!t.is(e.target))return!0;d(e)}),t.find(".dropdown-submenu").each(function(){var n,o=u(this);o.hover(function(){l.clearTimeout(n),o.children(".dropdown-menu").show(),o.siblings().children(".dropdown-menu").hide()},function(){var e=o.children(".dropdown-menu");n=l.setTimeout(function(){e.hide()},i.delay)})})}))},u(document).ready(function(){u('[data-hover="dropdown"]').dropdownHover()})}(jQuery,window);
$(document).ready(function(){"use strict";$('[data-toggle="tooltip"]').tooltip()});
$(function(){"use strict";$(".related-carousel").owlCarousel({loop:!1,margin:30,nav:!0,responsive:{0:{items:1},480:{items:2},768:{items:3},992:{items:4},1200:{items:5}}})});
$(document).ready(function(){$("#nav-icon").click(function(){$(this).toggleClass("open")})}),$(document).ready(function(){$(".mobile-nav-primary__link--has-children").click(function(n){$(this).hasClass("mobile-nav-primary__link--has-children-open")?$(this).removeClass("mobile-nav-primary__link--has-children-open"):($(".more").removeClass("mobile-nav-primary__link--has-children-open"),$(this).addClass("mobile-nav-primary__link--has-children-open"))})});
$("#ratingClearBtn").click(function(){$(".global-rating-stars :radio").each(function(){$(this).removeAttr("checked"),$('input[type="radio"]').prop("checked",!1)})});
$("html").on("click",function(e){$('[data-toggle="popover"]').each(function(){if(null!=$(this).attr("aria-describedby")){var t=$(this).attr("aria-describedby");$(e.target).closest(".popover-content").length||$(e.target).attr("aria-describedby")==t||$(e.target).closest('[aria-describedby="'+t+'"').length||$('[aria-describedby="'+t+'"]').trigger("click")}})}),$("body").on("hidden.bs.popover",function(t){$(t.target).data("bs.popover").inState={click:!1,hover:!1,focus:!1}});var moops={html:!0,content:function(){return $("#ratingsHistContent").html()}};$(function(){$("#ratingsHistBtn").popover(moops)});
$(document).ready(function(){"use strict";$("#viewCMEbtn").click(function(){$(this).text("Hide PDH Info"===$(this).text()?"View PDH Info":"Hide PDH Info"),$(this).closest(".course-more__see-more").toggleClass("collapsed")})}),$(document).ready(function(){"use strict";$(".expansion-panel__trigger").click(function(){$(this).toggleClass("expanded"),$(this).closest("div").find(".expansion-panel__icon").toggleClass("expanded")})}),$(document).ready(function(){"use strict";$(".meeting-pres-filter__trigger").click(function(){$(this).toggleClass("expanded"),$(this).closest("div").find(".meeting-pres-filter__icon").toggleClass("expanded")})});
$(document).ready(function(){"use strict";$(".single-item").slick({dots:!0,arrows:!1,draggable:!0,autoplay:!0,autoplaySpeed:12e3,infinite:!0,slidesToShow:1,slidesToScroll:1,touchThreshold:1e3})});
function autoPlayYouTubeModal(){$("body").find('[data-toggle="modal"]').click(function(){var t=$(this).data("target"),a=$(this).attr("data-theVideo"),o=a+"?autoplay=1";$(t+" iframe").attr("src",o),$(t+" button.close").click(function(){$(t+" iframe").attr("src",a)}),$(".modal").click(function(){$(t+" iframe").attr("src",a)})})}autoPlayYouTubeModal();
$(document).ready(function(){$('a[rel="external"]').attr("target","_blank")});