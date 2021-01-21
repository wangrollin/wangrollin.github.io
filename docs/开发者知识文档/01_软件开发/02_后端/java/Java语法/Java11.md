

## Java 11+ Essential Training

**Introduction**

- What kind of software can you create?
- What you need to know

**1. What Is Java?**

- Explore the history of Java

- Principles and components of Java

    java: runtime

    javac: compiler

    javadoc: docs builder

    jar: archive builder

    

- Explore basic Java syntax

    java9: JShell

    

- Memory management and garbage collection

    Runtime.maxMemory()

    Runtime.totalMemory()

    

- Choose a development environment

**2. Get Started with Java**

- Install the JDK on Windows

- Install the JDK on macOS

- Install and configure IntelliJ IDEA

- Test simple Java code in JShell

    /exit 退出shell

    /list 当前的代码

    /save MyCommand.java 保存到文件

    /open MyCommand.java

    /reset 清空环境

    /help

    

- Compile Java code to bytecode

    到src目录下

    编译 javac com/wangrollin/Main.java

    运行 java com.wangrollin.Main

    

- Pass arguments to a console application

- Use the Java API documentation

    查看java doc：control + J

    在SKDs目录添加在线java doc

    

**3. Declare and Manage Variables**

- Work with primitive variables

    自推测类型智能用在method里

    包装类可以支持无符号类型

    

- Declare and modify primitive values

    java数字中可以使用下划线，int a = 1_000_000;

    编译的时候会自动去掉下划线

    

- Declare and initialize object variables

- Manage currency values with BigDecimal

    BigInteger

    BigDecimal

    

- Convert values between numeric types

- Math operators and the Math class

- Manage true and false Boolean values

- Manage character values as primitives

- More about Java operators

**4. Manage String Values**

- Declare and initialize string values

- Build a string from multiple values

- Clone the exercise files from GitHub

- Convert primitive values to strings

    只要表达式中出现了一个String，那么就不会报错， 20+20+"string"

    

- Format numeric values as strings

    NumberFormat.getXxxInstance();

    .format()

    

- Interpolate strings with placeholders

    %d %f %s

    

- Compare string values

- Parse string values

- Get string values from user input

- Challenge: A simple calculator

- Solution: A simple calculator

**5. Manage Program Flow**

- Evaluate conditions with if-else
- Evaluate conditions with switch-case
- Create looping code blocks
- Create reusable code with methods
- Create overloaded methods
- Pass arguments by reference vs. value

**6. Debugging and Exception Handling**

- Debug with IntelliJ IDEA
- Handle exceptions with try/catch
- Create multiple catch blocks
- Close objects with try-with-resources
- Challenge: A more complex calculator
- Solution: A more complex calculator

**7. Create Custom Classes**

- Declare and use custom classes
- Organize code with packages
- Create instance fields and methods
- Declare multiple constructor methods
- Use static fields as constants
- Declare and use Enum types

**8. Work with Inheritance**

- About inheritance
- Extend classes and override methods
- Use objects as their super types

**9. Manage Data Collections**

- Store values in simple arrays

    int[] a = new int[3];

    int[] a = {1,2,3};

    

- Manage resizable arrays with Lists

- Manage key-value pairs with Maps

**Conclusion**

- Next steps





## First Look: Java 10 and Java 11

**Introduction**

- Enhance your code with Java 10 and 11

- What you should know

    JSR：java specification request

    JEP：jdk enhancement proposal

    

**1. New to Java 10**

- Local variable type inference

    var 不是 keyword

    可以把var用作变量名、方法名、包名

    不可以把var用作类名

    

    var不能用在：

    ​	只声明变量，但没有赋值

    ​	类的属性

    ​	方法的参数、返回值

    ​	catch format

    

- Garbage collection improvements

    不同的GC的代码不再混在一起，更加模块化了

    Full GC可以并行了，加参数：-XX:ParallelGCThreads

    

- Memory allocation to alternative devices

- Application class-data sharing

    CDS: class data sharing

    appCDS: 共享类数据，加快启动时间

    现在不支持用户自己的类数据共享，不过以后会支持

    

- Root certificates

    ${JAVA_HOME}/lib/security

    需要各个CA组织同意，oracle才能把这些开源到openjdk中

    进一步减少openjdk和jdk之间的差距

    

- Thread-local handshakes

    jvm safe point: 暂停所有线程，从而进行垃圾回收；很耗资源

    通过使用threadshaks，也就是thread callback来暂停单个线程进行操作，不费资源

    当一个线程处在safe point state时，线程自己或者jvm会让线程处在blocked state

    

- Time-based release versioning

    version counter

    $feature.$interim.$update.$patch

    ​               $bugfix-enhancement.$.$

    $major.$minor.$security

    主版本号：10、11、12

    interim：保持为0

    update：发布后一个月+1，之后每三个月+1

    

- Experimental Java-based just-in-time (JIT) compiler

    目前hotspot有两个运行时编译器，都是just in time

    c1: 快、简单、做的优化少、对于快速启动很好

    c2: 慢、做了很多优化、对于长期运行的服务端app很好

    Graal：在java9加入，用java写的java编译器，来编译字节码；是ahead of time（AOT）的基础

    ​		-XX:+UnlockExperimentalVmOptions -XX:UseJVMCICompiler

    Graal帮助hotspot团队探索基于java的JIT Compiler是否可行，是试验性阶段，不要用在生产环境中

    

- Other housekeeping updates

    remove javah，/bin

    

**2. New to Java 11**

- New syntax for lambda parameters

    可以把var用在lambda表达式里了

    new: (var n, var m) -> n*m

    (@NotNull var n, @NotNull var m) -> n*m

    old: (n, m) -> n*m

    

- Standardizing the HTTP client

    java.net.http

    完全异步

    

- Garbage collectors

    新的GC：Epsilon 低开销

    它不做垃圾回收，给做垃圾回收提供一个引用实现

    新的GC：Z，目前仅在linux上有，性能巨大提升

    

- Launch single-file source-code programs

    之前可以：启动一个类，启动一个jar中的主类，启动一个模块的主类

    现在还可以：启动一个源文件， java helloworld.java

    必须只有一个文件

    

- Java Flight Recorder

    inpsect events using java mission control

    

    dump on demand

    java -xx:StartFlightRecording=settings=default

    

    dump on exit

    java -xx:StartFlightRecording=settings=default -XX:FlightRecordingOptions=dumponexit=true,dumponexitpath=C:\dump

    

    jdk.jfr.Event class 继承这个类，实例化，然后commit，即可记录自己的event

    

- Security updates

    换了key agreement

    TLS更新到了1.3

    密码学更新到了 ChaCha20

    

- Java virtual machine (JVM) improvements

- Java 11 deprecations and housekeeping

**Conclusion**

- Next steps