const { SortCompanyNumbers,TransDate }  = require("./RepoDataBasicProcess");
const { default: axios } = require("axios");


/** get commit frequecy  */
const RepoGetCommitFrequency = async (owner, name, octokit) => {
    console.log("Getting Commmit...");
    const repoMessage = await octokit.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: owner,
        repo: name,
        per_page: 100,
        page: 1,
      }
    );
  
    if (repoMessage.data.length == 0) return { 2021: "0", 2020: "0", 2019: "0" };
    for (var i = 2; ; i++) {
      const NextRepoMessage = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
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
    var orgs = [];
    var urls = []
    try {
      /** analysis the company info */
      for (var i = 1; i < repoMessage.data.length; i++) {
        var url = repoMessage.data[i].author.url;
        // await octokit.request(
        //   "GET /users/{login}",
        //   {
        //     login: login
        //   }
        // ).then(
        //     res=>{
        //         if(res.data.company)
        //           orgs.push(res.data.company.toLowerCase().replace("@","").trim()) 
        //     });
        // }
        urls.push(url);
      }
      if (urls.length != 0) {
        var res = [];
        try {
          const resp = await axios.get("http://127.0.0.1:5000/", {
            params: {
              urls: JSON.stringify(urls)
            }
          });
          res = resp.data
  
        }catch(err){
           res = []   
        }finally{
          orgs = res;
          console.log(orgs)
        }
      }
    } catch (err) { }
  
    orgs = orgs.filter(res=>res!==null);
    orgs = orgs.map(org=>org.toLowerCase().trim().replace("@",""));
  
    const x1 = repoMessage.data[0].commit.committer.date;
    const x2 =
      repoMessage.data[repoMessage.data.length - 1].commit.committer.date;
    
      const t1 = TransDate(x1);
    const t2 = TransDate(x2);
    year1 = Math.floor(t1 / 12);
    year2 = Math.floor(t2 / 12);
 

    return {
      "orgs": SortCompanyNumbers(orgs),
      "freq": {
          "Day": CountDayCommit(repoMessage),
          "Month":  CountMonthCommit(t1, t2, repoMessage.data),
          "Year": CountYearCommit(year1, year2, repoMessage.data),
          "AllCommits":RecordAllCommitsTime(repoMessage.data),
       }
    };
}
  
  

/** count day commit */
const CountDayCommit = (Msg) => {
    var order = {};
    var result = {};
  
    for (var i in Msg.data) {
      var t = Msg.data[i].commit.committer.date.substring(0, 10);
      formalLength = Object.keys(order).length;
      if (!(t in result)) {
        order[formalLength.toString()] = t;
        result[t] = 1;
      } else {
        result[t] += 1;
      }
    }
    var pra = Math.floor((Object.keys(order).length - 1) / 6) + 1;
    var answer = {};
    var a = Math.floor(Object.keys(order).length / pra);
    if (pra == 1) {
      for (var i = 0; i < a; i++) {
        answer[order[i.toString()]] = result[order[i.toString()]];
      }
      return answer;
    }
    for (var i = 0; i < a; i++) {
      pp = order[i * pra];
      var sum = 0;
      for (var j = i * pra; j <= i * pra + pra - 1; j++) {
        sum += result[order[j.toString()]];
      }
      answer[pp] = sum;
    }
    return answer;
};

const CountYearCommit = (year1, year2, commitmsg) => {
    var countNum = new Array(year1 - year2 + 1).fill(0);
    commitmsg.map((x) => {
      year0 = Math.floor(TransDate(x.commit.committer.date) / 12);
      countNum[year1 - year0] += 1;
    });
  
    var obj = {};
    for (var i = year1-2000; i >= year2; i--) {
      nn = i + 2000;
      cc = nn + "";
      obj[cc] = countNum[year1 - i];
    }
    return obj;
};

const CountMonthCommit = (t1, t2, commitmsg) => {
    var countNum = new Array(t1 - t2 + 1).fill(0);
    commitmsg.map((x) => {
      t = TransDate(x.commit.committer.date);
      countNum[t1 - t] += 1;
    });
  
    var obj = {};
    for (var i = t1; i >= t2; i--) {
      mm = (i % 12) + 1;
      nn = (i - mm + 1) / 12 + 2000;
      cc = mm > 9 ? nn + "-" + mm : nn + "-0" + mm;
      obj[cc] = countNum[t1 - i];
    }
    return obj;
  };

const RecordAllCommitsTime = (cms)=>{
     var obj = []
     for(var i=cms.length-1;i>=0;i--){
         obj.push(cms[i].commit.committer.date) 
     }
     return obj;
} 


module.exports =  RepoGetCommitFrequency;