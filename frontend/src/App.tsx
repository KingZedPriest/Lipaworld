import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';

//Toast
import { ToastContainer } from "react-fox-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
    }
  }
})

const App = () => {
  return ( 
    <main className='text-xs md:text-sm xl:text-base'>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ToastContainer position="top-center" isPausedOnHover={true} /> 
      </QueryClientProvider>
    </main>
   );
}
 
export default App;