const { SortCompanyNumbers, uniqueEle } = require("./RepoDataBasicProcess");
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
  var counter = 0;
  for (var i = 2; ; i++) {
    console.log("commit page: "+i);
    var NextRepoMessage = []
    try {
      NextRepoMessage = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: owner,
          repo: name,
          per_page: 100,
          page: i,
        }
      );
      console.log("length: "+NextRepoMessage.data.length)
    } catch (err) { 
       counter++;
       console.log(counter); 
       if(counter==10) break; else continue}
    if (NextRepoMessage.data.length == 0)
      break;
    else repoMessage.data = repoMessage.data.concat(NextRepoMessage.data);

  }

  /** get company's information, use mutiple thread or one thread */
  var orgs = []
  var urls = []
  /** analysis the company info */
  const length = repoMessage.data.length < 1000 ? repoMessage.data.length : 1000
  for (var i = 1; i < length; i++) {
    try {
      var url = repoMessage.data[i].author["url"];
      urls.push(url);
    } catch (err) { console.log(err); }
  }

  /** muti thread spidere */
  console.log("Muti thread Spiding...")
  if (urls.length != 0) {
    var res = [];
    try {
      const resp = await axios.get("http://127.0.0.1:5000/", {
        params: {
          urls: JSON.stringify(urls)
        }
      });
      res = resp.data;
    } catch (err) {
      console.log(err)
      res = []
    } finally {
      orgs = res;
    }
  }
  orgs = orgs.filter(o => o !== null);
  /** on thread spider, when the muti thread spider has nothing return */
  if (orgs.length == 0) {
    console.log("One thread Spiding...")
    if (urls.length > 300) {
      var lessUrls = []
      for (var i = 0; i < 300; i++) {
        lessUrls.push(urls[i]);
      }
      urls = lessUrls;
    }
    const urlsJosn = uniqueEle(urls);  // transfer to json { userurl:{company:null num:x} }
    console.log(urlsJosn);
    var oneThreadResult = [];
    for (var key in urlsJosn) {
      try {
        const pieces = key.split("/");
        const login = pieces[pieces.length - 1];
        console.log(login)
        await octokit.request(
          "GET /users/{login}",
          {
            login: login
          }
        ).then(
          res => {
            if (res.data.company) {
              for (var i = 0; i < urlsJosn[key].num; i++) {
                oneThreadResult.push(res.data.company);
              }
            }
          });
      } catch (err) { console.log(err) }
    }
    orgs = oneThreadResult;
  }
  orgs = orgs.filter(res => res !== null);
  orgs = orgs.map(org => org.toLowerCase().trim().replace("@", ""));
  return {
    "orgs": SortCompanyNumbers(orgs),
    "freq": {
      "Day": NewCountDayCommit(repoMessage),
      "Month": NewCountMonthCommit(repoMessage),
      "AllCommits": RecordAllCommitsTime(repoMessage.data),
    }
  };
}

const NewCountDayCommit = (Msg) => {
  var map = new Map
  var ret = {}
  for (var i in Msg.data) {
    var t = Msg.data[i].commit.committer.date.substring(0, 10);
    if (map.has(t)) {
      map.set(t, map.get(t) + 1)
    }
    else {
      map.set(t, 1)
    }
  }
  for (var pair of map) {
    ret[pair[0]] = pair[1]
  }
  return ret
}

const NewCountMonthCommit = (Msg) => {
  var map = new Map
  var ret = {}
  for (var i in Msg.data) {
    var t = Msg.data[i].commit.committer.date.substring(0, 7);
    if (map.has(t)) {
      map.set(t, map.get(t) + 1)
    }
    else {
      map.set(t, 1)
    }
  }
  for (var pair of map) {
    ret[pair[0]] = pair[1]
  }
  return ret
}


const RecordAllCommitsTime = (cms) => {
  var obj = []
  for (var i = cms.length - 1; i >= 0; i--) {
    obj.push(cms[i].commit.committer.date)
  }
  return obj;
}


module.exports = RepoGetCommitFrequency;
