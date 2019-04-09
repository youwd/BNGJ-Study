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

         graph.constrainChildren = false;
         graph.extendParents = true;
         graph.extendParentsOnAdd = true;

         // Uncomment the following if you want the container
         // to fit the size of the graph
         //  graph.setResizeContainer(true);

         // 要添加元素时调用，启动一个事务或子事务处理
         graph.getModel().beginUpdate();
         try {

             //  var v1 = graph.insertVertex(parent, null,
             //      'hello', 20, 50, 200, 80, 'callout');

             // 设置两个元素的连接线
             // var e1 = graph.insertEdge(parent, null, '', v1, v2);

             // 初始化BFT样式：
             bStyle(graph);

             // 圆角：一般说明
             var v3 = graph.insertVertex(parent, null, '请填写引导说明～', 200, 350, 290, 60, 'ROUNDED');

             // 退出新手引导
             var v4 = graph.insertVertex(parent, null, '请填写引导说明～', 200, 150, 180, 80, 'LAYOUT');
             var v4_1 = graph.insertVertex(v4, null, '01', 25, 25, 25, 25, 'LABEL_BLOD');

             // 手势
             var v6 = graph.insertVertex(parent, null, null, 130, 150, 80, 80, 'HAND');
             var v5 = graph.insertVertex(parent, null, null, 130, 200, 80, 80, 'HANDLEFT');

             // Label
             var v7 = graph.insertVertex(parent, null, 'TEXT', 130, 350, 40, 40, 'LABEL');

             // 圆角：跳过
             var v14 = graph.insertVertex(parent, null, '跳过', 200, 450, 290, 60, 'ROUNDED_SKIP');



             // FIRSTPAGE_BACKGROUND
             var v9 = graph.insertVertex(parent, null, null, 500, 20, 300, 700, 'FIRSTPAGE_BACKGROUND');

             // FIRSTPAGE_TITLE
             var v9_0 = graph.insertVertex(v9, null, '欢迎来到BFT, 请先完成新手任务哦', 25, 120, 250, 50, 'FIRSTPAGE_TITLE');
             var v9_1 = graph.insertVertex(v9_0, null, null, 105, -30, 40, 40, 'FIRSTPAGE_TITLE_LOGO');

             // FIRSTPAGE_TASKLIST
             var v8_0 = graph.insertVertex(v9, null, null, 20, 300, 260, 140, 'TASKLIST_BACKGROUND_0');
             var v8_7 = graph.insertVertex(v8_0, null, null, 40, 60, 180, 80, 'TASKLIST_BACKGROUND_3');
             var v8_6 = graph.insertVertex(v8_0, null, null, 20, 15, 220, 120, 'TASKLIST_BACKGROUND_2');

             var v8 = graph.insertVertex(v8_0, null, null, 0, 0, 260, 100, 'TASKLIST_BACKGROUND');
             var v8_1 = graph.insertVertex(v8, null, '完成自动挖矿任务', 88, 35, 130, 28, 'TASKLIST_ROUNDED');
             var v8_2 = graph.insertVertex(v8, null, null, 200, 25, 50, 50, 'TASKLIST_START');
             var v8_3 = graph.insertVertex(v8_2, null, '开始', 12, 12, 25, 25, 'LABEL');
             var v8_4 = graph.insertVertex(v8, null, '任务', 12, 35, 25, 25, 'LABEL');
             var v8_5 = graph.insertVertex(v8, null, '01', 40, 32, 25, 25, 'LABEL_BLOD');



             // ACCOMPLISHED_BACKGROUND
             var v9 = graph.insertVertex(parent, null, null, 840, 20, 300, 700, 'ACCOMPLISHED_BACKGROUND');

             // ACCOMPLISHED_LAYOUT
             var v9_1_0 = graph.insertVertex(v9, null, '退出新手引导', 140, 20, 150, 80, 'LAYOUT');
             var v9_1_1 = graph.insertVertex(v9_1_0, null, '03', 20, 30, 20, 20, 'LABEL_BLOD');

             // ACCOMPLISHED_TITLE
             var v9_2_0 = graph.insertVertex(v9, null, null, 20, 150, 260, 140, 'ACCOMPLISHED_TITLE');
             var v9_2_1 = graph.insertVertex(v9_2_0, null, '恭喜您！通关啦！', 0, 10, 260, 30, 'ACCOMPLISHED_TITLE_LABEL');

             // ACCOMPLISHED_TASKLIST
             var v9_3_0 = graph.insertVertex(v9, null, null, 10, 250, 280, 270, 'TASKLIST_BACKGROUND_0');
             var v9_3_1 = graph.insertVertex(v9_3_0, null, '新手引导已完成！', 0, 20, 280, 250, 'ACCOMPLISHED_TASKLIST_BACKGROUND');
             var v9_3_2 = graph.insertVertex(v9_3_0, null, '第 3 关', 85, -20, 110, 80, 'ACCOMPLISHED_TASKLIST_LOGO');
             var v9_3_01 = graph.insertVertex(v9_3_0, null, null, 10, 70, 80, 100, 'ACCOMPLISHED_TASKLIST_BADGE01');
             var v9_3_02 = graph.insertVertex(v9_3_0, null, null, 100, 70, 80, 100, 'ACCOMPLISHED_TASKLIST_BADGE02');
             var v9_3_03 = graph.insertVertex(v9_3_0, null, null, 190, 70, 80, 100, 'ACCOMPLISHED_TASKLIST_BADGE03');
             var v9_3_3 = graph.insertVertex(v9_3_0, null, '完成', 65, 200, 150, 50, 'ROUNDED_SKIP');

             // GIF
             var v9_3_0 = graph.insertVertex(v9, null, null, 10, 250, 280, 270, 'TASKLIST_BACKGROUND_0');


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
     var req = mxUtils.load('./config/config2.xml');
     var root = req.getDocumentElement();
     var dec = new mxCodec(root.ownerDocument);

     dec.decode(root, graph.getModel());

     graph.setEnabled(false);
     graph.setPanning(true);
     graph.setTooltips(true);
 }