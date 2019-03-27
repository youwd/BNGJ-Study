var config = [{
        "step": "1",
        "elementId": "id01",
        "top": "100px"
    },
    {
        "step": "2",
        "elementId": "id02"
    },
    {
        "step": "3",
        "elementId": "id03"
    }
];


(function () {

    var ele_body = document.body;

    //添加mask掩膜
    var ele_mask = document.createElement("div");
    ele_mask.id = 'mask';
    ele_body.appendChild(ele_mask);

    config.forEach(item => {
        ele = document.createElement("div");
        ele.id = item.step;
        ele.class = "step_style1";
        ele.style.top = "100px";
        ele.style.left = "100px";

        ele_mask.appendChild(ele);
    });
})()