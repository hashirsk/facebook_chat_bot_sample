const axios = require('axios');

module.exports = function getQuery(senderID, text, pf){
  return new Promise((resolve, reject)=>{
    axios.post(
      'https://damp-atoll-00850.herokuapp.com/query/getAnswers',
      {
        userId: senderID,
        query: text,
        platform: pf
      },
      {
        // params:{
        //   access_token: process.env.PAGE_ACCESS_TOKEN
        // }
      }
    ).then(function (response) {
      resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
