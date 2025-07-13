import conf from "../conf/conf";
import {Client , ID , Databases ,Storage , Query} from "appwrite"

export class Services {
    client = new Client()
    databases;
    bucket
    constructor(){
        this.client
                   .setEndPoint(conf.appwriteUrl)
                   .setProject(conf.appwriteProjectId)
     this.databases = new Databases(this.client)
     this.bucket = new Storage(this.client)
    }
    async createPost ({title , slug , content , featuredImage , status , userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBucketId,
                slug,
                {
                 title,
                 content , 
                 featuredImage ,
                 status, 
                 userId
                }
            )
        } catch (error) {
            console.log("Appwrite service : crestePost ::error" , error);
            
        }
        
    }
    async updatePost({title  , content , featuredImage , status , userId}){
     try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        )
     } catch (error) {
        console.log("Appwrite Service : UpdatePost ::error" , error);
        
     }
    }
    async deletePost (slug){
    try {
        await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
        )
        return true
    } catch (error) {
        console.log("Appwrite Service ::DeletePost ::error" , error);
      return false  
    }
    }
    async getPost (slug){
    try {
      return await this.databases.getDocument(
        conf.appwriteCollectionId,
        conf.appwriteDatabaseId,
        slug
      )
    } catch (error) {
        console.log("Appwrite Servies ::getPost ::error",error);
        
    }
    }
    async getPosts (queries = [Query.equal("status" ,"active")]){
    try {
    return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
    ) 
    } catch (error) {
    console.log("Apwrite Services ::getPost ::error" , error);
    return false
    }
    }
    //File Upload Services
    async UploadFiles (file){
    try {
        await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique()
        )
    } catch (error) {
    console.log("Appwrite Services ::Upload Fils ::error",error);
    return false
    }
    }
    async DeleteFile(fileid){
    try {
        await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileid
        )
    } catch (error) {
        console.log("Appwrite Services ::Delete Files ::error",error);
        return false
        
    }
    }
    async GetFilePreview(fileid){
        return this.bucket.getfilePreview(
            conf.appwriteBucketId,
            fileid
        )
    }
}

const service = new Services()
export default service