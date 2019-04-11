 // Program starts here. Creates a sample graph in the
 // DOM node with the specified ID. This function is invoked
 // from the onLoad event handler of the document (see below).

 var graph;
 var parent; //整个父节点
 var cellID; //记录被点击元素ID

 var graphState = 0; //记录是编辑状态还是演示状态,0:编辑状态；1:演示状态
 var pages = new Object(); // 记录保存的设计页面

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
         parent = graph.getDefaultParent();

         graph.constrainChildren = false;
         graph.extendParents = true;
         graph.extendParentsOnAdd = true;


         // 根据元素自适应画布大小
         // graph.setResizeContainer(true);

         // 初始化BFT样式：
         bStyle(graph);

         // 监听键盘事件，8为delete，调用删除元素
         var keyHandler = new mxKeyHandler(graph);
         keyHandler.bindKey(8, function (evt) {
             if (graph.isEnabled()) {
                 graph.removeCells();
             }
         });

         // 监听元素点击事件
         graph.addMouseListener({
             mouseDown: function (sender, evt) {
                 // 事件绑定时，记录点击的cellID
                 evt.sourceState ? cellID = evt.sourceState.cell.id : cellID = null;

                 // 下一步事件
                 if (evt.sourceState && evt.sourceState.cell.hasOwnProperty('event')) {
                     console.log(123);
                 }
             },
             mouseMove: function (sender, evt) {
                 //  mxLog.debug('mouseMove');
             },
             mouseUp: function (sender, evt) {
                 //  mxLog.debug('mouseUp');
             }
         });
     }
 };

 var cells = {
     // 引导说明
     'INSTRUCTION': function () {
         // 要添加元素时调用，启动一个事务或子事务处理
         graph.getModel().beginUpdate();
         try {
             graph.insertVertex(parent, null, '请填写引导说明～', 20, 350, 290, 60, 'INSTRUCTION');
         } finally {
             // 更新画布
             graph.getModel().endUpdate();
         }
     },
     // 退出新手引导
     'LAYOUT': function () {
         graph.getModel().beginUpdate();
         try {
             var p = graph.insertVertex(parent, null, '退出新手引导', 120, 150, 150, 80, 'LAYOUT');
             graph.insertVertex(p, null, '01', 18, 25, 25, 25, 'LABEL_BLOD');
         } finally {
             // 更新画布
             graph.getModel().endUpdate();
         }
     },
     // 右手势
     'HAND': function () {
         graph.getModel().beginUpdate();
         try {
             graph.insertVertex(parent, null, null, 0, 150, 80, 80, 'HAND');
         } finally {
             // 更新画布
             graph.getModel().endUpdate();
         }
     },
     // 左手势
     'HANDLEFT': function () {
         graph.getModel().beginUpdate();
         try {
             graph.insertVertex(parent, null, null, 0, 200, 80, 80, 'HANDLEFT');
         } finally {
             // 更新画布
             graph.getModel().endUpdate();
         }
     },
     // 文本
     'LABEL': function () {
         graph.getModel().beginUpdate();
         try {
             graph.insertVertex(parent, null, 'TEXT', 0, 350, 40, 40, 'LABEL');
         } finally {
             // 更新画布
             graph.getModel().endUpdate();
         }
     },
     // 跳过
     'SKIP': function () {
         graph.getModel().beginUpdate();
         try {
             graph.insertVertex(parent, null, '跳过', 20, 450, 290, 60, 'ROUNDED_SKIP');
         } finally {
             // 更新画布
             graph.getModel().endUpdate();
         }
     },
     // 首页面
     'FIRSTPAGE': function () {
         graph.getModel().beginUpdate();
         try {
             // FIRSTPAGE_BACKGROUND
             var fParent = graph.insertVertex(parent, null, null, 0, 0, 300, 700, 'FIRSTPAGE_BACKGROUND');

             // FIRSTPAGE_TITLE
             var fTitle = graph.insertVertex(fParent, null, '欢迎来到BFT, 请先完成新手任务哦', 25, 120, 250, 50, 'FIRSTPAGE_TITLE');
             graph.insertVertex(fTitle, null, null, 105, -30, 40, 40, 'FIRSTPAGE_TITLE_LOGO');

             // FIRSTPAGE_TASKLIST
             var fTasklist = graph.insertVertex(fParent, null, null, 20, 300, 260, 140, 'TASKLIST_BACKGROUND_0');
             graph.insertVertex(fTasklist, null, null, 40, 60, 180, 80, 'TASKLIST_BACKGROUND_3');
             graph.insertVertex(fTasklist, null, null, 20, 15, 220, 120, 'TASKLIST_BACKGROUND_2');

             var fLabel = graph.insertVertex(fTasklist, null, null, 0, 0, 260, 100, 'TASKLIST_BACKGROUND');
             graph.insertVertex(fLabel, null, '完成自动挖矿任务', 88, 35, 130, 28, 'TASKLIST_ROUNDED');
             var fStart = graph.insertVertex(fLabel, null, '开始', 200, 25, 50, 50, 'TASKLIST_START');
             fStart.step = 'step1';
             graph.insertVertex(fLabel, null, '任务', 12, 35, 25, 25, 'LABEL');
             graph.insertVertex(fLabel, null, '01', 40, 32, 25, 25, 'LABEL_BLOD');

         } finally {
             // 更新画布
             graph.getModel().endUpdate();
         }
     },
     // 结束页面
     'ACCOMPLISHED': function () {
         graph.getModel().beginUpdate();
         try {
             // ACCOMPLISHED_BACKGROUND
             var aParent = graph.insertVertex(parent, null, null, 0, 0, 300, 700, 'ACCOMPLISHED_BACKGROUND');

             // ACCOMPLISHED_LAYOUT
             var aLayout = graph.insertVertex(aParent, null, '退出新手引导', 140, 20, 150, 80, 'LAYOUT');
             graph.insertVertex(aLayout, null, '03', 20, 30, 20, 20, 'LABEL_BLOD');

             // ACCOMPLISHED_TITLE
             var aTitle = graph.insertVertex(aParent, null, null, 20, 150, 260, 140, 'ACCOMPLISHED_TITLE');
             graph.insertVertex(aTitle, null, '恭喜您！通关啦！', 0, 10, 260, 30, 'ACCOMPLISHED_TITLE_LABEL');

             // ACCOMPLISHED_TASKLIST
             var aTasklist = graph.insertVertex(aParent, null, null, 10, 250, 280, 270, 'TASKLIST_BACKGROUND_0');
             graph.insertVertex(aTasklist, null, '新手引导已完成！', 0, 20, 280, 250, 'ACCOMPLISHED_TASKLIST_BACKGROUND');
             graph.insertVertex(aTasklist, null, '第 3 关', 85, -20, 110, 80, 'ACCOMPLISHED_TASKLIST_LOGO');
             graph.insertVertex(aTasklist, null, null, 10, 70, 80, 100, 'ACCOMPLISHED_TASKLIST_BADGE01');
             graph.insertVertex(aTasklist, null, null, 100, 70, 80, 100, 'ACCOMPLISHED_TASKLIST_BADGE02');
             graph.insertVertex(aTasklist, null, null, 190, 70, 80, 100, 'ACCOMPLISHED_TASKLIST_BADGE03');
             graph.insertVertex(aTasklist, null, '完成', 65, 200, 150, 50, 'ROUNDED_SKIP');
         } finally {
             // 更新画布
             graph.getModel().endUpdate();
         }
     }
 }

 /**
  * 工具栏点击新增cell
  * @param {*} type 元素类型 
  */
 function addCells(type) {
     var type = type.toUpperCase();
     if (cells.hasOwnProperty(type)) {
         cells[type]();
     }

 }

 /**
  * 页面保存
  */
 function pageSave() {
     var cells = graph.getModel().cells;

     // 页面上有元素，则保存该页面
     if (Object.getOwnPropertyNames(cells).length > 2) {
         var page_obj = document.getElementById("pageName");
         var page_name = page_obj.value;

         // 获取页面元素 转为XML
         var encoder = new mxCodec();
         var result = encoder.encode(graph.getModel());
         var xml = mxUtils.getXml(result);
         pages[page_name] = xml;

         // 动态改变下拉框列表
         eleListChange(pages,'pageList');
         eleListChange(pages,'eventList');

         page_obj.value = null; // 清空输入框中的值

     } else {
         alert('请添加元素后再保存页面！');
     }
 }

 /**
  * 动态改变事件下拉框中的列表
  * @param {*} pages 页面列表
  * @param {*} id 要改变页面元素的ID
  */
 function eleListChange(pages, id) {

     var ele = document.getElementById(id);
     ele.innerHTML = ""; // 清空所有选项

     // 添加空选项
     var option = document.createElement("option");
     ele.appendChild(option);

     var index = 1;
     for (key in pages) {
         var option = document.createElement("option");
         option.value = index++;
         option.text = key;
         ele.appendChild(option);
     }

     // 如果是事件列表，则最后多加退出事件
     if(id === 'eventList'){
        var option = document.createElement("option");
        option.value = 'layout';
        option.text = '退出';
        ele.appendChild(option);
     }
    
 }

 /**
  * 事件绑定
  */
 function eventOK() {
     var sel_obj = document.getElementById("eventList");
     var index = sel_obj.selectedIndex;
     if (index) {
         var cell = graph.getModel().getCell(cellID);
         cell.event = `step${{index}}`;
     } else {
         alert('请选择一个事件进行绑定！');
     }

 }

 /**
  * 事件解绑
  */
 function eventCancel() {
     // 将事件下拉框清空
     var sel_obj = document.getElementById("eventList");
     sel_obj.selectedIndex = 0;

     // 获取选中的元素
     var cell = graph.getModel().getCell(cellID);
     delete cell[event]; // 删除事件绑定
 }

 /**
  * 导入XML
  */
 function importXML() {
     var req = mxUtils.load('./config/config.xml');
     var root = req.getDocumentElement();
     var dec = new mxCodec(root.ownerDocument);

     dec.decode(root, graph.getModel());

     graph.setEnabled(false); // 禁止操作
     graphState = 1; // 演示状态
 }

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