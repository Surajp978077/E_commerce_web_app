// import React from "react";
import { Link } from "react-router-dom";

// export default function Lost() {
//   return (
//     <div style={{ margin: "30px" }}>
//       <h3>Oops</h3>
//       <p>
//         Looks like you are lost, Let's take you back to{" "}
//         <Link to={"/"}>homepage</Link>{" "}
//       </p>
//     </div>
//   );
// }

import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>
        Let's take you back to <Link to={"/"}>homepage</Link>{" "}
      </p>
    </div>
  );
}
