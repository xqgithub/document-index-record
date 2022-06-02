# Flutter

## 项目地址

https://github.com/xqgithub/TestMyFlutterDemo/tree/master/test_my_flutter_demo

## 使用镜像

由于在国内访问Flutter有时可能会受到限制，Flutter官方为中国开发者搭建了临时镜像，大家可以将如下环境变量加入到用户环境变量中：

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

## 系统要求

- Windows 7 或更高版本 (64-bit)
- [Git for Windows](https://git-scm.com/download/win) (Git命令行工具)
- 如果已安装Git for Windows，请确保命令提示符或PowerShell中运行 `git` 命令，不然在后面运行`flutter doctor`时将出现`Unable to find git in your PATH`错误, 此时需要手动添加`C:\Program Files\Git\bin`至`Path`系统环境变量中

## 获取Flutter SDK

1. 去flutter官网下载其最新可用的安装包，[点击下载](https://flutter.io/sdk-archive/#windows) 
2. 将安装包zip解压到你想安装Flutter SDK的路径（如：`C:\src\flutter`；注意，**不要**将flutter安装到需要一些高权限的路径如`C:\Program Files\`）。
3. 在Flutter安装目录的`flutter`文件下找到`flutter_console.bat`，双击运行并启动**flutter命令行**，接下来，你就可以在Flutter命令行运行flutter命令了

### 更新环境变量

要在终端运行 `flutter` 命令， 你需要添加以下环境变量到系统PATH：

- 转到 “控制面板>用户帐户>用户帐户>更改我的环境变量”
- 在“用户变量”下检查是否有名为“Path”的条目:
  - 如果该条目存在, 追加 `flutter\bin`的全路径，使用 `;` 作为分隔符.
  - 如果条目不存在, 创建一个新用户变量 `Path` ，然后将 `flutter\bin`的全路径作为它的值.
- 在“用户变量”下检查是否有名为”PUB_HOSTED_URL”和”FLUTTER_STORAGE_BASE_URL”的条目，如果没有，也添加它们。

重启Windows以应用此更改

## 创建Flutter app

### 一.基本结构介绍

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Welcome to Flutter'),
        ),
        body: const Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```

1. Material APP:[Material](https://material.io/guidelines/)是一种标准的移动端和web端的视觉设计语言。 Flutter提供了一套丰富的Material widgets。
2. main函数使用了(`=>`)符号, 这是Dart中单行函数或方法的简写。
3. 程序继承了 StatelessWidget，这将会使应用本身也成为一个widget。 在Flutter中，大多数东西都是widget，包括对齐(alignment)、填充(padding)和布局(layout)
4. Scaffold 是 Material library 中提供的一个widget, 它提供了默认的导航栏、标题和包含主屏幕widget树的body属性。widget树可以很复杂
5. widget的主要工作是提供一个build()方法来描述如何根据其他较低级别的widget来显示自己。
6. 本示例中的body的widget树中包含了一个Center widget, Center widget又包含一个 Text 子widget。 Center widget可以将其子widget树对其到屏幕中心

### 二.使用外部包(package)

1.  pubspec文件管理Flutter应用程序的assets(资源，如图片、package等)。 在pubspec.yaml中 添加外部应用包

   ```dart
   dependencies:
     flutter:
       sdk: flutter
   
   
     # The following adds the Cupertino Icons font to your application.
     # Use with the CupertinoIcons class for iOS style icons.
     cupertino_icons: ^1.0.2
   
     #打印日志
     logger: ^1.0.0
   ```

2. 在Android Studio的编辑器视图中查看pubspec时，单击右上角的 **Packages get**，这会将依赖包安装到您的项目。您可以在控制台中看到以下内容

   ```dart
   flutter packages get
   Running "flutter packages get" in startup_namer...
   Process finished with exit code 0
   ```

3. 在 **lib/main.dart** 中, 引入 `logger`

### 三.添加部件

1. Statelesswidgets 是不可变的, 这意味着它们的属性不能改变 - 所有的值都是最终的

2. Statefulwidgets 持有的状态可能在widget生命周期中发生变化. 实现一个 statefulwidget 至少需要两个类

   - 一个 StatefulWidget类
   - 一个 State类。 StatefulWidget类本身是不变的，但是 State类在widget生命周期中始终存在.

   ```dart
   import 'package:english_words/english_words.dart';
   import 'package:flutter/material.dart';
   
   void main() => runApp(const MyApp());
   
   class MyApp extends StatelessWidget {
     const MyApp({Key? key}) : super(key: key);
   
     @override
     Widget build(BuildContext context) {
       return MaterialApp(
         title: 'Welcome to Flutter',
         home: Scaffold(
           appBar: AppBar(
             title: const Text('Welcome to Flutter'),
           ),
           body: Center(
             // child: Text('Hello World'),
             child: RandomWords(),
           ),
         ),
       );
     }
   }
   
   class RandomWords extends StatefulWidget {
     @override
     State<StatefulWidget> createState() => RandomWordsState();
   }
   
   class RandomWordsState extends State<RandomWords> {
     @override
     Widget build(BuildContext context) {
       final wordPair = WordPair.random();
       return Text(wordPair.asPascalCase);
     }
   }
   ```

### 四.创建一个无限滚动ListView

1. 向RandomWordsState类中添加一个`_suggestions`列表以保存建议的单词对。 该变量以下划线（_）开头，在Dart语言中使用下划线前缀标识符，会强制其变成私有的；添加一个`biggerFont`变量来增大字体大小

2. 向RandomWordsState类添加一个 `_buildSuggestions()` 函数. 此方法构建显示建议单词对的ListView

3. 对于每一个单词对，`_buildSuggestions`函数都会调用一次`_buildRow`。 这个函数在ListTile中显示每个新词对，这使您在下一步中可以生成更漂亮的显示行

   ```dart
   import 'package:english_words/english_words.dart';
   import 'package:flutter/material.dart';
   import 'package:test_my_flutter_demo/PublicPracticalMethod.dart';
   
   void main() => runApp(const MyApp());
   
   class MyApp extends StatelessWidget {
     const MyApp({Key? key}) : super(key: key);
   
     @override
     Widget build(BuildContext context) {
       return MaterialApp(
         title: 'Welcome to Flutter',
         home: Scaffold(
           appBar: AppBar(
             title: const Text('Welcome to Flutter'),
           ),
           body: Center(
             // child: Text('Hello World'),
             child: RandomWords(),
           ),
         ),
       );
     }
   }
   
   class RandomWords extends StatefulWidget {
     @override
     State<StatefulWidget> createState() => RandomWordsState();
   }
   
   class RandomWordsState extends State<RandomWords> {
     final _suggestions = <WordPair>[];
     final _biggerFont = const TextStyle(fontSize: 18.0);
   
     @override
     Widget build(BuildContext context) {
       return Scaffold(
         appBar: AppBar(
           title: const Text('Startup Name Generator'),
         ),
         body: _buildSuggestions(),
       );
     }
   
     Widget _buildSuggestions() {
       return ListView.builder(
           padding: const EdgeInsets.all(16.0),
           // 对于每个建议的单词对都会调用一次itemBuilder，然后将单词对添加到ListTile行中
           // 在偶数行，该函数会为单词对添加一个ListTile row.
           // 在奇数行，该函数会添加一个分割线widget，来分隔相邻的词对。
           // 注意，在小屏幕上，分割线看起来可能比较吃力。
           itemBuilder: (context, i) {
             // 在每一列之前，添加一个1像素高的分隔线widget
             if (i.isOdd) return const Divider();
             // 语法 "i ~/ 2" 表示i除以2，但返回值是整形（向下取整），比如i为：1, 2, 3, 4, 5时，结果为0, 1, 1, 2, 2， 这可以计算出ListView中减去分隔线后的实际单词对数量
             final index = i ~/ 2;
             // 如果是建议列表中最后一个单词对
             if (index >= _suggestions.length) {
               // ...接着再生成10个单词对，然后添加到建议列表
               _suggestions.addAll(generateWordPairs().take(10));
             }
             return _buildRow(_suggestions[index]);
           });
     }
   
     Widget _buildRow(WordPair pair) {
       return ListTile(
         title: Text(
           pair.asPascalCase,
           style: _biggerFont,
         ),
       );
     }
   }
   ```

### 五.添加交互

1. 添加一个 `_saved` Set(集合) 到RandomWordsState。这个集合存储用户喜欢（收藏）的单词对。 在这里，Set比List更合适，因为Set中不允许重复的值
2. 在 `_buildRow` 方法中添加 `alreadySaved`来检查确保单词对还没有添加到收藏夹中
3. 同时在 `_buildRow()`中， 添加一个心形 ❤️ 图标到 ListTiles以启用收藏功能。接下来，你就可以给心形 ❤️ 图标添加交互能力了
4. 重新启动应用。你现在可以在每一行看到心形❤️图标️，但它们还没有交互
5. 在 `_buildRow`中让心形❤️图标变得可以点击。如果单词条目已经添加到收藏夹中， 再次点击它将其从收藏夹中删除。当心形❤️图标被点击时，函数调用`setState()`通知框架状态已经改变

<font color="#dd0000">提示: 在Flutter的响应式风格的框架中，调用setState() 会为State对象触发build()方法，从而导致对UI的更新</font>

## 路由管理

### 一.路由的意义

1. 路由（Route）在移动开发中通常指页面（Page），这跟 Web 开发中单页应用的 Route 概念意义是相同的，Route 在 Android中 通常指一个 Activity，在 iOS 中指一个 ViewController
2. 所谓路由管理，就是管理页面之间如何跳转，通常也可被称为导航管理
3. Flutter 中的路由管理和原生开发类似，无论是 Android 还是 iOS，导航管理都会维护一个路由栈，路由入栈（push）操作对应打开一个新页面，路由出栈（pop）操作对应页面关闭操作，而路由管理主要是指如何来管理路由栈

### 二.MaterialPageRoute

1. `MaterialPageRoute`继承自`PageRoute`类，`PageRoute`类是一个抽象类，表示占有整个屏幕空间的一个模态路由页面，它还定义了路由构建及切换时过渡动画的相关接口及属性

2. `MaterialPageRoute` 是 Material组件库提供的组件，它可以针对不同平台，实现与平台页面切换动画风格一致的路由切换动画：

   - 对于 Android，当打开新页面时，新的页面会从屏幕底部滑动到屏幕顶部；当关闭页面时，当前页面会从屏幕顶部滑动到屏幕底部后消失，同时上一个页面会显示到屏幕上。
   - 对于 iOS，当打开页面时，新的页面会从屏幕右侧边缘一直滑动到屏幕左边，直到新页面全部显示到屏幕上，而上一个页面则会从当前屏幕滑动到屏幕左侧而消失；当关闭页面时，正好相反，当前页面会从屏幕右侧滑出，同时上一个页面会从屏幕左侧滑入。

3. `MaterialPageRoute` 构造函数的各个参数的意义

   ```dart
     MaterialPageRoute({
       WidgetBuilder builder,
       RouteSettings settings,
       bool maintainState = true,
       bool fullscreenDialog = false,
     })
   ```

   - `builder` 是一个WidgetBuilder类型的回调函数，它的作用是构建路由页面的具体内容，返回值是一个widget。我们通常要实现此回调，返回新路由的实例。
   - `settings` 包含路由的配置信息，如路由名称、是否初始路由（首页）。
   - `maintainState`：默认情况下，当入栈一个新路由时，原来的路由仍然会被保存在内存中，如果想在路由没用的时候释放其所占用的所有资源，可以设置`maintainState`为 `false`。
   - `fullscreenDialog`表示新的路由页面是否是一个全屏的模态对话框，在 iOS 中，如果`fullscreenDialog`为`true`，新页面将会从屏幕底部滑入（而不是水平方向）。

<font color="#dd0000">如果想自定义路由切换动画，可以自己继承 PageRoute 来实现，我们将在后面介绍动画时，实现一个自定义的路由组件。</font>

### 三.Navigator

1. `Navigator`是一个路由管理的组件，它提供了打开和退出路由页方法
2. `Navigator`通过一个栈来管理活动路由集合。通常当前屏幕显示的页面就是栈顶的路由
3. `Navigator`提供了一系列方法来管理路由栈，在此我们只介绍其最常用的两个方法：
   - Future push(BuildContext context, Route route)：将给定的路由入栈（即打开新的页面），返回值是一个`Future`对象，用以接收新路由出栈（即关闭）时的返回数据。
   - bool pop(BuildContext context, [ result ])：将栈顶路由出栈，`result` 为页面关闭时返回给上一个页面的数据。
4. Navigator.push(BuildContext context, Route route)等价于Navigator.of(context).push(Route route)

### 四.路由传值

#### 非命名路由

```dart
class RouterTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        onPressed: () async {
          // 打开`TipRoute`，并等待返回结果
          var result = await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return TipRoute(
                  // 路由参数
                  text: "我是提示xxxx",
                );
              },
            ),
          );
          //输出`TipRoute`路由返回结果
          print("路由返回值: $result");
        },
        child: Text("打开提示页"),
      ),
    );
  }
}
```

#### 命令路由

命名路由（Named Route）即有名字的路由，我们可以先给路由起一个名字，然后就可以通过路由名字直接打开新的路由了，这为路由管理带来了一种直观、简单的方式。

##### 路由表

想使用命名路由，我们必须先提供并注册一个路由表（routing table），这样应用程序才知道哪个名字与哪个路由组件相对应。其实注册路由表就是给路由起名字

1. 注册一个路由

   ```dart
    routes:{
      "new_page":(context) => EchoRoute(),
     } ,
   ```

2. 路由页通过`RouteSetting`对象获取路由参数

   ```dart
   class EchoRoute extends StatelessWidget {
   
     @override
     Widget build(BuildContext context) {
       //获取路由参数  
       var args=ModalRoute.of(context).settings.arguments;
       //...省略无关代码
     }
   }
   ```

3. 打开路由时传递参数

   ```dart
   Navigator.of(context).pushNamed("new_page", arguments: "hi");
   ```

## Dart语言介绍

### 一.变量声明

1. var

   - 可以接收任何类型的变量，但最大的不同是 Dart 中 var 变量一旦赋值，类型便会确定则不能再改变其类型

     ```dart
     var t = "hi world";
     // 下面代码在dart中会报错，因为变量t的类型已经确定为String，
     // 类型一旦确定后则不能再更改其类型。
     t = 1000;
     ```

   - Dart 本身是一个强类型语言，任何变量都是有确定类型的，在 Dart 中，当用`var`声明一个变量后，Dart 在编译时会根据第一次赋值数据的类型来推断其类型，编译结束后其类型就已经被确定

2. **dynamic** 和 Object

   - `Object` 是 Dart 所有对象的根基类，也就是说在 Dart 中所有类型都是`Object`的子类(包括Function和Null)，所以任何类型的数据都可以赋值给`Object`声明的对象

   - `dynamic`与`Object`声明的变量都可以赋值任意对象，且后期可以改变赋值的类型，这和 `var` 是不同的

     ```dart
     dynamic t;
     Object x;
     t = "hi world";
     x = 'Hello Object';
     //下面代码没有问题
     t = 1000;
     x = 1000;
     ```

   - `dynamic`与`Object`不同的是`dynamic`声明的对象编译器会提供所有可能的组合，而`Object`声明的对象只能使用 `Object` 的属性与方法, 否则编译器会报错

3. final 和 const

   - 从未打算更改一个变量，那么使用 `final` 或 `const`，不是`var`，也不是一个类型

   - 一个 `final` 变量只能被设置一次

   - `const` 变量是一个编译时常量（编译时直接替换为常量值），`final`变量在第一次使用时被初始化

   - 被`final`或者`const`修饰的变量，变量类型可以省略

     ```dart
     //可以省略String这个类型声明
     final str = "hi world";
     //final String str = "hi world"; 
     const str1 = "hi world";
     //const String str1 = "hi world";
     ```

4. 空安全（null-safety）

   ```dart
   int i = 8; //默认为不可空，必须在定义时初始化。
   int? j; // 定义为可空类型，对于可空变量，我们在使用前必须判空。
   
   // 如果我们预期变量不能为空，但在定义时不能确定其初始值，则可以加上late关键字，
   // 表示会稍后初始化，但是在正式使用它之前必须得保证初始化过了，否则会报错
   late int k;
   k=9;
   ```

### 二.函数

1. 函数声明

   ```dart
   bool isNoble(int atomicNumber) {
     return _nobleGases[atomicNumber] != null;
   }
   ```

2. Dart函数声明如果没有显式声明返回值类型时会默认当做`dynamic`处理，注意，函数返回值没有类型推断

   ```dart
   typedef bool CALLBACK();
   
   //不指定返回类型，此时默认为dynamic，不是bool
   isNoble(int atomicNumber) {
     return _nobleGases[atomicNumber] != null;
   }
   
   void test(CALLBACK cb){
      print(cb()); 
   }
   //报错，isNoble不是bool类型
   test(isNoble);
   ```

3. 对于只包含一个表达式的函数，可以使用简写语法

   ```dart
   bool isNoble (int atomicNumber)=> true ;   
   ```

4. 函数作为变量

   ```dart
   var say = (str){
     print(str);
   };
   say("hi world");
   ```

5. 函数作为参数传递

   ```dart
   void execute(var callback) {
       callback();
   }
   execute(() => print("xxx"))
   ```

6. 可选的位置参数

   ```dart
   String say(String from, String msg, [String device]) {
     var result = '$from says $msg';
     if (device != null) {
       result = '$result with a $device';
     }
     return result;
   }
   ```

7. 可选的命名参数: 定义函数时，使用{param1, param2, …}，放在参数列表的最后面，用于指定命名参数

   ```dart
   //设置[bold]和[hidden]标志
   void enableFlags({bool bold, bool hidden}) {
       // ... 
   }
   ```

### 三.mixin

1. Dart 是不支持多继承的，但是它支持 mixin，简单来讲 mixin 可以 “组合” 多个类

   ```dart
   class Person {
     say() {
       print('say');
     }
   }
   
   mixin Eat {
     eat() {
       print('eat');
     }
   }
   
   mixin Walk {
     walk() {
       print('walk');
     }
   }
   
   mixin Code {
     code() {
       print('key');
     }
   }
   
   class Dog with Eat, Walk{}
   class Man extends Person with Eat, Walk, Code{}
   ```

2. 多个mixin 中有同名方法，with 时，会默认使用最后面的 mixin 的，mixin 方法中可以通过 super 关键字调用之前 mixin 或类中的方法

### 四.异步支持

1. Dart类库有非常多的返回`Future`或者`Stream`对象的函数。 这些函数被称为**异步函数**
2. `async`和`await`关键词支持了异步编程，允许您写出和同步代码很像的异步代码

#### Future

1. `Future`与JavaScript中的`Promise`非常相似，表示一个异步操作的最终完成（或失败）及其结果值的表示

2. 异步处理成功了就执行成功的操作，异步处理失败了就捕获错误或者停止后续操作。一个Future只会对应一个结果，要么成功，要么失败

3. `Future` 的所有API的返回值仍然是一个`Future`对象，所以可以很方便的进行链式调用。

4. Future一些API的使用

   - Future.then

     ```dart
     Future.delayed(Duration(seconds: 2),(){
        return "hi world!";
     }).then((data){
        print(data);
     });
     ```

   - Future.catchError

     ```dart
     Future.delayed(Duration(seconds: 2),(){
        //return "hi world!";
        throw AssertionError("Error");  
     }).then((data){
        //执行成功会走到这里  
        print("success");
     }).catchError((e){
        //执行失败会走到这里  
        print(e);
     });
     ```

   - Future.whenComplete

     ```dart
     Future.delayed(Duration(seconds: 2),(){
        //return "hi world!";
        throw AssertionError("Error");
     }).then((data){
        //执行成功会走到这里 
        print(data);
     }).catchError((e){
        //执行失败会走到这里   
        print(e);
     }).whenComplete((){
        //无论成功或失败都会走到这里
     });
     ```

   - Future.wait

     ```dart
     Future.wait([
       // 2秒后返回结果  
       Future.delayed(Duration(seconds: 2), () {
         return "hello";
       }),
       // 4秒后返回结果  
       Future.delayed(Duration(seconds: 4), () {
         return " world";
       })
     ]).then((results){
       print(results[0]+results[1]);
     }).catchError((e){
       print(e);
     });

#### Async/await

1. `async`用来表示函数是异步的，定义的函数会返回一个`Future`对象，可以使用 then 方法添加回调函数。

2. `await` 后面是一个`Future`，表示等待该异步任务完成，异步完成后才会往下走；`await`必须出现在 `async` 函数内部

   ```dart
   //先分别定义各个异步任务
   Future<String> login(String userName, String pwd){
   	...
       //用户登录
   };
   Future<String> getUserInfo(String id){
   	...
       //获取用户信息 
   };
   Future saveUserInfo(String userInfo){
   	...
   	// 保存用户信息 
   }; 
   
   
   task() async {
      try{
       String id = await login("alice","******");
       String userInfo = await getUserInfo(id);
       await saveUserInfo(userInfo);
       //执行接下来的操作   
      } catch(e){
       //错误处理   
       print(e);   
      }  
   }
   
   ```

#### Stream

1. `Stream` 也是用于接收异步事件数据，和 `Future` 不同的是，它可以接收多个异步操作的结果（成功或失败）
2. `Stream` 常用于会多次读取数据的异步任务场景，如网络内容下载、文件读写等

```dart
Stream.fromFutures([
  // 1秒后返回结果
  Future.delayed(Duration(seconds: 1), () {
    return "hello 1";
  }),
  // 抛出一个异常
  Future.delayed(Duration(seconds: 2),(){
    throw AssertionError("Error");
  }),
  // 3秒后返回结果
  Future.delayed(Duration(seconds: 3), () {
    return "hello 3";
  })
]).listen((data){
   print(data);
}, onError: (e){
   print(e.message);
},onDone: (){

});


I/flutter (17666): hello 1
I/flutter (17666): Error
I/flutter (17666): hello 3

```

## Flutter应用

### 一.widget介绍

#### widget概念

1. 在Flutter中几乎所有的对象都是一个 widget
2. Flutter 中的 widget 的概念更广泛，它不仅可以表示UI元素，也可以表示一些功能性的组件如：用于手势检测的 `GestureDetector` 、用于APP主题数据传递的 `Theme` 等等
3. Flutter 中是通过 Widget 嵌套 Widget 的方式来构建UI和进行实践处理的，所以记住，Flutter 中万物皆为Widget。

#### widget接口

1.  Widget 中定义的属性（即配置信息）必须是不可变的（final），Flutter 中如果属性发生则会重新构建Widget树，即重新创建新的 Widget 实例来替换旧的 Widget 实例。
2.  Flutter 开发中，我们一般都不用直接继承`Widget`类来实现一个新组件，相反，我们通常会通过继承`StatelessWidget`或`StatefulWidget`来间接继承`widget`类来实现。

#### Flutter中的四棵树

![](https://thumbnail1.baidupcs.com/thumbnail/739c693bdg72929dc8cd9b2989ceac7c?fid=604039242-250528-1379095029685&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-0iL4MpBoSJk1E0AhLXxRmZqFhMU%3d&expires=8h&chkbd=0&chkv=0&dp-logid=8764426155602539268&dp-callid=0&time=1647846000&size=c1920_u1080&quality=90&vuk=604039242&ft=image&autopolicy=1)

1. 三棵树中，Widget 和 Element 是一一对应的，但并不和 RenderObject 一一对应。比如 `StatelessWidget` 和 `StatefulWidget` 都没有对应的 RenderObject
2. 渲染树在上屏前会生成一棵 Layer 树，这个我们将在后面原理篇介绍，在前面的章节中读者只需要记住以上三棵树就行

#### StatelessWidget

1. `StatelessWidget`相对比较简单，它继承自`widget`类，重写了`createElement()`方法。
2. `StatelessWidget`用于不需要维护状态的场景，它通常在`build`方法中通过嵌套其它 widget 来构建UI，在构建过程中会递归的构建其嵌套的 widget。

#### Context

1. `build`方法有一个`context`参数，它是`BuildContext`类的一个实例，表示当前 widget 在 widget 树中的上下文，每一个 widget 都会对应一个 context 对象（因为每一个 widget 都是 widget 树上的一个节点）

   ```dart
   class ContextRoute extends StatelessWidget {
     @override
     Widget build(BuildContext context) {
       return Scaffold(
         appBar: AppBar(
           title: const Text("Context测试"),
         ),
         body: Container(
           child: Builder(builder: (context) {
             // 在 widget 树中向上查找最近的父级`Scaffold`  widget
             Scaffold? scaffold =
                 context.findAncestorWidgetOfExactType<Scaffold>();
             // 直接返回 AppBar的title， 此处实际上是Text("Context测试")
             return (scaffold?.appBar as AppBar).title!;
           }),
         ),
       );
     }
   }
   ```

#### StatefulWidget

1. `StatelessWidget`一样，`StatefulWidget`也是继承自`widget`类，并重写了`createElement()`方法，不同的是返回的Element 对象并不相同；另外`StatefulWidget`类中添加了一个新的接口`createState()`
2. `StatefulElement` 间接继承自`Element`类，与`StatefulWidget`相对应（作为其配置数据）。`StatefulElement`中可能会多次调用`createState()`来创建状态（State）对象
3. `createState()` 用于创建和 `StatefulWidget` 相关的状态，它在`StatefulWidget` 的生命周期中可能会被多次调用

#### State

1. StatefulWidget 类会对应一个 State 类，State表示与其对应的 StatefulWidget 要维护的状态，State 中的保存的状态信息可以:

   - 在 widget 构建时可以被同步读取
   - 在 widget 生命周期中可以被改变，当State被改变时，可以手动调用其`setState()`方法通知Flutter 框架状态发生改变，Flutter 框架在收到消息后，会重新调用其`build`方法重新构建 widget 树，从而达到更新UI的目的

2. State 中有两个常用属性:

   - `widget`，它表示与该 State 实例关联的 widget 实例，由Flutter 框架动态设置.State实例只会在第一次插入到树中时被创建，当在重新构建时，如果 widget 被修改了，Flutter 框架会动态设置State. widget 为新的 widget 实例
   - `context`。StatefulWidget对应的 BuildContext，作用同StatelessWidget 的BuildContext。

3. state生命周期

   ```dart
   ///State生命周期 测试
   class CounterWidget extends StatefulWidget {
     const CounterWidget({Key? key, this.initValue = 0}) : super(key: key);
   
     final int initValue;
   
     @override
     _CounterWidgetState createState() => _CounterWidgetState();
   }
   
   class _CounterWidgetState extends State<CounterWidget> {
     int _counter = 0;
   
     ///当 widget 第一次插入到 widget 树时会被调用，对于每一个State对象，Flutter 框架只会调用一次该回调
     @override
     void initState() {
       super.initState();
       _counter = widget.initValue;
       LogUtils.i('initState =-= ');
     }
   
     ///当State对象的依赖发生变化时会被调用
     @override
     void didChangeDependencies() {
       super.didChangeDependencies();
       LogUtils.i('didChangeDependencies =-= ');
     }
   
     ///主要是用于构建 widget 子树的，会在如下场景被调用:
     ///1.在调用initState()之后
     ///2.在调用didUpdateWidget()之后。
     ///3.在调用setState()之后。
     ///4.在调用didChangeDependencies()之后。
     @override
     Widget build(BuildContext context) {
       LogUtils.i('build =-= ');
       return Scaffold(
         body: Center(
           child: TextButton(
             child: Text('$_counter'),
   
             ///点击后计数器自增
             onPressed: () {
               setState(() {
                 ++_counter;
               });
             },
           ),
         ),
       );
     }
   
     ///在 widget 重新构建时，Flutter 框架会调用widget.canUpdate来检测 widget 树中同一位置的新旧节点，然后决定是否需要更新
     @override
     void didUpdateWidget(covariant CounterWidget oldWidget) {
       super.didUpdateWidget(oldWidget);
       LogUtils.i('didUpdateWidget =-= ');
     }
   
     ///当 State 对象从树中被移除时，会调用此回调
     @override
     void deactivate() {
       super.deactivate();
       LogUtils.i('deactivate =-= ');
     }
   
     ///当 State 对象从树中被永久移除时调用；通常在此回调中释放资源
     @override
     void dispose() {
       super.dispose();
       LogUtils.i('dispose =-= ');
     }
   
     ///此回调是专门为了开发调试而提供的，在热重载(hot reload)时会被调用，此回调在Release模式下永远不会被调用
     @override
     void reassemble() {
       super.reassemble();
       LogUtils.i('reassemble =-= ');
     }
   }
   ```

   - 打开路由进入页面，initState -> didChangeDependencies -> build

   - 热重载,reassemble -> didUpdateWidget -> build

   - 在 widget 树中移除`CounterWidget`然后重载，reassemble -> deactive -> dispose

   - 退出该页面，deactivate -> dispose

     ![](https://thumbnail1.baidupcs.com/thumbnail/054552ce6idf49265158b9b957692a1f?fid=604039242-250528-427919126093998&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-Cj11NHQVy7hS1bQRsfxIDNJlaq4%3d&expires=8h&chkbd=0&chkv=0&dp-logid=8654948495871356607&dp-callid=0&time=1651730400&size=c1920_u1080&quality=90&vuk=604039242&ft=image&autopolicy=1)

#### 在widget树中获取State对象

1. 通过Context获取

   - `context`对象有一个`findAncestorStateOfType()`方法，该方法可以从当前节点沿着 widget 树向上查找指定类型的 StatefulWidget 对应的 State 对象

     ```dart
     // 查找父级最近的Scaffold对应的ScaffoldState对象
     ScaffoldState _state = context.findAncestorStateOfType<ScaffoldState>()!;
     ```

   - `Scaffold`也提供了一个`of`方法，我们其实是可以直接调用它

     ```dart
     // 直接通过of静态方法来获取ScaffoldState
      ScaffoldState _state=Scaffold.of(context);
     ```

2. 通过GlobalKey

   - 给目标`StatefulWidget`添加`GlobalKey`

     ```dart
     //定义一个globalKey, 由于GlobalKey要保持全局唯一性，我们使用静态变量存储
     static GlobalKey<ScaffoldState> _globalKey= GlobalKey();
     ...
     Scaffold(
         key: _globalKey , //设置key
         ...  
     )
     ```

   - 通过`GlobalKey`来获取`State`对象

     ```dart
     _globalKey.currentState.openDrawer()
     ```

   - 如果一个 widget 设置了`GlobalKey`，那么我们便可以通过`globalKey.currentWidget`获得该 widget 对象;`globalKey.currentElement`来获得 widget 对应的element对象;当前 widget 是`StatefulWidget`，则可以通过`globalKey.currentState`来获得该 widget 对应的state对象

     <font color="#dd0000">使用 GlobalKey 开销较大，如果有其他可选方案，应尽量避免使用它。另外，同一个 GlobalKey 在整个 widget 树中必须是唯一的，不能重复。</font>

#### 通过RenderObject自定义Widget

1. `StatelessWidget` 和 `StatefulWidget` 都是用于组合其它组件的，它们本身没有对应的 RenderObject

2. Flutter 组件库中的很多基础组件都不是通过`StatelessWidget` 和 `StatefulWidget` 来实现的，比如 Text 、Column、Align等

3. 积木都是通过自定义 RenderObject 来实现的

   - 如果组件不会包含子组件，则我们可以直接继承自 LeafRenderObjectWidget

   - 自定义的 widget 可以包含子组件，则可以根据子组件的数量来选择继承SingleChildRenderObjectWidget 或 MultiChildRenderObjectWidget

     ```dart
     class CustomWidget extends LeafRenderObjectWidget{
       @override
       RenderObject createRenderObject(BuildContext context) {
         // 创建 RenderObject
         return RenderCustomObject();
       }
       @override
       void updateRenderObject(BuildContext context, RenderCustomObject  renderObject) {
         // 更新 RenderObject
         super.updateRenderObject(context, renderObject);
       }
     }
     
     class RenderCustomObject extends RenderBox{
     
       @override
       void performLayout() {
         // 实现布局逻辑
       }
     
       @override
       void paint(PaintingContext context, Offset offset) {
         // 实现绘制
       }
     }
     ```

#### Flutter SDK 内置组件库介绍

##### 基础组件

1. 导包：package:flutter/widgets.dart
2. Text:该组件可让您创建一个带格式的文本
3. Row、Colum：这些具有弹性空间的布局类 widget 可让您在水平（Row）和垂直（Column）方向上创建灵活的布局
4. Stack：取代线性布局，允许子 widget 堆叠， 你可以使用Positioned来定位他们相对Stack的上下左右四条边的位置。
5. Container：可让您创建矩形视觉元素。可以装饰一个BoxDecoration，如background、一个边框、或者一个阴影。具有边距（margins）、填充(padding)和应用于其大小的约束(constraints)。可以使用矩阵在三维空间中对其进行变换

##### Material组件

1. 导包：package:flutter/material.dart
2. Scaffold、AppBar、TextButton等

##### Cupertino组件

IOS风格UI

### 二.状态管理

#### 管理状态的最常见的方法

1. Widget 管理自己的状态。
2. Widget 管理子 Widget 状态。
3. 混合管理（父 Widget 和子 Widget 都管理状态）。

#### 如何决定哪种管理方法

1. 如果状态是用户数据，如复选框的选中状态、滑块的位置，则该状态最好由父 Widget 管理
2. 如果状态是有关界面外观效果的，例如颜色、动画，那么状态最好由 Widget 本身来管理
3. 果某一个状态是不同 Widget 共享的则最好由它们共同的父 Widget 管理



#### Widget管理自身状态

- 管理TapboxA的状态
- 定义`_active`：确定盒子的当前颜色的布尔值。
- 定义`_handleTap()`函数，该函数在点击该盒子时更新`_active`，并调用`setState()`更新UI。
- 实现widget的所有交互式行为。

```dart
class WidgetStateManagement extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return TapboxA();
  }
}

///Widget管理自身状态
class TapboxA extends StatefulWidget {
  TapboxA({Key? key}) : super(key: key);

  @override
  _TapboxAState createState() => _TapboxAState();
}

class _TapboxAState extends State<TapboxA> {
  ///确定盒子的当前颜色的布尔值。
  bool _active = false;

  ///设置开关状态
  void _handleTap() {
    setState(() {
      _active = !_active;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        child: Center(
          child: Text(
            _active ? 'Active' : 'Inactive',
            style: const TextStyle(
                fontSize: 32.0,
                color: Colors.white,
                decoration: TextDecoration.none),
          ),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
          color: _active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
      ),
    );
  }
}
```

#### 父Widget管理子Widget的状态

- 为TapboxB 管理`_active`状态

- 实现`_handleTapboxChanged()`，当盒子被点击时调用的方法。

- 当状态改变时，调用`setState()`更新UI。

  ```dart
  class WidgetStateManagement extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return ParentWidget();
    }
  }
  
  ///父Widget管理子Widget的状态
  class ParentWidget extends StatefulWidget {
    @override
    _ParentWidgetState createState() => _ParentWidgetState();
  }
  
  class _ParentWidgetState extends State<ParentWidget> {
    ///确定盒子的当前颜色的布尔值。
    bool _active = false;
  
    ///设置开关状态
    void _handleTapboxChanged(bool newValue) {
      setState(() {
        _active = !_active;
      });
    }
  
    @override
    Widget build(BuildContext context) {
      return Container(
        color: Colors.white,
        child: TapboxB(active: _active, onChanged: _handleTapboxChanged),
      );
    }
  }
  
  class TapboxB extends StatelessWidget {
    TapboxB({Key? key, this.active = false, required this.onChanged})
        : super(key: key);
  
    final bool active;
    final ValueChanged<bool> onChanged;
  
    void _handleTap() {
      onChanged(!active);
    }
  
    @override
    Widget build(BuildContext context) {
      return GestureDetector(
        onTap: _handleTap,
        child: Center(
          child: Container(
            child: Text(
              active ? 'Active' : 'Inactive',
              style: const TextStyle(
                  fontSize: 32.0,
                  color: Colors.white,
                  decoration: TextDecoration.none),
            ),
            alignment: Alignment.topLeft,
            width: 500.0,
            height: 250.0,
            padding: const EdgeInsets.fromLTRB(20.0, 10.0, 0.0, 0.0),
            margin: const EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 0.0),
            decoration: BoxDecoration(
              color: active ? Colors.lightGreen[700] : Colors.grey[600],
              border: Border.all(
                width: 2.0,
                color: Colors.red,
              ),
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
      );
    }
  }
  ```

#### 混合状态管理

1. `_ParentWidgetStateC`类:
   - 管理`_active` 状态
   - 实现 `_handleTapboxChanged()` ，当盒子被点击时调用。
   - 当点击盒子并且`_active`状态改变时调用`setState()`更新UI。

2. `_TapboxCState` 对象:

   - 管理`_highlight` 状态
   - `GestureDetector`监听所有tap事件。当用户点下时，它添加高亮（深绿色边框）；当用户释放时，会移除高亮
   - 当按下、抬起、或者取消点击时更新`_highlight`状态，调用`setState()`更新UI。
   - 当点击时，将状态的改变传递给父组件

   ```dart
   class WidgetStateManagement extends StatelessWidget {
     @override
     Widget build(BuildContext context) {
       return ParentWidgetC();
     }
   }
   
   ///混合状态管理
   class ParentWidgetC extends StatefulWidget {
     @override
     _ParentWidgetCState createState() => _ParentWidgetCState();
   }
   
   class _ParentWidgetCState extends State<ParentWidgetC> {
     bool _active = false;
   
     void _handleTapboxChanged(bool newValue) {
       setState(() {
         _active = newValue;
       });
     }
   
     @override
     Widget build(BuildContext context) {
       return Container(
         color: Colors.white,
         child: TapboxC(active: _active, onChanged: _handleTapboxChanged),
       );
     }
   }
   
   class TapboxC extends StatefulWidget {
     const TapboxC({Key? key, this.active = false, required this.onChanged})
         : super(key: key);
   
     final bool active;
     final ValueChanged<bool> onChanged;
   
     @override
     _TapboxCState createState() => _TapboxCState();
   }
   
   class _TapboxCState extends State<TapboxC> {
     bool _highlight = false;
   
     void _handleTapDown(TapDownDetails details) {
       setState(() {
         _highlight = true;
       });
     }
   
     void _handleTapUp(TapUpDetails details) {
       setState(() {
         _highlight = false;
       });
     }
   
     void _handleTapCancel() {
       setState(() {
         _highlight = false;
       });
     }
   
     void _handleTap() {
       widget.onChanged(!widget.active);
     }
   
     @override
     Widget build(BuildContext context) {
       return GestureDetector(
         onTapDown: _handleTapDown,
         //处理按下事件
         onTapUp: _handleTapUp,
         //处理抬起事件
         onTap: _handleTap,
         onTapCancel: _handleTapCancel,
         child: Center(
           child: Container(
             child: Text(
               widget.active ? 'Active' : 'Inactive',
               style: const TextStyle(
                   fontSize: 32.0,
                   color: Colors.white,
                   decoration: TextDecoration.none),
             ),
             alignment: Alignment.topLeft,
             width: 500.0,
             height: 250.0,
             padding: const EdgeInsets.fromLTRB(20.0, 10.0, 0.0, 0.0),
             margin: const EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 0.0),
             decoration: BoxDecoration(
               color: widget.active ? Colors.lightGreen[700] : Colors.grey[600],
               border: _highlight
                   ? Border.all(
                       width: 2.0,
                       color: Colors.red,
                     )
                   : null,
               borderRadius: BorderRadius.circular(12),
             ),
           ),
         ),
   
       );
     }
   }
   ```

### 三.包管理

1. 可共享的独立模块统一称为“包”（ Package）

2. 包的结构说明：

   ```yaml
   name: flutter_in_action
   description: First Flutter Application.
   
   version: 1.0.0+1
   
   dependencies:
     flutter:
       sdk: flutter
     cupertino_icons: ^0.1.2
   
   dev_dependencies:
     flutter_test:
       sdk: flutter
       
   flutter:
     uses-material-design: true
   ```

   - name:应用或包名称
   - description:应用或包的描述、简介
   - version：应用或包的版本号
   - dependencies:应用或包依赖的其它包或插件
   - dev_dependencies：开发环境依赖的工具包（而不是flutter应用本身依赖的包）
   - flutter:flutter相关的配置选项

#### pub仓库

Pub（https://pub.dev/ ）是 Google 官方的 Dart Packages 仓库，类似于 node 中的 npm仓库、Android中的 jcenter。我们可以在 Pub 上面查找我们需要的包和插件，也可以向 Pub 发布我们的包和插件。我们将在后面的章节中介绍如何向 Pub 发布我们的包和插件

#### 其他依赖方式

- 依赖本地包

  ```yaml
  dependencies:
  	pkg1:
          path: ../../code/pkg1
              
   //路径可以是相对的，也可以是绝对的
  ```

- 依赖Git：你也可以依赖存储在Git仓库中的包。如果软件包位于仓库的根目录中，请使用以下语法

  ```yaml
  dependencies:
    pkg1:
      git:
        url: git://github.com/xxx/pkg1.git
  ```

- 不是这种情况，可以使用path参数指定相对位置

  ```yaml
  dependencies:
    package1:
      git:
        url: git://github.com/flutter/packages.git
        path: packages/package1  
  ```

### 四.资源管理

#### 指定assets

```yaml
flutter:
  uses-material-design: true
  assets:
      - assets/images/
```

- `assets`指定应包含在应用程序中的文件， 每个 asset 都通过相对于`pubspec.yaml`文件所在的文件系统路径来标识自身的路径。asset 的声明顺序是无关紧要的，asset的实际目录可以是任意文件夹

#### Asset变体(variant)

- …/graphics/my_icon.png
- …/graphics/background.png
- …/graphics/dark/**background.png**

```yaml
flutter:
  assets:
    - graphics/background.png
```

#### 指定assets中的字体

```yaml
  fonts:
    - family: Charmonman
      fonts:
        - asset: assets/fonts/Charmonman-Bold.ttf
        - asset: assets/fonts/Charmonman-Regular.ttf
          weight: 500
    - family: Iconfont
      fonts:
        - asset: assets/fonts/iconfont.ttf
```

#### 加载assets资源中的图片

1. 加载assets中的图片

   - Image.asset("assets/images/iocn_diqiu.png", width: 60, height: 60)

   - Image(image: AssetImage("assets/images/error_null.png"),width: 60,height: 60)

     ```dart
     class LoadAssets extends StatelessWidget {
       @override
       Widget build(BuildContext context) {
         return Scaffold(
           appBar: AppBar(
             title: const Text('加载assets文件中的内容'),
           ),
           body: LoadAssetsImg(),
         );
       }
     }
     
     ///加载图片
     class LoadAssetsImg extends StatefulWidget {
       @override
       _LoadAssetsImgState createState() => _LoadAssetsImgState();
     }
     
     class _LoadAssetsImgState extends State<LoadAssetsImg> {
       @override
       Widget build(BuildContext context) {
         return Column(
           mainAxisAlignment: MainAxisAlignment.start,
           crossAxisAlignment: CrossAxisAlignment.end,
           children: <Widget>[
             Row(
               children: [
                 Image.asset("assets/images/iocn_diqiu.png", width: 60, height: 60),
               ],
             ),
             const Image(
                 image: AssetImage("assets/images/error_null.png"),
                 width: 60,
                 height: 60),
           ],
         );
       }
     }
     ```

2. 加载依赖包中的资源图片

   - AssetImage('icons/heart.png', package: 'my_icons')
   - Image.asset('icons/heart.png', package: 'my_icons')

   假设您的应用程序依赖一个名为"my_icons"的包 

#### 加载文本assets

- 通过`rootBundle`对象加载：全局静态的`rootBundle`对象来加载asset即可

  ```dart
  import 'dart:async' show Future;
  import 'package:flutter/services.dart' show rootBundle;
  
  Future<String> loadAsset() async {
    return await rootBundle.loadString('assets/config.json');
  }
  ```

  

- 通过DefaultAssetBundle对象加载：建议使用 `DefaultAssetBundle`来获取当前 BuildContext 的AssetBundle

  ```dart
  import 'dart:convert' show json;
  import 'package:flutter/material.dart';
  
  ///加载json文件
  class JsonView extends StatefulWidget {
    @override
    State<StatefulWidget> createState() {
      return new _JsonViewState();
    }
  }
  
  class _JsonViewState extends State<JsonView> {
    @override
    Widget build(BuildContext context) {
      return new FutureBuilder(
          future:
              DefaultAssetBundle.of(context).loadString("assets/country.json"),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              List<dynamic> data = json.decode(snapshot.data.toString());
              return ListView.builder(
                itemCount: data.length,
                itemBuilder: (BuildContext context, int index) {
                  return new Card(
                    child: new Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: <Widget>[
                        new Text("Name: ${data[index]["name"]}"),
                        new Text("Age: ${data[index]["age"]}"),
                        new Text("Height: ${data[index]["height"]}"),
                        new Text("Gender: ${data[index]["gender"]}"),
                      ],
                    ),
                  );
                },
              );
            }
            return new CircularProgressIndicator();
          });
    }
  }
  ```


### 五.调试Flutter应用

#### 1.degbugger()声明

- 可以使用该`debugger()`语句插入编程式断点
- 要使用这个，你必须添加`import 'dart:developer'`
- `debugger()`语句采用一个可选`when`参数，我们可以指定该参数仅在特定条件为真时中断

#### 2.print、debugPrint、flutter logs

#### 3.DevTools

### 六.Flutter异常捕获

#### 1.Dart单线程模型

1. Dart是单线程模式，如果程序发生异常而未被捕获，程序是不会因崩溃而终止的。

2. Dart大致的运行原理:

   ![](https://thumbnail1.baidupcs.com/thumbnail/054552ce6idf49265158b9b957692a1f?fid=604039242-250528-427919126093998&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-R0KZG%2bfPGVDEgth%2fP%2bU8ukya6qA%3d&expires=8h&chkbd=0&chkv=0&dp-logid=8829193834416307076&dp-callid=0&time=1648087200&size=c1920_u1080&quality=90&vuk=604039242&ft=image&autopolicy=1)

   - 微任务队列” **microtask queue**;“事件队列” **event queue**

   - 入口函数 main() 执行完后，消息循环机制便启动了,在这种情况下，整个线程的执行过程便是一直在循环，不会退出，而Flutter中，主线程的执行过程正是如此，永不终止

   - 微任务太多，执行时间总和就越久，事件队列任务的延迟也就越久

   - 可以通过`Future.microtask(…)`方法向微任务队列插入一个任务

   - 事件循环中，当某个任务发生异常并没有被捕获时，程序并不会退出，而直接导致的结果是**当前任务**的后续代码就不会被执行了，也就是说一个任务中的异常是不会影响其它任务执行的


#### 2.异常捕获

   1. 发生异常时，Flutter默认的处理方式是弹一个ErrorWidget

      ```dart
      @override
      void performRebuild() {
       ...
        try {
          //执行build方法  
          built = build();
        } catch (e, stack) {
          // 有异常时则弹出错误提示  
          built = ErrorWidget.builder(_debugReportException('building $this', e, stack));
        } 
        ...
      } 
      ```

   2. 我们想自己上报异常，只需要提供一个自定义的错误处理回调即可

      ```dart
      void main() {
        FlutterError.onError = (FlutterErrorDetails details) {
          reportError(details);
        };
       ...
      }
      ```

   #### 3.其他异常捕获与日志收集

1. 同步异常：同步异常可以通过`try/catch`捕获

2. 异步异常：`runZoned(...)` 方法，可以给执行对象指定一个Zone

   ```dart
   runZoned(
     () => runApp(MyApp()),
     zoneSpecification: ZoneSpecification(
       // 拦截print 蜀西湖
       print: (Zone self, ZoneDelegate parent, Zone zone, String line) {
         parent.print(zone, "Interceptor: $line");
       },
       // 拦截未处理的异步错误
       handleUncaughtError: (Zone self, ZoneDelegate parent, Zone zone,
                             Object error, StackTrace stackTrace) {
         parent.print(zone, '${error.toString()} $stackTrace');
       },
     ),
   );
   ```

## 基础组件

### 一.文本及样式

#### 1.Text

- 用于显示简单样式文本，它包含一些控制文本显示样式的一些属性
- textAlign：文本的对齐方式；可以选择左对齐、右对齐还是居中。对齐的参考系是Text widget 本身
- maxLines、overflow：指定文本显示的最大行数，默认情况下，文本是自动折行的，如果指定此参数，则文本最多不会超过指定的行。如果有多余的文本，可以通过`overflow`来指定截断方式
- textScaleFactor：代表文本相对于当前字体大小的缩放因子

```dart
///基础组件
class BasicComponents extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return TextComponent();
  }
}

