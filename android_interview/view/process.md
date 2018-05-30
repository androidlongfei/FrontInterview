
自定义View过程

1.自定义View的属性

```xml
<?xml version="1.0" encoding="utf-8"?>  
<resources>  

    <attr name="titleText" format="string" />  
    <attr name="titleTextColor" format="color" />  
    <attr name="titleTextSize" format="dimension" />  

    <declare-styleable name="CustomTitleView">  
        <attr name="titleText" />  
        <attr name="titleTextColor" />  
        <attr name="titleTextSize" />  
    </declare-styleable>  

</resources>  
```

>以上定义了字体，字体颜色，字体大小3个属性，format是值该属性的取值类型:
>
>一共有：string,color,demension,integer,enum,reference,float,boolean,fraction,flag;

然后在布局中声明我们的自定义View

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"  
    xmlns:tools="http://schemas.android.com/tools"  
    xmlns:custom="http://schemas.android.com/apk/res/com.example.customview01"  
    android:layout_width="match_parent"  
    android:layout_height="match_parent" >  

    <com.example.customview01.CustomTitleView  
        android:layout_width="200dp"  
        android:layout_height="100dp"  
        custom:titleText="3712"  
        custom:titleTextColor="#ff0000"  
        custom:titleTextSize="40sp" />  

</RelativeLayout>  
```

一定要引入`xmlns:custom="http://schemas.android.com/apk/res/com.example.customview01"`

>`com.example.customview01`是包名
>
> `xmlns:custom`中custom可以是任何值


2.自定义CustomTitleView继承View,并在View的构造方法中获得我们自定义的属性

```java
public CustomTitleView(Context context, AttributeSet attrs, int defStyle) {  
    super(context, attrs, defStyle);  
    /**
     * 获得我们所定义的自定义样式属性
     */  
    TypedArray a = context.getTheme().obtainStyledAttributes(attrs, R.styleable.CustomTitleView, defStyle, 0);  
    int n = a.getIndexCount();  
    for (int i = 0; i < n; i++)  {  
        int attr = a.getIndex(i);  
        switch (attr)  {  
        case R.styleable.CustomTitleView_titleText:  
            mTitleText = a.getString(attr);  
            break;  
        case R.styleable.CustomTitleView_titleTextColor:  
            // 默认颜色设置为黑色  
            mTitleTextColor = a.getColor(attr, Color.BLACK);  
            break;  
        case R.styleable.CustomTitleView_titleTextSize:  
            // 默认设置为16sp，TypeValue也可以把sp转化为px  
            mTitleTextSize = a.getDimensionPixelSize(attr, (int) TypedValue.applyDimension(  
                    TypedValue.COMPLEX_UNIT_SP, 16, getResources().getDisplayMetrics()));  
            break;  
        }  

    }  
    a.recycle();  

    /**
     * 获得绘制文本的宽和高
     */  
    mPaint = new Paint();  
    mPaint.setTextSize(mTitleTextSize);  
    // mPaint.setColor(mTitleTextColor);  
    mBound = new Rect();  
    mPaint.getTextBounds(mTitleText, 0, mTitleText.length(), mBound);  
    }  
```
3.重写onMeasure

这里一般用来确定当前view的宽高，并根据宽高等计算一些坐标默认的值。

**UNSPECIFIED**
父容器不对 view 有任何限制，要多大给多大

**EXACTLY**
父容器已经检测出 view 所需要的大小

**AT_MOST**
父容器指定了一个大小， view 的大小不能大于这个值

4.重写onLayout

ViewGroup 用来确定子元素的位置。

流程
当 viewgroup 的位置被确定后，它在 onLayout 会遍历所有的 child 并调用其 layout 。在 layout 中 onLayout 会被调用。

关键方法
public void layout(int l, int t, int r, int b)
onLayout(changed, l, t, r, b)


5.重写onDraw

绘制view
