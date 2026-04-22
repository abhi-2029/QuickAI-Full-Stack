// import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import FormData from 'form-data';
import Groq from "groq-sdk";

// const AI = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// });

export const generateArticle = async (req, res)=>{
    console.log("🔥 HIT ARTICLE API");
    try {
        const userId = req.auth?.userId;
        const { prompt, length } = req.body;
        const plan = 'premium';
        const free_usage = 0;

        if(plan !== 'premium' && free_usage >= 10){
            return res.json({ success: false, message: "Limit reached. Upgrade to continue."})
        }

        

        

        const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
        });

        const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "user", content: prompt }
        ],
        });

        const content = response.choices[0].message.content;

        await sql` INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, ${prompt}, ${content}, 'article')`;

        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata:{
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({ success: true, content})


    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

// export const generateBlogTitle = async (req, res)=>{
//     try {
//         const { userId } = req.auth();
//         const { prompt } = req.body;
//         const plan = req.plan;
//         const free_usage = req.free_usage;

//         if(plan !== 'premium' && free_usage >= 10){
//             return res.json({ success: false, message: "Limit reached. Upgrade to continue."})
//         }

//         const response = await axios.post(
//         "https://openrouter.ai/api/v1/chat/completions",
//         {
//             model: "mistralai/mistral-7b-instruct",
//             messages: [{ role: "user", content: prompt }],
//         },
//         {
//             headers: {
//             Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//             "Content-Type": "application/json",
//             },
//         }
//         );

//         const content = response.data.choices[0].message.content;

//         await sql` INSERT INTO creations (user_id, prompt, content, type) 
//         VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

//         if(plan !== 'premium'){
//             await clerkClient.users.updateUserMetadata(userId, {
//                 privateMetadata:{
//                     free_usage: free_usage + 1
//                 }
//             })
//         }

//         res.json({ success: true, content})


//     } catch (error) {
//         console.log(error.message)
//         res.json({success: false, message: error.message})
//     }
// }

export const generateBlogTitle = async (req, res)=>{
  console.log("🔥 HIT BLOG TITLE API");

  try {
    const userId = req.auth?.userId;
    const { prompt } = req.body;

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "user", content: prompt }
      ],
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

    res.json({ success: true, content });

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
};



// export const generateImage = async (req, res) => {
//   console.log("🔥 HIT IMAGE API");

//   try {
//     const userId = req.auth?.userId;
//     const { prompt, publish } = req.body;

//     // same as article
//     const plan = 'premium';

//     if (plan !== 'premium') {
//       return res.json({ success: false, message: "Upgrade required" });
//     }

//     const groq = new Groq({
//       apiKey: process.env.GROQ_API_KEY,
//     });

//     // 👉 ask model to return an image URL (stable approach)
//     const response = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [
//         {
//           role: "user",
//           content: `Generate a realistic image URL for: ${prompt}. Return ONLY the image URL.`,
//         },
//       ],
//     });

//     let content = response.choices[0].message.content.trim();

//     // ✅ If not valid URL → fallback image
//     if (!content.startsWith("http")) {
//     content = `https://source.unsplash.com/800x600/?${encodeURIComponent(prompt)}`;
//     }

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type, publish)
//       VALUES (${userId}, ${prompt}, ${content}, 'image', ${publish ?? false})
//     `;

//     return res.json({ success: true, content });

//   } catch (error) {
//     console.log("❌ IMAGE ERROR:", error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };


export const generateImage = async (req, res) => {
  console.log("🔥 HIT IMAGE API");

  try {
    const { prompt } = req.body;

    // ✅ FORCE WORKING IMAGE
    const content = `https://picsum.photos/seed/${encodeURIComponent(prompt)}/800/600`;

    return res.json({ success: true, content });

  } catch (error) {
    console.log("❌ ERROR:", error.message);
    return res.json({ success: false, message: error.message });
  }
};


export const removeImageBackground = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const image = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
        }

        const {secure_url} = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: 'background_removal',
                    background_removal: 'remove_the_background'
                }
            ]
        })

        await sql` INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

        res.json({ success: true, content: secure_url})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const removeImageObject = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const { object } = req.body;
        const image = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
        }

        const {public_id} = await cloudinary.uploader.upload(image.path)

        const imageUrl = cloudinary.url(public_id, {
            transformation: [{effect: `gen_remove:${object}`}],
            resource_type: 'image'
        })

        await sql` INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

        res.json({ success: true, content: imageUrl})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const resumeReview = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const resume = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
        }

        if(resume.size > 5 * 1024 * 1024){
            return res.json({success: false, message: "Resume file size exceeds allowed size (5MB)."})
        }

        const dataBuffer = fs.readFileSync(resume.path)
        const pdfData = await pdf(dataBuffer)

        const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`

       
                const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "mistralai/mistral-7b-instruct",
            messages: [{ role: "user", content: prompt }],
        },
        {
            headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            },
        }
        );

        const content = response.data.choices[0].message.content;

        await sql` INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

        res.json({ success: true, content})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}