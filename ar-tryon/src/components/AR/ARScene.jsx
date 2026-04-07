import React, { useEffect, useRef } from 'react';

const ARScene = ({ product, landmarks }) => {
    const sceneRef = useRef(null);
    const modelRef = useRef(null);

    useEffect(() => {
        if (landmarks && modelRef.current) {
            // Index 9 is the middle finger MCP (wrist is index 0)
            // For a watch, we might want to attach near the wrist (0) or between wrist and knuckles
            const wrist = landmarks[0];
            const mcp = landmarks[9];

            // Calculate position (normalized 0-1 to A-Frame space)
            // Note: This is a simplified mapping. Real mapping requires camera intrinsics.
            const x = (wrist.x - 0.5) * 2;
            const y = -(wrist.y - 0.5) * 2;
            const z = -wrist.z * 5 - 2; // Offset from camera

            modelRef.current.setAttribute('position', `${x} ${y} ${z}`);

            // Basic rotation based on hand orientation (wrist to MCP)
            const dx = mcp.x - wrist.x;
            const dy = mcp.y - wrist.y;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            modelRef.current.setAttribute('rotation', `0 0 ${angle + 90}`);
        }
    }, [landmarks]);

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden">
            <a-scene
                embedded
                arjs="sourceType: webcam; debugUIEnabled: false;"
                webxr="optionalFeatures: hit-test, local-floor, passthrough, hand-tracking;"
                vr-mode-ui="enabled: true"
                renderer="logarithmicDepthBuffer: true; alpha: true;"
                background="transparent: true"
            >
                <a-assets>
                    {product && (
                        <a-asset-item id="product-model" src={product.modelUrl}></a-asset-item>
                    )}
                </a-assets>

                <a-entity camera></a-entity>

                <a-entity
                    ref={modelRef}
                    gltf-model="#product-model"
                    scale="0.5 0.5 0.5"
                    visible={!!landmarks}
                ></a-entity>

                <a-light type="ambient" intensity="0.5"></a-light>
                <a-light type="directional" position="1 1 1" intensity="1"></a-light>
            </a-scene>
        </div>
    );
};

export default ARScene;
