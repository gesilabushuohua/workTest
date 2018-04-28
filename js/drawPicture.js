window.Draw = function (can) {

    var t = this;
    t.isDraw = false//是否画图
    t.isRestart = false//是否重新开始
    t.x = 0; // 鼠标开始移动的位置X
    t.y = 0; // 鼠标开始移动的位置Y
    t.mx = 0; // 鼠标移动的位置X
    t.my = 0; // 鼠标移动的位置Y
    t.index = 0;
    t.domain = new Array();  //区域 [[x,y],[x,y],[x,y]]
    t.domains = [[]];   //path 包含多个domains
    t.canvas = can;
    t.ctx = t.canvas.getContext('2d'); // 得到画布的上下文对象
    t.maxArea = 8;
}


Draw.prototype._canvasDraw = function (img) {
    var t = this;
    var ctx = t.ctx;
    ctx.lineWidth = 2;
    /* 为canvas绑定mouse事件 */

    $(t.canvas).click(function (e) {
        if (t.index < t.maxArea) {
            t.isDraw = true;
            t.x = e.offsetX; // 鼠标落下时的X
            t.y = e.offsetY; // 鼠标落下时的Y
            ctx.arc(t.x, t.y, 5, 0, Math.PI * 2);
            t.domain.push([t.x, t.y]);
            t.domains[t.index] = {"path": t.domain, 'threshold': 0.7};
            //console.info(t.domains);
        } else {
            console.info('domains 区域大于8');
            console.info(t.domains);
        }

        if (t.domain.length > 2 && t._distance()) {
            // console.info("线路闭合")
            t._drawLine(false, img);
            if (t.index < t.maxArea) {
                t.index++;
                t.domain = new Array();
            }

            // t.domains[t.index]={"path":t.domain,'threshold':0.7};
            t.isDraw = false;
        }

    });

    $(t.canvas).mousemove(function (e) {
        // drawXxx(e); // 绘制方法
        if (t.isDraw) {
            t.mx = e.offsetX;
            t.my = e.offsetY;
            t._drawLine(true, img);
        }
    });
}


Draw.prototype._distance = function () {
    var t = this;
    var m = Math;
    var size = t.domain.length - 1;
    var ds = 10;
    var dx = m.abs(t.domain[size][0] - t.domain[0][0]);
    var dy = m.abs(t.domain[size][1] - t.domain[0][1]);

    if (dx < ds && dy < ds) {
        return true;
    } else {
        return false
    }

}


Draw.prototype._drawLine = function (isMove, img) {
    var t = this;
    var ctx = t.ctx;
    var patternStyle=null;
    ctx.clearRect(0, 0, t.canvas.width, t.canvas.height);
    ctx.beginPath();
    // console.info('domains',t.domains);
    // console.info('_________________');
    // console.info('domain',t.domains);
    console.info('2222',t.domains);
    t.domains.forEach(function (value, i) {
        var domain = value.path;
        console.info('11111',domain)
        if (isMove && i === t.domains.length - 1) {//绘画移动坐标不保存
            domain.forEach(function (point, j) {
                j === 0 ? ctx.moveTo(point[0], point[1]) : ctx.lineTo(point[0], point[1]);
                ctx.arc(point[0], point[1], 5, 0, Math.PI * 2)
            });
            ctx.moveTo(t.x, t.y);
            ctx.lineTo(t.mx, t.my);
            ctx.arc(t.mx, t.my, 5, 0, Math.PI * 2);
            ctx.strokeStyle = "#000";
            ctx.stroke();
        } else {//绘画确定坐标，保存
            domain.forEach(function (point, j) {
                j === 0 ? ctx.moveTo(point[0], point[1]) : ctx.lineTo(point[0], point[1]);
            });
            var size = domain.length - 1;
            ctx.moveTo(domain[0][0], domain[0][1]);
            ctx.lineTo(domain[size][0], domain[size][1]);
            ctx.strokeStyle = "#000";
            ctx.stroke();
            if(i === t.domains.length - 2){
                if (img && img !== null) {
                     patternStyle = ctx.createPattern(img, "repeat");
                    ctx.fillStyle = patternStyle;
                } else {
                    ctx.fillStyle = "rgba(255,255,255,0.4)";

                }
                ctx.fill();
            }

        }

    });


}
Draw.prototype._drawByPath = function (path,img) {
    var t = this;
    var ctx = t.ctx;
    ctx.lineWidth = 2;
    t.domains = path;
    t.index = t.domains.length;
    t._drawLine(false,img);
    //t.domains=new Array();
    //t.domains = [[]];

}

Draw.prototype._cancelDraw = function () {
    var t = this;
    $(t.canvas).unbind();
}


Draw.prototype._deleteDraw = function () {
    var t = this;
    var ctx = t.ctx;
    ctx.clearRect(0, 0, t.canvas.width, t.canvas.height);
    t.index=0;
    t.domain = new Array();
    t.domains = [[]];
}

Draw.prototype._setPath = function (pPath) {
    path = pPath;
}


Draw.prototype._getPath = function (can) {

    var path = [];
    var w = can.width
    var h = can.height
    domains.forEach(function (point, i) {
        path.push([point.x / w, point.y / h]);
    });
    // console.info(path)
    return path
}








