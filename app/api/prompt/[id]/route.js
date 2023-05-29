import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) {
            return new Response("Prompt not found", {
                status: 404,
            });
        }
        return new Response(JSON.stringify(prompt), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch prompt"), {
            status: 500,
        });
    }
}

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json()

    try {
        await connectToDB();
        const existingprompt = await Prompt.findById(params.id);
        if (!existingprompt) {
            return new Response("Prompt not found", {
                status: 404,
            });
        }
        existingprompt.prompt = prompt;
        existingprompt.tag = tag;
        await existingprompt.save();
        return new Response(JSON.stringify(existingprompt), {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to update prompt", {
            status: 500,
        });
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted", {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to delete prompt", {
            status: 500,
        });
    }
}