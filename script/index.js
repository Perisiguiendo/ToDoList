// 头部菜单栏
const header = {
    // 菜单按钮
    menu: document.getElementsByClassName('right-ex')[0],
    // 时间
    time: document.getElementsByClassName('time')[0],

    init() {
        this.setTime();
    },

    formatTime(week, month, day) {
        let time = '';
        let suffix = '';
        let dayEnd = '';
        switch (week) {
            case '1':
                time += 'Monday, ';
                break;
            case '2':
                time += 'Tuesday, ';
                break;
            case '3':
                time += 'Wednesday, ';
                break;
            case '4':
                time += 'Thursday, ';
                break;
            case '5':
                time += 'Friday, ';
                break;
            case '6':
                time += 'Saturday, ';
                break;
            case '0':
                time += 'Sunday, ';
                break;
            default:
                time += 'time error!'
        }
        switch (month) {
            case '1':
                time += 'January ';
                break;
            case '2':
                time += 'February ';
                break;
            case '3':
                time += 'March ';
                break;
            case '4':
                time += 'April ';
                break;
            case '5':
                time += 'May ';
                break;
            case '6':
                time += 'June ';
                break;
            case '7':
                time += 'July ';
                break;
            case '8':
                time += 'August ';
                break;
            case '9':
                time += 'September ';
                break;
            case '10':
                time += 'October ';
                break;
            case '11':
                time += 'November ';
                break;
            case '12':
                time += 'December ';
                break;
            default:
                time += 'Month error!'
        }

        // // 获得日期的最后一个字符
        dayEnd = day.substr(-1);
        switch (dayEnd) {
            case '1':
                suffix = 'st';
                break;
            case '2':
                suffix = 'nd';
                break;
            case '3':
                suffix = 'rd';
                break;
            default:
                suffix = 'th';
                break;
        }

        time += day + suffix;
        return time;
    },

    setTime() {
        let date = new Date();
        this.time.innerHTML = this.formatTime(date.getDay().toString(), (date.getMonth() + 1).toString(), date.getDate().toString());
    }

}

// 滑动条
const sliderBar = {
    // 上次点击的索引值
    lastIndex: 0,
    // 轮播图按钮
    dots: document.getElementsByClassName('dot')[0].getElementsByTagName('li'),
    // 轮播图滑动区
    slider: document.getElementsByClassName('slider')[0],
    // plans
    plans: document.getElementsByClassName('label'),

    // 初始化函数
    init() {
        this.dots[0].classList.add('active');
        this.btnClick();
    },

    // 手动轮播
    manSlider(index) {
        this.slider.style.transform = `translateX(-${325*index}px)`;
    },

    // 按钮点击
    btnClick() {
        let self = this;
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].onclick = function () {
                self.dots[self.lastIndex].classList.remove('active');
                self.dots[i].classList.add('active');
                self.manSlider(i);
                self.lastIndex = i;
            }
        }
    }

}

