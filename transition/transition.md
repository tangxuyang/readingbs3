或许因为transition.js是bootstrap中代码量最小的文件，所以我才从这里开始。但是我万万没想到，理解这些代码却花费了很长一段时间。  

即使如此，有一些东西也还不是那么的清楚明白。只是猜测而已！  

一句话概括一下transition的作用：提供跨浏览器的transitionend（bsTransitionEnd）事件支持。transitionend，从名字上就能知道，它是要在过渡效果完成后要触发的事件，bootstrap中的很多插件都是在fade out后才去移除元素。试想一下，如果过渡效果还没执行完，你就把元素移除了，那么过渡效果还有什么作用呢！  

总之，就是提供过渡完成的hook。但是又因为各个浏览器对过渡实现的不同，所以有的浏览器支持过渡，有的压根就不支持过渡。支持过渡效果的，并不代表它们暴露的事件名称都一样。因此transition.js就自己定义了一个bsTransitionEnd事件，并用这个事件代理浏览器真正支持的事件，或是webkitTransitionEnd，或是transitionend，或是oTransitionEnd otransitionend或是transitionend。在代码中transEndEventNames数组中可以看的出来。  

## $.event.special  
不是对jQuery的事件机制有深度的了解，谁又能知道这个是什么鬼！  

