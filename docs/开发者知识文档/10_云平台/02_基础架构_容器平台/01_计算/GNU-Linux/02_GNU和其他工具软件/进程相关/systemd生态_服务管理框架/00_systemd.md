
## 网站

- [Systemd 入门教程：命令篇](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)
- [Systemd 入门教程：实战篇](https://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html)

## 生态

- systemd — Linux 的初始化系统和服务管理框架（PID 1），是底层引擎
- systemctl — 控制 systemd 的命令行工具，管理服务的启停、启用禁用
- journalctl — 查看 systemd 收集的日志的命令行工具

简单说：systemd 是内核，systemctl 管服务，journalctl 看日志。

## systemd 生态主要组件

┌──────────────────┬───────────────────────────┐
│       工具       │           用途            │
├──────────────────┼───────────────────────────┤
│ systemctl        │ 管理服务和 unit           │
├──────────────────┼───────────────────────────┤
│ journalctl       │ 查看日志                  │
├──────────────────┼───────────────────────────┤
│ systemd-timer    │ 定时任务                  │
├──────────────────┼───────────────────────────┤
│ systemd-networkd │ 网络配置                  │
├──────────────────┼───────────────────────────┤
│ systemd-resolved │ DNS 解析                  │
├──────────────────┼───────────────────────────┤
│ systemd-logind   │ 用户登录/会话管理         │
├──────────────────┼───────────────────────────┤
│ systemd-tmpfiles │ 管理临时文件的创建和清理  │
├──────────────────┼───────────────────────────┤
│ hostnamectl      │ 查看/设置主机名           │
├──────────────────┼───────────────────────────┤
│ timedatectl      │ 查看/设置时区和时间同步   │
├──────────────────┼───────────────────────────┤
│ localectl        │ 查看/设置语言和键盘布局   │
├──────────────────┼───────────────────────────┤
│ loginctl         │ 管理用户会话              │
├──────────────────┼───────────────────────────┤
│ machinectl       │ 管理容器和虚拟机          │
├──────────────────┼───────────────────────────┤
│ coredumpctl      │ 查看程序崩溃的 core dump  │
├──────────────────┼───────────────────────────┤
│ busctl           │ 查看和调试 D-Bus 消息总线 │
├──────────────────┼───────────────────────────┤
│ systemd-analyze  │ 分析启动耗时和依赖        │
└──────────────────┴───────────────────────────┘

**日常最常用的组合**

```bash
# 时间和主机
timedatectl                          # 看时区、NTP 同步状态
hostnamectl                          # 看系统信息

# 启动分析
systemd-analyze                      # 总启动耗时
systemd-analyze blame                # 各服务启动耗时排名

# 崩溃排查
coredumpctl list                     # 最近的崩溃记录
coredumpctl info                     # 崩溃详情
```

核心就是 systemctl + journalctl + timedatectl + hostnamectl，其余按需使用。

## 常用操作

**systemctl — 管服务**
systemctl start/stop/restart xxx        # 启停
systemctl enable/disable xxx            # 开机自启
systemctl status xxx                    # 看状态
systemctl list-timers                   # 查看所有定时器

**journalctl — 看日志**
journalctl -u xxx                       # 某个服务的日志
journalctl -u xxx -f                    # 实时跟踪（类似 tail -f）
journalctl -u xxx --since "1 hour ago"  # 最近一小时
journalctl -u xxx -n 50                 # 最近 50 行
journalctl -p err                       # 只看错误级别

**最佳实践**
1. 一个服务一个 unit 文件，不要把多个任务塞进一个 service
2. 用 journalctl 看日志，不要在脚本里自己写日志文件，systemd 会自动捕获 stdout/stderr
3. 脚本里直接 echo 输出信息，journalctl 自动收集，不需要 >> /var/log/xxx.log
4. 用 systemctl status 排查问题，它会同时显示服务状态和最近几行日志
5. 定时任务用 timer 而不是 crontab，方便和服务生态统一管理
6. enable 和 start 分清 — enable 是开机自启，start 是立刻启动，通常 enable --now 一步到位

## Q&A

### 为什么systemd+timer比crontab更合适？

⏺ 主要优势：

  - 日志集成 — journalctl -u xxx 直接看执行日志，crontab 日志散落或没有
  - 依赖管理 — 可以声明依赖其他服务（比如等 tailscaled 启动后再执行）
  - 错过补执行 — Persistent=true 让关机期间错过的任务开机后自动补跑，crontab 错过就没了
  - 资源控制 — 可以限制 CPU、内存、超时时间等
  - 状态可查 — systemctl status 能看上次执行时间、结果、下次触发时间

  crontab 胜在简单一行搞定，适合轻量任务。但凡需要看日志排查问题，systemd timer 就方便很多。

### renew-tailscale-cert.timer 和 renew-tailscale-cert.service 是通过什么关联起来的？

⏺ 通过文件名。systemd 的约定：同名的 .timer 会自动关联同名的 .service。

  即 renew-tailscale-cert.timer 触发时，自动执行 renew-tailscale-cert.service。

  如果想关联不同名的 service，可以在 timer 里显式指定：

  [Timer]
  Unit=some-other-name.service
