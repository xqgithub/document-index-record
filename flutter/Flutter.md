# Flutter

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

### 一.计数器应用示例
