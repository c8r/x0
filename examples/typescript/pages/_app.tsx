import * as React from "react";
import { Box, Heading, Provider } from "rebass";

export default ({ render }: { render: any }) => (
    <div>
        Custom-App-Wrapper created with Typescript
        {render()}
    </div>
);