import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const createFileLink = (req, res) => {
    // 
    const file = `${dirname(fileURLToPath(import.meta.url))}/../attachment/${req.params.userid}/${req.params.ext}/${req.params.filename}`;
    console.log("got it", file);
    res.download(file);
}