///Text
class TextComponent extends StatefulWidget {
  @override
  _TextComponent createState() => _TextComponent();
}

class _TextComponent extends State<TextComponent> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Text组件'),
      ),
      body: Column(
        children: [
          Container(
            color: Colors.red[300],
            width: 500.0,
            child: const Text(
              "Hello world",
              textAlign: TextAlign.start,
            ),
          ),
          Container(
            color: Colors.deepOrange[300],
            width: 500.0,
            child: Text(
              "Hello world! I'm Jack." * 4,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Container(
            color: Colors.yellow[300],
            width: 500.0,
            child: const Text(
              "Hello world",
              textScaleFactor: 1.5,
            ),
          ),
          Container(
            color: Colors.greenAccent[400],
            width: 450.0,
            child: Text(
              "Hello world"*8,
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}
```



#### 2.TextStyle

- `TextStyle`用于指定文本显示的样式如颜色、字体、粗细、背景等

```dart
Text("Hello world",
  style: TextStyle(
    color: Colors.blue,
    fontSize: 18.0,
    height: 1.2,  
    fontFamily: "Courier",
    background: Paint()..color=Colors.yellow,
    decoration:TextDecoration.underline,
    decorationStyle: TextDecorationStyle.dashed
  ),
);
```

#### 3.TextSpan

- Text 的所有文本内容只能按同一种样式，如果我们需要对一个 Text 内容的不同部分按照不同的样式显示，这时就可以使用`TextSpan`

```dart
          Container(
            width: 450.0,
            child: Text.rich(
              TextSpan(
                children: [
                  const TextSpan(text: "我将会成为"),
                  TextSpan(
                    text: "【海贼王】",
                    style: TextStyle(
                        fontSize: 26.0,
                        color: _discoloration ? Colors.green : Colors.red),
                    recognizer: _tapGestureRecognizer
                      ..onTap = () {
                        setState(() {
                          _discoloration = !_discoloration;
                          LogUtils.i("我被点击了");
                        });
                      },
                  ),
                  const TextSpan(text: "的男人"),
                ],
              ),
            ),
          )
```

#### 4.DefaultTextStyle

- 在 Widget 树的某一个节点处设置一个默认的文本样式，那么该节点的子树中所有文本都会默认使用这个样式，而`DefaultTextStyle`正是用于设置默认文本样式的

```dart
DefaultTextStyle(
  //1.设置文本默认样式  
  style: TextStyle(
    color:Colors.red,
    fontSize: 20.0,
  ),
  textAlign: TextAlign.start,
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: <Widget>[
      Text("hello world"),
      Text("I am Jack"),
      Text("I am Jack",
        style: TextStyle(
          inherit: false, //2.不继承默认样式
          color: Colors.grey
        ),
      ),
    ],
  ),
);
```

#### 5.字体

- 在pubspec.yaml文件中配置后，在TextStyle中使用

```yaml
  fonts:
    - family: Charmonman
      fonts:
        - asset: assets/fonts/Charmonman-Bold.ttf
        - asset: assets/fonts/Charmonman-Regular.ttf
          weight: 500
    - family: youyuan
      fonts:
        - asset: assets/fonts/youyuan.ttf
    - family: pingguolihei
      fonts:
        - asset: assets/fonts/pingguolihei.ttf
    - family: Iconfont
      fonts:
        - asset: assets/fonts/iconfont.ttf
```

### 二.按钮

- Material 组件库中提供了多种按钮组件如`ElevatedButton`、`TextButton`、`OutlineButton`等
- 它们都是直接或间接对`RawMaterialButton`组件的包装定制,他们大多数属性都和`RawMaterialButton`一样

#### 1.ElevatedButton

- "漂浮"按钮，它默认带有阴影和灰色背景。按下后，阴影会变大

  ```dart
                ElevatedButton(
                  onPressed: () {
                    LogUtils.i("ElevatedButton按钮  被点击了");
                  },
                  child: const Text("ElevatedButton按钮"),
                ),
  ```

#### 2.TextButton

- 文本按钮，默认背景透明并不带阴影。按下后，会有背景色

  ```dart
  TextButton(
              onPressed: () {
                LogUtils.i("TextButton按钮  被点击了");
              },
              child: const Text("TextButton按钮"),
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.resolveWith(
                    (states) => _TextButtoncolor(context, states)),
              ),
            ),
  
  
  ///设置 TextButton按钮背景色方法
  _TextButtoncolor(BuildContext context, Set<MaterialState> states) {
    if (states.contains(MaterialState.pressed)) {
      return Theme.of(context).colorScheme.primary.withOpacity(0.5);
    } else {
      return Colors.purple[200];
    }
  }
  ```

#### 3.OutlinedButton

- 默认有一个边框，不带阴影且背景透明。按下后，边框颜色会变亮、同时出现背景和阴影

  ```dart
            OutlinedButton(
              onPressed: () {
                LogUtils.i("OutlinedButton  被点击了");
              },
              child: const Text("OutlinedButton按钮"),
            ),
  ```

#### 4.IconButton

- 一个可点击的Icon，不包括文字，默认没有背景，点击后会出现背景

  ```dart
            IconButton(
              onPressed: () {
                LogUtils.i("IconButton按钮  被点击了");
              },
              icon: const Icon(Icons.thumb_up),
            ),
  ```

#### 5.带图标的按钮

- `ElevatedButton`、`TextButton`、`OutlineButton`都有一个`icon` 构造函数，通过它可以轻松创建带图标的按钮

### 三.图片及Icon

#### 1.ImageProvider

- 一个抽象类，主要定义了图片数据获取的接口`load()`

- 从不同的数据源获取图片需要实现不同的`ImageProvider` ，如`AssetImage`是实现了从Asset中加载图片的 ImageProvider，而`NetworkImage` 实现了从网络加载图片的 ImageProvider

- 加载本地图片

  - ```dart
    Image.asset("assets/images/iocn_diqiu.png", width: 60, height: 60),
    ```

  - ```dart
    Image(
          image: AssetImage("assets/images/error_null.png"),
          width: 60,
          height: 60)
    ```

- 网路加载图片

  - ```dart
    Image(
      image: NetworkImage(
          "https://avatars2.githubusercontent.com/u/20411648?s=460&v=4"),
      width: 100.0,
    )
    ```

  - ```dart
    Image.network(
      "https://avatars2.githubusercontent.com/u/20411648?s=460&v=4",
      width: 100.0,
    )
    ```

- image缓存：Flutter框架对加载过的图片是有缓存的（内存），关于Image的详细内容及原理我们将会在后面进阶部分深入介绍

#### 2.ICON

- 像Web开发一样使用 iconfont，iconfont 即“字体图标”，它是将图标做成字体文件，然后通过指定不同的字符而显示不同的图片

### 四.单选开关和复选框

- Material 风格的单选开关`Switch`和复选框`Checkbox`，虽然它们都是继承自`StatefulWidget`，但它们本身不会保存当前选中状态，选中状态都是由父组件来管理的
- 当`Switch`或`Checkbox`被点击时，会触发它们的`onChanged`回调，我们可以在此回调中处理选中状态改变逻辑

### 五.输入框及表单

- Material 组件库中提供了输入框组件`TextField`和表单组件`Form`

#### 1.TextField

- 用于文本输入，它提供了很多属性

  ```dart
  const TextField({
    ...
    //编辑框的控制器，通过它可以设置/获取编辑框的内容、选择编辑内容、监听编辑文本改变事件。大多数情况下我们都需要显式提供一个controller来与文本框交互。如果没有提供controller，则       TextField内部会自动创建一个    
    TextEditingController controller, 
    //用于控制TextField是否占有当前键盘的输入焦点。它是我们和键盘交互的一个句柄（handle）  
    FocusNode focusNode,
    //用于控制TextField的外观显示，如提示文本、背景颜色、边框等
    InputDecoration decoration = const InputDecoration(),
    //用于设置该输入框默认的键盘输入类型
    TextInputType keyboardType,
    //键盘动作按钮图标(即回车键位图标)，它是一个枚举值，有多个可选值,全部的取值列表读者可以查看API文档
    TextInputAction textInputAction,
    //正在编辑的文本样式  
    TextStyle style,
    //输入框内编辑文本在水平方向的对齐方式  
    TextAlign textAlign = TextAlign.start,
    //是否自动获取焦点  
    bool autofocus = false,
    //是否隐藏正在编辑的文本，如用于输入密码的场景等，文本内容会用“•”替换  
    bool obscureText = false,
    //输入框的最大行数，默认为1；如果为null，则无行数限制  
    int maxLines = 1,
    //maxLength代表输入框文本的最大长度，设置后输入框右下角会显示输入的文本计数  
    int maxLength,
    //决定当输入文本长度超过maxLength时如何处理，如截断、超出等  
    this.maxLengthEnforcement,
    //长按或鼠标右击时出现的菜单，包括 copy、cut、paste 以及 selectAll  
    ToolbarOptions? toolbarOptions,
    //输入框内容改变时的回调函数；注：内容改变事件也可以通过controller来监听  
    ValueChanged<String> onChanged,
    //onEditingComplete和onSubmitted：这两个回调都是在输入框输入完成时触发，比如按了键盘的完成键（对号图标）或搜索键（🔍图标）。不同的是两个回调签名不同，onSubmitted回调是ValueChanged<String>类型，它接收当前输入内容做为参数，而onEditingComplete不接收参数。  
    VoidCallback onEditingComplete,
    ValueChanged<String> onSubmitted,
    //用于指定输入格式；当用户输入内容改变时，会根据指定的格式来校验  
    List<TextInputFormatter> inputFormatters,
    //如果为false，则输入框会被禁用，禁用状态不接收输入和事件，同时显示禁用态样式  
    bool enabled,
    //这三个属性是用于自定义输入框光标宽度、圆角和颜色的  
    this.cursorWidth = 2.0,
    this.cursorRadius,
    this.cursorColor,
    this.onTap,
    ...
  })
  ```

#### 2.表单Form

### 六.进度指示器

#### 1.两种进度指示器

- LinearProgressIndicator

  1. `LinearProgressIndicator`是一个线性、条状的进度条

  2. ```dart
     LinearProgressIndicator({
       double value,
       Color backgroundColor,
       Animation<Color> valueColor,
       ...
     })
     ```

     - `value`表示当前的进度，取值范围为[0,1]，如果`value`为`null`时则指示器会执行一个循环动画（模糊进度），当`value`不为`null`时，指示器为一个具体进度的进度条。
     - `backgroundColor`：指示器的背景色。
     - `valueColor`: 指示器的进度条颜色；值得注意的是，该值类型是`Animation<Color>`，这允许我们对进度条的颜色也可以指定动画。如果我们不需要对进度条颜色执行动画，换言之，我们想对进度条应用一种固定的颜色，此时我们可以通过`AlwaysStoppedAnimation`来指定。

- CircularProgressIndicator

  1. `CircularProgressIndicator`是一个圆形进度条

  2. ```dart
      CircularProgressIndicator({
       double value,
       Color backgroundColor,
       Animation<Color> valueColor,
       this.strokeWidth = 4.0,
       ...   
     }) 
     ```

     - 前三个参数和`LinearProgressIndicator`相同，不再赘述。`strokeWidth` 表示圆形进度条的粗细

#### 2.自定义进度指示器样式

可以通过`CustomPainter` Widget 来自定义绘制逻辑

## 布局类组件

### 一.布局类组件简介

1. 布局类组件都会包含一个或多个子组件，不同的布局类组件对子组件排列（layout）方式不同。
   - LeafRenderObjectWidget：非容器类组件基类，Widget树的叶子节点，用于没有子节点的widget，通常基础组件都属于这一类，如Image
   - SingleChildRenderObjectWidget：单子组件基类，包含一个子Widget，如：ConstrainedBox、DecoratedBox等
   - MultiChildRenderObjectWidget：多子组件基类，包含多个子Widget，一般都有一个children参数，接受一个Widget数组。如Row、Column、Stack等
2. 布局类组件就是指直接或间接继承(包含)`SingleChildRenderObjectWidget` 和`MultiChildRenderObjectWidget`的Widget

### 二.布局原理与约束(constraints)

1. 尺寸限制类容器用于限制容器大小，Flutter中提供了多种这样的容器，如`ConstrainedBox`、`SizedBox`、`UnconstrainedBox`、`AspectRatio` 等

2. BoxConstraints

   - ```dart
     const BoxConstraints({
       this.minWidth = 0.0, //最小宽度
       this.maxWidth = double.infinity, //最大宽度
       this.minHeight = 0.0, //最小高度
       this.maxHeight = double.infinity //最大高度
     })
     ```

3. ConstrainedBox

   - `ConstrainedBox`用于对子组件添加额外的约束

   - ```dart
     ConstrainedBox(
       constraints: BoxConstraints(
         minWidth: double.infinity, //宽度尽可能大
         minHeight: 50.0 //最小高度为50像素
       ),
       child: Container(
         height: 5.0, 
         child: redBox ,
       ),
     )
     ```

   - 

