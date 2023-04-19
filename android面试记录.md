## android面试记录

### 面试题网址

1. [分享一份非常强势的Android面试](https://segmentfault.com/a/1190000016117569)
2. [史上最全的Android面试题集锦](https://juejin.im/post/5d2eea56f265da1b7004df0d#heading-168)
3. [2020最新中高阶Android面试题总结 上（附解题思路）](https://blog.csdn.net/chuhe1989/article/details/104384802)
4. [2020最新中高阶Android面试题总结 下（附解题思路）](https://blog.csdn.net/chuhe1989/article/details/104385096)
5. [Android中高级面试题合集，含答案](https://blog.csdn.net/Coo123_/article/details/113696121)
6. [2023最全Android面试总结-这些面试一定需要](https://juejin.cn/post/7209983180911575100)



### 面试复习-java篇

------

#### 1.java中==和equals和hashCode的区别

1. 基本数据类型的 == 比较的值相等

2. 类的 == 比较的内存的地址，即是否是同一个对象，在不覆盖equals的情况下，同比较内存地址，原实现也为 ==

3. hashCode也是Object类的一个方法。返回一个离散的int型整数

   - 如果两个对象equals，Java运行时环境会认为他们的hashcode一定相等（<font color= #FF0000>否则在Set中就会出现重复元素</font>）
   - 如果两个对象不equals，他们的hashcode有可能相等（<font color= #FF0000>我的理解是由于哈希码在生成的时候产生冲突造成的</font>）
   - 如果两个对象hashcode相等，他们不一定equals
   - 如果两个对象hashcode不相等，他们一定不equals

   

#### 2.什么时候需要重写重写equals方法和hashCode的方法？

1. 重写HashCode() 用于获得元素的存储位置
2. 重写equals() 用于在两个元素的位置相同的时候 比较两个元素是否相等



#### 3.equals

- 自反性：对于任何非空引用值 x，x.equals(x) 都应返回 true
- 对称性：对于任何非空引用值 x 和 y，当且仅当 y.equals(x) 返回 true 时，x.equals(y) 才应返回 true
- 传递性：对于任何非空引用值 x、y 和 z，如果 x.equals(y) 返回 true，并且 y.equals(z) 返回 true，那么 x.equals(z) 应返回 true
- 一致性：对于任何非空引用值 x 和 y，多次调用 x.equals(y) 始终返回 true 或始终返回 false，前提是对象上 equals 比较中所用的信息没有被修改



#### 4.int与integer的区别

- int 基本类型
- integer 对象 int的封装类



#### 5.String、StringBuffer、StringBuilder区别

- String:字符串常量 不适用于经常要改变值得情况，每次改变相当于生成一个新的对象
- StringBuffer:字符串变量 （线程安全）
- StringBuilder:字符串变量（线程不安全） 确保单线程下可用，效率略高于StringBuffer



#### 6.String为什么要设计成不可变的

- `字符串池:`字符串池是一种存储字符串的缓存机制，它可以避免重复创建相同内容的字符串对象，节省内存空间
- `安全性:`如果字符串是可变的，那么在多线程并发访问时，可能会出现同步问题，从而导致数据不一致或安全问题
- `缓存hash值:`字符串是不可变的，可以缓存字符串的hash值，提高字符串的hash表性能，因为hash值是经常被使用的，如果每次计算都需要重新计算hash值，会降低性能
- `简化代码:`如果字符串是不可变的，可以确保字符串对象的唯一性，这样可以大大简化代码的编写和阅读



#### 7.什么是内部类？内部类的作用

- 内部类可以直接访问外部类的属性

- 内部类是一个编译时的概念，一旦编译成功，就会成为完全不同的两类

- Java中内部类主要分为

  1. 成员内部类

     - 位于外部类成员位置的类。与外部类的属性、方法并列
     - 可以访问外部类的私有成员或属性
     - 外部类不可以访问成员内部类的属性

     ```java
     class Outer {
           private int age = 20;
           //成员位置
           class Inner {
               public void show() {
                   System.out.println(age);
               }
           }
       }
       
       class Test {
           public static void main(String[] ages) {
               //成员内部类是非静态的演示
               Outer.Inner oi = new Outer().new Inner();
               oi.show();
           }
       }
     
     ```

     

  2. 局部内部类（嵌套在方法和作用域内）

     - 局部内部类中不可定义静态变量
     - 可以访问外部类的局部变量(即方法内的变量)，但是变量必须是final的
       - **局部变量是随着方法的调用而调用**，**使用完毕就消失**，而堆内存的数据并不会立即消失
       - 为了让该值还存在，就加final修饰

     ```java
     //在局部位置，可以创建内部类对象，通过对象调用和内部类方法
       class Outer {
           private int age = 20;
           public void method() {
               final int age2 = 30;
               class Inner {
                   public void show() {
                       System.out.println(age);
                       //从内部类中访问方法内变量age2，需要将变量声明为最终类型。
                       System.out.println(age2);
                   }
               }
               
               Inner i = new Inner();
               i.show();
           }
       }
     ```

     

  3. 匿名内部类（没有构造方法）

     - 必须继承或实现一个接口，指定给new的类型为匿名类的超类型，匿名类不能有显示的extends或implements子句，也不能有任何修饰符

     ```java
     interface Inner {
           public abstract void show();
       }
       
       class Outer {
           public void method(){
               new Inner() {
                   public void show() {
                       System.out.println("HelloWorld");
                   }
               }.show();
           }
       }
       
       class Test {
           public static void main(String[] args)  {
               Outer o = new Outer();
               o.method();
           }
       }
     
     ```

     

  4. 静态内部类（static修饰的类，不能使用任何外围类的非static成员变量和方法， 不依赖外围类）

     - 非静态内部类编译后会默认的保存一个指向外部类的引用，而静态类却没有

       ```java
       class Outter {
             int age = 10;
             static age2 = 20;
             public Outter() {        
             }
              
             static class Inner {
                 public method() {
                     System.out.println(age);//错误
                     System.out.println(age2);//正确
                 }
             }
         }
         
         public class Test {
             public static void main(String[] args)  {
                 Outter.Inner inner = new Outter.Inner();
                 inner.method();
             }
         }
       
       
       ```

- 内部类在项目中的应用

  - 每个内部类都可以独立的继承和实现接口，外部类的继承和实现接口对于内部类没有影响
  - 可以利用内部类实现多接口方案达到解决问题的目的



#### 8.进程和线程的区别

- 进程是cpu资源分配的最小单位，线程是cpu调度的最小单位；一个进程可以包含多个线程
- 每个进程都有独立的内存空间，而同一个进程中的多个线程共享内存空间
- 进程之间相互独立，一个进程的崩溃不会影响其他进程的运行，而线程之间共享进程的资源，一个线程的崩溃会影响整个进程的运行
- 进程间通信需要使用IPC（Inter-Process Communication）机制，而线程间通信可以直接读写进程中的共享数据
- 进程的创建和销毁比较耗时，而线程的创建和销毁比较快
- 操作系统可以同时执行多个进程，但每个CPU在同一时刻只能执行一个线程，多线程的并发性是通过操作系统进行线程切换实现的



#### 9.final，finally，finalize的区别

- 定义：都是Java语言中的关键字
- 区别：
  - `final`关键字用于修饰类、方法和变量，表示它们的值不可改变、不可继承或不可重写。在类中，被`final`修饰的变量必须在声明时或构造函数中初始化
  - `finally` 用于定义在`try-catch`语句块中的代码块，它表示不管是否发生异常，都会执行其中的代码。一般用于释放资源或清理操作，比如关闭文件、关闭数据库连接等
  - `finalize`方法是在Java对象被垃圾回收之前调用的方法。



#### 10.Serializable 和Parcelable 的区别

- Serializable Java 序列化接口 在硬盘上读写 读写过程中有大量临时变量的生成，内部执行大量的i/o操作，效率很低。
- Parcelable Android 序列化接口 效率高 使用麻烦 在内存中读写（AS有相关插件 一键生成所需方法） ，对象不能保存到磁盘中



#### 11.静态属性和静态方法是否可以被继承？是否可以被重写？以及原因？

- 可以被继承，不可以被重写而是被隐藏
- 如果子类里面定义了静态方法和属性，那么这时候父类的静态方法或属性称之为"隐藏"。如果你想要调用父类的静态方法和属性，直接通过父类名.方法或变量名完成



#### 12.string 转换成 integer的方式及原理

- ```java
  Integer.parseInt(string) //  String 转 Int
  Integer.toString()// Int 转 String 
  ```



#### 13.哪些情况下的对象会被垃圾回收机制处理

- `对象没有被引用：`如果一个对象没有任何引用指向它，那么它就可以被垃圾回收机制处理掉

- `对象的引用被赋值为null：`如果一个对象的引用被赋值为null，那么它就可以被垃圾回收机制处理掉

- `对象的作用域结束`：如果一个对象在方法或代码块的作用域结束后，它就可以被垃圾回收机制处理掉。

- `对象被标记为可回收：`如果一个对象被标记为可回收，那么它就可以被垃圾回收机制处理掉。这个过程由垃圾回收器负责，当内存不足时，垃圾回收器会扫描堆内存中不再被引用的对象，并将它们标记为可回收，然后释放这些对象占用的内存空间

- 垃圾回收机制的处理时间是不确定的，它会根据具体情况来自动回收内存，而且Java虚拟机提供了`System.gc()`方法(容易造成内存泄漏)，可以显式地调用垃圾回收机制。

- 判断对象是否存活的方法

  - 引用计数法：对象添加一个引用计数器，每当一个地方引用它object时技术加1，引用失去以后就减1，计数为0说明不再引用

    - 优点：实现简单，判定效率高
    - 缺点：无法解决对象相互循环引用的问题，对象A中引用了对象B，对象B中引用对象A

  - 可达性分析法：当一个对象到`GC Roots`没有引用链相连，即就是`GC Roots`到这个对象不可达时，证明对象不可用



#### 13-1.JVM垃圾回收器

- 堆内存详解

  - ![](./reference_graph/2806822728-5f8983ab894e7.png)
  - 新生代和老年代
  - 新生代分为 `Eden`和`survivor`。他俩空间大小比例默认为8:2
  - 幸存区分为 `s0` 和 `s1` ，空间大小比例1:1

- 垃圾回收过程

  - 新生成的对象首先放到Eden区，当Eden区满了，就会触发Minor GC
  - 第一步GC活下来的对象，会被移动到`survivor`区中的S0区，S0区满了之后会触发Minor GC，S0区存活下来的对象会被移动到S1区，S0区空闲
  - S1满了之后在GC，存活下来的再次移动到S0区，S1区空闲，这样反反复复GC，每GC一次，对象的年龄就`涨一岁`，达到某个值后（15），就会进入`老年代`
  - 在发生一次`Minor GC`后（前提条件），老年代可能会出现`Major GC`，这个视垃圾回收器而定
  
- 回收哪些区域的对象

  - 只回收`堆内存`和`方法区内`的对象。而`栈内存`的数据，在超出作用域后会被JVM自动释放掉

- 新生代可配置的回收器：Serial、ParNew、Parallel Scavenge

- 老年代配置的回收器：CMS、Serial Old、Parallel Old，G1

  


#### 14.静态代理和动态代理的区别，什么场景使用？

- 静态代理

  ```java
  public interface Buy {
      void buyHouse(long money);
  }
  
  public class Xiaoming implements Buy {
      @Override
      public void buyHouse(long money) {
          System.out.println("我买房了，用了"+money+" 钱 ");
      }
  }
  
  public class UserProxy implements Buy {
      /**
       *这个是真实对象，买房一定是真实对象来买的，中介只是跑腿的
       */
      private Buy mBuy;
      public UserProxy(Buy mBuy) {
          this.mBuy = mBuy;
      }
  
      @Override
      public void buyHouse(long money) {
          /**
           * 这里是我们出钱去买房,中介只是帮忙
           */
          mBuy.buyHouse(newMoney);
      }
  }
  ```

  - 代理类是在编译期间就已经存在的，而且UserProxy代理类也只能代理实现了Buy接口的类
  - 静态代理的性能比较高
  - 静态代理的代码比较繁琐，容易产生重复代码

- 动态代理

  ```java
  public class DynamiclProxy implements InvocationHandler {
      //被代理的类引用
      private Object mObject;
  
      public DynamiclProxy(Object mObject) {
          this.mObject = mObject;
      }
  
      @Override
      public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
      //调用被代理类对象的方法
      Object result = method.invoke(mObject, args);
      return result;
      }
  }
  
  public class ProxyClient {
      public static void main(String[] args){
          System.out.println("静态代理测试");
          Buy buy=new Xiaoming();
          UserProxy proxy=new UserProxy(buy);
          proxy.buyHouse(1000000);
  
          System.out.println("动态代理测试");
          Buy dynamicProxy= (Buy) Proxy.newProxyInstance(buy.getClass().getClassLoader(),
                  buy.getClass().getInterfaces(),new DynamiclProxy(buy));
          dynamicProxy.buyHouse(1000000);
      }
  }
  
  ```

  - 动态代理则在运行时才确定被代理类和代理类
  - 动态代理的代码比较简洁，可读性较高
  - 动态代理的性能比较低，因为它需要在运行时动态生成代理类
  - 可以使用Java中的`java.lang.reflect.Proxy`类和`java.lang.reflect.InvocationHandler`接口来实现



#### 15.说说你对Java反射的理解

- 反射机制是在运行状态中，对于任意一个类，都可以知道这个类的所有属性和方法，对于任意一个对象都可以调用它的属性和方法

  ```java
  Class testClass = myClassLoader.loadClass("com.github.hcsp.MyTestClass");
  Object testClassInstance = testClass.getConstructor().newInstance();
  String message = (String) testClass.getMethod("sayHello").invoke(testClassInstance);
  ```



#### 16.说说你对Java注解的理解

- 什么是注解？

  - 注解annotation是JavaSE5.0中新增功能。可以理解为注解是一种标记，这种标记可以在编译、类加载、运行时被读取，并执行相应的处理
  - 添加到程序的任何元素上：包声明、类型声明、构造方法、普通方法、成员变量、参数

- 五个元注解

  - `Retenation` 定义该注解是作用于什么阶段，编译、类加载、运行（使用最多）

    ```java
    @Documented
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.ANNOTATION_TYPE)
        public @interface Retention {
            /**
             * Returns the retention policy.
             * @return the retention policy
             */
            RetentionPolicy value();
        }
    
    package java.lang.annotation;
        public enum RetentionPolicy { 
            SOURCE, 
            CLASS, 
            RUNTIME
        }
    
    //SOURCE：只在Java源代码中，编译器编译的时候会把它直接丢弃
    //CLASS：编译器将注解记录在.class文件中。当运行Java程序时，JVM不能获取注解信息。这是默认值。
    //RUNTIME：编译器将注解记录在.class文件中。当运行Java程序时，JVM也能获取注解信息。程序可以通过反射获取注解信息。
    
    ```

  - `Target` 声明创建一个注解的时候，指示该注解可以作用于程序中的哪些元素

    ```java
    @Documented
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.ANNOTATION_TYPE)
        public @interface Target {
            //元素类型
            ElementType[] value();
        }
        public enum ElementType { 
            TYPE, 
            FIELD, 
            METHOD, 
            PARAMETER, 
            CONSTRUCTOR, 
            LOCAL_VARIABLE, 
            ANNOTATION_TYPE, 
            PACKAGE, 
            /** @since 1.8*/
            TYPE_PARAMETER,
            /** @since 1.8*/
            TYPE_USE
        }
    
    //ANNOTATION_TYPE：指定当前注解只能修饰其它注解
    //CONSTRUCTOR：指定当前注解只能修饰构造方法
    //FIELD：指定当前注解只能修饰成员变量
    //LOCAL_VARIABLE：指定当前注解只能修饰局部变量
    //METHOD：指定当前注解只能修饰方法
    //PACKAGE：指定当前注解只能修饰包
    //PARAMETER：指定当前注解只能修饰参数
    //TYPE：指定当前注解可以修饰类，接口，其它注解，枚举等类型
    ```

  - `Documented `  用于描述其它类型的annotation应该被作为被标注的程序成员的公共API，因此可以被例如javadoc此类的工具文 档化

    ```java
    @Documented
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.ANNOTATION_TYPE)
    public @interface Documented {
    }
    
    //用来生成文档的，工作中基本上很少使用，作为了解就可以了
    ```

  - `Inherited ` 声明创建一个注解的时候，指定该注解将具有继承性

    ```java
    @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.TYPE)
        @Inherited
        public @interface A {
            
        }
        @A
        public class Base {
            
        }
        //Sub也带有@A
        public class Sub extends Base {
        }
    ```

  - `Repeatable`  重复注解，JDK8新增的注解

- 基本注解

  - `Override` 重写父类方法
  - `SafeVarargs` 确保方法不会对其varargs参数执行不安全的操作
  - `SuppressWarnings` 有选择的关闭编译器对类、方法、成员变量、变量初始化的警告
  - `FunctionalInterface ` 仅仅只包含一个抽象方法的接口
  - `Deprecated`  标识方法或类，标识该类或方法已过时



#### 17.Object类的equal和hashCode方法重写，为什么？

- 先进行hashcode比较，如果不同，就不用再进行equals的比较了，比较数量大的情况下效率提高



#### 18.List,Set,Map的区别

- `List` 有序集合，可包含重复的元素
  - 实现类`ArrayList`、`LinkedList`、`Vector`
    - ArrayList是一种基于数组实现的动态数组，查询性能较好,线程不安全。
      - CopyOnWriteArrayList、CopyOnWriteArraySet  是线程安全的
      - List list = Collections.synchronizedList(new ArrayList()) 线程安全的
    - LinkedList是一种基于链表实现的双向链表，插入和删除性能较好
    - Vector与ArrayList类似，但是线程安全，性能较差
- `Set` 无序集合，不允许包含重复的原色
  - 实现类 `HashSet`、`TreeSet`、`LinkedHashSet`
    - HashSet是一种基于hash表实现的集合，查询性能较好
    - TreeSet是一种基于红黑树实现的有序集合，插入和删除性能比较好
    - LinkedHashSet 是一种基于hash表和链表实现的有序集合，插入和删除性格较好
- `Map` 一种键值对映射的集合，每个键只能应对一个值
  - 实现类 `HashMap`、`TreeMap`、`LinkedHashMap`
    - HashMap是一种基于哈希表实现的映射，查询性能较好
    - TreeMap是一种基于红黑树实现的有序映射，插入和删除性能较好
    - LinkedHashMap是一种基于哈希表和链表实现的有序映射，插入和删除性能较好



#### 19.HashMap、ArrayMap和SparseArray的对比

- HashMap 

  - 基于hash表实现的映射，使用键值对存储，支持快速查询，删除和插入
  - 默认的存储大小就是一个容量为16的数组。当HashMap存储元素达到75%时，HashMap存储空间就会扩大原来的2倍
  - 线程不安全

- ArrayMap

  - 使用两个数组进行数据存储，一个记录key的hash值，一个记录value值
  - 二分法查询，当删除或添加数据时，会对空间重新调整，在大量数据的情况下，效率低于50%
  - 用的是copy数据，提供了数组收缩功能，在clear和remove后，会重新收缩数组，释放空间

- SparseArray

  - 一种特殊的ArrayMap，使用稀疏数组，可以在存储数据时节省内存空间
  - 只能存储int类型的key

- <font color= #FF0000>数据大于1000的时候推荐使用hashmap,数据500以下推荐使用arraymap,可以是整型的时候推荐使用SparseArray</font>

  

#### 20.HashMap和HashTable的区别

- `hashmap` 不是线程安全的，键不能重复，值可重复，允许key null，允许value null
- `HashTable`  是线程安全的，不允许key null，不允许value null， 效率低
- `hashmap` 有  containsValue 和 containsKey,`hashtable` 包含 contains
- `hashmap`是Map interface 的一个实现，`hashtable` 是继承Dictionary 类
- `Hashtable`和`HashMap`采用的hash/rehash算法都大概一样，所以性能不会有很大的差异



#### 21.HashMap与HashSet的区别

- `hashmap`实现了map接口，`hashset`实现了set接口
- `hashmap`存储键值对，`hashset`存储对象
- `hashmap`使用put添加元素，`hashset`使用add添加对象
- `hashmap`中使用键对象来计算hashcode，`hashset`使用成员对象来计算hashcode，如果hashcode相同，就用equals来判断，对象不相同返回false
- `HashSet`较`HashMap`来说比较慢
- 都是通过hash码和equals方法共同判断是否有重复元素，`hashset`是不允许添加，`hashmap`是替换旧值



#### 22.ArrayList和LinkedList的区别，以及应用场景

- `ArrayList`基于数组实现的，ArrayList线程不安全
- `LinkedList`是基于双链表实现的,线程不安全
- 使用场景
  - 如果应用程序对各个索引位置的元素进行大量的存取或删除操作，`ArrayList`对象要远优于`LinkedList`对象
  - 如果应用程序主要是对列表进行循环，并且循环时候进行插入或者删除操作，`LinkedList`对象要远优于`ArrayList`对象



#### 23.数组和链表的区别

- 数组
  - 在内存中，是一块连续的区域
  - 需要预留空间，在使用前先要申请占用内存的大小，可能会浪费内存空间
  - 插入数据和删除数据需要移动其他元素，因此效率低下
  - 随机读取效率很好，因为是连续的，知道每一个数据的内存地址，可以直接找到给定地址的数据
  - 不利于扩展，空间不够的时候需要重新定义数组
- 链表
  - 动态申请空间，可以在内存的任何地方，不要求连续
  - 每个数据都保存了下一条数据的内存地址
  - 增加数据和删除数据效率高
  - 查找效率低下，不具备随机访问，要从头开始查找
  - 不指定大小，扩展方便。不用定义大小，数据可以随意删除



#### 24.开启线程的三种方式？

- 继承Thread
- 实现Runnable
- 使用线程池



#### 25.run()和start()方法区别

- `start()`方法被用来启动新创建的线程，而且`start()`内部调用了`run()`方法
- 调用`run()`方法的时候，只会是在原来的线程中调用，没有新的线程启动



#### 26.如何控制某个方法允许并发访问线程的个数

- semaphore.acquire() 请求一个信号量，这时候的信号量个数-1，一旦为负数，就会阻塞

- semaphore.release() 释放一个信号量，此时信号量个数+1

- ```java
  import java.util.concurrent.Semaphore;
  
  public class Example {
      private Semaphore semaphore = new Semaphore(2); // 允许最多两个线程同时访问
  
      public void doSomething() {
          try {
              semaphore.acquire(); // 获取信号量，开始访问资源
              // 执行需要控制并发的代码块
          } catch (InterruptedException e) {
              e.printStackTrace();
          } finally {
              semaphore.release(); // 释放信号量，结束访问资源
          }
      }
  }
  ```



#### 27.在Java中wait和seelp方法的不同

- 相同点：
  - `sleep()`和`wait()`都可以暂停线程的执行
  - `wait()`和`sleep()`方法都会抛出InterruptedException异常，表示线程在等待或休眠过程中被中断。
- 不同点：
  - 所在类不同
    - `sleep()`是Thread类的静态方法
    - `wait()`是Object类的方法
  - 释放锁不同
    - `sleep()` 让出CPU给其他线程，监控状态依然保持着，时间到了会自动恢复，不会释放对象锁
    - `wait()` 进入此对象的等待锁定池，只有针对此对象调用notify()后该线程才会进入唤醒，会释放对象锁
  - 用途不同
    - `sleep()`  常用于一定时间内暂停线程执行
    - `wait()` 常用户线程间的交互和通信
  - 用法不同
    - `sleep()` 指定时间后，线程会自动苏醒
    - `wait()`  方法被调用后，可以通过 notify()或者notifyAll()（唤醒全部等待线程）唤醒wait的线程，需要重新获取锁才能继续执行



#### 28.什么导致线程阻塞？线程如何关闭

- 阻塞原因
  - 当线程等待输入/输出，会被阻塞，知道操作完成
  - 等待获取锁，当线程在同步代码块或方法中等待获取锁的时候，如果有其他线程占用了锁，就会被阻塞
  - 等待线程结束。当一个线程调用另一个线程的join()方法，它会被阻塞，直到另一个线程执行完毕
  - 等待计时器。调用`sleep()`方法
  - 线程调用wait()方法
- 2种方法关闭线程
  - 调用它里面的stop()方法，设置一个停止标记
  - 调用interrupt()方法中断线程，会抛出一个InterruptedException异常。捕获异常，然后break



#### 29.如何保证线程安全

- 什么是线程安全：多线程访问时，采用了加锁机制，当一个线程访问该类的某个数据时，进行保护，其他线程不能进行访问直到该线程读取完，其他线程才可使用。不会出现数据不一致或者数据污染

- 保证线程安全

  - 使用线程安全的类

  - `synchronized`同步代码块，一个时间内只有一个线程可以执行

  - 使用`Lock`(ReentrantLock)锁需要手动释放和开启。在并发量比较高的情况下，synchronized会让性能下降，此时使用Lock是个不错的方案

    ```java
    class Window implements Runnable{
    
        private int ticket = 100;
        //1.实例化ReentrantLock
        private ReentrantLock lock = new ReentrantLock();
    
        @Override
        public void run() {
            while(true){
                try{
                    //2.调用锁定方法lock()
                    lock.lock();
    
                    if(ticket > 0){
    
                        try {
                            Thread.sleep(100);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
    
                        System.out.println(Thread.currentThread().getName() + "：售票，票号为：" + ticket);
                        ticket--;
                    }else{
                        break;
                    }
                }finally {
                    //3.调用解锁方法：unlock()
                    lock.unlock();
                }
    
            }
        }
    }
    
    public class LockTest {
        public static void main(String[] args) {
            Window w = new Window();
    
            Thread t1 = new Thread(w);
            Thread t2 = new Thread(w);
            Thread t3 = new Thread(w);
    
            t1.setName("窗口1");
            t2.setName("窗口2");
            t3.setName("窗口3");
    
            t1.start();
            t2.start();
            t3.start();
        }
    }
    ```

    

  - ThreadLocal机制 来实现的

  - 多线程并发情况下，线程共享的变量改为方法局部级变量



#### 30.synchronized 和 volatile 关键字的区别

- `synchronized ` 作用于一段代码、方法、变量；`volatile ` 是变量的修饰符
- `volatile ` 用于在多个线程中保持一个变量的可见性，当一个线程修改了变量的值，其他线程能够立即看到最新的值，从而避免出现数据不一致的问题
- `synchronized ` 确保同一时间内只有一个线程可以访问，从而避免多线程之间的竞争和冲突，每个对象都有一个内部锁，先要获取内部锁才能访问。



#### 31.死锁的四个必要条件

- 互斥条件：一个资源一次只能被一个线程占用，直到该线程释放该资源
- 请求与保持条件：一个线程因请求资源而阻塞时，对已获得的资源保持不放
- 不可剥夺条件：线程已获得的资源，在未使用完之前，不能被其他线程强行剥夺，只能由自己释放。
- 循环等待条件：若干线程之间形成一种头尾相接的循环等待资源关系
- <font color= #FF0000>这四个条件同时满足时，才可能出现死锁</font>



#### 32.谈谈对Synchronized关键字，类锁，方法锁，重入锁的理解

- `Synchronized`是Java中的一个关键字，可以用来实现线程的同步。其作用是对一个对象或方法加锁，使得同一时刻只能有一个线程访问该对象或方法，从而保证线程安全

- 类锁：对类的所有实例对象进行同步，实现方式是在静态方法或代码块前加上synchronized关键字

- 方法锁：方法锁是指对某个方法进行同步，实现方式是在方法前加上synchronized关键字。由于每个实例对象都有一个锁，因此不同实例对象的方法之间是不互斥的

- 重入锁：ReentrantLock 的使用

  - 默认采用非公平锁，除非在构造方法中传入参数true

  - ```java
    //默认
    public ReentrantLock() {
        sync = new NonfairSync();
    }
    //传入true or false
    public ReentrantLock(boolean fair) {
        sync = fair ? new FairSync() : new NonfairSync();
    }
    ```

  - 公平锁：每个线程获取锁的顺序是按照线程访问锁的先后顺序获取的，最前面的线程总是最先获取到锁

  - 非公平锁：每个线程获取锁的顺序是随机的，并不会遵循先来先得的规则，所有线程会竞争获取锁。



#### 33.java中堆和栈有什么不同

- 堆和栈都是用于存储数据的内存区域
- 堆 (Heap):堆是 Java 中最大的内存区域，它用于存储动态分配的数据对象。堆是动态的，也就是说，当程序需要更多内存时，堆可以自动扩展。堆中的对象通常是动态生成的，例如，在运行时创建的对象或从数据库中检索的数据。堆也是垃圾回收器负责回收的主要区域之一
- 栈 (Stack):栈是 Java 中的局部变量区和方法返回地址区，它用于存储临时数据和函数调用时的局部变量和返回地址等信息。栈是静态分配的内存区域，也就是说，栈中的内存对象是在程序编译时就已经分配好了的。栈中的对象通常是静态的，例如，全局变量和静态变量



#### 34.java中引用分类

- 强引用

  - java中的引用默认就是强引用，任何一个对象的赋值操作就产生了对这个对象的强引用

  - 

    ```java
    public class StrongReferenceUsage {
    
        @Test
        public void stringReference(){
            Object obj = new Object();
        }}
    
    //这个obj就是new Object()的强引用
    ```

  - 特性是只要有强引用存在，被引用的对象就不会被垃圾回收

- 软引用

  - 软引用在java中有个专门的SoftReference类型，软引用的意思是只有在内存不足的情况下，被引用的对象才会被回收

  - ```java
       public void softReference(){
            Object obj = new Object();
            SoftReference<Object> soft = new SoftReference<>(obj);
            obj = null;
            log.info("{}",soft.get());
            System.gc();
            log.info("{}",soft.get());
        }
    //内存不足的时候，引用对象会被回收
    ```

  - 使用场景

    - 创建缓存的时候，创建的对象放进缓存中，当内存不足时，JVM就会回收早先创建的对象
    - 图片编辑器，视频编辑器之类的软件

- 弱引用

  - weakReference和softReference很类似，不同的是weekReference引用的对象只要垃圾回收执行，就会被回收，而不管是否内存不足

  - ```java
       public void weakReference() throws InterruptedException {
            Object obj = new Object();
            WeakReference<Object> weak = new WeakReference<>(obj);
            obj = null;
            log.info("{}",weak.get());
            System.gc();
            log.info("{}",weak.get());
        }
    ```

  - 使用场景

    - 防止handler内存泄漏
    - WeakHashMap的使用

- 虚引用

  - PhantomReference的作用是跟踪垃圾回收器收集对象的活动，在GC的过程中，如果发现有PhantomReference，GC则会将引用放到ReferenceQueue中，由程序员自己处理，当程序员调用ReferenceQueue.pull()方法，将引用出ReferenceQueue移除之后，Reference对象会变成Inactive状态，意味着被引用的对象可以被回收了

  - ```java
    public class PhantomReferenceUsage {
    
        @Test
        public void usePhantomReference(){
            ReferenceQueue<Object> rq = new ReferenceQueue<>();
            Object obj = new Object();
            PhantomReference<Object> phantomReference = new PhantomReference<>(obj,rq);
            obj = null;
            log.info("{}",phantomReference.get());
            System.gc();
            Reference<Object> r = (Reference<Object>)rq.poll();
            log.info("{}",r);
        }}
    ```

  - 使用场景

    - 大多被用于引用销毁前的处理工作，比如释放资源



#### 35.Java的类加载过程

- 编译

  - 即把我们写好的java文件，通过javac命令编译成字节码，也就是我们常说的.class文件

- 运行

  - 则是把编译生成的.class文件交给Java虚拟机(JVM)执行

- 过程

  - JVM虚拟机把.class文件中类信息加载进内存，并进行解析生成对应的class对象的过程
  - JVM不是一开始就把所有的类都加载进内存中，而是只有第一次遇到某个需要运行的类时才会加载，且只加载一次

- 类加载

  ![](./reference_graph/v2-ecf6c3d0f5146029e9693d6223d23afb_r.jpg)

  - 加载：指的是把class字节码文件从各个来源通过类加载器装载入内存中
    - **字节码来源**。一般的加载来源包括从本地路径下编译生成的.class文件，从jar包中的.class文件，从远程网络，以及动态代理实时编译
    - **类加载器**。一般包括**启动类加载器**，**扩展类加载器**，**应用类加载器**，以及用户的**自定义类加载器**。
  - 验证：主要是为了保证加载进来的字节流符合虚拟机规范，不会造成安全错误
  - 准备：主要是为类变量（注意，不是实例变量）分配内存，并且赋予**初值**
  - 解析：将常量池内的符号引用替换为直接引用的过程
  - 初始化：这个阶段主要是对**类变量**初始化，是执行类构造器的过程



------

### 面试复习-android篇

#### 1.线程和线程池的使用

- 线程
  - 实现线程的方法：参考`24条`
- 线程池
  - 预先创建一组线程并保存在一个池中。当需要执行任务时，从线程池中取出一个空闲线程来执行任务，任务执行完毕后线程不会被销毁，而是返回到线程池中等待下一次任务的分配
  - 优点：
    - 提高程序的性能，避免频繁创建和销毁线程的开销
    - 控制线程的数量和执行顺序，避免资源的浪费和竞争
    - 提高代码的可读性和可维护性，使代码更加清晰和易于理解
  - ExecutorService是最初的线程池接口，ThreadPoolExecutor类是对线程池的具体实现
    - corePoolSize，线程池中核心线程的数量
    - maximumPoolSize，线程池中的最大线程数
    - keepAliveTime，非核心线程的超时时长
    - unit，枚举时间单位
    - workQueue，线程池中的任务队列
  - 分类
    - FixedThreadPool:线程数量固定的线程池，该线程池的线程全部为核心线程，它们没有超时机制且排队任务队列无限制
    - cachedThreadPool：数量无限多的线程池，它所有的线程都是非核心线程，当有新任务来时如果没有空闲的线程则直接创建新的线程不会去排队而直接执行，并且超时时间都是60s，所以此线程池适合执行大量耗时小的任务
    - ScheduledTreadPool:有数量固定的核心线程，且有数量无限多的非核心线程，但是它的非核心线程超时时间是0s，所以非核心线程一旦空闲立马就会被回收
    - SingleThreadExecutor:内部只有一个核心线程，它确保所有任务进来都要排队按顺序执行。它的意义在于，统一所有的外界任务到同一线程中，让调用者可以忽略线程同步问题



#### 2.`Callable`和`Runnable`对比

- 返回值：`Callable`可以返回值，`Runnable`没有返回值
- 抛出异常：`Callable`可以抛出异常，`Runnable`不行
- 泛型：`Callable`是一个泛型接口，需要指定返回值类型，而`Runnable`则不需要
- 方法：`Callable`只有一个call()方法，而`Runnable`只有一个run()方法
- 使用方式：`Callable`通常与ExecutorService一起使用，而`Runnable`通常与Thread一起使用。
- 运行 `Callable` 任务可以拿到一个 Future 对象，表示异步计算的结果,通过 Future 对象可以了解任务执行情况，可取消任务的执行，还可获取执行结果



#### 3.FutureTask

实现了 Runnable 和 Future，所以兼顾两者优点，既可以在 Thread 中使用，又可以在 ExecutorService 中使用



#### 4.AsyncTask

- 它封装了线程池和Handler，主要为我们在子线程中更新UI提供便利
- new MyAsyncTask().execute() 开启    串行
- new MyAsyncTask().executeOnExecutor()  并行



#### 5.HandlerThread

- 它是个具有消息队列的线程，可以方便我们在子线程中处理不同的事务

- 我们不再需要HandlerThread时，我们通过调用quit/Safely方法来结束线程的轮询并结束该线程

- 在子线程中创建handler，需要有looper，所以可以轻松的创建子线程handler

  ```java
  HandlerThread handlerThread=new HandlerThread("xuan");
  handlerThread.start();//创建HandlerThread后一定要记得start();
  //通过HandlerThread的getLooper方法可以获取Looper
  Looper looper=handlerThread.getLooper();
  //通过Looper我们就可以创建子线程的handler了
  Handlr handler=new Handler(looper);
  //通过该handler发送消息，就会在子线程执行;
  ```

  



#### 6.Activity

- Activity的生命周期

  - 开始：onCreate() -> onStart() -> onResume() -> onPause() -> onStop() -> onDetroy()
  - 失去焦点：onPause() -> onStop()
  - 重新获得焦点：onReastart()->onStart() -> onResume()
  - 关闭：onPause() -> onStop()->onDestroy()
  - ![](./reference_graph/070ab4baa81941688d9174f717e61586~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.png)
  
- activity之间的通信方式

  - intent 传递数据
  - 接口回调
  - 广播
  - 数据库
  - 文件
  
- Activity和Fragment之间的数据通信
  - 接口回调
  - Bundle和setArgments(bundle)
  - EventBus
  - 广播
  - Handler

- 横竖屏切换的时候，Activity 各种情况下的生命周期

  - 不设置`android:configChanges=orientation|keyboardHidden|screenSize`，onPause->onSaveInstanceState(保存Activity中的数据，以便恢复的时候调用)->onStop->onDestroy->onCreate->onStart->onRestoreInstanceState(恢复状态数据)->onResume
  - 设置了`android:configChanges=orientation|keyboardHidden|screenSize`，onConfigChanged方法

- Activity与Fragment之间生命周期比较

  - `Fragment`生命周期

    - onAttach()->onCreate()->onCreateView()->onActivityCreated()->onStart()->onResume()->onPause()->onStop()->onDestroyView()->onDestroy()->onDetach()

  - 生命周期比较

    ![](./reference_graph/20170711193226098.png)
    
    
  
- Activity上有Dialog的时候按Home键时的生命周期

  - Dialog看作成Activity的一个满屏组件，不会影响其生命周期
  - 生命周期 onPause() -> onStop() 

  

- 两个Activity 之间跳转时必然会执行的是哪几个方法

  - A,B两个Activity，B进入，A会调用onPause()方法,然后B调用onCreate() ,onStart(), onResume()。这个时候B覆盖了A的窗体, A会调用onStop()方法
  - B是个透明的窗口,或者是对话框的样式, 就不会调用A的onStop()方法
  - B已经存在于Activity栈中，B就不会调用onCreate()方法

  

- Activity的四种启动模式对比

  - `standard` 标准启动模式，也是activity的默认启动模式
  - `singleTop` activity的实例已经存在于任务桟的桟顶，那么再启动这个Activity时，不会创建新的实例，而是重用位于栈顶的那个实例，并且会调用该实例的onNewIntent()方法将Intent对象传递到这个实例中
  - `singleTask` 一个activity的启动模式为singleTask，那么系统总会在一个新任务的最底部（root）启动这个activity，并且被这个activity启动的其他activity会和该activity同时存在于这个新任务中; 系统中已经存在这样的一个activity则会重用这个实例，并且调用他的onNewIntent()方法
  - `singleInstance` activity会自动运行于另一个任务中。当再次启动该activity的实例时，会重用已存在的任务和实例。并且会调用这个实例的onNewIntent()方法，将Intent实例传递到该实例中
  - `taskAffinity` 
    - 一个应用中的所有activity具有相同的taskAffinity，即应用程序的包名
    - 设置不同的taskAffinity属性给应用中的activity分组，也可以把不同的应用中的activity的taskAffinity设置成相同的值

- Activity状态保存于恢复

  - 使用本地储存：SharedPreferences
  - 使用数据库
  - 序列化对象为字符串，保存在SP文件中
  - 使用Intent
  
- Activity的启动过程

  ![](./reference_graph/1-1.png)

  - 当点击Launcher的icon开始，Launcher进程会像AMS发送点击icon的启动信息（这些信息就是在AndroidMainifest.xml中<intent-filter>标签定义的启动信息，数据由PackageManagerService解析出来）
  - AMS收到信息后会先后经过ActivityTaskManagerService->ActivityStartController->ActivityStarter内部类Request，然后把信息存到Request中，并通知Launcher进程让Activity休眠（补充个小知识点，这个过程会检测Activity在AndroidMainifest.xml的注册，如果没有注册就报错了）
  - Launcher进程的ApplicationThread对象收到消息后调用handlePauseActivity()进行暂停，并通知AMS已经暂停
  - AMS收到Launcher的已暂停消息后，会检查要启动的Activity所在的进程是否已经启动了，如果已经启动了就打开，如果未启动则通过Process.start(android.app.ActivityThread)来启动一个新的进程。
  - 进程创建好以后，会调用ActivityThread.main(),初始化MainLooper，并创建Application对象。然后Instrumentation.newApplication()反射创建Application，创建ContextImpl通过Application的attach方法与Application进行绑定，最终会调用Instrumentation.callApplicationOnCreate执行Application的onCreate函数进行一些初始化的工作。完成后会通知AMS进程已经启动好了
  - AMS收到app进程启动成功的消息后，从ActivityTaskManagerService中取出对应的Activity启动信息， 并通过ApplicationThreadProxy对象，调用其scheduleTransaction(ClientTransaction transaction)方法，具体要启动的Activity都在ClientTransaction对象中
  - app进程的ApplicationThread收到消息后会调用ActiivtyThread.sendMessage()，通过H发送Handler消息，在handleMessage方法的内部又会调用 mTransactionExecutor.execute(transaction);具体参考第3步
     最终调用performLaunchActivity方法创建activity和context并将其做关联，然后通过mInstrumentation.callActivityOnCreate()->Activity.performCreate()->Activity.onCreate()回调到了Activity的生命周期。

#### 7.Service

- Service的生命周期，启动方式
  - 直接启动  startService
    - 生命周期 onCreate->onStartConmon->StopService->onDestroy
    - ![](./reference_graph/1441907-3dbf045663fb54a5.webp)
    - 开启之后无法操作service，activity退出之后 service依旧存在
    - **startCommand()**能被多次调用
  - 绑定开启 bindService
    - onCreate-->onBind-->unBind-->onDestroy
    - ![](./reference_graph/1441907-08f50068b747b98d.webp)
    - 开启之后可以操作service，activity退出之后 service就销毁了



#### 8.广播broadcast

- 分类

  - 按照`发送方式`分类
    - 无序广播：同时收到，没有先后顺序可言，而且这种广播是没法被截断的
    - 有序广播：一个一个的接收，广播中的逻辑执行完成后，广播才会继续传播`Priority属性的值决定，值越大，优先级越高；Priority属性相同时，动态注册的广播优先于静态注册的广播`
  - 按照`注册方式`分类
    - 动态广播：代码中注册的
    - 静态广播：AndroidManifest中进行注册
  - 按照`定义方式`分类
    - 系统广播：每个系统广播都具有特定的intent-filter，主要包括具体的action，系统广播发出后，将被相应的BroadcastReceiver接收
    - 自定义广播：应用程序开发者自己定义的广播

- 广播的实现

  ```java
  public class MyBroadcastReceiver extends BroadcastReceiver {
      @Override
      public void onReceive(Context context, Intent intent) {
          Toast.makeText(context, "received in MyBroadcastReceiver", Toast.LENGTH_SHORT).show();
          abortBroadcast();
      }
  }
  ```

  ```java
  public class MainActivity extends AppCompatActivity {
  
      private IntentFilter intentFilter;
      private MyBroadcastReceiver myBroadcastReceiver;
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          intentFilter = new IntentFilter();
          intentFilter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
          myBroadcastReceiver = new MyBroadcastReceiver();
          registerReceiver(myBroadcastReceiver, intentFilter);
          
          Button button = (Button) findViewById(R.id.button);
          button.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  Intent intent = new Intent("android.net.conn.CONNECTIVITY_CHANGE");
                  sendBroadcast(intent); // 发送广播
              }
          });
      }
  
      @Override
      protected void onDestroy() {
          super.onDestroy();
          unregisterReceiver(myBroadcastReceiver);
      }
  }
  
  ```

- 静态实现

  ```javascript
          <receiver
              android:name=".MyBroadcastReceiver"
              android:enabled="true"
              android:exported="true">
              <intent-filter>
                  <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
              </intent-filter>
          </receiver>
  ```

  - `android:exported` 此BroadcastReceiver能否接收其他App发出的广播(其默认值是由receiver中有无intent-filter决定的，如果有intent-filter，默认值为true，否则为false)
  - `android:name` 广播名称
  - `android:enabled` 表示是否能被其他应用隐式调用

- APP退出了，也能接收到消息

  ```java
  //通过自定义广播设置标识FLAG_INCLUDE_STOPPED_PACKAGES
  Intent intent = new Intent();
  intent.setAction(BROADCAST_ACTION);
  intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
  sendBroadcast(intent);
  ```

  <font color= #FF0000>替代方案：通过将Service与App本身设置成不同的进程已经成为实现此类需求的可行替代方案</font>

- 广播安全性

  - `android:exported="false"`
  - 广播发送和接收时，都增加上相应的permission，用于权限验证
  - 发送广播时，指定特定广播接收器所在的包名，具体是通过intent.setPackage(packageName)指定
  - 采用LocalBroadcastManager的方式



#### 9.内容提供者ContentProvider

- 什么是ContentProvider？

  - Android的四大组件之一，以标准化的方式在Android 应用间共享数据
  - 封装的数据存储以及增删改查等，并且必须实现一个对外统一的接口(Uri)
  - Android系统内置的数据也是通过ContentProvider提供给用户使用，例如通讯录、音视频文件和图像文件等
  - 可以指定需要共享的数据，而其他应用程序则可以在不知道数据来源、路径的情况下，对共享数据进行增删改查等操作

- 什么是Uri?

  - Uri(通用资源标识符 Universal Resource Identifer)，代表数据操作的地址，每一个ContentProvider都会有唯一的地址

  - `ContentProvider`使用uri的语法结构

    - ```java
      content://authority/data_path/id
      ```

      

    - `content://` 是通用前缀，表示该Uri用于ContentProvider定位资源。

    - `authority` 授权者名称，用来确定具体哪一个ContentProvider提供资源。因此一般authority都由类的小写全称组成，以保证唯一性

    - `data_path` 是数据路径，用来确定请求的是哪个数据集

    - `id` 是数据编号，用来请求单条数据。如果是多条数据，这个字段忽略

      - ```java
              content://com.scc.userprovider/user多条
              content://com.scc.userprovider/user/10单条
        ```

- 什么是ContentResolver？

  - 数据调用者，ContentProvider将数据发布出来，通过ContentResolver对象结合Uri进行调用
  - 一般来说ContentProvider是单例模式，多个应用可通过ContentResolver调用ContentProvider的增删改查操作数据，ContentResolver调用的数据操作会让同一个ContentProvider处理

- 创建ContentProvider

  - 创建一个类让其继承ContentProvider，并重载6个函数

  - 实现的主要方法

    - insert、delete、update、query对数据集的增删改查操作
    - onCreate 用来初始化底层数据集和建立数据连接等工作
    - getType 用来返回指定Uri的MIME数据类型
      - 若Uri是单条数据，则返回的MIME数据类型以vnd.android.cursor.item开头
      - 若Uri是多条数据，则返回的MIME数据类型以vnd.android.cursor.dir/开头

  - 声明Uri规则，实现UriMatcher

    addUri()方法用来添加新的匹配项

    ```java
    public void addUri(String authority, String path, int code)
    ```

    - authority表示匹配的授权者名称
    - path表示数据路径
    - code表示返回代码

    

#### 10.进程间的通信方式

- 文件
- AIDL（基于Binder）
- Binder
- Messenger (基于Binder)
- ContentProvider（基于Binder）
- Socket



#### 10-1.AIDL

- 什么是AIDL？
  - Android Interface Definition Language 用于描述Android应用程序组件间通信接口的语言。AIDL被广泛用于客户端和服务端之间的进程间通信（IPC），包括远程调用、跨进程共享数据等
  - 支持在多个线程中并发访问和操作数据，使得Android应用程序在不同进程中的组件可以协同工作，实现更为丰富和灵活的功能
- AIDL 使用步骤
  - 定义AIDL接口
  - 实现AIDL接口
  - 注册服务：AndroidManifest.xml文件 中配置
  - 连接服务：通过bindService方法 
  - 调用服务：客户端通过已连接的Binder对象来调用远程服务的接口方法，从而实现进程间通信
  - 断开连接：当不再需要服务时，客户端应该调用unbindService()方法来断开与服务的连接，以释放资源
- AIDL支持哪些数据类型
  - 基本数据类型：byte、char、int、long、float、double、boolean
  - String类型
  - List类型：其中T可以是任何基本数据类型或自定义Parcelable类型
  - Array类型
  - Map类型
  - Parcelable类型
  - Binder对象



#### 10-2.Messenger

- 什么是Messenger
  - 信使，作为进程间通信之一，内部原理是AIDL,可以在不同进程之间传递Message对象，从而实现进程间通信
- 使用步骤
  - 该 Service 实现了一个 Handler，该 Handler 接收来自客户端的每次调用的回调
  - 该服务使用 Handler 创建一个 Messenger 对象（它是对 Handler 的引用）
  - Messenger 创建一个 IBinder，该服务从 onBind() 返回给客户端
  - 客户端使用 IBinder 来实例化 Messenger（引用服务的Handler），客户端使用 Handler 来向服务发送 Message 对象
  - 服务在其 Handler 的 handleMessage() 中接收每个消息



#### 11.webview 和 js 的调用方法

- android端调用 js的方法
  - 通过webview的loadUrl()
  - 通过webview的evaluatejavascript()
- js 调用 android的方法
  - 通过webview的addjavascriptInterface()进行映射
  - 通过webviewClient的shouldoverrideUrlLoading()回调拦截url
  - 通过webChromeClient的onJsAlert、onJsConfirm、onJsPrompt拦截js的对话框



#### 12.ANR

- ANR全名Application Not Responding, 也就是"应用无响应"。
- 产生原因
  - 5s内无法响应用户输入事件(例如键盘输入, 触摸屏幕等).
  - BroadcastReceiver在10s内无法结束
  - Service 20s内无法结束（低概率）
- 解决方案
  - 不要在主线程中做耗时的操作，而应放在子线程中来实现。如onCreate()和onResume()里尽可能少的去做创建操作
  - 应用程序应该避免在BroadcastReceiver里做耗时的操作或计算
  - service是运行在主线程的，所以在service中做耗时操作，必须要放在子线程中



#### 13.view的绘制流程

- ![](./reference_graph/hf6e6jt80h.png)

  - 每个`Activity`都会创建一个`Window`用于承载View视图的显示，Window`是一个抽象类存在了一个唯一实现类`PhoneWindow
  - DecorView：最顶层的View，是一个`FrameLayout`子类，最终会被加载到Window当中，它内部只有一个垂直方向的`LinearLayout`分为两部分
    - TitleBar：屏幕顶部的状态栏
    - ContentView：`Activity`对应的XML布局
  - 

- 绘制过程

  - View的绘制是从`ViewRootImpl`的`performTraversals()`方法开始，从最顶层的`View(ViewGroup)`开始逐层对每个`View`进行绘制操作

  - ```java
    private void performTraversals() {
         ...............
        //measur过程
        performMeasure(childWidthMeasureSpec, childHeightMeasureSpec);
         ...............
        //layout过程
        performLayout(lp, desiredWindowWidth, desiredWindowHeight);
         ...............
        //draw过程
        performDraw();
    }
    ```

  - onMeasure：为测量宽高过程，如果是ViewGroup还要在onMeasure中对所有子View进行measure操作

    - MeasureSpac 

      - **UNSPECIFIED ：**父布局不会对子View做任何限制，例如我们常用的`ScrollView`就是这种测量模式
      - **EXACTLY ：**精确数值，比如使用了`match_parent`或者xxxdp，表示父布局已经决定了子`View`的大小，通常在这种情况下`View`的尺寸就是`SpacSize`
      - **AT_MOST ：**自适应，对应`wrap_content`子View可以根据内容设置自己的大小，但前提是不能超出父`ViewGroup`的宽高

      ```java
          @Override
          protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
              super.onMeasure(widthMeasureSpec, heightMeasureSpec);
              int widthSize = MeasureSpec.getSize(widthMeasureSpec);
              int widthMode = MeasureSpec.getMode(widthMeasureSpec);
              int heightSize = MeasureSpec.getSize(heightMeasureSpec);
              int heightMode = MeasureSpec.getMode(heightMeasureSpec);
      
              //处理wrap_content的情况
              if (widthMode == MeasureSpec.AT_MOST && heightMode == MeasureSpec.AT_MOST) {
                  setMeasuredDimension(300, 300);
              } else if (widthMode == MeasureSpec.AT_MOST) {
                  setMeasuredDimension(300, heightSize);
              } else if (heightMode == MeasureSpec.AT_MOST) {
                  setMeasuredDimension(widthSize, 300);
              }
          }
      ```

      

  - onLayout：用于摆放View在ViewGroup中的位置，如果是ViewGroup要在onLayout方法中对所有子View进行layout操作。

  - onDraw: 往View上绘制图像。

  - ![](./reference_graph/w7rt5euzw7.png)



#### 14.android事件分发

- 事件分发本质

  将点击事件（MotionEvent）传递到某个具体的`View` & 处理的整个过程

- 事件在哪些对象之间进行传递

  Activity、ViewGroup、View

- 哪些方法协作完成

  - dispatchTouchEvent:分发传递点击事件
  - onTouchEvent:处理点击事件
  - onInterceptTouchEvent:拦截某个事件

- Activity事件分发

  ![](./reference_graph/b0af9a1ac00739ba8b3d0c3f1fa2b1ff.png)

- ViewGroup事件分发

  ![](./reference_graph/c74ff7657fd7db9234a0e257f5a50b8c.png)

- View事件分发

  ![](./reference_graph/0db5d1d4a719acd9955225a7881c9825.png)

- requestDisallowInterceptTouchEvent(Boolean)   告诉父类View是否拦截



#### 15.热修复原理

- java虚拟机（jvm）加载的类class，android虚拟机（dalvik/art vm）加载的是dex文件
- 它们加载类的时候都要用到一个类classloader,classloader有一个子类basedexclassloader中有个数组dexpathlist用来存放dex文件
- basedexclassloader通过调用findclass，实际上就是遍历数组，找对应的dex文件然后return
- 热修复的方法就是将新的dex添加到数组中去，在旧的dex之前，优先返回



#### 16.Android内存泄露及管理

- 内存溢出（oom）：是指程序在申请内存时，没有足够的内存空间供其使用，出现out of memory。内存溢出通俗的讲就是内存不够用
- 内存泄漏（memory leak）：是指程序在申请内存后，无法释放已申请的内存空间，一次内存泄露危害可以忽略，但内存泄露堆积后果很严重，无论多少内存,迟早会被占光
- 内存泄漏的原因：
  - hanlder引起的内存泄漏，解决将hanlder声明为静态内部类，如果hanlder需要引用context，通过弱引用的方式
  - 单利模式引起的内存泄漏，context使用applicationcontext
  - 非静态内部类创建静态实例引起内存泄漏，将内部类修改成静态的
  - 非静态匿名内部类引起的内存泄漏，将匿名内部类修改成静态的
  - 注册/反注册未成对使用引起内存泄漏，记得解绑
  - 资源对象没有关闭引起的内存泄漏
  - 集合对象没有及时清理引起的内存泄漏
- 内存泄露检测工具：LeakCanary



#### 17.APP优化

- 启动优化

  - 冷启动：系统中不存在该app的进程，此时启动app
  - 热启动：该app进程存在，只是处于后台，这个时候启动到前台来
  - 介于冷启动和热启动之间：back退出app，进程可能还在，但是activity需要重新创建
  - 优化方案：在application的onCreate中不要加载过多的sdk，activity渲染不要进行耗时操作，如果有放入线程中

- 布局优化

  尽量不要过于复杂的嵌套。可以使用<include>，<merge>，<ViewStub>，现在基本使用constrainlayout

- 响应优化

  - 页面布局过于复杂
  - UI线程过于复杂
  - 频繁的GC，大量的对象被创建又在短时间内被销毁

- 内存优化

- 电池使用优化

- 网络优化

  - api接口设计，不要频繁的去请求api接口
  - 用gzip压缩数据
  - 图片优化
    - 最好不要使用setImageBitmap、setImageResource、BitmapFactory.decodeResource（如果要用使用BitmapFactory.decodeStream）设置一张大图，因为这些方法在完成decode后，最终都是通过java层的createBitmap来完成的，需要消耗更多内存，多使用drawable
    - 不用的图片记得recycle()
    - 图片压缩：质量压缩，采样率压缩，缩放压缩，RGB_565(ALPHA_8,ARGB_4444,ARGB_8888,RGB_565)
  - 网络缓存



#### 18.handler机制---Looper、Handler、消息队列如何理解

- ![](./reference_graph/24957777-841c41ac6d629ac6.webp)
- 我们通过Looper.prepare()方法在当前线程创建了一个Looper对象，实际上创建了一个MessageQueue消息队列，所有的handler发送的消息都要进入这个队列
- 线程内部负责处理业务逻辑，looper负责消息的存取查阅，其中messagequeue是消息的存储结构，单链表形式，looper负责消息的轮询，handler负责发送和处理消息
- looper,线程,messagequeue是一一对应的，在不同的线程中它们各自有着对应的模块
- 主线程中系统已经默认的给它创建了一个Looper对象



#### 19.handler机制---ThreadLocal

- ThreadLocal

  并不是线程，它的作用是可以在每个线程中存储数据

- 基本使用

  当某些数据是以线程为作用域并且不同线程具有不同的数据副本的时候，就可以考虑采用ThreadLocal

- ```java
  private ThreadLocal myThreadLocal = new ThreadLocal<String>() {
      @Override
      protected String initialValue() {
          return "This is the initial value";
      }
  };
  //myThreadLocal.set("初始值”); 保存值
  //String threadLocalValue = (String) myThreadLocal.get(); 获取值
  ```

- 内存泄漏问题

  - ThreadLocalMap中的Entry中，ThreadLocal作为key，是作为弱引用进行存储的。当ThreadLocal不再被作为强引用持有时，会被GC回收，这时ThreadLocalMap对应的ThreadLocal就变成了null
  - value值是强引用，可能就存在内存泄漏的隐患了，推荐使用ThreadLocal.remove() 清除



#### 20.handler机制---Message的发送与取出

- 流程

  - 新建handler，发送消息sendMessage
  - 此时消息的创建obtain复用模式，后面可能会造成正在使用的异常，所以，需要加锁同步一下
  - 然后，消息进队，target(目的地的handler)和when(执行的时间系统开机时间+延时时间)
  - 判断的三个条件，是放进队首(队列中是空的，时间是0，时间在队列消息时间的前面)，还是队中(需要循环判断队列中是否还有消息和时间)
  - 通过loop方法取出来消息，通过这个消息的target发送消息

- Handler 发送消息的时候，不管是调用 `sendMessage`、`sendEmptyMessage`、`sendMessageDelayed` 还是其他发送一系列方法。最终都会调用 `sendMessageDelayed(Message msg, long delayMillis)` 方法

- 消息加入

  - 调用MessageQueue的enqueueMessage()方法，当消息进入到MessageQueue(消息队列)中时，已经按照等待时间进行了排序
  
- 获取消息

  - 调用MessageQueue中的next()方法

- 异步，屏蔽消息

  ```java
  //普通消息
  Message msg1 = Message.obtain(handler,new Runnable(){
  
      @Override
      public void run() {
          Log.v("hcy","这是一条延时3秒的消息");
      }
  });
  handler.sendMessageDelayed(msg1,3*1000);
  
  //异步屏蔽消息
  Message msg = Message.obtain(handler, new Runnable() {
      @Override
      public void run() {
          Log.v("hcy","这是一条延时5秒的异步消息");
          //异步消息处理完移除消息屏障
          try {
              Class<?> msgQueue = Class.forName("android.os.MessageQueue");
              Method removeSyncBarrier = msgQueue.getDeclaredMethod("removeSyncBarrier", int.class);
              removeSyncBarrier.invoke(Looper.myQueue(),token);
          }catch (Exception e){
              e.printStackTrace();
          }
  
      }
  });
  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
      //异步消息
      msg.setAsynchronous(true);
  }
  handler.sendMessageDelayed(msg,5*1000);
  try {
      //启动消息屏障
      Class<?> msgQueue = Class.forName("android.os.MessageQueue");
      Method postSyncBarrier = msgQueue.getDeclaredMethod("postSyncBarrier");
      token = (int) postSyncBarrier.invoke(Looper.myQueue());
  }catch (Exception e){
      e.printStackTrace();
  }
  Log.v("hcy","两条消息都发送完了");
  ```

  ```java
  //执行消息屏障
  try {
      Class<?> msgQueue = Class.forName("android.os.MessageQueue");
      Method postSyncBarrier = msgQueue.getDeclaredMethod("postSyncBarrier");
      token = (int) postSyncBarrier.invoke(Looper.myQueue());
  }catch (Exception e){
      e.printStackTrace();
  }
  
  //移除消息屏障
  try {
      Class<?> msgQueue = Class.forName("android.os.MessageQueue");
      Method removeSyncBarrier = msgQueue.getDeclaredMethod("removeSyncBarrier", int.class);
      removeSyncBarrier.invoke(Looper.myQueue(),token);
  }catch (Exception e){
      e.printStackTrace();
  }
  ```



#### 21.handler机制---Message的回收机制

- Handler指定删除单条消息，或所有消息的时候

  ```java
  removeMessages(Handler h, int what, Object object)
  removeCallbacksAndMessages(Handler h, Object object)
  removeMessages(Handler h, Runnable r, Object object)
  ```

- 2次循环

  - 第一次循环会将MessageQueue中，当前Handler发送的所有消息移除
  - MessageQueue中可能任然会残留没有移除掉的消息，所以需要第二次循环



#### 22.handler机制---循环消息队列的退出

- Looper.quitSafely()
  - MessageQueue.quit(true)->removeAllFutureMessagesLocked()
  - 会判断当前消息队列中的头消息的时间是否大于当前时间，如果大于当前时间就会removeAllMessagesLocked（）方法（也就是回收全部消息），反之，则回收部分消息，同时没有被回收的消息任然可以被取出执行
- Looper.quit()
  - MessageQueue.quit(flase)->removeAllMessagesLocked()
  - 非安全退出其实很简单，就是将所有消息队列中的消息全部回收



#### 23.handler机制---IdleHandler的理解和作用

- IdleHandler 的作用是 , 当消息队列 MessageQueue 中没有消息处理时 , 处于闲置状态时 , 此时就会回调一次用户注册的 IdleHandler 

- IdleHandler 的 queueIdle 方法返回 false , 那么该 IdleHandler 只会 执行一次

- IdleHandler 的 queueIdle 方法返回 true , 则 每次空闲 , 都要执行一次该 IdleHandler

- ```java
  import android.os.Looper;
  import android.os.MessageQueue;
   
  import java.util.LinkedList;
  import java.util.Queue;
   
  public class DelayTaskDispatcher {
      private Queue<Task> delayTasks = new LinkedList<>();
   
      private MessageQueue.IdleHandler idleHandler = new MessageQueue.IdleHandler() {
          @Override
          public boolean queueIdle() {
              if (delayTasks.size() > 0) {
                  Task task = delayTasks.poll();
                  if (task != null) {
                      task.run();
                  }
              }
              return !delayTasks.isEmpty(); //delayTasks非空时返回ture表示下次继续执行，为空时返回false系统会移除该IdleHandler不再执行
          }
      };
   
      public DelayTaskDispatcher addTask(Task task) {
          delayTasks.add(task);
          return this;
      }
   
      public void start() {
          Looper.myQueue().addIdleHandler(idleHandler);
      }
  }
  
  
  //使用系统Runnable接口自定义Task接口
  public interface Task extends Runnable {
   
  }
  
  
  //使用方法
  new DelayTaskDispatcher().addTask(new Task() {
              @Override
              public void run() {
                  Log.d(TAG, "DelayTaskDispatcher one task");
              }
          }).addTask(new Task() {
              @Override
              public void run() {
                  Log.d(TAG, "DelayTaskDispatcher two task");
              }
          }).start();
  ```

- 当 mIdleHanders 一直不为空时，为什么不会进入死循环？

  - 只有在 pendingIdleHandlerCount 为 -1 时，才会尝试执行 mIdleHander
  - pendingIdlehanderCount 在 next() 中初始时为 -1，执行一遍后被置为 0，所以不会重复执行




#### 24.Looper

- 通过Looper.loop()开启looper轮询，此时looper会不停的轮询消息队列中的数据，一有消息通过handler发出时，Looper就能捕获到这个消息
- handler调用dispatchMessage(msg)函数来最终处理这个消息
- 每个线程都有自己的Looper,非主线程我们是不可预期的。主线程永远只有一个，所以我们可以通过Looper.getMainLooper()随时获取主线程的Looper
- 当我们确定不再有消息的时候，调用Looper.quite()（立马退出）或Looper.quiteSately()（消息处理完后退出）方法退出Looper



#### 25.handler延迟原理

- handler每次发送消息最终都会调用`sendMessageDelayed(Message msg, long delayMillis)`

- MessageQueue中enqueueMessage方法主要负责将从handler发送过来的message根据when的大小来添加到单向链表中，when的数据越大在链表中的位置越靠后

- 消息获取到之后会检测当前时间与msg执行时间when，如果小于when，则通过nativePollOnce设置一个阻塞延迟唤醒，如果不是，则将该异步消息返回给handler去执行消费掉

- 如果正在等待超时时间过程中，又有新的消息发送过来呢 ？如何处理

  next方法中如果在阻塞等待后，mBlocked为true，在添加消息到链表之后，如果是添加在链表前面，则会调用唤醒方法停止阻塞，正常的去执行发送不需要延迟的消息



#### 26.Handler导致的内存泄露原因及其解决方案

- 创建handler的时候，是用的非静态内部类或者是匿名内部类。默认持有外部类的引用
- 当前Activity关闭的时候，会导致GC无法回收Activity
- 解决方案
  - 在Activity的onDestroy()中调用mHandler.**removeCallbacksAndMessages**(null)
  - 静态内部类+弱引用



#### 27.Android之点击Home键后再次打开导致APP重启问题

- 桌面的intent和创建Intent完全一致（完全一致定位为：启动类，action、category等等全部一样，不可多项也不可缺少），那么该Intent并不会触发Activity的新建启动，而只会将已经存在的对应Task移到前台

- 文件管理器使用的intent安装的APP，启动的intent没有和桌面的intent完全一致

- 解决办法

  - ```java
    //在启动页的onCreate方法中添加
    protected void onCreate(@Nullable Bundle savedInstanceState) { 
           super.onCreate(savedInstanceState);                
           // 避免从桌面启动程序后，会重新实例化入口类的activity        
           if (!this.isTaskRoot()) {            
               Intent intent = getIntent();            
               if (intent != null) {                
                  String action = intent.getAction();                
                  if (intent.hasCategory(Intent.CATEGORY_LAUNCHER) && 
                       Intent.ACTION_MAIN.equals(action)) {                   
                       finish();                   
                       return;                
                  }           
               }       
           }    
    }
    
    ```



#### 28.RecyclerView

- 布局管理器 LinearLayoutManager,GridLayoutManager,StaggeredGridLayoutManager
- 设置方向setOrientation(OrientationHelper. VERTICAL)
- 添加分割线addItemDecoration( new DividerGridItemDecoration(this ))
- 设置增加或删除条目 动画 setItemAnimator( new DefaultItemAnimator());
- 适配器继承RecyclerView.Adapter<VH>
  - 自定义ViewHolder继承RecyclerView.ViewHolder
  - onCreateViewHolder() 生成为每个Item inflater出一个View，但是该方法返回的是一个ViewHolder
  - onBindViewHolder() 渲染数据到View中
  - getItemCount()共有多少个条目





------

### 面试复习-网络篇

#### 1.计算机的网络体系结构

- OSI体系机构
  - （概念清楚 & 理念完整，但复杂 & 不实用）应用层，表示层，会话层，传输层，网络层，链路层，物理层
- tcp/ip体系结构
  - （含了一系列构成互联网基础的网络协议，是Internet的核心协议 & 被广泛应用于局域网 和 广域网）应用层，传输层，网络层，网络接口层
- 五层体系机构
  - 融合了OSI 与 TCP / IP的体系结构，目的是为了学习 & 讲解计算机原理）应用层，传输层，网络层，链路层，物理层
- ![](./reference_graph/1728872411-cea86bf421d3f8ac.jfif)



#### 2.Tcp协议

- transmissinon control protocol  传输控制协议

  - 基于tcp的应用层协议有
    - http：万维网
    - ftp：文件传输
    - telent：远程终端
    - smtp：电子邮件
  - 特点：面向连接，全双工通信，面向字节流，可靠
  - 缺点：效率慢（因为需要建立连接，发送确认等）
  - 应用场景：要求数据传输可靠，准确无误的传达给对方

- tcp传输的数据单元=报文段

  - 报文段=首部+数据
  - 首部：最小长度为20个字节
    - 序号：本报文段发送数据的第一个字节的序号,4个字节
    - 确认号（ACK）：期望收到对方下一个报文段的第一个数据字节的序号，4字节，若确认号为N表示序号N-1为止的所有数据都已经正确接受
    - 同步位（SYN）：连接建立时用于同步序号， SYN=1/ACK=0(连接请求报文段)；SYN=1/ACK=1(连接请求响应报文段)
    - 终止控制位（FIN）：释放连接， FIN=1 表示此报文段的发送方已经发送完数据，要求释放
  - ![](./reference_graph/1614350-20201209214135907-692951274.png)
    - `端口号`：端口号，用于多路复用或者分解来自（送到）上层的数据；
    - `序列号`：在连接建立时由计算机计算出的初始值，通过 SYN 包传给对端主机，每发送一次新的数据包，就**累加**一次该序列号的大小。用来解决网络包乱序问题
    - `确认应答号`：指下次期望收到的数据的序列号，发送端收到这个确认应答以后可以确认`确认应答号-1`的数据包已经被正常接收。主要用来解决不丢包的问；
    - `ACK` 用以指示确认字段中的值是有效的，即该报文段包括一个对已被成功接收的报文段的确认
    - `RST` 用以指示连接的强制拆除，当接收到错误连接时会发送RST位置为1的报文
    - `SYN` 用以指示连接的建立，该位为1的报文表示希望建立连接
    - `FIN` 用以指示连接的终止，该位为1的报文表示希望断开连接

- TCP的建立连接（三次握手）

  - ![](./reference_graph/1614350-20201209214154676-1864706572.png)
  - 一开始客户端和服务端都处于CLOSED的状态。然后先是服务端主动监听某个端口，处于LISTEN状态
  - 客户端会随机初始化序列号（client_isn），将此序列号置于TCP首部的**序列号**字段中，同时将**SYN**标志位置为1，表示该报文为**SYN**报文。接下来就将第一个SYN报文发送给服务端，表示向服务端发起连接，该报文不包含应用层数据，之后客户端处于 SYN-SENT (等待服务器确认) 状态
  - 服务端收到客户端的SYN报文后，首先服务端也随机初始化自己的序列号（server_isn），将此序号填入TCP首部的**序号**字段中，其次把TCP首部的确认应答号字段填入 `client_isn + 1`，接着把 SYN 和 ACK 标志位置为1。最后把该报文发给客户端，该报文也不包含应用层数据，之后服务端处于 SYN-RCVD 状态（服务器进入同步已发送状态）
  - 客户端收到服务端报文后，还要向服务端回应最后一个报文，首先应答报文 TCP 首部 ACK 标志位置为1，其次**确认应答号**字段填入 `server_isn + 1`，最后把报文发送给服务端，**这次报文可以携带客户端到服务器的数据**，之后客户端处于 **ESTABLISHED** 状态（进入创建状态，可以开始发送数据）。

- TCP建立连接为什么是三次握手？

  - 防止服务器因收到早已失效的连接请求报文，而一直等待客户端请求，最终导致死锁、浪费资源
  - 同步双方初始序列号
  - `两次握手` 无法防止历史连接的建立，会造成双方资源的浪费，也无法可靠的同步双方序列号
  - `四次握手` 三次握手就已经理论上最少可靠连接建立，所以不需要使用更多的通信次数

- TCP是无差错传输

  - 发送窗口：任意时刻，发送方维持一组连续的、允许发送帧的帧序号，对发送方进行流量控制
  - 接收窗口：任意时刻，接收方维持一组连续的、允许接收帧的帧序号，控制哪些数据帧可以接收哪些不行

- TCP终止连接（四次挥手）

  - 

  ![](./reference_graph/1614350-20201209214542927-1015763805.png)

  - TCP连接中的双方都可以主要断开连接，断开连接后的主机中的资源将被释放
  - 现在客户端与服务端都处在连接建立的状态，假设此时客户端想要关闭连接
  - 客户端发送一个 FIN 报文，用来关闭客户端到服务端的数据传送，也就是客户端告诉被服务端：我已经不会再给你发数据了(当然，在 FIN 包之前发送出去的数据，如果没有收到对应的 ACK 报文，客户端依旧会重发这些数据)，但此时客户端还可以接受数据；
  - 服务端收到 FIN 报文后，发送一个 ACK 给对方，确认序号为收到序号 + 1，此时服务端进入 CLOSED_WAIT 状态。客户端接收到 ACK 报文后，进入 FIN_WAIT_2 状态
  - 服务端发送一个 FIN 报文，用来关闭被动关闭方到主动关闭方的数据传送，也就是告诉主动关闭方，我的数据也发送完了，不会再给你发数据了，接下来服务端进入 LAST_ACK 状态
  - 客户端收到 FIN 报文之后，发送一个 ACK 给服务端，确认应答号为收到序号 + 1，此时客户端进入 TIME_WAIT 状态

- 为什么是四次挥手？

  - 关闭连接时，客户端向服务端发送 FIN 时，仅仅表示客户端不再发送数据了但是还能接收数据
  - 服务器收到客户端的 FIN 报文时，先回一个 ACK 应答报文，而服务端可能还有数据需要处理和发送，等服务端不再发送数据时，才发送 FIN 报文给客户端来表示同意现在关闭连接

- 与UPD协议的区别

  - `TCP`: 面向连接，传输可靠，字节流，传输效率慢，所需资源多，应用场景（文件传输，邮件传输），首部字节20-60
  - `UDP`: 无连接，传输不可靠，数据报文段，传输快，所需要资源少，要求通信速度高（域名转换），首部字节8



#### 3.UPD协议

- User Datagram Protocol 用户数据协议

  - 基于UDP应用层协议
    - TFTP
    - SNMP：网络管理
    - DNS：域名转换
  - 特点：无连接的，不可靠的，面向报文，无拥塞控制
    - 无连接的：使用udp传输数据前，不需要建立udp连接
    - 不可靠：UDP的数据包发送后，不管其是否会到达接收方
    - 面向报文：数据以数据报文（包）的形式传输
    - 无拥塞控制：由于是不可靠传输，即不管是否到达接收方，故不需要拥塞控制
  - 优点：速度快
  - 缺点：消息易丢失（特别是网络较差时）

- UDP数据组成

  - 首部字段+数据字段

  - 

  ![](./reference_graph/v2-75f9254b1870ff8f45dd614e91e2fa49_r.jpg)

  - 首部：8个字节，4个字段组成
    - `源端口` 源端口号。在需要对方回信时。不需要时可用全0
    - `目的端口` 目的端口号。这在终点交付报文时必须使用
    - `长度` UDP 用户数据报的长度，其最小值是8(仅有首部)
    - `检验和` 检测 UDP 用户数据报在传输中是否有错。有错就丢弃
    - `伪首部`  计算检验和(不向下传送，也不向上递交)，实际上不属于udp首部



#### 4.http协议

- Hyper Text Transfer Protocol 超文本传输协议

- 基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）,应用层协议

- 工作方式：采用 请求/响应的工作方式

- 交互方式：报文

  - 请求报文
  - 响应报文
  
- 请求报文
  - 请求行
    - 请求方法:8种，get、post、head、delete、put、trace、connect、option
    - 请求路径:url中的请求地址部分
    - 协议版本:定义http的版本号
  - 请求头
    - 采用”header（字段名）：value（值）“的方式
  - 请求体
    - 存放 需发送给服务器的数据信息
  
- 响应报文
  
  - 状态行
    - 协议版本
    - 状态码
    - 状态信息
  - 响应头：采用”header（字段名）：value（值）“的方式
  - 响应体：存放 需发送给客户端的数据信息
  
- GET 请求例子
  
  ```html
  GET /562f25980001b1b106000338.jpg HTTP/1.1
  Host    img.mukewang.com
  User-Agent    Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36
  Accept    image/webp,image/*,*/*;q=0.8
  Referer    http://www.imooc.com/
  Accept-Encoding    gzip, deflate, sdch
  Accept-Language    zh-CN,zh;q=0.8
  ```
  
- POST 请求例子
  
  ```html
  POST / HTTP1.1
  Host:www.wrox.com
  User-Agent:Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)
  Content-Type:application/x-www-form-urlencoded
  Content-Length:40
  Connection: Keep-Alive
  
  name=Professional%20Ajax&publisher=Wiley
  ```
  
- 响应消息格式
  
  ```html
  HTTP/1.1 200 OK
  Date: Fri, 22 May 2009 06:07:21 GMT
  Content-Type: text/html; charset=UTF-8
  
  <html>
        <head></head>
        <body>
              <!--body goes here-->
        </body>
  </html>
  ```
  
- http1.1比http1.0的优点
  
  - 引入持久连接，在同一个tcp的连接中可以传送多个http请求和响应
  - 多个请求&响应可以同时进行、可重叠
  - 引入更多的请求头&响应头

- http和https的区别
  
  - http：应用层，不加密，不安全，80端口，ca申请证书不需要，http：开头
  - https：传输层，加密，安全，433端口，ca申请证书需要，https：开头
  
#### 5.Socket

- 套接字，是应用层与TCP/IP协议族通信的中间软件抽象层，表现为一个封装了TCP/IP协议族的编程接口

  - socket不是一种协议，而是一个编程调用接口（api），属于传输层（主要解决数据如何在网络中传输）
  - 通过socket,我们才能再android平台上面通过tcp/ip协议进行开发
  - 对于用户来说，只需要调用socket去组织数据，以符合指定的协议，即可以通信

  ![](./reference_graph/944365-1a92e10c6c694d0f.webp)

- 套接字成对出现

  Socket ={(IP地址1:PORT端口号)，(IP地址2:PORT端口号)}

- 建立Socket连接过程

  - 客户端
    - 创建一个socket实例
    - 操作系统将为该socket实例分配一个未被使用的本地端口号
    - 操作系统创建一个含本地、远程地址、端口号的套接字数据结构（系统将一直保存该数据结构直到连接关闭）
    - 在创建的socket实例的构造函数正确返回前，进行tcp的三次握手协议
    - tcp握手协议完成后，socket实例对象创建完成
  - 服务端
    - 创建一个serversocket实例
    - 操作系统为该serversocket实例创建一个底层数据结构（包含指定监听的端口号、包含监听地址的通配符，通常是"*"，即监听所有地址）
    - 调用accept()方法时，将进入阻塞状态，等待客户端的请求
    - 当一个新的请求到来时，将为该连接创建一个新的套接字数据结构（含请求源地址和端口&关联到serversocket实例的一个未完成的连接数据结构列表中）
    - 等三次握手完成后，该服务端的socket实例才会返回&将该socket实例对应的数据结构从未完成列表中移到已完成列表中（所以serversocket所关联的列表中的每个数据结构，都代表与一个客户端的建立的tcp连接）

- Socket的使用类型有两种

  - 流套接字（streamsocket）：基于tcp协议，采用流的方式提供可靠的字节流服务
  - 数据报套接字（datagramsocket）：基于UDP协议，采用数据报文提供数据打包发送的服务

- Socket与Http对比

  - Socket属于传输层，因为 TCP / IP协议属于传输层，解决的是数据如何在网络中传输的问题
  - HTTP协议 属于 应用层，解决的是如何包装数据





  

  

  



























