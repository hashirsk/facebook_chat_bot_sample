import axios from 'axios'

export const toString = (data)=> data? JSON.stringify(data) : ''

export const saveAndUpdateFileToRemoteServer = (url, senderID, documentId) =>{
 
      fileUtils.downloadFile(url, senderID)
      .then(response=>{
        console.log("receiveResponse after file download ", response);
        axios.put('/userhistory/updatelog', {
          id: documentId
        },
        {
          baseUrl: 'https://damp-atoll-00850.herokuapp.com'
        })
        .then(response=>console.log(response))
        .catch(error=>console.log(error))
  
      })
      .catch(err=>console.log("Unable to process url ", err)) 
    
  }

export const downloadFile = (attachUrl, userId) => {
    const axios = require('axios')
    return axios.get(attachUrl, {
        method: 'GET',
        responseType: 'stream'
    }).then(response => new Promise((resolve, reject)=>{
        console.log("called download file function to save file into the database");
        let headerLine = response.data.headers['content-disposition']
        headerLine = headerLine.replace(/\"/g, "")
        let filename = headerLine.substring(headerLine.indexOf('=')+1, headerLine.length)
        let ext = headerLine.substring(headerLine.indexOf("\.")+1, headerLine.length)
       

        const fs = require('fs')
        let dir = `attachment/${userId}/${ext}`
        if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        }
        console.log("is Directory exist ", fs.existsSync(dir));
        
        const finalPath = dir+'/'+filename
        let writer = fs.createWriteStream(finalPath)
        
        response.data.pipe(writer);
        
        writer.on('error', err=>{
          writer.close()
          console.log('got an error')
          reject(err);
        })

        writer.on('close', () => {
        if (!error) {
            console.log('success')
            resolve(`${userId}/${ext}/${filename}`);
          }
        });
    })
    )
}