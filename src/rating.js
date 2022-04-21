/* jQuery Star Rating Plugin
 * 
 * @Author
 * Copyright Nov 02 2010, Irfan Durmus - http://irfandurmus.com/
 *
 * @Version
 * 0.3b
 *
 * @License
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Visit the plugin page for more information.
 * http://irfandurmus.com/projects/jquery-star-rating-plugin/
 *
 */

; (function ($) {
    $.fn.rating = function (options) {

        var optcalback = options ? options.callback : '' || function () { };
        var optstarNum = options ? options.starNum : '' || 5;

        // each for all item
        this.each(function (i, v) {

            $(v).data('rating', {
                starNum: optstarNum,
                callback: optcalback
            })
                .bind('init.rating', $.fn.rating.init)
                .bind('set.rating', $.fn.rating.set)
                .bind('hover.rating', $.fn.rating.hover)
                .trigger('init.rating');
        });
    };

    $.extend($.fn.rating, {
        init: function (e) {
            var el = $(this),
                starlist = '',
                starNum = el.data('rating').starNum,
                a = 0
            let value = el.attr('value');

            for (; a < starNum; a++) {
                if (a == value - 1) {
                    starlist = starlist + '<input type="radio" name="example" class="rating" value=' + (a + 1) + ' checked />';
                } else {
                    starlist = starlist + '<input type="radio" name="example" class="rating" value=' + (a + 1) + ' />';
                }
            };

            el
                .append(starlist);

            var list = '',
                isChecked = null,
                childs = el.children(),
                i = 0,
                l = childs.length;

            for (; i < l; i++) {
                list = list + '<a class="star" title="' + $(childs[i]).val() + '" />';
                if ($(childs[i]).is(':checked')) {
                    isChecked = $(childs[i]).val();
                };
            };

            childs.hide();

            el
                .append('<div class="stars">' + list + '</div>')
                .trigger('set.rating', isChecked);

            $('a', el).bind('click', $.fn.rating.click);
            el.trigger('hover.rating');
        },
        set: function (e, val) {
            var el = $(this),
                item = $('a', el),
                input = undefined;

            if (val) {
                item.removeClass('fullStar');

                input = item.filter(function (i) {
                    if ($(this).attr('title') == val)
                        return $(this);
                    else
                        return false;
                });

                input
                    .addClass('fullStar')
                    .prevAll()
                    .addClass('fullStar');

                input
                    .removeClass('tmp_fs')
                    .prevAll()
                    .removeClass('tmp_fs');
                input
                    .nextAll()
                    .removeClass('tmp_es');

            }

            return;
        },
        hover: function (e) {
            var el = $(this),
                stars = $('a', el);

            stars.bind('mouseenter', function (e) {
                // add tmp class when mouse enter
                $(this)
                    .addClass('tmp_fs')
                    .prevAll()
                    .addClass('tmp_fs');

                $(this).nextAll()
                    .addClass('tmp_es');
            });

            stars.bind('mouseleave', function (e) {
                // remove all tmp class when mouse leave
                $(this)
                    .removeClass('tmp_fs')
                    .prevAll()
                    .removeClass('tmp_fs');

                $(this).nextAll()
                    .removeClass('tmp_es');
            });

        },
        click: function (e) {
            e.preventDefault();
            var el = $(e.target),
                container = el.parent().parent(),
                caseno = container.attr('data-caseno'),
                inputs = container.children('input'),
                matchInput = undefined,
                rate = el.attr('title');

            matchInput = inputs.filter(function (i) {
                if ($(this).val() == rate)
                    return true;
                else
                    return false;
            });
            matchInput
                .prop('checked', true)
                .attr('checked', 'checked')
                .siblings('input').prop('checked', false)
                .removeAttr('checked', 'checked');
            container
                .trigger('set.rating', matchInput.val())
                .data('rating').callback(caseno, rate, e);
        }
    });

})(jQuery);