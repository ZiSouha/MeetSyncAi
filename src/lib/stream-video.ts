import "server-only"

import { StreamClient } from "@stream-io/node-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
const secretKey = process.env.STREAM_VIDEO_SECRET_KEY;

// Lazy-initialized so missing keys don't crash the whole server at startup
let _streamVideo: StreamClient | null = null;

export const streamVideo = new Proxy({} as StreamClient, {
    get(_target, prop) {
        if (!_streamVideo) {
            if (!apiKey || !secretKey || apiKey === "your_stream_api_key" || secretKey === "your_stream_api_secret") {
                throw new Error(
                    "Stream Video API keys are not configured. " +
                    "Please set NEXT_PUBLIC_STREAM_VIDEO_API_KEY and STREAM_VIDEO_SECRET_KEY in your .env file. " +
                    "Get free keys at https://getstream.io/dashboard/"
                );
            }
            _streamVideo = new StreamClient(apiKey, secretKey);
        }
        return (_streamVideo as any)[prop];
    }
});