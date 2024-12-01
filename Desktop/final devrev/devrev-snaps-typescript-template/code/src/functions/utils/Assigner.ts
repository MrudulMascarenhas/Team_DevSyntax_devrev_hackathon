import { betaSDK } from "@devrev/typescript-sdk";
import { Api, SearchHybridNamespace } from "@devrev/typescript-sdk/dist/auto-generated/beta/beta-devrev-sdk";
import { Namespace } from "protobufjs";
import { WebClient } from '@slack/web-api';





function cleanAndSliceString(inputString: string, maxLength: number = 400): string {
    // Remove special characters using a regular expression
    const cleanedString = inputString.replace(/[^A-Za-z0-9\s]/g, '');
    
    // Slice the string to the specified maximum length
    const slicedString = cleanedString.slice(0, maxLength);
    
    return slicedString;
}








// Define the partAssigner function
export async function partAssigner(
    context: string, 
    TicketData: string, 
    devrevSDK:any
): Promise<string | null> {
    // Define the search payload

    const result = cleanAndSliceString(context);
    console.log(result);



    const searchPayload = {
        namespace: SearchHybridNamespace.Part,
        query: result,
        limit: 1,
        semantic_weight: 0.7
    };

    try {
        // Make the search request using the devrevSDK
        const response= await devrevSDK.searchHybrid(searchPayload);

        // Extract the part ID from the response
        const partId = response.data.results[0].part.id

        console.log('Extracted Part ID:', partId);

        // Return the extracted part ID
        return partId;
    } catch (error) {
        console.error('Error in partAssigner:', error);
        return null; // Return null in case of an error
    }
}



export async function sendSlackMessage(slackToken: string, channelId: string,analysis:any): Promise<void> {

    if (!slackToken || !channelId) {
      console.error('Slack token or channel ID is missing.');
      return;
    }
  
    try {
      const slackClient = new WebClient(slackToken);

      const slackResponse = await slackClient.chat.postMessage({
        channel: channelId,
        text: analysis,
      })
   



      
      console.log('Slack message sent successfully:', slackResponse);
    } catch (error: any) {
      console.error('Error while sending Slack message:', error.message);
    }
  }
  
  









































// // here we will be writing the search.hybrid api code for part 
// //IT SHOURLD RETURN THE SELECTED PART ID 
// import { client } from '@devrev/typescript-sdk';

// // Function to extract part_id
// function extractPartId(jsonResponse: any): string | null {
//     // Check if results exist and is an array
//     if (jsonResponse.results && Array.isArray(jsonResponse.results) && jsonResponse.results.length > 0) {
//         const part = jsonResponse.results[0].part; // Access the first result's part
//         if (part && part.id) {
//             return part.id; // Return the part ID
//         }
//     }
//     return null; // Return null if not found
// }


// exports async partAssigner(context:String,TicketData:String,devrevSDK:any){
//     //now write the connection the search.hybrid 
//   const  search_payload = {
//         "namespace": "part",
//         "query": context,
//         "limit": 1,  
//         "semantic_weight": 1.0 
//     }
    
//     const response = await devrevSDK.searchHybrid(search_payload); // CHECK THIS 


//     const partId = extractPartId(response); //check if only id is enough or other also reuired?
//     console.log('Extracted Part ID:', partId);
    

//     return partID;
// }