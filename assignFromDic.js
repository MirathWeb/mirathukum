function assignFromDic(obj, dic) {

    Object.keys(obj).forEach(function(index) {
        if (typeof obj[index] === "number") {
            obj[index] = (dic[index] ?  dic[index] : 0);
        } else if (typeof obj[index] === "object") {
            assignFromDic(obj[index], dic);
        }
    });

}