// 列表区
const list = {
    number: 0,
    // 添加按钮
    btnAdd: document.getElementsByClassName('add-icon')[0],
    // 进度条
    bar: document.getElementsByClassName('bar')[0],
    // 弹窗
    pop_up: document.getElementsByClassName('pop-up')[0],
    // 弹窗开关标志
    isChecked: false,
    // 弹窗退出
    quit: document.getElementsByClassName('quit')[0],
    // 弹窗确认
    confirm: document.getElementsByClassName('confirm')[0],
    // 标题
    title: document.getElementById('title'),
    // 内容
    desc: document.getElementById('desc'),
    // 列表
    list: document.getElementsByClassName('c-list')[0],
    // select选择框
    select: document.getElementsByTagName('select')[0],
    // 各个模块的item数
    num: [0, 0, 0, 0, 0, 0],
    // 存储列表数据
    arrStorage: [],
    // 操作按钮
    btnCir: document.getElementsByClassName('circle'),
    // right
    right: document.getElementsByClassName('right'),
    // 
    delCon: document.getElementsByClassName('con-del')[0],
    //
    con_Window: document.getElementsByClassName('con-window')[0],
    // items
    items: document.getElementsByClassName('items'),
    // label
    label: document.getElementsByClassName('label'),
    // list
    mainList: document.getElementById('list'),
    // 上次点击的索引
    lastIndex: 0,
    // affair
    affair: document.getElementsByClassName('right'),
    // 弹窗标题
    con_title: document.getElementsByClassName('con-title')[0],
    // 弹窗时间
    con_time: document.getElementsByClassName('con-time')[0],
    // 弹窗内容
    con_desc: document.getElementsByClassName('con-btm')[0],
    // delArr
    delArr: [],
    // delList  删除列表
    delList: [],

    // 初始化函数
    init() {
        this.renewNum();
        this.renewData();
        this.addTask();
        this.confirmWindow();
        this.quitWindow();
        this.opTask();
        this.showTask();
        this.closeTak();
        this.classifyTask();
    },

    // 获得格式化时间
    getTime() {
        let d = new Date();
        let h = 0;
        let m = 0;
        let t = '';
        h = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
        m = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
        t = d.getHours() > 12 ? 'PM' : 'AM';
        return `${h}:${m} ${t}`;
    },

    // 获取存储格式时间
    getSaveTime() {
        let d = new Date();
        let str = '';
        let y = 0;
        let mo = 0;
        let day = 0;
        let h = 0;
        let m = 0;
        let t = '';
        y = d.getFullYear();

        mo = d.getMonth() > 8 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
        day = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
        h = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
        m = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
        str = str + y + mo + day + h + m;
        return str;
    },

    // 恢复数据的时间格式
    renewTime(time) {
        let t = 0,
            h = 0,
            min = 0;
        t = time.slice(8, 10) > 12 ? 'PM' : 'AM';
        return `${time.slice(8, 10)}:${time.slice(10, 12)} ${t}`;
    },

    // 恢复项目数目
    renewNum() {
        if (!window.localStorage) {
            alert("请下载最新版本的浏览器!");
        } else {
            let self = this;
            let arr = JSON.parse(localStorage.getItem('num'));
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].innerHTML = `<span>${arr[i]}</span> items`;
                this.num[i] = arr[i];
            }
        }
    },

    // 清空input等内容
    clearInput() {
        this.title.value = '';
        this.desc.value = '';
        this.select.value = 'Life';
    },

    // 数组求和方法
    sumArr(arr) {
        return eval(arr.join('+'));
    },

    // 新建任务
    createAffair() {
        let str = this.select.value;
        let classStr = '';
        switch (str) {
            case 'Life':
                classStr = 'Life';
                this.num[1]++;
                break;
            case 'Work':
                classStr = 'Work';
                this.num[2]++;
                break;
            case 'Study':
                classStr = 'Study';
                this.num[3]++;
                break;
            case 'Sports':
                classStr = 'Sports';
                this.num[4]++;
                break;
            case 'Travel':
                classStr = 'Travel';
                this.num[5]++;
                break;
        }
        this.num[0] = this.sumArr(this.num) - this.num[0];
        let node = document.createElement('div');
        node.className = 'affair';
        node.id = this.number;
        node.innerHTML = `<div class="circle iconfont ${classStr}">&#xe63e;</div>
                            <div class="right">
                                <div class="center">
                                    <h3 class="affair-title">${this.title.value}</h3>
                                    <div class="down">${this.desc.value}</div>
                                </div>
                                <span class="time">${this.getTime()}</span>
                            </div>`;
        this.saveData(this.number, this.title.value, this.desc.value, this.select.value, this.getSaveTime());
        this.arrStorage.push({
            'index': this.number,
            'title': this.title.value,
            'desc': this.desc.value,
            'type': this.select.value,
            'time': this.getSaveTime()
        })
        this.number++;
        this.delArr.length++;
        return node;
    },

    // 存取各个模块的item数
    saveItemNum() {
        if (!window.localStorage) {
            alert("请下载最新版本的浏览器!")
        } else {
            let storage = window.localStorage;
            storage.setItem('num', JSON.stringify(this.num));
        }
    },

    // 存储数据
    saveData(index, title, desc, type, time) {
        if (!window.localStorage) {
            alert("请下载最新版本的浏览器!")
        } else {
            let storage = window.localStorage;
            let data = {
                index,
                title,
                desc,
                type,
                time
            };
            this.arrStorage.push(data);
            storage.setItem('data', JSON.stringify(this.arrStorage));
        }
    },

    // 恢复数据
    renewData() {
        if (!window.localStorage) {
            alert("请下载最新版本的浏览器!");
        } else {
            let arr = JSON.parse(localStorage.getItem('data'));
            this.arrStorage = this.deepClone(arr);
            arr.forEach(item => {
                let node = document.createElement('div');
                node.className = 'affair';
                node.id = item.index;
                node.innerHTML = `<div class="circle iconfont ${item.type}">&#xe63e;</div>
                                    <div class="right">
                                    <div class="center">
                                        <h3 class="affair-title">${item.title}</h3>
                                        <div class="down">${item.desc}</div>
                                    </div>
                                    <span class="time">${this.renewTime(item.time)}</span>
                                </div>`;
                this.list.appendChild(node);
            });
            this.number = arr.length;
            this.delArr.length = this.number;
        }
    },

    // 深拷贝
    deepClone(source) {
        const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
        for (let keys in source) {
            if (source.hasOwnProperty(keys)) {
                if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    targetObj[keys] = this.deepClone(source[keys]);
                } else { // 如果不是，就直接赋值
                    targetObj[keys] = source[keys];
                }
            }
        }
        return targetObj;
    },

    // quit
    quitWindow() {
        let self = this;
        this.quit.onclick = function () {
            self.pop_up.style.visibility = "hidden";
            self.clearInput();
        }
    },

    // confirm
    confirmWindow() {
        let self = this;
        this.confirm.onclick = function () {
            self.pop_up.style.visibility = "hidden";
            self.list.appendChild(self.createAffair());
            self.clearInput();
            self.saveItemNum();
        }
    },

    // 分类显示
    // 点击时找到c-list删除，然后，对数组中的数据进行过滤，然后重新渲染
    classifyTask() {
        let self = this;
        for (let i = 0; i < this.label.length; i++) {
            this.label[i].onclick = function () {
                if (i != self.lastIndex) {
                    if (i != 0) {
                        self.lastIndex = i;
                        let c_list = document.getElementsByClassName('c-list')[0];
                        self.mainList.removeChild(c_list);
                        let filterArr = self.arrStorage.filter(item => {
                            return item.type == this.classList[1];
                        });
                        let div = document.createElement('div');
                        div.className = 'c-list';
                        filterArr.forEach(item => {
                            let node = document.createElement('div');
                            node.className = 'affair';
                            node.id = item.index;
                            node.innerHTML = `<div class="circle iconfont ${item.type}">&#xe63e;</div>
                                        <div class="right">
                                        <div class="center">
                                            <h3 class="affair-title">${item.title}</h3>
                                            <div class="down">${item.desc}</div>
                                        </div>
                                        <span class="time">${self.renewTime(item.time)}</span>
                                    </div>`;
                            div.appendChild(node);
                        });
                        self.mainList.appendChild(div);
                    } else {
                        self.lastIndex = i;
                        let c_list = document.getElementsByClassName('c-list')[0];
                        self.mainList.removeChild(c_list);
                        let div = document.createElement('div');
                        div.className = 'c-list';
                        self.arrStorage.forEach(item => {
                            let node = document.createElement('div');
                            node.className = 'affair';
                            node.id = item.index;
                            node.innerHTML = `<div class="circle iconfont ${item.type}">&#xe63e;</div>
                                                <div class="right">
                                                <div class="center">
                                                    <h3 class="affair-title">${item.title}</h3>
                                                    <div class="down">${item.desc}</div>
                                                </div>
                                                <span class="time">${self.renewTime(item.time)}</span>
                                            </div>`;
                            div.appendChild(node);
                        });
                        self.mainList.appendChild(div);
                    }
                }
            }
        }
    },

    // 新建任务
    addTask() {
        let self = this;
        this.btnAdd.onclick = function () {
            self.pop_up.style.visibility = "visible";
        }
    },

    // 操作任务
    opTask() {
        let self = this;
        for (let i = 0; i < this.btnCir.length; i++) {
            self.btnCir[i].onclick = function () {
                console.log(self.delArr);
                if (!self.delArr[i]) {
                    this.style.color = "red";
                    self.right[i].style.transform = "translateX(20px)";
                    self.delArr[i] = true;
                } else {
                    switch (this.classList[2]) {
                        case 'Life':
                            this.style.color = '#5e5efe';
                            break;
                        case 'Work':
                            this.style.color = '#fbab4a';
                            break;
                        case 'Study':
                            this.style.color = '#26b7f0';
                            break;
                        case 'Sports':
                            this.style.color = '#18e929';
                            break;
                        case 'Travel':
                            this.style.color = '#e76f1f';
                            break;
                    }
                    self.right[i].style.transform = "translateX(0px)";
                    self.delArr[i] = false;
                }
            }
        }
    },

    // 
    editTask() {

    },

    delTask() {

    },

    // 打开弹窗
    showTask() {
        let self = this;
        for (let i = 0; i < this.affair.length; i++) {
            this.affair[i].onclick = function () {
                self.con_title.innerHTML = self.arrStorage[i].title;
                self.con_desc.innerHTML = self.arrStorage[i].desc;
                self.con_Window.style.visibility = "visible";
            }
        }
    },

    // 关闭弹窗
    closeTak() {
        let self = this;
        this.delCon.onclick = function () {
            self.con_Window.style.visibility = "hidden";
        }
    },
}

header.init();
sliderBar.init();
list.init();