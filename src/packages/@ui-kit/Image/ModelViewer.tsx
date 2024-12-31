// components/ModelViewer.tsx
"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Center } from "@react-three/drei";

interface ModelProps {
  url: string;
}

const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.4} />;
};

interface ModelViewerProps {
  modelUrl: string;
  height?: number;
  width?: number;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelUrl,
  height = 500,
  width = 500,
}) => {
  return (
    <Canvas style={{ height: `${height}px`, width: `${width}px` }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 10]} intensity={2} />
      <Suspense
        fallback={
          <Html center>
            <div style={{ color: "white" }}>Loading 3D Model...</div>
          </Html>
        }
      >
        <Center>
          <Model url={modelUrl} />
        </Center>
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
