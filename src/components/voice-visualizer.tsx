'use client';

import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';

const VoiceVisualizer = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let wavesurfer: WaveSurfer | null = null;
        let record: ReturnType<typeof RecordPlugin.create> | null = null;
        let stream: MediaStream | null = null;

        const initializeVisualizer = async () => {
            try {
                // 1. Request microphone access
                stream = await navigator.mediaDevices.getUserMedia({ audio: true });

                // 2. Initialize WaveSurfer
                wavesurfer = WaveSurfer.create({
                    container: containerRef.current!,
                    waveColor: '#A64AC9',
                    progressColor: '#2E9AFE',
                    height: 40,
                    barWidth: 3,
                    barGap: 2,
                    barRadius: 2,
                    cursorWidth: 0,
                    interact: false,
                });

                // 3. Initialize and use the Record plugin
                record = wavesurfer.registerPlugin(RecordPlugin.create({ scrollingWaveform: true, mediaStream: stream }));
                record.startRecording();
                
            } catch (err) {
                console.error('Error initializing voice visualizer:', err);
            }
        };

        initializeVisualizer();

        // 4. Cleanup function
        return () => {
            if (record) {
                record.stopRecording();
                record.destroy();
            }
            if (wavesurfer) {
                wavesurfer.destroy();
            }
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100px', height: '40px' }} className="mx-2" />
    );
};

export default VoiceVisualizer;