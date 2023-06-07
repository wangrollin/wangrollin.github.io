
## 进程是资源分配的基本单位，线程是调度的基本单位

https://zhuanlan.zhihu.com/p/410266069
https://stackoverflow.com/questions/28476456/threads-and-lwp-in-linux

用户进程，对应到 kernel process
用户进程中的线程，对应到 kernel lwp

lwp提供了一种选择
要么用户在进程中自己调度，实现线程，但是中断是进程维度的，kernel看不到线程
要么用户在进程中使用lwp，kernel能看到，中断是线程粒度的，但是lwp很重，不能创建很多。因为LWP的存在，内核可以认识到用户态的线程，以使得线程可以在SMP的环境下发挥出更大的优势（如果一个程序代表一个进程的话，相当于把程序分成好多块在不同的核上运行，提高速度）），同时用户线程的并发性得到了很大提升，如果一个线程block住，schedule的控制权在内核手中，内核可以调度组内的其他线程运行

所以一个进程，代表一个应用程序，内部线程数设置成 logic core 数量，就可以lwp调度到不同的core上高并发

fork() 创建子进程
clone() 创建lwp thread
