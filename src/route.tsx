/** @format */

import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import { DefaultLayout } from "./component";
import { HomePage, Payment, CancelPage, SuccessPage, FailedPage } from "./page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <DefaultLayout></DefaultLayout>
        <ScrollRestoration />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "/cancel",
        element: <CancelPage></CancelPage>,
      },
      {
        path: "/failed",
        element: <FailedPage></FailedPage>,
      },
      {
        path: "/success/:id",
        element: <SuccessPage></SuccessPage>,
      },
    ],
  },
]);

export default router;
