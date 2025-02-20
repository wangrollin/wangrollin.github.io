
## 介绍

ROS（英语：Robot Operating System，一般译为机器人操作系统）


## 网站

- [github ros](https://github.com/ros/ros)
- [官网](https://www.ros.org/)
- [官方 wiki](https://wiki.ros.org/)
- [入门介绍](https://www.jiqizhixin.com/graph/technologies/5f6f33bd-c585-460a-a9c6-a66d781197bf)


## 架构

### package 包

一般在 /opt/ros/noetic/share/ 目录下
来源有两个：
- sudo apt-get install ros-noetic-desktop-full 基础包
- sudo apt-get install ros-noetic-xxx 独立扩展包

一个包，包含多个节点，相当于是依赖关系，关联的节点

创建一个包，同时指明依赖项
catkin_create_pkg sensor_pkg rospy roscpp std_msgs

### node 节点

主节点

节点的基本流程

```cpp
ros::init(argc, argv, "my_node");
while(ros::ok()) {
  // 主流程
}
```


## 通信方式

### 发布订阅

topic 话题，message 消息，发布者 publisher，订阅者 subscriber

传感器数据一直在变，往往会按照一定频率持续发送

每个传感器都有一个自己的 topic

std_msgs 包中包含很多标准消息格式

#### 发布者

```cpp
int main(int argc, char *argv[])
{
    setlocale(LC_ALL, "zh_CN.UTF-8");
    ros::init(argc, argv, "my_node");

    ros::NodeHandler nh;
    ros::Publisher pub = nh.advertise<std_msgs::String>("my_topic_name", 10);

    ros::Rate loop_rate(10); // 10hz

    while(ros::ok()) {
        std_msgs::String msg;
        msg.data = "msg111";
        pub.publish(msg);
        loog_rate.sleep();
    }

    return 0;
}
```

#### 订阅者

```cpp

void my_callback(std_msgs::String msg)
{
    ROS_INFO(msg.data.c_str());
}

int main(int argc, char *argv[])
{
    ros::init(argc, argv, "my_node");

    ros::NodeHandler nh;
    ros::Subscriber pub = nh.subscribe("my_topic_name", 10, my_callback);
    
    while(ros::ok()) {
        ros::spinOnce(); // 持续对新消息瞅一眼
    }

    return 0;
}

```


## 服务

## 动作


## 录制

rosbag


## 常用命令

```bash
# 安装包
sudo apt install ros-noetic-xxx

```

### roscore rosrun roslaunch

```bash
# 启动 node
roscore
rosrun package-name-包名 node-name-节点文件名
roslaunch wpr_simulation spb_simple.launch
```

### roscd

```bash
# 进入包路径
roscd roscpp
```

### rostopic

```bash
rostopic list # 查看 topic
rostopic echo /topic_name ## 查看具体的 msg，对 unicode 编码不友好，使用 echo -e xxx 可以转换成对的字符
rostopic hz /topic_name # 查看发送频率

```
