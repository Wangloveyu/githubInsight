/** sort comany numbers */
const SortCompanyNumbers = (comanys) => {
    var orgs = []
    var map = new Map();
    for (var i = 0; i < comanys.length; i++) {
  
      if (map.has(comanys[i])) {
        var n = map.get(comanys[i])
        map.set(comanys[i], n + 1);
      }
      else
        map.set(comanys[i], 1);
    }
    orgs = Array.from(map);
    orgs = orgs.sort(
      (a, b) => {
        return b[1] - a[1]
      }
    )
    orgs = orgs.map(com => ({ name: com[0], num: com[1] }))
    return orgs;
}

 
const uniqueEle = (arr) => {
  ret = {}
  map = new Map
  for (var i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      const obj = map.get(arr[i])
      obj.num++
      map.set(arr[i], obj)
    }
    else {
      map.set(arr[i], { num: 1, company: null })
    }
  }
  for (pair of map) {
    ret[pair[0]] = pair[1]
  }
  return ret
}

  
module.exports = {
  uniqueEle,
  SortCompanyNumbers
}