/** handle and getting pull requesets */
const fs = require('fs')

async function KeyWordsReadFile(){
  const allContents  = fs.readFileSync("keywords.txt",'utf-8');
  return allContents;
}

function TypeMatch(input,allContents){
  
  const set1 = new Set();
  var flag = false
  allContents.split(/\n/).forEach(line =>{
      var pos = line.lastIndexOf ('-')
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

const RepoGetPullRequests = async (owner, name, octokit) => {

    const repoMessage = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls",
      {
        owner: owner,
        repo: name,
        per_page: 100,
        page: 1,
      }
    );
  
    if (repoMessage.data.length == 0) return "none";
    for (var i = 2; i <= 5; i++) {
      const NextRepoMessage = await octokit.request(
        "GET /repos/{owner}/{repo}/pulls",
        {
          owner: owner,
          repo: name,
          per_page: 100,
          page: i,
        }
      );
      if (NextRepoMessage.data.length == 0) break;
      else repoMessage.data = repoMessage.data.concat(NextRepoMessage.data);
    }
    
    var design = {
       "code":0,
       "maintainability":0,
       "testing":0,
       "robustness":0,
       "performance":0,
       "configuration":0,
       "documentation":0,
       "clarification":0,
       "no-design": 0
    }
   
    const allContents = await KeyWordsReadFile();
    /** do the pull request's at
     * nalizes */  
    for (var i = 0; i < repoMessage.data.length; i++) {
        var body = repoMessage.data[i].body;
        if(body){
           var types = TypeMatch(body,allContents);
           for(let i of types){
              i = i.replace("\r","");
              var a = design[i];
              if(!isNaN(a))
                 design[i] = a+1;
           }
      }
    }

    return design
}

module.exports =  RepoGetPullRequests;