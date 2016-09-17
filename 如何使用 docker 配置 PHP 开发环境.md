# 如何使用 [docker](https://www.docker.com/) 配置 PHP 开发环境 (Linux+Nginx+Mysql+PHP [LEMP Stack](https://lemp.io/))?

## 什么是 docker ?
有关注云计算或从事运维工作的朋友应该对 docker 及其技术比较熟悉，docker 在 2013 年 3 月发布初始版本，之后迅速发展，虽然还有不少坑，但是用户量和社区活跃程度都是有增无减。

docker 的原理，就是把开发环境的所有配置，依赖，组件等都打包放在 container 里面，这样软件交付的时候就是交付这些 container, 那么部署的时候就不需要重新配置环境了，因为我们已经确保了开发环境跟生产环境一样。如果对物流运输或集装箱运输有了解的，理解 docker container 的原理会更简单，在集装箱出现之前，货物的运输都是通过散装运输，在装载和卸载过程中都需要大量的工作人员，集装箱出现后，甚至门到门的运输方式出现后，货物装在集装箱里直接从供应商处运输到买家门口，不仅节约了人力物力，货物的安全性也得到保证。

利用 docker 配置开发环境的话需要通过 `docker build` 命令创建各种镜像，例如在我们的案例中，包括 dockers_php, php, mysql, dockers_nginx, phpmyadmin/phpmyadmin 等。我们下载这些基础镜像，然后通过 `docker run` 命令由这些镜像创建出 container ，镜像的一个实例被称为 container ,一个基础镜像可以有多个运行的 container 。

除了通过 `docker build` 和 `docker run` 在命令行创建镜像和运行容器，我们还可以同通过 `docker-compose` 和 Dockerfile 文件来创建镜像和运行容器，Dockerfile 文件中包含需要下载哪些镜像，需要创建哪些容器的命令，这也是我们本文将会采取的方式，因为非常简单，需要修改的话我们也直接在 Dockerfile 文件修改就可以。

## 什么是 LEMP Stack ?
如果没有听说过 LEMP ，那应该听说过 LAMP 吧，`E` 是 Nginx [engine x] ，`A` 是 Apache ，两者都是非常有名的 linux web 服务器。LEMP 包含 Linux, Nginx, Mysql, PHP 。熟悉 LEMP Stack 的，应该对 [ubuntu](http://www.ubuntu.com/index_kylin) 和 [debian](https://www.debian.org/intro/about) 这两个操作系统也有过接触，想玩的可以在虚拟机中下载并运行。

## 配置 docker 加速器
在国内使用官方的 Docker Hub 下载镜像时，可能会很慢，所幸国内有一些企业提供 docker 加速器，例如阿里云的镜像加速服务和 daocloud 的 docker 加速服务。要了解如何使用阿里云的镜像加速服务请阅读[【阿里云镜像加速】](https://baichuan.taobao.com/doc2/detail.htm?treeId=39&articleId=103049&docType=1)；我个人使用 daocloud 的镜像加速配置 windows Docker Toolbox ，其他配置请查看[【daocloud docker 加速器】](http://www.daocloud.io/mirror.html#accelerator-doc)。

## 本文使用的案例
- Book: PHP and MySQL Web Development (4th Edition) by Luke Welling Paperback
- Code: bookmarks project 的代码，添加了 bootstrap3 以及更改了一些被 PHP 新版本 deprecate 的函数
- Dev Env: Docker LEMP
- 配置及代码：[github](https://github.com/Carol1992/linqing-blog/tree/master/php_BookMarks)

## 创建下载 image & 运行 container

## 常见问题

## UI 展示
- ![login](https://i.niupic.com/images/2016/09/17/fFfD5P.png)
- ![register](https://i.niupic.com/images/2016/09/17/qQhcMh.png)
- ![home](https://i.niupic.com/images/2016/09/17/NMXfQ2.png)
- ![recommendation](https://i.niupic.com/images/2016/09/17/T8Q5as.png)
