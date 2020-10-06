exports.createFileLink = (req, res) => {
    // 
    const file = `${__dirname}/../attachment/${req.params.userid}/${req.params.ext}/${req.params.filename}`;
    console.log("got it", file);
    res.download(file);
}