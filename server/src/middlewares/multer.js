import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const upload = multer({ dest: path.join(__dirname, "../../uploads") });
const upload = multer({ dest: path.join(__dirname, "../../uploads") });

export default upload;