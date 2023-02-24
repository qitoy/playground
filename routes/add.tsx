import { Handlers, PageProps } from "$fresh/server.ts";
import { instantiate } from "@/lib/rs_lib.generated.js";

const { add } = await instantiate();

interface Params {
    a: number;
    b: number;
}

export const handler: Handlers<Params | null> = {
    GET(req, ctx) {
        const url = new URL(req.url);
        const a = parseInt(url.searchParams.get("a") || "");
        const b = parseInt(url.searchParams.get("b") || "");
        if (isNaN(a) || isNaN(b)) {
            return ctx.render(null);
        }
        return ctx.render({ a, b });
    },
};

export default function Page({ data }: PageProps<Params | null>) {
    let result;
    if (!data) {
        result = <p>please input 2 numbers</p>;
    } else {
        result = <p>{data.a} + {data.b} = {add(data.a, data.b)}</p>;
    }
    return (
        <div>
        <form>
        <input type="text" name="a" />
        <input type="text" name="b" />
        <button type="submit">Calc</button>
        </form>
        {result}
        </div>
    )
}
