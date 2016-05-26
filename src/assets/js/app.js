/*global $, jQuery, document*/
/*jslint newcap: true*/
jQuery(document).ready(function ($) {
    'use strict';

    var menus = {
        edd : {
            overview : {
                position : 0,
                type : 'item',
                icon : 'tachometer',
                name : 'Dashboard'
            },
            spacer1 : {
                position : 1,
                type : 'spacer'
            },
            sales : {
                position : 2,
                type : 'item',
                icon : 'shopping-cart',
                name : 'Sales'
            },
            earnings : {
                position : 3,
                type : 'item',
                icon : 'dollar',
                name : 'Earnings'
            },
            downloads : {
                position : 4,
                type : 'item',
                icon : 'download',
                name : 'Downloads'
            }
        },
        woo : {}
    };

    var menuContent = '';
    var menuClass;

    for(var menu in menus.edd) {
        if(menus.edd[menu].type === 'spacer') {
            menuContent += '<li class="spacer"></li>';
        } else {
            if(menus.edd[menu].position === 0) {
                menuClass = ' class="active"';
            } else {
                menuClass = '';
            }

            menuContent += '<li id="menu-' + menu + '"' + menuClass + ' data-position="' + menus.edd[menu].position + '"><i class="fa fa-' + menus.edd[menu].icon + '" aria-hidden="true"></i> ' + menus.edd[menu].name + '</li>';
        }
    }

    $('.menu ul').html(menuContent);

    $('.content').load('./templates/overview.html', function() {
        $('.content').fadeIn('fast');
    });

    $('body').on('click', '.menu li', function () {
        if(! $(this).hasClass('spacer') && ! $(this).hasClass('active')) {
            setActive($(this).attr('data-position'));
        }
    });

    $('body').keyup(function(key) {
        var activeItem = $('.menu li.active').attr('data-position');
        var validItem = false;
        var totalItems = Object.keys(menus.edd).length;

        if(key.which === 38 || key.which === 40) {
            activeItem = parseInt(activeItem);

            while(validItem === false) {
                if(key.which === 38) {
                    activeItem--;
                } else if(key.which === 40) {
                    activeItem++;
                }

                if(activeItem < 1) {
                    activeItem = totalItems;
                } else if(activeItem >= totalItems) {
                    activeItem = 0;
                }

                for(var item in menus.edd) {
                    if(menus.edd[item].position === activeItem) {
                        if(menus.edd[item].type === 'item') {
                            validItem = true;
                        }
                    }
                }
            }

            setActive(activeItem);
        }
    });

    function setActive(position) {
        $('.menu li.active').removeClass('active');

        for(var item in menus.edd) {
            if(menus.edd[item].position === parseInt(position)) {
                $('#menu-' + item).addClass('active');

                $('.content').fadeOut('fast', function() {
                    $('.content').load('./templates/' + item + '.html', function() {
                        $('.content').fadeIn('fast');
                    });
                });
                break;
            }
        }
    }
});
