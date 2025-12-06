import pagesRoutes from "./pages/pages.routes";
import {createBrowserRouter} from "react-router-dom";
import { AppRedirect } from "./components/AppRedirect";

const appRouter = createBrowserRouter([
    {
        path: '',
        element: <AppRedirect type="default-route" path="/pages" />
    },
    ...pagesRoutes
])


export default appRouter