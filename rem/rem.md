# rem自适应布局

- [如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
- [lib-flexible](https://github.com/amfe/lib-flexible)
- [使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)

rem是根据html的font-size大小来变化，正是基于这个出发，我们可以在每一个设备下根据设备的宽度设置对应的html字号，从而实现了自适应布局。更多介绍请看这篇文章：rem是如何实现自适应布局的。

手淘设计师和前端开发的适配协作基本思路是:

- 选择一种尺寸作为设计和开发基准
- 定义一套适配规则，自动适配剩下的两种尺寸(其实不仅这两种，你懂的)
- 还是上一张图吧，因为一图胜过千言万语

在手淘的设计师和前端开发协作过程中：手淘设计师常选择iPhone6作为基准设计尺寸，交付给前端的设计尺寸是按750px * 1334px为准(高度会随着内容多少而改变)。前端开发人员通过一套适配规则自动适配到其他的尺寸。
