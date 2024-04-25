'use client'

import { MacbookScroll } from '@/components/molecules/macbook-scroll'
import Image from 'next/image'
import { useRef } from 'react'
import { useScroll } from 'framer-motion'

export default function MainTemplates() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const sectionTwo = () => {
    return (
      <div ref={ref} className={'flex flex-col gap-20'}>
        <h2 className={'text-center text-4xl font-bold'}>OTOMATA sẽ làm gì cho bạn ?</h2>
        <div className={'grid grid-cols-2 gap-10'}>
          {data.map(({ image, content }, index) => (
            <>
              <Image
                src={image}
                alt={`image-${index}`}
                height='500'
                width='500'
                className={'w-full h-full object-cover'}
              />
              <div>{content}</div>
            </>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='overflow-hidden dark:bg-[#0B0B0F] bg-white w-full'>
        <MacbookScroll
          title={
            <div className={'max-w-[700px] flex flex-col gap-5 text-center'}>
              <h1 className={'text-5xl font-bold'}>
                Đêm OT ta đi ăn 🍜 <br /> Task gì việc gì tool này lo hết
              </h1>
              <span className={'font-semibold text-2xl'}>
                <strong>OTOMATA</strong> là dự án freelance được ra đời để giúp 💪 các anh chị em văn phòng tự động hoá
                những công việc văn phòng trong công ty, chỉ với vài ngày lương và vài cú click.
              </span>
            </div>
          }
          content={<div className={'container-content'}>{sectionTwo()}</div>}
          showGradient={false}
        />
      </div>
      <div className={'container-content'}>{sectionTwo()}</div>
    </div>
  )
}

const data = [
  {
    image: '/images/placeholder-image.svg',
    content: (
      <p>
        {' '}
        Chạy luồng công việc phức tạp với tool được thiết kế riêng cho bạn hoặc công ty bạn, với quy trình dễ hiểu và
        đơn giản. <br /> Bạn đặt lịch tư vấn, đợi mình làm xong app giao cho bạn, bạn nhập liệu, bạn cấu hình tool rồi
        bấm nút chạy.{' '}
      </p>
    )
  },
  {
    image: '/images/placeholder-image.svg',
    content: (
      <p>
        Tự động hoá những quy trình, nghiệp vụ thủ công bạn phải làm đi làm lại quanh năm suốt tháng.
        <br />
        Có thể tự động hoá những quy trình ngõ ngách mà những sản phẩm tự động hoá trên thị trường chưa có làm được.
      </p>
    )
  },
  {
    image: '/images/placeholder-image.svg',
    content: (
      <p>
        {' '}
        Bảo hành 3 tháng sau khi giao tool.
        <br />
        Được hỗ trợ 30% chi phí thiết kế lại tool khi task văn phòng bạn có xảy ra thay đổi
      </p>
    )
  }
]
