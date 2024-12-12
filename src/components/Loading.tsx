import loader from '../assets/loader.gif'
const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black text-white'>
      <img   src={loader} alt="Loading..."/>
    </div>
  )
}

export default Loading