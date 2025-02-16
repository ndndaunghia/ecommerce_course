import MainLayout from '@/layouts/MainLayout'
import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import CoursePlayer from './components/CoursePlayer'

const CoursePlayerPage = () => {
  return (
    <MainLayout>
      <div className='pt-20'></div>
      <CoursePlayer />
      <Footer />
    </MainLayout>
  )
}

export default CoursePlayerPage