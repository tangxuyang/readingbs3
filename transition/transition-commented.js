/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

//IIFE(Immediatelly invoked function expression)
+function ($) {
  'use strict';//严格模式

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  //查询浏览器支持的transitionend的名称
  function transitionEnd() {
    var el = document.createElement('bootstrap')

	//各种浏览器提供的transitionend名称
    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

	//在bootstrap元素的style上查找支持的transitionend名称
    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  //模拟transitionend事件。保证transitionend事件被执行，如果没有的话，自行触发。
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }


  //http://www.tuicool.com/articles/EfYjq2J
  $(function () {
    $.support.transition = transitionEnd()//获取浏览器支持的transitionend事件名称

    if (!$.support.transition) return//不支持则直接返回

	//要了解$.event.special可以参考http://learn.jquery.com。
    $.event.special.bsTransitionEnd = {//自定义bsTranitionEnd事件
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);


/*
## 知识点
1. 立即调用函数表达式IIFE
	jQuery的插件开发一般都用这种方式。把对jQuery的依赖转换成对参数$的使用，可以有效的避免冲突。当然如果不想使用这种方式，为了避免冲突（比如别的库也用了$），可以直接使用jQuery，而不使用$。或者用$.noConflict()来解决冲突，用别的符号来代替$.
	var $$ = $.noConflict();
	这样就可以使用$$来代替jQuery和$了。
2. 特性检测(feature detect)
	通过检查某个属性是否存在来实现。
3. 自定义jQuery事件($.event.special)
	bindType - 已知的事件名称，浏览器触发了这个事件，会转移到自定义的事件上。直接绑定的情况下。
	delegateType - 已知的事件名称，浏览器触发了这个事件，会转移到自定义的事件上。代理的情况下。
	handle - 处理函数。如果这个属性赋值，就不会再调用具体的事件处理函数了。所以此时handle中通过e.handleObj.handler来获取具体的事件处理函数，并调用它。
*/
