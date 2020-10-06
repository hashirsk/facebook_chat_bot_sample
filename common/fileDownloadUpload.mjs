import axios from 'axios'
import fs from 'fs'

export const toString = (data)=> data? JSON.stringify(data) : ''

export const saveAndUpdateFileToRemoteServer = (url, senderID, documentId, path = '') =>{
 
      downloadFile(url, senderID, path)
      .then(response=>{
        console.log("receiveResponse after file download ", response);
        axios.put('/userhistory/updatelog', {
          id: documentId
        },
        {
          baseUrl: 'https://damp-atoll-00850.herokuapp.com'
        })
        .then(response=>console.log("Success=>", response))
        .catch(error=>console.log("Error=>", error))
  
      })
      .catch(err=>console.log("Unable to process url ", err)) 
    
  }

function getFileName(url)
  {
  const file = {name:'', ext: ''}
     if (url)
     {
        var m = url.toString().match(/.*\/(.+?)\./);
        if (m && m.length > 1)
        {
           file.name= m[1];
           file.ext = url.split(/[#?]/)[0].split('.').pop().trim();
        }
     }
     return file;
}

export const downloadFile = (attachUrl, userId, path) => {
    
    return axios.get(attachUrl, {
        method: 'GET',
        responseType: 'stream'
    }).then(response => new Promise((resolve, reject)=>{
        console.log("called download file function to save file into the database", response.data.headers);
        let headerLine = response.data.headers['content-disposition']
        headerLine = headerLine.replace(/\"/g, "")

        let filename = ''
        let ext = ''
        if(headerLine.indexOf("\.")>0) {
          filename = headerLine.substring(headerLine.indexOf('=')+1, headerLine.length)
          ext = headerLine.substring(headerLine.indexOf("\.")+1, headerLine.length)
        } else {
          const f = getFileName(path)
          filename = f.name
          ext = f.ext
        }
       
        //const fs = require('fs')
        let dir = `attachment/${userId}/${ext}`
        if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        }
        console.log("is Directory exist ", fs.existsSync(dir));
        
        const finalPath = dir+'/'+filename
        let writer = fs.createWriteStream(finalPath)
        
        response.data.pipe(writer);
        let error = undefined
        writer.on('error', err=>{
          error = err
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