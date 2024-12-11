import { Client, Databases, ID, Query } from 'appwrite';
import conf from '../conf/conf.js';

export class Service {
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.sobujbanglaURL)
            .setProject(conf.sobujbanglaProjectId);
        this.databases = new Databases(this.client);
        // this.bucket = new Storage(this.client);
    }

    async  makereview({ name, gmail, profile,category,rating,review }) {
        try {
            console.log(name, gmail, profile,category,rating,review);
            return await this.databases.createDocument(
                conf.sobujbanglaDatabaseId,
                conf.sobujbanglaReviewCollectionId,
                ID.unique(), {
                    name,
                    gmail,
                    profile,
                    category,
                    rating,
                    review
                }
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async bookTable({tableNo,chairNo,bookingDate,startTime,endTime}){
        try {
            return await this.databases.createDocument(
                conf.sobujbanglaDatabaseId,
                conf.sobujbanglaTableCollectionId,
                ID.unique(), {
                   tableNo,
                   chairNo,
                   bookingDate,
                   startTime,
                   endTime
                }
            );
            
        } catch (error) {
            console.log(error)
        }
    }
    async getbookedtable(bookingDate){
        try {
            const response = await this.databases.listDocuments(
                        conf.sobujbanglaDatabaseId,
                        conf.sobujbanglaTableCollectionId,
                        [Query.equal('bookingDate', bookingDate)]
                      );
                      return response;
            
        } catch (error) {
             console.log(error)
        }
    }

  

    // async getUserDetails(email) {
    //     try {
    //       // Make a request to fetch the document by email
    //       const response = await this.databases.listDocuments(
    //         conf.subletshebaDatabaseId,
    //         conf.subletshebaUserDetailId,
    //         [Query.equal('email', email)]
    //       );
          
    //       // Handle the response
    //       console.log('Fetched Document:', response);
          
    //       if (response.total > 0) {
    //         return response.documents[0]; // Return the first matching document
    //       } else {
    //         throw new Error('No document found');
    //       }
    //     } catch (error) {
    //       console.error('Error fetching document:', error);
    //       throw error; // Handle or rethrow the error as needed
    //     }
    // }

    // async getSinglePost(documentid) {
    //     console.log(documentid);
    //     try {
    //       // Make a request to fetch the document by email
    //       const response = await this.databases.getDocument(
    //         conf.subletshebaDatabaseId,
    //         conf.subletshebaCollectionId,
    //         documentid,
    //       );
    //       // Handle the response
    //       console.log('Fetched Document:', response);
          
    //      return response; // Return the first matching document
    //     } catch (error) {
    //       console.error('Error fetching document:', error);
    //       throw error; // Handle or rethrow the error as needed
    //     }
    // }

  
    // async getAllPosts() {
    //     try {
    //       // Make a request to fetch the document by email
    //       const response = await this.databases.listDocuments(
    //         conf.subletshebaDatabaseId,
    //         conf.subletshebaCollectionId
    //       );
    //       // Handle the response
    //       console.log('Fetched Document:', response);
          
    //      return response.documents; // Return the first matching document
    //     } catch (error) {
    //       console.error('Error fetching document:', error);
    //       throw error; // Handle or rethrow the error as needed
    //     }
    // }

   
    // async updatePost({ title, details }) {
    //     try {
    //         return await this.databases.updateDocument(
    //             conf.subletshebaDatabaseId,
    //             conf.subletshebaCollectionId,
    //             ID.unique(), {
    //                 title,
    //                 details
    //             }
    //         );
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async deletePost(documentid) {
    //     try {
    //         console.log(documentid);
    //         await this.databases.deleteDocument(
    //             conf.subletshebaDatabaseId,
    //             conf.subletshebaCollectionId,
    //             documentid
    //         );
    //         return true;
    //     } catch (error) {
    //         throw error;
    //         return false;
    //     }
    // }
}

const service = new Service();
export default service;
