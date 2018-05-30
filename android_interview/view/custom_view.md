
## 概述

### 1、ViewGroup的职责是啥？

ViewGroup相当于一个放置View的容器，并且我们在写布局xml的时候，会告诉容器（凡是以layout为开头的属性，都是为用于告诉容器的），我们的宽度（layout_width）、高度（layout_height）、对齐方式（layout_gravity）等；当然还有margin等；于是乎，ViewGroup的职能为：给childView计算出建议的宽和高和测量模式 ；
决定childView的位置；为什么只是建议的宽和高，而不是直接确定呢，别忘了childView宽和高可以设置为wrap_content，这样只有childView才能计算出自己的宽和高。

### 2、View的职责是啥？

View的职责，根据测量模式和ViewGroup给出的建议的宽和高，计算出自己的宽和高；同时还有个更重要的职责是：在ViewGroup为其指定的区域内绘制自己的形态。

### 3、ViewGroup和LayoutParams之间的关系？

大家可以回忆一下，当在LinearLayout中写childView的时候，可以写layout_gravity，layout_weight属性；在RelativeLayout中的childView有layout_centerInParent属性，却没有layout_gravity，layout_weight，这是为什么呢？这是因为每个ViewGroup需要指定一个LayoutParams，用于确定支持childView支持哪些属性，比如LinearLayout指定LinearLayout.LayoutParams等

## View的3种测量模式

上面提到了ViewGroup会为childView指定测量模式，下面简单介绍下三种测量模式：

EXACTLY：表示设置了精确的值，一般当childView设置其宽、高为精确值、match_parent时，ViewGroup会将其设置为EXACTLY；

AT_MOST：表示子布局被限制在一个最大值内，一般当childView设置其宽、高为wrap_content时，ViewGroup会将其设置为AT_MOST；

UNSPECIFIED：表示子布局想要多大就多大，一般出现在AadapterView的item的heightMode中、ScrollView的childView的heightMode中；此种模式比较少见。
