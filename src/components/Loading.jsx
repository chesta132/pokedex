// import "./Loading.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loading() {
  return (
    <div className="h-[80dvh] flex justify-center items-center">
      <DotLottieReact src='https://lottie.host/cce3ad61-6087-4a78-b78f-f3cac43a5e71/RgBmHxXq24.lottie' className='w-[40%]' loop autoplay/>
    </div>
  );
}
