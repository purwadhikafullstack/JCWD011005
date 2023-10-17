const multer = require("multer");
const fs = require("fs");
const util = require("util")

let defaultPath = "public/images";
const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		const isDirectoryExist = fs.existsSync(`${defaultPath}/${file.fieldname}`);
		if (!isDirectoryExist) {
			await fs.promises.mkdir(`${defaultPath}/${file.fieldname}`, {
				recursive: true,
			});
		}

		cb(null, `${defaultPath}/${file.fieldname}`);
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname +
				"-" +
				Date.now() +
				Math.round(Math.random() * 1000000000) +
				"." +
				file.mimetype.split("/")[1]
		);
	},
});

const maxSize = 1 * 1000 * 1000;
const fileFilter = (req, file, cb) => {
	const fileType = file.mimetype.split("/")[1];
	if (
		fileType === "png" ||
		fileType === "jpg" ||
		fileType === "jpeg" ||
		fileType === "gif"
	) {
		cb(null, true);
	} else {
		cb(new Error("File format not match"));
	}
};

const handleFileError = (err, req, res, next) => {
	if (err instanceof multer.MulterError) {
	  if (err.code === "LIMIT_FILE_SIZE") {
		return res
		  .status(400)
		  .json({ error: "File size is too big. It can't be more than 1MB" });
	  }
	} else if (err) {
	  if (err.message.startsWith("File format not supported")) {
		return res.status(400).json({ error: err.message });
	  }
	  return res.status(400).json({ error: err.message });
	}
	next(err);
  };
  

const multerUpload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: maxSize },
	
});


module.exports = {
	multerUpload,
	handleFileError,
};