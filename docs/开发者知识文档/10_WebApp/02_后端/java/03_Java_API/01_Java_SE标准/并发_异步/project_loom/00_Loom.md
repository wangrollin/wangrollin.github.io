# Loom

## 特性

之前是很贵的线程（kernel thread的thin wrapper）、线程池、难懂的future语法，不好debug、不好写ut、不好观测、不好看错误栈

现在是轻1000倍的虚拟线程、结构并发，更好debug，更好的ut、更好观测，更好的错误栈

虚拟线程/线程池-线程

虚拟线程可以在很多个线程上跑，sleep之后。虚拟线程不是和线程绑定的，而是可以和线程分离、之后重新组装起来的。之前的线程和任务是不能分离的。

由于虚拟线程属于非常轻量级的资源，因此，用时创建，用完就扔，不要池化虚拟线程

使用的c，native来移动
Continuation.yield(scope) -> copy stack to heap
Continuation.run() -> copy heap to 等待队列，然后到平台线程的 stack

线程池只有一个 ForkJoinPool-1
platform threads 数量 = 机器core的数量
worker-1
worker-2

pull up thread vs virtual thread


注意到只有以虚拟线程方式运行的代码，才会在执行IO操作时自动被挂起并切换到其他虚拟线程。普通线程的IO操作仍然会等待，例如，我们在main()方法中读写文件，是不会有调度和自动挂起的。

可以自动引发调度切换的操作包括：

文件IO；
网络IO；
使用Concurrent库引发等待；
Thread.sleep()操作。

在虚拟线程中，如果绕过JDK的IO接口，直接通过**JNI**读写文件或网络是无法实现调度的。此外，在**synchronized**块内部也无法调度，task pin to the vthread，can't jump

vthread只跟io有关，进入io时自动挂起，io结束后继续运行

```java
try (var scope = new StructruedTaskScope<Quotation>()) {
    var future1 = scope.fork(Quotation::readA);
    var future2 = scope.fork(Quotation::readB);

    scope.join();

    return future1.resultNow();
}

Response handle() throws ExecutionException, InterruptedException {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        Supplier<String>  user  = scope.fork(() -> findUser());
        Supplier<Integer> order = scope.fork(() -> fetchOrder());

        scope.join()            // Join both subtasks
             .throwIfFailed();  // ... and propagate errors

        // Here, both subtasks have succeeded, so compose their results
        return new Response(user.get(), order.get());
    }
}

public class StructuredTaskScope<T> implements AutoCloseable {

    public <U extends T> Subtask<U> fork(Callable<? extends U> task);
    public void shutdown();

    public StructuredTaskScope<T> join() throws InterruptedException;
    public StructuredTaskScope<T> joinUntil(Instant deadline)
        throws InterruptedException, TimeoutException;
    public void close();

    protected void handleComplete(Subtask<? extends T> handle);
    protected final void ensureOwnerAndJoined();

}
```

之前是任务结束了，线程不结束，还在池子里。现在是任务结束，线程也结束了。


continuation、continuationScope、vthread，是一一对应关系，对于用户，只能看到vthread

虚拟线程：更快
结构并发：更安全