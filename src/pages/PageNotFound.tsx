import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';

const PageNotFound = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(setPage('login'));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center sm:flex-row flex-col sm:h-[calc(100vh-222px)] lg:px-[242px]">
      <figure className="flex-1 xl:pr-20 sm:pr-2 md:px-auto lg:px-[95px] sm:px-2 px-[95px]">
        <img src="/images/rectangle-15.png" alt="" className="mx-auto"/>
      </figure>
      <div className="flex-1 xl:pl-20 sm:pl-2 text-center md:text-left pb-20 -mt-10 md:mt-0">
        <h2 className="text-[96px]">404</h2>
        <div className="flex flex-col lg:max-w-[440px] max-w-[300px]">
          <p className="text-[24px]">Oops! Nothing to see here, just a lost kanban task.</p>
          <a href="/" className="text-[20px] font-bold text-blue-500 text-center md:text-right underline hover:no-underline">Go back to home</a>
        </div>
      </div>
    </section>
  )
}

export default PageNotFound;
