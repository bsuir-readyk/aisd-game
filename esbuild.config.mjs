// @ts-check
import esbuild from "esbuild";
import fs from 'node:fs';
import path from "node:path";

const copyStatic = () =>
    fs.readdirSync("./static")
        .forEach(file => 
            fs.copyFileSync(
                path.join("./static", file),
                path.join("./build", file)
            )
        );

/** @type { esbuild.BuildOptions } */
const generalCfg = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: './build/index.js',
    target: ['chrome120', 'firefox120', 'safari17'],
    minify: true,
};

await esbuild.build(generalCfg);
copyStatic();

if (process.env.DEV) {
    fs.watch("./static", {recursive: true}, copyStatic);
    const ctx = await esbuild.context({
        ...generalCfg,
        banner: {js: "window['DEV']=true; new EventSource('/esbuild').addEventListener('change', () => location.reload());"},
        sourcemap: true
    })
    await ctx.watch();
    console.log(await ctx.serve({servedir: "./build"}));
}
