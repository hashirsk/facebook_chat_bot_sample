// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// dirname(fileURLToPath(import.meta.url))

export const createFileLink = (req, res) => {
    const file = `attachment/${req.params.userid}/${req.params.ext}/${req.params.filename}`;
    console.log("got it", file);
    res.download(file);
}