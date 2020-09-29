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
            case '7':
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
        // console.log(date.getDay().toString(), (date.getMonth() + 1).toString(), date.getDate().toString());
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
    // 添加按钮
    btnAdd: document.getElementsByClassName('add-icon')[0],
    // 进度条
    bar: document.getElementsByClassName('bar')[0],
    // 弹窗
    pop_up: document.getElementsByClassName('pop-up')[0],
    // 弹窗开关标志
    flag: false,


    // 初始化函数
    init() {
        this.addTask();
    },

    // 新建任务
    addTask() {
        let self = this;
        this.btnAdd.onclick = function () {
            self.pop_up.style.visibility = "visible";
        }
    }

}

header.init();
sliderBar.init();
// list.init();