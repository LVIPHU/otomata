import { motion, useAnimation, useInView } from 'framer-motion'
import { ReactNode, useEffect, useRef } from 'react'
interface Props {
  children: ReactNode
  width?: 'fit-content' | '100%'
}

export default function Reveal({ children, width = '100%' }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()
  // const slideControls = useAnimation()
  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
      // slideControls.start('visible')
    }
  }, [isInView])
  return (
    <div ref={ref} className={'relative overflow-hidden'} style={{ width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 }
        }}
        initial={'hidden'}
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      {/*<motion.div*/}
      {/*  variants={{*/}
      {/*    hidden: { left: 0 },*/}
      {/*    visible: { left: '100%' }*/}
      {/*  }}*/}
      {/*  initial={'hidden'}*/}
      {/*  animate={slideControls}*/}
      {/*  transition={{ duration: 0.5, ease: 'easeIn' }}*/}
      {/*  className={'absolute top-4 bottom-4 left-0 right-0 bg-green-700 z-20'}*/}
      {/*></motion.div>*/}
    </div>
  )
}
