import { useState, useRef } from "preact/hooks";
import { instantiate } from "@/lib/rs_lib.generated.js";

const { add } = await instantiate();

interface Props {
    init: number;
}

export default function Add(props: Props) {
    const aRef = useRef<HTMLInputElement>(null);
    const bRef = useRef<HTMLInputElement>(null);
    const [result, setResult] = useState(props.init);
    const onClick = () => {
        const a = parseInt(aRef.current?.value ?? "");
        const b = parseInt(bRef.current?.value ?? "");
        setResult(add(a,b));
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
