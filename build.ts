// 原仓库: https://github.com/a7ul/esbuild-node-tsc

// 由于ESBuild不支持TS的emitDecoratorMetada编译, 因此ETSC也不能用于此项目
// 这个文件只是简单的尝试
import ts, { BuildOptions } from "typescript";
import { build } from "esbuild";
import cpy from "cpy";
import path from "path";
import rimraf from "rimraf";

const cwd = process.cwd();

/**
 * 获取项目内tsconfig.json配置
 * @return tsConfig 解析过的配置
 * @return tsConfigFile 文件路径地址 供ESBuild直接使用
 */
function getTSConfig() {
  const tsConfigFile = ts.findConfigFile(
    cwd,
    ts.sys.fileExists,
    "tsconfig.json"
  );

  const configFile = ts.readConfigFile(tsConfigFile, ts.sys.readFile);

  const tsConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    cwd
  );

  return { tsConfig, tsConfigFile };
}

/**
 * 拼装ESBuild构建参数
 * @return {*}
 */
function getBuildMetadata() {
  const { tsConfig, tsConfigFile } = getTSConfig();

  const outDir = "etsc-dist";

  const esbuildOptions: BuildOptions = {
    outdir: "etsc-dist",
    entryPoints: tsConfig.fileNames,
    sourcemap: "inline",
    target: "es2018",
    minify: false,
    tsconfig: tsConfigFile,
  };

  return { outDir, esbuildOptions };
}

/**
 * 编译源文件(目标)
 * @param {Partial<BuildOptions>} esbuildOptions
 * @return {*}
 */
async function buildSourceFiles(esbuildOptions: Partial<BuildOptions>) {
  return await build({
    ...esbuildOptions,
    bundle: false,
    format: "cjs",
    platform: "node",
  });
}

type AssetsOptions = { baseDir: string; outDir: string; patterns: string[] };

/**
 * 拷贝非源文件
 * @param {AssetsOptions} {
 *   baseDir,
 *   outDir,
 *   patterns,
 * }
 * @return {*}
 */
async function copyNonSourceFiles({
  baseDir,
  outDir,
  patterns,
}: AssetsOptions) {
  const relativeOutDir = path.relative(baseDir, outDir);

  return await cpy(patterns, relativeOutDir, {
    cwd: baseDir,
    parents: true,
  });
}

async function main() {
  const { outDir, esbuildOptions } = getBuildMetadata();

  const assetsOptions = {
    baseDir: "server",
    outDir: outDir,
    patterns: ["**/*.ts", `!**/*.{ts,js,tsx,jsx}`],
  };

  rimraf.sync(outDir);

  await Promise.all([
    buildSourceFiles(esbuildOptions),
    copyNonSourceFiles(assetsOptions),
  ]);
}

console.time("Built in");

main()
  .then(() => {
    console.timeEnd("Built in");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
