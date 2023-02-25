import { useState, useRef, useEffect } from "preact/hooks";
import { add, instantiate } from "@/lib/rs_lib.generated.js";

export default function Add() {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        instantiate({ url: new URL("/rs_lib_bg.wasm", location.origin) }).then(
            () => { setReady(true); }
        );
    }, []);
    const aRef = useRef<HTMLInputElement>(null);
    const bRef = useRef<HTMLInputElement>(null);
    const [result, setResult] = useState(0);
    const onClick = () => {
        if(!ready) return;
        const a = parseInt(aRef.current?.value ?? "");
        const b = parseInt(bRef.current?.value ?? "");
        setResult(add(a, b));
    };
    return (
    <div>
        <input ref={aRef} type="text" />
        <input ref={bRef} type="text" />
        <button onClick={onClick}>Calc</button>
        <p>{result}</p>
    </div>
    );
}
