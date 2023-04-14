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

    ```java
    private ThreadLocal myThreadLocal = new ThreadLocal<String>() {
        @Override
        protected String initialValue() {
            return "This is the initial value";
        }
    };
    
    //myThreadLocal.set("初始值”); 保存值
    //String threadLocalValue = (String) myThreadLocal.get(); 获取值
    ```
  
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



#### 33.java中堆和栈有什么不同

- 堆和栈都是用于存储数据的内存区域
- 堆 (Heap):堆是 Java 中最大的内存区域，它用于存储动态分配的数据对象。堆是动态的，也就是说，当程序需要更多内存时，堆可以自动扩展。堆中的对象通常是动态生成的，例如，在运行时创建的对象或从数据库中检索的数据。堆也是垃圾回收器负责回收的主要区域之一
- 栈 (Stack):栈是 Java 中的局部变量区和方法返回地址区，它用于存储临时数据和函数调用时的局部变量和返回地址等信息。栈是静态分配的内存区域，也就是说，栈中的内存对象是在程序编译时就已经分配好了的。栈中的对象通常是静态的，例如，全局变量和静态变量





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



#### 6.Activity

- Activity的生命周期

  onCreate() -> onStart() -> onResume() -> onPause() -> onStop() -> onDetroy()

- activity之间的通信方式

  - intent 传递数据
  - 接口回调
  - 广播
  - 数据库
  - 文件

- 











------



























