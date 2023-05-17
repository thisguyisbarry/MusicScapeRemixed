import type { V2_MetaFunction } from "@remix-run/node";
import Login from "./Login";

export const meta: V2_MetaFunction = () => {
  return [{ title: "MusicScapeRemix" }];
};

export default function Index() {
  return (
    <div>
        <Login></Login>
    </div>
  );
}
