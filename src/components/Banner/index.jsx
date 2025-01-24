import {Button} from 'antd';
import React from 'react';
import {VideoCameraOutlined} from '@ant-design/icons';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/learning_animation.json';

const defaultOptions = {
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
const Banner = () => {
  return (
    <section className="pt-5 dark:bg-dark">
      <div className="grid max-w-screen-xl md:px-24 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 lg:pt-8">
        <div className="place-self-center lg:col-span-8 sm:col-span-12 lg:mr-auto">
          <p className="max-w-2xl mb-4  text-center font-semibold leading-none tracking-tight md:text-2xl lg:text-3xl xl:text-4xl  text-secondary-light">
            Nền tảng
          </p>

          <p className="max-w-2xl mb-4 font-semibold text-center  text-primary-light lg:mb-4 md:text-2xl lg:text-3xl xl:text-4xl ">
            Cung cấp khóa học
          </p>

          <p className="max-w-2xl mb-4  font-semibold text-center leading-none tracking-tight md:text-2xl lg:text-3xl xl:text-4xl text-secondary-light">
            Chất lượng
          </p>

          <div className="space-y-4 flex flex-col justify-center items-center sm:flex sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button type="primary" size="large" icon={<VideoCameraOutlined />}>
              Mua khóa học
            </Button>
          </div>
        </div>

        <div className="lg:mt-0 lg:col-span-4 lg:flex sm:col-span-12 sm: my-12 sm:flex sm:justify-center">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
