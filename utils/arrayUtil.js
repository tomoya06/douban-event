/**
 * function for update list with id. need to bind to 'this' when use it. 
 * @param {Array} list 
 * @param {String} idFlag
 */
export function removeDuplicated(list, idFlag) {
    const idList = [];
    list.forEach((item, index)=>{
        if (idList.indexOf(item[idFlag]) !== -1) {
            list.splice(index, 1);
        } else {
            idList.push(item[idFlag]);
        }
    })
}