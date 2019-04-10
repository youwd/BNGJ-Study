function bStyle(graph) {

      // 禁止折叠
      graph.isCellFoldable = function (cell, collapse) {
            return false;
      };


      // 椭圆
      {
            // 改变样式，为椭圆形
            // var style = new Object();
            // style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
            // graph.getStylesheet().putCellStyle('ROUNDED', style);
      }

      // Callout 形状
      {
            // Callout 形状
            function CalloutShape() {
                  mxActor.call(this);
            };
            mxUtils.extend(CalloutShape, mxHexagon);
            CalloutShape.prototype.size = 30;
            CalloutShape.prototype.position = 0.5;
            CalloutShape.prototype.position2 = 0.5;
            CalloutShape.prototype.base = 20;
            CalloutShape.prototype.getLabelMargins = function () {
                  return new mxRectangle(0, 0, 0, parseFloat(mxUtils.getValue(
                        this.style, 'size', this.size)) * this.scale);
            };
            CalloutShape.prototype.isRoundable = function () {
                  return true;
            };
            CalloutShape.prototype.redrawPath = function (c, x, y, w, h) {
                  var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants
                        .LINE_ARCSIZE) / 2;
                  var s = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this
                        .size))));
                  var dx = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position',
                        this.position))));
                  var dx2 = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position2',
                        this.position2))));
                  var base = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'base', this
                        .base))));

                  this.addPoints(c, [new mxPoint(0, h - s - base),
                              new mxPoint(Math.max(0, dx), h - s - base), new mxPoint(dx2, 0),
                              new mxPoint(Math.min(w, dx + base), h - s - base), new mxPoint(w, h - s - base),
                              new mxPoint(w, 2 * h - 2 * s - base), new mxPoint(0, 2 * h - 2 * s - base)
                        ],
                        this.isRounded, arcSize, true, [4]);
            };

            mxCellRenderer.registerShape('callout', CalloutShape);

            // 改变基本样式  
            var style = {};
            style[mxConstants.STYLE_SHAPE] = 'callout';
            graph.getStylesheet().putCellStyle('callout', style);
      }

      // ROUNDED
      {
            // 要创建上述ROUNDED全局样式，你可以按照这个模板来创建一个样式，并将其注册到mxStyleSheet上：
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ROUNDED;

            // 渐变色
            style[mxConstants.STYLE_FILLCOLOR] = '#F78666';
            style[mxConstants.STYLE_GRADIENTCOLOR] = '#F7CD5E';
            style[mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_EAST;

            // 圆角
            style[mxConstants.STYLE_ROUNDED] = '1';
            style[mxConstants.PERIMETER_ELLIPSE] = 'ellipsePerimeter';
            style[mxConstants.STYLE_ARCSIZE] = '10';

            // 外边线
            style[mxConstants.STYLE_STROKECOLOR] = '#ffffff';
            style[mxConstants.STYLE_STROKE_OPACITY] = '0';

            style[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
            style[mxConstants.STYLE_FONTSIZE] = '18';

            graph.getStylesheet().putCellStyle('ROUNDED', style);
      }

      // IMAGE_LAYOUT 退出新手引导
      {
            // 要创建上述ROUNDED全局样式，你可以按照这个模板来创建一个样式，并将其注册到mxStyleSheet上：
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            style[mxConstants.STYLE_IMAGE] = 'images/Group4@3x.png';

            style[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
            style[mxConstants.STYLE_FONTSIZE] = '13';
            style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_RIGHT; // 字体右对齐
            style[mxConstants.STYLE_SPACING] = '8'; // padding

            // style[mxConstants.STYLE_FOLDABLE] = 0;

            graph.getStylesheet().putCellStyle('LAYOUT', style);
      }

      // IMAGE_HAND
      {
            // 要创建上述ROUNDED全局样式，你可以按照这个模板来创建一个样式，并将其注册到mxStyleSheet上：
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            style[mxConstants.STYLE_IMAGE] = 'images/HAND@3x.png';

            graph.getStylesheet().putCellStyle('HAND', style);

            style = mxUtils.clone(style);
            style[mxConstants.STYLE_IMAGE] = 'images/HANDLEFT@3x.png';
            graph.getStylesheet().putCellStyle('HANDLEFT', style);

      }

      // SHAPE_LABEL
      {
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
            style[mxConstants.STYLE_OPACITY] = 0;
            style[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
            style[mxConstants.STYLE_FONTSIZE] = '12';

            graph.getStylesheet().putCellStyle('LABEL', style);

      }

      // SHAPE_LABEL_BLOD
      {
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
            style[mxConstants.STYLE_OPACITY] = 0;
            style[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
            style[mxConstants.STYLE_FONTSIZE] = '24';
            // style[mxConstants.STYLE_FONTSTYLE] = 1; // 字体加粗

            graph.getStylesheet().putCellStyle('LABEL_BLOD', style);

      }

      // FIRSTPAGE_BACKGROUND
      {
            var style = new Object();
            // style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            // 背景色
            style[mxConstants.STYLE_FILLCOLOR] = '#5BD4EE';
            style[mxConstants.STYLE_GRADIENTCOLOR] = '#58EADD';
            style[mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_EAST;

            style[mxConstants.STYLE_STROKECOLOR] = '#ffffff';
            style[mxConstants.STYLE_STROKE_OPACITY] = 0;

            // style[mxConstants.STYLE_FOLDABLE] = 0; // 是否可折叠
            graph.getStylesheet().putCellStyle('FIRSTPAGE_BACKGROUND', style);

      }

      // FIRSTPAGE_TITLE
      {
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ROUNDED;
            style[mxConstants.STYLE_FOLDABLE] = 0; // 是否可折叠

            // 背景色+透明度
            style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
            // style[mxConstants.STYLE_OPACITY] = 50;

            // 圆角
            style[mxConstants.STYLE_ROUNDED] = '1';
            style[mxConstants.PERIMETER_ELLIPSE] = 'ellipsePerimeter';
            style[mxConstants.STYLE_ARCSIZE] = '50';

            // 外边线
            style[mxConstants.STYLE_STROKECOLOR] = '#ffffff';
            style[mxConstants.STYLE_STROKE_OPACITY] = 0;

            style[mxConstants.STYLE_FONTCOLOR] = '#5BD4EE';
            style[mxConstants.STYLE_FONTSIZE] = '14';

            graph.getStylesheet().putCellStyle('FIRSTPAGE_TITLE', style);
      }

      // FIRSTPAGE_TITLE_LOGO
      {
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_IMAGE] = 'images/BFTlogo@3x.png';

            graph.getStylesheet().putCellStyle('FIRSTPAGE_TITLE_LOGO', style);
      }

      // TASKLIST_BACKGROUND
      {
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_FOLDABLE] = 0; // 是否可折叠

            graph.getStylesheet().putCellStyle('TASKLIST_BACKGROUND_0', style);

            style = mxUtils.clone(style);
            style[mxConstants.STYLE_IMAGE] = 'images/CArd@3x.png';

            graph.getStylesheet().putCellStyle('TASKLIST_BACKGROUND', style);

            style = mxUtils.clone(style);
            // style[mxConstants.STYLE_OPACITY] = 90;
            graph.getStylesheet().putCellStyle('TASKLIST_BACKGROUND_2', style);

            style = mxUtils.clone(style);
            style[mxConstants.STYLE_OPACITY] = 70;
            graph.getStylesheet().putCellStyle('TASKLIST_BACKGROUND_3', style);

      }

      // TASKLIST_START
      {
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_IMAGE] = 'images/START@3x.png';

            style[mxConstants.STYLE_FONTCOLOR] = '#fff';
            style[mxConstants.STYLE_FONTSIZE] = '12';
            // style[mxConstants.STYLE_SPACING] = '8'; // padding
            style[mxConstants.STYLE_FONTSTYLE] = 1; // 字体加粗

            graph.getStylesheet().putCellStyle('TASKLIST_START', style);
      }

      // TASKLIST_ROUNDED
      {
            // 要创建上述ROUNDED全局样式，你可以按照这个模板来创建一个样式，并将其注册到mxStyleSheet上：
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ROUNDED;

            // 背景色+透明度
            style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
            style[mxConstants.STYLE_OPACITY] = 50;

            // 圆角
            style[mxConstants.STYLE_ROUNDED] = '1';
            style[mxConstants.PERIMETER_ELLIPSE] = 'ellipsePerimeter';
            style[mxConstants.STYLE_ARCSIZE] = '50';

            // 外边线
            style[mxConstants.STYLE_STROKECOLOR] = '#ffffff';
            style[mxConstants.STYLE_STROKE_OPACITY] = 0;

            style[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
            style[mxConstants.STYLE_FONTSIZE] = '12';

            graph.getStylesheet().putCellStyle('TASKLIST_ROUNDED', style);
      }

      // ROUNDED_SKIP 跳过
      {
            // 要创建上述ROUNDED全局样式，你可以按照这个模板来创建一个样式，并将其注册到mxStyleSheet上：
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ROUNDED;

            // 渐变色
            style[mxConstants.STYLE_FILLCOLOR] = '#5BD4EE';
            style[mxConstants.STYLE_GRADIENTCOLOR] = '#58EADD';
            style[mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_EAST;

            // 圆角
            style[mxConstants.STYLE_ROUNDED] = '1';
            style[mxConstants.PERIMETER_ELLIPSE] = 'ellipsePerimeter';
            style[mxConstants.STYLE_ARCSIZE] = '10';

            // 外边线
            style[mxConstants.STYLE_STROKECOLOR] = '#ffffff';
            style[mxConstants.STYLE_STROKE_OPACITY] = '0';


            style[mxConstants.STYLE_FONTSIZE] = '18';
            style[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';

            graph.getStylesheet().putCellStyle('ROUNDED_SKIP', style);
      }

      // ACCOMPLISHED_BACKGROUND
      {
            var style = new Object();
            // 背景色
            style[mxConstants.STYLE_FILLCOLOR] = '#000';
            style[mxConstants.STYLE_OPACITY] = 50;

            style[mxConstants.STYLE_STROKECOLOR] = '#ffffff';
            style[mxConstants.STYLE_STROKE_OPACITY] = 0;

            style[mxConstants.STYLE_FOLDABLE] = 0; // 是否可折叠
            graph.getStylesheet().putCellStyle('ACCOMPLISHED_BACKGROUND', style);

      }

      // ACCOMPLISHED_TITLE_BACKGROUND
      {
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_IMAGE] = 'images/碎片@3x.png';

            style[mxConstants.STYLE_FOLDABLE] = 0; // 是否可折叠
            graph.getStylesheet().putCellStyle('ACCOMPLISHED_TITLE', style);
      }

      // ACCOMPLISHED_TITLE_LABEL
      {
            var style = new Object();
            // 背景色
            style[mxConstants.STYLE_FILLCOLOR] = '#000';
            style[mxConstants.STYLE_OPACITY] = 0;

            style[mxConstants.STYLE_FONTCOLOR] = '#5BD4EE';
            style[mxConstants.STYLE_FONTSIZE] = '20';
            // style[mxConstants.STYLE_SPACING] = '8'; // padding
            style[mxConstants.STYLE_FONTSTYLE] = 1; // 字体加粗

            graph.getStylesheet().putCellStyle('ACCOMPLISHED_TITLE_LABEL', style);
      }

      //ACCOMPLISHED_TASKLIST_BACKGROUND
      {
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_IMAGE] = 'images/弹窗@3x.png';

            style[mxConstants.STYLE_FONTCOLOR] = '#000';
            style[mxConstants.STYLE_FONTSIZE] = '14';
            style[mxConstants.STYLE_SPACING_TOP] = 60;


            style[mxConstants.STYLE_FOLDABLE] = 0; // 是否可折叠
            graph.getStylesheet().putCellStyle('ACCOMPLISHED_TASKLIST_BACKGROUND', style);
      }

      //ACCOMPLISHED_TASKLIST_LOGO
      {
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_IMAGE] = 'images/标题@3x.png';

            style[mxConstants.STYLE_FONTCOLOR] = '#fff';
            style[mxConstants.STYLE_FONTSIZE] = '14';
            // style[mxConstants.STYLE_FONTSTYLE] = 1; // 字体加粗

            style[mxConstants.STYLE_FOLDABLE] = 0; // 是否可折叠
            graph.getStylesheet().putCellStyle('ACCOMPLISHED_TASKLIST_LOGO', style);
      }

      //ACCOMPLISHED_TASKLIST_BADGE
      {
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_IMAGE] = 'images/挖矿徽章@3x.png';

            graph.getStylesheet().putCellStyle('ACCOMPLISHED_TASKLIST_BADGE01', style);

            style = mxUtils.clone(style);
            style[mxConstants.STYLE_IMAGE] = 'images/第二关徽章@3x.png';

            graph.getStylesheet().putCellStyle('ACCOMPLISHED_TASKLIST_BADGE02', style);

            style = mxUtils.clone(style);
            style[mxConstants.STYLE_IMAGE] = 'images/第三关徽章@3x.png';

            graph.getStylesheet().putCellStyle('ACCOMPLISHED_TASKLIST_BADGE03', style);
      }

      //GIF
      {
            var style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_IMAGE] = 'images/123.gif';

            style[mxConstants.STYLE_FOLDABLE] = 0; // 是否可折叠
            graph.getStylesheet().putCellStyle('GIF', style);
      }
}