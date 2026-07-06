import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "./queryClient";


function Providers({children}){


return (

<QueryClientProvider client={queryClient}>

{children}

</QueryClientProvider>

)


}


export default Providers;