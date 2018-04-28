
let carryType = {
  "type":[
    {
        "ID":1,
        "Name":"三轮车(有蓬)"
    },
    {
        "ID":2,
        "Name":"三轮车(封闭驾驶舱)"
    },
    {
        "ID":3,
        "Name":"自行车"
    },
    {
        "ID":4,
        "Name":"摩托车/电瓶车"
    },
    {
        "ID":5,
        "Name":"三轮车(无蓬)"
    }
]
};

let carryAngle = {"angle":[
    {
        "ID":1,
        "Name":"正面"
    },
    {
        "ID":2,
        "Name":"侧右面"
    },
    {
        "ID":3,
        "Name":"侧左面"
    },
    {
        "ID":4,
        "Name":"背"
    }
]};

let carryColor = {
    "color": [
        {
            "Name": "白色车身",
            "ID": 1
        },
        {
            "Name": "灰色车身",
            "ID": 2
        },
        {
            "Name": "黑色车身",
            "ID": 3
        },
        {
            "Name": "绿色车身",
            "ID": 4
        },
        {
            "Name": "蓝色车身",
            "ID": 5
        },
        {
            "Name": "红色车身",
            "ID": 6
        },
        {
            "Name": "紫色车身",
            "ID": 7
        },
        {
            "Name": "黄色车身",
            "ID": 8
        },
        {
            "Name": "粉色车身",
            "ID": 9
        },
        {
            "Name": "橙色车身",
            "ID": 10
        },
        {
            "Name": "棕色车身",
            "ID": 11
        },
        {
            "Name": "花色车身",
            "ID": 12
        }
    ]
};

/*export function  getCarryType(){
  return carryType;
}

export function  getCarryAngle(){
  return carryType;
}

export function  getCarryColor(){
  return carryType;
}*/
export default ({

  getCarryType:function(){
    return carryType
  },

  getCarryAngle:function(){
    return carryAngle
  },

  getCarryColor:function(){
    return carryColor
  }
})
