import { motion, useAnimation, useInView, Variants } from 'framer-motion'
import { ReactNode, useEffect, useRef } from 'react'
interface Props {
  children: ReactNode
  width?: 'fit-content' | '100%'
  variant?: 'left' | 'right' | 'top' | 'bottom'
}

export default function Reveal({ children, width = '100%', variant = 'bottom' }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()
  // const slideControls = useAnimation()
  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
      // slideControls.start('visible')
    }
  }, [isInView, mainControls])

  const renderVariants = (): Variants => {
    switch (variant) {
      case 'left':
        return { hidden: { opacity: 0, x: -75 }, visible: { opacity: 1, x: 0 } }
      case 'right':
        return { hidden: { opacity: 0, x: 75 }, visible: { opacity: 1, x: 0 } }
      case 'top':
        return { hidden: { opacity: 0, y: -75 }, visible: { opacity: 1, y: 0 } }
      case 'bottom':
        return { hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } }
      default:
        return { hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } }
    }
  }

  return (
    <div ref={ref} className={'relative overflow-hidden'} style={{ width }}>
      <motion.div
        variants={renderVariants()}
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
