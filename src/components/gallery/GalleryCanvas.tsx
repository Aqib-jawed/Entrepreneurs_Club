"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { GalleryMotion } from "./types";

type GalleryImage = { src: string; alt: string };
type GalleryCanvasProps = {
  images: GalleryImage[];
  motionRef: React.RefObject<GalleryMotion>;
  frameloop: "always" | "never";
  speed: number;
  visibleCount: number;
  onReady: () => void;
};
type PlaneData = { index: number; z: number; imageIndex: number; x: number; y: number };

const DEPTH_RANGE = 50;
const FADE_IN = { start: 0.05, end: 0.25 };
const FADE_OUT = { start: 0.4, end: 0.43 };
const BLUR_IN = { start: 0, end: 0.1 };
const BLUR_OUT = { start: 0.4, end: 0.43 };
const MAX_BLUR = 8;

function createClothMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      map: { value: null },
      opacity: { value: 1 },
      blurAmount: { value: 0 },
      texelSize: { value: new THREE.Vector2(1, 1) },
      scrollForce: { value: 0 },
      time: { value: 0 },
      isHovered: { value: 0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float curveIntensity = scrollForce * 0.3;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        pos.z -= curve + clothEffect + flagWave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      uniform vec2 texelSize;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(map, vUv);
        if (blurAmount > 0.0) {
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

function makePositions(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const horizontalAngle = (index * 2.618) % (Math.PI * 2);
    const verticalAngle = (index * 1.618 + Math.PI / 3) % (Math.PI * 2);
    const horizontalRadius = (index % 3) * 1.2;
    const verticalRadius = ((index + 1) % 4) * 0.8;
    return {
      x: (Math.sin(horizontalAngle) * horizontalRadius * 8) / 3,
      y: (Math.cos(verticalAngle) * verticalRadius * 8) / 4,
    };
  });
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function GalleryScene({ images, motionRef, speed, visibleCount, onReady }: GalleryCanvasProps) {
  const texturePaths = useMemo(() => images.map((image) => image.src), [images]);
  const textures = useTexture(texturePaths);
  const materials = useMemo(() => Array.from({ length: visibleCount }, createClothMaterial), [visibleCount]);
  const positions = useMemo(() => makePositions(visibleCount), [visibleCount]);
  const planes = useRef<PlaneData[]>([]);
  const meshes = useRef<Array<THREE.Mesh | null>>([]);

  useEffect(() => {
    if (!textures.length) return;
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 2;
      texture.needsUpdate = true;
    });
    planes.current = Array.from({ length: visibleCount }, (_, index) => ({
      index,
      z: ((DEPTH_RANGE / visibleCount) * index) % DEPTH_RANGE,
      imageIndex: index % textures.length,
      x: positions[index]?.x ?? 0,
      y: positions[index]?.y ?? 0,
    }));
    planes.current.forEach((plane, index) => {
      const texture = textures[plane.imageIndex];
      materials[index].uniforms.map.value = texture;
      const image = texture.image as { width: number; height: number } | undefined;
      const width = image?.width || 1;
      const height = image?.height || 1;
      materials[index].uniforms.texelSize.value.set(1 / width, 1 / height);
    });
    onReady();

    return () => {
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      useTexture.clear(texturePaths);
    };
  }, [materials, onReady, positions, texturePaths, textures, visibleCount]);

  useFrame((state, delta) => {
    const motion = motionRef.current;
    if (Date.now() - motion.lastInteraction > 3000 && !motion.focused && !motion.dragging) {
      motion.velocity += 0.3 * delta;
    }
    motion.velocity *= 0.95;
    const velocity = motion.velocity;
    const time = state.clock.getElapsedTime();
    const imageAdvance = visibleCount % textures.length || textures.length;

    planes.current.forEach((plane, index) => {
      const mesh = meshes.current[index];
      const material = materials[index];
      if (!mesh || !material) return;

      let nextZ = plane.z + velocity * delta * 10;
      if (nextZ >= DEPTH_RANGE) {
        const wraps = Math.floor(nextZ / DEPTH_RANGE);
        nextZ -= DEPTH_RANGE * wraps;
        plane.imageIndex = (plane.imageIndex + wraps * imageAdvance) % textures.length;
      } else if (nextZ < 0) {
        const wraps = Math.ceil(-nextZ / DEPTH_RANGE);
        nextZ += DEPTH_RANGE * wraps;
        plane.imageIndex = ((plane.imageIndex - wraps * imageAdvance) % textures.length + textures.length) % textures.length;
      }
      plane.z = nextZ;
      const texture = textures[plane.imageIndex];
      if (material.uniforms.map.value !== texture) {
        material.uniforms.map.value = texture;
        const image = texture.image as { width: number; height: number } | undefined;
        const width = image?.width || 1;
        const height = image?.height || 1;
        material.uniforms.texelSize.value.set(1 / width, 1 / height);
      }

      mesh.position.set(plane.x, plane.y, plane.z - DEPTH_RANGE / 2);
      const normalizedPosition = plane.z / DEPTH_RANGE;
      let opacity = 1;
      if (normalizedPosition <= FADE_IN.start) opacity = 0;
      else if (normalizedPosition < FADE_IN.end) opacity = (normalizedPosition - FADE_IN.start) / (FADE_IN.end - FADE_IN.start);
      else if (normalizedPosition >= FADE_OUT.start && normalizedPosition <= FADE_OUT.end) opacity = 1 - (normalizedPosition - FADE_OUT.start) / (FADE_OUT.end - FADE_OUT.start);
      else if (normalizedPosition > FADE_OUT.end) opacity = 0;

      let blur = 0;
      if (normalizedPosition >= BLUR_IN.start && normalizedPosition <= BLUR_IN.end) blur = MAX_BLUR * (1 - (normalizedPosition - BLUR_IN.start) / (BLUR_IN.end - BLUR_IN.start));
      else if (normalizedPosition < BLUR_IN.start) blur = MAX_BLUR;
      else if (normalizedPosition >= BLUR_OUT.start && normalizedPosition <= BLUR_OUT.end) blur = MAX_BLUR * ((normalizedPosition - BLUR_OUT.start) / (BLUR_OUT.end - BLUR_OUT.start));
      else if (normalizedPosition > BLUR_OUT.end) blur = MAX_BLUR;

      material.uniforms.opacity.value = clamp01(opacity);
      material.uniforms.blurAmount.value = clamp01(blur / MAX_BLUR) * MAX_BLUR;
      material.uniforms.scrollForce.value = velocity;
      material.uniforms.time.value = time;
    });
  });

  return (
    <group>
      {Array.from({ length: visibleCount }, (_, index) => {
        const texture = textures[index % textures.length];
        const image = texture?.image as { width: number; height: number } | undefined;
        const aspect = image ? image.width / image.height : 1;
        const scale: [number, number, number] = aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1];
        const position = positions[index] ?? { x: 0, y: 0 };
        return (
          <mesh
            key={index}
            ref={(mesh) => { meshes.current[index] = mesh; }}
            position={[position.x, position.y, ((DEPTH_RANGE / visibleCount) * index) % DEPTH_RANGE - DEPTH_RANGE / 2]}
            scale={scale}
            material={materials[index]}
            onPointerEnter={() => { materials[index].uniforms.isHovered.value = 1; }}
            onPointerLeave={() => { materials[index].uniforms.isHovered.value = 0; }}
          >
            <planeGeometry args={[1, 1, 32, 32]} />
          </mesh>
        );
      })}
    </group>
  );
}

export function GalleryCanvas(props: GalleryCanvasProps) {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 0], fov: 55 }}
      dpr={[1, 1.5]}
      frameloop={props.frameloop}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <GalleryScene {...props} />
    </Canvas>
  );
}
