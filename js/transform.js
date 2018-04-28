/**
 * 将ID转化为字段
 *
 */

/**
 *机动车转化
 */
function getNameBySensorID(ID,sensorJosnData) {
    var sensorID = ID;
    var sensorName = ID;
    for (x in sensorJosnData) {
        if (sensorJosnData[x].SensorId == sensorID) {
            sensorName = sensorJosnData[x].Name;
            break;
        }
    }
    return sensorName;
}

function getNameByBrandID(ID, subID, yearID) {
    var name = ID;
    var subName = subID;
    var year = yearID;
    name = carBrandList.brand[ID].name.chs;
    subName = carBrandList.brand[ID].subbrand[subID].name.chs;
    year = carBrandList.brand[ID].subbrand[subID].year[yearID].name.chs;
    return name + '-' + subName + '-' + year;
}

function getNameByStyleID(ID) {
    var name = ID;
    for (x in carType.type) {
        if (carType.type[x].ID == ID) {
            name = carType.type[x].Name;
            break;
        }
    }
    return name;
}

function getCarColorByColorID(ID) {
    var name = ID;
    for (x in carColor.color) {
        if (carColor.color[x].ID == ID) {
            name = carColor.color[x].Name;
            break;
        }
    }
    return name;
}

function getPlateTypeByPlateID(ID) {
    var name = ID;
    for (x in plateType.type) {
        if (plateType.type[x].ID == ID) {
            name = plateType.type[x].Name;
            break;
        }
    }
    return name;
}

function getPlateColorByPlateID(ID) {
    var name = ID;
    for (x in plateColor.color) {
        if (plateColor.color[x].ID == ID) {
            name = plateColor.color[x].Name;
            break;
        }
    }
    return name;
}

function getSymbolsByID(ID) {
    var name = ID;
    for (x in carMark.mark) {
        if (carMark.mark[x].ID == ID) {
            name = carMark.mark[x].Name;
            break;
        }
    }
    return name;
}


/**
 *行人
 */






function getPassAgeByID(ID) {
    var name = ID;
    for (x in passAge.age) {
        if (passAge.age[x].ID == ID) {
            name = passAge.age[x].Name;
            break;
        }
    }
    return name;
}

function getPassSexByID(ID) {
    var name = ID;
    for (x in passSex.sex) {
        if (passSex.sex[x].ID == ID) {
            name = passSex.sex[x].Name;
            break;
        }
    }
    return name;
}


function getpassNationalByID(ID) {
    var name = ID;
    for (x in passNational.national) {
        if (passNational.national[x].ID == ID) {
            name = passNational.national[x].Name;
            break;
        }
    }
    return name;
}


function getNameByHeadMarkID(ID) {
    var name = ID;
    for (x in headMark.mark) {
        if (headMark.mark[x].ID == ID) {
            name = headMark.mark[x].Name;
            break;
        }
    }
    return name;
}

function getNameByPassBagID(ID) {
    var name = ID;
    for (x in passBag.bag) {
        if (passBag.bag[x].ID == ID) {
            name = passBag.bag[x].Name;
            break;
        }
    }
    return name;
}


function getClotheColorByColorID(ID) {
    var name = ID;
    for (x in passClotheColor.color) {
        if (passClotheColor.color[x].ID == ID) {
            name = passClotheColor.color[x].Name;
            break;
        }
    }
    return name;
}

function getClotheByClotheID(ID) {
    var name = ID;
    for (x in passClothes.clothe) {
        if (passClothes.clothe[x].ID == ID) {
            name = passClothes.clothe[x].Name;
            break;
        }
    }
    return name;
}

function getPassPantsColorByID(ID) {
    var name = ID;
    for (x in passPantsColor.color) {
        if (passPantsColor.color[x].ID == ID) {
            name = passPantsColor.color[x].Name;
            break;
        }
    }
    return name;
}

function getPassPantsByID(ID) {
    var name = ID;
    for (x in passPants.pants) {
        if (passPants.pants[x].ID == ID) {
            name = passPants.pants[x].Name;
            break;
        }
    }
    return name;
}


/**
 *非机动车
 */


function getCarryTypeByID(ID) {
    var name = ID;
    for(x in carryType.type)
    {
        if(carryType.type[x].ID == ID)
        {
            name = carryType.type[x].Name;
            break;
        }
    }
    return name;
}

function getCarryAngleByID(ID) {
    var name = ID;
    for(x in carryAngle.angle)
    {
        if(carryAngle.angle[x].ID == ID)
        {
            name = carryAngle.angle[x].Name;
            break;
        }
    }
    return name;
}

function getCarryColorByID(ID){
    var name = ID;
    for(x in carryColor.color)
    {
        if(carryColor.color[x].ID == ID)
        {
            name = carryColor.color[x].Name;
            break;
        }
    }
    return name;
}

function getCarrySexByID(ID){
    var name = ID;
    for(x in carrySex.sex)
    {
        if(carrySex.sex[x].ID == ID)
        {
            name = carrySex.sex[x].Name;
            break;
        }
    }
    return name;
}

function getCarryNationalByID(ID){
    var name = ID;
    for(x in carryNational.national)
    {
        if(carryNational.national[x].ID == ID)
        {
            name = carryNational.national[x].Name;
            break;
        }
    }
    return name;
}

function getCarryHeadMarkByID(ID){
    var name = ID;
    for(x in carryHeadMark.mark)
    {
        if(carryHeadMark.mark[x].ID == ID)
        {
            name = carryHeadMark.mark[x].Name;
            break;
        }
    }
    return name;
}

function getCarryBagByID(ID){
    var name = ID;
    for(x in carryBag.bag)
    {
        if(carryBag.bag[x].ID == ID)
        {
            name = carryBag.bag[x].Name;
            break;
        }
    }
    return name;
}

function getCarryClotheColorByID(ID){
    var name = ID;
    for(x in carryClotheColor.color)
    {
        if(carryClotheColor.color[x].ID == ID)
        {
            name = carryClotheColor.color[x].Name;
            break;
        }
    }
    return name;
}

function getCarryClotheTypeByID(ID){
    var name = ID;
    for(x in carryClotheType.type)
    {
        if(carryClotheType.type[x].ID == ID)
        {
            name = carryClotheType.type[x].Name;
            break;
        }
    }
    return name;
}