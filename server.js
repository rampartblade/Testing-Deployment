function requireHTTPS(req, res, next){
    //membuat semua request yang sebelumnya HTTP menjadi HTTPS
    if(
        !req.secure && req.get('x-forwarded-proto') !== 'https' //khusus untuk server yang di deploy di heroku
    ){
        return res.redirect('https://' + req.get('host') + req.url)
    }
    next();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 8080


app.use(requireHTTPS);
//nama app mengikuti nama package.json
app.use(express.static('./dist/testing'));

app.get('/*',(req, res) =>
    res.sendFile('index.html', {root: 'dist/testing'}),
);

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost: ${port}`)
})