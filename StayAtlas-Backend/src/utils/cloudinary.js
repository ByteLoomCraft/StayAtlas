import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    }
)

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
            folder: "StayAtlasVillaImages"
        })
        //console.log(response)
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return response
    } catch (error) {
        console.error("Cloudinary upload ERROR:",error)
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null
    }
}

const uploadMultipleImagesParallel = async (filePaths = []) => {
    const uploadPromises = filePaths.map(path => uploadOnCloudinary(path));
    const results = await Promise.allSettled(uploadPromises); 
    //console.log("Result:",results)
    const successfulUploads = [];
    const failedFilePaths = [];

    // Separate successes and failures
    results.forEach((result, index) => {
    if (result.status === "fulfilled" && result.value) {
        successfulUploads.push(result.value);
    } else {
        failedFilePaths.push(filePaths[index]);
    }
    });

    // Optional Retry Logic
    if (failedFilePaths.length > 0) {
    console.log(`Retrying ${failedFilePaths.length} failed uploads...`);

    const retryResults = await Promise.allSettled(
        failedFilePaths.map(path => uploadOnCloudinary(path))
    );

    retryResults.forEach(result => {
        if (result.status === "fulfilled" && result.value) {
        successfulUploads.push(result.value); 
        }
    });
    }

    return successfulUploads
};

export {uploadMultipleImagesParallel}