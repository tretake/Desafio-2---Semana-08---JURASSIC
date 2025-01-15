import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import { Link } from 'react-router-dom';

const Locked = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(setPage('login'));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center sm:flex-row flex-col min-h-screen lg:px-[242px] pt-8 md:pt-0">
      <figure className="flex-1 px-[96px] sm:px-[0]">
        <img src="/images/rectangle-16.png" alt="" className="mx-auto"/>
      </figure>
      <div className="flex-1 text-center md:text-left pb-20 md:pb-0">
        <h2 className="text-[96px]">403</h2>
        <div className="flex flex-col max-w-[320px] md:max-w-[440px]">
          <p className="text-[24px]">Nothing to see here... yet! To see this content, you need to  <Link to='/login' ><p className="font-bold text-blue-500 underline hover:no-underline">log in.</p></Link></p>
        </div>
      </div>
    </section>
  )
}

export default Locked
