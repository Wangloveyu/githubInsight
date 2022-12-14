const TransDate = (date) => {
    year = date.substring(0, 4);
    month = date.substring(5, 7);
    year1 = parseInt(year, 10);
    month1 = parseInt(month, 10);
    return (year1 - 2000) * 12 + month1 - 1;
  };
  
  
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

function TypeMatch(input,allContents){
  const set1 = new Set();
  var flag = false
  allContents.split(/\n/).forEach(line =>{
      var pos = line.indexOf('-')
      if(pos>0){
          var tag = line.substring(0,pos)
          var type = line.substring(pos+1)
          if(input.match(tag)){
              set1.add(type)
              flag = true
          }
      }
  });
  if(flag == false){
      set1.add('no-design')
  }
  return set1
}

  
module.exports = {
  TransDate,
  SortCompanyNumbers
}