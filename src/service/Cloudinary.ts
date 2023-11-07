import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";

interface ICloudinary {
    uploadImage(imageToUpload: string): Promise<ICloudinaryResponse>
}

interface ICloudinaryResponse {
    isSuccess:boolean,
    message:string,
    statusCode:number,
    imageURL?:string }

export class Cloudinary implements ICloudinary {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    public uploadImage = async (imageToUpload: string): Promise<ICloudinaryResponse> => {
        try {
            const cloudinaryImageUploadResponseData = await cloudinary.uploader.upload(
                imageToUpload,
                {
                    folder: process.env.CLOUDINARY_FOLDER_NAME,
                    public_id: process.env.CLOUDINARY_IMAGE_BASE_NAME + '-time-' + Date.now().toString()
                }
            );

            const { url } = cloudinaryImageUploadResponseData;

            if (!url) {
                unlinkSync(imageToUpload);
                return {
                    isSuccess: false,
                    message:
                        "Couldn't upload your image at the moment. Please try again later.",
                    statusCode: 400,
                };
            }

            unlinkSync(imageToUpload);
            return {
                isSuccess: true,
                message: "Successfully uploaded image.",
                statusCode: 200,
                imageURL: url,
            };
        } catch (error) {
            unlinkSync(imageToUpload);
            return {
                isSuccess: false,
                message: "Internal Server Error",
                statusCode: 500,
            };
        }
    }
}
