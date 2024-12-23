import { Client, Databases, ID, Query, Storage } from 'appwrite';
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
         this.bucket = new Storage(this.client);
        
    }
    

    async  makereview({ name, gmail, profile,category,rating,review }) {

        try {
            
            const response=await this.databases.listDocuments(
                conf.sobujbanglaDatabaseId,
                conf.sobujbanglaUserCollectionId,
                [Query.equal('email',gmail)]
              )

             if(response.documents.length>0)
              profile=response.documents[0].photo_URL

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
    async addToCard({email,itemId,quantity,totalPrice,itemName}){

      try {
        const response = await this.databases.listDocuments(
            conf.sobujbanglaDatabaseId,
            conf.sobujbanglaUserCardCollectionId,
            [Query.equal('email', email),Query.equal('itemId',itemId)]
          );

          if(response.documents.length==0){
            try {
        
                return await this.databases.createDocument(
                    conf.sobujbanglaDatabaseId,
                    conf.sobujbanglaUserCardCollectionId,
                    ID.unique(),{
                        email,
                        itemId,
                        quantity,
                        totalPrice,
                        itemName
                    }
                )
                
            } catch (error) {
                console.log(error);
            }
         
          }
          else
               {
                try {
        
                    return await this.databases.updateDocument(
                        conf.sobujbanglaDatabaseId,
                        conf.sobujbanglaUserCardCollectionId,
                        response.documents[0].$id,
                        {
                            quantity,
                            totalPrice,
                        }
                    )
                    
                } catch (error) {
                    console.log(error);
                }

          }
        
      }
       catch (error) {
        console.log(error);
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

    async getOrderHistory(email){
        try {
            const response = await this.databases.listDocuments(
                        conf.sobujbanglaDatabaseId,
                        conf.sobujbanglaOrderCollectionId,
                        [Query.equal('customerEmail', email),Query.orderDesc('$createdAt')]
                      );
                      console.log("form",response);
                      return response;
        } catch (error) {
             console.log(error)
        }
    }

    async placeOrder({customerName,customerEmail,orderItem,totalPrice,location,phone}){
        try {
            return await this.databases.createDocument(
                conf.sobujbanglaDatabaseId,
                conf.sobujbanglaOrderCollectionId,
                ID.unique(), {
                   customerName,
                   customerEmail,
                   orderItem,
                   totalPrice,
                   location,
                   phone
                }
            );
            
        } catch (error) {
            console.log(error)
        }
  
    }

    async updateOrderStatus(orderId, updateData) {
        try {
          await this.databases.updateDocument(
            conf.sobujbanglaDatabaseId,
            conf.sobujbanglaOrderCollectionId,
            orderId,
            updateData
        );
        } catch (error) {
          console.error("Error updating order status:", error);
        }
      }

      async updateBookingStatus(orderId,updateData){
         try {
        await this.databases.updateDocument(
          conf.sobujbanglaDatabaseId,
          conf.sobujbanglaAdminTableDataCollectionId,
          orderId,
          updateData
      );
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
      
   
    async deleteFromCard(itemId,email) {
            try {
              const response=await this.databases.listDocuments(
                    conf.sobujbanglaDatabaseId, 
                    conf.sobujbanglaUserCardCollectionId,
                    [Query.equal('itemId',itemId),Query.equal('email',email)] 
                );
               const documentid=response.documents[0].$id; 
               if(documentid){
                   try {
                    await this.databases.deleteDocument(
                        conf.sobujbanglaDatabaseId,
                        conf.sobujbanglaUserCardCollectionId,
                        documentid 
                       )
                    return true;
                   } catch (error) {
                    console.log(error);
                   }
               }
            } catch (error) {
                console.log(error);

            }
        }

        async deleteFromCollection(documentid,collectionId){
            try {
                await this.databases.deleteDocument(
                    conf.sobujbanglaDatabaseId,
                    collectionId,
                    documentid 
                   )
                return true;
               } catch (error) {
                console.log(error);
               }
        }

        async getMyCardData(email) {
                try {
                  const response = await this.databases.listDocuments(
                    conf.sobujbanglaDatabaseId,
                    conf.sobujbanglaUserCardCollectionId,
                    [Query.equal('email',email),Query.orderDesc('$createdAt')]
                  );
                  console.log('Fetched Document:', response);
                  
                 return response.documents; 
                } catch (error) {
                  console.error('Error fetching document:', error);
                  throw error; 
                }
            }

            async getAllCollectionData(collectionId) {
                    try {
                      
                      const response = await this.databases.listDocuments(
                        conf.sobujbanglaDatabaseId,
                        collectionId,
                        [Query.orderDesc('$createdAt')]
                      );
                      console.log('Fetched Document:', response);
                      
                     return response.documents;
                    } catch (error) {
                      console.error('Error fetching document:', error);
                      throw error; 
                    }
                }

                
      async  uploadPhoto  (file)  {
        console.log(file);
            if (!file) return;
            try {
            const response = await this.bucket.createFile(
                conf.sobujbanglaBucketId,
                 ID.unique(),
                  file
                ); 
                console.log(response);
            console.log(response.$id); 
            try {
                const fileURL = this.bucket.getFileView(conf.sobujbanglaBucketId, response.$id);
                console.log("File URL:", fileURL);
                return fileURL; 
              } catch (error) {
                console.error("Error fetching file URL:", error.message);
              }
            } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Failed to upload photo. Please try again.');
            }
        };

        async updateUserData({photo_URL,email,phone,about,address}){
            console.log("database",email);
            try{
                const response=await this.databases.listDocuments(
                    conf.sobujbanglaDatabaseId, 
                    conf.sobujbanglaUserCollectionId,
                    [Query.equal('email',email)] 
                );
                
            if(response.documents.length==0)
                 {
                    try {
                return await this.databases.createDocument(
                    conf.sobujbanglaDatabaseId,
                    conf.sobujbanglaUserCollectionId,
                    ID.unique(),{
                       photo_URL,
                       email,
                       phone,
                       about,
                       address,
                    }
                );
            } catch (error) {
                console.log(error);
            }

        }
        else{
            try {
                return await this.databases.updateDocument(
                    conf.sobujbanglaDatabaseId,
                    conf.sobujbanglaUserCollectionId,
                    response.documents[0].$id,
                    {
                        photo_URL,
                        email,
                        phone,
                        about,
                        address
                    }
                )
                
            } catch (error) {
                console.log(error);
            }
        }

        }
        catch(error){

        }
    }
        async getUserData(email){
            try {
                const response = await this.databases.listDocuments(
                  conf.sobujbanglaDatabaseId,
                  conf.sobujbanglaUserCollectionId,
                  [Query.equal('email',email)]
                );
                console.log('Fetched Document:', response);
                
               return response.documents; 
              } catch (error) {
                console.error('Error fetching document:', error);
                throw error; 
              }
        }

async adminTableBook({tableNo,chairs,bookingDate,startTime,endTime,customerName,email}){
    try {
        return await this.databases.createDocument(
            conf.sobujbanglaDatabaseId,
            conf.sobujbanglaAdminTableDataCollectionId,
            ID.unique(), {
               tableNo,
               chairs,
               bookingDate,
               startTime,
               endTime,
               customerName,
               email
            }
        );
    } catch (error) {
        
    }
}

   async addFoodData({id,name,description,price,image})
   {
    try {
        return await this.databases.createDocument(
            conf.sobujbanglaDatabaseId,
            conf.sobujbanglaMenuCollectionId,
            ID.unique(),
            {
                id,
                name,
                description,
                image,
                price
            }
        )
        
    } catch (error) {
        console.log(error);
    }
   }

   async updateFoodData({id,name,description,price,image},documentid){
    try {
        return await this.databases.updateDocument(
            conf.sobujbanglaDatabaseId,
            conf.sobujbanglaMenuCollectionId,
            documentid,
            {
                id,
                name,
                description,
                price,
                image
            }
        )
        
    } catch (error) {
        console.log(error);
    }
   }

   async getsingledocument(documentid,collectionId){
    try {

        const response=await this.databases.getDocument(
            conf.sobujbanglaDatabaseId,
            collectionId,
            documentid
        )
        console.log(response);
        return response;
        
    } catch (error) {
        console.log(error);
    }
   }

   async updateTotalIncome(totalprice){
    try {

        const response=await this.databases.getDocument(
            conf.sobujbanglaDatabaseId,
            conf.sobujbanglaDashboardDataCollectionId,
            conf.sobujbanglaTotalPriceId
        )
        const totalIncome=totalprice+response.totalIncome;
        const totalOrder=response.totalOrder+1;
        await this.databases.updateDocument(
            conf.sobujbanglaDatabaseId,
            conf.sobujbanglaDashboardDataCollectionId,
            conf.sobujbanglaTotalPriceId,
            {
                totalIncome,
                totalOrder
            }
        )
        
    } catch (error) {
        console.log(error);
    }

   }
      
}

const service = new Service();
export default service;
