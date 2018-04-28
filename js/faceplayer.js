// universal module definition


//兼容不同加载规范
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module. AMD
        define(["../js/Decoder", "../js/twgl"], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.   Node,commonJs之类的
        module.exports = factory(require("../js/Decoder"), require("../js/twgl"));
    } else {
        // Browser globals (root is window) 浏览器全局变量（root 即 window）
        root.FacePlayer = factory(Decoder,twgl );
    }
}(this, function (Decoder, twgl) {

    //webGL着色器在js中以string形式呈现
    //js传递位置信息给着定点色器使用 attribute变量和uniform变量
    //  attribute变量传输顶点不同信息，如顶点坐标
    //  uniform变量传输顶点相同信息，如
    var videoVertexShader = [
        'attribute vec2 a_vertexCoord;',
        'attribute vec2 a_textureCoord;',
        'varying vec2 v_textureCoord;',

        'void main()',
        '{',
        'gl_Position = vec4(a_vertexCoord * vec2(1, 1), 0, 1);',
        'v_textureCoord = a_textureCoord.xy;',
        '}'
    ].join('\n');

    var videoFragmentShader = [
        'precision highp float;',
        'varying highp vec2 v_textureCoord;',
        'uniform sampler2D ySampler;',
        'uniform sampler2D uSampler;',
        'uniform sampler2D vSampler;',
        'const mat4 YUV2RGB = mat4',
        '(',
        '1.1643828125, 0, 1.59602734375, -.87078515625,',
        '1.1643828125, -.39176171875, -.81296875, .52959375,',
        '1.1643828125, 2.017234375, 0, -1.081390625,',
        '0, 0, 0, 1',
        ');',

        'void main(void) {',
        'highp float y = texture2D(ySampler,  v_textureCoord).r;',
        'highp float u = texture2D(uSampler,  v_textureCoord).r;',
        'highp float v = texture2D(vSampler,  v_textureCoord).r;',
        'gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;',
        '}'
    ].join('\n');

    var faceVertexShader = [
        "attribute vec2 a_vertexCoord;",
        "void main() {",
        "vec2 clipSpace = a_vertexCoord.xy * 2.0 - 1.0;",
        "gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);",
        "}",
    ].join('\n');

    var faceFragShader = [
        "precision highp float;",
        "uniform vec4 a_color;",
        "void main() { gl_FragColor = a_color; }"
    ].join('\n');

    var animation=0;

     FacePlayer = function (canvas) {
        this.canvas = canvas;
        var gl = twgl.getWebGLContext(this.canvas);
        gl.viewport(0, 0, canvas.width, canvas.height);
        this.gl = gl;
        this._initVideo();
        this._initFace();
        this._initDecoder();
    };

    FacePlayer.prototype._initVideo = function () {
        var gl = this.gl;
        this.videoProgram = twgl.createProgramInfo(gl, [videoVertexShader, videoFragmentShader]);
        this.videoBuffer = twgl.createBufferInfoFromArrays(gl, {
            a_vertexCoord: {
                numComponents: 2,
                data: new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]),
            },
            a_textureCoord: {
                numComponents: 2,
                data: new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]),
            }
        });
        var createTexture = function () {
            return twgl.createTexture(gl, {
                target: gl.TEXTURE_2D,
                min: gl.LINEAR,
                mag: gl.LINEAR,
                wrapS: gl.CLAMP_TO_EDGE,
                wrapT: gl.CLAMP_TO_EDGE,
                width: 1,
                height: 1,
            });
        };
        this.textures = {
            Y: createTexture(),
            U: createTexture(),
            V: createTexture(),
        };
    };

    FacePlayer.prototype._initFace = function () {

        var gl = this.gl;
        this.faceProgram = twgl.createProgramInfo(gl, [faceVertexShader, faceFragShader]);
        this.faceBuffer = twgl.createBufferInfoFromArrays(gl, {
            a_vertexCoord: {
                numComponents: 2,
                data: new Float32Array(2 * 5),
            },
        });
    };

    FacePlayer.prototype._initDecoder = function () {
        var self = this;
        this.decoder = new Decoder();
        this.decoder.onPictureDecoded = function (buffer, width, height, infos) {
            var info;
            if (infos.length > 0) {
              info = infos[infos.length - 1];
            }else {
              info=null;
            }
            //console.log("got pic:", width, height, info.finishDecoding - info.startDecoding);
          cancelAnimationFrame(animation);
          animation= requestAnimationFrame(function () {
                //if (info.rects.length > 0) {
                //  console.log(info.pts, info.rects);
                //}
                self._draw(buffer, width, height, info);
                buffer=null;
                info=null;
            });


        };
    };

    FacePlayer.prototype._draw = function (data, width, height, info) {
        var gl = this.gl;

        gl.useProgram(this.videoProgram.program)
        var yLen = width * height, cLen = yLen / 4;
        twgl.setTextureFromArray(gl, this.textures.Y, data.subarray(0, yLen), {
            width: width,
            height: height,
            format: gl.LUMINANCE
        });
        twgl.setTextureFromArray(gl, this.textures.U, data.subarray(yLen, yLen + cLen), {
            width: width / 2,
            height: height / 2,
            format: gl.LUMINANCE
        });
        twgl.setTextureFromArray(gl, this.textures.V, data.subarray(yLen + cLen, yLen + 2 * cLen), {
            width: width / 2,
            height: height / 2,
            format: gl.LUMINANCE
        });
        twgl.setUniforms(this.videoProgram, {
            resolution: [gl.canvas.width, gl.canvas.height],
            ySampler: this.textures.Y,
            uSampler: this.textures.U,
            vSampler: this.textures.V,
        });
        twgl.setBuffersAndAttributes(gl, this.videoProgram, this.videoBuffer);
        twgl.drawBufferInfo(gl, gl.TRIANGLE_STRIP, this.videoBuffer);

        if (info.rects) {
            gl.useProgram(this.faceProgram.program);
            gl.lineWidth(2);
            twgl.setUniforms(this.faceProgram, {
                a_color: new Float32Array([1.0, 1.0, 1.0, 1.0]),
            });
            for (var i = 0; i < info.rects.length; i++) {
                var r = info.rects[i];
                var x1 = r.left / 10000, x2 = r.right / 10000, y1 = r.top / 10000, y2 = r.bottom / 10000;
                var coords = [x1, y1, x1, y2, x2, y2, x2, y1, x1, y1];
                //console.log("coords:", coords);
                twgl.setAttribInfoBufferFromArray(gl, this.faceBuffer.attribs.a_vertexCoord, coords)
                twgl.setBuffersAndAttributes(gl, this.faceProgram, this.faceBuffer);
                twgl.drawBufferInfo(gl, gl.LINE_STRIP, this.faceBuffer);
            }
          info=null;
        }

      data=null;
    };

    FacePlayer.prototype.decodeDraw = function (data, faceinfo) {
        this.decoder.decode(new Uint8Array(data), faceinfo);
    };


    return FacePlayer;

}

));


