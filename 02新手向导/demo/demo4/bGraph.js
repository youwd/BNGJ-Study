 // Program starts here. Creates a sample graph in the
 // DOM node with the specified ID. This function is invoked
 // from the onLoad event handler of the document (see below).

 var graph;

 function main(container) {
     // Checks if the browser is supported
     if (!mxClient.isBrowserSupported()) {
         mxUtils.error('Browser is not supported!', 200, false);
     } else {
         // 创建mxGraph
         graph = new mxGraph(container);

         // 设置图形是否可以旋转
         mxVertexHandler.prototype.rotationEnabled = true;

         // Enables rubberband selection
         new mxRubberband(graph);

         // 获取父节点，Root
         var parent = graph.getDefaultParent();

         // 要添加元素时调用，启动一个事务或子事务处理
         graph.getModel().beginUpdate();
         try {

             var v1 = graph.insertVertex(parent, null,
                 'hello', 20, 50, 200, 80, 'callout');

             var v2 = graph.insertVertex(parent, null,
                 'World!', 200, 150, 80, 30);

             // 设置两个元素的连接线
             // var e1 = graph.insertEdge(parent, null, '', v1, v2);

             // 改变样式，为椭圆形
             // var style = new Object();
             // style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
             // graph.getStylesheet().putCellStyle('ROUNDED', style);

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


             // 要创建上述ROUNDED全局样式，你可以按照这个模板来创建一个样式，并将其注册到mxStyleSheet上：
             var style = new Object();
             style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CLOUD;
            //  style[mxConstants.STYLE_OPACITY] = 50;
             style[mxConstants.STYLE_FONTCOLOR] = '#774400';
             graph.getStylesheet().putCellStyle('ROUNDED', style);
             var v3 = graph.insertVertex(parent, null,
                 'World!', 200, 350, 80, 30, 'ROUNDED');
         } finally {
             // Updates the display
             graph.getModel().endUpdate();

         }

         // 监听键盘事件，8为delete，调用删除元素
         var keyHandler = new mxKeyHandler(graph);
         keyHandler.bindKey(8, function (evt) {
             if (graph.isEnabled()) {
                 graph.removeCells();
             }
         });
     }
 };

 /*
  * 导出XML 
  */
 function exportXML() {

     var encoder = new mxCodec();
     var result = encoder.encode(graph.getModel());
     var xml = mxUtils.getXml(result);

     var blob = new Blob([xml], {
         type: "text/plain;charset=utf-8"
     });
     saveAs(blob, "config.xml");
 }

 function importXML() {
     var req = mxUtils.load('./config/config.xml');
     var root = req.getDocumentElement();
     var dec = new mxCodec(root.ownerDocument);

     dec.decode(root, graph.getModel());

     graph.setEnabled(false);
     graph.setPanning(true);
     graph.setTooltips(true);
 }