## Framework笔记

### 一.相关资料

1. [写给应用开发的 Android Framework 教程——玩转 AOSP 篇之极速上手](https://juejin.cn/post/7202634945171537977)

### 二.硬件要求 

- CPU不低于6核，建议8核及以上
- 内存不低于32G，建议64G
- 存储空间不低于500G，建议1TB SSD

### 三.环境配置

1. [安装Ubuntu](https://releases.ubuntu.com/)
   - 版本号：20.04.6
   
2. 安装Vmware
   - [player版本](https://www.vmware.com/cn/products/workstation-player.html)
   - [pro版本](https://www.ghxi.com/vmware17.html)
     - 17版本+秘钥
   - 虚拟机网路虚拟设备
     - VMnet0：用于虚拟桥接网络下的虚拟交换机
     - VMnet1：用于虚拟Host-Only网络下的虚拟交换机
     - VMnet8：用于虚拟NAT网络下的虚拟交换机
     - VMware Network AdepterVMnet1：Host用于与Host-Only虚拟网络进行通信的虚拟网卡
     - VMware Network Adepter VMnet8：Host用于与NAT虚拟网络进行通信的虚拟网卡
   - 无线wifi桥接网络 
     - [设置VMWARE通过桥接方式使用主机无线网卡上网](https://developer.aliyun.com/article/399835)
   
3. 文件传输工具 FileZilla
   - windows 和 ubuntu 之间互相传输文件
   - [文件下载地址](https://filezilla-project.org/download.php?type=client)
   - 工具使用注意事项
     - [使用FileZilla在Windows与Ubuntu之间传输文件](https://blog.csdn.net/weixin_44590534/article/details/125230042)
     - ubuntu 网络切换成nat模式
   
3. 环境配置代码
   
   ```java
   sudo apt-get install git-core gnupg flex bison build-essential zip curl zlib1g-dev gcc-multilib g++-multilib libc6-dev-i386 libncurses5 lib32ncurses5-dev x11proto-core-dev libx11-dev lib32z1-dev libgl1-mesa-dev libxml2-utils xsltproc unzip fontconfig python
   ```
   
   
   
4. ssh 

   - sudo apt-get install openssh-server 安装服务
   - ps -e |grep ssh 查看服务是否已经启动
   - sudo  /etc/init.d/ssh start   启动服务
   - sudo /etc/init.d/ssh stop   停止服务
   - sudo /etc/init.d/ssh  restart 重启服务
   - SSH的配置文件路径：/etc/ssh/sshd.config

5. 安装repo 管理git

   - 下载repo

     ```java
     mkdir ~/bin
     curl https://mirrors.tuna.tsinghua.edu.cn/git/git-repo -o ~/bin/repo
     chmod +x ~/bin/repo
     ```

   - repo 的运行过程中会尝试访问官方的 git 源更新自己，如果想使用 tuna 的镜像源进行更新，可以将如下内容复制到你的 ~/.bashrc 或者 ~/.zshrc 里

     ```java
     export REPO_URL='https://mirrors.tuna.tsinghua.edu.cn/git/git-repo'
     PATH=~/bin:$PATH
     ```

   - source 一下

     ```java
     source ~/.bashrc
     #如果使用的是 zsh
     #source ~/.zshrc
     ```

7. 初始化仓库并同步远程代码

   ```java
   git config --global user.email "you@example.com"
   git config --global user.name "Your Name"
   mkdir aosp 
   cd asop
   #初始化仓库,-b 指示分支，这里使用 android10
   repo init -u https://mirrors.tuna.tsinghua.edu.cn/git/AOSP/platform/manifest -b android-10.0.0_r41
   #同步远程代码
   repo sync
   ```

   - 524971307@qq.com,joker
   - -b 后面的值参考[源代码标记和 build](https://link.juejin.cn/?target=https%3A%2F%2Fsource.android.com%2Fdocs%2Fsetup%2Fstart%2Fbuild-numbers%3Fhl%3Dzh-cn%23source-code-tags-and-builds)。这里选用了 android-10.0.0_r41 版本用于学习。Android 每年都会更新一个大版本，学习的角度来说，选择一个不太老的版本即可，不必追新。
   
8. 编译源码

   ```java
   source build/envsetup.sh
   lunch aosp_x86_64-eng   //用于x86下的模拟器的
   m                       //（make -j12 编译也行 后面数字代表了你虚拟机CPU的核心数）   m命令可以根据我们机器的配置自行调制
   ```

9. 启动模拟器

   ```java
   source build/envsetup.sh
   lunch
   //如果要是关机重启了，就需要执行前面的命令
   emulator
   
   ```

10. 安装 AIDEGen和AndroidStudio

   - [Android Studio导入Android源码](https://juejin.cn/post/7171687285463711781)
   - [如何在 Ubuntu 20.04 上安装 Java jdk](https://zhuanlan.zhihu.com/p/137114682)
   - Ubuntu（Linux）上安装Android Studio
     - [1](https://developer.aliyun.com/article/922)
     - [2](https://blog.csdn.net/wowocpp/article/details/118993286)