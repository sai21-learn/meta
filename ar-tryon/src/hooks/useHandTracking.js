import { useEffect, useState } from 'react';

// Note: MediaPipe Hands and Camera are loaded via script tags in index.html
// to ensure compatibility with A-Frame and WASM loading.

export const useHandTracking = (videoRef) => {
    const [landmarks, setLandmarks] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!videoRef.current || !window.Hands || !window.Camera) return;

        const hands = new window.Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        hands.onResults((results) => {
            if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                setLandmarks(results.multiHandLandmarks[0]);
            } else {
                setLandmarks(null);
            }
        });

        const camera = new window.Camera(videoRef.current, {
            onFrame: async () => {
                await hands.send({ image: videoRef.current });
            },
            width: 1280,
            height: 720,
        });

        camera.start().then(() => setIsReady(true));

        return () => {
            camera.stop();
            hands.close();
        };
    }, [videoRef]);

    return { landmarks, isReady };
};
