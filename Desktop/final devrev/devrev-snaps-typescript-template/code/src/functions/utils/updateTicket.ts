import {client } from "@devrev/typescript-sdk";

// interface UpdateTicketResponse {
//   success: boolean;
//   message: string;
//   updatedWork?: any; // Replace 'any' with a more specific type if available
// }

export async function updateTicket(
  devrevSDK: any, //check this. u can change this to any
  partID: string|null,
  workID: string,
  tagID: string|undefined
): Promise<any> {
  try {
    // const newTag = {
    //   id: tagID,
    //   value: tagType
    // };

    

    const updatedInfo = {
      id: workID,
      type: "ticket",
      applies_to_part: partID,
      tags:{"set":[{"id":tagID}]}, // Tags should be an set
    
    };

    const response = await devrevSDK.worksUpdate(updatedInfo);

    return { response
      // success: true,
      // message: "Ticket updated successfully",
      // updatedWork: response
    };
  } catch (error) {
    console.error('Error updating ticket:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}





















































// import { WorkType } from "@devrev/typescript-sdk/dist/auto-generated/public-devrev-sdk"

// //code on how to update the already created ticket using devrevsdk 
// updateTicket(devrevSDK:any,tagType:String[],context:String,partID:String,workID:String,WorkType:String, tagID:String){

// const newTag={
//     id:tagID,
//     value:tagType
// }


// const updatedInfo={
// id:workID,
// type:WorkType,
// applies_to_part:partID,
// tags:  newTag                    // check how to show the tags
// //how to show the reasoning 

// }

// const response = await devrevSDK.works.update(updatedInfo);

//     //works.update
//     return response;
    


// }