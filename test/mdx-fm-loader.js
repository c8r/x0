import test from "ava";
import mdx from "@mdx-js/mdx";
import { transform } from "babel-core";
import env from "babel-preset-env";
import react from "babel-preset-react";
import stage0 from "babel-preset-stage-0";

import fmLoader from "../lib/mdx-fm-loader";

const content = `# A Heading

some other content`;

test("mdx-fm-loader", async t => {
  const loader = fmLoader.bind({
    async() {
      return (err, result) => {
        t.is(err, null, "mdx-fm-loader should not error");
        t.notThrows(() => {
          transform(mdx.sync(result), { presets: [env, react, stage0] });
        }, SyntaxError);
      };
    }
  });

  const cb = await loader(content);
});
