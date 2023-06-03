const http=require('http')
const fs=require('fs')
const path=require('path')
const url=require('url')
const mime=require('mime')

const itemList=fs.readdirSync('./items','utf-8')

const server = http.createServer(function(req, res) {   
  
  const parsedUrl=url.parse(req.url, true)
  const pathName=parsedUrl.pathname

  if (req.url === '/') {
      const html = fs.readFileSync('./index.html', 'utf8')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(html)
      res.write('\n')
      res.write('<pre>' + '现有的文件'+('\n') + '</pre>')
      res.write('<pre>' + itemList.join('\n') + '</pre>')
      res.end()
    }    
    else {
      const filePath=path.join(__dirname,"/items",pathName)

      fs.access(filePath,fs.constants.R_OK,(err)=>{
        if(err){
          res.statusCode=404
          res.end('Not found')
        }else{
          const file=fs.readFileSync(filePath)
          const contentType=mime.getType(filePath)
          res.writeHead(200,{'Content-Type':contentType})
          res.end(file)
        }        
      })
    }
  })

server.listen(1551,'0.0.0.0')