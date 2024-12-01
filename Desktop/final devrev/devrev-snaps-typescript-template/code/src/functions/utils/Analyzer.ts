import OpenAI from "openai";


import { partAssigner } from "./Assigner";

import dotenv from 'dotenv';
import { Api } from "@devrev/typescript-sdk/dist/auto-generated/beta/beta-devrev-sdk";
dotenv.config();







// Function to analyze a ticket
const analyzeTicket = async (ticketContent: string,apiKey:string) => {
    try {

        const openai = new OpenAI({
            apiKey: apiKey

        });
        

        

        const prompt = `
        Analyze the following ticket and provide the following details:
        1. Intent: (bug, feature_request, complaint, question)
        2. Priority: (High, Medium, Low)
        3. Key Entities: (Extract important entities like product names, keywords, etc.)
        4. Suggested Tags: (Provide 2-3 tags based on the ticket content)
        5. Reasoning: (Explain briefly why the ticket was classified as such its intent)

        Ticket:
        """${ticketContent}"""
        `;



        // Call the OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-4", // Use "gpt-4" or "gpt-3.5-turbo"
            messages: [
                { role: "system", content: "You are an intelligent ticket analysis assistant." },
                { role: "user", content: prompt },
            ],
            max_tokens: 500, // Adjust as needed
        });

        // Extract the response
        const analysis = response.choices[0].message?.content;

        // Split the response into parts based on numbering
        if (analysis) {
            const lines = analysis.split("\n").filter((line) => line.trim() !== "");

            const intent = lines.find((line) => line.startsWith("1. Intent:"))?.replace("1. Intent:", "").trim().toLowerCase();;
            const priority = lines.find((line) => line.startsWith("2. Priority:"))?.replace("2. Priority:", "").trim();
            const keyEntities = lines.find((line) => line.startsWith("3. Key Entities:"))?.replace("3. Key Entities:", "").trim();
            const suggestedTags = lines.find((line) => line.startsWith("4. Suggested Tags:"))?.replace("4. Suggested Tags:", "").trim();
            const reasoning = lines.find((line) => line.startsWith("5. Reasoning:"))?.replace("5. Reasoning:", "").trim();

            console.log("Extracted Analysis:");
            console.log("Intent:", intent);
            console.log("Priority:", priority);
            console.log("Key Entities:", keyEntities);
            console.log("Suggested Tags:", suggestedTags);
            console.log("Reasoning:", reasoning);

            return { intent, reasoning,analysis };
        } else {
            console.error("No analysis content found in the response.");
            return { intent: null, reasoning: null };
        }
    } catch (error) {
        console.error("Error analyzing ticket:", error);
        return { intent: null, reasoning: null };
    }
};

// Exported analyzer function
export async function analyzer(TicketData:any, devrevSDK:Api<object>,apiKey:string) {
    // Generate the context based on the ticket data
    const context =` ${TicketData.title} ${TicketData.body}`;

    try {
        // Analyze the ticket to get intent and reasoning

        

        const { intent, reasoning,analysis } = await analyzeTicket(context,apiKey);

        // Assign a part using the partAssigner function
        const partID = await partAssigner(context, TicketData, devrevSDK);
         console.log("updated partID", partID)
        // Return the updated data
        return {  tagType: intent,  partID,analysis};
    } catch (error) {
        console.error("Error in analyzer function:", error);
        return { reasoning:null, tagType:null, context:null, partID:null };
    }
}
















//v0
// import { string } from "yargs"
// import { Configuration, OpenAIApi } from "openai";
// import { client } from '@devrev/typescript-sdk';
// import {partAssigner} from "./Assigner"

// import * as dotenv from 'dotenv';
// dotenv.config();




// const API_KEY = process.env.OPENAI_API_KEY;

// // Initialize OpenAI API Configuration
// const configuration = new Configuration({
//     apiKey: API_KEY,
//   });
  
//   const openai = new OpenAIApi(configuration);

  
//   // Function to analyze a ticket
//   const analyzeTicket = async (ticketContent: string) => {
//     try {
//       const prompt = `
//         Analyze the following ticket and provide the following details:
//         1. Intent: (Bug Report, Feature Request, Complaint, or Question)
//         2. Priority: (High, Medium, Low)
//         3. Key Entities: (Extract important entities like product names, keywords, etc.)
//         4. Suggested Tags: (Provide 2-3 tags based on the ticket content)
//         5. Reasoning: (Explain briefly why the ticket was classified as such its intent)
  
//         Ticket:
//         """${ticketContent}"""
//       `;
  
//       // Call the OpenAI API
//       const response = await openai.createChatCompletion({
//         model: "gpt-4", // Use "gpt-4" or "gpt-3.5-turbo"
//         messages: [
//           { role: "system", content: "You are an intelligent ticket analysis assistant." },
//           { role: "user", content: prompt },
//         ],
//         max_tokens: 500, // Adjust as needed
//       });
  
//       // Extract the response
//       const analysis = response.data.choices[0].message?.content;
  
//       // Split the response into parts based on numbering
//       if (analysis) {
//         const lines = analysis.split("\n").filter((line) => line.trim() !== "");
  
//         const intent = lines.find((line) => line.startsWith("1. Intent:"))?.replace("1. Intent:", "").trim();  //basically this is tagging 
//         const priority = lines.find((line) => line.startsWith("2. Priority:"))?.replace("2. Priority:", "").trim();
//         const keyEntities = lines.find((line) => line.startsWith("3. Key Entities:"))?.replace("3. Key Entities:", "").trim();
//         const suggestedTags = lines.find((line) => line.startsWith("4. Suggested Tags:"))?.replace("4. Suggested Tags:", "").trim();
//         const reasoning = lines.find((line) => line.startsWith("5. Reasoning:"))?.replace("5. Reasoning:", "").trim();  //reasonning part
  
//         console.log("Extracted Analysis:");
//         console.log("Intent:", intent);
//         console.log("Priority:", priority);
//         console.log("Key Entities:", keyEntities);
//         console.log("Suggested Tags:", suggestedTags);
//         console.log("Reasoning:", reasoning);


//         return {intent,reasoning};

  


//       } else {
//         console.error("No analysis content found in the response.");
//       }
//     } catch (error) {
//       console.error("Error analyzing ticket:", error);
//     }
//   };
  
  

// // exports default analyzer(title:String, description:String, TicketData:String){
   
// exports async analyzer( TicketData:String,devrevSDK:client){
     
//     //here the short context of ticket is taken.
//      const context = `${TicketData.title}is the title of the ticket generated having its description to be ${TicketData.body}`
//     //check here for smtg 400
    
//       const {intent, reasoning} = await analyzeTicket(context);
    
     

    
//      // function for part assignment -> search for service,code,product,capability,feature 
     
//     const partID:String = await partAssigner(context,TicketData,devrevSDK);

    

//      //update the ticket with the new tags and part and with the reasoning for the type of ticket

//      return{reasoning,tagType:intent,context,partID};


     
// }



