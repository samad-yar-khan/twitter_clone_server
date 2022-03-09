const environment = require('../../../config/environment');
const octokitHelper = require('octokit');
const Octokit = octokitHelper.Octokit;
const octokit = new Octokit();

module.exports.main = async function(req,res){

    try{
        
        let returnedData = await octokit.request("GET /repos/{owner}/{repo}", {
            owner: "RocketChat",
            repo: "RC4Community",
        });
        const {data} = returnedData;
        const {id,name,owner,full_name , html_url , description , stargazers_count,forks_count,open_issues_count,topics } = data;
        const ownerName = owner.login;
        const compactData = {id,full_name , name,ownerName, html_url , description , stargazers_count,forks_count,open_issues_count,topics};
        return res.status(200).json({
            data : compactData
        })

    }catch(err){
        return res.json(500 , {
            error_message : err,
            success:false,
            message:"Internal Server Error!"
        })
    }
  
}

module.exports.issues = async function(req,res){

    try{
        
        let returnedData = await octokit.request("GET /repos/{owner}/{repo}/issues", {
            owner: "RocketChat",
            repo: "RC4Community",
          });
        let data = returnedData;
        return res.status(200).json({
            data : returnedData
        })

    }catch(err){
        return res.json(500 , {
            error_message : err,
            success:false,
            message:"Internal Server Error!"
        })
    }
  
}
module.exports.contributors = async function(req,res){

    try{
        
        let data = await octokit.request("GET /repos/{owner}/{repo}/contributors", {
            owner: "RocketChat",
            repo: "RC4Community",
          });

        return res.status(200).json({
            data : data
        })

    }catch(err){
        return res.json(500 , {
            error_message : err,
            success:false,
            message:"Internal Server Error!"
        })
    }

}