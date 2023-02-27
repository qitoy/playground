import { useEffect, useState, useRef } from "preact/hooks";
import { GenOmino, instantiate } from "@/lib/rs_lib.generated.js";

const block = 40;

export default function Component() {
    const [ominos, setOminos] = useState<GenOmino>();
    const [len, setLen] = useState(0);
    const [index, setIndex] = useState(0);
    const [canvas, setCanvas] = useState([0, 0]);
    useEffect(() => {
        instantiate({ url: new URL("/rs_lib_bg.wasm", location.origin) })
    }, []);
    const nRef = useRef<HTMLInputElement>(null);
    const generate = () => {
        const omino = new GenOmino();
        const n = parseInt(nRef.current?.value ?? "1");
        const len = omino.build(n);
        setOminos(omino);
        setLen(len);
        setIndex(0);
        setCanvas([block*n*2, block*(n+1)]);
    };
    const next = () => {
        if(index+1<len) setIndex(index+1);
    };
    const prev = () => {
        if(0<index) setIndex(index-1);
    };
    const draw = (ctx: CanvasRenderingContext2D) => {
        if(!ominos) return;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const omino = ominos.get(index);
        const offset = parseInt(nRef.current!.value)-1;
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(0, (offset+1)*block, offset*block, block);
        ctx.font = `${block/2}px selif`;
        for(let i=0; i<omino.length; i+=3) {
            const state=omino[i];
            const x=omino[i+1];
            const y=omino[i+2];
            if(state==0) {
                ctx.fillStyle = "#555555";
            }
            if(state==1) {
                ctx.fillStyle = "#00ffff";
            }
            if(state==2) {
                ctx.fillStyle = "#ff7f00";
            }
            ctx.fillRect((x+offset)*block, (offset+1-y)*block, block, block);
            ctx.fillStyle = "#000000";
            ctx.fillText((i/3).toString(), (x+offset)*block, (offset+2-y)*block, block);
        }
    };
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        draw(ctx);
    }, [draw]);
    return (
    <>
    <canvas
    class="border-black border-2 p-0 m-4"
    width={canvas[0]} height={canvas[1]}
    ref={canvasRef}></canvas>
    <button onClick={prev}>prev</button>
    <button onClick={next}>next</button>
    <input ref={nRef} type="number" min="1"/>
    <button onClick={generate}>generate</button>
    </>
    );
}

