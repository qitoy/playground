import { useState, useRef, useEffect } from "preact/hooks";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [xpos, setXpos] = useState(10);
    const draw = (context: CanvasRenderingContext2D) => {
        context.fillStyle = "#1f1e33";
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillRect(xpos, 10, 50, 50);
    };
    useEffect(() => {
        const canvas = canvasRef.current!;
        const context = canvas.getContext("2d")!;
        draw(context);
    }, [draw]);
    return (
    <>
    <canvas
        class="border-black border-2 p-0 m-4"
        width="150" height="150"
        ref={canvasRef}
    ></canvas>
    <button onClick={() => setXpos(xpos + 10)}>Move Right</button>
    </>
    );
}
